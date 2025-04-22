---
hide:
 - toc
---

# **Public Load Balancer on Zadara**

When deploying applications on [**Zadara Cloud**](https://docs.taikun.cloud/CloudWorks/Supported_Cloud_Providers/Zadara/) through **Taikun**, it is important to configure your service to be accessible online, particularly for public-facing applications. For platforms like AWS, this is typically done with the following annotation:

``` .yaml
annotations:
  service.beta.kubernetes.io/aws-load-balancer-scheme: internet-facing
```

By configuring your Kubernetes service with the correct annotations and settings, Zadara will allocate a public-facing IP address to your service, making it accessible over the internet. It’s important to consult Zadara Cloud and Taikun documentation to ensure you’re using the correct setup for your load balancer and external IP assignment.

Additionally, ensure your service is secured by setting up appropriate firewall rules, security groups, and network policies to control access to your application. This configuration ensures your application is safely exposed to the internet while maintaining the security standards for external traffic.
