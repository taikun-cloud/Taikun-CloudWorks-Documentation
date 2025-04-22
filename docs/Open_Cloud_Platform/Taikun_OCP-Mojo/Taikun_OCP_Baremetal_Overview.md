# **Taikun OCP Baremetal Overview**

Taikun OCP is based on OpenStack (certified etc.) and Taikun OCP BareMetal Addon is based on Mojo. **Taikun.cloud is developing Taikun OCP Baremetal. Taikun OCP Mojo uses our own code, open source code and Metify Mojo code as OEM.**
**Code is built from our repositories, and we release and supply the final product.**

---

## **What is Taikun OCP Baremetal?**

Taikun OCP Baremetal is a platform to manage servers, storage, network devices, and rack elements via the DMTF Redfish standard 2. Taikun OCP Baremetal’s focus is to remove the need to use multiple proprietary tools and platforms to manage multi-OEM infrastructure.

Taikun OCP Baremetal has everything needed to start managing the systems lifecycle:

* O/S and app stack provisioning w/ built in iPXE facility.

* Firmware updates (BIOS, BMC and add-on cards).

* Bulk BIOS settings assignments.

* RBAC and logical resource pools for servers.

* YAML based workflow engine to create repeatable workflows.

Taikun OCP Baremetal stands out as a DICM Platform that aims to simplify and enhance the management of diverse data center elements. Leveraging standards like Redfish, supporting multiple OEMs, offering quick installation, and providing appliance options contribute to its flexibility and usability in different data center environments.

---

## **Who can Benefit from Taikun OCP Baremetal?**

* Individuals or businesses seeking relief from the burdens of server infrastructure management, desiring to redirect their focus towards applications and customer-facing deliverables.

* Operators aiming to enhance server deployments and decommissioning with role-based access control and policy implementation. Taikun OCP Baremetal monitors server usage, ensuring security by locking them upon deployment.

* Operators interested in creating reusable templates for consistent server deployment, specifying firmware, BIOS settings, operating system footprints, and comprehensive stacks like OpenStack, OpenShift, OpenNebula, etc.

* Operators in need of robust auditing trails to track provisioning or modifications of assets, providing transparency into actions performed on servers at any given time.

* Operators committed to ensuring the safety and security of management and provisioning operations for servers, utilizing Redfish and VLANs.

---

## **Who Uses Mojo?**

Mojo is currently is used by fortune 500’s, Telcos and Public Sector customers. Check out Major Leauge Baseball’s Medium [article 1](https://medium.com/mlb-technology/anthos-on-bare-metal-how-mlb-turned-ball-parks-into-on-prem-k8-clusters-295031253a33) highlighting how Mojo is used to deploy Google Anthos within North American ballparks.

---

## **How Does Taikun OCP Baremetal Work?**

At its core Taikun OCP Baremetal, is a platform for managing hardware through standards-based protocols. We are focused on fully supporting the [DMTF Redfish standard 2](https://www.dmtf.org/standards/redfish) for hardware management. Support for other standards such as vPRO are on the roadmap. Taikun OCP Baremetal works by discovering hardware on your network and then registering that hardware in Taikun OCP Baremetal.

For Discovery to happen, Taikun OCP Baremetal must be installed on your network and have access to the management controllers on the hardware you want to manage. For Registration to happen, Taikun OCP Baremetal must have credentials to access the hardware’s Redfish API. Once registered, Taikun OCP Baremetal can manage the hardware through its Redfish API.

* [Installation Types](https://support.metify.io/t/how-does-mojo-work/30#installation-types-2)

  * [Virtual Appliance](https://support.metify.io/t/how-does-mojo-work/30#virtual-appliance-3)

  * [Hardware Appliance](https://support.metify.io/t/how-does-mojo-work/30#hardware-appliance-4)

* [Architecture](https://support.metify.io/t/how-does-mojo-work/30#architecture-5)

  * [Components](https://support.metify.io/t/how-does-mojo-work/30#components-6)

* [Core Functionality](https://support.metify.io/t/how-does-mojo-work/30#core-functionality-7)

### Installation Types

There are two types of Taikun OCP Baremetal installations, [Virtual Appliance](https://support.metify.io/t/how-does-mojo-work/30#virtual-appliance-3) and [Hardware Appliance](https://support.metify.io/t/how-does-mojo-work/30#hardware-appliance-4).

#### Virtual Appliance

A virtual software appliance that can be self-installed anywhere on your infrastructure. The virtual appliance can be installed on any hardware that supports Docker. See the [installation documentation 3](https://support.metify.io/t/installing-mojo/20) and [best practices](https://support.metify.io/t/mojo-best-practices) section for more details. The virtual appliance is suitable for small infrastructure deployments, for those who want to run Taikun OCP Baremetal on their own hardware or in the cloud, and for evaluation purposes.

![virtual-appliance](https://support.metify.io/uploads/default/original/1X/3fb9de6304e744124811fa3ea2859786606244f2.png)
/// caption 
Virtual Appliance
///

#### Hardware Appliance

A fully self-contained hardware appliance that is shipped to you and installed in your data center. The hardware appliance is a fully self-contained system that is pre-configured and ready to go.

The hardware appliance is suitable for large infrastructure deployments and for those who want to run Taikun OCP Baremetal on hardware but do not want to install it themselves. It is also suitable for those who require a higher level of support as the appliance is certified for Taikun OCP Baremetal.

![hardware-appliance](https://support.metify.io/uploads/default/original/1X/86f7b233d4560ce0fc4500a9a834789a30dca423.png)
/// caption 
Hardware appliance 
///

The hardware appliance comes out of the box with additional features that are not available in the virtual appliance.

---

## **Architecture**

Taikun OCP Baremetal is built on a microservices architecture. Each microservice is a containerized software application built to be run by an [OCI compliant runtime](https://opencontainers.org/). Depending on the installation pattern (virtual or hardware) the containers are run in different setups and with different configurations. Groups of microservices are packaged together and deployed as “Components”.

### Components

The main Components that make up Taikun OCP Baremetal are:

* **Coordinator** – The core Taikun OCP Baremetal experience: databases, APIs, message brokers/queues, job workers, and the Taikun OCP Baremetal Web UI.

* **TOR** – “Top Of the Rack” – Supporting microservice that allow Taikun OCP Baremetal to provision servers and help separate network traffic from the Coordinator component. These include web proxies, DNS, DHCP, TFTP, Samba, firmware and OS image catalogs, and more.

* **Gateway** (*hardware-appliance only*) – A traffic gateway for Taikun OCP Baremetal that allows you to monitor and control all traffic in and out of your Taikun OCP Baremetal infrastructure. The Gateway is a FreeBSD-based system and provides additional features on top of the TOR and Coordinator components. The Gateway is not available in the virtual appliance. Gateway features include:

  * True network separation of BMC, Management, Services, and Provisioning networks

  * QOS

  * BMC Firewall – Isolate your BMCs from the rest of your network and monitor all traffic through the BMC network

  * IPS/IDS – Intrusion detection and prevention system for your BMC network

  * Monitoring – Built-in Grafana dashboards for your Taikun OCP Baremetal-managed infrastructure and networks

---

## **Core Functionality**

Taikun OCP Baremetal manages infrastructure by first Discovering hardware on your user-defined networks and then Registering the hardware in Taikun OCP Baremetal. The level of management available to each piece of hardware is dependent on the hardware itself and the features it supports. Taikun OCP Baremetal can manage any hardware that supports the Redfish standard and has abstracted common hardware management tasks into a set of features that can be applied to any hardware that supports them.

Redfish implementations vary from vendor to vendor and Taikun OCP Baremetal does its best to support as many features as possible across all vendors. The power of Taikun OCP Baremetal is that we have taken the time to understand and manage different vendor implementations of Redfish so that you don’t have to. We support common functionality across all hardware vendors through a single web interface and API.  *Taikun OCP Baremetal is a single pane of glass in which to view and manage your entire infrastructure.*

For a server, Taikun OCP Baremetal can manage the power state, LEDs, and BIOS settings. Taikun OCP Baremetal can also manage the firmware and OS images on your servers and provision them with the OS of your choice. Deployment profiles can be applied to groups of servers to create application clusters for usage outside of Taikun OCP Baremetal. Taikun OCP Baremetal can work with the storage controllers inside of your servers to manage the RAID configuration and disks. Taikun OCP Baremetal can open a virtual console to the server directly from the Taikun OCP Baremetal Web UI.

Taikun OCP Baremetal can also work with other hardware that supports the Redfish standard such as PDUs, Switches, and Chassis. Taikun OCP Baremetal can manage the power state of a PDU, or the port configuration of a switch. Taikun OCP Baremetal can also manage the firmware and OS images on your PDUs and Switches.
