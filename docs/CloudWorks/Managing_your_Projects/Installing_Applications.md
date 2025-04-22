# **Installing Applications**
:fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

In Taikun, you can find more than 200 public and private repositories, which you can import with the Helm Repo URL.

---

## **Public Repositories**

Public repositories provide access to a wide range of pre-built applications and software packages. You can enable or disable public repositories based on your organization’s needs.

![Public Repositories](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/applications/repo1.webp)
/// caption 
Public Repositories
///

---

## **Private Repositories**

Taikun supports the addition of private repositories, allowing users to upload and manage their own custom applications and software packages. Additionally, Taikun offers support for OCI (Open Container Initiative) images, ensuring compatibility and flexibility in managing containerized applications.

![Private Repositories](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/applications/private_repo.webp)
/// caption
Private Repositories
///

---

## **How to Install an Application in a Cluster**

### Enable Required Repositories for Your Application

![Enable Repository](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/applications/repo3.webp)
/// caption 
Enable Repository
///

### Create a Catalog for Adding Applications and Binding Projects

![Create Catalog](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/applications/catalog1.webp)
/// caption 
Create Catalog
///

Catalogs are curated collections of applications and software packages available for deployment within Taikun. To create a catalog, navigate to the **Catalogs** section in the Taikun dashboard and follow the prompts to define the catalog name, description, and any relevant metadata.

![Catalogs](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/applications/catalog2.webp)
/// caption
Catalogs
///

- When creating a catalog in Taikun, provide a clear description of the catalog and the applications it contains.
- Only applications whose repositories have been enabled will be visible.
- To ensure a successful installation, it is recommended only to bind Projects that are healthy and in a ready state.
- Parameter configurations can easily be located by browsing or searching applications within Taikun.
- When installing an application, it is possible to specify a version or use the latest version automatically.
- If the parameters are set to be both editable when installing and after installation, it is mandatory to configure them before proceeding with the installation.

### Install the Application in the Cluster

![Application in the Cluster](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/applications/app1.webp)
/// caption 
Application in the Cluster
///

- In the **Instance name**, only alphanumeric characters are allowed.
- Multiple projects can be bound to any catalog. When installing, a list of bonded projects will be visible.
- A **Custom Namespace** can be input.
- If autosync is enabled, applications will automatically sync whenever any updates are made.
- Selected parameters can be added/removed while installing applications. Only parameters that are set as "Editable when installing" can have their values changed during installation.
- Extra values can be added to the application during installation.

![Add Application](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/applications/app2.webp)
/// caption
Add Application
///

---

## **Taikun Link**

Exposing an application with Taikun Link in a project allows seamless access via a unique URL, like `<myapp.app.taikun.link.>` When Taikun Link is enabled, a DNS record is automatically created in Cloudflare. The Taikun Link parameters are a special type of parameter that becomes immutable once enabled, providing consistent configuration. For instance, if the `isTaikunLink` flag is set, the parameter becomes non-editable and non-deletable. This feature improves accessibility and security, as the application’s Taikun Link URL is conveniently displayed once created. Like the NGINX application, each has its own set of extra values to support Taikun Links.

Example of NGINX application extra values:

```
ingress:
  annotations:
    nginx.ingress.kubernetes.io/auth-tls-pass-certificate-to-upstream: "true"
    nginx.ingress.kubernetes.io/auth-tls-secret: default/cloudflare-tls-secret
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

!!! Tip 
	For Nginx application you should use this exact template, of extra values, without any change of variables

![Taikun Link](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/applications/taikun_link.webp)
/// caption
Enable Taikun Link
///

![Set Extra Values](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/applications/link_extra_values.webp)
/// caption 
Set Extra Values
///

---

## **After Installing the Application**

After installing the application, users can find the status of the application in:
**Catalogs** ➡ **Select User Catalog** ➡ **Select Installed Application** ➡ **Bound Projects**

![Add Application](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/applications/app3.webp)
/// caption
Added Application in catalog
///

- Inside the application, basic details, parameters, and default values can be found.
- Parameters can be edited, and applications can be synced again.
- Different versions of applications can be selected, but users can only select the latest version, not an older one.
- A catalog can only be deleted if it is empty and has no applications or projects attached. If a project is bound to it or an application has been added, it cannot be deleted.

---

## **Find All Installed Applications**

- In the **Applications** section, you can find a list of all installed applications with information such as **Namespace**, **Catalog Name**, and **Bound Projects**.
- You can directly uninstall any of the installed applications from this section.
