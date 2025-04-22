# **OpenStack**
:fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

## **Requirements for OpenStack**

!!! Tip "Requirements for OpenStack"

	To successfully establish a connection between your Taikun and OpenStack accounts:

	* An Ubuntu must exist in the OpenStack environment
	* The **Load_balancer member** and **Member** role is required to deploy and manage Kubernetes and load balancer in OpenStack
	* A router between the public and internal networks should exist (if you want import a network from OpenStack)

To successfully connect your OpenStack account, the following configuration needs to be applied in your OpenStack environment:

* **An Ubuntu image must exist in the OpenStack environment.** The requirement is an Ubuntu 20; we recommend using the most recent kernel (e.g., a base Ubuntu image with HWE kernel available here: [`https://repo.itera.io/repository/images/taikun-image.qcow2`](https://repo.itera.io/repository/images/taikun-image.qcow2)). To use an image in Taikun you need to use the tags *taikun* and *ubuntu{number}*. By default, Taikun takes an image with the latest `{number}`.

* **The ^^load-balancer member^^ role is required to deploy and manage Kubernetes and load balancer in OpenStack.** It grants users the necessary permissions to manage and configure the load balancer service. It allows registering and managing backend servers, configuring health monitoring, scaling the application infrastructure, and handling configuration settings and monitoring.

* **A router between the public and internal networks should exist if you import a network from OpenStack.** There should be internal access to the internal network, either from the router or directly. Additionally, DNS created in the Access Profiles section will be ignored when importing a network.

---

## **Adding OpenStack connection to Taikun**

### First Step:
Switch to the Cloud credentials tab in Taikun.

### Second Step:
Hit **Add Cloud Credentials** in the top-right corner and choose OpenStack from the list.

### Third Step:
Specify the following parameters:

- **Cloud Name:**
Choose a name for your Cloud Credentials (3-30 characters, e.g. cloud-test).

- **User:**
Your OpenStack username.

- **Password:**
Your password to OpenStack.

- **URL:**
Endpoint-Identity (refer to the Where to find the OpenStack credentials below).

- **Domain:**
Insert domain name.

- **Project:**
Select an OpenStack Project.

- **Region:**
Select an OpenStack Region.

- **Public Network:**
Choose a network, if available.

#### Optional:
- Specify Availability Zone
- Volume Types
- Enable Import Network

![Cloud Credentials](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/getting-started/taikun.infra/cloud_cred.webp)
/// caption
OpenStack Cloud Credentials
///

![Add OpenStack Cloud Credentials](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/cloud%20providers/add_openstack.webp)
/// caption
Add Cloud Credentials
///

!!! Info 
	Alternatively, you can use Application credentials issued by the administrator of your OpenStack account.

---

## **Where to find the OpenStack credentials**

After entering your OpenStack username and password, the other data from OpenStack will be added to Taikun automatically after filling in the URL.

To find the URL follow these steps:

### First Step:
Log into your OpenStack account.

### Second Step:
Locate the Project – API Access section in the left-hand navigation panel.

### Third Step:
Find the Identity row and copy its Service Endpoint.
