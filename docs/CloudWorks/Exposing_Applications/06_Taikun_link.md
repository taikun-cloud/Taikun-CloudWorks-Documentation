# 06 - Taikun Link

Exposing an application with Taikun Link in a project allows seamless access via a unique URL, like `<myapp.app.taikun.link>`. When Taikun Link is enabled, a DNS record is automatically created in Cloudflare, and a valid **SSL certificate** is automatically issued and configured, ensuring secure HTTPS access without manual intervention. The Taikun Link parameters are a special type of parameter that becomes immutable once enabled, providing consistent configuration. For instance, if the `isTaikunLink` flag is set, the parameter becomes non-editable and non-deletable. This feature improves accessibility and security, as the application’s Taikun Link URL is conveniently displayed once created. Like the NGINX application, each has its own set of extra values to support Taikun Links.

---

## Lab Excersice

### 1\. Create a catalog application with WordPress

* Start by creating a new appliction from the catalog.
* Select WordPress as the application you want to deploy. 

### 2\. Set parameters for Ingress in the Catalog Settings

* Go to the catalog parameters section. Here, configure the Ingress settings such as the hostname or domain you want to use. Make sure to define these values properly so the service can be accessed externally.

### 3\. Deploy the application

* Go to your project and click on "Applications" and "Install".
* Choose your catalog, application and start installing.

![Taikun Link](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Exposing%20Applications/Taikun_link/common_setting_tl.webp)
/// caption
Enable Taikun Link and Extra Values
///

![Set Parameters](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Exposing%20Applications/Taikun_link/parameters_tl.webp)
/// caption 
Set Parameters
///

* Set Extra Values fot NGING applications

Example of NGINX application extra values:

```
ingress:
  annotations:
    nginx.ingress.kubernetes.io/auth-tls-pass-certificate-to-upstream: "true"
    nginx.ingress.kubernetes.io/auth-tls-secret: "{{taikun_link_namespace}}/cloudflare-tls-secret"
    nginx.ingress.kubernetes.io/auth-tls-verify-client: "on"
    nginx.ingress.kubernetes.io/auth-tls-verify-depth: "1"
  enabled: true
  hostname: {{taikun_link_host}}
  ingressClassName: taikun
  extraTls:
  - hosts:
    - "{{taikun_link_host}}"
    secretName: "{{taikun_link_host}}-tls"
  secrets:
  - name: "{{taikun_link_host}}-tls"
    certificate: |
      {{taikun_link_certificate}}
    key: |
      {{taikun_link_key}}
```

Like NGINX, every application that supports Taikun Links has its own set of extra values to configure, enabling smooth integration with Taikun's infrastructure.

!!! Info 
	Here are the variables which are replaced with taikun link:
	
	* `{{taikun_link_namespace}}` : namespace of the app
	* `{{taikun_link_host}}` : url used to expose the app
	* `{{taikun_link_certificate}}` : The certificate part (public key) of the generated TLS certificate for the application’s hostname.
	* `{{taikun_link_key}}` : The private key part of the generated TLS certificate for the application’s hostname

!!! Tip 
	For Nginx application you should use this exact template, of extra values, without any change of variables

![extra values](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Exposing%20Applications/Taikun_link/extra_values-tl.webp)
/// caption
Set Extra Values
///

![install](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Exposing%20Applications/Taikun_link/taikunlink-wp.webp)
/// caption
Wait for Install
///

![browser](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/Exposing%20Applications/Taikun_link/browser-access.webp)
/// caption
Access in browser
///
