# **LiveOps**
:fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

LiveOps provides users with a real-time overview of the status and availability of all elements in the Kubernetes cluster, offering a live, dynamic interface to monitor resources. Previously, users had to rely on third-party tools or SSH into the cluster for status checks, requiring constant refreshing. With LiveOps, all changes in the cluster are displayed immediately, allowing users to track resources effortlessly.

---

## **Access and Roles**

LiveOps is accessible in **ready** and **healthy** projects, and available for users with **:fontawesome-solid-user-tie: Manager** and **:fontawesome-regular-handshake: Partner** roles.

---

## **LiveOps Sections**

The LiveOps page is divided into five main sections:

- **General**
- **Workloads**
- **Network**
- **Storage**
- **Other**

---

### 1. **General**

The **General** section contains two key elements: **Namespaces** and **Nodes**.

#### **Namespaces**

Namespaces in Kubernetes are used to isolate resources within a cluster. Names must be unique within a namespace but not across them. They are used for namespaced objects. Kubernetes namespaces can have two possible statuses:

- **Active**
- **Terminating:** When a namespace is being deleted, new resources cannot be created.

Available actions for Namespaces are:

- Create
- Edit
- Describe
- Download YAML
- Delete

#### **Nodes**

Nodes are virtual or physical machines in Kubernetes that run Pods. Nodes are managed by the control plane and provide the necessary resources to run Pods.

A node’s state can be one of the following:

- **Ready**
- **NotReady**
- **Unknown**

The available actions for Nodes are:

- **Download YAML**
- **Cordon:** Marks a node as unscheduled, avoiding new Pods from being assigned.
- **Drain:** Safely evicts all Pods from a node before maintenance.

---

### 2. **Workloads**

The **Workloads** section provides detailed information about various resources, such as **Pods**, **Deployments**, **StatefulSets**, **DaemonSets**, **Jobs**, and **CronJobs**.

#### **Pods**

A Pod is the smallest unit in Kubernetes and contains one or more containers. The state of the Pod depends on the containers inside it. Pod statuses include:

- **Waiting:** Containers are being created.
- **Terminated:** Pod has been terminated.
- **NotReady:** Containers are failing to start and keep restarting.
- **Terminating:** The Pod is being deleted.
- **SchedulingGated:** Waiting for assignment by the scheduler.
- **Init:** Running init containers in sequence.
- **InitFailed:** Init containers failed.
- **Unknown:** The Pod’s state is unknown.
- **Failed:** All containers stopped, and at least one failed.
- **Running:** At least one container is running.
- **Pending:** Pod is pending.
- **Succeeded:** All containers have been successfully completed.

The available actions for Pods are:

- **Create**
- **Describe**
- **Edit**
- **Download YAML**
- **Open Logs**
- **Container Terminal** (Some Pods may have a terminal available for containers.)
- **Delete**

#### **Deployments**

A Deployment manages the lifecycle of Pods, ensuring the actual state matches the desired state defined by a ReplicaSet. A Deployment can have the following statuses:

- **Progressing**
- **Available**
- **Failed**

The available actions for Deployments are:

- **Create**
- **Scale up/down**
- **Edit**
- **Pause / Resume**
- **Restart**
- **Rollback**
- **Describe**
- **Download YAML**
- **Delete**

#### **StatefulSets**

A StatefulSet manages the deployment and scaling of Pods while maintaining their order and uniqueness. Unlike Deployments, StatefulSets give each Pod a permanent identity.

StatefulSets can have the following statuses:

- **Progressing**
- **Running**
- **Available**
- **Updating**
- **Unknown**

Available actions for StatefulSets are:

- **Create**
- **Restart**
- **Rollback**
- **Describe**
- **Edit**
- **Download YAML**
- **Delete**

#### **DaemonSets**

DaemonSets ensures that a Pod runs on each Node in the cluster. Their statuses include:

- **Running**
- **Pending**

Available actions for DaemonSets are:

- **Create**
- **Restart**
- **Rollback**
- **Describe**
- **Edit**
- **Download YAML**
- **Delete**

#### **Jobs**

Jobs run one-off tasks by creating Pods and retrying until a specified number of completions is reached. Job statuses include:

- **Active**
- **Failed**
- **Complete**
- **Unknown**

Available actions for Jobs are:

- **Create**
- **Describe**
- **Edit**
- **Download YAML**
- **Delete**

#### **CronJobs**

CronJobs create Jobs based on a specified schedule. Cron schedules follow standard cron syntax, with common examples like:

- */15 * * * *: Every 15 minutes
- 0 * * * *: Every hour
- 0 0 * * *: Every day at midnight
- 0 0 * * 0: Every Sunday at midnight
- 0 0 1 * *: First day of every month

The statuses for CronJobs are:

- **Active**
- **Suspended**
- **Failed**
- **Successful**
- **Scheduled**

Available actions for CronJobs are:

- **Create**
- **Edit**
- **Delete**
- **Download YAML**
- **Suspend/Resume**
- **Trigger** (run now)

---

### 3. **Network**

The **Network** section includes **Services**, **Network Policies**, and **Ingresses**.

#### **Services**

Services provide stable network access to applications within the cluster. Types of Services include:

- **ClusterIP:** Accessible only within the cluster.
- **NodePort:** Exposes the Service externally on each node’s IP at a fixed port.
- **LoadBalancer:** Exposes the Service using an external load balancer.
- **ExternalName:** Maps the Service to a domain name.

The External IP of a Service can be:

- **Empty (omitted)**
- **An IP address (e.g., 92.22.6.3)**
- **`<pending>` (waiting for an IP)**
- **`<unknown>` (in case of issues)**

Available actions for Services are:

- **Create**
- **Edit**
- **Download YAML**
- **Delete**

#### **Network Policies**

Network Policies define how Pods communicate with each other and the external world. Available actions for Network Policies are:

- **Create Network Policy**
- **Edit Network Policy**
- **Delete Network Policy**
- **Download YAML**

#### **Ingresses**

Ingress defines rules for routing HTTP/HTTPS traffic to internal services. The backend resource in an Ingress can be a Service or custom resource.

Available actions for Ingress are:

- **Create Ingress**
- **Edit Ingress**
- **Delete Ingress**
- **Download YAML**

---

### 4. **Storage**

The **Storage** section manages **Storage Classes**, **Persistent Volume Claims (PVCs)**, **ConfigMaps**, and **Secrets**.

#### **Storage Classes**

A StorageClass allows admins to define different types of storage. PVCs can request specific storage classes, and the reclaim policy defines how PersistentVolumes are handled.

Actions for Storage Classes:

- **Download YAML**
- **Describe**

#### **Persistent Volume Claims**

Persistent Volumes are storage resources in the cluster. PVCs request storage from a class, and their statuses can be:

- **Pending**
- **Bound**
- **Lost**

Actions for PVCs:

- **Create PVC**
- **Edit PVC**
- **Delete PVC**
- **Download**

#### **ConfigMaps and Secrets**

**ConfigMaps** store non-sensitive data in key-value pairs, while **Secrets** store sensitive information like passwords. 

Actions for both are similar:

- **Create**
- **Edit**
- **Delete**
- **Download YAML**
- **Describe**

---

### 5. **Other**

The **Other** section contains **Custom Resources**, **Pod Disruption Budgets**, and **Helm Releases**.

#### **Custom Resources**

Custom resources extend the Kubernetes API. Actions for custom resources:

- **Describe**
- **Download YAML**

#### **Pod Disruption Budgets**

A PodDisruptionBudget (PDB) ensures that a minimum number of Pods are available during voluntary disruptions.

Actions for PDBs:

- **Create PDB**
- **Edit PDB**
- **Delete PDB**
- **Download**
- **Describe PDB**

#### **Helm Releases**

Helm releases manage Kubernetes resources. Helm charts define everything needed to deploy resources.

Helm release statuses include:

- **Deployed**
- **Pending-install**
- **Pending-upgrade**
- **Pending-rollback**
- **Uninstalling**
- **Failed**
- **Unknown**
