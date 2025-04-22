---
hide:
 - toc
---

# **Proxmox**

[Proxmox](https://www.proxmox.com/en/) VE (Virtual Environment) is an open-source server virtualization management platform. It allows you to create and manage virtual machines (VMs) and containers on a cluster of physical servers. Proxmox VE is based on Debian Linux and uses KVM (Kernel-based Virtual Machine) as the hypervisor and LXC (Linux Containers) for lightweight virtualization.  

---

## **Requirements for Proxmox**

!!! Tip "Requirements for Proxmox"

	To successfully establish a connection between your Taikun and Proxmox accounts:
	
	In your Proxmox account you need to find these information: 

	* Proxmox API Host
	* Proxmox Client ID
	* Proxmox Client Secret

	Also Public Network and Private Network

	* Network Address and Mask
	* Gateway
	* Allocation Range
	* Bridge 

---

## **Adding Proxmox connection to Taikun**

!!! Note
	Please note that only users with a **:fontawesome-regular-handshake: Partner** role in Taikun can add Proxmox credentials for security purposes.

1\. Switch to the *Cloud credentials* tab in Taikun.

2\. Click on the *Add Cloud Credentials* button in the top-right corner.

3\. Specify the following parameters in the *Proxmox* section:

   - **Cloud Name** – choose a name for your Cloud Credentials (3-30 characters, e.g., proxmox-cloud-credentials).
   - **Proxmox API Host** – Proxmox API Host is a software component that provides a programming interface for managing and interacting with Proxmox Virtual Environment (PVE) infrastructure. (e.g., [https://taikun-proxmox-XXX.XXX.XX/api2/json](https://taikun-proxmox-XXX.XXX.XX/api2/json))
   - **Proxmox Client ID** – Proxmox Client ID refers to a unique identifier assigned to a client or user in the Proxmox Virtual Environment (PVE) system. (e.g., taikun@XX!XXX)
   - **Proxmox Client Secret** – a secure string or key generated along with the Client ID and used for authentication and authorization.
   - **Storage** – refers to the available space and resources for storing virtual machine data.
   - **VM Template Name** – VM Template Name in Proxmox refers to a predefined, reusable configuration and setup for a virtual machine (VM).
   - **Hypervisors** – Hypervisors are responsible for abstracting and virtualizing the underlying hardware resources, allowing multiple VMs to run concurrently on a single physical server.
   - **Public Network and Private Network**:
     - **Network Address and Mask** (e.g., 78.XX.XX.12/17)
     - **Gateway** (e.g., 78.XX.XX.11)
     - **Allocation Range** (e.g., 78.XX.XX.22 – 78.XX.XX.100)
     - **Bridge** – select the appropriate bridge for your credentials.

4\. Confirm your action.

![Proxmox Screenshot](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/cloud%20providers/cc_proxmox.webp)
/// caption
Proxmox Cloud Credentials
///
