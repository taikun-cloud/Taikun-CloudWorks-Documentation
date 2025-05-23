# **Manage Volumes via CLI**

A volume is a detachable block storage device, similar to a USB hard drive. You can attach a volume to only one instance. Use the `openstack` client commands to create and manage volumes.

---

## **Create a volume**

This example creates a `my-new-volume` volume based on an image.

1\. List images, and note the ID of the image that you want to use for your volume:

```
$ openstack image list
+--------------------------------------+---------------------------------+
| ID                                   | Name                            |
+--------------------------------------+---------------------------------+
| 8bf4dc2a-bf78-4dd1-aefa-f3347cf638c8 | cirros-0.3.5-x86_64-uec         |
| 9ff9bb2e-3a1d-4d98-acb5-b1d3225aca6c | cirros-0.3.5-x86_64-uec-kernel  |
| 4b227119-68a1-4b28-8505-f94c6ea4c6dc | cirros-0.3.5-x86_64-uec-ramdisk |
+--------------------------------------+---------------------------------+
```

2\. List the availability zones, and note the ID of the availability zone in which you want to create your volume:

```
$ openstack availability zone list
+-----------+-------------+
| Zone Name | Zone Status |
+-----------+-------------+
| nova      | available   |
+-----------+-------------+
```

3\. Create a volume with 8 gibibytes (GiB) of space, and specify the availability zone and image:

```
$ openstack volume create --image 8bf4dc2a-bf78-4dd1-aefa-f3347cf638c8 \
  --size 8 --availability-zone nova my-new-volume

+------------------------------+--------------------------------------+
| Property                     | Value                                |
+------------------------------+--------------------------------------+
| attachments                  | []                                   |
| availability_zone            | nova                                 |
| bootable                     | false                                |
| consistencygroup_id          | None                                 |
| created_at                   | 2016-09-23T07:52:42.000000           |
| description                  | None                                 |
| encrypted                    | False                                |
| id                           | bab4b0e0-ce3d-4d57-bf57-3c51319f5202 |
| metadata                     | {}                                   |
| multiattach                  | False                                |
| name                         | my-new-volume                        |
| os-vol-tenant-attr:tenant_id | 3f670abbe9b34ca5b81db6e7b540b8d8     |
| replication_status           | disabled                             |
| size                         | 8                                    |
| snapshot_id                  | None                                 |
| source_volid                 | None                                 |
| status                       | creating                             |
| updated_at                   | None                                 |
| user_id                      | fe19e3a9f63f4a14bd4697789247bbc5     |
| volume_type                  | lvmdriver-1                          |
+------------------------------+--------------------------------------+
```

4\. To verify that your volume was created successfully, list the available volumes:

```
$ openstack volume list
+--------------------------------------+---------------+-----------+------+-------------+
| ID                                   | Name          |  Status   | Size | Attached to |
+--------------------------------------+---------------+-----------+------+-------------+
| bab4b0e0-ce3d-4d57-bf57-3c51319f5202 | my-new-volume | available | 8    |             |
+--------------------------------------+---------------+-----------+------+-------------+
```

If your volume was created successfully, its status is `available`. If its status is `error`, you might have exceeded your quota.

### Volume Types

Cinder supports these three ways to specify `volume type` during volume creation.

1. volume\_type

2. cinder\_img\_volume\_type (via glance image metadata)

3. default volume type (via project defaults or cinder.conf)

#### volume-type

User can specify volume type when creating a volume.

```
$ openstack volume create -h -f {json,shell,table,value,yaml}
                         -c COLUMN --max-width <integer>
                         --noindent --prefix PREFIX --size <size>
                         --type <volume-type> --image <image>
                         --snapshot <snapshot> --source <volume>
                         --description <description> --user <user>
                         --project <project>
                         --availability-zone <availability-zone>
                         --property <key=value>
                         <name>
```

#### cinder\_img\_volume\_type

If glance image has `cinder_img_volume_type` property, Cinder uses this parameter to specify `volume type` when creating a volume.

Choose glance image which has `cinder_img_volume_type` property and create a volume from the image.

```
$ openstack image list
+----------------------------------+---------------------------------+--------+
| ID                               | Name                            | Status |
+----------------------------------+---------------------------------+--------+
| 376bd633-c9c9-4c5d-a588-342f4f66 | cirros-0.3.5-x86_64-uec         | active |
| d086                             |                                 |        |
| 2c20fce7-2e68-45ee-ba8d-         | cirros-0.3.5-x86_64-uec-ramdisk | active |
| beba27a91ab5                     |                                 |        |
| a5752de4-9faf-4c47-acbc-         | cirros-0.3.5-x86_64-uec-kernel  | active |
| 78a5efa7cc6e                     |                                 |        |
+----------------------------------+---------------------------------+--------+


$ openstack image show 376bd633-c9c9-4c5d-a588-342f4f66d086
+------------------------+------------------------------------------------------+
| Field                  | Value                                                |
+------------------------+------------------------------------------------------+
| checksum               | eb9139e4942121f22bbc2afc0400b2a                      |
| cinder_img_volume_type | nfstype                                              |
| container_format       | ami                                                  |
| created_at             | 2016-10-13T03:28:55Z                                 |
| disk_format            | ami                                                  |
| file                   | /v2/images/376bd633-c9c9-4c5d-a588-342f4f66d086/file |
| id                     | 376bd633-c9c9-4c5d-a588-342f4f66d086                 |
| min_disk               | 0                                                    |
| min_ram                | 0                                                    |
| name                   | cirros-0.3.5-x86_64-uec                              |
| owner                  | 88ba456e3a884c318394737765e0ef4d                     |
| properties             | kernel_id='a5752de4-9faf-4c47-acbc-78a5efa7cc6e',    |
|                        | ramdisk_id='2c20fce7-2e68-45ee-ba8d-beba27a91ab5'    |
| protected              | False                                                |
| schema                 | /v2/schemas/image                                    |
| size                   | 25165824                                             |
| status                 | active                                               |
| tags                   |                                                      |
| updated_at             | 2016-10-13T03:28:55Z                                 |
| virtual_size           | None                                                 |
| visibility             | public                                               |
+------------------------+------------------------------------------------------+

$ openstack volume create --image 376bd633-c9c9-4c5d-a588-342f4f66d086 \
  --size 1 --availability-zone nova test
+---------------------+--------------------------------------+
| Field               | Value                                |
+---------------------+--------------------------------------+
| attachments         | []                                   |
| availability_zone   | nova                                 |
| bootable            | false                                |
| consistencygroup_id | None                                 |
| created_at          | 2016-10-13T06:29:53.688599           |
| description         | None                                 |
| encrypted           | False                                |
| id                  | e6e6a72d-cda7-442c-830f-f306ea6a03d5 |
| multiattach         | False                                |
| name                | test                                 |
| properties          |                                      |
| replication_status  | disabled                             |
| size                | 1                                    |
| snapshot_id         | None                                 |
| source_volid        | None                                 |
| status              | creating                             |
| type                | nfstype                              |
| updated_at          | None                                 |
| user_id             | 33fdc37314914796883706b33e587d51     |
+---------------------+--------------------------------------+
```

#### default volume type

If above parameters are not set, cinder uses default volume type during volume creation.

The effective default volume type (whether it be project default or default\_volume\_type) can be checked with the following command:

```
$ cinder type-default
```

There are 2 ways to set the default volume type:

1. Project specific defaults

2. default\_volume\_type defined in cinder.conf

##### Project specific defaults (available since mv 3.62 or higher)

Project specific defaults can be managed using the [Default Volume Types API](https://docs.openstack.org/api-ref/block-storage/v3/#default-volume-types-default-types) It is set on a per project basis and has a higher priority over default\_volume\_type defined in cinder.conf

##### default\_volume\_type

If the project specific default is not set then default\_volume\_type configured in cinder.conf is used to create volumes.

Example cinder.conf file configuration

```
[default]
default_volume_type = lvmdriver-1
```

---

## **Attach a volume to an instance**

1\. Attach your volume to a server, specifying the server ID and the volume ID:

```
$ openstack server add volume 84c6e57d-a6b1-44b6-81eb-fcb36afd31b5 \
  573e024d-5235-49ce-8332-be1576d323f8 --device /dev/vdb
```

2\. Show information for your volume:

```
$ openstack volume show 573e024d-5235-49ce-8332-be1576d323f8
```

The output shows that the volume is attached to the server with ID `84c6e57d-a6b1-44b6-81eb-fcb36afd31b5`, is in the nova availability zone, and is bootable.

```
+------------------------------+-----------------------------------------------+
| Field                        | Value                                         |
+------------------------------+-----------------------------------------------+
| attachments                  | [{u'device': u'/dev/vdb',                     |
|                              |        u'server_id': u'84c6e57d-a             |
|                              |           u'id': u'573e024d-...               |
|                              |        u'volume_id': u'573e024d...            |
| availability_zone            | nova                                          |
| bootable                     | true                                          |
| consistencygroup_id          | None                                          |
| created_at                   | 2016-10-13T06:08:07.000000                    |
| description                  | None                                          |
| encrypted                    | False                                         |
| id                           | 573e024d-5235-49ce-8332-be1576d323f8          |
| multiattach                  | False                                         |
| name                         | my-new-volume                                 |
| properties                   |                                               |
| replication_status           | disabled                                      |
| size                         | 8                                             |
| snapshot_id                  | None                                          |
| source_volid                 | None                                          |
| status                       | in-use                                        |
| type                         | lvmdriver-1                                   |
| updated_at                   | 2016-10-13T06:08:11.000000                    |
| user_id                      | 33fdc37314914796883706b33e587d51              |
+------------------------------+-----------------------------------------------+
```

---

## **Detach a volume from an instance**

1\. Detach your volume from a server, specifying the server ID and the volume ID:

```
$ openstack server remove volume 84c6e57d-a6b1-44b6-81eb-fcb36afd31b5 \
  573e024d-5235-49ce-8332-be1576d323f8
```

2\. Show information for your volume:

```
$ openstack volume show 573e024d-5235-49ce-8332-be1576d323f8
```

The output shows that the volume is no longer attached to the server:

```
+------------------------------+-----------------------------------------------+
| Field                        | Value                                         |
+------------------------------+-----------------------------------------------+
| attachments                  | []                                            |
| availability_zone            | nova                                          |
| bootable                     | true                                          |
| consistencygroup_id          | None                                          |
| created_at                   | 2016-10-13T06:08:07.000000                    |
| description                  | None                                          |
| encrypted                    | False                                         |
| id                           | 573e024d-5235-49ce-8332-be1576d323f8          |
| multiattach                  | False                                         |
| name                         | my-new-volume                                 |
| properties                   |                                               |
| replication_status           | disabled                                      |
| size                         | 8                                             |
| snapshot_id                  | None                                          |
| source_volid                 | None                                          |
| status                       | in-use                                        |
| type                         | lvmdriver-1                                   |
| updated_at                   | 2016-10-13T06:08:11.000000                    |
| user_id                      | 33fdc37314914796883706b33e587d51              |
+------------------------------+-----------------------------------------------+
```

---

## **Delete a volume**

1\. To delete your volume, you must first detach it from the server. To detach the volume from your server and check for the list of existing volumes, see steps 1 and 2 in [Resize\_a\_volume](https://docs.openstack.org/cinder/zed/cli/cli-manage-volumes.html#resize-a-volume).Delete the volume using either the volume name or ID:

```
$ openstack volume delete my-new-volume
```

This command does not provide any output.

2\. List the volumes again, and note that the status of your volume is `deleting`:

```
$ openstack volume list
+----------------+-----------------+-----------+------+-------------+
|       ID       |   Name          |  Status   | Size | Attached to |
+----------------+-----------------+-----------+------+-------------+
| 573e024d-52... |  my-new-volume  |  deleting |  8   |             |
| bd7cf584-45... | my-bootable-vol | available |  8   |             |
+----------------+-----------------+-----------+------+-------------+
```

When the volume is fully deleted, it disappears from the list of volumes:

```
$ openstack volume list
+----------------+-----------------+-----------+------+-------------+
|       ID       |   Name          |  Status   | Size | Attached to |
+----------------+-----------------+-----------+------+-------------+
| bd7cf584-45... | my-bootable-vol | available |  8   |             |
+----------------+-----------------+-----------+------+-------------+
```

---

## **Resize a volume**

1\. To resize your volume, you must first detach it from the server if the volume driver does not support in-use extend. (See [Extend\_attached\_volume](https://docs.openstack.org/cinder/zed/cli/cli-manage-volumes.html#extend-attached-volume).) To detach the volume from your server, pass the server ID and volume ID to the following command:

```
$ openstack server remove volume 84c6e57d-a6b1-44b6-81eb-fcb36afd31b5 573e024d-5235-49ce-8332-be1576d323f8
```

This command does not provide any output.

2\. List volumes:

```
$ openstack volume list
+----------------+-----------------+-----------+------+-------------+
|       ID       |   Name          |  Status   | Size | Attached to |
+----------------+-----------------+-----------+------+-------------+
| 573e024d-52... |  my-new-volume  | available |  8   |             |
| bd7cf584-45... | my-bootable-vol | available |  8   |             |
+----------------+-----------------+-----------+------+-------------+
```

!!! Note 
	that the volume is now available.

3\. Resize the volume by passing the volume ID and the new size (a value greater than the old one) as parameters:

```
$ openstack volume set 573e024d-5235-49ce-8332-be1576d323f8 --size 10
```

This command does not provide any output. Note: The volume status `reserved` is not a valid state for an extend operation.

!!! Note
	When extending an LVM volume with a snapshot, the volume will be deactivated. The reactivation is automatic unless `auto_activation_volume_list` is defined in `lvm.conf`. See `lvm.conf` for more information.

---

## **Extend attached volume**

Starting from microversion 3.42, it is also possible to extend an attached volume with status `in-use`, depending upon policy settings and the capabilities of the backend storage. Sufficient amount of storage must exist to extend the volume.

1\. Resize the volume by passing the microversion,the volume ID, and the new size (a value greater than the old one) as parameters:

```
$ openstack --os-volume-api-version 3.42 volume set 573e024d-5235-49ce-8332-be1576d323f8 --size 10
```

This command does not provide any output.

---

## **Migrate a volume**

As an administrator, you can migrate a volume with its data from one location to another in a manner that is transparent to users and workloads. You can migrate only detached volumes with no snapshots.

Possible use cases for data migration include:

* Bring down a physical storage device for maintenance without disrupting workloads.

* Modify the properties of a volume.

* Free up space in a thinly-provisioned back end.

Migrate a volume with the **openstack volume migrate** command, as shown in the following example:

```
$ openstack volume migrate [-h] --host <host> [--force-host-copy]
                                  [--lock-volume] <volume>
```

The arguments for this command are:host

The destination host in the format host@backend-name#pool.volume

The ID of the volume to migrate.*force-host-copy*

Disables any driver optimizations and forces the data to be copied by the host.*lock-volume*

Prevents other processes from aborting the migration.

!!! Note
	If the volume has snapshots, the specified host destination cannot accept the volume. If the user is not an administrator, the migration fails.

---

## **Transfer a volume**

You can transfer a volume from one owner to another by using the **openstack volume transfer request create** command. The volume donor, or original owner, creates a transfer request and sends the created transfer ID and authorization key to the volume recipient. The volume recipient, or new owner, accepts the transfer by using the ID and key.

Starting with the Rocky release, Cinder changes the API behavior for the v2 and v3 API up to microversion 3.55. Snapshots will be transferred with the volume by default. That means if the volume has some snapshots, when a user transfers a volume from one owner to another, then those snapshots will be transferred with the volume as well.

Starting with microversion 3.55 and later, Cinder supports the ability to transfer volume without snapshots. If users don’t want to transfer snapshots, they need to specify the new optional argument –no-snapshots.

Starting with microversion 3.70 and later, Cinder supports the ability to transfer encrypted volumes. Snapshots must be transferred with the volume.

!!! Note
	The procedure for volume transfer is intended for projects (both the volume donor and recipient) within the same cloud.

Use cases include:

* Create a custom bootable volume or a volume with a large data set and transfer it to a customer.

* For bulk import of data to the cloud, the data ingress system creates a new Block Storage volume, copies data from the physical device, and transfers device ownership to the end user.

### Create a volume transfer request

1\. While logged in as the volume donor, list the available volumes:

```
$ openstack volume list
+-----------------+-----------------+-----------+------+-------------+
|       ID        |   Name          |  Status   | Size | Attached to |
+-----------------+-----------------+-----------+------+-------------+
| 72bfce9f-cac... |       None      |   error   |  1   |             |
| a1cdace0-08e... |       None      | available |  1   |             |
+-----------------+-----------------+-----------+------+-------------+
```

2\. As the volume donor, request a volume transfer authorization code for a specific volume:

```
$ openstack volume transfer request create [--no-snapshots] <volume>
```

The arguments to be passed are:


`<volume>` Name or ID of volume to transfer.

`--no-snapshots` Transfer the volume without snapshots.

The volume must be in an `available` state or the request will be denied. If the transfer request is valid in the database (that is, it has not expired or been deleted), the volume is placed in an `awaiting-transfer` state. For example:

```
$ openstack volume transfer request create a1cdace0-08e4-4dc7-b9dc-457e9bcfe25f
```

The output shows the volume transfer ID in the `id` row and the authorization key.

```
+------------+--------------------------------------+
| Field      | Value                                |
+------------+--------------------------------------+
| auth_key   | 0a59e53630f051e2                     |
| created_at | 2016-11-03T11:49:40.346181           |
| id         | 34e29364-142b-4c7b-8d98-88f765bf176f |
| name       | None                                 |
| volume_id  | a1cdace0-08e4-4dc7-b9dc-457e9bcfe25f |
+------------+--------------------------------------+
```

??? Note
	Optionally, you can specify a name for the transfer by using the `--name transferName` parameter.

	While the `auth_key` property is visible in the output of `openstack volume transfer request create VOLUME_ID`, it will not be available in subsequent `openstack volume transfer request show TRANSFER_ID` command.

1. Send the volume transfer ID and authorization key to the new owner (for example, by email).

2. View pending transfers:

```
$ openstack volume transfer request list
+--------------------------------------+--------------------------------------+------+
|               ID                     |             Volume                   | Name |
+--------------------------------------+--------------------------------------+------+
| 6e4e9aa4-bed5-4f94-8f76-df43232f44dc | a1cdace0-08e4-4dc7-b9dc-457e9bcfe25f | None |
+--------------------------------------+--------------------------------------+------+
```

3\. After the volume recipient, or new owner, accepts the transfer, you can see that the transfer is no longer available:

```
$ openstack volume transfer request list
+----+-----------+------+
| ID | Volume ID | Name |
+----+-----------+------+
+----+-----------+------+
```

### Accept a volume transfer request

1. As the volume recipient, you must first obtain the transfer ID and authorization key from the original owner.

2. Accept the request:

```
$ openstack volume transfer request accept transferID authKey
```

For example:

```
$ openstack volume transfer request accept 6e4e9aa4-bed5-4f94-8f76-df43232f44dc b2c8e585cbc68a80
+-----------+--------------------------------------+
|  Property |                Value                 |
+-----------+--------------------------------------+
|     id    | 6e4e9aa4-bed5-4f94-8f76-df43232f44dc |
|    name   |                 None                 |
| volume_id | a1cdace0-08e4-4dc7-b9dc-457e9bcfe25f |
+-----------+--------------------------------------+
```

!!! Note
	If you do not have a sufficient quota for the transfer, the transfer is refused.

### Delete a volume transfer

1. List available volumes and their statuses:

```
$ openstack volume list
+-----------------+-----------------+-----------------+------+-------------+
|       ID        |   Name          |      Status     | Size | Attached to |
+-----------------+-----------------+-----------------+------+-------------+
| 72bfce9f-cac... |       None      |      error      |  1   |             |
| a1cdace0-08e... |       None      |awaiting-transfer|  1   |             |
+-----------------+-----------------+-----------------+------+-------------+
```

2\. Find the matching transfer ID:

```
$ openstack volume transfer request list
+--------------------------------------+--------------------------------------+------+
|               ID                     |             VolumeID                 | Name |
+--------------------------------------+--------------------------------------+------+
| a6da6888-7cdf-4291-9c08-8c1f22426b8a | a1cdace0-08e4-4dc7-b9dc-457e9bcfe25f | None |
+--------------------------------------+--------------------------------------+------+
```

3\. Delete the volume:

```
$ openstack volume transfer request delete <transfer>
```

Name or ID of transfer to delete.

For example:

```
$ openstack volume transfer request delete a6da6888-7cdf-4291-9c08-8c1f22426b8a
```

4\. Verify that transfer list is now empty and that the volume is again available for transfer:

```
$ openstack volume transfer request list
+----+-----------+------+
| ID | Volume ID | Name |
+----+-----------+------+
+----+-----------+------+
```

```
$ openstack volume list
+-----------------+-----------------+-----------------+------+-------------+
|       ID        |   Name          |      Status     | Size | Attached to |
+-----------------+-----------------+-----------------+------+-------------+
| 72bfce9f-cac... |       None      |      error      |  1   |             |
| a1cdace0-08e... |       None      |    available    |  1   |             |
+-----------------+-----------------+-----------------+------+-------------+
```

---

## **Manage and unmanage a snapshot**

A snapshot is a point in time version of a volume. As an administrator, you can manage and unmanage snapshots.

### Manage a snapshot

Manage a snapshot with the **openstack volume snapshot set** command:

```
$ openstack volume snapshot set [-h]
                                [--name <name>]
                                [--description <description>]
                                [--no-property]
                                [--property <key=value>]
                                [--state <state>]
                                <snapshot>
```

The arguments to be passed are:`--name <name>`

New snapshot name`--description <description>`

New snapshot description`--no-property`

Remove all properties from \<snapshot> (specify both –no-property and –property to remove the current properties before setting new properties.)`--property <key=value>`

Property to add or modify for this snapshot (repeat option to set multiple properties)`--state <state>`

New snapshot state. (“available”, “error”, “creating”, “deleting”, or “error\_deleting”) (admin only) (This option simply changes the state of the snapshot in the database with no regard to actual status, exercise caution when using)`<snapshot>`

Snapshot to modify (name or ID)

```
$ openstack volume snapshot set my-snapshot-id
```

### Unmanage a snapshot

Unmanage a snapshot with the **openstack volume snapshot unset** command:

```
$ openstack volume snapshot unset [-h]
                                  [--property <key>]
                                  <snapshot>
```

The arguments to be passed are:`--property <key>`

Property to remove from snapshot (repeat option to remove multiple properties)`<snapshot>`

Snapshot to modify (name or ID).

The following example unmanages the `my-snapshot-id` image:

```
$ openstack volume snapshot unset my-snapshot-id
```

---

## **Report backend state in service list**

Each of the Cinder services report a Status and a State. These are the administrative state and the runtime state, respectively.

To get a listing of all Cinder services and their states, run the command:

```
$ openstack volume service list
+------------------+-------------------+------+---------+-------+----------------------------+
| Binary           | Host              | Zone | Status  | State | Updated At                 |
+------------------+-------------------+------+---------+-------+----------------------------+
| cinder-scheduler | tower             | nova | enabled | up    | 2018-03-30T21:16:11.000000 |
| cinder-volume    | tower@lvmdriver-1 | nova | enabled | up    | 2018-03-30T21:16:15.000000 |
| cinder-backup    | tower             | nova | enabled | up    | 2018-03-30T21:16:14.000000 |
+------------------+-------------------+------+---------+-------+----------------------------+
```
