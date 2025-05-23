# **Volume Backups**

The `openstack` command-line interface provides the tools for creating a volume backup. You can restore a volume from a backup as long as the backup’s associated database information (or backup metadata) is intact in the Block Storage database.

Run this command to create a backup of a volume:

```
$ openstack volume backup create [--incremental] [--force] VOLUME
```

Where `VOLUME` is the name or ID of the volume, `incremental` is a flag that indicates whether an incremental backup should be performed, and `force` is a flag that allows or disallows backup of a volume when the volume is attached to an instance.

Without the `incremental` flag, a full backup is created by default. With the `incremental` flag, an incremental backup is created.

Without the `force` flag, the volume will be backed up only if its status is `available`. With the `force` flag, the volume will be backed up whether its status is `available` or `in-use`. A volume is `in-use` when it is attached to an instance. The backup of an `in-use` volume means your data is crash consistent. The `force` flag is False by default.

!!! Note
	The `force` flag is new in OpenStack Liberty.

The incremental backup is based on a parent backup which is an existing backup with the latest timestamp. The parent backup can be a full backup or an incremental backup depending on the timestamp.

??? Note
	The first backup of a volume has to be a full backup. Attempting to do an incremental backup without any existing backups will fail. There is an `is_incremental` flag that indicates whether a backup is incremental when showing details on the backup. Another flag, `has_dependent_backups`, returned when showing backup details, will indicate whether the backup has dependent backups. If it is `true`, attempting to delete this backup will fail.

A new configure option `backup_swift_block_size` is introduced into `cinder.conf` for the default Swift backup driver. This is the size in bytes that changes are tracked for incremental backups. The existing `backup_swift_object_size` option, the size in bytes of Swift backup objects, has to be a multiple of `backup_swift_block_size`. The default is 32768 for `backup_swift_block_size`, and the default is 52428800 for `backup_swift_object_size`.

The configuration option `backup_swift_enable_progress_timer` in `cinder.conf` is used when backing up the volume to Object Storage back end. This option enables or disables the timer. It is enabled by default to send the periodic progress notifications to the Telemetry service.

This command also returns a backup ID. Use this backup ID when restoring the volume:

```
$ openstack volume backup restore BACKUP_ID VOLUME_ID
```

When restoring from a full backup, it is a full restore.

When restoring from an incremental backup, a list of backups is built based on the IDs of the parent backups. A full restore is performed based on the full backup first, then restore is done based on the incremental backup, laying on top of it in order.

You can view a backup list with the **openstack volume backup list** command. Optional arguments to clarify the status of your backups include: running `--name`, `--status`, and `--volume` to filter through backups by the specified name, status, or volume-id. Search with `--all-projects` for details of the projects associated with the listed backups.

Because volume backups are dependent on the Block Storage database, you must also back up your Block Storage database regularly to ensure data recovery.

??? Note
	Alternatively, you can export and save the metadata of selected volume backups. Doing so precludes the need to back up the entire Block Storage database. This is useful if you need only a small subset of volumes to survive a catastrophic database failure.
	If you specify a UUID encryption key when setting up the volume specifications, the backup metadata ensures that the key will remain valid when you back up and restore the volume.
	For more information about how to export and import volume backup metadata, see the section called [Export and import backup metadata](https://docs.openstack.org/cinder/zed/admin/volume-backups-export-import.html#volume-backups-export-import).

By default, the swift object store is used for the backup repository.

If instead you want to use an NFS export as the backup repository, add the following configuration options to the `[DEFAULT]` section of the `cinder.conf` file and restart the Block Storage services:

```
backup_driver = cinder.backup.drivers.nfs
backup_share = HOST:EXPORT_PATH
```

For the `backup_share` option, replace `HOST` with the DNS resolvable host name or the IP address of the storage server for the NFS share, and `EXPORT_PATH` with the path to that share. If your environment requires that non-default mount options be specified for the share, set these as follows:

```
backup_mount_options = MOUNT_OPTIONS
```

`MOUNT_OPTIONS` is a comma-separated string of NFS mount options as detailed in the NFS man page.

There are several other options whose default values may be overridden as appropriate for your environment:

```
backup_compression_algorithm = zlib
backup_sha_block_size_bytes = 32768
backup_file_size = 1999994880
```

The option `backup_compression_algorithm` can be set to `zlib`, `bz2`, `zstd` or `none`. The value `none` can be a useful setting when the server providing the share for the backup repository itself performs deduplication or compression on the backup data.

The option `backup_file_size` must be a multiple of `backup_sha_block_size_bytes`. It is effectively the maximum file size to be used, given your environment, to hold backup data. Volumes larger than this will be stored in multiple files in the backup repository. `backup_file_size` also determines the buffer size used to produce backup files; on smaller hosts it may need to be scaled down to avoid OOM issues. The `backup_sha_block_size_bytes` option determines the size of blocks from the cinder volume being backed up on which digital signatures are calculated in order to enable incremental backup capability.

You also have the option of resetting the state of a backup. When creating or restoring a backup, sometimes it may get stuck in the creating or restoring states due to problems like the database or rabbitmq being down. In situations like these resetting the state of the backup can restore it to a functional status.

Run this command to restore the state of a backup:

```
$ cinder backup-reset-state [--state STATE] BACKUP_ID-1 BACKUP_ID-2 ...
```

Run this command to create a backup of a snapshot:

```
$ openstack volume backup create [--incremental] [--force] \
  [--snapshot SNAPSHOT_ID] VOLUME
```

Where `VOLUME` is the name or ID of the volume, `SNAPSHOT_ID` is the ID of the volume’s snapshot.

---

## **Cancelling**

Since Liberty it is possible to cancel an ongoing backup operation on any of the Chunked Backup type of drivers such as Swift, NFS, Google, GlusterFS, and Posix.

To issue a backup cancellation on a backup we must request a force delete on the backup.

```
$ openstack volume backup delete --force BACKUP_ID
```

!!! Note
	The policy on force delete defaults to admin only.

Even if the backup is immediately deleted, and therefore no longer appears in the listings, the cancellation may take a little bit longer, so please check the status of the source resource to see when it stops being “backing-up”.

??? Note
	Before Pike the “backing-up” status would always be stored in the volume, even when backing up a snapshot, so when backing up a snapshot any delete operation on the snapshot that followed a cancellation could result in an error if the snapshot was still mapped. Polling on the volume to stop being “backing-up” prior to the deletion is required to ensure success.

Since Rocky it is also possible to cancel an ongoing restoring operation on any of the Chunked Backup type of drivers.

To issue a backup restoration cancellation we need to alter its status to anything other than restoring. We strongly recommend using the “error” state to avoid any confusion on whether the restore was successful or not.

```
$ openstack volume backup set --state error BACKUP_ID
```

After a restore operation has started, if it is then cancelled, the destination volume is useless, as there is no way of knowing how much data, or if any, was actually restored, hence our recommendation of using the “error” state.

---

## **backup\_max\_operations**

With this configuration option will let us select the maximum number of operations, backup and restore, that can be performed concurrently.

This option has a default value of 15, which means that we can have 15 concurrent backups, or 15 concurrent restores, or any combination of backups and restores as long as the sum of the 2 operations don’t exceed 15.

The concurrency limitation of this configuration option is also enforced when we run multiple processes for the same backup service using the `backup_workers` configuration option. It is not a per process restriction, but global to the service, so we won’t be able to run `backup_max_operations` on each one of the processes, but on all the running processes from the same backup service.

Backups and restore operations are both CPU and memory intensive, but thanks to this option we can limit the concurrency and prevent DoS attacks or just service disruptions caused by many concurrent requests that lead to Out of Memory (OOM) kills.

The amount of memory (RAM) used during the operation depends on the configured chunk size as well as the compression ratio achieved on the data during the operation.

???+ info "Example"
	Let’s have a look at how much memory would be needed if we use the default backup chunk size (\~1.86 GB) while doing a restore to an RBD volume from a non Ceph backend (Swift, NFS etc).In a restore operation the worst case scenario, from the memory point of view, is when the compression ratio is close to 0% (the compressed data chunk is almost the same size as the uncompressed data).In this case the memory usage would be \~5.58 GB of data for each chunk: \~5.58 GB = read buffer + decompressed buffer + write buffer used by the librbd library = \~1.86 GB + 1.86 GB + 1.86 GBFor 15 concurrent restore operations, the cinder-backup service will require \~83.7 GB of memory.

Similar calculations can be done for environment specific scenarios and this config option can be set accordingly.
