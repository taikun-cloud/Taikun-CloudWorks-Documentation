# **Volume encryption supported by the key manager**

We recommend the Key management service (barbican) for storing encryption keys used by the OpenStack volume encryption feature. It can be enabled by updating `cinder.conf` and `nova.conf`.

---

## **Initial configuration**

Configuration changes need to be made to any nodes running the `cinder-api` or `nova-compute` server.

Steps to update `cinder-api` servers:

1\. Edit the `/etc/cinder/cinder.conf` file to use Key management service as follows:

* Look for the `[key_manager]` section.

* Enter a new line directly below `[key_manager]` with the following

```
backend = barbican
```

2\. Restart `cinder-api`, `cinder-volume` and `cinder-backup`.

Update `nova-compute` servers:

1\. Install the `python-barbicanclient` Python package.

2\. Set up the Key Manager service by editing `/etc/nova/nova.conf`:

```
[key_manager]
backend = barbican
```

!!! Note
	Use a ‘#’ prefix to comment out the line in this section that begins with ‘fixed\_key’.

3\. Restart `nova-compute`.

---

## **Key management access control**

Special privileges can be assigned on behalf of an end user to allow them to manage their own encryption keys, which are required when creating the encrypted volumes. The Barbican [Default Policy](https://docs.openstack.org/barbican/latest/admin/access_control.html#default-policy) for access control specifies that only users with an `admin` or `creator` role can create keys. The policy is very flexible and can be modified.

To assign the `creator` role, the admin must know the user ID, project ID, and creator role ID. See [Assign a role](https://docs.openstack.org/keystone/latest/admin/cli-manage-projects-users-and-roles.html#assign-a-role) for more information. An admin can list existing roles and associated IDs using the `openstack role list` command. If the creator role does not exist, the admin can [create the role](https://docs.openstack.org/keystone/latest/admin/cli-manage-projects-users-and-roles.html#create-a-role).

---

## **Create an encrypted volume type**

Block Storage volume type assignment provides scheduling to a specific back-end, and can be used to specify actionable information for a back-end storage device.

This example creates a volume type called LUKS and provides configuration information for the storage system to encrypt or decrypt the volume.

1. Source your admin credentials:

```
$ . admin-openrc.sh
```

1. Create the volume type, marking the volume type as encrypted and providing the necessary details. Use `--encryption-control-location` to specify where encryption is performed: `front-end` (default) or `back-end`.

```
$ openstack volume type create --encryption-provider luks \
  --encryption-cipher aes-xts-plain64 --encryption-key-size 256 --encryption-control-location front-end LUKS

  +-------------+----------------------------------------------------------------+
  | Field       | Value                                                          |
  +-------------+----------------------------------------------------------------+
  | description | None                                                           |
  | encryption  | cipher='aes-xts-plain64', control_location='front-end',        |
  |             | encryption_id='8584c43f-1666-43d1-a348-45cfcef72898',          |
  |             | key_size='256',                                                |
  |             | provider='luks'                                                |
  | id          | b9a8cff5-2f60-40d1-8562-d33f3bf18312                           |
  | is_public   | True                                                           |
  | name        | LUKS                                                           |
  +-------------+----------------------------------------------------------------+
```

The OpenStack dashboard (horizon) supports creating the encrypted volume type as of the Kilo release. For instructions, see [Create an encrypted volume type](https://docs.openstack.org/horizon/latest/admin/manage-volumes.html#create-an-encrypted-volume-type).

---

## **Create an encrypted volume**

Use the OpenStack dashboard (horizon), or **openstack volume create** command to create volumes just as you normally would. For an encrypted volume, pass the `--type LUKS` flag, which specifies that the volume type will be `LUKS` (Linux Unified Key Setup). If that argument is left out, the default volume type, `unencrypted`, is used.

1. Source your admin credentials:

```
$ . admin-openrc.sh
```

2\. Create an unencrypted 1GB test volume:

```
$ openstack volume create --size 1 'unencrypted volume'
```

3\. Create an encrypted 1GB test volume:

```
$ openstack volume create --size 1 --type LUKS 'encrypted volume'
```

Notice the encrypted parameter; it will show `True` or `False`. The option `volume_type` is also shown for easy review.

Non-admin users need the `creator` role to store secrets in Barbican and to create encrypted volumes. As an administrator, you can give a user the creator role in the following way:

```
$ openstack role add --project PROJECT --user USER creator
```

For details, see the [Barbican Access Control page](https://docs.openstack.org/barbican/latest/admin/access_control.html).

---

## **Testing volume encryption**

This is a simple test scenario to help validate your encryption. It assumes an LVM based Block Storage server.

Perform these steps after completing the volume encryption setup and creating the volume-type for LUKS as described in the preceding sections.

1. Create a VM:

```
$ openstack server create --image cirros-0.3.1-x86_64-disk --flavor m1.tiny TESTVM
```

1. Create two volumes, one encrypted and one not encrypted then attach them to your VM:

```
$ openstack volume create --size 1 'unencrypted volume'
$ openstack volume create --size 1 --type LUKS 'encrypted volume'
$ openstack volume list
$ openstack server add volume --device /dev/vdb TESTVM 'unencrypted volume'
$ openstack server add volume --device /dev/vdc TESTVM 'encrypted volume'
```

!!! Note
	The `--device` option to specify the mountpoint for the attached volume may not be where the block device is actually attached in the guest VM, it is used here for illustration purposes.

1. On the VM, send some text to the newly attached volumes and synchronize them:

```
# echo "Hello, world (unencrypted /dev/vdb)" >> /dev/vdb
# echo "Hello, world (encrypted /dev/vdc)" >> /dev/vdc
# sync && sleep 2
# sync && sleep 2
```

1. On the system hosting cinder-volume services, synchronize to flush the I/O cache then test to see if your strings can be found:

```
# sync && sleep 2
# sync && sleep 2
# strings /dev/stack-volumes/volume-* | grep "Hello"
Hello, world (unencrypted /dev/vdb)
```

In the above example you see that the search returns the string written to the unencrypted volume, but not the encrypted one.
