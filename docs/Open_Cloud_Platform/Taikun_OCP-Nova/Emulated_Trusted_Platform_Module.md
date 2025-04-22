# **Emulated Trusted Platform Module (vTPM)**

## **Enabling vTPM**

The following are required on each compute host wishing to support the vTPM feature:

* Currently vTPM is only supported when using the libvirt compute driver with a [`libvirt.virt_type`](https://docs.openstack.org/nova/latest/configuration/config.html#libvirt.virt_type) of `kvm` or `qemu`.

* A [key manager service](https://docs.openstack.org/api-guide/key-manager/), such as [barbican](https://docs.openstack.org/barbican/latest/), must be configured to store secrets used to encrypt the virtual device files at rest.

* The [swtpm](https://github.com/stefanberger/swtpm/wiki) binary and associated [libraries](https://github.com/stefanberger/libtpms/).

* Set the [`libvirt.swtpm_enabled`](https://docs.openstack.org/nova/latest/configuration/config.html#libvirt.swtpm_enabled) config option to `True`. This will enable support for both TPM version 1.2 and 2.0.

With the above requirements satisfied, verify vTPM support by inspecting the traits on the compute node’s resource provider:

```
$ COMPUTE_UUID=$(openstack resource provider list --name $HOST -f value -c uuid)
$ openstack resource provider trait list $COMPUTE_UUID | grep SECURITY_TPM
| COMPUTE_SECURITY_TPM_1_2 |
| COMPUTE_SECURITY_TPM_2_0 |
```

---

## **Configuring a flavor or image**

A vTPM can be requested on a server via flavor extra specs or image metadata properties. There are two versions supported – 1.2 and 2.0 – and two models – TPM Interface Specification (TIS) and Command-Response Buffer (CRB). The CRB model is only supported with version 2.0.

| Flavor extra_specs | Image metadata  | Description                                                                 |
|--------------------|-----------------|-----------------------------------------------------------------------------|
| hw:tpm_version     | hw_tpm_version | Specify the TPM version, `1.2` or `2.0`. Required if requesting a vTPM.     |
| hw:tpm_model       | hw_tpm_model   | Specify the TPM model, `tpm-tis` (the default) or `tpm-crb` (only valid with version `2.0`). |

For example, to configure a flavor to use the TPM 2.0 with the CRB model:

```
$ openstack flavor set $FLAVOR \
    --property hw:tpm_version=2.0 \
    --property hw:tpm_model=tpm-crb
```

$ openstack flavor set $FLAVOR \ –property hw:tpm\_version=2.0 \ –property hw:tpm\_model=tpm-crb

Scheduling will fail if flavor and image supply conflicting values, or if model `tpm-crb` is requested with version `1.2`.

Upon successful boot, the server should see a TPM device such as `/dev/tpm0` which can be used in the same manner as a hardware TPM.

---

## **Limitations**

* Only server operations performed by the server owner are supported, as the user’s credentials are required to unlock the virtual device files on the host. Thus the admin may need to decide whether to grant the user additional policy roles; if not, those operations are effectively disabled.

* Live migration, evacuation, shelving and rescuing of servers with vTPMs is not currently supported.

---

## **Security**

With a hardware TPM, the root of trust is a secret known only to the TPM user. In contrast, an emulated TPM comprises a file on disk which the libvirt daemon must be able to present to the guest. At rest, this file is encrypted using a passphrase stored in a key manager service. The passphrase in the key manager is associated with the credentials of the owner of the server (the user who initially created it). The passphrase is retrieved and used by libvirt to unlock the emulated TPM data any time the server is booted.

Although the above mechanism uses a libvirt [secret](https://libvirt.org/formatsecret.html#SecretAttributes) that is both `private` (can’t be displayed via the libvirt API or `virsh`) and `ephemeral` (exists only in memory, never on disk), it is theoretically possible for a sufficiently privileged user to retrieve the secret and/or vTPM data from memory.

A full analysis and discussion of security issues related to emulated TPM is beyond the scope of this document.

---

## **References**

* [TCG PC Client Specific TPM Interface Specification (TIS)](https://trustedcomputinggroup.org/resource/pc-client-work-group-pc-client-specific-tpm-interface-specification-tis/)

* [TCG PC Client Platform TPM Profile (PTP) Specification](https://trustedcomputinggroup.org/resource/pc-client-platform-tpm-profile-ptp-specification/)

* [QEMU docs on tpm](https://qemu.readthedocs.io/en/v9.0.0/specs/tpm.html)

* [Libvirt XML to request emulated TPM device](https://libvirt.org/formatdomain.html#elementsTpm)

* [Libvirt secret for usage type “vtpm“](https://libvirt.org/formatsecret.html#vTPMUsageType)
