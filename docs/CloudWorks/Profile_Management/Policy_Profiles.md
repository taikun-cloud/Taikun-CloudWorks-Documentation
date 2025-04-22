# **Policy Profiles**
:fontawesome-solid-user-tie: Manager | :fontawesome-regular-handshake: Partner

*Policy Profile* uses [**OPA**](https://www.openpolicyagent.org/) (Open Policy Agent) to centralize operations, security, and compliance.

When accessing the page, you can see an overview of all created profiles with selected rules and associated Projects.

*Policy Profiles* allow administrators to define specific configurations and security policies that are automatically enforced across their cloud infrastructure. When you set up Policy Profiles, these policies are immediately applied to all relevant resources without requiring manual intervention.

For instance, if your policy profile includes a rule to block certain actions, such as enabling NodePort services on instances, this rule will be enforced automatically. As a result, any attempt to enable NodePort will be automatically blocked by the policy, and this action will be logged in the system events for auditing and compliance purposes. This ensures that your cloud environment adheres to the defined security and operational standards consistently.

Below is an overview of the types of actions that can be blocked by Policy Profiles:

- **Unauthorized Network Access**: Restricts access from specific IP addresses or ranges, protecting resources from potential malicious attacks and unauthorized access attempts.
- **Resource Quota Exceeding**: Prevents the creation of resources that exceed predefined quotas, such as limits on virtual machines, storage, or memory, helping manage resource allocation efficiently and prevents overconsumption that could lead to additional costs.
- **Unapproved Software Installations**: Blocks the installation of software packages that are not pre-approved. Ensures that only vetted software is used, maintaining security and compliance.
- **Configuration Changes**: Prevents unauthorized modifications to system configurations and maintains system stability, preventing inadvertent or malicious changes that could impact operations.
- **Access to Sensitive Data**: Restricts access to databases or storage buckets containing sensitive information, protecting sensitive data from unauthorized access and potential breaches.
- **Port and Protocol Restrictions**: Blocks the use of specific network ports or protocols, enhancing network security by eliminating the use of insecure or unnecessary ports and protocols.
- **Security Group Modifications**: Prevents unauthorized changes to security groups, ensuring that security group rules remain consistent and secure, controlling the flow of traffic appropriately.
- **Public IP Attachments**: Blocks the attachment of public IP addresses to instances without proper authorization and reduces the risk of exposing instances to the public internet, enhancing overall security.
- **Service Account Restriction**: Limits the permissions and capabilities of service accounts, preventing misuse of service accounts and limiting the potential damage from compromised accounts.
- **Auto-scaling Constraints**: Enforces rules on auto-scaling groups to prevent excessive scaling, controlling costs and maintaining system stability by preventing over-scaling.

![Policy Profiles](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/navigating-taikun/Profiles/policy_profile.webp)
/// caption 
Policy Profiles
///

---

## **Add Policy Profile**

When adding a new Policy Profile, specify the following parameters:

- **Name**: Choose a name for the profile.

**Features**: 

  - **Forbid NodePort**: By choosing to forbid NodePort, you’re making sure that this method isn’t used to expose Services. This can be helpful for keeping things secure or ensuring specific networking rules are followed in your Kubernetes setup.
  - **Forbid HTTP ingresses**: Activating this feature will require all Ingress resources to be HTTPS only, meaning that incoming traffic must be secured using HTTPS protocol, and HTTP traffic will not be allowed. This enhances security by ensuring communications are encrypted.
  - **Require Probe**: Readiness probes ensure that a pod is ready to serve traffic, and liveness probes check if a pod is running as expected and can restart it automatically. Enforcing this policy ensures that pods have crucial probes set up for better reliability and resilience.
  - **Unique Ingress**: Ensures that no two rules within the same Ingress resource have the same host specified. This helps prevent conflicts and ensures clear routing of external traffic to the correct services.
  - **Force Pod Resource**: Mandates that all Kubernetes Pods explicitly specify resource limits and requests for CPU and memory, ensuring predictable performance and resource allocation across the cluster.

**Add**: 

  - **Allowed Repositories**: If a policy profile specifies a list of approved repositories, only container images from these repositories will be permitted.
  - **Forbid Specific Tags**: Forbids specific tags, ensuring that container images with any of the listed tags are not allowed within the Kubernetes cluster.
  - **Ingress Whitelist**: Only specific Ingress resources listed in the whitelist are allowed within the cluster. Any Ingress resources not listed will be restricted or denied.

![Add new Policy Profile](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/profile-management/policy%20profile/add_policy_profile.webp)
/// caption
Add new Policy Profile
///

![Actions](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/profile-management/policy%20profile/policy.profiles.1.webp)
/// caption
Actions
///

---

## **Add Profile to a Project**

You can add the Profile during Project creation by checking “Add Policy Profile” from the drop-down selection.

![Add Policy Profile](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/profile-management/policy%20profile/policy.profiles.2.webp)
/// caption 
Add Policy Profile
///

Enforce Policies after the Project is created. You can disable it in the same way.

![Add Policy Profile in settings](https://rgw.cloudpoint.tcpro.cz/swift/v1/KEY_0efe203c42c0402f9402a570302dc066/new-docs/profile-management/policy%20profile/policy.profiles.4.webp)
/// caption 
Add Policy Profile in settings
///

!!! Warning
	Please keep in mind that namespaces Monitoring, Velero, and Kube-system violate these policies.
