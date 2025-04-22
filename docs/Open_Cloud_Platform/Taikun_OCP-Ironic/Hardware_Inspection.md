# **Hardware Inspection**

Inspection allows Bare Metal service to discover required node properties once required `driver_info` fields (for example, IPMI credentials) are set by an operator. Inspection will also create the Bare Metal service ports for the discovered ethernet MACs. Operators will have to manually delete the Bare Metal service ports for which physical media is not connected.

There are two kinds of inspection supported by Bare Metal service:

1. Out-of-band inspection is currently implemented by several hardware types, including `ilo`, `idrac` and `irmc`.

2. [In-band inspection](https://docs.openstack.org/ironic/zed/admin/inspection.html#in-band-inspection) by utilizing the [ironic-inspector](https://pypi.org/project/ironic-inspector) project.

The node should be in the `manageable` state before inspection is initiated. If it is in the `enroll` or `available` state, move it to `manageable` first:

```
baremetal node manage <node_UUID>
```

Then inspection can be initiated using the following command:

```
baremetal node inspect <node_UUID>
```

---

## **Capabilities discovery**

This is an incomplete list of capabilities we want to discover during inspection. The exact support is hardware and hardware type specific though, the most complete list is provided by the iLO [Hardware Inspection Support](https://docs.openstack.org/ironic/zed/admin/drivers/ilo.html#ilo-inspection).

`secure_boot` (`true` or `false`)

whether secure boot is supported for the node

`boot_mode` (`bios` or `uefi`)

the boot mode the node is using

`cpu_vt` (`true` or `false`)

whether the CPU virtualization is enabled

`cpu_aes` (`true` or `false`)

whether the AES CPU extensions are enabled

`max_raid_level` (integer, 0-10)

maximum RAID level supported by the node

`pci_gpu_devices` (non-negative integer)

number of GPU devices on the node

The operator can specify these capabilities in nova flavor for node to be selected for scheduling:

```
openstack flavor set my-baremetal-flavor --property capabilities:pci_gpu_devices="> 0"

openstack flavor set my-baremetal-flavor --property capabilities:secure_boot="true"
```

Please see a specific [hardware type page](https://docs.openstack.org/ironic/zed/admin/drivers.html) for the exact list of capabilities this hardware type can discover.

---

## **In-band inspection**

In-band inspection involves booting a ramdisk on the target node and fetching information directly from it. This process is more fragile and time-consuming than the out-of-band inspection, but it is not vendor-specific and works across a wide range of hardware. In-band inspection is using the [ironic-inspector](https://pypi.org/project/ironic-inspector) project.

It is supported by all hardware types, and used by default, if enabled, by the `ipmi` hardware type. The `inspector` *inspect* interface has to be enabled to use it:

```
[DEFAULT]
enabled_inspect_interfaces = inspector,no-inspect
```

If the ironic-inspector service is not registered in the service catalog, set the following option:

```
[inspector]
endpoint_override = `[`http://inspector.example.com:5050`](http://inspector.example.com:5050)
```

In order to ensure that ports in Bare Metal service are synchronized with NIC ports on the node, the following settings in the ironic-inspector configuration file must be set:

```
[processing]
add_ports = all
keep_ports = present
```

There are two modes of in-band inspection: [managed inspection](https://docs.openstack.org/ironic/zed/admin/inspection.html#managed-inspection) and [unmanaged inspection](https://docs.openstack.org/ironic/zed/admin/inspection.html#unmanaged-inspection).

### Managed inspection

Inspection is *managed* when the Bare Metal conductor fully configures the node for inspection, including setting boot device, boot mode and power state. This is the only way to conduct inspection using [Virtual media boot](https://docs.openstack.org/ironic/zed/admin/drivers/redfish.html#redfish-virtual-media) or with [Layer 3 or DHCP-less ramdisk booting](https://docs.openstack.org/ironic/zed/admin/dhcp-less.html). This mode is engaged automatically when the node has sufficient information to configure boot (e.g. ports in case of iPXE).

There are a few configuration options that tune managed inspection, the most important is `extra_kernel_params`, which allows adding kernel parameters for inspection specifically. This is where you can configure [inspection collectors and other parameters](https://docs.openstack.org/ironic-python-agent/zed/admin/how_it_works.html#inspection), for example:

```
[inspector]
extra_kernel_params = ipa-inspection-collectors=default,logs ipa-collect-lldp=1
```

For the callback URL the ironic-inspector endpoint from the service catalog is used. If you want to override the endpoint for callback only, set the following option:

```
[inspector]
callback_endpoint_override = `[`https://example.com/baremetal-introspection/v1/continue`](https://example.com/baremetal-introspection/v1/continue)
```

### Unmanaged inspection

Under *unmanaged* inspection we understand in-band inspection orchestrated by ironic-inspector or a third party. This was the only inspection mode before the Ussuri release, and it is still used when the node’s boot cannot be configured by the conductor. The options described above do not affect unmanaged inspection. See [ironic-inspector installation guide](https://docs.openstack.org/ironic-inspector/zed/install/index.html) for more information.

If you want to **prevent** unmanaged inspection from working, set this option:

```
[inspector]
require_managed_boot = True
```
