# **Overview**

## **Outline**

:fontawesome-regular-user: User | :fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

User panel is a section available to every User type of Taikun. Up here, you and your colleagues can access an overview of all your created Projects, create new Projects, and make your additions to the already existing ones. It is the main menu of Taikun, where all team members can locate all the necessary information about the state of your Clusters.

The User section consists of 2 sub-sections: Dashboard and Projects

---

## **Dashboard**

Dashboard menu contains eight interactive widgets and four tables that provide you with an overview of the state of all your Projects.

The following widgets are shown:

### Projects
This widget displays the state of your Projects via four statuses (Succeeded/Failed/Pending/Updating)

### Server Statuses
To dive deeper into your Projects, the widget indicates the state of each particular server in your Projects (using the same Succeeded/Failed/Pending/Updating statuses)

### Servers
This widget is a graphical representation of the number of servers running on connected Clouds

### Cloud Credentials
The number of connected Cloud services is shown here

### Nodes Overview
Here you can find the state of every Node of your Projects

### Pods Overview
Similarly to Nodes, this widget displays the amount of healthy/unhealthy Pods running on your servers

### Projects with Alerts
This widget indicates the number of Projects having various alerts

### Kubernetes Health
An indication of the health of your Kubernetes in active Projects is shown here

![Dashboard](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/navigating-taikun/overview/overview.1.webp)
/// caption
Dashboard 
///

---

## **Our Tables include information about**

### Nodes
Overview of Nodes for each particular project showing their state of Disk, Memory, PIDs, and readiness

### Pods
Detailed information on every Pod of a specified Project

### Project Resources Allocation
Allocation of resources per Project

### Recent Events
Log of all events related to existing Projects

![Dashboard details](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/navigating-taikun/overview/overview.2.webp)
/// caption 
Dashboard Details
///

!!! Tip
	All widgets presented on the page are interactive – feel free to click on any section to see detailed information.

Visit the [**Available Monitoring tools**](https://docs.taikun.cloud/CloudWorks/Monitoring_your_Projects/Available_Monitoring_tools/) section to see how monitoring can be configured in Taikun.

---

## **Projects**

The projects section displays all of your existing Projects in a table format. This overview allows you to easily access any selected Project for making changes, see its current state and additional information, and change preferred Project Properties.

The complete list of properties includes:

### General
- **Project ID**: Unique identifier for the Project
- **Project Name**: The name of the Project
- **Organization**: The Organization the Project belongs to
- **Status**: Current state of the Project (e.g., Ready, Failure, Updating, etc.)
- **Health**: Indicates the health status of the Project
- **Creation Date**: Date when the Project was created

### Kubernetes
- **K8s Version**: The applied version of Kubernetes
- **K8s**: Quick link to the Project’s Kubernetes overview

### Cloud
- **Cloud Type**: The connected Cloud service (e.g., AWS, Azure, etc.)
- **Expiration Date**: Expiration date of the Project (if set)

### Access & Actions
- **Assigned Users**: Users or teammates having access to the Project
- **Actions**: Action buttons to manage the Project
- **View**: Links to quickly access the Kubernetes (K8s) or Virtual Machines (VMs) overview

![Project page](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/create%20a%20project/project.webp)
/// caption
Project Page
///

Every Project can be opened by clicking on its name. Up there, you will be presented with an overview of a Project showing its servers, detailed state, and additional properties.

![Project details page](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/navigating-taikun/overview/project_detail.webp)
/// caption 
Project Details page
///

You can also expand the servers’ overview by clicking on the Show Hidden Columns button on the right-hand side of the screen. This will show additional fields Created By, Last Modified, and Last Modified by.

![Project actions](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/navigating-taikun/overview/overview.5.webp)
/// caption 
Project Actions
///

---

More information about Taikun Projectsis provided [**here**](https://docs.taikun.cloud/CloudWorks/Managing_your_Projects/Overview_of_Taikun_Projects/).
