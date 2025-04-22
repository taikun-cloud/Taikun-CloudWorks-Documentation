# **Availability Zones**

!!! Note
	This section provides deployment and admin-user usage information about the availability zone feature. For end-user information about availability zones, refer to the [user guide](https://docs.openstack.org/nova/zed/user/availability-zones.html).

Availability Zones are an end-user visible logical abstraction for partitioning a cloud without knowing the physical infrastructure. They can be used to partition a cloud on arbitrary factors, such as location (country, datacenter, rack), network layout and/or power source.

!!! Note
	Availability Zones should not be assumed to map to fault domains and provide no intrinsic HA benefit by themselves.

Availability zones are not modeled in the database; rather, they are defined by attaching specific metadata information to an [aggregate](https://taikun.cloud/ocp-admin-guide/host-aggregates/) The addition of this specific metadata to an aggregate makes the aggregate visible from an end-user perspective and consequently allows users to schedule instances to a specific set of hosts, the ones belonging to the aggregate. There are a few additional differences to note when comparing availability zones and host aggregates:

* A host can be part of multiple aggregates but it can only be in one availability zone.

* By default a host is part of a default availability zone even if it doesn’t belong to an aggregate. The name of this default availability zone can be configured using [`default_availability_zone`](https://docs.openstack.org/nova/zed/configuration/config.html#DEFAULT.default_availability_zone) config option.

??? Warning
	The use of the default availability zone name in requests can be very error-prone. Since the user can see the list of availability zones, they have no way to know whether the default availability zone name (currently `nova`) is provided because an host belongs to an aggregate whose AZ metadata key is set to `nova`, or because there is at least one host not belonging to any aggregate. Consequently, it is highly recommended for users to never ever ask for booting an instance by specifying an explicit AZ named `nova` and for operators to never set the AZ metadata for an aggregate to `nova`. This can result is some problems due to the fact that the instance AZ information is explicitly attached to `nova` which could break further move operations when either the host is moved to another aggregate or when the user would like to migrate the instance.

!!! Note
	Availability zone names must NOT contain `:` since it is used by admin users to specify hosts where instances are launched in server creation. See [Using availability zones to select hosts](https://taikun.cloud/docs/availability-zones/#id2) for more information.

In addition, other services, such as the [networking service](https://docs.openstack.org/neutron/zed/) and the [block storage service](https://docs.openstack.org/cinder/zed/), also provide an availability zone feature. However, the implementation of these features differs vastly between these different services. Consult the documentation for these other services for more information on their implementation of this feature.

---

## **Availability Zones with Placement**

In order to use placement to honor availability zone requests, there must be placement aggregates that match the membership and UUID of nova host aggregates that you assign as availability zones. The same key in aggregate metadata used by the AvailabilityZoneFilter filter controls this function, and is enabled by setting [`scheduler.query_placement_for_availability_zone`](https://docs.openstack.org/nova/zed/configuration/config.html#scheduler.query_placement_for_availability_zone) to `True`. As of 24.0.0 (Xena), this is the default.

```
$ openstack --os-compute-api-version=2.53 aggregate create myaz
+-------------------+--------------------------------------+
| Field             | Value                                |
+-------------------+--------------------------------------+
| availability_zone | None                                 |
| created_at        | 2018-03-29T16:22:23.175884           |
| deleted           | False                                |
| deleted_at        | None                                 |
| id                | 4                                    |
| name              | myaz                                 |
| updated_at        | None                                 |
| uuid              | 019e2189-31b3-49e1-aff2-b220ebd91c24 |
+-------------------+--------------------------------------+

$ openstack --os-compute-api-version=2.53 aggregate add host myaz node1
+-------------------+--------------------------------------+
| Field             | Value                                |
+-------------------+--------------------------------------+
| availability_zone | None                                 |
| created_at        | 2018-03-29T16:22:23.175884           |
| deleted           | False                                |
| deleted_at        | None                                 |
| hosts             | [u'node1']                           |
| id                | 4                                    |
| name              | myagg                                |
| updated_at        | None                                 |
| uuid              | 019e2189-31b3-49e1-aff2-b220ebd91c24 |
+-------------------+--------------------------------------+

$ openstack aggregate set --property availability_zone=az002 myaz

$ openstack --os-placement-api-version=1.2 resource provider aggregate set --aggregate 019e2189-31b3-49e1-aff2-b220ebd91c24 815a5634-86fb-4e1e-8824-8a631fee3e06
```

Without the above configuration, the AvailabilityZoneFilter filter must be enabled in [`filter_scheduler.enabled_filters`](https://docs.openstack.org/nova/zed/configuration/config.html#filter_scheduler.enabled_filters) to retain proper behavior.

---

## **Implications for moving servers**

There are several ways to move a server to another host: evacuate, resize, cold migrate, live migrate, and unshelve. Move operations typically go through the scheduler to pick the target host *unless* a target host is specified and the request forces the server to that host by bypassing the scheduler. Only evacuate and live migrate can forcefully bypass the scheduler and move a server to a specified host and even then it is highly recommended to *not* force and bypass the scheduler.

With respect to availability zones, a server is restricted to a zone if:

1. The server was created in a specific zone with the `POST /servers` request containing the `availability_zone` parameter.

2. If the server create request did not contain the `availability_zone` parameter but the API service is configured for [`default_schedule_zone`](https://docs.openstack.org/nova/zed/configuration/config.html#DEFAULT.default_schedule_zone) then by default the server will be scheduled to that zone.

3. The shelved offloaded server was unshelved by specifying the `availability_zone` with the `POST /servers/{server_id}/action` request using microversion 2.77 or greater.

4. [`cinder.cross_az_attach`](https://docs.openstack.org/nova/zed/configuration/config.html#cinder.cross_az_attach) is False, [`default_schedule_zone`](https://docs.openstack.org/nova/zed/configuration/config.html#DEFAULT.default_schedule_zone) is None, the server is created without an explicit zone but with pre-existing volume block device mappings. In that case the server will be created in the same zone as the volume(s) if the volume zone is not the same as [`default_availability_zone`](https://docs.openstack.org/nova/zed/configuration/config.html#DEFAULT.default_availability_zone). See [Resource affinity](https://taikun.cloud/ocp-admin-guide/availability-zones-2/) for details.

If the server was not created in a specific zone then it is free to be moved to other zones, i.e. the [AvailabilityZoneFilter](https://taikun.cloud/ocp-admin-guide/compute-schedulers/#AvailabilityZoneFilter) is a no-op.

Knowing this, it is dangerous to force a server to another host with evacuate or live migrate if the server is restricted to a zone and is then forced to move to a host in another zone, because that will create an inconsistency in the internal tracking of where that server should live and may require manually updating the database for that server. For example, if a user creates a server in zone A and then the admin force live migrates the server to zone B, and then the user resizes the server, the scheduler will try to move it back to zone A which may or may not work, e.g. if the admin deleted or renamed zone A in the interim.

### Resource affinity

The [`cinder.cross_az_attach`](https://docs.openstack.org/nova/zed/configuration/config.html#cinder.cross_az_attach) configuration option can be used to restrict servers and the volumes attached to servers to the same availability zone.

A typical use case for setting `cross_az_attach=False` is to enforce compute and block storage affinity, for example in a High Performance Compute cluster.

By default `cross_az_attach` is True meaning that the volumes attached to a server can be in a different availability zone than the server. If set to False, then when creating a server with pre-existing volumes or attaching a volume to a server, the server and volume zone must match otherwise the request will fail. In addition, if the nova-compute service creates the volumes to attach to the server during server create, it will request that those volumes are created in the same availability zone as the server, which must exist in the block storage (cinder) service.

As noted in the [Implications for moving servers](https://taikun.cloud/ocp-admin-guide/availability-zones-2/) section, forcefully moving a server to another zone could also break affinity with attached volumes.

!!! Note

	`cross_az_attach=False` is not widely used nor tested extensively and thus suffers from some known issues:

	* [Bug 1694844](https://bugs.launchpad.net/nova/+bug/1694844). This is fixed in the 21.0.0 (Ussuri) release by using the volume zone for the server being created if the server is created without an explicit zone, `default_schedule_zone` is None, and the volume zone does not match the value of `default_availability_zone` .
	* [Bug 1781421](https://bugs.launchpad.net/nova/+bug/1781421)

---

## **Using availability zones to select hosts**

We can combine availability zones with a specific host and/or node to select where an instance is launched. For example:

```
$ openstack server create --availability-zone ZONE:HOST:NODE ... SERVER
```

!!! Note

	It is possible to use `ZONE`, `ZONE:HOST`, and `ZONE::NODE`.

	This is an admin-only operation by default, though you can modify this behavior using the `os_compute_api:servers:create:forced_host` rule in `policy.yaml`.

However, as discussed previously, when launching instances in this manner the scheduler filters are not run. For this reason, this behavior is considered legacy behavior and, starting with the 2.74 microversion, it is now possible to specify a host or node explicitly. For example:

```
$ openstack --os-compute-api-version 2.74 server create \
    --host HOST --hypervisor-hostname HYPERVISOR ... SERVER
```

!!! Note
	This is an admin-only operation by default, though you can modify this behavior using the `compute:servers:create:requested_destination` rule in `policy.yaml`.

This avoids the need to explicitly select an availability zone and ensures the scheduler filters are not bypassed.

---

## **Usage**

Creating an availability zone (AZ) is done by associating metadata with a [host aggregate](https://taikun.cloud/ocp-admin-guide/host-aggregates/). For this reason, the **openstack** client provides the ability to create a host aggregate and associate it with an AZ in one command. For example, to create a new aggregate, associating it with an AZ in the process, and add host to it using the **openstack** client, run:

```
$ openstack aggregate create --zone my-availability-zone my-aggregate
$ openstack aggregate add host my-aggregate my-host
```

!!! Note
	While it is possible to add a host to multiple host aggregates, it is not possible to add them to multiple availability zones. Attempting to add a host to multiple host aggregates associated with differing availability zones will result in a failure.

Alternatively, you can set this metadata manually for an existing host aggregate. For example:

```
$ openstack aggregate set \
    --property availability_zone=my-availability-zone my-aggregate
```

To list all host aggregates and show information about a specific aggregate, in order to determine which AZ the host aggregate(s) belong to, run:

```
$ openstack aggregate list --long
$ openstack aggregate show my-aggregate
```

Finally, to disassociate a host aggregate from an availability zone, run:

```
$ openstack aggregate unset --property availability_zone my-aggregate
```

---

## **Configuration**

Refer to [Host aggregates](https://taikun.cloud/ocp-admin-guide/host-aggregates/) for information on configuring both host aggregates and availability zones.
