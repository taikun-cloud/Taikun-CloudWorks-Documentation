# **Kubernetes Upgrades with Taikun**

Upgrading your Kubernetes cluster with Taikun ensures access to the latest features and security patches, essential for maintaining a robust and secure environment. Taikun supports various cloud providers, including OpenStack, AWS, Azure, GCE, Tanzu, OpenShift, Zadara, and Zededa, allowing users to create bastion, worker, and master nodes for their Kubernetes clusters. When upgrading, it is crucial to have at least two worker nodes in addition to the bastion and master nodes. This configuration ensures that at least one healthy worker node remains available to maintain cluster functionality during the upgrade process. Taikun’s Kubernetes upgrade process follows a step-by-step procedure, providing a smooth transition between versions. When a user initiates an upgrade, the system updates the cluster to the next available version in sequence, guaranteeing compatibility and stability at each stage. If the cluster is healthy and the upgrade is successful, the upgrade button becomes available again, allowing the user to continue upgrading incrementally. This systematic process ensures that clusters remain stable and reliable throughout the upgrade.

---

## **Requirements**

- You have a Kubernetes cluster with at least two worker nodes in addition to the bastion and master nodes.
- Your cluster is running an older version of Kubernetes.

---

## **Steps to Upgrade Your Kubernetes Cluster with Taikun**

**Step 1: Create a Kubernetes Cluster with Two Worker Nodes.**

**Step 2: Ensure the Cluster is Healthy.**

![Healthy Cluster](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/kubernetes%20upgrade/upgrade-2.webp)
/// caption
Healthy Cluster
///

**Step 3: Upgrade your Kubernetes cluster.**

![Public Repositories](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/kubernetes%20upgrade/upgrade-3.webp)
/// caption 
Upgrading Cluster
///

**Step 4: Post-Upgrade Verification**

- After the upgrade, confirm that all nodes are running the latest version.
- Perform health checks to ensure the cluster is fully functional and stable.

![Upgrade verification](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/kubernetes%20upgrade/upgrade-5.webp)
/// caption 
Upgraded Healthy Cluster
///
