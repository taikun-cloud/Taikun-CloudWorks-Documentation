# Exposing Applications

You will learn how to **expose your applications running in Kubernetes clusters** to users, internal teams, and services outside your cluster in a secure and scalable way. We will guide you from fundamental DNS concepts through LoadBalancer usage, and then dive into Taikun’s Ingress Controller and advanced tools to simplify and automate your exposure workflows.

Whether you need to expose a test dashboard internally or production workloads with HTTPS and automated certificate renewal, these articles will provide clear, actionable instructions aligned with **best practices in Taikun-managed Kubernetes environments**.

---

## Ways to install apps

### [01. Kubernetes DNS - basics](http://213.134.21.37/CloudWorks/Exposing_Applications/01_Kubernetes_DNS-Basics/)

* Learn how DNS works in Kubernetes and how services are resolved internally and externally. 
* How DNS resolution works inside Kubernetes, including CoreDNS functionality.
* How Kubernetes assigns cluster-internal DNS names to Pods and Services.

### [02. LoadBalancer](http://213.134.21.37/CloudWorks/Exposing_Applications/02_LoadBalancer/)

* Understand LoadBalancer service types in Kubernetes, how they function, and when to use them to expose your workloads.
* Best practices for using LoadBalancers to expose test or production applications directly.

### [03. Taikun Ingress - basics](http://213.134.21.37/CloudWorks/Exposing_Applications/03_Taikun_Ingress-Basics/)

* Introduction to Taikun’s Ingress Controller for exposing HTTP/HTTPS applications, including supported annotations and architecture overview.
* Best practices for designing ingress rules to expose your applications in a structured and maintainable way.

### [04. Taikun Ingress - Managed Apps](http://213.134.21.37/CloudWorks/Exposing_Applications/04_Taikun_Ingress-Managed_Apps/)

* Guide for exposing applications installed via Taikun’s Managed Apps with Ingress, simplifying the exposure of applications like monitoring dashboards or CI/CD tools.
* Pre-configured Ingress rules that Taikun provides for supported Managed Apps.
* If you use Taikun Managed Apps, this guide simplifies their exposure workflows without requiring deep Kubernetes Ingress configuration knowledge.

### [05. Taikun Ingress - CertManager](http://213.134.21.37/CloudWorks/Exposing_Applications/05_Taikun_Ingress-CertManager/)

* Learn how to use CertManager with Taikun Ingress to automate TLS certificate provisioning and management for your exposed applications.
* Best practices for using CertManager in production environments to ensure continuous HTTPS availability without manual certificate management.

### [06. Taikun Link](http://213.134.21.37/CloudWorks/Exposing_Applications/06_Taikun_link/)

* Introduction to Taikun Link, providing an easy way to expose your applications securely without managing DNS or certificates manually.
* How Taikun Link provisions a dedicated hostname with HTTPS automatically for your services.
* Steps to activate Taikun Link for your workloads.
* Example scenarios to demonstrate how quickly you can make an application available to external users using Taikun Link.
