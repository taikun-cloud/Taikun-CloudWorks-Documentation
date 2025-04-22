# **Backup**
:fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

## **Create New Credentials**

![Add Credentials](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/backup%20credentials/backup.credentials.1.webp)
/// caption 
Add Backup Credentials
///

---

## **S3 Name**
The name for backup credentials (3-30 characters).

Fill in the remaining S3 data from Amazon and add new backup credentials. See [AWS endpoints](https://docs.aws.amazon.com/general/latest/gr/s3.html).

**Invalid S3 credentials** error can pop up if you fill in wrong/non-existent credentials.

After you add the credentials, you can back up the project by enabling Backup and adding a Backup Policy.

---

## **Backup Credentials List**

Use the search field to find the credentials needed.

### Every Credential has its

- **ID** – Unique identifier of the storage.
- **Organization** – Name of the organization associated with the storage.
- **S3 Access Key ID** – Access key for S3.
- **S3 Endpoint** – URL of the S3 endpoint.
- **S3 Name** – Name of the storage.
- **Associated Projects** – Projects linked to this storage.
- **Actions** – Possible actions, such as edit or delete.

![Backup Credentials](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/getting-started/taikun.infra/backup_cred.webp)
/// caption 
Backup Credentials 
///

- **ID** and **Organization** are immutable.
- **S3 Name**, **S3 Access Key**, **S3 Endpoint**, and **S3 Region** are security credentials.
- **Associated Projects** lists all projects using these backup credentials.
- **Created By**, **Last Modified**, and **Last Modified By** informs you who made the Credentials and who made the last change.
- Expanding the table shows the available **actions**.

---

## **Actions**

**Set As Default:**
Choose credentials that will be pre-filled during project creation. A lighter color indicates selected credentials.

**Lock or Unlock Credential:**
Locking the credentials disables them for Backup. Unlock to enable them again.

**Update Credential:**
Update **S3 Name**, **S3 Access Key**, and **S3 Secret Key**.

**Delete Credential:**
You can delete only **empty and unlocked** Backup Credentials.

---

## **Enable/Disable Backup in Projects**

You can enable backup during project creation.

![Enable Backup](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/backup%20credentials/backup.credentials.2.webp)
/// caption 
Enable Backup
///

Backup can also be enabled after the project is created.

First, you need to enable backup and then choose credentials.

![Enable Backup in Settings](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/backup%20credentials/backup.credentials.3.webp)
/// caption
Enable backup in Settings
///

---

## **Backup Policy**

After enabling backup, you must set up a backup policy.

![Add Backup Policy](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/managing-your-projects/backup%20credentials/backup_policy.webp)
/// caption 
Add Backup Policy 
///

!!! Note
	Once the policy is added, the cron job starts.

!!! Info
	 To terminate the backup, delete the policy. If you no longer want to use backup, disable it.

