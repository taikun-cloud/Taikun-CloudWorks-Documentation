---
hide:
 - toc
---

# **VMware Tanzu**
:fontawesome-regular-handshake: Partner

[Tanzu](https://tanzu.vmware.com/tanzu) is a suite of products and services developed by VMware to facilitate the deployment, management, and modernization of applications across multi-cloud and hybrid-cloud environments. It aims to simplify and accelerate the process of building, running, and managing applications using modern cloud-native technologies.

---

## **Requirements for VMware Tanzu**

!!! Tip "Requirements for VMware Tanzu"

	To successfully establish a connection between your Taikun and WMware Tanzu accounts:

	In OpenShift account find these information:

	* Endpoint URL
	* User
	* Tanzu Password
	* Specify namespace
---

## **Adding VMware Tanzu connection to Taikun**

!!! Note
	Only users with a **:fontawesome-regular-handshake: Partner** role in Taikun can add VMware Tanzu credentials for security purposes.

1\. Switch to the *Cloud credentials* tab in Taikun.

2\. Click on the *Add Cloud Credentials* button in the top-right corner.

3\. Specify the following parameters in the *Tanzu* section:

   - **Cloud Name** – choose a name for your Cloud Credentials (3-30 characters, e.g. `tanzu-cloud-test`).
   - **URL** – Endpoint-Identity (e.g. `https://stra-caas56.businesscube.cz`).
   - **User** – your user name to Tanzu (e.g. `user`).
   - **Password** – your password to Tanzu (e.g. `user234`).
   - **Namespace** – specify namespace here.
   - **Volume Type** – specify volume type.
   - **Continent** – specify working continent.

4\. Confirm your action.

![Tanzu Screenshot](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/cloud%20providers/Tanzu.webp)
/// caption
Tanzu Cloud Credentials
///
