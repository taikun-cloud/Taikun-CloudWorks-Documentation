# **Kubernetes Storage Classes**

## **Storage Classes**

This document describes the concept of a StorageClass in Kubernetes. Familiarity with [volumes](https://kubernetes.io/docs/concepts/storage/volumes/) and [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes) is suggested.

A StorageClass provides a way for administrators to describe the *classes* of storage they offer. Different classes might map to quality-of-service levels, or to backup policies, or to arbitrary policies determined by the cluster administrators. Kubernetes itself is unopinionated about what classes represent.

The Kubernetes concept of a storage class is similar to “profiles” in some other storage system designs.

---

## **StorageClass objects**

Each StorageClass contains the fields `provisioner`, `parameters`, and `reclaimPolicy`, which are used when a PersistentVolume belonging to the class needs to be dynamically provisioned to satisfy a PersistentVolumeClaim (PVC).

The name of a StorageClass object is significant, and is how users can request a particular class. Administrators set the name and other parameters of a class when first creating StorageClass objects.

As an administrator, you can specify a default StorageClass that applies to any PVCs that don’t request a specific class. For more details, see the [PersistentVolumeClaim concept](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims).

Here’s an example of a StorageClass:

[storage/storageclass-low-latency.yaml](https://raw.githubusercontent.com/kubernetes/website/main/content/en/examples/storage/storageclass-low-latency.yaml)

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: low-latency
  annotations:
    storageclass.kubernetes.io/is-default-class: "false"
provisioner: csi-driver.example-vendor.example
reclaimPolicy: Retain # default value is Delete
allowVolumeExpansion: true
mountOptions:
  - discard # this might enable UNMAP / TRIM at the block storage layer
volumeBindingMode: WaitForFirstConsumer
parameters:
  guaranteedReadWriteLatency: "true" # provider-specific
```

---

## **Default StorageClass**

You can mark a StorageClass as the default for your cluster. For instructions on setting the default StorageClass, see [Change the default StorageClass](https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/).

When a PVC does not specify a `storageClassName`, the default StorageClass is used.

If you set the [`storageclass.kubernetes.io/is-default-class`](https://kubernetes.io/docs/reference/labels-annotations-taints/#ingressclass-kubernetes-io-is-default-class) annotation to true on more than one StorageClass in your cluster, and you then create a PersistentVolumeClaim with no `storageClassName` set, Kubernetes uses the most recently created default StorageClass.

!!! Note
	You should try to only have one StorageClass in your cluster that is marked as the default. The reason that Kubernetes allows you to have multiple default StorageClasses is to allow for seamless migration.

You can create a PersistentVolumeClaim without specifying a `storageClassName` for the new PVC, and you can do so even when no default StorageClass exists in your cluster. In this case, the new PVC creates as you defined it, and the `storageClassName` of that PVC remains unset until a default becomes available.

You can have a cluster without any default StorageClass. If you don’t mark any StorageClass as default (and one hasn’t been set for you by, for example, a cloud provider), then Kubernetes cannot apply that defaulting for PersistentVolumeClaims that need it.

If or when a default StorageClass becomes available, the control plane identifies any existing PVCs without `storageClassName`. For the PVCs that either have an empty value for `storageClassName` or do not have this key, the control plane then updates those PVCs to set `storageClassName` to match the new default StorageClass. If you have an existing PVC where the `storageClassName` is `""`, and you configure a default StorageClass, then this PVC will not get updated.

In order to keep binding to PVs with `storageClassName` set to `""` (while a default StorageClass is present), you need to set the `storageClassName` of the associated PVC to `""`.

---

## **Provisioner**

Each StorageClass has a provisioner that determines what volume plugin is used for provisioning PVs. This field must be specified.

| Volume Plugin  | Internal Provisioner | Config Example  |
| -------------- | -------------------- | --------------- |
| AzureFile      | ✓                    | [Azure File](https://kubernetes.io/docs/concepts/storage/storage-classes/#azure-file)      |
| CephFS         | -                    | -               |
| FC             | -                    | -               |
| FlexVolume     | -                    | -               |
| iSCSI          | -                    | -               |
| Local          | -                    | [Local](https://kubernetes.io/docs/concepts/storage/storage-classes/#local)           |
| NFS            | -                    | [NFS](https://kubernetes.io/docs/concepts/storage/storage-classes/#nfs)             |
| PortworxVolume | ✓                    | [Portworx Volume](https://kubernetes.io/docs/concepts/storage/storage-classes/#portworx-volume) |
| RBD            | -                    | [Ceph RBD](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd)        |
| VsphereVolume  | ✓                    | [vSphere](https://kubernetes.io/docs/concepts/storage/storage-classes/#vsphere)         |

You are not restricted to specifying the “internal” provisioners listed here (whose names are prefixed with “kubernetes.io” and shipped alongside Kubernetes). You can also run and specify external provisioners, which are independent programs that follow a [specification](https://git.k8s.io/design-proposals-archive/storage/volume-provisioning.md) defined by Kubernetes. Authors of external provisioners have full discretion over where their code lives, how the provisioner is shipped, how it needs to be run, what volume plugin it uses (including Flex), etc. The repository [kubernetes-sigs/sig-storage-lib-external-provisioner](https://github.com/kubernetes-sigs/sig-storage-lib-external-provisioner) houses a library for writing external provisioners that implements the bulk of the specification. Some external provisioners are listed under the repository [kubernetes-sigs/sig-storage-lib-external-provisioner](https://github.com/kubernetes-sigs/sig-storage-lib-external-provisioner).

For example, NFS doesn’t provide an internal provisioner, but an external provisioner can be used. There are also cases when 3rd party storage vendors provide their own external provisioner.

---

## **Reclaim policy**

PersistentVolumes that are dynamically created by a StorageClass will have the [reclaim policy](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#reclaiming) specified in the `reclaimPolicy` field of the class, which can be either `Delete` or `Retain`. If no `reclaimPolicy` is specified when a StorageClass object is created, it will default to `Delete`.

PersistentVolumes that are created manually and managed via a StorageClass will have whatever reclaim policy they were assigned at creation.

---

## **Volume expansion**

PersistentVolumes can be configured to be expandable. This allows you to resize the volume by editing the corresponding PVC object, requesting a new larger amount of storage.

The following types of volumes support volume expansion, when the underlying StorageClass has the field `allowVolumeExpansion` set to true.

| Volume type    | Required Kubernetes version for volume expansion |
| -------------- | ------------------------------------------------ |
| AzureFile      | 1.11                                             |
| CSI            | 1.24                                             |
| FC             | 1.13                                             |
| FlexVolume     | 1.11                                             |
| PortworxVolume | 1.11                                             |
| rbd            | 1.11                                             |

!!! Note
	You can only use the volume expansion feature to grow a Volume, not to shrink it.

---

## **Mount options**

PersistentVolumes that are dynamically created by a StorageClass will have the mount options specified in the `mountOptions` field of the class.

If the volume plugin does not support mount options but mount options are specified, provisioning will fail. Mount options are **not** validated on either the class or PV. If a mount option is invalid, the PV mount fails.

---

## **Volume binding mode**

The `volumeBindingMode` field controls when [volume binding and dynamic provisioning](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#provisioning) should occur. When unset, `Immediate` mode is used by default.

The `Immediate` mode indicates that volume binding and dynamic provisioning occurs once the PersistentVolumeClaim is created. For storage backends that are topology-constrained and not globally accessible from all Nodes in the cluster, PersistentVolumes will be bound or provisioned without knowledge of the Pod’s scheduling requirements. This may result in unschedulable Pods.

A cluster administrator can address this issue by specifying the `WaitForFirstConsumer` mode which will delay the binding and provisioning of a PersistentVolume until a Pod using the PersistentVolumeClaim is created. PersistentVolumes will be selected or provisioned conforming to the topology that is specified by the Pod’s scheduling constraints. These include, but are not limited to, [resource requirements](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/), [node selectors](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector), [pod affinity and anti-affinity](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity), and [taints and tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration).

The following plugins support `WaitForFirstConsumer` with dynamic provisioning:

* CSI volumes, provided that the specific CSI driver supports this

The following plugins support `WaitForFirstConsumer` with pre-created PersistentVolume binding:

* CSI volumes, provided that the specific CSI driver supports this

* [`local`](https://kubernetes.io/docs/concepts/storage/storage-classes/#local)

!!! Note
	If you choose to use `WaitForFirstConsumer`, do not use `nodeName` in the Pod spec to specify node affinity. If `nodeName` is used in this case, the scheduler will be bypassed and PVC will remain in `pending` state.

Instead, you can use node selector for `kubernetes.io/hostname`:

```
apiVersion: v1
kind: Pod
metadata:
  name: task-pv-pod---
title: "Kubernetes Storage Classes"
```

---

## **Storage Classes**

This document describes the concept of a StorageClass in Kubernetes. Familiarity with [volumes](https://kubernetes.io/docs/concepts/storage/volumes/) and [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes) is suggested.

A StorageClass provides a way for administrators to describe the *classes* of storage they offer. Different classes might map to quality-of-service levels, or to backup policies, or to arbitrary policies determined by the cluster administrators. Kubernetes itself is unopinionated about what classes represent.

The Kubernetes concept of a storage class is similar to “profiles” in some other storage system designs.

---

## **StorageClass objects**

Each StorageClass contains the fields `provisioner`, `parameters`, and `reclaimPolicy`, which are used when a PersistentVolume belonging to the class needs to be dynamically provisioned to satisfy a PersistentVolumeClaim (PVC).

The name of a StorageClass object is significant, and is how users can request a particular class. Administrators set the name and other parameters of a class when first creating StorageClass objects.

As an administrator, you can specify a default StorageClass that applies to any PVCs that don’t request a specific class. For more details, see the [PersistentVolumeClaim concept](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#persistentvolumeclaims).

Here’s an example of a StorageClass:

[storage/storageclass-low-latency.yaml](https://raw.githubusercontent.com/kubernetes/website/main/content/en/examples/storage/storageclass-low-latency.yaml)

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: low-latency
  annotations:
    storageclass.kubernetes.io/is-default-class: "false"
provisioner: csi-driver.example-vendor.example
reclaimPolicy: Retain # default value is Delete
allowVolumeExpansion: true
mountOptions:
  - discard # this might enable UNMAP / TRIM at the block storage layer
volumeBindingMode: WaitForFirstConsumer
parameters:
  guaranteedReadWriteLatency: "true" # provider-specific
```

---

## **Default StorageClass**

You can mark a StorageClass as the default for your cluster. For instructions on setting the default StorageClass, see [Change the default StorageClass](https://kubernetes.io/docs/tasks/administer-cluster/change-default-storage-class/).

When a PVC does not specify a `storageClassName`, the default StorageClass is used.

If you set the [`storageclass.kubernetes.io/is-default-class`](https://kubernetes.io/docs/reference/labels-annotations-taints/#ingressclass-kubernetes-io-is-default-class) annotation to true on more than one StorageClass in your cluster, and you then create a PersistentVolumeClaim with no `storageClassName` set, Kubernetes uses the most recently created default StorageClass.

??? Note
	 You should try to only have one StorageClass in your cluster that is marked as the default. The reason that Kubernetes allows you to have multiple default StorageClasses is to allow for seamless migration.

You can create a PersistentVolumeClaim without specifying a `storageClassName` for the new PVC, and you can do so even when no default StorageClass exists in your cluster. In this case, the new PVC creates as you defined it, and the `storageClassName` of that PVC remains unset until a default becomes available.

You can have a cluster without any default StorageClass. If you don’t mark any StorageClass as default (and one hasn’t been set for you by, for example, a cloud provider), then Kubernetes cannot apply that defaulting for PersistentVolumeClaims that need it.

If or when a default StorageClass becomes available, the control plane identifies any existing PVCs without `storageClassName`. For the PVCs that either have an empty value for `storageClassName` or do not have this key, the control plane then updates those PVCs to set `storageClassName` to match the new default StorageClass. If you have an existing PVC where the `storageClassName` is `""`, and you configure a default StorageClass, then this PVC will not get updated.

In order to keep binding to PVs with `storageClassName` set to `""` (while a default StorageClass is present), you need to set the `storageClassName` of the associated PVC to `""`.

---

## **Provisioner**

Each StorageClass has a provisioner that determines what volume plugin is used for provisioning PVs. This field must be specified.

| Volume Plugin  | Internal Provisioner | Config Example  |
| -------------- | -------------------- | --------------- |
| AzureFile      | ✓                    | Azure File      |
| CephFS         | -                    | -               |
| FC             | -                    | -               |
| FlexVolume     | -                    | -               |
| iSCSI          | -                    | -               |
| Local          | -                    | Local           |
| NFS            | -                    | NFS             |
| PortworxVolume | ✓                    | Portworx Volume |
| RBD            | -                    | Ceph RBD        |
| VsphereVolume  | ✓                    | vSphere         |

You are not restricted to specifying the “internal” provisioners listed here (whose names are prefixed with “kubernetes.io” and shipped alongside Kubernetes). You can also run and specify external provisioners, which are independent programs that follow a [specification](https://git.k8s.io/design-proposals-archive/storage/volume-provisioning.md) defined by Kubernetes. Authors of external provisioners have full discretion over where their code lives, how the provisioner is shipped, how it needs to be run, what volume plugin it uses (including Flex), etc. The repository [kubernetes-sigs/sig-storage-lib-external-provisioner](https://github.com/kubernetes-sigs/sig-storage-lib-external-provisioner) houses a library for writing external provisioners that implements the bulk of the specification. Some external provisioners are listed under the repository [kubernetes-sigs/sig-storage-lib-external-provisioner](https://github.com/kubernetes-sigs/sig-storage-lib-external-provisioner).

For example, NFS doesn’t provide an internal provisioner, but an external provisioner can be used. There are also cases when 3rd party storage vendors provide their own external provisioner.

---

## **Reclaim policy**

PersistentVolumes that are dynamically created by a StorageClass will have the [reclaim policy](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#reclaiming) specified in the `reclaimPolicy` field of the class, which can be either `Delete` or `Retain`. If no `reclaimPolicy` is specified when a StorageClass object is created, it will default to `Delete`.

PersistentVolumes that are created manually and managed via a StorageClass will have whatever reclaim policy they were assigned at creation.

---

## **Volume expansion**

PersistentVolumes can be configured to be expandable. This allows you to resize the volume by editing the corresponding PVC object, requesting a new larger amount of storage.

The following types of volumes support volume expansion, when the underlying StorageClass has the field `allowVolumeExpansion` set to true.

| Volume type    | Required Kubernetes version for volume expansion |
| -------------- | ------------------------------------------------ |
| AzureFile      | 1.11                                             |
| CSI            | 1.24                                             |
| FC             | 1.13                                             |
| FlexVolume     | 1.11                                             |
| PortworxVolume | 1.11                                             |
| rbd            | 1.11                                             |

!!! Note
	You can only use the volume expansion feature to grow a Volume, not to shrink it.

---

## **Mount options**

PersistentVolumes that are dynamically created by a StorageClass will have the mount options specified in the `mountOptions` field of the class.

If the volume plugin does not support mount options but mount options are specified, provisioning will fail. Mount options are **not** validated on either the class or PV. If a mount option is invalid, the PV mount fails.

---

## **Volume binding mode**

The `volumeBindingMode` field controls when [volume binding and dynamic provisioning](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#provisioning) should occur. When unset, `Immediate` mode is used by default.

The `Immediate` mode indicates that volume binding and dynamic provisioning occurs once the PersistentVolumeClaim is created. For storage backends that are topology-constrained and not globally accessible from all Nodes in the cluster, PersistentVolumes will be bound or provisioned without knowledge of the Pod’s scheduling requirements. This may result in unschedulable Pods.

A cluster administrator can address this issue by specifying the `WaitForFirstConsumer` mode which will delay the binding and provisioning of a PersistentVolume until a Pod using the PersistentVolumeClaim is created. PersistentVolumes will be selected or provisioned conforming to the topology that is specified by the Pod’s scheduling constraints. These include, but are not limited to, [resource requirements](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/), [node selectors](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector), [pod affinity and anti-affinity](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity), and [taints and tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration).

The following plugins support `WaitForFirstConsumer` with dynamic provisioning:

* CSI volumes, provided that the specific CSI driver supports this

The following plugins support `WaitForFirstConsumer` with pre-created PersistentVolume binding:

* CSI volumes, provided that the specific CSI driver supports this

* [`local`](https://kubernetes.io/docs/concepts/storage/storage-classes/#local)

!!! Note
	If you choose to use `WaitForFirstConsumer`, do not use `nodeName` in the Pod spec to specify node affinity. If `nodeName` is used in this case, the scheduler will be bypassed and PVC will remain in `pending` state.

Instead, you can use node selector for `kubernetes.io/hostname`:

```
apiVersion: v1
kind: Pod
metadata:
  name: task-pv-pod
spec:
  nodeSelector:
    kubernetes.io/hostname: kube-01
  volumes:
    - name: task-pv-storage
      persistentVolumeClaim:
        claimName: task-pv-claim
  containers:
    - name: task-pv-container
      image: nginx
      ports:
        - containerPort: 80
          name: "http-server"
      volumeMounts:
        - mountPath: "/usr/share/nginx/html"
          name: task-pv-storage
```

---

## **Allowed topologies**

When a cluster operator specifies the `WaitForFirstConsumer` volume binding mode, it is no longer necessary to restrict provisioning to specific topologies in most situations. However, if still required, `allowedTopologies` can be specified.

This example demonstrates how to restrict the topology of provisioned volumes to specific zones and should be used as a replacement for the `zone` and `zones` parameters for the supported plugins.

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: standard
provisioner: kubernetes.io/example
parameters:
  type: pd-standard
volumeBindingMode: WaitForFirstConsumer
allowedTopologies:
- matchLabelExpressions:
  - key: topology.kubernetes.io/zone
    values:
    - us-central-1a
    - us-central-1b
```

---

## **Parameters**

StorageClasses have parameters that describe volumes belonging to the storage class. Different parameters may be accepted depending on the `provisioner`. When a parameter is omitted, some default is used.

There can be at most 512 parameters defined for a StorageClass. The total length of the parameters object including its keys and values cannot exceed 256 KiB.

### AWS EBS

Kubernetes 1.29 does not include a `awsElasticBlockStore` volume type.

The AWSElasticBlockStore in-tree storage driver was deprecated in the Kubernetes v1.19 release and then removed entirely in the v1.27 release.

The Kubernetes project suggests that you use the [AWS EBS](https://github.com/kubernetes-sigs/aws-ebs-csi-driver) out-of-tree storage driver instead.

Here is an example StorageClass for the AWS EBS CSI driver:

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ebs-sc
provisioner: ebs.csi.aws.com
volumeBindingMode: WaitForFirstConsumer
parameters:
  csi.storage.k8s.io/fstype: xfs
  type: io1
  iopsPerGB: "50"
  encrypted: "true"
allowedTopologies:
- matchLabelExpressions:
  - key: topology.ebs.csi.aws.com/zone
    values:
    - us-east-2c
```

### NFS

To configure NFS storage, you can use the in-tree driver or the [NFS CSI driver for Kubernetes](https://github.com/kubernetes-csi/csi-driver-nfs#readme) (recommended).

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: example-nfs
provisioner: example.com/external-nfs
parameters:
  server: nfs-server.example.com
  path: /share
  readOnly: "false"
```

* `server`: Server is the hostname or IP address of the NFS server.

* `path`: Path that is exported by the NFS server.

* `readOnly`: A flag indicating whether the storage will be mounted as read only (default false).

Kubernetes doesn’t include an internal NFS provisioner. You need to use an external provisioner to create a StorageClass for NFS. Here are some examples:

* [NFS Ganesha server and external provisioner](https://github.com/kubernetes-sigs/nfs-ganesha-server-and-external-provisioner)

* [NFS subdir external provisioner](https://github.com/kubernetes-sigs/nfs-subdir-external-provisioner)

### vSphere

There are two types of provisioners for vSphere storage classes:

* [CSI provisioner](https://kubernetes.io/docs/concepts/storage/storage-classes/#vsphere-provisioner-csi): `csi.vsphere.vmware.com`

* [vCP provisioner](https://kubernetes.io/docs/concepts/storage/storage-classes/#vcp-provisioner): `kubernetes.io/vsphere-volume`

In-tree provisioners are [deprecated](https://kubernetes.io/blog/2019/12/09/kubernetes-1-17-feature-csi-migration-beta/#why-are-we-migrating-in-tree-plugins-to-csi). For more information on the CSI provisioner, see [Kubernetes vSphere CSI Driver](https://vsphere-csi-driver.sigs.k8s.io/) and [vSphereVolume CSI migration](https://kubernetes.io/docs/concepts/storage/volumes/#vsphere-csi-migration).

#### CSI Provisioner

The vSphere CSI StorageClass provisioner works with Tanzu Kubernetes clusters. For an example, refer to the [vSphere CSI repository](https://github.com/kubernetes-sigs/vsphere-csi-driver/blob/master/example/vanilla-k8s-RWM-filesystem-volumes/example-sc.yaml).

#### vCP Provisioner

The following examples use the VMware Cloud Provider (vCP) StorageClass provisioner.

1\. Create a StorageClass with a user specified disk format.**`apiVersion`**`: storage.k8s.io/v1 `**`kind`**`: StorageClass `**`metadata`**`: `**`name`**`: fast `**`provisioner`**`: kubernetes.io/vsphere-volume `**`parameters`**`: `**`diskformat`**`: zeroedthick diskformat`: `thin`, `zeroedthick` and `eagerzeroedthick`. Default: `"thin"`.

2\. Create a StorageClass with a disk format on a user specified datastore.**`apiVersion`**`: storage.k8s.io/v1 `**`kind`**`: StorageClass `**`metadata`**`: `**`name`**`: fast `**`provisioner`**`: kubernetes.io/vsphere-volume `**`parameters`**`: `**`diskformat`**`: zeroedthick `**`datastore`**`: VSANDatastore datastore`: The user can also specify the datastore in the StorageClass. The volume will be created on the datastore specified in the StorageClass, which in this case is `VSANDatastore`. This field is optional. If the datastore is not specified, then the volume will be created on the datastore specified in the vSphere config file used to initialize the vSphere Cloud Provider.

3\. Storage Policy Management inside Kubernetes

   * Using existing vCenter SPBM policyOne of the most important features of vSphere for Storage Management is policy-based Management. Storage Policy Based Management (SPBM) is a storage policy framework that provides a single unified control plane across a broad range of data services and storage solutions. SPBM enables vSphere administrators to overcome upfront storage provisioning challenges, such as capacity planning, differentiated service levels, and capacity headroom management. The SPBM policies can be specified in the StorageClass using the `storagePolicyName` parameter.

   * Virtual SAN policy support inside KubernetesVsphere Infrastructure (VI) Admins will be able to specify custom Virtual SAN Storage Capabilities during dynamic volume provisioning. You can now define storage requirements, such as performance and availability, through storage capabilities during dynamic volume provisioning. The storage capability requirements are converted into a Virtual SAN policy, which is then pushed down to the Virtual SAN layer when a persistent volume (virtual disk) is created. The virtual disk is distributed across the Virtual SAN datastore to meet the requirements. You can see [Storage Policy Based Management for dynamic provisioning of volumes](https://github.com/vmware-archive/vsphere-storage-for-kubernetes/blob/fa4c8b8ad46a85b6555d715dd9d27ff69839df53/documentation/policy-based-mgmt.md) for more details on using storage policies for persistent volume management.

There are a few [vSphere examples](https://github.com/kubernetes/examples/tree/master/staging/volumes/vsphere) that you can try out for persistent volume management inside Kubernetes for vSphere.

### Ceph RBD (deprecated)

**FEATURE STATE:** `Kubernetes v1.28 [deprecated]`

This internal provisioner of Ceph RBD is deprecated. Please use the [CephFS RBD CSI driver](https://github.com/ceph/ceph-csi).

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast
provisioner: kubernetes.io/rbd
parameters:
  monitors: 10.16.153.105:6789
  adminId: kube
  adminSecretName: ceph-secret
  adminSecretNamespace: kube-system
  pool: kube
  userId: kube
  userSecretName: ceph-secret-user
  userSecretNamespace: default
  fsType: ext4
  imageFormat: "2"
  imageFeatures: "layering"
```

* `monitors`: Ceph monitors, comma delimited. This parameter is required.

* `adminId`: Ceph client ID that is capable of creating images in the pool. The default is “admin”.

* `adminSecretName`: Secret Name for `adminId`. This parameter is required. The provided secret must have the type “kubernetes.io/rbd.”

* `adminSecretNamespace`: The namespace for `adminSecretName`. The default is “default”.

* `pool`: Ceph RBD pool. The default is “rbd”.

* `userId`: Ceph client ID that is used to map the RBD image. The default is the same as `admin`.

* `userSecretName`: The name of Ceph Secret for `userId` to map the RBD image. It must exist in the same namespace as PVCs. This parameter is required. The provided secret must have type “kubernetes.io/rbd,” for example created in this way:`kubectl create secret generic ceph-secret --type="kubernetes.io/rbd" `**`\ `**`--from-literal=key='QVFEQ1pMdFhPUnQrSmhBQUFYaERWNHJsZ3BsMmNjcDR6RFZST0E9PQ==' `**`\ `**`--namespace=kube-system`

* `userSecretNamespace`: The namespace for `userSecretName`.

* `fsType`: fsType that is supported by Kubernetes. Default: `"ext4"`.

* `imageFormat`: Ceph RBD image format, “1” or “2”. The default is “2”.

* `imageFeatures`: This parameter is optional and should only be used if you set `imageFormat` to “2”. Currently, supported features are `layering` only. The default is “”, and no features are turned on.

### Azure Disk

Kubernetes 1.29 does not include an `azureDisk` volume type.

The `azureDisk` in-tree storage driver was deprecated in the Kubernetes v1.19 release and removed entirely in the v1.27 release.

The Kubernetes project suggests using the [Azure Disk](https://github.com/kubernetes-sigs/azuredisk-csi-driver) third-party storage driver instead.

### Azure File (deprecated)

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: azurefile
  provisioner: kubernetes.io/azure-file
  parameters:
    skuName: Standard_LRS
      location: eastus
        storageAccount: azure_storage_account_name
```

* `skuName`: Azure storage account SKU tier. The default is empty.

* `location`: Azure storage account location. The default is empty.

* `storageAccount`: Azure storage account name. The default is empty. If a storage account is not provided, all storage accounts associated with the resource group are searched to find one that matches `skuName` and `location`. If a storage account is provided, it must reside in the same resource group as the cluster, and `skuName` and `location` are ignored.

* `secretNamespace`: the namespace of the secret that contains the Azure Storage Account Name and Key. The default is the same as the Pod.

* `secretName`: the name of the secret that contains the Azure Storage Account Name and Key. Default is `azure-storage-account-<accountName>-secret`

* `readOnly`: a flag indicating whether the storage will be mounted as read-only. Defaults to false, which means a read/write mount. This setting will impact the `ReadOnly` setting in VolumeMounts as well.

During storage provisioning, a secret named secretName is created for the mounting credentials. If the cluster has enabled both [RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) and [Controller Roles](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#controller-roles), add the create permission of resource secret for cluster role system:controller:persistent-volume-binder.

In a multi-tenancy context, it is strongly recommended that you set the value for secretNamespace explicitly; otherwise, other users may be able to read the storage account credentials.

### Portworx volume (deprecated)

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: portworx-io-priority-high
provisioner: kubernetes.io/portworx-volume
parameters:
  repl: "1"
  snap_interval: "70"
  priority_io: "high"
```

* `fs`: filesystem to be laid out: `none/xfs/ext4` (default: `ext4`).

* `block_size`: block size in Kbytes (default: `32`).

* `repl`: number of synchronous replicas to be provided in the form of replication factor `1..3` (default: `1`) A string is expected here i.e.,`"1"` and not `1`.

* `priority_io`: determines whether the volume will be created from higher performance or a lower priority storage `high/medium/low` (default: `low`).

* `snap_interval:`The clock/time interval in minutes for when to trigger snapshots. Snapshots are incremental based on the difference with the prior snapshot; 0 disables snaps (default: 0). A string is expected here, i.e., “70” and not 70.

* `aggregation_level`: specifies the number of chunks the volume would be distributed into, 0 indicates a non-aggregated volume (default: `0`). A string is expected here i.e., `"0"` and not `0`

* `ephemeral`: specifies whether the volume should be cleaned up after unmounting or should be persistent. emptyDir use case can set this value to true, and persistent volumes use cases such as for databases like Cassandra, should be set to false, `true/false` (default `false`). A string is expected here, i.e. `"true"` and not `true`.

### Local

```
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: local-storage
provisioner: kubernetes.io/no-provisioner
volumeBindingMode: WaitForFirstConsumer
```

Local volumes do not support dynamic provisioning in Kubernetes 1.29. However, a StorageClass should still be created to delay volume binding until a Pod is actually scheduled to the appropriate node. The WaitForFirstConsumer volume binding mode specifies this.

Delaying volume binding allows the scheduler to consider all of a Pod’s scheduling constraints when choosing an appropriate Persistent Volume for a PersistentVolumeClaim.
