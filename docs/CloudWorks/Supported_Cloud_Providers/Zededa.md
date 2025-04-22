# **Zededa**

**ZEDEDA is a cloud-based platform that simplifies applications’ deployment, management, and security on edge devices.**  
It acts as a central control point for distributing and updating software across diverse hardware, ensuring seamless operations. By adopting a zero-trust security model, ZEDEDA protects sensitive data and applications from cyber threats prevalent in edge environments. Importantly, it focuses solely on managing the infrastructure and application deployment, leaving data handling and processing to the user’s specific requirements.

**[Learn more about Zededa](https://zededa.com/)**

---

## **Requirements for Zededa**

!!! Tip "Requirements for Zededa"

	To successfully establish a connection between your Taikun and Zededa accounts:

	The most important information you need to find:
	
	* API URL
	* API Token

	Also your Public Network and Private Network

	* Interface name
	* VLAN ID
        * Network address
        * Gateway
        * Allocation Range

---

## **Adding Zededa Credentials to Taikun**

1\. Switch to the *Cloud credentials* in Taikun.

2\. Click the *Add Cloud Credentials* button in the top-right corner.

3\. Zededa credentials are divided into three sections:

### **Cloud Settings**
   - **Cloud Name:** Choose a name for your Cloud Credentials (3-30 characters, e.g., proxmox-cloud-credentials).
   - **Organization:** Select your organization.
   - **API URL:** Endpoint-Identity (e.g., `https://cloud.mycloud.com:32132`).
   - **API Token:** Insert an authentication API token for verification.
   - **Project:** Select a project if there are multiple options (e.g., `my-cloud-project`).
   - **Edge Node:** An Edge Node is a computing device that processes data locally at the edge of a network (e.g., `test123`).

### **Public Network**
   - **Interface Name:** Defines a contract for managing user authentication and authorization operations.
   - **VLAN ID:** Define a unique VLAN ID from 1 to 4094.
   - **Network Address and Mask:** Define the Network address and Mask (e.g., `192.168.##.##/24`).
   - **Gateway:** Define a gateway that manages and routes client requests to the appropriate backend services or systems (e.g., `192.168.##.##`).
   - **Allocation Range:** Define the required allocation range for your cloud credentials (e.g., `192.168.##.10 to 192.168.##.20`).

### **Private Network**
   - **Interface Name:** Defines a contract for managing user authentication and authorization operations.
   - **VLAN ID:** Define a unique VLAN ID from 1 to 4094.
   - **Network Address and Mask:** Define the Network address and Mask (e.g., `192.168.##.##/28`).
   - **Gateway:** Define a gateway that manages and routes client requests to the appropriate backend services or systems (e.g., `192.168.##.##`).
   - **Allocation Range:** Define the required allocation range for your cloud credentials (e.g., `192.168.##.30 to 192.168.##.40`).

4\. Click on the *Add Cloud Credentials* button.
