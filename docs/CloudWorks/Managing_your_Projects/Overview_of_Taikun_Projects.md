# **Overview of Taikun Projects**
:fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

On the Projects tab, you can preview all existing projects for your organization.

![Overview](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/create%20a%20project/project.webp)
/// caption
Overview
///

---

## **Project Properties**

**Project ID, Name, Organization**

Changeless descriptions for each Project.

**Status**

The status shows your servers’ current status and actions in the project in real-time. Below are all possible statuses with their description.

- **Ready**: All servers in the project are prepared without any issues.
- **Deleting**: One or more servers in your current project are being deleted.
- **Failure**: One or more servers failed for some reason during the action (for instance, booting or creating).
- **Pending**: One or more servers are pending, which means that, for example, they have not yet been created on the hosted platform.
- **Updating**: One or more servers in the project are being updated by Taikun during the creation process.
- **Upgrading**: One or more servers upgrade Kubernetes, cloud credentials, or others.

**Health**

This column describes the condition of the project cluster. Keep in mind that a good-working project should always be Healthy.

- **Healthy**: Cluster id without any further problems.
- **None**: Cluster is probably empty, and there is nothing to check.
- **Unhealthy**: Problems with connection to Kubernetes or Monitoring API.
- **Unknown**: Cannot connect Kubernetes API.
- **Warning**: Minor Issues.

**Creation Date**

The exact timestamp when the project was created.

**Kubernetes Version**

Shows the current Kubernetes version for each project.

**Cloud Type**

Shows which provider is hosting your project cluster

- OpenStack
- AWS
- Azure
- Google
- Proxmox
- Zadara
- Zededa
- Tanzu
- vSphere
- Red Hat Openshift

**K8's**

- Kubernetes active
- Kubernetes not active

**Expiration Date**

This feature helps you manage your project – its shelf life. By default, the expiration date of your project is set to infinite. You can set it during the project creation or change it after the project creation with Extend Project Lifetime.

!!! Warning
	After the expiration date, your project is NOT affected, deleted, or locked. It will stay the same.

**Assigned Users**

Edit which users should have access to the project and confirm with the Update button.

!!! Info
	You can also assign the user to a project in Users.

**Sorting**

Projects can be sorted by Project Name, Organization Name, Status, Creation Date, Kubernetes version, or Cloud Type. Also, the search bar can be used to find specific projects.

**Extend Project Lifetime**

This feature helps the user to manage their project’s lifetime. By default, the expiration date of projects is set to infinite, or the user can set it during the creation of projects. Users can use this feature to select projects’ expiration dates or extend the lifetime of projects.

**Reset Project Status**

This feature helps users manage their project status. By using this feature, users can reset their project status. In some cases, we need to change the status of the projects, so we do it with this feature. Below are all possible statuses that we use with this feature:

- Deleting
- Pending
- Pending Delete
- Pending Purge
- Pending Upgrade
- Purging
- Ready
- Updating
- Upgrading

---

## **Lock/Unlock or Delete a Project**

- **Lock Project**: Disable all buttons which can cause some changes in the project.
- **Unlock Project**: Enable action buttons.
- **Delete**: To delete a project. The project must be empty with the status Ready.
