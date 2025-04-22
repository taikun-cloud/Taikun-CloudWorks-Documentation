# **High Availability and Scalability**

## [**HA and Scalability**](https://docs.openstack.org/ironic/latest/install/refarch/common.html#id12)

## [**ironic-api**](https://docs.openstack.org/ironic/latest/install/refarch/common.html#id13)

The Bare Metal API service is stateless, and thus can be easily scaled horizontally. It is recommended to deploy it as a WSGI application behind e.g. Apache or another WSGI container.

!!! Note
	This service accesses the ironic database for reading entities (e.g. in response to `GET /v1/nodes` request) and in rare cases for writing.

---

## [**ironic-conductor**](https://docs.openstack.org/ironic/latest/install/refarch/common.html#id14)

### [High availability](https://docs.openstack.org/ironic/latest/install/refarch/common.html#id15)

The Bare Metal conductor service utilizes the active/active HA model. Every conductor manages a certain subset of nodes. The nodes are organized in a hash ring that tries to keep the load spread more or less uniformly across the conductors. When a conductor is considered offline, its nodes are taken over by other conductors. As a result of this, you need at least 2 conductor hosts for an HA deployment.

### [Performance](https://docs.openstack.org/ironic/latest/install/refarch/common.html#id16)

Conductors can be resource intensive, so it is recommended (but not required) to keep all conductors separate from other services in the cloud. The minimum required number of conductors in a deployment depends on several factors:

* the performance of the hardware where the conductors will be running,

* the speed and reliability of the [management controller](https://en.wikipedia.org/wiki/Out-of-band_management) of the bare metal nodes (for example, handling slower controllers may require having less nodes per conductor),

* the frequency, at which the management controllers are polled by the Bare Metal service (see the `sync_power_state_interval` option),

* the bare metal driver used for nodes (see [Hardware and drivers](https://docs.openstack.org/ironic/latest/install/refarch/common.html#hardware-and-drivers) above),

* the network performance,

* the maximum number of bare metal nodes that are provisioned simultaneously (see the `max_concurrent_builds` option for the Compute service).

We recommend a target of **100** bare metal nodes per conductor for maximum reliability and performance. There is some tolerance for a larger number per conductor. However, it was reported [\[1\]](https://docs.openstack.org/ironic/latest/install/refarch/common.html#id3) [\[2\]](https://docs.openstack.org/ironic/latest/install/refarch/common.html#id4) that reliability degrades when handling approximately 300 bare metal nodes per conductor.

### [Disk space](https://docs.openstack.org/ironic/latest/install/refarch/common.html#id17)

Each conductor needs enough free disk space to cache images it uses. Depending on the combination of the deploy interface and the boot option, the space requirements are different:

* The deployment kernel and ramdisk are always cached during the deployment.

* When `[agent]image_download_source` is set to `http` and Glance is used, the conductor will download instances images locally to serve them from its HTTP server. Use `swift` to publish images using temporary URLs and convert them on the node’s side.When `[agent]image_download_source` is set to `local`, it will happen even for HTTP(s) URLs. For standalone case use `http` to avoid unnecessary caching of images.In both cases a cached image is converted to raw if `force_raw_images` is `True` (the default).See [Deploy with custom HTTP servers](https://docs.openstack.org/ironic/latest/admin/interfaces/deploy.html#image-download-source) and [Streaming raw images](https://docs.openstack.org/ironic/latest/admin/interfaces/deploy.html#stream-raw-images) for more details.

* When network boot is used, the instance image kernel and ramdisk are cached locally while the instance is active.
