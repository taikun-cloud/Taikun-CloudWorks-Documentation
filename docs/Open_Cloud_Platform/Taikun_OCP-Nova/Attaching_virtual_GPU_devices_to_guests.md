# **Attaching virtual GPU devices to guests**

The virtual GPU feature in Nova allows a deployment to provide specific GPU types for instances using physical GPUs that can provide virtual devices.

For example, a single Intel GVT-g or a [NVIDIA GRID vGPU](http://docs.nvidia.com/grid/5.0/pdf/grid-vgpu-user-guide.pdf) physical Graphics Processing Unit (pGPU) can be virtualized as multiple virtual Graphics Processing Units (vGPUs) if the hypervisor supports the hardware driver and has the capability to create guests using those virtual devices.

This feature is highly dependent on the version of libvirt and the physical devices present on the host. In addition, the vendor’s vGPU driver software must be installed and configured on the host at the same time.

Caveats are mentioned in the [Caveats](https://docs.openstack.org/nova/zed/admin/virtual-gpu.html#caveats) section.

To enable virtual GPUs, follow the steps below:

1. [Enable GPU types (Compute)](https://docs.openstack.org/nova/zed/admin/virtual-gpu.html#enable-gpu-types-compute)

2. [Configure a flavor (Controller)](https://docs.openstack.org/nova/zed/admin/virtual-gpu.html#configure-a-flavor-controller)

---

## **Enable GPU types (Compute)**

1\. Specify which specific GPU type(s) the instances would get.

Edit [`devices.enabled_mdev_types`](https://docs.openstack.org/nova/zed/configuration/config.html#devices.enabled_mdev_types):

```
[devices]
enabled_mdev_types = nvidia-35
```

If you want to support more than a single GPU type, you need to provide a separate configuration section for each device. For example:

```
[devices]
enabled_mdev_types = nvidia-35, nvidia-36

[mdev_nvidia-35]
device_addresses = 0000:84:00.0,0000:85:00.0

[mdev_nvidia-36]
device_addresses = 0000:86:00.0
```

where you have to define which physical GPUs are supported per GPU type.

If the same PCI address is provided for two different types, nova-compute will refuse to start and issue a specific error in the logs.

To know which specific type(s) to mention, please refer to [How to discover a GPU type](https://docs.openstack.org/nova/zed/admin/virtual-gpu.html#how-to-discover-a-gpu-type).

2\. Restart the `nova-compute` service.

???+ Warning
	Changing the type is possible but since existing physical GPUs can’t address multiple guests having different types, that will make Nova return you a NoValidHost if existing instances with the original type still exist. Accordingly, it’s highly recommended to instead deploy the new type to new compute nodes that don’t already have workloads and rebuild instances on the nodes that need to change types.

---

## **Configure a flavor (Controller)**

Configure a flavor to request one virtual GPU:

```
$ openstack flavor set vgpu_1 --property "resources:VGPU=1"
```

The enabled vGPU types on the compute hosts are not exposed to API users. Flavors configured for vGPU support can be tied to host aggregates as a means to properly schedule those flavors onto the compute hosts that support them. See [Host aggregates](https://docs.openstack.org/nova/zed/admin/aggregates.html) for more information.

---

## **Create instances with virtual GPU devices**

The `nova-scheduler` selects a destination host that has vGPU devices available by calling the Placement API for a specific VGPU resource class provided by compute nodes.

```
$ openstack server create --flavor vgpu_1 --image cirros-0.3.5-x86_64-uec --wait test-vgpu
```

---

## **How to discover a GPU type**

Virtual GPUs are seen as mediated devices. Physical PCI devices (the graphic card here) supporting virtual GPUs propose mediated device (mdev) types. Since mediated devices are supported by the Linux kernel through sysfs files after installing the vendor’s virtual GPUs driver software, you can see the required properties as follows:

```
$ ls /sys/class/mdev_bus/*/mdev_supported_types
/sys/class/mdev_bus/0000:84:00.0/mdev_supported_types:
nvidia-35  nvidia-36  nvidia-37  nvidia-38  nvidia-39  nvidia-40  nvidia-41  nvidia-42  nvidia-43  nvidia-44  nvidia-45

/sys/class/mdev_bus/0000:85:00.0/mdev_supported_types:
nvidia-35  nvidia-36  nvidia-37  nvidia-38  nvidia-39  nvidia-40  nvidia-41  nvidia-42  nvidia-43  nvidia-44  nvidia-45

/sys/class/mdev_bus/0000:86:00.0/mdev_supported_types:
nvidia-35  nvidia-36  nvidia-37  nvidia-38  nvidia-39  nvidia-40  nvidia-41  nvidia-42  nvidia-43  nvidia-44  nvidia-45

/sys/class/mdev_bus/0000:87:00.0/mdev_supported_types:
nvidia-35  nvidia-36  nvidia-37  nvidia-38  nvidia-39  nvidia-40  nvidia-41  nvidia-42  nvidia-43  nvidia-44  nvidia-45
```

### Checking allocations and inventories for virtual GPUs

The examples you will see are using the [osc-placement plugin](https://docs.openstack.org/osc-placement/latest/index.html) for OpenStackClient. For details on specific commands, see its documentation.

1\. Get the list of resource providers$ openstack resource provider list

```
$ openstack resource provider list
+--------------------------------------+---------------------------------------------------------+------------+
| uuid                                 | name                                                    | generation |
+--------------------------------------+---------------------------------------------------------+------------+
| 5958a366-3cad-416a-a2c9-cfbb5a472287 | virtlab606.xxxxxxxxxxxxxxxxxxxxxxxxxxx                  |          7 |
| fc9b9287-ef5e-4408-aced-d5577560160c | virtlab606.xxxxxxxxxxxxxxxxxxxxxxxxxxx_pci_0000_86_00_0 |          2 |
| e2f8607b-0683-4141-a8af-f5e20682e28c | virtlab606.xxxxxxxxxxxxxxxxxxxxxxxxxxx_pci_0000_85_00_0 |          3 |
| 85dd4837-76f9-41f2-9f19-df386017d8a0 | virtlab606.xxxxxxxxxxxxxxxxxxxxxxxxxxx_pci_0000_87_00_0 |          2 |
| 7033d860-8d8a-4963-8555-0aa902a08653 | virtlab606.xxxxxxxxxxxxxxxxxxxxxxxxxxx_pci_0000_84_00_0 |          2 |
+--------------------------------------+---------------------------------------------------------+------------+
```

In this example, we see the root resource provider `5958a366-3cad-416a-a2c9-cfbb5a472287` with four other resource providers that are its children and where each of them corresponds to a single physical GPU.

2\. Check the inventory of each resource provider to see resource classes

```
$ openstack resource provider inventory list 5958a366-3cad-416a-a2c9-cfbb5a472287
+----------------+------------------+----------+----------+-----------+----------+-------+
| resource_class | allocation_ratio | max_unit | reserved | step_size | min_unit | total |
+----------------+------------------+----------+----------+-----------+----------+-------+
| VCPU           |             16.0 |       48 |        0 |         1 |        1 |    48 |
| MEMORY_MB      |              1.5 |    65442 |      512 |         1 |        1 | 65442 |
| DISK_GB        |              1.0 |       49 |        0 |         1 |        1 |    49 |
+----------------+------------------+----------+----------+-----------+----------+-------+
$ openstack resource provider inventory list e2f8607b-0683-4141-a8af-f5e20682e28c
+----------------+------------------+----------+----------+-----------+----------+-------+
| resource_class | allocation_ratio | max_unit | reserved | step_size | min_unit | total |
+----------------+------------------+----------+----------+-----------+----------+-------+
| VGPU           |              1.0 |       16 |        0 |         1 |        1 |    16 |
+----------------+------------------+----------+----------+-----------+----------+-------+
```

Here you can see a `VGPU` inventory on the child resource provider while other resource class inventories are still located on the root resource provider.

3\. Check allocations for each server that is using virtual GPUs

```
$ openstack server list
+--------------------------------------+-------+--------+---------------------------------------------------------+--------------------------+--------+
| ID                                   | Name  | Status | Networks                                                | Image                    | Flavor |
+--------------------------------------+-------+--------+---------------------------------------------------------+--------------------------+--------+
| 5294f726-33d5-472a-bef1-9e19bb41626d | vgpu2 | ACTIVE | private=10.0.0.14, fd45:cdad:c431:0:f816:3eff:fe78:a748 | cirros-0.4.0-x86_64-disk | vgpu   |
| a6811fc2-cec8-4f1d-baea-e2c6339a9697 | vgpu1 | ACTIVE | private=10.0.0.34, fd45:cdad:c431:0:f816:3eff:fe54:cc8f | cirros-0.4.0-x86_64-disk | vgpu   |
+--------------------------------------+-------+--------+---------------------------------------------------------+--------------------------+--------+

$ openstack resource provider allocation show 5294f726-33d5-472a-bef1-9e19bb41626d
+--------------------------------------+------------+------------------------------------------------+
| resource_provider                    | generation | resources                                      |
+--------------------------------------+------------+------------------------------------------------+
| 5958a366-3cad-416a-a2c9-cfbb5a472287 |          8 | {u'VCPU': 1, u'MEMORY_MB': 512, u'DISK_GB': 1} |
| 7033d860-8d8a-4963-8555-0aa902a08653 |          3 | {u'VGPU': 1}                                   |
+--------------------------------------+------------+------------------------------------------------+

$ openstack resource provider allocation show a6811fc2-cec8-4f1d-baea-e2c6339a9697
+--------------------------------------+------------+------------------------------------------------+
| resource_provider                    | generation | resources                                      |
+--------------------------------------+------------+------------------------------------------------+
| e2f8607b-0683-4141-a8af-f5e20682e28c |          3 | {u'VGPU': 1}                                   |
| 5958a366-3cad-416a-a2c9-cfbb5a472287 |          8 | {u'VCPU': 1, u'MEMORY_MB': 512, u'DISK_GB': 1} |
+--------------------------------------+------------+------------------------------------------------+
```

In this example, two servers were created using a flavor asking for 1 `VGPU`, so when looking at the allocations for each consumer UUID (which is the server UUID), you can see that VGPU allocation is against the child resource provider while other allocations are for the root resource provider. Here, that means that the virtual GPU used by `a6811fc2-cec8-4f1d-baea-e2c6339a9697` is actually provided by the physical GPU having the PCI ID `0000:85:00.0`.

---

## **(Optional) Provide custom traits for multiple GPU types**

Since operators want to support different GPU types per compute, it would be nice to have flavors asking for a specific GPU type. This is now possible using custom traits by decorating child Resource Providers that correspond to physical GPUs.

1\. Get the list of resource providers

See [Checking allocations and inventories for virtual GPUs](https://docs.openstack.org/nova/zed/admin/virtual-gpu.html#checking-allocations-and-inventories-for-virtual-gpus) first for getting the list of Resource Providers that support a `VGPU` resource class.

2\. Define custom traits that will correspond for each to a GPU type

```
$ openstack --os-placement-api-version 1.6 trait create CUSTOM_NVIDIA_11
```

In this example, we ask to create a custom trait named `CUSTOM_NVIDIA_11.

3\. Add the corresponding trait to the Resource Provider matching the GPU

```
$ openstack --os-placement-api-version 1.6 resource provider trait set \
    --trait CUSTOM_NVIDIA_11 e2f8607b-0683-4141-a8af-f5e20682e28c
```

In this case, the trait `CUSTOM_NVIDIA_11` will be added to the Resource Provider with the UUID `e2f8607b-0683-4141-a8af-f5e20682e28c` that corresponds to the PCI address `0000:85:00:0` as shown above.

4\. Amend the flavor to add a requested trait

```
$ openstack flavor set --property trait:CUSTOM_NVIDIA_11=required vgpu_1
```

In this example, we add the `CUSTOM_NVIDIA_11` trait as a required information for the `vgpu_1` flavor we created earlier.

This will allow the Placement service to only return the Resource Providers matching this trait so only the GPUs that were decorated with will be checked for this flavor.
