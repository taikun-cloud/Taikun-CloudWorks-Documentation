# **Accessing Cluster with Kubeconfig**

A kubeconfig file is a configuration file used by the Kubernetes command-line tool `kubectl` to connect to a specific Kubernetes cluster. The file contains the cluster’s server address and authentication credentials. It also allows you to switch between different clusters and contexts within a cluster, such as different namespaces or user accounts. With Taikun CloudWorks, you can quickly generate a kubeconfig file and use it on your machine to access the Kubernetes cluster you created in the previous step.

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

Your kubeconfig file in Taikun CloudWorks is already authenticated. To interact with your cluster, use the `kubectl` command-line tool.

---

## **Accessing Kubernetes Cluster with Bash**

![Access Kubernetes Cluster with Bash](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/getting-started/Accessing%20Cluster%20with%20Kubeconfig/Kube_conf.png)
/// caption
Kubernetes bash
///

Use bash commands to interact with your Kubernetes cluster using the kubeconfig file.

---

## **Accessing Your Kubernetes Cluster from the Linux Terminal Using Kubeconfig**	

### **Install `kubectl` on Linux (Debian/Ubuntu)**

* **1\. Download the latest `kubectl` Binary**

```bash
curl -LO "https://dl.k8s.io/release/$(curl -Ls https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
```

* **2\. Make the Binary Executable**

```bash
chmod +x kubectl
```

* **3\. Move `kubectl` to a DIrectory in your PATH**

```bash
sudo mv kubectl /usr/local/bin/
```

!!! Note 
	Alternatively you can use `~/.local/bin`, if you don't want to use `sudo`.

* **4\. Verify the Installation**

```bash
kubectl version --client
```

### **Download the Kubeconfig**

* Click the Download button next to the newly created kubeconfig.

* Save it locally, e.g., as `~/Downloads/taikun-kube-config.yaml.`

### **Configure your Terminal**

#### **Option A: Temporary (for current terminal session)**

```bash
export KUBECONFIG=~/Downloads/taikun-kube-config.yaml
kubectl cluster-info
kubectl get nodes
```

**OR**

```bash
kubectl get nodes --kubeconfig=~/Downloads/taikun-kube-config.yaml
```

#### **Option B: Replace with your existing kubeconfig permanently**

**replace** the config (if you don't need the old one):

```bash
mkdir -p ~/.kube
mv ~/Downloads/taikun-kube-config.yaml ~/.kube/config
```

### **Test the Connection**

You can verify your connection with basic commands:

```bash
kubectl get pods -A
kubectl get services -A
kubectl cluster-info
kubectl get nodes
```

!!! Info
	If `kubectl get nodes` fails with `Forbidden`, that means your role does not have cluster-level permissions (like access to node info). This is expected with the `view` role.
