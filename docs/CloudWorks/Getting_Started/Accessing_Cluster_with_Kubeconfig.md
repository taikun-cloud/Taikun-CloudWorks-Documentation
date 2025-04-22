# **Accessing Cluster with Kubeconfig**

A kubeconfig file is a configuration file used by the Kubernetes command-line tool `kubectl` to connect to a specific Kubernetes cluster. The file contains the cluster’s server address and authentication credentials. It also allows you to switch between different clusters and contexts within a cluster, such as different namespaces or user accounts. With Taikun, you can quickly generate a kubeconfig file and use it on your machine to access the Kubernetes cluster you created in the previous step.

---

## **Generate Kubeconfig for your Project**

![Add Kubeconfig drawer](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/getting-started/Accessing%20Cluster%20with%20Kubeconfig/kubeconf.webp)
/// caption
Add Kubeconfig
///

### **Steps to create a Kubeconfig file**

1\. **Open the page of your Project.**

2\. **Locate the Kubeconfigs link** among the function buttons of your Cluster.

3\. **Press "Add Kubeconfig"** and define the necessary characteristics of your file.

4\. **Choose a Name:** Use at least three lowercase alphanumeric characters.

5\. **Choose a Namespace:** An isolated group located within the clusters.

6\. **Choose a Role:** You can choose between `admin`, `edit`, or `view`.

7\. **Select a Predefined or a Custom Validity Period:** Choose a period for which the kubeconfig will remain valid.

8\. **Select a Kubeconfig Type:**

   - **Personal Kubeconfig:** Only the selected user is allowed.
   - **Application Kubeconfig:** Choose whether only project managers or all users with access to the project are allowed.

9\. **Click "Add".**

### **Actions for the Kubeconfig file**

- **Open Terminal:** Opens a new terminal for managing your Kubernetes cluster.
- **Download:** Downloads a `.yaml` configuration file to access your Kubernetes cluster.
- **Delete:** Deletes the kubeconfig file associated with your Kubernetes cluster.

Your kubeconfig file in Taikun is already authenticated. To interact with your cluster, use the `kubectl` command-line tool.

---

## **Accessing Kubernetes Cluster with Bash**

![Access Kubernetes Cluster with Bash](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/getting-started/Accessing%20Cluster%20with%20Kubeconfig/Kube_conf.png)
/// caption
Kubernetes bash
///

Use bash commands to interact with your Kubernetes cluster using the kubeconfig file.
