# **Compute (nova)**

Nova is the OpenStack project that provides a way to provision compute instances (aka virtual servers). Nova supports creating virtual machines, baremetal servers (through the use of ironic), and has limited support for system containers. Nova runs as a set of daemons on top of existing Linux servers to provide that service.

It requires the following additional OpenStack services for basic function:

* [Keystone](https://docs.openstack.org/keystone/zed/): This provides identity and authentication for all OpenStack services.

* [Glance](https://docs.openstack.org/glance/zed/): This provides the compute image repository. All compute instances launch from glance images.

* [Neutron](https://docs.openstack.org/neutron/zed/): This is responsible for provisioning the virtual or physical networks that compute instances connect to on boot.

* [Placement](https://docs.openstack.org/placement/zed/): This is responsible for tracking inventory of resources available in a cloud and assisting in choosing which provider of those resources will be used when creating a virtual machine.

It can also integrate with other services to include: persistent block storage, encrypted disks, and baremetal compute instances.

---

## **For End Users**

As an end user of nova, you’ll use nova to create and manage servers with either tools or the API directly.

### Tools for using Nova

* [Horizon](https://docs.openstack.org/horizon/zed/user/launch-instances.html): The official web UI for the OpenStack Project.

* [OpenStack Client](https://docs.openstack.org/python-openstackclient/zed/): The official CLI for OpenStack Projects. You should use this as your CLI for most things, it includes not just nova commands but also commands for most of the projects in OpenStack.

* [Nova Client](https://docs.openstack.org/python-novaclient/zed/user/shell.html): For some very advanced features (or administrative commands) of nova you may need to use nova client. It is still supported, but the `openstack` cli is recommended.

### Writing to the API

All end user (and some administrative) features of nova are exposed via a REST API, which can be used to build more complicated logic or automation with nova. This can be consumed directly, or via various SDKs. The following resources will help you get started with consuming the API directly.

* [Compute API Guide](https://docs.openstack.org/api-guide/compute/): The concept guide for the API. This helps lay out the concepts behind the API to make consuming the API reference easier.

* [Compute API Reference](https://docs.openstack.org/api-ref/compute/): The complete reference for the compute API, including all methods and request / response parameters and their meaning.

* [Compute API Microversion History](https://docs.openstack.org/nova/zed/reference/api-microversion-history.html): The compute API evolves over time through [Microversions](https://docs.openstack.org/api-guide/compute/microversions.html). This provides the history of all those changes. Consider it a “what’s new” in the compute API.

* [Block Device Mapping](https://docs.openstack.org/nova/zed/user/block-device-mapping.html): One of the trickier parts to understand is the Block Device Mapping parameters used to connect specific block devices to computes. This deserves its own deep dive.

* [Metadata](https://docs.openstack.org/nova/zed/user/metadata.html): Provide information to the guest instance when it is created.

Nova can be configured to emit notifications over RPC.

* [Versioned Notifications](https://docs.openstack.org/nova/zed/admin/notifications.html): This provides information on the notifications emitted by nova.

Other end-user guides can be found under [User Documentation](https://docs.openstack.org/nova/zed/user/index.html).

---

## **For Operators**

### Architecture Overview

* [Nova architecture](https://docs.openstack.org/nova/zed/admin/architecture.html): An overview of how all the parts in nova fit together.

### Installation

The detailed install guide for nova. A functioning nova will also require having installed [keystone](https://docs.openstack.org/keystone/zed/install/), [glance](https://docs.openstack.org/glance/zed/install/), [neutron](https://docs.openstack.org/neutron/zed/install/), and [placement](https://docs.openstack.org/placement/zed/install/). Ensure that you follow their install guides first.

* [Compute service](https://docs.openstack.org/nova/zed/install/index.html)

  * [Overview](https://docs.openstack.org/nova/zed/install/overview.html)

  * [Compute service overview](https://docs.openstack.org/nova/zed/install/get-started-compute.html)

  * [Install and configure controller node](https://docs.openstack.org/nova/zed/install/controller-install.html)

  * [Install and configure a compute node](https://docs.openstack.org/nova/zed/install/compute-install.html)

  * [Verify operation](https://docs.openstack.org/nova/zed/install/verify.html)

### Deployment Considerations

There is information you might want to consider before doing your deployment, especially if it is going to be a larger deployment. For smaller deployments the defaults from the [install guide](https://docs.openstack.org/nova/zed/install/index.html) will be sufficient.

* **Compute Driver Features Supported**: While the majority of nova deployments use libvirt/kvm, you can use nova with other compute drivers. Nova attempts to provide a unified feature set across these, however, not all features are implemented on all backends, and not all features are equally well tested.

  * [Feature Support by Use Case](https://docs.openstack.org/nova/zed/user/feature-classification.html): A view of what features each driver supports based on what’s important to some large use cases (General Purpose Cloud, NFV Cloud, HPC Cloud).

  * [Feature Support full list](https://docs.openstack.org/nova/zed/user/support-matrix.html): A detailed dive through features in each compute driver backend.

* [Cells v2 configuration](https://docs.openstack.org/nova/zed/admin/cells.html): For large deployments, cells v2 cells allow sharding of your compute environment. Upfront planning is key to a successful cells v2 layout.

* [Running nova-api on wsgi](https://docs.openstack.org/nova/zed/user/wsgi.html): Considerations for using a real WSGI container instead of the baked-in eventlet web server.

### Maintenance

Once you are running nova, the following information is extremely useful.

* [Admin Guide](https://docs.openstack.org/nova/zed/admin/index.html): A collection of guides for administrating nova.

* [Flavors](https://docs.openstack.org/nova/zed/user/flavors.html): What flavors are and why they are used.

* [Upgrades](https://docs.openstack.org/nova/zed/admin/upgrades.html): How nova is designed to be upgraded for minimal service impact, and the order you should do them in.

* [Quotas](https://docs.openstack.org/nova/zed/user/quotas.html): Managing project quotas in nova.

* [Aggregates](https://docs.openstack.org/nova/zed/admin/aggregates.html): Aggregates are a useful way of grouping hosts together for scheduling purposes.

* [Scheduling](https://docs.openstack.org/nova/zed/admin/scheduling.html): How the scheduler is configured, and how that will impact where compute instances land in your environment. If you are seeing unexpected distribution of compute instances in your hosts, you’ll want to dive into this configuration.

* [Exposing custom metadata to compute instances](https://docs.openstack.org/nova/zed/admin/vendordata.html): How and when you might want to extend the basic metadata exposed to compute instances (either via metadata server or config drive) for your specific purposes.

### Reference Material

* [Nova CLI Command References](https://docs.openstack.org/nova/zed/cli/index.html): the complete command reference for all the daemons and admin tools that come with nova.

* [Configuration Guide](https://docs.openstack.org/nova/zed/configuration/index.html): Information on configuring the system, including role-based access control policy rules.

---

## **For Contributors**

* [So You Want to Contribute…](https://docs.openstack.org/nova/zed/contributor/contributing.html): If you are a new contributor this should help you to start contributing to Nova.

* [Contributor Documentation](https://docs.openstack.org/nova/zed/contributor/index.html): If you are new to Nova, this should help you start to understand what Nova actually does, and why.

* [Technical Reference Deep Dives](https://docs.openstack.org/nova/zed/reference/index.html): There are also a number of technical references on both current and future looking parts of our architecture. These are collected here.

---

## **Search**

* [Nova document search](https://docs.openstack.org/nova/zed/search.html): Search the contents of this document.

* [OpenStack wide search](https://docs.openstack.org/): Search the wider set of OpenStack documentation, including forums.
