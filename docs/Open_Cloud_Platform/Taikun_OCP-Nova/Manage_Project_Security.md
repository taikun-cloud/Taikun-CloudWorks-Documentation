# **Manage Project Security**

Security groups are sets of IP filter rules that are applied to all project instances, which define networking access to the instance. Group rules are project specific; project members can edit the default rules for their group and add new rule sets.

All projects have a `default` security group which is applied to any instance that has no other defined security group. Unless you change the default, this security group denies all incoming traffic and allows only outgoing traffic to your instance.

Security groups (and their quota) are managed by [Neutron, the networking service](https://docs.openstack.org/neutron/zed//admin/archives/adv-features.html#security-groups).

---

## **Working with security groups**

From the command-line you can get a list of security groups for the project, using the **openstack** commands.

### List and view current security groups

1\. Ensure your system variables are set for the user and project for which you are checking security group rules. For example:

```
export OS_USERNAME=demo00
export OS_TENANT_NAME=tenant01
```

2\. Output security groups, as follows:

```
$ openstack security group list
+--------------------------------------+---------+-------------+
| Id                                   | Name    | Description |
+--------------------------------------+---------+-------------+
| 73580272-d8fa-4927-bd55-c85e43bc4877 | default | default     |
| 6777138a-deb7-4f10-8236-6400e7aff5b0 | open    | all ports   |
+--------------------------------------+---------+-------------+
```

3\. View the details of a group, as follows:

```
$ openstack security group rule list GROUPNAME
```

For example:

```
$ openstack security group rule list open
+--------------------------------------+-------------+-----------+-----------------+-----------------------+
| ID                                   | IP Protocol | IP Range  | Port Range      | Remote Security Group |
+--------------------------------------+-------------+-----------+-----------------+-----------------------+
| 353d0611-3f67-4848-8222-a92adbdb5d3a | udp         | 0.0.0.0/0 | 1:65535         | None                  |
| 63536865-e5b6-4df1-bac5-ca6d97d8f54d | tcp         | 0.0.0.0/0 | 1:65535         | None                  |
+--------------------------------------+-------------+-----------+-----------------+-----------------------+
```

These rules are allow type rules as the default is deny. The first column is the IP protocol (one of ICMP, TCP, or UDP). The second and third columns specify the affected port range. The third column specifies the IP range in CIDR format. This example shows the full port range for all protocols allowed from all IPs.

### Create a security group

When adding a new security group, you should pick a descriptive but brief name. This name shows up in brief descriptions of the instances that use it where the longer description field often does not. For example, seeing that an instance is using security group “http” is much easier to understand than “bobs\_group” or “secgrp1”.

1\. Ensure your system variables are set for the user and project for which you are creating security group rules.

2\. Add the new security group, as follows:

```
$ openstack security group create GroupName --description Description
```

For example:

```
$ openstack security group create global_http --description "Allows Web traffic anywhere on the Internet."
+-----------------+--------------------------------------------------------------------------------------------------------------------------+
| Field           | Value                                                                                                                    |
+-----------------+--------------------------------------------------------------------------------------------------------------------------+
| created_at      | 2016-11-03T13:50:53Z                                                                                                     |
| description     | Allows Web traffic anywhere on the Internet.                                                                             |
| headers         |                                                                                                                          |
| id              | c0b92b20-4575-432a-b4a9-eaf2ad53f696                                                                                     |
| name            | global_http                                                                                                              |
| project_id      | 5669caad86a04256994cdf755df4d3c1                                                                                         |
| project_id      | 5669caad86a04256994cdf755df4d3c1                                                                                         |
| revision_number | 1                                                                                                                        |
| rules           | created_at='2016-11-03T13:50:53Z', direction='egress', ethertype='IPv4', id='4d8cec94-e0ee-4c20-9f56-8fb67c21e4df',      |
|                 | project_id='5669caad86a04256994cdf755df4d3c1', revision_number='1', updated_at='2016-11-03T13:50:53Z'                    |
|                 | created_at='2016-11-03T13:50:53Z', direction='egress', ethertype='IPv6', id='31be2ad1-be14-4aef-9492-ecebede2cf12',      |
|                 | project_id='5669caad86a04256994cdf755df4d3c1', revision_number='1', updated_at='2016-11-03T13:50:53Z'                    |
| updated_at      | 2016-11-03T13:50:53Z                                                                                                     |
+-----------------+--------------------------------------------------------------------------------------------------------------------------+
```

3\. Add a new group rule, as follows:

```
$ openstack security group rule create SEC_GROUP_NAME \
    --protocol PROTOCOL --dst-port FROM_PORT:TO_PORT --remote-ip CIDR
```

The arguments are positional, and the `from-port` and `to-port` arguments specify the local port range connections are allowed to access, not the source and destination ports of the connection. For example:

```
$ openstack security group rule create global_http \
    --protocol tcp --dst-port 80:80 --remote-ip 0.0.0.0/0
+-------------------+--------------------------------------+
| Field             | Value                                |
+-------------------+--------------------------------------+
| created_at        | 2016-11-06T14:02:00Z                 |
| description       |                                      |
| direction         | ingress                              |
| ethertype         | IPv4                                 |
| headers           |                                      |
| id                | 2ba06233-d5c8-43eb-93a9-8eaa94bc9eb5 |
| port_range_max    | 80                                   |
| port_range_min    | 80                                   |
| project_id        | 5669caad86a04256994cdf755df4d3c1     |
| project_id        | 5669caad86a04256994cdf755df4d3c1     |
| protocol          | tcp                                  |
| remote_group_id   | None                                 |
| remote_ip_prefix  | 0.0.0.0/0                            |
| revision_number   | 1                                    |
| security_group_id | c0b92b20-4575-432a-b4a9-eaf2ad53f696 |
| updated_at        | 2016-11-06T14:02:00Z                 |
+-------------------+--------------------------------------+
```

You can create complex rule sets by creating additional rules. For example, if you want to pass both HTTP and HTTPS traffic, run:

```
$ openstack security group rule create global_http \
    --protocol tcp --dst-port 443:443 --remote-ip 0.0.0.0/0
+-------------------+--------------------------------------+
| Field             | Value                                |
+-------------------+--------------------------------------+
| created_at        | 2016-11-06T14:09:20Z                 |
| description       |                                      |
| direction         | ingress                              |
| ethertype         | IPv4                                 |
| headers           |                                      |
| id                | 821c3ef6-9b21-426b-be5b-c8a94c2a839c |
| port_range_max    | 443                                  |
| port_range_min    | 443                                  |
| project_id        | 5669caad86a04256994cdf755df4d3c1     |
| project_id        | 5669caad86a04256994cdf755df4d3c1     |
| protocol          | tcp                                  |
| remote_group_id   | None                                 |
| remote_ip_prefix  | 0.0.0.0/0                            |
| revision_number   | 1                                    |
| security_group_id | c0b92b20-4575-432a-b4a9-eaf2ad53f696 |
| updated_at        | 2016-11-06T14:09:20Z                 |
+-------------------+--------------------------------------+
```

Despite only outputting the newly added rule, this operation is additive (both rules are created and enforced).

4\. View all rules for the new security group, as follows:

```
$ openstack security group rule list global_http
+--------------------------------------+-------------+-----------+-----------------+-----------------------+
| ID                                   | IP Protocol | IP Range  | Port Range      | Remote Security Group |
+--------------------------------------+-------------+-----------+-----------------+-----------------------+
| 353d0611-3f67-4848-8222-a92adbdb5d3a | tcp         | 0.0.0.0/0 | 80:80           | None                  |
| 63536865-e5b6-4df1-bac5-ca6d97d8f54d | tcp         | 0.0.0.0/0 | 443:443         | None                  |
+--------------------------------------+-------------+-----------+-----------------+-----------------------+
```

### Delete a security group

1\. Ensure your system variables are set for the user and project for which you are deleting a security group.

2\. Delete the new security group, as follows:

```
$ openstack security group delete GROUPNAME
```

### Create security group rules for a cluster of instances

Source Groups are a special, dynamic way of defining the CIDR of allowed sources. The user specifies a Source Group (Security Group name), and all the user’s other Instances using the specified Source Group are selected dynamically. This alleviates the need for individual rules to allow each new member of the cluster.

1\. Make sure to set the system variables for the user and project for which you are creating a security group rule.

2\. Add a source group, as follows:

```
$ openstack security group rule create cluster \
    --remote-group global_http --protocol tcp --dst-port 22:22
```

The `cluster` rule allows SSH access from any other instance that uses the `global_http` group.
