# **Shared Filesystems Overview (manila)**

## What is Manila?

Manila is the OpenStack Shared Filesystems service for providing Shared Filesystems as a service. Some of the goals of Manila are to be/have:

* **Component based architecture**: Quickly add new behaviors

* **Highly available**: Scale to very serious workloads

* **Fault-Tolerant**: Isolated processes avoid cascading failures

* **Recoverable**: Failures should be easy to diagnose, debug, and rectify

* **Open Standards**: Be a reference implementation for a community-driven api

---

## **For end users**

As an end user of Manila, you’ll use Manila to create a remote file system with either tools or the API directly: [python-manilaclient](https://docs.openstack.org/python-manilaclient/latest/), or by directly using the [REST API](https://docs.openstack.org/api-ref/shared-file-system/).

### Tools for using Manila

* [User](https://docs.openstack.org/manila/zed/user/index.html)

### Using the Manila API

All features of Manila are exposed via a REST API that can be used to build more complicated logic or automation with Manila. This can be consumed directly or via various SDKs. The following resources can help you get started consuming the API directly:

* [Manila API](https://docs.openstack.org/api-ref/shared-file-system/)

* [Manila microversion history](https://docs.openstack.org/manila/zed/contributor/api_microversion_history.html)

---

## **For operators**

This section has details for deploying and maintaining Manila services.

### Installing Manila

Manila can be configured standalone using the configuration setting `auth_strategy = noauth`, but in most cases you will want to at least have the [Keystone](https://docs.openstack.org/keystone/latest/install/) Identity service and other [OpenStack services](https://docs.openstack.org/latest/install/) installed.

* [Installation Tutorial](https://docs.openstack.org/manila/zed/install/index.html)

### Administrating Manila

* [Admin Guide](https://docs.openstack.org/manila/zed/admin/index.html)

### Reference

* [Configuration](https://docs.openstack.org/manila/zed/configuration/index.html)

* [Command Line Interface](https://docs.openstack.org/manila/zed/cli/index.html)
