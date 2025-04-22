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
