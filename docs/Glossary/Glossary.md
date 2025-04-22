---
hide:
 - navigation
---

# **Taikun Glossary**

## **Access Profile**

Profile using HTTP proxy, SSH (we support RSA, ECDSA or Ed25519), DNS or NTP to access your cluster, the condition is that you add it to the project during creation.

## **Alerting Profile**

Profile attached to a Project, provides notifications about alerts in your Project.

## **Kubernetes Profile**

Profile for enabling Kubernetes functions and features (such as Octavia, Load Balancer, or Proxy on Bastion).

## **Audit Log**

Summary of changes made in Projects.

## **Backup Credentials**

Taikun uses S3-compatible backup. S3 (Simple Storage Service) Backup is a desktop application using Amazon’s infrastructure for remote backups and secure online file storage. It features strong encryption, compression, easy access to your backed-up files, and built-in backup scheduling.

## **Backup Policy**

Defines the ground rules for planning, executing, and validating backups and includes specific activities to ensure that critical data is backed up to secure storage media located in a secure location.

- **Schedules** = Policies.
- **Backups** = A copy created based on the policy.
- **Restores** = A copy from backup data.

## **Billing Rules**

Rules for Chargeback. Every rule is based on an external source, metrics, and price.

## **Chargeback**

External billing set by Billing Rules. You can see the price for every rule for the selected time period.

## **Cloud**

Global network of servers, each with a unique function. These servers are designed to either store and manage data, run applications, or deliver content or a service such as streaming videos, webmail, office productivity software, or social media. Cloud operates as a single ecosystem.

- Taikun supports OpenStack, Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP).

## **Cluster**

Taikun Project – a set of computers that work together so that they can be viewed as a single system.

- **Kubernetes cluster**: Set of nodes that run containerized applications. Containerizing applications package an app with its dependencies and some necessary services. This way, Kubernetes clusters allow applications to be more easily developed, moved, and managed.

## **CNI**

[Container Network Interface](https://github.com/containernetworking/cni), consists of a specification and libraries for writing plugins to configure network interfaces in Linux containers, along with a number of supported plugins.

## **Credentials**

Data confirming the identity of the user or external application (e.g., username and password, username and API key, or authentication token that the identity service provides). In Taikun, you can find Cloud Credentials, Backup Credentials, Billing Credentials, and Showback Credentials.

## **CSM**

Customer Success Manager.

## **Endpoint**

Remote computing device that communicates back and forth with a network to which it is connected (usually URL address).

## **Flavor**

An available hardware configuration for a server. Defines the compute, memory, and storage capacity of nova computing instances.

## **Floating IP**

A kind of virtual IP address that can be dynamically routed to any server in the same network. Multiple servers can own the same Floating IP address, but it can only be active on one server at any given time.

## **Import Network**

Use the network already created in the Cloud (works for OpenStack).

## **Keycloak**

[Keycloak](https://www.keycloak.org/) is open-source software for single sign-on with Identity and Access Management aimed at modern applications and services.

## **Kubeconfig File**

[Kubeconfig file](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) is used to configure access to Kubernetes when used in conjunction with the `kubectl` command-line tool (or other clients).

## **Kubernetes**

[Kubernetes](https://kubernetes.io/) is a portable, extensible, open-source platform for managing containerized workloads and services that facilitates both declarative configuration and automation.

## **Load Balancer**

Refers to the process of distributing a set of tasks over a set of resources (computing units), aiming to optimize the response time and avoid unevenly overloading some compute nodes while others are idle.

## **Metrics**

Measure specific characteristics in a countable manner. Metrics are used in monitoring and billing.

## **Monitoring**

The process to gather metrics about operations, ensuring everything functions as expected to support applications and services. By enabling monitoring, you can see Logs, Alerts, or Metrics.

## **Node**

[Node](https://kubernetes.io/docs/concepts/architecture/nodes/) is a worker machine in Kubernetes and may be either a virtual or a physical machine, depending on the cluster.

## **Octavia**

Exposes the Service externally using the load balancers from OpenStack.

## **Pod**

[Pod](https://kubernetes.io/docs/concepts/workloads/pods/) is the smallest execution unit in Kubernetes. A pod encapsulates one or more applications.

## **Proxy on Bastion**

Exposes the Service on each Node’s IP at a static port, the NodePort. You’ll be able to contact the NodePort Service from outside the cluster by requesting `NodeIP:NodePort`.

## **Reboot**

To reload the operating system of a computer, starting it up again.

- **Hard reboot**: The power to the system is physically turned off and back again, causing an initial boot.
- **Soft reboot**: The system restarts without the need to interrupt the power.

## **Role**

Defines the rights and permissions granted to user accounts. In Taikun, there are Users, Managers (Owner), or Partners.

## **Showback**

Internal billing set by Showback Rules. You can see the price for every rule for the selected time period. You can also set an external source for billing.

## **Showback Rules**

Rules for Showback. Every rule is based on metrics and price.

## **Subscription**

An amount of money that you pay regularly to use Taikun. The price varies depending on the number of users, projects, or TCU.

## **Token**

An alphanumeric text string that provides access to APIs and resources.

## **User**

Digital representation of a person using Taikun. Each user is defined by a username (email) and access is granted by a token. The user is assigned a role with its permissions.

## **Webhook**

A way web applications can communicate with each other, allowing real-time data to be sent from one application to another whenever a given event occurs.
