# **Enable Autoscaler**

Autoscaling is a crucial feature in cloud computing and Kubernetes deployment. It helps organizations:

- **Optimize resource usage**
- **Reduce operational costs**
- **Ensure high availability of applications**

With **Taikun’s autoscaling**, you can set rules to automatically scale workers based on conditions like **CPU utilization**. For example, when CPU usage exceeds a certain threshold, new workers will be added to the cluster.

---

## **Enabling Autoscaler During Project Creation**
:fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

The first way to enable autoscaling is **during the project creation process**.

![Enabling autoscaler during project creation](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/enable-autoscaler/autoscaler.webp)
/// caption 
Enable Autoscaler
///

---

## **Define Autoscaling Parameters**

**1\. Name** - Specify a name for the autoscaler.

**2\. Minimum Workers Count** - Define the **minimum** number of workers in the cluster.

**3\. Maximum Workers Count** - Define the **maximum** number of workers in the cluster.

**4\. Disk Size (GB)** - Set the disk size for the worker nodes.

**5\.** [**Flavor**](https://docs.taikun.cloud/CloudWorks/Managing_your_Projects/Flavor_Information/) - Choose a **server flavor** for the autoscaling instances.

---

## **Enabling Autoscaler in an Existing Project**
:fontawesome-regular-user: User | :fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

You can also enable autoscaling **after** the project has been created.

![Enabling autoscaler from settings](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/enable-autoscaler/enable_autoscaler.webp)
/// caption 
Enable Autoscaler
///
