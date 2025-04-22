---
hide:
 - toc
---

# **Taikun CloudWorks Operators**

An operator in Taikun CloudWorks is a specialized controller that enhances the capabilities of the platform by automating the management and operation of specific applications or workloads. This operator is tailored to work seamlessly within the Taikun environment, providing an efficient and automated way to deploy, scale, and manage complex applications.

Installing an Operator within Taikun is as straightforward as deploying it as an application using YAML manifests, similar to managing apps. Taikun simplifies the installation process for various functionalities.

In Taikun CloudWorks, the deployment and management of Operators are seamlessly incorporated into the platform’s functionality. The process involves leveraging the OIn Taikun CloudWorks, operator deployment, and management, which are seamlessly incorporated into the platform’s functionality. The process involves leveraging the Operator Lifecycle Manager (OLM), a tool that simplifies the installation and ongoing management of Operators within the cluster.t of Operators within the cluster.

For cluster administrators, the installation process involves using the web console or the Command-Line Interface (CLI). Subscribing an Operator to one or more namespaces ensures that the Operator becomes readily available to developers throughout the cluster. This streamlined process guarantees the efficient deployment and accessibility of Operators within the Taikun environment.

---

## **Pod placement of Operator workloads**

By default, Operator Lifecycle Manager (OLM) places pods on arbitrary worker nodes when installing an Operator or deploying Operand workloads. As an administrator, you can use projects with a combination of node selectors, taints, and tolerations to control the placement of Operators and Operands to specific nodes.

Controlling pod placement of Operator and Operand workloads has the following prerequisites:

1. Determine a node or set of nodes to target for the pods per your requirements. If available, note an existing label, such as `node-role.kubernetes.io/app`, that identifies the node or nodes. Otherwise, add a label, such as `myoperator`, by using a compute machine set or editing the node directly. You will use this label later as the node selector for your project.

2. If you want to ensure that only pods with a certain label are allowed to run on the nodes`can` while steering unrelated workloads to other nodes, add a taint to the node or nodes by using a compute machine set or editing the node directly. Use an effect that ensures that new pods that do not match the taint cannot be scheduled on the nodes. For example, a `myoperator:NoSchedule` taint ensures that new pods that do not match the taint are not scheduled onto that node, but existing pods on the node are allowed to remain.

3. Create a project that is configured with a default node selector and, if you added a taint, a matching toleration.
