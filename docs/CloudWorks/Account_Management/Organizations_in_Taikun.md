# **Organizations in Taikun**
**:fontawesome-regular-handshake: Partner**

Organizations in Taikun allow users to be grouped and share information. This feature helps businesses or groups collaborate and share resources within the platform.

- Users are assigned to organizations, and each organization can include multiple users.
- Information and resources are visible only within the assigned organization, ensuring data separation and security.
- **Partners** can manage multiple teams or businesses efficiently by grouping users into organizations.
- Organizations are managed by **Partners**, with a **Manager-owner** responsible for daily operations, Credentials, and Projects.

---

## **Create an Organization**
**:fontawesome-regular-handshake: Partner**

Follow these steps to create an organization:

1. Navigate to the **Organizations** menu in Taikun.
2. Click the **Add Organization** button in the top-right corner.
3. Fill in the mandatory fields (Name, Full Name, Discount Rate) and press **+Add**.

![Create an Organization](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/account-management/add_org.webp)
/// caption
Create an Organization
///

!!! Tip 
	Check the “Allow subscription to be changed by managers” box during the creation process to let customers change their Taikun subscription.

After creating an organization, you can invite new or existing users directly from the **Users** section.

---

## **Delete an Organization**

Follow these steps to delete an organization from your Taikun account:

1. Open the **Organizations** section in the left-hand navigation panel.
2. Find the organization you want to delete and click the **Delete Organization** button.
3. Confirm your action.

!!! Warning 
	Only **empty** organizations can be deleted.
 
 ---

## Automating Cloud Integration: OpenStack to Taikun Made Easy

[**GitHub Repository**](https://github.com/skotnicky/tools?tab=readme-ov-file)

Managing infrastructure across multiple platforms often means juggling credentials, user setups, and configuration files.
This script — `ott.sh` — simplifies that process by automating the connection between your OpenStack environment and Taikun Cloud.

With one command, it creates projects, users, sets quotas, and generates cloud credentials — all driven from a single configuration file.
Perfect for platform engineers, DevOps teams, and anyone looking to speed up cloud onboarding.

---

##  What the Script Does

The script automates the following operations:

1.  **Loads OpenStack and Taikun credentials** from a single configuration file (e.g., `ott.conf`).
2.  **Creates or verifies an OpenStack project and user**.
    - If the user already exists, the script forces a password reset.
3.  **Applies quota settings to the OpenStack project** (values can be specified in `ott.conf`, or defaults are used).
4.  **Creates an application credential for the user**, impersonating them for security.
5.  **Optionally creates a new Taikun organization**, if specified.
6.  **Creates a Taikun cloud credential** referencing the generated OpenStack application credential.

This setup allows you to manage **all credentials and quotas from a single environment file**, eliminating the need to manually source Keystone RC files or juggle multiple config files.

---

##  Prerequisites

!!! Tip "Prerequisites"
	To use this script, make sure you have the following tools installed and configured:

	-  **OpenStack CLI** (`openstack`) must be installed and functional.
	-  **Taikun CLI** (`taikun`) must be installed and accessible.
	-  A **configuration file** (e.g., `ott.conf`) that contains Taikun Credentials and OpenStack Credentials.

### Taikun Credentials

```bash
export TAIKUN_AUTH_MODE="token"
export TAIKUN_ACCESS_KEY="your-access-key"
export TAIKUN_SECRET_KEY="your-secret-key"
export TAIKUN_API_HOST="https://api.taikun.cloud"
```

### OpenStack Credentials

```bash
export OS_USERNAME="admin"
export OS_PASSWORD="admin-secret"
export OS_PROJECT_NAME="admin"
export OS_USER_DOMAIN_NAME="Default"
export OS_PROJECT_DOMAIN_NAME="Default"
export OS_AUTH_URL="https://openstack.example.com:5000/v3"
export OS_REGION_NAME="RegionOne"
```

### (Optional) Quotas

If Quotas aren't set, script uses defaults.

```bash
export QUOTA_CORES="200"
export QUOTA_RAM="1024000"
export QUOTA_INSTANCES="80"
export QUOTA_SERVER_GROUPS="1000"
export QUOTA_SERVER_GROUP_MEMBERS="1000"
export QUOTA_VOLUMES="300"
export QUOTA_SNAPSHOTS="300"
export QUOTA_GIGABYTES="20000"
export QUOTA_NETWORKS="150"
export QUOTA_SUBNETS="150"
export QUOTA_PORTS="600"
export QUOTA_ROUTERS="25"
export QUOTA_FLOATING_IPS="25"
export QUOTA_SECGROUPS="120"
export QUOTA_SECGROUP_RULES="1200"
```

---

## How to run the script 

1. Edit or create your `ott.conf` file with the required credentials.
2. Run the script using the following syntax: 

```bash
./ott.sh \
  --config-file ott.conf \
  -p my-project \
  -u my-user \
  -a my-app-cred \
  -n my-taikun-cred \
  --org-name myorg \
  --org-full-name "My Org FullName" \
  --org-email "myorg@example.com"

```

### Argument Overview

| Option              | Description                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| `--config-file`     | Path to the `.conf` file with credentials                                   |
| `-p <PROJECT_NAME>` | Name of the OpenStack project to create or verify                           |
| `-u <USER_NAME>`    | Name of the OpenStack user to create or verify                              |
| `-a <APP_CRED_NAME>`| Name of the application credential for the user                             |
| `-n <TAIKUN_CRED>`  | Name of the Taikun cloud credential to be created                           |
| `--org-name`        | _(Optional)_ Short name of the organization to create in Taikun             |
| `--org-full-name`   | _(Optional)_ Full name of the organization                                  |
| `--org-email`       | _(Optional)_ Contact email for the organization                             |
| `--org-id`          | _(Optional)_ Existing organization ID in Taikun (used instead of creating)  |

!!! Note
	If both `--org-id` and `--org-name` are provided, the newly created org will override the one specified by ID.
