# **Project Creation**

A **Project** in Taikun serves as the central hub for creating and managing Kubernetes clusters. It allows you to organize your resources, separate environments (e.g., development, staging, production), and streamline cluster management. With a single Project, you can view and manage all associated clusters and resources, making it especially useful for teams managing multiple environments or clusters.

---

## **Adding a New Project**

You can create a new Project after adding your **Cloud credentials**. During Project creation, you can specify advanced features for your Kubernetes cluster, such as access profiles or monitoring configurations.

**Who Can Create Projects?**
Projects can be created by **:fontawesome-solid-user-tie: Managers** or **:fontawesome-regular-handshake: Partners** of your account. These users can also assign Projects to colleagues.

![Add new project drawer](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/getting-started/Project%20creation/project_creation.webp)
/// caption 
Add new project
///

---

## **Steps to Create a New Project**

Follow these steps to create your first Project in Taikun:

1\. **Ensure you have added a [Cloud Connection](https://docs.taikun.cloud/CloudWorks/Getting_Started/Connect_your_Cloud/)** to your Taikun account.

2\. Navigate to the **Projects** menu in Taikun.

3\. Click **“Add Project”** in the top-right corner.

4\. Provide the following details in the pop-up:

   - **Project Name**
   - **Cloud Provider**

   *(Optional)* Default profiles for Access, Alerting, and Kubernetes are auto-populated for new accounts. If needed, create custom profiles beforehand to use them in your Project.

5\. Click **“Create Project”** to finalize and save your new Project.

---

## **Advanced Features After Project Creation**

Once your Project is created, you can enable additional Taikun features such as:

- **Alerting**
- **Policy Profiles**
- **Monitoring**
- **Backup**
- **Expiration Date Management**

Each feature ensures your Project is configured to meet your organization's specific needs.

---

Next on, we will [create our first functioning Kubernetes cluster with Taikun!](https://docs.taikun.cloud/CloudWorks/Getting_Started/Creating_Kubernetes_cluster/)
