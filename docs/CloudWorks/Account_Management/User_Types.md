# **User Types**

Understanding Taikun’s User Types is important as it will determine the privileges and permissions that each user has within your structure. There are three main roles that we will be covering: **:fontawesome-regular-user: User, :fontawesome-solid-user-tie: Manager, and :fontawesome-regular-handshake: Partner**.

---

## **User** :fontawesome-regular-user:
Users are the most basic type of user on our platform. They have the least amount of privileges and are typically used for accessing and interacting with the platform on a basic level. Users are able to perform tasks such as viewing Projects, monitoring their health, and accessing them via Kubeconfig files.

---

## **Manager** :fontawesome-solid-user-tie:
Managers have more privileges than users and are typically responsible for managing an Organization within Taikun. In addition to the privileges that users have, managers are also able to create and manage Credentials, assign Projects to team members, and install Applications to clusters.

---

## **Partner** :fontawesome-regular-handshake:
Partners have the most privileges of all three user roles. They typically have a strategic relationship with our company and are able to access advanced features and resources within the platform. Partners are able to create and manage multiple Projects and Organizations, as well as access Billing information and additional reporting tools.

!!! Tip
	Taikun also has Owner User which can be assigned only to one member of an account. Owner Users have the full set of permissions similarly to Partner and are also granted additional access to management of payments.

!!! Note
	Partners can now white-label Taikun from the partner info section in the user info drawer.

---

## **Permissions by User Type**

### Managing Projects

|                                | :fontawesome-regular-user: **User** | :fontawesome-solid-user-tie: **Manager** | :fontawesome-regular-handshake: **Partner** |
|:------------------------------:|:--------:|:-----------:|:-----------:|
| Create a cluster               | ✔        | ✔           | ✔           |
| Manage Kubernetes              | ✔        | ✔           | ✔           |
| Add Servers to Projects        | ✔        | ✔           | ✔           |
| Add VMs to Projects            | ✔        | ✔           | ✔           |
| Repair Projects                | -        | ✔           | ✔           |
| Create/delete Kubeconfig       | -        | ✔           | ✔           |
| Share Projects                 | -        | ✔           | ✔           |
| Delete Projects                | -        | ✔           | ✔           |
| Bind Flavor to Projects        | -        | ✔           | ✔           |
| Bind Image to Projects         | -        | ✔           | ✔           |
| Install Applications           | -        | ✔           | ✔           |
| Lock/Unlock Projects           | -        | ✔           | ✔           |
| Assign Projects                | -        | ✔           | ✔           |
| Adding Cloud Credentials       | -        | ✔           | ✔           |
| Project Quotas                 | -        | ✔           | ✔           |
| Enable/Disable Backup          | -        | ✔           | ✔           |
| Enforce Policies               | -        | ✔           | ✔           |
| Attach/Detach Alerting Profile | -        | ✔           | ✔           |
| Access Project History         | -        | ✔           | ✔           |
| Configure Backup Policy        | -        | ✔           | ✔           |

---

### Monitoring Projects

|                            | :fontawesome-regular-user: **User** | :fontawesome-solid-user-tie: **Manager** | :fontawesome-regular-handshake: **Partner** |
|:--------------------------:|:--------:|:-----------:|:-----------:|
| Access Project Monitoring  | ✔        | ✔           | ✔           |
| Enable/Disable Monitoring  | -        | ✔           | ✔           |
| Access Servers overview    | -        | ✔           | ✔           |
| Enable Slack Notifications | -        | ✔           | ✔           |
| Use ticketing system       | -        | ✔           | ✔           |

---

### Credentials and Profile Management

|                                 | :fontawesome-regular-user: **User** | :fontawesome-solid-user-tie: **Manager** | :fontawesome-regular-handshake: **Partner** |
|:-------------------------------:|:--------:|:-----------:|:-----------:|
| Add/delete Cloud Credentials    | -        | ✔           | ✔           |
| Add/delete Backup Credentials   | -        | ✔           | ✔           |
| Add/delete Showback Credentials | -        | ✔           | ✔           |
| Add/delete Kubernetes profiles  | -        | ✔           | ✔           |
| Add/delete Access Profiles      | -        | ✔           | ✔           |
| Add/delete Alerting Profiles    | -        | ✔           | ✔           |
| Add/delete Policy Profiles      | -        | ✔           | ✔           |
| Add/delete Standalone Profiles  | -        | ✔           | ✔           |

---

### Security

|                    | :fontawesome-regular-user: **User** | :fontawesome-solid-user-tie: **Manager** | :fontawesome-regular-handshake: **Partner** |
|:------------------:|:--------:|:-----------:|:-----------:|
| Access Audit Log   | -        | ✔           | ✔           |
| Configure KeyCloak | -        | ✔           | ✔           |
| Issue API tokens   | -        | ✔           | ✔           |

---

### Account Management

|                            | :fontawesome-regular-user: **User** | :fontawesome-solid-user-tie: **Manager** | :fontawesome-regular-handshake: **Partner** |
|:--------------------------:|:--------:|:-----------:|:-----------:|
| Add/delete users           | -        | ✔           | ✔           |
| Manage Organizations       | -        | -           | ✔           |
| Access Billing Information | -        | ✔           | ✔           |

