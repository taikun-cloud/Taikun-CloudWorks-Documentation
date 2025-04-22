# **Importing Existing Kubernetes Cluster**

Importing an existing cluster in Kubernetes (and its managed services like EKS, AKS, and GKE) means connecting a pre-existing cluster (created independently or via another tool) to a management platform. This approach allows you to manage and observe the cluster using the platform’s features without needing to recreate or modify it.

Taikun provides four types of platforms to import an existing cluster:

- **Generic Kubernetes Cluster**
- **Amazon EKS**
- **Azure AKS**
- **Google GKE**

!!! Warning "What you can do with (Fully Managed Project Mode) Imported Existing Kubernetes Cluster"
	What you can do after importing the existing cluster? 

	- **Enable Monitoring** - Track performance and health metrics
	- **Enable Backup** - Secure your applications and data
	- **Enable Policy** - Apply security and operational policies
	- **AI Assistant** - Get AI-powered recommendations and insights
	- **Application Deployment** - Deploy applications directly

	What cannot be controlled? 

	- **Individual nodes cannot be managed**
	- **Cluster configuration cannot be modified**

---

## **Generic Kubernetes Cluster**

You can import clusters that were set up manually or using lightweight Kubernetes distributions such as:

- **kubeadm**: A standard tool for setting up production-grade clusters.
- **minikube**: Primarily for local development and testing.
- **MicroK8s**: A minimal, production-ready Kubernetes distribution from Canonical, ideal for IoT and edge use cases.
- **K3s**: A lightweight Kubernetes distribution designed for resource-constrained environments.
- **Kind (Kubernetes in Docker)**: Typically used for local testing and CI/CD workflows.

The import process usually involves configuring kubeconfig files and adding cluster management agents. This is ideal when you want to bring existing clusters into a centralized management platform without recreating them.

---

## **Amazon EKS (Elastic Kubernetes Service)**

You can import existing EKS clusters that were created manually. The import process typically requires IAM permissions and configuration of the AWS CLI to obtain the cluster’s kubeconfig. Once imported, the cluster can be managed through AWS services.

![EKS](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Taikun%20CloudWorks%20Overview/Importing_Existing_Kubernetes_Cluster/eks_cluster.webp)
/// caption
Imported EKS Cluster
///

---

## **Azure AKS (Azure Kubernetes Service)**

Like EKS, you can import AKS clusters not initially created through a specific management tool. The process requires Azure CLI configuration and RBAC setup. Additionally, you may need to register the cluster with Azure Arc to enable centralized management and monitoring.

![AKS](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Taikun%20CloudWorks%20Overview/Importing_Existing_Kubernetes_Cluster/aks_cluster.webp)
/// caption
Imported AKS Cluster
///

---

## **Google GKE (Google Kubernetes Engine)**

You can import existing GKE clusters, regardless of their creation method. The import process involves setting up the gcloud CLI and ensuring the appropriate IAM roles are assigned. Integration with third-party management systems or Google’s own Anthos is also possible.

![GKE](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Taikun%20CloudWorks%20Overview/Importing_Existing_Kubernetes_Cluster/gke_cluster.webp)
/// caption
Imported GKE Cluster
///

---

## **Import Modes**

!!! Tip "Prerequisites"
	Before importing your existing Kubernetes cluster into Taikun CloudWorks, ensure you meet the following requirements:

	- **Access Credentials and Permissions**: You must have the required credentials and administrator-level permissions for both the existing Kubernetes cluster and Taikun CloudWorks.
	- **Kubeconfig Format**: The Kubeconfig file must be in YAML format with a `.yaml` or `.yml` extension.
	- **Default StorageClass**: If you import the cluster as "Cloud Credential" or "Fully Managed," your cluster must have a default StorageClass.
	- **Support for LoadBalancer**: If you do not provide an ingress host, your cluster must support services of type LoadBalancer, as Taikun will deploy an ingress controller.

### **Cloud Credential Mode**

This mode enables the creation of virtual clusters from the imported cluster.

### **Fully Managed Project Mode**

This mode offers full access to Taikun’s features, including add-ons (monitoring, backup, policy, AI assistant, and application deployment) and Kubernetes information.

### **Read-Only Project Mode**

This mode allows the viewing of Kubernetes information without management capabilities.

---

## **Importing a Kubernetes Cluster into Taikun CloudWorks**

### Step 1: Create a New Project
1. Log in to Taikun CloudWorks.
2. Navigate to the **Projects** section.
3. Click the **Add Project** button.

### Step 2: Provide Cluster Details
- Enter the credentials and details of the existing Kubernetes cluster, including its address and authentication information.

### Step 3: Obtain the Kubeconfig File
- Retrieve the kubeconfig file from the Kubernetes cluster. This file is necessary to establish a secure connection between Taikun CloudWorks and the imported cluster.

### Step 4: Complete the Import Process
- Follow the on-screen instructions to finalize the import process.
- Taikun CloudWorks will establish a secure connection with the Kubernetes cluster, making it manageable from the platform.

---

## **Managing Imported Clusters**

### **Cloud Credential Clusters**

- **Create virtual clusters**
- **View the Kubernetes version**
- **Only the "Virtual Clusters" tab is accessible**

### **Fully Managed Clusters**

- **Utilize add-ons like monitoring and backups**
- **Access Kubernetes information and installed applications**

### **Read-Only Clusters**

- **View Kubernetes version and history**
- **Limited to the Kubernetes tab with no additional actions**
