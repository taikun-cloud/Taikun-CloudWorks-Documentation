---
hide:
 - toc
---

# **Creating Kubernetes cluster**

## **Adding Nodes**

To create a functioning Kubernetes cluster in Taikun, you need to add cloud servers to your Project. A Kubernetes cluster requires the following types of nodes:  

- **Master Node**: Manages the cluster’s state, such as scaling and updates.
- **Worker Nodes**: Run the actual applications.
- **Bastion Node**: Connects Taikun to your cluster.

---

## **Steps to Create Your First Cluster in Taikun**

Follow these steps to set up your Kubernetes cluster:

1\. **Open your Project**
   Open the newly-created Project from the list.

2\. **Click "Add Server"**
   Locate and click the "Add Server" button on the right side of your screen.

3\. **Select a Flavor**
   Choose a specific flavor to bind to your Project.

4\. **Add Three Servers**
   Add the following servers to your Project:

  - **1 Bastion Node**
  - **(At least) 1 Worker Node**
  - **1 Master Node**

 *(Optional)*: You may need to repair your Project to save the current configuration.

5\. **Deploy**
   Confirm the changes by pressing the "Deploy" button.

**Congratulations!** You’ve successfully created your first Kubernetes cluster with Taikun!

---

## **Additional Configuration Options**

You can make further changes to your configuration:

- **Directly from Project Details**: Options like Backup, Monitoring, or Profiles.
- **Specific Tabs**: Update Access Profile or Kubernetes Profile.

!!! Warning
	**Project Repair:**
	Whenever you make changes to your Project, you must perform a Repair to ensure the changes are correctly applied, and your cluster functions as expected.

---

More information on Cluster creation is provided [here.](https://docs.taikun.cloud/CloudWorks/Managing_your_Projects/Create_a_Server/)

Lastly, we will discuss accessing your Kubernetes cluster with the help of the [Kubeconfig file.](https://docs.taikun.cloud/CloudWorks/Getting_Started/Accessing_Cluster_with_Kubeconfig/)
