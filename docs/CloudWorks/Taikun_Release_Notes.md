## **March 2025**

### **New Features**

#### **LiveOps**

- **LiveOps Dynamic Environment**: This feature transforms the static “Kubernetes Information” module into an interactive experience, enabling users to perform real-time operations, such as scaling, creating, and updating Kubernetes resources, directly from the UI.

- **Custom Resources & Helm Releases**: LiveOps now supports Custom Resource Definitions (CRDs) and Helm Releases, in addition to standard Kubernetes resources. Users can view these resources in list, grid, or tree layouts for enhanced navigation and management

- **Create Kubernetes Resources**: Users can now create new Kubernetes resources directly from the LiveOps interface, streamlining deployment workflows.

- **Real-Time Feedback**: Receive immediate status updates, live logs, and notifications to quickly identify and resolve issues.

#### **Taikun Link – Automatic Application URL Generation**

- **Seamless Access to Deployed Applications**: Taikun Link automatically generates a URL for easy access when a user installs an application.

- **Configurable Per Application**: Users can enable or disable Taikun Link during installation, providing flexibility based on security and access requirements.

- **Instant URL Availability**: The generated URL becomes immediately available in the UI upon successful application deployment.

- **Simplified Application Management**: Taikun Link automates ingress rule and DNS setting configuration, without manual intervention.

#### **Project Import of Managed Clusters**

- **Cloud Provider Integration**: Seamlessly import managed Kubernetes clusters from AWS EKS, Azure AKS, and Google GKE using secure cloud credentials.

- **Flexible Modes**: Choose between fully managed (full operational control) and read-only modes, simplifying cluster monitoring for compliance or audits.

- **Centralized Dashboard**: Manage and monitor all imported clusters from a unified view, with real-time health metrics and performance indicators.

#### **KubeVAP 1.31 Support**

Integrated KubeVAP 1.31 support ensures compatibility with the latest Kubernetes validation and policy features, enabling more effective cluster configuration validation and management.

---

### **Updates**

#### **Improvements**

- **Updated UI Pages for Projects**: Enhanced project pages provide clearer navigation and improved resource management, enabling easy access to project-specific details.

- **User Interface Enhancements**: The UI has been redesigned for a modern, intuitive experience, reducing context switching and streamlining operations.

- **Performance Optimizations**: Enhanced caching and load balancing improve responsiveness, even in large-scale environments.

- **Security Updates**: Strengthened Role-Based Access Control (RBAC) and audit logging for tighter security and compliance.

#### **Bug Fixes**

- **Resolved Display Issues**: Fixed UI glitches affecting resource list and dashboard displays.

- **Improved API Reliability**: Addressed intermittent cloud provider API connectivity issues during cluster import.

- **Stability Enhancements**: Implemented various fixes to improve overall platform stability and reliability.

- **Alert System Bugfixes**: Prometheus Alerts:Resolved issues preventing certain alerts from triggering.

- **K8sGPT Notifications**: Fixed bugs in the K8sGPT notification system for timely and accurate alerting.

- **Autoscaler Alerts**: Addressed problems with autoscaler alert integration to provide reliable and consistent scaling notifications.

#### **Known Issues**

- **Custom Resource Sync Delays**: Users may experience delays in real-time custom resource update synchronization. A patch is in development.

- **Import Wizard Timeout**: The import wizard may timeout when connecting to certain cloud regions in rare cases. Workarounds and fixes are under review.

- **UI Responsiveness on Large Clusters**: Performance may slightly degrade when managing extremely large clusters. We are actively working on further optimization.

#### **Documentation Updates**

- **Redesigned Documentation Portal**: Our documentation portal has been redesigned for improved navigation and clarity.

- **New Page about Taikun Support**: Find comprehensive support resources and contact details on our newly added Taikun Support page.

- **New Page about CloudWorks Multi-Tenant**: Learn about multi-tenant architecture, best practices, and configuration options on the new CloudWorks Multi-Tenant page.

- **Updated Page with Microsoft Azure Cloud**: Our Azure Cloud integration page has been updated with the latest guidance and troubleshooting tips.

- **Updated UI Pages for Projects**: Detailed documentation now covers the updated project pages in the UI, including new navigation and management features.

---

## **December 2024**

### **New Features**

#### **Import External Kubernetes Clusters**

We’re excited to announce the import cluster feature for CloudWorks, enabling users to import existing external Kubernetes (Generic K8s) clusters into Taikun CloudWorks using a simple kubeconfig file. This feature supports three different import management options, which can be used for different operational needs. **Important Note: external clusters are imported as projects inside CloudWorks**

1. **Read-Only Cluster Import**

    - **Overview**: Import external Kubernetes clusters into Taikun CloudWorks for monitoring and visibility without making any changes.
    - **Use Case**: Observe workloads, track resource usage, and access performance metrics securely and non-intrusively.

2. **Host Cluster Only Import**

    - **Overview**: Import Kubernetes clusters as a host cluster (cloud credential) within Taikun CloudWorks which does not allow users to change its configuration.

    - **Use Case**: Import an external Kubernetes cluster running on bare metal servers. This bare metal cluster or cluster(s) act as the host for users to deploy virtual clusters inside and applications inside the virtual clusters. .

    - **Key Limitation**: In this mode, you can only create vClusters inside the imported cluster. Virtual clusters are lightweight fully featured K8’s clusters that enable host cluster multi-tenancy and application and user isolation while sharing the installed Kubernetes services of the host cluster.

3. **Fully Managed Cluster Import**

    - **Overview**: Import external Kubernetes clusters into Taikun CloudWorks and provide the ability to deploy additional management services like observability and application backup inside the cluster.
    - **Use Case**: Enable users self service access to Kubernetes services like, monitoring, application backup, AI troubleshooting assistant, and policy profiles in addition to being able to deploy applications and virtual clusters.

???+ Note
	
	- The Import Cluster feature currently only supports generic Kubernetes clusters.
	- The import cluster feature is Kubernetes distribution agnostic and has been tested with K8s, K3s, RKE2, K0s & Exoscale Kubernetes 
	- CloudWorks uses the Kubernetes API to perform operations in imported clusters. For any cluster you want to import it must have a publicly reachable API endpoint.

#### **Proxmox Provider: Storage Local path Support**

We’re thrilled to introduce local storage support for Proxmox providers in Taikun CloudWorks.

- **Overview**: This feature allows users to utilize local storage paths as a storage backend for projects deployed on Proxmox infrastructure.

- **Use Case**: Simplify and enhance storage management by enabling local storage options, reducing reliance on external storage solutions.

- **Benefits**:
    - Cost-efficient by leveraging local disks.
    - Improved performance for storage-heavy workloads.
    - Seamless integration with existing Taikun CloudWorks storage management features.

#### **Policy Profiles Enhancements**

1. **Forbid nodeName in Virtual Clusters (VC)**

    - **Overview**: This new policy restricts using the nodeName property within virtual clusters.
    - **Use Case**: This prevents workloads from being scheduled directly to specific nodes, ensuring more balanced and automated scheduling.

2. **Enforce Master Taint**

    - **Overview**: Enforce a policy that ensures workload pods cannot get scheduled to master nodes.
    - **Use Case**: Maintains master node integrity. This policy prevents pods from virtual clusters to intentionally schedule on master nodes (as a part of an attack vector).

---

### **Updates**

#### **Billing Rules and Billing Credentials**

We’ve enhanced the design and functionality of billing-related features to provide more intuitive and efficient management:

1. **Improved Billing Rules Configuration**

    - Redesigned interface for creating and managing billing rules, ensuring greater clarity and ease of use.
    - Enhanced flexibility in defining rules, with advanced options for customizing usage-based billing scenarios.

2. **Enhanced Billing Credentials Management**

    - Simplified workflows for adding and updating billing credentials, with real-time validation for accuracy.
    - Added detailed audit trails for billing credentials to improve tracking and compliance.

3. **Performance Upgrades**

    - Optimized billing rule processing for faster calculations and report generation, even for complex configurations.

#### **Streamlined Import Process UX**

- Added step-by-step wizards for each import mode, with real-time validation and progress indicators.
- Improved tooltips and help documentation integrated into the UI for easier navigation.

#### **Bux Fixes**

- **Project Expiration Fixes**: Resolved issues where project expiration settings were not applied or displayed correctly.
- **Cluster Dashboard Fixes**: We addressed discrepancies in the cluster dashboard, ensuring an accurate representation of cluster health, workloads, and metrics.
- **Cloud Credential Sync**: Resolved inconsistencies in creating credentials from imported projects.
- **API Connectivity Issues**: Fixed rare cases of API connection timeouts during cluster imports.
- **Billing Rule Assignment**: Addressed an issue where certain billing rules were not applying correctly to associated projects.
- **UI Glitches**: Minor interface adjustments are needed to improve navigation and user experience.
- **Taikun CloudWorks terminal**: Improved error reporting in case pod does not contain the shell. Improved pod cleanup. New tools are preinstalled. Alpha support for resizing.

#### **Known Issues**

- **Advanced Metrics for Imported Clusters**: Certain metrics for Read-Only imports may not be available immediately. Future updates will extend full support.

#### **Documentation Updates**

Learn more about the latest features and improvements:

- Step-by-Step Guide: Import Kubernetes Clusters
- Updated Billing Rules and Credentials Management
- New Policy Profiles: Best Practices

---

## **September 2024**

### **New Features**

#### **vCluster Integration**

We are excited to announce the support for vClusters in Taikun CloudWorks! This new feature allows users to create and manage virtual Kubernetes clusters (vClusters) nested inside their physical host clusters. With vClusters, you can:

- **Isolate Workloads**: Virtual clusters are fully functional Kubernetes clusters nested inside a physical host cluster, providing better isolation and flexibility to support multi-tenancy. Multiple teams can operate independently within the same physical infrastructure while minimizing conflicts, maximizing autonomy, and reducing costs.

- **Efficient Resource Utilization**: Virtual clusters run inside host cluster namespaces but function as separate Kubernetes clusters with their own API server, control plane, syncer, and resources. Virtual clusters share the physical resources of the host cluster (such as CPU, memory, and storage) while independently managing their resources, ensuring efficient utilization and scaling.

- **Seamless Integration**: Virtual clusters interact with the host cluster for resource scheduling and networking but maintain a level of abstraction to ensure that operations within a virtual cluster do not directly affect the host cluster’s global state.

#### **Longhorn Storage Type Support for Proxmox Cloud Provider**

Introducing Longhorn as a storage option in Taikun CloudWorks for the Proxmox cloud provider:

- **High Availability Storage**: Longhorn provides highly available, lightweight, and reliable distributed block storage for Kubernetes, designed to run on Proxmox. It offers easy-to-manage, persistent storage with built-in redundancy and automatic recovery.

- **Effortless Integration**: Longhorn integrates seamlessly with Proxmox, allowing users to manage their storage needs directly within Taikun CloudWorks. The Longhorn option in the Kubernetes profile ensures data remains secure and accessible, even during hardware failures.

- **Scalability**: Longhorn’s distributed architecture ensures that storage scales with infrastructure, providing flexibility as data requirements grow.

#### **Zededa Cloud Services Support through Taikun CloudWorks**

We are pleased to introduce support for Zededa cloud services directly through Taikun CloudWorks, enhancing our platform’s edge computing capabilities:

- **Edge Orchestration**: Seamlessly manage and orchestrate edge devices and applications via Zededa cloud services through the Taikun CloudWorks interface. This integration provides enhanced visibility, control, and security for edge deployments.

- **Zero-Trust Security**: Leverage Zededa’s zero-trust security architecture through Taikun CloudWorks to ensure secure boot processes, protect edge devices from threats, and maintain the integrity of your edge infrastructure.

- **Remote Management**: Enable remote monitoring, updating, and troubleshooting of edge devices directly from Taikun CloudWorks, reducing the need for on-site interventions and ensuring continuous operation of edge environments.

- **Scalable Edge Deployments**: Easily scale edge infrastructure to accommodate growing operational demands, with the flexibility to manage both small-scale and large-scale deployments efficiently through Taikun CloudWorks.

#### **Exposing an Application Through the Bastion Load Balancer**

You can now expose applications deployed to a cluster externally through the bastion, which acts as a load balancer. To configure this:

- Set the service type to NodePort in your application settings.
- Enable ingress and specify taikun as the ingress class name.
- For standard clusters, use a hostname in the format name.<access-ip>.nip.io, where name is user-defined and <access-ip> is the application’s access IP.
- For vClusters, use the specific vCluster hostname directly, without appending nip.io.

This feature simplifies access to your applications via URLs, ensuring easy external availability through proper configuration.

---

### **Updates**

#### **Enhanced UI/UX**

- Updated the interface to accommodate the new vCluster management options, ensuring a seamless user experience.

- All UI form controls in drawers have been updated for better usability and consistency.

- Improved navigation and accessibility for managing both main clusters and vClusters.

- New Informative Messaging: Advanced UI messaging has been added, providing detailed information regarding Kubernetes infrastructure warnings and errors. This enhancement ensures users are promptly informed of any issues, with clear, actionable insights to facilitate quick resolution.

#### **Performance Enhancements**

- Optimized platform performance to handle the additional vCluster operations, ensuring smooth and efficient functionality.

#### **Better Management of Disks for VM Instances**

- Enhanced disk management capabilities for VM instances, allowing for easier allocation, resizing, and monitoring of disk resources within Taikun CloudWorks. This update simplifies the process of scaling storage for virtual machines.

#### **Backup and Restore Improvements**

- Improved the backup and restore processes, providing more reliable and faster operations. These enhancements ensure that data recovery is efficient and accurate, giving users greater confidence in their disaster recovery and business continuity plans.

#### **Bug Fixes**

- **Fixed**: Resolved an issue where certain configurations were not correctly applied to newly created clusters.
- **Fixed**: Addressed various minor bugs to improve overall platform stability and reliability.

#### **Known Issues**

- **Cluster Overlap**: Users may experience some overlap in resource limits between main clusters and vClusters. We recommend closely monitoring resource allocations and adjusting as needed.

- **vCluster Deletion**: Deleting a vCluster may take longer than expected. We are working on optimizing this process in future releases.

#### **Documentation**

- Comprehensive documentation on using and managing vClusters within Taikun CloudWorks is available in our User Guide.

- Detailed technical information and best practices can be found in our Developer Documentation.

---

## **April 2024**

### **New Features**

- **Zadara Cloud support**: We’re excited to announce that Taikun CloudWorks is now natively integrated with [Zadara Enterprise Edge Cloud](https://www.zadara.com/about/). Connect your Zadara account directly within Taikun CloudWorks for seamless deployment and management of your Kubernetes clusters and Virtual Machines. 

- **OCI repositories import**: We have introduced the ability to import OCI repositories directly into Taikun Cloudworks.

- **Import of Private Repositories**: Users of Taikun CloudWorks can now connect password-protected repositories within Taikun CloudWorks to streamline application deployment processes.

- **Update of the Applications tab**: Our team has refreshed the look of the Applications section to make installing applications easier.

---

### **Updates**

- Taikun team developed additional instruments to improve security during applications’ installation

- Improvements in the look and feel of Taikun CloudWorks UI to make infrastructure management more user-friendly and more responsive

- Optimized processes of removal of infrastructure on the side of connected Cloud during purging of Projects 

![update](https://b3662572.smushcdn.com/3662572/wp-content/uploads/2024/05/april2023.png?lossy=2&strip=1&webp=1)

---

## **January 2024**

### **New Features**

- **VMware vSphere Support**: Users can now connect Taikun CloudWorks directly to their vSphere infrastructure to deploy and manage Kubernetes clusters and Virtual Machines.

- **WASM Support**: We’re excited to announce that Taikun CloudWorks supports WebAssembly (WASM) containers! This cutting-edge technology brings unparalleled cross-platform compatibility, near-native performance, and robust security features. With WASM, enjoy the freedom of using various programming languages and benefit from its small footprint for efficient, high-speed applications!

- **Updated User Interface**: Taikun CloudWorks has been redesigned to align with the look and feel of our taikun.cloud website. Enjoy a seamless and cohesive user experience across our platform and website!

- **NVIDIA GPU Acceleration**: Taikun CloudWorks now features NVIDIA GPU Acceleration, unlocking powerful computing capabilities for enhanced performance. 

- **VM Images**: The team has completely revamped the VM image management system in Taikun CloudWorks. Now, you can manage images directly within the individual projects section of the menu. 

- **Enforce Pod Resource Limits**: In the policy profile menu, activating this feature will now mandate specifying resource limits for all pods in their manifest files

---

### **Updates**

- Our team has enhanced the user interface with new visual effects, making your experience working with infrastructure more enjoyable and visually appealing.

---

## **October 2023**

### **New Features**

- **Taikun Infra**: Spin up your cluster immediately after registering in Taikun. New users will automatically receive a set of Cloud credentials to instantly provision new Kubernetes clusters and VMs. These resources are available for the entire trial period for free.

- **Openshift Support**: Support added for the Red Hat Openshift platform. Users can now connect their Red Hat OpenShift environments and manage OpenShift  infrastructure directly in Taikun.

- **Graphic Processing Unit Support**: We’ve added support for GPUs in Taikun Projects. Customers of Taikun can now build Kubernetes clusters on GPU enabled instances.

---

### **Updates**

- Changes in the Action dropdown menu 

- Improvements to the account deletion process

- Proxmox storage EBS support and validations

- Update of OpenStack Cloud credentials functionality

- Demo mode updates

---

## **August 2023**

### **New Features**

- **AI Assistant**: use an AI-powered assistant to solve any issues within your infrastructure straight in Taikun. Utilize a Taikun-hosted model or connect your Open AI account to solve Kubernetes issues more efficiently.

- **Kubeconfig Console**: there’s no need to download and use the Kubeconfig file to access your cluster – users can open Kubeconfig’s terminal directly in Taikun UI to get the quickest access to their Kubernetes clusters.

---

### **Updates**

- New outlook of Project Settings: button has been transferred to the top of a Project page with additional changes to the look of the menu 

- Changes in the design of loading menus 

- Improvements in the system of role management 

- Managers can view and edit Tanzu and Proxmox credentials

---

## **June 2023**

### **New Features**

- **Added support for VMware Tanzu**: you can now add credentials for your VMware Tanzu account and utilize Taikun in combination with this powerful platform.
- **Added support for Proxmox**: leverage the power of Proxmox, one of the open-source server virtualization platforms, directly inside Taikun!
- **Cloud credential zones**: users can specify their zones of choice during server creation.
- **Extended trial**: anyone can register to test Taikun, and from now on, we give 30 days to test all benefits of our solution.

---

### **Updates**

- Check out the new design of our documentation at https://taikun.cloud/docs/home/

- It is now possible to assign new users to already existing Projects.

- Updated look and feel of the K8S terminals in Taikun Projects.

- New changes brought to the action bar and alert management system within the UI.

- Changes in support – activate our HelpCenter to get the full list of assistance services available.

- Minor technical upgrades of demo mode.

---

## **March 2023**

### **New Features**

- **New registration web user interface**: we have simplified the registration process to make Taikun easily accessible for our users. With just one-minute sign-up, you can start your Cloud journey hassle-free and enjoy all the benefits Taikun offers.

- **New subscription web user interface**: with an emphasis on increased security, we have released a new secure internal user interface for selecting a Taikun subscription and managing your billing and payments.

---

### **Updates**

- We have rebranded our company to Taikun.cloud a.s.

- Several updates in the “Demo” mode of Takun to ensure a smooth demo experience.

- You can now select an Organization during the creation of Tickets.

- Updated use-case information messages.

- Interactive Docs link now available in all sections of the navigation panel.

---

## **February 2023**

### **New Features**

- **Import Private Repository**: import any private repo containing your applications

- **Demo Mode**: leverage the Demo mode of Taikun to see how it can manage Cloud resources

- **Addition to Application parameters**: change parameters of Applications when installing or editing them

---

### **Updates**

- Several updates of Autoscaler to the logic of editing parameters

- Introduced updates to improve the security and stability of the Keycloak login mechanism 

- Improved validation mechanism when inputting data to Taikun

- Updated version of the documentation

---

## **December 2022**

### **New Features**

- **Autoscaling**: Automaticaly scale up and down your cluster based on load. Works great with Taikun Apps

- **New user interface**: Updated redesigned user interface for a unique user-friendly experience and ease of all your Taikun operations

- **Cloud costs**: Monitor your infrastructure costs in real time for your current project on an advanced section designed specifically for your cloud costs

- **Multi availability zones**: Support for multi availability zone project on AWS, Azure and Google cloud credentials.

---

### **Updates**

- Create admin cloud credentials in OpenStack and automatically use these admin cloud credentials when creating an organization to create a project in Openstack

- Documentation about Google Cloud Credentials and Application part in Taikun

- New company website under www.taikun.cloud

---

## **May 2022**

### **New Features**

Spot Virtual Machines for AWS and Azure

Taikun now supports by-request VMs known as Spot Instances, in which you can take advantage of unused capacity from cloud providers deploying virtual servers with a significantly lower-price than regular VMs.

Read more about Spot VMs on [AWS](https://aws.amazon.com/ec2/spot/) and [Azure](https://azure.microsoft.com/en-us/products/virtual-machines/spot/#features).

These options are available for:

Add Project Page

+ Enable Spot

    - Allow Spot VM’s

        * Allow Full Spot Kubernetes
        * Allow Spot Workers

If **“Allow Spot VM’s”** is enabled, you can define the Maximum Spot Price.

Servers Page – K8s view

- Enable Spot Worker
- Enable Full Spot
- Disable Full Spot

Servers Page – VMs view

- Enable Spot VMs

---

### **Updates**

Redesign of the Images page

Images are divided to the following three tabs

- Quickstart Images
- My Images
- Public Images

---

## **February 2022**

### **New Features**

#### **Standalone VMs Server Page**

- Here you can see all created VMs for the project.
- You can add VM for a project stored in **any** cloud (OpenStack, AWS and Azure).
- Before you add new VM, keep in mind you have to bind the Image and create Standalone Profile **first**.

#### **Images**

- Bind or unbind images from project.
- You can only bind images from the provider where your project is stored.
- Without bound image you **cannot** add a new VM.

#### **Standalone Profile**

- Create profile for your VM with SSH key, add Security Groups.
- You can define Security Groups – protocols **ICMP**, **TCP** and **UDP** are supported.
- It is **not** possible to add profile to VM later, once the profile is created SSH key **cannot** be edited.
- You **cannot** add a new VM without any standalone profile.

#### **Standalone VMs**

- See the **overview** of all standalone VMs.

---

### **Updates**

#### **Project Page**

- In new column View you can choose if you want to see detailed K8s or VMs page.
