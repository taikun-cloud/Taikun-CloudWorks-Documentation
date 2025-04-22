# **Drivers, Hardware Types and Hardware Interfaces**

## **Generic Interfaces**

* [Boot interfaces](https://docs.openstack.org/ironic/zed/admin/interfaces/boot.html)

  * [PXE boot](https://docs.openstack.org/ironic/zed/admin/interfaces/boot.html#pxe-boot)

  * [Common options](https://docs.openstack.org/ironic/zed/admin/interfaces/boot.html#common-options)

* [Deploy Interfaces](https://docs.openstack.org/ironic/zed/admin/interfaces/deploy.html)

  * [Direct deploy](https://docs.openstack.org/ironic/zed/admin/interfaces/deploy.html#direct-deploy)

  * [Ansible deploy](https://docs.openstack.org/ironic/zed/admin/interfaces/deploy.html#ansible-deploy)

  * [Anaconda deploy](https://docs.openstack.org/ironic/zed/admin/interfaces/deploy.html#anaconda-deploy)

  * [Ramdisk deploy](https://docs.openstack.org/ironic/zed/admin/interfaces/deploy.html#ramdisk-deploy)

  * [Custom agent deploy](https://docs.openstack.org/ironic/zed/admin/interfaces/deploy.html#custom-agent-deploy)

---

## **Hardware Types**

* [iBMC driver](https://docs.openstack.org/ironic/zed/admin/drivers/ibmc.html)

* [iDRAC driver](https://docs.openstack.org/ironic/zed/admin/drivers/idrac.html)

* [iLO driver](https://docs.openstack.org/ironic/zed/admin/drivers/ilo.html)

* [Intel IPMI driver](https://docs.openstack.org/ironic/zed/admin/drivers/intel-ipmi.html)

* [IPMI driver](https://docs.openstack.org/ironic/zed/admin/drivers/ipmitool.html)

* [iRMC driver](https://docs.openstack.org/ironic/zed/admin/drivers/irmc.html)

* [Redfish driver](https://docs.openstack.org/ironic/zed/admin/drivers/redfish.html)

* [SNMP driver](https://docs.openstack.org/ironic/zed/admin/drivers/snmp.html)

* [XClarity driver](https://docs.openstack.org/ironic/zed/admin/drivers/xclarity.html)

* [Fake driver](https://docs.openstack.org/ironic/zed/admin/drivers/fake.html)

---

## **Changing Hardware Types and Interfaces**

Hardware types and interfaces are enabled in the configuration as described in [Enabling drivers and hardware types](https://docs.openstack.org/ironic/zed/install/enabling-drivers.html). Usually, a hardware type is configured on enrolling as described in [Enrollment](https://docs.openstack.org/ironic/zed/install/enrollment.html):

`baremetal node create --driver <hardware type>`

Any hardware interfaces can be specified on enrollment as well:

baremetal node create --driver \<hardware type>&#x20;
`    \ --deploy-interface direct --<other>-interface <other implementation>`

For the remaining interfaces the default value is assigned as described in [Defaults for hardware interfaces](https://docs.openstack.org/ironic/zed/install/enrollment.html#hardware-interfaces-defaults). Both the hardware type and the hardware interfaces can be changed later via the node update API.

### Changing Hardware Interfaces

Hardware interfaces can be changed by the following command:

baremetal node set \<NODE> \\
&#x20;   \--deploy-interface direct \\
`    --<other>-interface <other implementation>`

The modified interfaces must be enabled and compatible with the current node’s hardware type.

### Changing Hardware Type

Changing the node’s hardware type can pose a problem. When the `driver` field is updated, the final result must be consistent, that is, the resulting hardware interfaces must be compatible with the new hardware type. This will not work:

```
baremetal node create --name test --driver fake-hardware
baremetal node set test --driver ipmi
```

This is because the `fake-hardware` hardware type defaults to `fake` implementations for some or all interfaces, but the `ipmi` hardware type is not compatible with them. There are three ways to deal with this situation:

1\. Provide new values for all incompatible interfaces, for example:

```
baremetal node set test --driver ipmi \
    --boot-interface pxe \
    --deploy-interface direct \
    --management-interface ipmitool \
    --power-interface ipmitool
```

2\. Request resetting some of the interfaces to their new defaults by using the `--reset-<IFACE>-interface` family of arguments, for example:

```
baremetal node set test --driver ipmi \
    --reset-boot-interface \
    --reset-deploy-interface \
    --reset-management-interface \
    --reset-power-interface
```

!!! Note
	This feature is available starting with ironic 11.1.0 (Rocky series, API version 1.45).

3\. Request resetting all interfaces to their new defaults:

```
baremetal node set test --driver ipmi --reset-interfaces
```

You can still specify explicit values for some interfaces:

```
baremetal node set test --driver ipmi --reset-interfaces \
    --deploy-interface direct
```

#### Static boot order configuration

Some hardware is known to misbehave when changing the boot device through the BMC. To work around it you can use the `noop` management interface implementation with the `ipmi` and `redfish` hardware types. In this case the Bare Metal service will not change the boot device for you, leaving the pre-configured boot order.

For example, in case of the [PXE boot](https://docs.openstack.org/ironic/zed/admin/interfaces/boot.html#pxe-boot):

1a\. Via any available means configure the boot order on the node as follows:

   1b\. Boot from PXE/iPXE on the provisioning NIC.

* If it is not possible to limit network boot to only provisioning NIC, make sure that no other DHCP/PXE servers are accessible by the node.

   2a\. Boot from hard drive.

2b\. Make sure the `noop` management interface is enabled, for example:

```
[DEFAULT]
enabled_hardware_types = ipmi,redfish
enabled_management_interfaces = ipmitool,redfish,noop
```

3\. Change the node to use the `noop` management interface:

```
baremetal node set <NODE> --management-interface noop
```

---

## **Unsupported drivers**

The following drivers were declared as unsupported in ironic Newton release and as of Ocata release they are removed from ironic:

* AMT driver – available as part of [ironic-staging-drivers](http://ironic-staging-drivers.readthedocs.io/)

* iBoot driver – available as part of [ironic-staging-drivers](http://ironic-staging-drivers.readthedocs.io/)

* Wake-On-Lan driver – available as part of [ironic-staging-drivers](http://ironic-staging-drivers.readthedocs.io/)

* Virtualbox drivers

* SeaMicro drivers

* MSFT OCS drivers

The SSH drivers were removed in the Pike release. Similar functionality can be achieved either with [VirtualBMC](https://opendev.org/openstack/virtualbmc) or using libvirt drivers from [ironic-staging-drivers](http://ironic-staging-drivers.readthedocs.io/).
