---
hide:
 - toc
---

# **Red Hat OpenShift**
:fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

[OpenShift](https://www.redhat.com/en/technologies/cloud-computing/openshift) is a containerization and Kubernetes platform developed by Red Hat, a leading open-source software company. It is designed to simplify containerized applications’ deployment, management, and scaling. OpenShift provides a comprehensive set of tools and features for building, deploying, and running container-based applications in a cloud-native and DevOps-friendly manner.

---

## **Requirements for Red Hat OpenShift**

!!! Tip "Requirements for Red Hat OpenShift"

	To successfully establish a connection between your Taikun and Red Hat OpenShift accounts:
	
	In OpenShift account find these information:

	* Kubeconfig File 
	* Pull Secret
	* Base Domain
---

## **Connecting OpenShift to Taikun**

1\. Switch to the *Cloud credentials* in Taikun.  

2\. Click the *Add Cloud Credentials* button in the top-right corner.  

3\. Select the *Openshift* option.  

4\. Specify the parameters:  

   - **Cloud Name** – choose a name with 3-30 alphanumeric characters.  
   - **Kubeconfig File** – a configuration file used by Kubernetes and OpenShift command-line tools to authenticate and interact with a cluster. It contains information about the cluster, user credentials, context, and other configuration details.  
   - **Pull Secret** – a Kubernetes secret that stores authentication information required to pull container images from container registries. It contains the necessary credentials, such as username, password, or token, and the registry URL for accessing container images.  
   - **Storage Class** – a resource that defines how the cluster’s dynamic provisioning of storage volumes should work. It specifies parameters such as the storage backend, access modes, and other storage characteristics to be provisioned.  
   - **Base Domain** – the root domain that is the foundation for creating route hostnames within your OpenShift cluster. Routes are used to expose applications running in OpenShift to the external world.  

5\. Click *Add Cloud Credentials*.  

![OpenShift Screenshot](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/cloud%20providers/cc_openshift.webp)
/// caption 
OpenShift Cloud Credentials
///
