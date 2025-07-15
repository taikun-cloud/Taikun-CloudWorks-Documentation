# **05 - Taikun Ingress - CertManager**

For production environments, we naturally want to use a **custom domain** and **HTTPS**. There are multiple ways your organization might handle certificates. In this example, we will use [**Cert Manager**](https://cert-manager.io/), an industry-standard tool for automated certificate management in Kubernetes.

---

## **DNS Configuration**

DNS setup depends on your domain registrar.

For demonstration purposes, we will use [**sslip.io**](https://sslip.io) – a wildcard DNS service that resolves anything like `app.x.x.x.x.sslip.io` to IP `x.x.x.x`. It is perfect for testing and demos.

!!! Note
	In a production environment, update your DNS records to point your domain to the **Bastion IP address**.

![chart](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Exposing%20Applications/Expose_App_with_Domian_and_HTTPS/05_app+cert.webp)
/// caption
How it works
///

---

## **Lab Excercise:**

### **1\. Deploy a Kubernetes Cluster**

* Use Taikun CloudWorks to deploy a new Kubernetes Cluster.
* **OR** use existing cluster.

### **2\. Deploy Cert Manager**

* Use the **Taikun Managed Catalog App** and find cert-manager.
* Enable `crds.enabled`

![cert-manager](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Exposing%20Applications/Expose_App_with_Domian_and_HTTPS/cert-manager.webp)
/// caption
cert-manager
///


### **3\. Create a self signed Cluster Issuer**

* The ClusterIssuer resource tells Cert Manager how to obtain certificates. 
* For this example, we’ll use a simple self-signed ClusterIssuer for [**sslip.io**](https://sslip.io/). Here’s where you’d use Let’s Encrypt with DNS or HTTP validation (likely via Automated Certificate Management Environment - [**ACME**](https://cert-manager.io/docs/configuration/acme/#creating-a-basic-acme-issuer)) for real domains.

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: selfsigned-issuer
spec:
  selfSigned: {}
```

!!! Tip
	Apply the yaml file same like in [first guide](http://213.134.21.37/CloudWorks/Exposing_Applications/01_Exposing_apps_to_other_apps_inside_of_a_kubernetes_cluster/#lab-excercise) 


### **4\. Deploy WordPress Application**

* Use the **Taikun Managed Catalog App** to deploy the WordPress application. Don't forget to enable **Extra Values** in common settings.
* Make sure to **enable Taikun Ingress** in the app parameters.
* This will automatically create an Ingress resource to expose the application to the internet.

![wp parameters](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Exposing%20Applications/Expose_App_with_Domian_and_HTTPS/wordpress_parameters.webp)
/// caption
Parameters for WordPress
///

* In the **extra parameter** section of the WordPress Deployment form, add the following annotation to instruct Cert Manager to issue a certificate:

```yaml
ingress:
  annotations:
    cert-manager.io/cluster-issuer: "selfsigned-issuer"
```

* This tells Cert Manager to use the self-signed ClusterIssuer for issuing the TLS certificate.

![wp extra values](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Exposing%20Applications/Expose_App_with_Domian_and_HTTPS/wp_extra_values.webp)
/// caption
Extra Values for WordPress
///

### **5\. Verify HTTPS and Domain Access**

* Once the application is deployed, Cert Manager will generate a self-signed TLS certificate.
* The WordPress application will be accessible via the domain with HTTPS.
* Verify that the site loads correctly and the connection is secured with a valid (self-signed) certificate.

![https wp](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Exposing%20Applications/Expose_App_with_Domian_and_HTTPS/https_wp.webp)
/// caption
HTTPS WordPress
///
