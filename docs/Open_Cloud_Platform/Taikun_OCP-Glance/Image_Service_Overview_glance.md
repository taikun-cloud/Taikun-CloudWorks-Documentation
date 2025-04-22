# **Image Service Overview (glance)**

The Image service (glance) project provides a service where users can upload and discover data assets that are meant to be used with other services. This currently includes *images* and *metadata definitions*.

---

## **Images**

Glance image services include discovering, registering, and retrieving virtual machine (VM) images. Glance has a RESTful API that allows querying of VM image metadata as well as retrieval of the actual image.

!!! Note
	The Images API v1, DEPRECATED in the Newton release, has been removed.

VM images made available through Glance can be stored in a variety of locations from simple filesystems to object-storage systems like the OpenStack Swift project.

---

## **Metadata Definitions**

Glance hosts a *metadefs* catalog. This provides the OpenStack community with a way to programmatically determine various metadata key names and valid values that can be applied to OpenStack resources.

Note that what we’re talking about here is simply a *catalog*; the keys and values don’t actually do anything unless they are applied to individual OpenStack resources using the APIs or client tools provided by the services responsible for those resources.

It’s also worth noting that there is no special relationship between the Image Service and the Metadefs Service. If you want to apply the keys and values defined in the Metadefs Service to images, you must use the Image Service API or client tools just as you would for any other OpenStack service.

---

## **Design Principles**

Glance, as with all OpenStack projects, is written with the following design guidelines in mind:

* **Component based architecture**: Quickly add new behaviors

* **Highly available**: Scale to very serious workloads

* **Fault tolerant**: Isolated processes avoid cascading failures

* **Recoverable**: Failures should be easy to diagnose, debug, and rectify

* **Open standards**: Be a reference implementation for a community-driven api

---

## **Glance Documentation**

The Glance Project Team has put together the following documentation for you. Pick the documents that best match your user profile.

* [Glance Contribution Guidelines](https://docs.openstack.org/glance/zed/contributor/index.html)

* [Glance Administration Guide](https://docs.openstack.org/glance/zed/admin/index.html)

* [Glance Utility Programs](https://docs.openstack.org/glance/zed/cli/index.html)

* [Glance Release Notes](https://docs.openstack.org/releasenotes/glance/index.html)

* [Glance Installation](https://docs.openstack.org/glance/zed/install/index.html)

* [Glance Configuration Options](https://docs.openstack.org/glance/zed/configuration/index.html)

* [Image Service API Reference](https://docs.openstack.org/api-ref/image/)

* [Image Service API Guide](https://specs.openstack.org/openstack/glance-specs/specs/api/v2/image-api-v2.html)

* [Glance User Guide](https://docs.openstack.org/glance/zed/user/index.html)
