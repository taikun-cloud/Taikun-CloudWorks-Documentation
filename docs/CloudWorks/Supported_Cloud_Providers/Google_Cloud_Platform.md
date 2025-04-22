# **Google Cloud Platform**

Google Cloud Platform (GCP) is a suite of cloud computing services provided by Google. It offers a wide array of tools and services that enable individuals and businesses to build, deploy, and manage applications, data storage, and various computing resources in the cloud.

**[Learn more about Google Cloud Platform](https://cloud.google.com)**

---

## **Requirements for Google Cloud Platform**

!!! Tip "Requirements for Google Cloud PLatform"
	To successfully establish a connection between your Taikun and GCP accounts:

	* Ensure that you have created a Service account in GCP
	* Add a new principal for a Billing account

---

## **Create a Service account in GCP**

1\. Go to [console.cloud.google.com](https://console.cloud.google.com/)

2\. Select your project from the folder

![Project Folder](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/cloud-credentials/project_folder.webp)
/// caption 
Project Folder
///

3\. Select *IAM & Admin* from the hamburger menu

![IAM & Admin](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/cloud-credentials/IAM.webp)
/// caption
IAM & Admin
///

4\. Switch to the *Service Accounts* tab

![Service Accounts](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/cloud-credentials/service_accounts.webp)
/// caption 
Service Accounts
///

5\. Add a new Service Account and specify the necessary parameters in the **Google** section:

   * As you add the service account name, it will automatically generate a service account ID, which you can copy for further steps
   * In the Service account description, you need to describe what this service account will do (optional)
   * Click *Create* and continue
   * Region **–** choose a suitable region
   * Grant this service account access to the project so that it has permission to complete specific actions on the resources in your project (optional)
   * Grant access to users or groups that need to perform actions within this *Service Account* (optional)
   * Add the ID in the selected project IAM—add—the principal ID that we created in the service account with the owner or editor role

6\. Click on KEYS and ADD KEY:

   * You need to create a new key in a .json format for a new Service Account. If you have any existing key, you can add it, but the Principal ID should be the same in the .json file as the service ID

7\. Select the project's folder and click on IAM from the hamburger menu

![Google Cloud Platform – IAM](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/cloud-credentials/hamburger_menu.webp)
/// caption
GCP - IAM
///

8\. Click on add to roles for service account: in the new principal, you have to add the ID that you created in the service account

![IAM - Roles](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/cloud-credentials/new_principal.webp)
/// caption
IAM - Roles
///

!!! Note
	You can find ID in the downloaded .json file.

---

## **Billing Account**

1\. Select your project and select *Billing* from the hamburger menu

![Billing account](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/cloud-credentials/billing.webp)
/// caption 
Billing Account
///

2\. Click on *Manage* button located next to the *Billing account* section

![Manage Billing account](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/cloud-credentials/billing_account.webp)
/// caption 
Manage Billing Account
///

3\. Hit the *Add Principal* button

![Add principal](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/cloud-credentials/add_principal.webp)
/// caption 
Add Principal 
///

4\. Add your Service account ID with the *Billing Account User* role

![Add principal to the service account](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/cloud-credentials/principal_role.webp)
/// caption 
Add Principal to the service account
///

---

## **Project Configuration**

Taikun added support for importing existing Google projects when creating a Google Cloud credential. The procedure is the following:

1\. Enable billing on the project
2\. Enable the following APIs on the project:

```bash
cloudresourcemanager.googleapis.com
iam.googleapis.com
logging.googleapis.com
cloudbilling.googleapis.com
compute.googleapis.com
serviceusage.googleapis.com
```

---

## **Requirements for Google Cloud Connection**

For a normal Google Cloud connection in Taikun, you need:

1\. Billing user permission

2\. IAM for folder:

   * Folder Admin

   * Project Creator

3\. Service Account's project must have:

   * API enabled (same as listed above)

   * Billing enabled

---

## **Adding GCP connection to Taikun**

To add your GCP credentials in Taikun:

1\. Switch to the *Cloud credentials* in the left-hand navigation panel

2\. Hit the *Add Cloud Credentials* button in the top-right corner

3\. Specify the necessary parameters in the *Google* section:

   * *Cloud Name* – choose a name for your Cloud Credentials (3-30 characters, e.g. cloud-test)

   * *Import Project* – Configure your GCE account without folder ID and billing account details

   * *Folder ID and Config file* – find credentials in your GCE account (under **My Security Credentials**)

   * *Region* – Choose a suitable region

   * *Zone Cont* – choose availability for the region

   * *Billing Account* – Here you will see the billings account which is configured with your project and user

![GCP](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/cloud%20providers/GCP.webp)
/// caption 
GCP Cloud Credentials
///

![add](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/cloud%20providers/google.2.webp)
///caption 
Add Cloud Credentials
///

