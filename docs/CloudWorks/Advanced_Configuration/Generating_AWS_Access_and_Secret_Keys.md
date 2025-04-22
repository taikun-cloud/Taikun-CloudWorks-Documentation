# **AWS S3 + Taikun: Kubernetes Backup**

Kubernetes, used for containerized applications, requires backups of pods, nodes, the control plane, and storage for data integrity and resilience. Taikun CloudWorks can back up your Kubernetes cluster to any S3-compatible storage. This guide will show you how to connect to AWS S3. CloudWorks allows you to back up all your Kubernetes cluster resources incrementally through periodically triggered snapshots.

## **Generating AWS Access and Secret Keys**

To back up data in Taikun, users need an **Access Key**, **Secret Key**, **Region**, and **Endpoint**. In AWS, access and secret keys can be generated in two ways:

- **IAM User** – Recommended for users requiring limited access.
- **Security Credentials** – Used for full-access users.

## **Creating Access and Secret Keys via IAM User (Limited Access)**

### **Step 1: Log in to AWS**

- Sign in to your [Amazon Web Services (AWS) account](https://aws.amazon.com/).
- Navigate to **IAM (Identity and Access Management)** under the **Security**, **Identity**, & **Compliance section**.

![AWS IAM](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/advanced%20configuration/Generating%20AWS%20Access%20and%20Secret%20Keys/1-1.webp)
/// caption
AWS IAM
///

---

### **Step 2: Create an IAM User**

- In the **Access Management** section, click on **Users**.
- Click **Create User**.

![Create an IAM User](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/advanced%20configuration/Generating%20AWS%20Access%20and%20Secret%20Keys/1-2.webp)
/// caption
Create an IAM User
///

- Enter the required details on the **Specify user details** page.
- Click **Next** to proceed to **Set Permissions**.

![User Details](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/advanced%20configuration/Generating%20AWS%20Access%20and%20Secret%20Keys/1-3.webp)
/// caption
User Details
///

---

### **Step 3: Set User Permissions**

- To grant access to Amazon S3, a user must attach the **AmazonS3FullAccess** policy. An admin can **add the user to a group** if the group has the required policies or **copy permissions from an existing user**. However, the recommended approach is to **attach policies directly**.

![Set permissions](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/advanced%20configuration/Generating%20AWS%20Access%20and%20Secret%20Keys/1-4.webp)
/// caption
Set User Permissions
///

---

### **Step 4: Review and Create a User**

- Review the **User Details**, **Permissions Summary**, and **Tags** (optional).
- Click **Create User** to finalize the process.

![Review and Create a User](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/advanced%20configuration/Generating%20AWS%20Access%20and%20Secret%20Keys/1-5.webp)
/// caption
Review and Create a User
///

---

### **Step 5: Generate Access and Secret Keys**

- Open the just created User.
- In the **Summary** section, click **Create Access Key** or navigate to **Security Credentials** > **Access Keys**.

![Generate Access and Secret Keys](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/advanced%20configuration/Generating%20AWS%20Access%20and%20Secret%20Keys/1-6.webp)
/// caption
Generate Access and Secret Keys
///

- **Creating an Access Key**
- Select a **Use Case**:
    - **Command Line Interface (CLI)** – For AWS CLI access.
    - **Local Code** – This is for applications running in a local development environment.
    - **Application Running on AWS Compute Services** – For services like EC2, ECS, or Lambda.
    - **Third-Party Service** – This is for external applications needing AWS resource access.
    - **Application Running Outside AWS** – For workloads in an external data center.
    - **Other** – If none of the predefined options apply.

![Access Key](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/advanced%20configuration/Generating%20AWS%20Access%20and%20Secret%20Keys/1-7.webp)
/// caption
Access Key
///

- (Optional) Add a **Description Tag** to describe the access key.
- Download the .csv file containing the credentials, as **it can only be viewed or copied once**.
- Click **Done** to finalize the process.

![Retrieve access keys](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/advanced%20configuration/Generating%20AWS%20Access%20and%20Secret%20Keys/1-8.webp)
/// caption
Retrieve access keys
///

!!! Note
	A maximum of two access keys can be created per IAM user.

---

## **Creating Access and Secret Keys via Security Credentials (Full Access)**

### **Step 1: Log in to AWS**

- Sign in to your [Amazon Web Services (AWS)](https://aws.amazon.com/) account.

---

### **Step 2: Open Security Credentials**

- Click on your account name in the AWS Management Console (top-right corner).
- Select **Security Credentials**.

![Security Credentials](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/advanced%20configuration/Generating%20AWS%20Access%20and%20Secret%20Keys/1-9.webp)
/// caption
Security Credentials
///

---

### **Step 3: Create an Access Key**
- Under the **Access Keys** section, click **Create Access Key**.
- Follow the instructions to generate the key.
- Download and securely store the .csv file containing the credentials.

---

## **Using AWS Credentials for Taikun Backup**

Follow the Taikun backup guide to create and attach backup credentials to a cluster.
When a user enables and schedules a backup, a bucket will be automatically created in the AWS console. 

This bucket can be found under:

- **All Services** > **Storage** > **S3** > **General purpose buckets**
- The bucket name will follow the format:
- **(Autogenerated-characters--name--of--the--K8s--cluster)**

![Amazon S3](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/advanced%20configuration/Generating%20AWS%20Access%20and%20Secret%20Keys/1-10.webp)
/// caption
Amazon S3 Buckets
///
