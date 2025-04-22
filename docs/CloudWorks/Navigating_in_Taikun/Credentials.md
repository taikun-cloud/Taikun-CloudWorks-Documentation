# **Credentials**
:fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

Credentials tab is a central management panel for all tools you can connect with Taikun. Whenever you want to connect your Cloud provider, Backup Storage, or Showback tool, the Credentials section is right for you!

---

## **Supported Cloud credentials**

The Cloud Credentials tab is where you can manage connected Cloud providers. This includes adding, modifying, or deleting connections of your Cloud services that include:

!!! Warning
	Only a Partner can add Proxmox and Tanzu.

- Amazon Web Services (AWS)
- Microsoft Azure
- Google Cloud Platform (GCP)
- OpenStack
- Tanzu
- Proxmox
- Openshift
- VMware vSphere
- Zededa
- Zadara

![Cloud credentials](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/getting-started/taikun.infra/cloud_cred.webp)
/// caption
Cloud Credentials
///

Each Cloud provider has different parameters that will be reflected in the created Table. Tables can be sorted differently depending on the available data, and you can also expand columns to see a detailed overview.

---

## **Backup credentials**

Taikun’s [**Backup system**](https://docs.taikun.cloud/CloudWorks/Managing_your_Projects/Backup/) will allow you to back up your Project data to any S3-compatible storage offered on the market. The Backup Credentials tab is where you can connect your Backup storage to ensure that the data stays safe.

Up here, you will find a tabs with parameters of connected storage that involve:

- ID: Unique identifier of the storage
- Organization: Name of the organization associated with the storage
- S3 Access Key ID: Access key for S3
- S3 Endpoint: URL of the S3 endpoint
- S3 Name: Name of the storage
- Associated Projects: Projects linked to this storage
- Actions: Possible actions, such as edit or delete

![Backup credentials](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/getting-started/taikun.infra/backup_cred.webp)
/// caption
Backup Credentials
///

---

## **Billing credentials**

These credentials are required to ensure timely payments for cloud resources like computing power, storage, and networking. Cloud providers also use them to generate invoices and manage subscription plans.

To add billing credentials, users need to provide the following details in the “Add Credentials” dialog:

- Organization: Select your organization
- Name: Specify a name for your credentials (e.g., “billing”)
- Username: Enter the billing service username (e.g., “user”)
- Password: Enter the service password
- URL: Provide the service URL (e.g., https://prometheus.####.###).

This information is required to configure and authenticate billing for cloud services.

![Billing credentials](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/navigating-taikun/credentials-tab/billingcreds.webp)
/// caption 
Billing Credentials
///

!!! Note
	Only Partners have access to the Billing credentials section.

---

## **Showback credentials**

If you want to use an external source for your [**Showback rules**](https://docs.taikun.cloud/CloudWorks/Monitoring_your_Projects/Showback_rules/), add Showback Credentials to this menu. The table will display all added credentials along with additional parameters.

![Showback credentials](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/navigating-taikun/credentials-tab/showbackcredentials.webp)
/// caption
Showback Credentials
///

!!! Note
	Partners can filter any available Credentials menu by an Organization.

---

## **AI credentials**

These credentials are used to verify the identity of users and give them the appropriate permissions to authenticate and interact with AI resources through API Key (Application Programming Interfaces).

![AI credentials](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/navigating-taikun/credentials-tab/aicredentials.webp)
/// caption
AI credentials
///
