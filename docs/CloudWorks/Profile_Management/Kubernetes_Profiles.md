# **Kubernetes Profiles**
:fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

Each profile is characterized by the following parameters:

- **ID**
- **Name**
- **Organization Name**
- **CNI (Container Network Interface)**
- **Octavia**
- **Proxy on Bastion**
- **Projects**
- **Actions**

![Kubernetes Profiles](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/navigating-taikun/Profiles/kubernetes_profile.webp)
/// caption 
Kubernetes Profiles
///

Expand the table to see the last modification (Last Modified and Last Modified By).

---

## **Add Kubernetes Profile**

You can create a new profile where you can enable a few features that can be customized using the CNI plugin.

![Add Kubernetes Profile](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/profile-management/kubernetes%20profile/kubernetes.profile.2.webp)
/// caption
Add Kubernetes Profile
///

### Profile Settings

- **Organization (optional)**: Choose an organization for your profile.
- **Profile Name**: Enter the name for your Kubernetes profile (3–30 characters).
- **Octavia**: Exposes the service externally using OpenStack load balancers.
- **Enable Taikun Load Balancer**: Manage your traffic, available only for OpenStack and when Octavia is disabled.
- **Proxy on Bastion**: Exposes the service on each node with a static port (**NodePort**).
  It will be possible to contact this service using `NodeIP:NodePort`.
  Choose this profile with enabled features during [**project creation**](https://docs.taikun.cloud/CloudWorks/Managing_your_Projects/Create_a_Project/).
- **Scheduling on Master**: Schedule Pods on the control plane node to maximize resource usage, but it is not recommended.
  If scheduling on Master is disabled, the Kubernetes worker node should have more than 2 CPUs.
- **Enable Unique Cluster Name**: If not enabled, the cluster name will be `cluster.local`.
- **Enable NVIDIA GPU Operator**: The NVIDIA GPU Operator simplifies the deployment and management of GPU resources within a Kubernetes cluster. It automates the installation of critical components such as NVIDIA drivers, the NVIDIA Container Toolkit, and device plugins.
- **Enable WebAssembly (Wasm)**: WebAssembly (Wasm) enables high-performance execution of compiled code within Kubernetes.
  It allows efficient and secure running of applications written in C, C++, and Rust within Kubernetes environments.
- **Proxmox Storage (optional)**: In Taikun, "Proxmox storage" refers to storage managed by Taikun, not native Proxmox storage. It is integrated into your Kubernetes environment for efficient storage management. The following storage options are available:
  - **NFS (Network File System)**: Allows sharing file storage across multiple servers.
  - **OpenEBS**: A solution for container-attached storage for Kubernetes.
  - **Longhorn**: A lightweight, highly available distributed block storage system for Kubernetes.

---

## **Specify Container Network Interface (CNI)**

Choose the **CNI plugin** to be installed in your Kubernetes cluster.
Currently, **Calico CNI** is the default option. **Cilium CNI** will be added in future releases.

---

## **Actions**

- **Unlock/Lock**: Unlock or lock the profile to enable/disable it from the drop-down selection when creating a new project.
  **The default profile cannot be locked.**
- **Delete**: Delete the profile if it is no longer needed.
  Only profiles that are not associated with any project can be deleted. **The default profile cannot be deleted.**
