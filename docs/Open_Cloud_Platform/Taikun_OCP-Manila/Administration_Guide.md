# **Administration Guide**

Shared File Systems service provides a set of services for management of shared file systems in a multi-project cloud environment. The service resembles OpenStack block-based storage management from the OpenStack Block Storage service project. With the Shared File Systems service, you can create a remote file system, mount the file system on your instances, and then read and write data from your instances to and from your file system.

The Shared File Systems service serves same purpose as the Amazon Elastic File System (EFS) does.

The Shared File Systems service can run in a single-node or multiple node configuration. The Shared File Systems service can be configured to provision shares from one or more back ends, so it is required to declare at least one back end. Shared File System service contains several configurable components.

It is important to understand these components:

* Share networks

* Shares

* Multi-tenancy

* Back ends

The Shared File Systems service consists of four types of services, most of which are similar to those of the Block Storage service:

* `manila-api`

* `manila-data`

* `manila-scheduler`

* `manila-share`

Installation of first three – `manila-api`, `manila-data`, and `manila-scheduler` is common for almost all deployments. But configuration of `manila-share` is backend-specific and can differ from deployment to deployment.

* [Key concepts](https://docs.openstack.org/manila/zed/admin/shared-file-systems-key-concepts.html)

* [Share management](https://docs.openstack.org/manila/zed/admin/shared-file-systems-share-management.html)

* [Share types](https://docs.openstack.org/manila/zed/admin/shared-file-systems-share-types.html)

* [Share group types](https://docs.openstack.org/manila/zed/admin/shared-file-systems-share-group-types.html)

* [Share groups](https://docs.openstack.org/manila/zed/admin/shared-file-systems-share-groups.html)

* [Share snapshots](https://docs.openstack.org/manila/zed/admin/shared-file-systems-snapshots.html)

* [Share servers](https://docs.openstack.org/manila/zed/admin/shared-file-systems-share-server-management.html)

* [Share server management](https://docs.openstack.org/manila/zed/admin/shared-file-systems-share-server-management.html#share-server-management)

* [Share server limits (Since Wallaby release)](https://docs.openstack.org/manila/zed/admin/shared-file-systems-share-server-management.html#share-server-limits-since-wallaby-release)

* [Security services](https://docs.openstack.org/manila/zed/admin/shared-file-systems-security-services.html)

* [Share migration](https://docs.openstack.org/manila/zed/admin/shared-file-systems-share-migration.html)

* [Share replication](https://docs.openstack.org/manila/zed/admin/shared-file-systems-share-replication.html)

* [Multi-storage configuration](https://docs.openstack.org/manila/zed/admin/shared-file-systems-multi-backend.html)

* [Networking](https://docs.openstack.org/manila/zed/admin/shared-file-systems-networking.html)

* [Troubleshoot Shared File Systems service](https://docs.openstack.org/manila/zed/admin/shared-file-systems-troubleshoot.html)

* [Profiling the Shared File Systems service](https://docs.openstack.org/manila/zed/admin/shared-file-systems-profiling.html)

* [Upgrading the Shared File System service](https://docs.openstack.org/manila/zed/admin/shared-file-systems-upgrades.html)

* [Share revert to snapshot](https://docs.openstack.org/manila/zed/admin/shared-file-systems-share-revert-to-snapshot.html)

* [Share server migration](https://docs.openstack.org/manila/zed/admin/shared-file-systems-share-server-migration.html)

* [Manila share features support mapping](https://docs.openstack.org/manila/zed/admin/share_back_ends_feature_support_mapping.html)

* [Capabilities and Extra-Specs](https://docs.openstack.org/manila/zed/admin/capabilities_and_extra_specs.html)

* [Group Capabilities and group-specs](https://docs.openstack.org/manila/zed/admin/group_capabilities_and_extra_specs.html)

* [Export Location Metadata](https://docs.openstack.org/manila/zed/admin/export_location_metadata.html)

---

## **Supported share back ends**

The manila share service must be configured to use drivers for one or more storage back ends, as described in general terms below. See the drivers section in the [Configuration Reference](https://docs.openstack.org/manila/latest/configuration/shared-file-systems/drivers.html) for detailed configuration options for each back end.

* [Container Driver](https://docs.openstack.org/manila/zed/admin/container_driver.html)

  * [Supported operations](https://docs.openstack.org/manila/zed/admin/container_driver.html#supported-operations)

  * [Restrictions](https://docs.openstack.org/manila/zed/admin/container_driver.html#restrictions)

  * [Known problems](https://docs.openstack.org/manila/zed/admin/container_driver.html#known-problems)

  * [Setting up container driver with devstack](https://docs.openstack.org/manila/zed/admin/container_driver.html#setting-up-container-driver-with-devstack)

  * [Setting Container Driver Up Manually](https://docs.openstack.org/manila/zed/admin/container_driver.html#setting-container-driver-up-manually)

* [ZFS (on Linux) Driver](https://docs.openstack.org/manila/zed/admin/zfs_on_linux_driver.html)

  * [Requirements](https://docs.openstack.org/manila/zed/admin/zfs_on_linux_driver.html#requirements)

  * [Supported Operations](https://docs.openstack.org/manila/zed/admin/zfs_on_linux_driver.html#supported-operations)

  * [Possibilities](https://docs.openstack.org/manila/zed/admin/zfs_on_linux_driver.html#possibilities)

  * [Restrictions](https://docs.openstack.org/manila/zed/admin/zfs_on_linux_driver.html#restrictions)

  * [Known problems](https://docs.openstack.org/manila/zed/admin/zfs_on_linux_driver.html#known-problems)

  * [Backend Configuration](https://docs.openstack.org/manila/zed/admin/zfs_on_linux_driver.html#backend-configuration)

    * [The `manila.share.drivers.zfsonlinux.driver` Module](https://docs.openstack.org/manila/zed/admin/zfs_on_linux_driver.html#the-manila-share-drivers-zfsonlinux-driver-module)

    * [The `manila.share.drivers.zfsonlinux.utils` Module](https://docs.openstack.org/manila/zed/admin/zfs_on_linux_driver.html#the-manila-share-drivers-zfsonlinux-utils-module)

* [NetApp Clustered Data ONTAP](https://docs.openstack.org/manila/zed/admin/netapp_cluster_mode_driver.html)

  * [Supported Operations](https://docs.openstack.org/manila/zed/admin/netapp_cluster_mode_driver.html#supported-operations)

  * [Supported Operating Modes](https://docs.openstack.org/manila/zed/admin/netapp_cluster_mode_driver.html#supported-operating-modes)

  * [Network approach](https://docs.openstack.org/manila/zed/admin/netapp_cluster_mode_driver.html#network-approach)

  * [Supported shared filesystems](https://docs.openstack.org/manila/zed/admin/netapp_cluster_mode_driver.html#supported-shared-filesystems)

  * [Required licenses](https://docs.openstack.org/manila/zed/admin/netapp_cluster_mode_driver.html#required-licenses)

  * [Known restrictions](https://docs.openstack.org/manila/zed/admin/netapp_cluster_mode_driver.html#known-restrictions)

    * [The `manila.share.drivers.netapp.common.py` Module](https://docs.openstack.org/manila/zed/admin/netapp_cluster_mode_driver.html#the-manila-share-drivers-netapp-common-py-module)

* [Isilon Driver](https://docs.openstack.org/manila/zed/admin/emc_isilon_driver.html)

  * [Requirements](https://docs.openstack.org/manila/zed/admin/emc_isilon_driver.html#requirements)

  * [Supported Operations](https://docs.openstack.org/manila/zed/admin/emc_isilon_driver.html#supported-operations)

  * [Backend Configuration](https://docs.openstack.org/manila/zed/admin/emc_isilon_driver.html#backend-configuration)

  * [Restrictions](https://docs.openstack.org/manila/zed/admin/emc_isilon_driver.html#restrictions)

    * [The `manila.share.drivers.dell_emc.driver` Module](https://docs.openstack.org/manila/zed/admin/emc_isilon_driver.html#the-manila-share-drivers-dell-emc-driver-module)

    * [The `manila.share.drivers.dell_emc.plugins.isilon.isilon` Module](https://docs.openstack.org/manila/zed/admin/emc_isilon_driver.html#the-manila-share-drivers-dell-emc-plugins-isilon-isilon-module)

* [VNX Driver](https://docs.openstack.org/manila/zed/admin/emc_vnx_driver.html)

  * [Requirements](https://docs.openstack.org/manila/zed/admin/emc_vnx_driver.html#requirements)

  * [Supported Operations](https://docs.openstack.org/manila/zed/admin/emc_vnx_driver.html#supported-operations)

  * [Pre-Configurations on VNX](https://docs.openstack.org/manila/zed/admin/emc_vnx_driver.html#pre-configurations-on-vnx)

  * [Backend Configuration](https://docs.openstack.org/manila/zed/admin/emc_vnx_driver.html#backend-configuration)

  * [IPv6 support](https://docs.openstack.org/manila/zed/admin/emc_vnx_driver.html#ipv6-support)

    * [Pre-Configurations for IPv6 support](https://docs.openstack.org/manila/zed/admin/emc_vnx_driver.html#pre-configurations-for-ipv6-support)

  * [Snapshot support](https://docs.openstack.org/manila/zed/admin/emc_vnx_driver.html#snapshot-support)

    * [Pre-Configurations for Snapshot support](https://docs.openstack.org/manila/zed/admin/emc_vnx_driver.html#pre-configurations-for-snapshot-support)

    * [To snapshot a share and create share from the snapshot](https://docs.openstack.org/manila/zed/admin/emc_vnx_driver.html#to-snapshot-a-share-and-create-share-from-the-snapshot)

  * [Restrictions](https://docs.openstack.org/manila/zed/admin/emc_vnx_driver.html#restrictions)

    * [The `manila.share.drivers.dell_emc.driver` Module](https://docs.openstack.org/manila/zed/admin/emc_vnx_driver.html#the-manila-share-drivers-dell-emc-driver-module)

    * [The `manila.share.drivers.dell_emc.plugins.vnx.connection` Module](https://docs.openstack.org/manila/zed/admin/emc_vnx_driver.html#the-manila-share-drivers-dell-emc-plugins-vnx-connection-module)

* [Dell EMC Unity driver](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html)

  * [Requirements](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#requirements)

  * [Supported shared filesystems and operations](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#supported-shared-filesystems-and-operations)

  * [Supported Network Topologies](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#supported-network-topologies)

  * [Pre-Configurations](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#pre-configurations)

    * [On Manila Node](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#on-manila-node)

    * [On Unity System](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#on-unity-system)

  * [Backend configurations](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#backend-configurations)

  * [Supported MTU size](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#supported-mtu-size)

  * [IPv6 support](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#ipv6-support)

  * [Pre-Configurations for IPv6 support](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#pre-configurations-for-ipv6-support)

  * [Supported share creation in mode that driver does not create and destroy share servers (DHSS=False)](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#supported-share-creation-in-mode-that-driver-does-not-create-and-destroy-share-servers-dhss-false)

  * [Snapshot support](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#snapshot-support)

  * [Pre-Configurations for Snapshot support](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#pre-configurations-for-snapshot-support)

  * [To snapshot a share and create share from the snapshot](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#to-snapshot-a-share-and-create-share-from-the-snapshot)

  * [To manage an existing share server](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#to-manage-an-existing-share-server)

  * [To un-manage a Manila share server](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#to-un-manage-a-manila-share-server)

  * [To manage an existing share](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#to-manage-an-existing-share)

  * [To un-manage a Manila share](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#to-un-manage-a-manila-share)

  * [To manage an existing share snapshot](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#to-manage-an-existing-share-snapshot)

  * [To un-manage a Manila share snapshot](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#to-un-manage-a-manila-share-snapshot)

  * [Supported security services](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#supported-security-services)

  * [IO Load balance](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#io-load-balance)

  * [Default filter function](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#default-filter-function)

  * [Restrictions](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#restrictions)

  * [API Implementations](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#api-implementations)

  * [Driver options](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/dell-emc-unity-driver.html#driver-options)

* [Generic approach for share provisioning](https://docs.openstack.org/manila/zed/admin/generic_driver.html)

  * [Network configurations](https://docs.openstack.org/manila/zed/admin/generic_driver.html#network-configurations)

  * [Requirements for service image](https://docs.openstack.org/manila/zed/admin/generic_driver.html#requirements-for-service-image)

  * [Supported shared filesystems](https://docs.openstack.org/manila/zed/admin/generic_driver.html#supported-shared-filesystems)

  * [Known restrictions](https://docs.openstack.org/manila/zed/admin/generic_driver.html#known-restrictions)

    * [Using Windows instances](https://docs.openstack.org/manila/zed/admin/generic_driver.html#using-windows-instances)

    * [The `manila.share.drivers.generic` Module](https://docs.openstack.org/manila/zed/admin/generic_driver.html#the-manila-share-drivers-generic-module)

    * [The `manila.share.drivers.service_instance` Module](https://docs.openstack.org/manila/zed/admin/generic_driver.html#the-manila-share-drivers-service-instance-module)

* [GlusterFS driver](https://docs.openstack.org/manila/zed/admin/glusterfs_driver.html)

  * [Supported shared filesystems](https://docs.openstack.org/manila/zed/admin/glusterfs_driver.html#supported-shared-filesystems)

  * [Supported Operations](https://docs.openstack.org/manila/zed/admin/glusterfs_driver.html#supported-operations)

  * [Requirements](https://docs.openstack.org/manila/zed/admin/glusterfs_driver.html#requirements)

  * [Manila driver configuration setting](https://docs.openstack.org/manila/zed/admin/glusterfs_driver.html#manila-driver-configuration-setting)

  * [Layouts](https://docs.openstack.org/manila/zed/admin/glusterfs_driver.html#layouts)

    * [Gluster NFS with volume mapped layout](https://docs.openstack.org/manila/zed/admin/glusterfs_driver.html#gluster-nfs-with-volume-mapped-layout)

  * [Known Restrictions](https://docs.openstack.org/manila/zed/admin/glusterfs_driver.html#known-restrictions)

    * [The `manila.share.drivers.glusterfs` Module](https://docs.openstack.org/manila/zed/admin/glusterfs_driver.html#the-manila-share-drivers-glusterfs-module)

* [GlusterFS Native driver](https://docs.openstack.org/manila/zed/admin/glusterfs_native_driver.html)

  * [Network Approach](https://docs.openstack.org/manila/zed/admin/glusterfs_native_driver.html#network-approach)

  * [Supported shared filesystems](https://docs.openstack.org/manila/zed/admin/glusterfs_native_driver.html#supported-shared-filesystems)

  * [Multi-tenancy model](https://docs.openstack.org/manila/zed/admin/glusterfs_native_driver.html#multi-tenancy-model)

  * [Supported Operations](https://docs.openstack.org/manila/zed/admin/glusterfs_native_driver.html#supported-operations)

  * [Requirements](https://docs.openstack.org/manila/zed/admin/glusterfs_native_driver.html#requirements)

  * [Manila driver configuration setting](https://docs.openstack.org/manila/zed/admin/glusterfs_native_driver.html#manila-driver-configuration-setting)

  * [Host and backend configuration](https://docs.openstack.org/manila/zed/admin/glusterfs_native_driver.html#host-and-backend-configuration)

  * [Known Restrictions](https://docs.openstack.org/manila/zed/admin/glusterfs_native_driver.html#known-restrictions)

    * [The `manila.share.drivers.glusterfs.glusterfs_native.GlusterfsNativeShareDriver` Module](https://docs.openstack.org/manila/zed/admin/glusterfs_native_driver.html#the-manila-share-drivers-glusterfs-glusterfs-native-glusterfsnativesharedriver-module)

* [CephFS driver](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html)

  * [Supported Operations](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#supported-operations)

  * [Prerequisites](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#prerequisites)

    * [Ceph testing matrix](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#ceph-testing-matrix)

    * [Common Prerequisites](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#common-prerequisites)

    * [For CephFS native shares](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#for-cephfs-native-shares)

    * [For CephFS NFS shares](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#for-cephfs-nfs-shares)

  * [Authorizing the driver to communicate with Ceph](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#authorizing-the-driver-to-communicate-with-ceph)

  * [Enabling snapshot support in Ceph backend](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#enabling-snapshot-support-in-ceph-backend)

  * [Configuring CephFS backend in manila.conf](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#configuring-cephfs-backend-in-manila-conf)

    * [Configure CephFS native share backend in manila.conf](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#configure-cephfs-native-share-backend-in-manila-conf)

    * [Configure CephFS NFS share backend in manila.conf](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#configure-cephfs-nfs-share-backend-in-manila-conf)

  * [Space considerations](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#space-considerations)

  * [Creating shares](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#creating-shares)

    * [Create CephFS native share](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#create-cephfs-native-share)

    * [Create CephFS NFS share](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#create-cephfs-nfs-share)

  * [Allowing access to shares](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#allowing-access-to-shares)

    * [Allow access to CephFS native share](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#allow-access-to-cephfs-native-share)

    * [Allow access to CephFS NFS share](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#allow-access-to-cephfs-nfs-share)

  * [Mounting CephFS shares](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#mounting-cephfs-shares)

    * [Mounting CephFS native share using FUSE client](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#mounting-cephfs-native-share-using-fuse-client)

    * [Mounting CephFS native share using Kernel client](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#mounting-cephfs-native-share-using-kernel-client)

    * [Mount CephFS NFS share using NFS client](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#mount-cephfs-nfs-share-using-nfs-client)

  * [Known restrictions](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#known-restrictions)

  * [Security](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#security)

    * [Security with CephFS native share backend](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#security-with-cephfs-native-share-backend)

  * [The `manila.share.drivers.cephfs.driver` Module](https://docs.openstack.org/manila/zed/admin/cephfs_driver.html#the-manila-share-drivers-cephfs-driver-module)

* [GPFS Driver](https://docs.openstack.org/manila/zed/admin/gpfs_driver.html)

  * [Supported shared filesystems](https://docs.openstack.org/manila/zed/admin/gpfs_driver.html#supported-shared-filesystems)

  * [Supported Operations](https://docs.openstack.org/manila/zed/admin/gpfs_driver.html#supported-operations)

  * [Requirements](https://docs.openstack.org/manila/zed/admin/gpfs_driver.html#requirements)

  * [Manila driver configuration setting](https://docs.openstack.org/manila/zed/admin/gpfs_driver.html#manila-driver-configuration-setting)

  * [Known Restrictions](https://docs.openstack.org/manila/zed/admin/gpfs_driver.html#known-restrictions)

    * [The `manila.share.drivers.ibm.gpfs` Module](https://docs.openstack.org/manila/zed/admin/gpfs_driver.html#the-manila-share-drivers-ibm-gpfs-module)

* [Huawei Driver](https://docs.openstack.org/manila/zed/admin/huawei_nas_driver.html)

  * [Requirements](https://docs.openstack.org/manila/zed/admin/huawei_nas_driver.html#requirements)

  * [Supported Operations](https://docs.openstack.org/manila/zed/admin/huawei_nas_driver.html#supported-operations)

  * [Pre-Configurations on Huawei](https://docs.openstack.org/manila/zed/admin/huawei_nas_driver.html#pre-configurations-on-huawei)

  * [Backend Configuration](https://docs.openstack.org/manila/zed/admin/huawei_nas_driver.html#backend-configuration)

  * [Share Types](https://docs.openstack.org/manila/zed/admin/huawei_nas_driver.html#share-types)

  * [Restrictions](https://docs.openstack.org/manila/zed/admin/huawei_nas_driver.html#restrictions)

    * [The `manila.share.drivers.huawei.huawei_nas` Module](https://docs.openstack.org/manila/zed/admin/huawei_nas_driver.html#the-manila-share-drivers-huawei-huawei-nas-module)

* [HDFS native driver](https://docs.openstack.org/manila/zed/admin/hdfs_native_driver.html)

  * [Network configuration](https://docs.openstack.org/manila/zed/admin/hdfs_native_driver.html#network-configuration)

  * [Supported shared filesystems](https://docs.openstack.org/manila/zed/admin/hdfs_native_driver.html#supported-shared-filesystems)

  * [Supported Operations](https://docs.openstack.org/manila/zed/admin/hdfs_native_driver.html#supported-operations)

  * [Requirements](https://docs.openstack.org/manila/zed/admin/hdfs_native_driver.html#requirements)

  * [Manila driver configuration](https://docs.openstack.org/manila/zed/admin/hdfs_native_driver.html#manila-driver-configuration)

  * [Known Restrictions](https://docs.openstack.org/manila/zed/admin/hdfs_native_driver.html#known-restrictions)

    * [The `manila.share.drivers.hdfs.hdfs_native` Module](https://docs.openstack.org/manila/zed/admin/hdfs_native_driver.html#the-manila-share-drivers-hdfs-hdfs-native-module)

* [Hitachi NAS Platform File Services Driver for OpenStack](https://docs.openstack.org/manila/zed/admin/hitachi_hnas_driver.html)

  * [Driver Version 3.0](https://docs.openstack.org/manila/zed/admin/hitachi_hnas_driver.html#driver-version-3-0)

    * [Hitachi NAS Platform Storage Requirements](https://docs.openstack.org/manila/zed/admin/hitachi_hnas_driver.html#hitachi-nas-platform-storage-requirements)

    * [Supported Operations](https://docs.openstack.org/manila/zed/admin/hitachi_hnas_driver.html#supported-operations)

    * [Driver Configuration](https://docs.openstack.org/manila/zed/admin/hitachi_hnas_driver.html#driver-configuration)

    * [Manage and Unmanage Shares](https://docs.openstack.org/manila/zed/admin/hitachi_hnas_driver.html#manage-and-unmanage-shares)

    * [Additional Notes](https://docs.openstack.org/manila/zed/admin/hitachi_hnas_driver.html#additional-notes)

    * [The `manila.share.drivers.hitachi.hnas.driver` Module](https://docs.openstack.org/manila/zed/admin/hitachi_hnas_driver.html#the-manila-share-drivers-hitachi-hnas-driver-module)

* [HPE 3PAR Driver for OpenStack Manila](https://docs.openstack.org/manila/zed/admin/hpe_3par_driver.html)

  * [Supported Operations](https://docs.openstack.org/manila/zed/admin/hpe_3par_driver.html#supported-operations)

  * [Requirements](https://docs.openstack.org/manila/zed/admin/hpe_3par_driver.html#requirements)

  * [Pre-Configuration on the HPE 3PAR](https://docs.openstack.org/manila/zed/admin/hpe_3par_driver.html#pre-configuration-on-the-hpe-3par)

  * [Backend Configuration](https://docs.openstack.org/manila/zed/admin/hpe_3par_driver.html#backend-configuration)

  * [Backend Configuration for AD user](https://docs.openstack.org/manila/zed/admin/hpe_3par_driver.html#backend-configuration-for-ad-user)

  * [Example of using AD user to access CIFS share](https://docs.openstack.org/manila/zed/admin/hpe_3par_driver.html#example-of-using-ad-user-to-access-cifs-share)

  * [Network Approach](https://docs.openstack.org/manila/zed/admin/hpe_3par_driver.html#network-approach)

  * [Share Types](https://docs.openstack.org/manila/zed/admin/hpe_3par_driver.html#share-types)

  * [Delete Nested Shares](https://docs.openstack.org/manila/zed/admin/hpe_3par_driver.html#delete-nested-shares)

    * [The `manila.share.drivers.hpe.hpe_3par_driver` Module](https://docs.openstack.org/manila/zed/admin/hpe_3par_driver.html#the-manila-share-drivers-hpe-hpe-3par-driver-module)

* [Infortrend Driver for OpenStack Manila](https://docs.openstack.org/manila/zed/admin/infortrend_driver.html)

  * [Requirements](https://docs.openstack.org/manila/zed/admin/infortrend_driver.html#requirements)

  * [Supported shared filesystems and operations](https://docs.openstack.org/manila/zed/admin/infortrend_driver.html#supported-shared-filesystems-and-operations)

  * [Backend Configuration](https://docs.openstack.org/manila/zed/admin/infortrend_driver.html#backend-configuration)

  * [Share Types](https://docs.openstack.org/manila/zed/admin/infortrend_driver.html#share-types)

  * [Back-end configuration example](https://docs.openstack.org/manila/zed/admin/infortrend_driver.html#back-end-configuration-example)

* [Macrosan Driver for OpenStack Manila](https://docs.openstack.org/manila/zed/admin/macrosan_driver.html)

  * [Requirements](https://docs.openstack.org/manila/zed/admin/macrosan_driver.html#requirements)

  * [Supported Operations](https://docs.openstack.org/manila/zed/admin/macrosan_driver.html#supported-operations)

  * [Backend Configuration](https://docs.openstack.org/manila/zed/admin/macrosan_driver.html#backend-configuration)

  * [Share Types](https://docs.openstack.org/manila/zed/admin/macrosan_driver.html#share-types)

  * [Back-end configuration example](https://docs.openstack.org/manila/zed/admin/macrosan_driver.html#back-end-configuration-example)

* [Pure Storage FlashBlade Driver for OpenStack Manila](https://docs.openstack.org/manila/zed/admin/purestorage_flashblade_driver.html)

  * [Supported Operations](https://docs.openstack.org/manila/zed/admin/purestorage_flashblade_driver.html#supported-operations)

  * [General Requirements](https://docs.openstack.org/manila/zed/admin/purestorage_flashblade_driver.html#general-requirements)

  * [Network Requirements](https://docs.openstack.org/manila/zed/admin/purestorage_flashblade_driver.html#network-requirements)

  * [Driver Configuration](https://docs.openstack.org/manila/zed/admin/purestorage_flashblade_driver.html#driver-configuration)

    * [Step 1 – FlashBlade Parameters configuration](https://docs.openstack.org/manila/zed/admin/purestorage_flashblade_driver.html#step-1-flashblade-parameters-configuration)

    * [Step 2 – Share Type Configuration](https://docs.openstack.org/manila/zed/admin/purestorage_flashblade_driver.html#step-2-share-type-configuration)

    * [Step 3 – Restart the Services](https://docs.openstack.org/manila/zed/admin/purestorage_flashblade_driver.html#step-3-restart-the-services)

  * [The `manila.share.drivers.purestorage.flashblade` Module](https://docs.openstack.org/manila/zed/admin/purestorage_flashblade_driver.html#the-manila-share-drivers-purestorage-flashblade-module)

* [Tegile Driver](https://docs.openstack.org/manila/zed/admin/tegile_driver.html)

  * [Requirements](https://docs.openstack.org/manila/zed/admin/tegile_driver.html#requirements)

  * [Supported Operations](https://docs.openstack.org/manila/zed/admin/tegile_driver.html#supported-operations)

  * [Backend Configuration](https://docs.openstack.org/manila/zed/admin/tegile_driver.html#backend-configuration)

  * [Restrictions](https://docs.openstack.org/manila/zed/admin/tegile_driver.html#restrictions)

    * [The `manila.share.drivers.tegile.tegile` Module](https://docs.openstack.org/manila/zed/admin/tegile_driver.html#the-manila-share-drivers-tegile-tegile-module)

* [NexentaStor5 Driver for OpenStack Manila](https://docs.openstack.org/manila/zed/admin/nexentastor5_driver.html)

  * [Requirements](https://docs.openstack.org/manila/zed/admin/nexentastor5_driver.html#requirements)

  * [Supported shared filesystems and operations](https://docs.openstack.org/manila/zed/admin/nexentastor5_driver.html#supported-shared-filesystems-and-operations)

  * [Backend Configuration](https://docs.openstack.org/manila/zed/admin/nexentastor5_driver.html#backend-configuration)

  * [Share Types](https://docs.openstack.org/manila/zed/admin/nexentastor5_driver.html#share-types)

  * [Restrictions](https://docs.openstack.org/manila/zed/admin/nexentastor5_driver.html#restrictions)

  * [Back-end configuration example](https://docs.openstack.org/manila/zed/admin/nexentastor5_driver.html#back-end-configuration-example)

* [Windows SMB driver](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/windows-smb-driver.html)

  * [Limitations](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/windows-smb-driver.html#limitations)

  * [Prerequisites](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/windows-smb-driver.html#prerequisites)

  * [Configuring](https://docs.openstack.org/manila/zed/configuration/shared-file-systems/drivers/windows-smb-driver.html#configuring)

* [Zadara VPSA Driver for OpenStack Manila](https://docs.openstack.org/manila/zed/admin/zadara_driver.html)

  * [Requirements](https://docs.openstack.org/manila/zed/admin/zadara_driver.html#requirements)

  * [Supported shared filesystems and operations](https://docs.openstack.org/manila/zed/admin/zadara_driver.html#supported-shared-filesystems-and-operations)

    * [Share file system supported](https://docs.openstack.org/manila/zed/admin/zadara_driver.html#share-file-system-supported)

    * [Supported operations](https://docs.openstack.org/manila/zed/admin/zadara_driver.html#supported-operations)

    * [Backend Configuration](https://docs.openstack.org/manila/zed/admin/zadara_driver.html#backend-configuration)

  * [Driver options](https://docs.openstack.org/manila/zed/admin/zadara_driver.html#driver-options)

  * [Back-end configuration example](https://docs.openstack.org/manila/zed/admin/zadara_driver.html#back-end-configuration-example)
