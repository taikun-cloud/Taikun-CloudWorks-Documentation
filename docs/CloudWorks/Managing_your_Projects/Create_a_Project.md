# **Create a Project**
:fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

You can create a new Project straight after adding your Cloud credentials! During the project creation, you can specify various functions to be used.

---

![Projects](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/create%20a%20project/project.webp)
/// caption
Projects
///

## **Steps to create your first Project**

1\. **Go to the Projects menu** in Taikun.

2\. **Click "Add Project"** in the top right corner.

3\. **Specify your Project’s name** and select a Cloud provider.

   - *(Optional)* Access, Alerting, Kubernetes, and Policy Profile are initially populated with a default option. These profiles are created with every new organization. Custom profiles need to be created before being used in your Projects.

!!! Warning
	 If you want to use your Access Profile in a project, you need to create it **before** the Project and select it from the dropdown during creation.

Some of Taikun’s features (**such as alerting, policy profiles, monitoring, backup, and expiration date**) can be enabled **after** your Project is created.

---

## **Project Settings**

**1\. Project Name**

Fill in your project name *(only alphanumeric lowercase characters and dashes are allowed, 3-30 characters; no underscores, e.g., my-project1)*.

**2\. Cloud**

Choose where you want to store your Project. For more info, see [**Cloud Credentials**](https://docs.taikun.cloud/CloudWorks/Navigating_in_Taikun/Credentials/).

**3\. Specify Kubernetes Version (Optional)**

If you need a specific version of Kubernetes, select it from the list.

**4\. Specify CIDR (Optional)**

Define a network or a sub-network.

**5\. Access Profile**

Choose an access profile for the project. *(For how to create a new profile, see [**Access Profiles**](https://docs.taikun.cloud/CloudWorks/Profile_Management/Access_Profiles/).)*

**6\. Alerting Profile**

If you have created a profile in [**Alerting Profiles**](https://docs.taikun.cloud/CloudWorks/Profile_Management/Alerting_Profiles/), you can select it.

**7\. Kubernetes Profile**

First, create a new profile in [**Kubernetes Profiles**](https://docs.taikun.cloud/CloudWorks/Profile_Management/Kubernetes_Profiles/), then select it.

**For OpenStack:** If you choose a profile with **enabled Taikun Load Balancer**, you must fill in:

  - Taikun Load Balancer Flavor
  - Router ID Start Range
  - Router ID End Range

**8\. Add Policy Profile**

Select a [**Policy Profile**](https://docs.taikun.cloud/CloudWorks/Profile_Management/Policy_Profiles/) for the project.

**9\. Enable Monitoring**

Monitor cluster resources like **memory, CPU, and storage**.

**10\. Enable Backup**

Choose backup credentials *(can be created in [**Backup Credentials**](https://docs.taikun.cloud/CloudWorks/Managing_your_Projects/Backup/)).*
*(You can enable this later if needed.)*

**11\. Add Expiration Date**

Set project duration *(default is infinite).*

???+ Note
	After the expiration date, your project **will NOT be deleted or locked**.

**12\. [**Enable Serverless**](https://docs.taikun.cloud/CloudWorks/Taikun_CloudWorks_Overview/Serverless_Kubernetes/)**

Handle events and triggers for serverless functions.
*(Setting up DNS records is required.)*

**13\. Enable Spot Instances (AWS, Azure, Google)**

- **Allow Spot VMs** – Enable spots for standalone VMs
- **Allow Full Spot Kubernetes** – Enable full spot Kubernetes
- **Allow Spot Workers** – Enable spot instances for workers
- **No Spot for Kubernetes** – Disable spot for Kubernetes

**14\. Add Flavor**

Bind **one or more flavors** to the project.
*(You can modify them later in [**Flavor Info**](https://docs.taikun.cloud/CloudWorks/Managing_your_Projects/Flavor_Information/).)*

**15\. Enable Autoscaler**

Define [**auto-scaling**](https://docs.taikun.cloud/CloudWorks/Managing_your_Projects/Enable_autoscaler/) for your Kubernetes cluster.

- **Name** – Set a name for the new server
- **Minimum Workers Count** – Set a minimum worker count
- **Maximum Workers Count** – Set a maximum worker count
- **Disk Size** – Define the disk size
- **Flavor** – Bind a flavor to the server
