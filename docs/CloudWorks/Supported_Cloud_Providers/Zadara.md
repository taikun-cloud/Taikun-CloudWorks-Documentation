# **Zadara**
:fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

Zadara’s storage infrastructure is built for high availability and reliability, offering a wide range of storage options, including block, file, and object storage, as well as specialized solutions for specific use cases such as high-performance computing (HPC) and big data analytics.

---

## **Requirements for Zadara**

!!! Tip "Requirements for Zadara"

	To successfully establish a connection between your Taikun and Zadara accounts:

	The most important information you need to find:

	* Zadara API URL
	* Access Key ID
	* Secret Access Key
---

## **Connecting Zadara to Taikun CloudWorks**

1\. Switch to the *Cloud credentials* in Taikun.

2\. Hit the *Add Cloud Credentials* button in the top-right corner.

3\. Select the *Zadara* option.

4\. Specify the parameters:

   - **Cloud Name:** Choose a name with 3-30 alphanumeric characters.
   - **Zadara API URL:** The endpoint URL for accessing Zadara’s API. The API allows you to programmatically interact with and manage your Zadara storage resources, such as provisioning volumes, monitoring performance, and configuring settings.
   - **Zadara Key ID:** Used for authentication and authorization purposes when accessing Zadara services through the API.
   - **Secret Access Key:** Confidential credential used along with the Zadara Key ID for authentication when making API requests. It should be kept secure.
   - **Region:** Specifies the location where your Zadara storage resources are provisioned.
   - **Zadara Zone Count:** Determines the level of resilience and redundancy for storage. Increasing the zone count enhances data protection, while reducing it may optimize cost.
   - **Zadara Volume Type:** Selects the appropriate volume type to match performance, cost, and feature requirements.
   - **Continent:** Provides additional context about the physical location of your data.

!!! Note
	To guarantee optimal performance and compatibility with Zadara’s storage solutions, ensure that compute resources are running on version **23.08.2 or higher**.

For configuration and management of VPC peering, it can be easily set up through the Zadara Graphical User Interface (GUI). Use [Zadara official documentation](https://vpsa-api.zadarastorage.com/) for more information.

---

## **Machine Image**

A zCompute machine image named with the prefix **"taikun"** (e.g., "taikun-server") can be created from the Zadara marketplace or directly from the following image:

**URL:** [Ubuntu Jammy 22.04 Image](https://rgw.cloudpoint.tcpro.cz/taikun-cloud-files/images/ubuntu-jammy-22.04.qcow2)

For more details, check the [Zadara machine image documentation](https://guides.zadarastorage.com/cs-compute-guide/latest/machine-images.html).

### Adding a Zadara Cloud Credential

![Add Zadara Cloud Credentials](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/zadara.1.webp)
/// caption 
Add Zadara Cloud Credentials
///

### User Permissions in Zadara

When creating a new user account in Zadara, select a permission level that defines access rights and privileges:

#### 1. IAMFullAccess:
   - Provides full access to the Identity and Access Management (IAM) capabilities within Zadara.
   - Users can manage user accounts, groups, roles, and permissions within Zadara.
   - Suitable for administrators managing user access across the organization.

#### 2. MemberFullAccess:
   - Provides full access to Zadara storage resources but not IAM capabilities.
   - Users can create, modify, and delete storage resources (volumes, snapshots, file shares).
   - Does not allow managing user accounts, groups, roles, or permissions.

**Adding a Member with Full Access:**

![Add Member with Full Access](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/cloud%20providers/zadaranew.webp)
/// caption 
Add Member with Full Access 
///

For further information on getting started with Zadara zCompute, check this [blog post](https://www.zadara.com/blog/2024/05/13/establishing-your-vpc-project-on-zadaras-zcompute-platform/).
