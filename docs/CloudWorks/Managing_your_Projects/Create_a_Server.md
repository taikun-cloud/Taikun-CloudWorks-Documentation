# **Create a Server**
:fontawesome-regular-user: User | :fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

To create a new server, click **"Add Server"** and fill in all the required fields.

!!! Warning
	If no flavor has been bound to your project, you will receive an error message. You can bind a flavor during project creation.

	For a well-functioning cluster, **avoid using small flavors**.

---

A working Kubernetes cluster consists of at least:

- **1 Bastion**
- **1 Kubemaster**
- **1 Kubeworker**

For **high availability**, you can create a **Multimaster** setup by adding more than one **Kubemaster**. The number of masters must always be **odd**.

!!! Tip
	**Bastion:** Recommended **2 vCPU + 2GB RAM**  
	**Masters:** Recommended **4 vCPU + 8GB RAM**  

![Detailed Project](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/create%20a%20server/create.a.server.webp)
/// caption
Detailed Project
///

---

## **To add a new server, fill in the following information**

**1\. Server Name**

- Only **alphanumeric characters and dashes** are allowed (**1-30 characters**).
- You can use these shortcuts:
  - **b** – Bastion
  - **m** – Master
  - **w** – Worker

**2\. Disk Size**

- Minimum required: **30GB**.

**3\. Role**

- Choose a role for the server based on Kubernetes settings.

**4\. Number of Servers**

- Set the number of **Kubeworkers** or **Kubemasters**.
- **For Multimaster:** Use an **odd number** (minimum **3 masters**) for high availability.

**5\. Flavor**

- Choose a server flavor from the list (e.g., **n0.xlarge**).
- You can bind flavors to the project in [**Flavor Info**](https://docs.taikun.cloud/CloudWorks/Managing_your_Projects/Flavor_Information/).

**6\. Kubernetes Node Labels**

- Assign labels to control where **Pods** are deployed.
- Use the **"Add Label"** button to add multiple labels.
- For more details, see the [**Kubernetes documentation**](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/).

!!! Info	
	Larger flavors take **longer** to create.

!!! Warning
	Double-check the number of servers you need—creation takes time (~7 min per server).
	You **cannot delete servers** after creation.

Once servers are created, click **"Deploy"**.

![Add Server](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/create%20a%20server/create.a.server.2.webp)
/// caption
Add Server
///
---

## **Server Creation Stages**

During deployment, servers pass through these stages:
**PENDING → UPDATING → READY**

![Detailed Project](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/create%20a%20server/create.a.server.3.webp)
/// caption
Detailed Project with Kubernetes cluster
///

### **Failed Server Creation**

If a server fails to create and the project is **Failed** or **Pending**:
- Use the **"Repair"** button to restore it.

### **Deleting Servers**

- **Managers/Partners** can delete unnecessary servers.
- You can delete individual servers while keeping a **functional cluster** (**1 Bastion, 1 Master, 1 Worker**).
- You can also **delete the entire cluster**.

![Projects](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/create%20a%20server/create.a.server.4.webp)
/// caption
Delete Kubernetes cluster
///

!!! Info
	You can remove some servers while maintaining a functional cluster.
	If needed, delete the **entire cluster**.
