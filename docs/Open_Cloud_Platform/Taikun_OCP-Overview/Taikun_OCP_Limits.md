# **Taikun OCP Limits**

## **Servers in a Cluster**

The cluster boundaries define the constraints and capabilities of the OpenStack deployment within the Kubernetes environment. This encompasses the minimum and maximum limits for various components such as processing nodes, hypervisor resources, software-defined networking (SDN), and software-defined storage (SDS). These boundaries ensure efficient resource allocation and scalability within the Taikun OCP infrastructure.

### Range of Computing servers

* 2 – 300 compute servers

### Minimum HA recommendation:

* 3 control servers 

* 3 storage servers

* 10 compute servers 

---

## **OS Hypervisor**

The OS hypervisor component ensures optimal utilization of physical resources by hosting virtual machines (VMs) within the cluster. It supports a high density of VMs and provides extensive support for physical configurations at the host system level. This includes minimum specifications for RAM, virtual instances, and logical CPUs per physical host, ensuring robust performance and scalability for virtualized workloads.

### Range

* Minimum 128 GB to 24TB RAM per OS Hypervisor

* Minimum 1 to 1100 virtual instances per OS Hypervisor

* Minimum 24 to 1024 logical CPU per OS Hypervisor

---

## **SDN (Software-Defined Networking)**

The SDN component enables flexible networking configurations within the OpenStack environment. It facilitates the creation of various network types, including private and public networks directly associated with physical network infrastructure. The SDN solution supports a minimum number of private and public networks, along with capabilities for VLANs, VXLANs, and multiple internal private networks, ensuring comprehensive networking functionality for diverse workload requirements.

### Range

* Minimum 3 to 4070 VLANs for provider, public and private networks

* Minimum 1 to 16 000 000 VXLAN for multiple private network

---

## **SDS (Software-Defined Storage)**

The SDS solution provides scalable and resilient storage capabilities within the OpenStack deployment. It supports a minimum number of nodes in a cluster and ensures reliable storage provisioning and management for virtualized workloads. By leveraging SDS, Taikun OCP enables efficient storage utilization and dynamic scaling to meet evolving storage demands within the Kubernetes-based environment.

### Range

* Minimum 3 to 100 storage servers

* Minimum 3 TB to 70 PB of RAW storage

These descriptions outline the key components and capabilities within the cluster boundaries of the Taikun OCP OpenStack deployment, setting the foundation for efficient resource management and scalability in virtualized environments.
