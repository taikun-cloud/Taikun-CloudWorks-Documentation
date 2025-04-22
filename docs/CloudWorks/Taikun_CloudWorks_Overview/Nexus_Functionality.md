# **Nexus Functionality**

## **High Availability and Resilient Deployment Options**

We recognize that Sonatype Nexus Repository is often mission-critical for your business. Be ready for the unexpected by using a [high availability (HA) or resilient deployment option](https://help.sonatype.com/en/resiliency-and-high-availability.html) that can protect your business and your data in the event of disaster or outages. With comprehensive [backup and restoration tasks](https://help.sonatype.com/en/backup-and-restore.html) and a growing list of deployment architecture examples and guidance, Nexus Repository Pro can help you reduce your Recovery Time Objectives and Recovery Point Objectives.

---

## **External PostgreSQL Database Option**

Sonatype Nexus Repository Pro allows you to use an external PostgreSQL database. By externalizing your database, you can take advantage of a number of benefits:

* Performance and scalability improvements

* Leverage the benefits of managed, fault-tolerant cloud databases (e.g., AWS Aurora, RDS, and Azure)

* Improved compatibility with container orchestration (e.g., Kubernetes and OpenShift)

* Full availability for writes during backups

* Fault-tolerant cloud deployments with multi-Availability Zone cloud deployment models

* Simpler and easier disaster recovery procedures

---

## **SAML Authentication and Single Sign-On**

Sonatype Nexus Repository Pro integrates with SAML Identity Providers to allow identity, authentication, and authorization to be managed centrally. Using SAML, Sonatype Nexus Repository acts as a service provider which receives users’ authentication and authorization information from external Identity Providers. Administrators can manage users and roles in one place, and users can sign in with Single Sign-On credentials.

---

## **User Token Support**

When using Apache Maven with Sonatype Nexus Repository Pro, the user credentials for accessing the repository manager have to be stored in the user’s `settings.xml` file. Like a `pom.xml` your `settings.xml` is file that contains your user preferences. The Maven framework has the ability to encrypt passwords within the `settings.xml`, but the need for it to be reversible in order to be used limits its security.

Other build systems use similar approaches and can benefit from the usage of user tokens as well. Sonatype Nexus Repository Pro’s user token feature establishes a two-part token for the user. Usage of the token acts as a substitute method for authentication that would normally require passing your username and password in plain text.

This is especially useful for scenarios where single sign-on solutions like LDAP are used for authentication against the repository manager and other systems and the plain text username and password cannot be stored in the `settings.xml` following security policies. In this scenario the generated user tokens can be used instead.

---

## **Content Replication**

Teams today rarely work from a single location, so why should artifacts be stuck in one? [Content replication](https://help.sonatype.com/en/content-replication.html) allows you to make artifacts readily available across distributed teams. With content replication, you can manage what binaries are copied from one instance and pre-emptively pulled via HTTP to other instances. Here’s how it works:

1. New assets are published to the Sonatype Nexus Repository source instance

2. The replication task runs on the target instance on a schedule (each minute) to identify new assets

3. The replication task issues proxy requests for each new asset to replicate them to the target instance

4. Users on the target instance now have access to newly added artifacts on the target instance

---

## **Staging and Build Promotion**

In modern software development, it is imperative to thoroughly test software before it is deployed to a production system or externally accessible repository. Mostly commonly a release candidate will first be deployed to a staging system which is a close copy of the production system so it can undergo a series of rigorous tests before a decision is made to promote it to production or return it to development.

The staging functionality in Sonatype Nexus Repository Pro supports promotion of software components matching your organization’s software development life cycle phases by moving those components between repositories. This allows the creation of isolated release candidates that can be discarded or promoted to make it possible to support the decisions that go into certifying a release.

![16355975.png](https://help.sonatype.com/en/image/uuid-215b839a-15ea-ef18-01c6-32e06154c964.png)
/// caption 
Typical Staging Workflow
///

---

## **Tagging**

Tagging provides the ability to mark a set of components with a tag so they can be logically associated to each other. The usage of the tags is up to you but the most common scenarios would be a CI build ID for a project (e.g. project-abc-build-142) or a higher level release train when you are coordinating multiple projects together as a single unit (e.g. release-train-13). Tagging is used extensively by the [Staging](https://help.sonatype.com/en/staging.html) feature.

---

## **Import/Export**

Import/Export provides the capability to copy components between repositories or Sonatype Nexus Repository instances.

Some common use cases to utilize Import/Export include:

1. Gradual migration of content from Nexus Repository 2

2. Consolidation of Sonatype Nexus Repository 3 instances

3. Transfer components between disconnected Sonatype Nexus Repository instances

These tasks keep track of the last run results and if run again, they will skip files that were processed previously. These tasks work with HA-C setup.

A temporary file system location is needed for these tasks to export to and import from. Please also ensure the Sonatype Nexus Repository instance running the task has sufficient disk space for export and blob storage for import before running this task to avoid disk full issues.

---

## **Group Blob Stores**

A group blob store combines multiple blob stores together so that they act as a single blob store for repositories. Members of the group can be added or removed. Fill Policies are selectable algorithms that determine to which group member a blob is written. These features significantly increase the flexibility customers have in using and upgrading their storage. More information can be found in the [Storage Guide](https://help.sonatype.com/en/storage-guide.html).

---

## **Deployment to Group Repositories**

Group deployment allows developers and CI servers to use a single URL, the URL of a group repository, to both push and pull content.

Without this feature developers have to use two URLs; one for pushing content, one for pulling content. For some formats, these URLs can’t be saved to configuration and have to be manually entered.

When a group repository is being configured an administrator will be able to select a hosted repository that the group can delegate push requests to. When content is pushed the group repository will automatically route that content to the delegated hosted repository.

### Docker

Docker format has several important advantages related to the Group Deployment Feature.

1. **Reduced ports** – Docker uses ports rather than the repository URL. This means that each repository, that needs to be accessible from the Docker client, must open up at least one port (2 ports if HTTP and HTTPS are used).

2. **Reduced storage** – Docker images are made up of multiple layers. Some of those layers will be from public remotes and some will be internally created. When an image is pushed to a repository the Docker client checks to see which layers are already stored and skips those. Before group deployment developers would push to a hosted repository and the Docker client would not find the public layers and would push those as well. With group deployment that will no longer happen and only proprietary layers will be pushed.

3. **Simplified client configuration** – Docker doesn’t provide a way to specify different endpoints for pushing and pulling content. A developer or someone creating a CI build would have to remember them. Also because Docker relies on ports it is hard to remember which port relates to which repository and these need to be looked up.

4. **Simplified reverse proxy configuration** – Most Docker users have a reverse proxy between the client and the server. Reducing the number of repositories that need to be accessible makes this setup easier to maintain.

---

## **Repository Health Check (RHC)**

Sonatype Nexus Repository users can now automatically identify open source security risks at the earliest stages of their DevOps pipeline. Specifically, the [RHC feature](https://help.sonatype.com/en/repository-health-check.html) empowers software development teams into important capabilities:

* Prioritizes the list of vulnerable components by severity and impact, detailing how many times each component was downloaded from the repository manager by developers in the past 30 days.

* Provides actionable guidance on which components housed in the repository manager should be upgraded or replaced.

---

## **Change Repository Blob Store**

Change repository blob store is a task that allows changing the blob store of a given repository. It moves the blobs from the chosen repository to a different blob store.

Some common use cases to utilize the Change Repository Blob Store task:

1. A blob store reaching maximum capacity. You could use this task to move repository content freeing up space for other repositories in the original blob store.

2. Decommissioning of a blob store.

---

## **Azure Blob Store**

The Azure Blob Store allows assets to be stored in an Azure Storage Account container. Sonatype Nexus Repository Pro can take advantage of the storage features that Azure provides such as replication, configurable performance profiles, and access control when running from within the Azure cloud.

---

## **Atlassian Crowd Support**

Atlassian Crowd is a single sign-on and identity management product that many organizations use to consolidate user accounts and control which users and groups have access to which applications. Atlassian Crowd support is a feature preinstalled and ready to configure in Sonatype Nexus Repository Pro. Sonatype Nexus Repository contains a security realm that allows you to configure the repository manager to authenticate against an Atlassian Crowd instance.
