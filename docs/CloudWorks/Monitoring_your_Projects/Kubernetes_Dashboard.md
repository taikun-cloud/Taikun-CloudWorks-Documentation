# **Kubernetes dashboard**
:fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

At your Project page, select **"Dashboard"**.

The Dashboard is available for your Project if monitoring is enabled. You can read more about monitoring [**here**](https://docs.taikun.cloud/CloudWorks/Monitoring_your_Projects/Enable_Monitoring_in_Projects/).

At least four nodes are required. Read more details about cluster creation [**here**](https://docs.taikun.cloud/CloudWorks/Getting_Started/Creating_Kubernetes_cluster/).

Users can compare metrics across different periods and namespaces without the need for extensive command-line knowledge by using Prometheus queries (PromQL). It helps monitor resource utilization, enabling effective capacity planning and allocation.

---

## **Taikun Tab**

On Cluster Dashboard you can find:

### Node Overview
Display information about cluster nodes, such as CPU and memory utilization, pod count, and other relevant metrics.

### Pod Overview
Show the status of pods within the project, including their current state, restart counts, and resource usage.

### Overcommitment
CPU and Memory overcommit.

You can define a specific time range.

![Time Range](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/monitoring-your-projects/dashboard.date.png)
/// caption 
Time Range
///

---

## **General**

### Number of pods per namespace
This query counts the total number of pods running in each namespace of the cluster.

![Pod per namespaces](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/monitoring-your-projects/Dashboard1.png)
/// caption
Pod per namespaces
///

### Number of ready nodes

![Ready nodes](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/monitoring-your-projects/Dashboard2.png)
/// caption
Ready nodes
///

---

## **Pods**

Show the status of pods within the project, including their current state, restart counts, and resource usage.

### Pod restarts by namespaces
This metric indicates the cumulative count of restarts for each pod and container in your Kubernetes cluster.

![Pod per namespaces](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/monitoring-your-projects/Dashboard3.png)
/// caption
Pod per namespaces
///

### Top 10 containers by CPU usage
Running this query will provide you with a list of the top 10 containers based on their recent CPU usage rates.

![by CPU usage](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/monitoring-your-projects/dash.top.png)
/// caption 
by CPU usage
///

### Top 10 containers by memory usage
Running this query will provide you with a list of the top 10 containers based on their recent memory usage rates.

![by memory usage](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/monitoring-your-projects/dash.top10.png)
/// caption 
by memory usage
///

### Pods not ready
List the number of total pods not ready in each namespace.

![not ready](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/monitoring-your-projects/dash6.png)
/// caption 
not ready
///

### Total pods
List the number of total pods available in each namespace.

![total pods](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/monitoring-your-projects/dash7.png)
/// caption
total pods
///

---

## **Nodes**

Display information about cluster nodes, such as CPU and memory utilization, pod count, and other relevant metrics.

### Memory Load
This metric indicates the cumulative count of restarts for each pod and container in your Kubernetes cluster.

![memory load](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/monitoring-your-projects/dash.node1.png)
/// caption
memory load
///

### Node Load 1
The average number of processes in the run queue or waiting for CPU time over the last 1 minute.

![Load by last minute](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/monitoring-your-projects/dash.node2.png)
/// caption
Load by last minute
///

### Node Load 5
The average number of processes in the run queue or waiting for CPU time over the last 5 minutes.

![Load by last 5 minutes](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/monitoring-your-projects/dash.node4.png)
/// caption
Load by last 5 minutes
///

### Node Load 15
The average number of processes in the run queue or waiting for CPU time over the last 15 minutes.

![Load by last 15 minutes](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/monitoring-your-projects/dash.node3.png)
/// caption 
Load by last 15 minutes
///

---

## **Overcommitment**

CPU and Memory overcommit.

### CPU overcommit
Compares the requested CPU resources (limits) of pods to the total available CPU capacity of the cluster.

![overcommit](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/monitoring-your-projects/dash.over2.png)
/// caption
overcommit
///

### Memory overcommit
Compares the requested memory of pods to the total available memory capacity of the cluster.

![memory overcommit](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/monitoring-your-projects/dash.over1.png)
/// caption
memory overcommit
///

---

## **Organization Tab**

The organization tab shows the list of Queries added by the user.

To add a Query, follow these steps:

1. **Click "Add Query"**
2. **Name**: The name of the query, which briefly describes its purpose or what it intends to retrieve.
3. **Expression**: The actual PromQL expression that defines how to retrieve and process the metrics. This expression specifies the mathematical and logical operations to be applied to the metrics.
4. **Description**: A brief explanation of what the query does or what kind of insight it provides. This description helps other users understand the query’s purpose and usage.
5. **Category name**: Categories can be related to the type of metric, the aspect of monitoring, or any other relevant grouping.
6. **Click "Add"**
