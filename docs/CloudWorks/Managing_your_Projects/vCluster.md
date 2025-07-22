# **vCluster**

A virtual cluster is a complete Kubernetes cluster nested within a single physical host cluster. This design offers improved isolation and adaptability, making it ideal for multi-tenancy support. Virtual clusters enable multiple teams to operate independently on the same physical infrastructure, reducing conflicts, enhancing autonomy, and lowering costs. Each virtual cluster operates within a host cluster’s namespace but behaves as an independent Kubernetes cluster with its own API server, control plane, and set of resources.

Although a virtual cluster shares the host cluster’s physical resources, such as CPU, memory, and storage, it engages with the host cluster for resource scheduling and networking while maintaining an abstraction layer that ensures operations within a virtual cluster do not directly impact the global state of the host cluster. Pods of the virtual cluster are scheduled directly by the parent cluster, which ensures no performance degradation.

!!! Tip
	A vCluster requires a healthy and ready cluster with Kubernetes v1.29.4 or the latest version of Kubernetes.

---

## **Creating a Virtual Cluster**

There are two ways to create a vCluster in Taikun:

### Adding a vCluster from the Project's Page

1\. **Access Project Page**: In the Overview section, locate the desired project and navigate to its page.

2\. **Select 'Add Virtual Cluster'**: Click on the dropdown menu next to the “Add Project” button and choose the “Create Virtual Cluster” option.

3\. **Define Cluster Details**:

   - **Name**: Provide a unique and descriptive name for the virtual cluster.
   - **Organization**: Assign the cluster to the appropriate organization.
   - **Parent Cluster**: Specify the parent cluster from which the virtual cluster will inherit settings and resources.

4\. **Configure Alerting (optional)**:

   - **Inherit Profile**: Decide whether to use the alerting profile defined for the parent cluster, or
   - **Define New Profile**: Create a custom alerting profile with specific settings.

5\. **Set a Project Expiration (optional)**:

   - **Individual Expiration**: If desired, set a specific expiration time for the virtual cluster, overriding the project’s default expiration.

![Add Virtual Cluster](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/vCluster/vcluster.gif)
/// caption
Add Virtual Cluster
///

---

### Creating a vCluster from Within the Parent Cluster

1\. **Access the Parent Cluster**: Navigate to the cluster that will serve as the parent cluster for the vCluster.

2\. **Open the vCluster Tab**: Go to the vCluster tab next to the **K8s View**, **VMs**, and **Installed Applications** tabs.

3\. **Add vCluster Details**: Enter a unique and descriptive name for the virtual cluster.

4\. **Configure Alerting and Project Expiration (Optional)**:

   - **Inherit Profile**: Decide whether to use the alerting profile defined for the parent cluster, or
   - **Define New Profile**: Create a custom alerting profile with specific settings.

5\. **Set a Project Expiration (optional)**: Set up the alerting profile and project expiration as previously described.

![Add Virtual Cluster](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/vCluster/vcluster2.gif)
/// caption 
Add Virtual Cluster
///

---

## **Virtual Cluster Quotas**

## **Overview**
Virtual Clusters (VCs) support optional resource quotas to help manage and enforce resource consumption. Quotas apply at the **namespace level** of the host (parent) cluster and ensure fair resource usage among workloads. Users can choose from **predefined profiles** or define custom quotas during VC creation. When quotas are enabled, `ResourceQuota` and `LimitRange` objects are automatically applied to the namespace, constraining the workloads accordingly.

---

## **Key Concepts**

### **CPU**

* Measured in:
    * 1 = 1 full CPU core
    * 500m = 0.5 CPU a core
    * 100m = 10% of a core

* **Request**: Minimum guaranteed CPU reserved for a container.
* **Limit**: Maximum CPU the container can use. Exceeding this results in throttling.

### **RAM (Memory)**

* Measured in:
    * 128Mi = 128 mebibytes
    * 1Gi = 1 gibibyte

* **Request**: Guaranteed reserved working memory.
* **Limit**: If exceeded, the container will be terminated with OOM.

### **Ephemeral Storage**

* Temporary disk space for logs, caches, or temp files.
* Deleted when the container is removed
* When a pod exceeds its Ephemeral Storage, it's terminated with an Evicted status

---

## **Setting Quotas**

When creating a Virtual Cluster, users can:

* **Enable or disable quotas**
* Choose between **Small**, **Medium**, or **Large** profiles
* Customize every field in **Custom mode**

### **Quota Categories**

#### **CPU**

* Max Cluster CPU Requests [core] - Maximum total sum of CPU requests specified by containers in this virtual cluster
* Max Cluster CPU Limits [core] - Maximum total sum of CPU limits specified by containers in this virtual cluster
* Default Container CPU Request [m] - Containers with no requests specified will be assigned this request value
* Default Container CPU Limit [m] - Containers with no limits specified will be assigned this limit value

#### **RAM**

* Max Cluster RAM Requests [Gi] - Maximum total sum of CPU requests specified by containers in this virtual cluster
* Max Cluster RAM Limits [Gi] - Maximum total sum of RAM limits specified by containers in this virtual cluster
* Default Container RAM Request [Mi] - Containers with no requests specified will be assigned this request value
* Default Container RAM Limit [Mi] - Containers with no limits specified will be assigned this limit value

#### **Ephemeral Storage*

* Max Cluster Ephemeral Storage Requests [Gi] - Maximum total sum of ephemeral storage requests specified by containers in this virtual cluster
* Max Cluster Ephemeral Storage Limits [Gi] - Maximum total sum of ephemeral storage limits specified by containers in this virtual cluster
* Default Container Ephemeral Storage Request [Mi] - Containers with no requests specified will be assigned this request value
* Default Container Ephemeral Storage Limit [Gi] - Containers with no limits specified will be assigned this limit value

#### **Workload Resources**

* Max Pods - Maximum total number of pods in this virtual cluster.
* Max PVCs - Maximum total number of persistent volume claims in this virtual cluster.
* Max Total PVC Size [Gi] - The maximum amount of Gibibytes that all the PVCs can request together.
* Max Ingresses - Maximum total number of Ingresses in this virtual cluster.
* Max LoadBalancers - Maximum total number of Load Balancers in this virtual cluster.

!!! Note
    Limits must always be greater than or equal to CPU, RAM, and ephemeral storage requests.

---

## **Resource Mapping to Kubernetes**

### Kubernetes Resource Mapping

| Field                                      | Kubernetes Mapping                                                |
|:-----------------------------------------:|:-----------------------------------------------------------------:|
| Max Cluster CPU Requests                  | `ResourceQuota.spec.hard["requests.cpu"]`                         |
| Max Cluster CPU Limits                    | `ResourceQuota.spec.hard["limits.cpu"]`                           |
| Default Container CPU Request             | `LimitRange.spec.limits[].defaultRequest.cpu`                     |
| Default Container CPU Limit               | `LimitRange.spec.limits[].default.cpu`                            |
| Max Cluster RAM Requests                  | `ResourceQuota.spec.hard["requests.memory"]`                      |
| Max Cluster RAM Limits                    | `ResourceQuota.spec.hard["limits.memory"]`                        |
| Default Container RAM Request             | `LimitRange.spec.limits[].defaultRequest.memory`                  |
| Default Container RAM Limit               | `LimitRange.spec.limits[].default.memory`                         |
| Max Cluster Ephemeral Storage Requests    | `ResourceQuota.spec.hard["requests.ephemeral-storage"]`           |
| Max Cluster Ephemeral Storage Limits      | `ResourceQuota.spec.hard["limits.ephemeral-storage"]`             |
| Default Ephemeral Storage Request         | `LimitRange.spec.limits[].defaultRequest.ephemeral-storage`       |
| Default Ephemeral Storage Limit           | `LimitRange.spec.limits[].default.ephemeral-storage`              |
| Max Pods                                  | `ResourceQuota.spec.hard.pods`                                    |
| Max PVCs                                  | `ResourceQuota.spec.hard.persistentvolumeclaims`                  |
| Max Total PVC Size                        | `ResourceQuota.spec.hard["requests.storage"]`                     |
| Max Ingresses                             | `ResourceQuota.spec.hard["networking.k8s.io/ingresses"]`          |
| Max LoadBalancers                         | `ResourceQuota.spec.hard["services.loadbalancers"]`               |

---

## **Predefined Quota Profiles**

### **Small (Default)**

|    Resource         | Request |  Limit  | Default Req | Default Limit |
|:-------------------:|:-------:|:-------:|:-----------:|:-------------:|
| CPU                 |   4     |   8     |    100m     |     1000m     |
| RAM                 |  8Gi    |  16Gi   |   128Mi     |     512Mi     |
| Ephemeral Storage   |  10Gi   |  20Gi   |    20Mi     |      2Gi      |
| Pods                |   –     |   50    |      –      |       –       |
| PVCs                |   –     |   10    |      –      |       –       |
| PVC Size            |   –     |  100Gi  |      –      |       –       |
| Ingresses           |   –     |   10    |      –      |       –       |
| LoadBalancers       |   –     |   4     |      –      |       –       |

### **Medium**

|    Resource         | Request |  Limit  | Default Req | Default Limit |
|:-------------------:|:-------:|:-------:|:-----------:|:-------------:|
| CPU                 |   12    |   24    |    200m     |     500m      |
| RAM                 |  24Gi   |  48Gi   |   128Mi     |     512Mi     |
| Ephemeral Storage   |  15Gi   |  30Gi   |    20Mi     |      2Gi      |
| Pods                |   –     |  150    |      –      |       –       |
| PVCs                |   –     |   20    |      –      |       –       |
| PVC Size            |   –     | 250Gi   |      –      |       –       |
| Ingresses           |   –     |   50    |      –      |       –       |
| LoadBalancers       |   –     |   20    |      –      |       –       |

### **Large**

|    Resource         | Request |  Limit  | Default Req | Default Limit |
|:-------------------:|:-------:|:-------:|:-----------:|:-------------:|
| CPU                 |   24    |   48    |    200m     |     500m      |
| RAM                 |  48Gi   |  96Gi   |   128Mi     |     512Mi     |
| Ephemeral Storage   |  30Gi   |  60Gi   |    20Mi     |      2Gi      |
| Pods                |   –     |  300    |      –      |       –       |
| PVCs                |   –     |   40    |      –      |       –       |
| PVC Size            |   –     | 500Gi   |      –      |       –       |
| Ingresses           |   –     |  200    |      –      |       –       |
| LoadBalancers       |   –     |  100    |      –      |       –       |

## **Quota Modification**

If quota was enabled for a VC during creation, users can update it as long as the parent cluster is in a healthy state. All updates must respect the rules mentioned above (e.g., limits ≥ requests).
