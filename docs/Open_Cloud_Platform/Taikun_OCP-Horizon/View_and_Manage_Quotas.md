# **View and Manage Quotas**

To prevent system capacities from being exhausted without notification, you can set up quotas. Quotas are operational limits. For example, the number of gigabytes allowed for each project can be controlled so that cloud resources are optimized. Quotas can be enforced at both the project and the project-user level.

Typically, you change quotas when a project needs more than ten volumes or 1 TB on a compute node.

Using the Dashboard, you can view default Compute and Block Storage quotas for new projects, as well as update quotas for existing projects.

??? Note
	Using the command-line interface, you can manage quotas for [the OpenStack Compute service](https://docs.openstack.org/nova/latest/admin/quotas.html), [the OpenStack Block Storage service](https://docs.openstack.org/cinder/latest/cli/cli-set-quotas.html), and the OpenStack Networking service (For CLI details, see [OpenStackClient CLI reference](https://docs.openstack.org/python-openstackclient/latest/cli/command-objects/quota.html)). Additionally, you can update Compute service quotas for project users.

The following table describes the Compute and Block Storage service quotas:

### Quota Descriptions

| Quota Name               | Defines the number of                                   | Service         |
|--------------------------|--------------------------------------------------------|-----------------|
| Gigabytes                | Volume gigabytes allowed for each project.             | Block Storage   |
| Instances                | Instances allowed for each project.                    | Compute         |
| Injected Files           | Injected files allowed for each project.               | Compute         |
| Injected File Content Bytes | Content bytes allowed for each injected file.        | Compute         |
| Keypairs                 | Number of keypairs.                                    | Compute         |
| Metadata Items           | Metadata items allowed for each instance.              | Compute         |
| RAM (MB)                 | RAM megabytes allowed for each instance.               | Compute         |
| Security Groups          | Security groups allowed for each project.              | Compute         |
| Security Group Rules     | Security group rules allowed for each project.         | Compute         |
| Snapshots                | Volume snapshots allowed for each project.             | Block Storage   |
| VCPUs                    | Instance cores allowed for each project.               | Compute         |
| Volumes                  | Volumes allowed for each project.                      | Block Storage   |

---

## **View default project quotas**

1. Log in to the dashboard and select the admin project from the drop-down list.

2. On the Admin tab, open the System tab and click the Defaults category.

3. The default quota values are displayed.

!!! Note
	You can sort the table by clicking on either the Quota Name or Limit column headers.

---

## **Update project quotas**

1. Log in to the dashboard and select the admin project from the drop-down list.

2. On the Admin tab, open the System tab and click the Defaults category.

3. Click the Update Defaults button.

4. In the Update Default Quotas window, you can edit the default quota values.

5. Click the Update Defaults button.

!!! Note
	The dashboard does not show all possible project quotas. To view and update the quotas for a service, use its command-line client. See [OpenStack Administrator Guide](https://docs.openstack.org/admin-guide/cli-set-quotas.html).
