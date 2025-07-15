# **04 - Taikun Ingress - Managed Apps**

This guide outlines the process of exposing applications deployed using preconfigured Helm charts—commonly referred to in CloudWorks as *Catalog Applications*. These are applications available for installation into user clusters via the CloudWorks platform.

CloudWorks provides a curated set of Helm charts known as **Taikun Managed Apps**, which are maintained and preconfigured for ease of use. This documentation uses Taikun Managed Apps as the reference implementation, but the same principles generally apply to many Helm charts.

We will expose Taikun managed apps using Taikun Ingress. In theory, its the same thing as we had in the [**previous chapter**](http://213.134.21.37/CloudWorks/Exposing_Applications/03_Taikun_Ingress-Basics/). The only difference is that instead of creating the Ingress and services manually, we will use Helm chart variables which create the resources instead of us.

![how it works](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Exposing%20Applications/Expose_with_Ingress/expose_with_ingress.webp)
/// caption
How it works
///

---

## **Overview of Helm Charts**

Helm charts are versioned packages that define and bundle multiple Kubernetes resources together as a single application, enabling consistent deployment and management across environments. This abstraction simplifies the deployment and management of complex applications on Kubernetes.

For example, the Helm chart for WordPress typically deploys two pods:
- One for the WordPress application itself
- One for the MySQL database backend

Helm charts use a powerful templating engine that allows users to customize deployed resources via configuration values. One such configurable parameter is:

```yaml
ingress.enabled: true
```

Setting `ingress.enabled=true` triggers the deployment of an Ingress resource, alongside the application's core components (e.g., pods, services).

This built-in logic enables users to expose applications externally without manually defining Kubernetes resources like Ingress objects or LoadBalancers.

---

## **Lab excercises:**

### **1\. Create a Catalog Application with WordPress**

* Start by creating a new application from the catalog.
* Select WordPress as the application you want to deploy.

### **2\. Set Parameters for Ingress in the Catalog Settings**

* Go to the catalog parameters section. Here, configure the Ingress settings such as the hostname or domain you want to use. Make sure to define these values properly so the service can be accessed externally.

![common settings](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Exposing%20Applications/Expose_with_Managed_Apps/Common_settings.webp)
/// caption
Common Settings
///

![parameters](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Exposing%20Applications/Expose_with_Managed_Apps/Parameters.webp)
/// caption
Set parameters
///

!!! Note
	You must set the ingressClass parameter to **taikun**

![success install](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Exposing%20Applications/Expose_with_Managed_Apps/Success_install.webp)
/// caption
Success Install
///

### **3\. (optional)  Configure DNS or Use sslip.io for Testing**

* Point your DNS to the appropriate external IP address of your cluster. If you don’t have a custom domain available, you can use a temporary domain from sslip.io, which maps your IP automatically (e.g., 192-0-2-1.sslip.io).

### **4\. Deploy and Access WordPress**
* Deploy the application once all parameters are set. After deployment is complete, use the appropriate WordPress access command or URL to verify that the application is running correctly and accessible from the internet.

![wordpress](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Exposing%20Applications/Expose_with_Managed_Apps/wp-success.webp)
/// caption
Wordpress
///

![wordpress admin](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Exposing%20Applications/Expose_with_Managed_Apps/wp-admin.webp)
/// caption
Wordpress admin
///
