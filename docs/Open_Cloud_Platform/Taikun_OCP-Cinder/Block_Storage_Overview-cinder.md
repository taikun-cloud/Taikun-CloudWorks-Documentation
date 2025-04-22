# **Block Storage Overview (cinder)**

Cinder is the OpenStack Block Storage service for providing volumes to Nova virtual machines, Ironic bare metal hosts, containers and more. Some of the goals of Cinder are to be/have:

* **Component based architecture**: Quickly add new behaviors

* **Highly available**: Scale to very serious workloads

* **Fault-Tolerant**: Isolated processes avoid cascading failures

* **Recoverable**: Failures should be easy to diagnose, debug, and rectify

* **Open Standards**: Be a reference implementation for a community-driven api

---

## **For end users**

As an end user of Cinder, you’ll use Cinder to create and manage volumes using the Horizon user interface, command line tools such as the [python-cinderclient](https://docs.openstack.org/python-cinderclient/latest/), or by directly using the [REST API](https://docs.openstack.org/api-ref/block-storage/).

### Tools for using Cinder

* [Horizon](https://docs.openstack.org/horizon/latest/user/manage-volumes.html): The official web UI for the OpenStack Project.

* [OpenStack Client](https://docs.openstack.org/python-openstackclient/latest/): The official CLI for OpenStack Projects. You should use this as your CLI for most things, it includes not just nova commands but also commands for most of the projects in OpenStack.

* [Cinder Client](https://docs.openstack.org/python-cinderclient/latest/user/shell.html): The **openstack** CLI is recommended, but there are some advanced features and administrative commands that are not yet available there. For CLI access to these commands, the **cinder** CLI can be used instead.

### Using the Cinder API

All features of Cinder are exposed via a REST API that can be used to build more complicated logic or automation with Cinder. This can be consumed directly or via various SDKs. The following resources can help you get started consuming the API directly.

* [Cinder API](https://docs.openstack.org/api-ref/block-storage/)

* [Cinder microversion history](https://docs.openstack.org/cinder/zed/contributor/api_microversion_history.html)

---

## **For operators**

This section has details for deploying and maintaining Cinder services.

### Installing Cinder

Cinder can be configured standalone using the configuration setting `auth_strategy = noauth`, but in most cases you will want to at least have the [Keystone](https://docs.openstack.org/keystone/latest/install/) Identity service and other [OpenStack services](https://docs.openstack.org/latest/install/) installed.

* [Installation Guide](https://docs.openstack.org/cinder/zed/install/index.html)

### Administrating Cinder

* [Cinder Administration](https://docs.openstack.org/cinder/zed/admin/index.html)
