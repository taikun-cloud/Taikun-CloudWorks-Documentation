# **Project Details**
:fontawesome-regular-user: User | :fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

By clicking the selected Project, you are redirected to the **Servers**. Here you can see all servers for the project with their description.

![Overview](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/create%20a%20project/project.webp)
/// caption 
Overview
///

---

## **Project Info**

Under the **Servers** title is a brief description of the project – such as *Project*, *Organization, Project Status*, *Cloud Type*, *Kubernetes Version*, *Access Profile*, *Cloud Credentials*, *Kubernetes Profile*, *Alerting Profile*, *Policy Profile*, *Access IP Address* (if you use this address to SSH connect, please do not use user ubuntu, it’s in use by Taikun for managing the cluster) and *Kubernetes Health*. Some of these include links to e.g. cloud or profiles.

![Project info](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/project%20contents/project_con.webp)
/// caption 
Project info
///

You can also see here **ETC** = Estimated Time to Complete. It is the approximate time (in minutes) until the cluster will be completed.

![ETC](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/project%20contents/etc.png)
/// caption 
ETC
///

---

## **Servers**

Every server is described by *ID*, *Server Name*, *IP Address*, *Flavor*, *CPU/RAM/Disk Size*, *Role*, *Status*, *K8s Health*, *Created,* *Created by,* *Last Modified,* *Last Modified by,* and *Actions*.

![Details](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/project%20contents/server_det.webp)
/// caption 
Details
///

Server status can be:

- **Deleting**
- **Pending**
- **Pending Delete**
- **Pending Purge**
- **Pending Upgrade**
- **Purging**
- **Ready**
- **Updating**
- **Upgrading**

---

## **Reboot Servers**

You can reboot servers directly from Taikun.

![Actions](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/project%20contents/project.contents.4.webp)
/// caption 
Actions
///

### Show Status

Shows current status from the cloud for 3 seconds.

### Reboot

You can choose HARD or SOFT reboot for each server.

- **HARD** – the power to the system is physically turned off and back again, causing an initial boot.
- **SOFT** – system restarts without the need to interrupt the power.

!!! Info
	Hard or soft reboot can be chosen only for OpenStack. For AWS and Azure, there is only a simple reboot available.
