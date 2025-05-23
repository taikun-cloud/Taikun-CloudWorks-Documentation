# **iDRAC Driver**

The integrated Dell Remote Access Controller ([iDRAC](https://www.dell.com/idracmanuals)) is an out-of-band management platform on Dell EMC servers, and is supported directly by the `idrac` hardware type. This driver uses the Dell Web Services for Management (WSMAN) protocol and the standard Distributed Management Task Force (DMTF) Redfish protocol to perform all of its functions.

[iDRAC](https://www.dell.com/idracmanuals) hardware is also supported by the generic `ipmi` and `redfish` hardware types, though with smaller feature sets.

Key features of the Dell iDRAC driver include:

* Out-of-band node inspection

* Boot device management and firmware management

* Power management

* RAID controller management and RAID volume configuration

* BIOS settings configuration

### Ironic Features

The `idrac` hardware type supports the following Ironic interfaces:

* [BIOS Interface](https://docs.openstack.org/ironic/zed/admin/drivers/idrac.html#bios-interface): BIOS management

* [Inspect Interface](https://docs.openstack.org/ironic/zed/admin/drivers/idrac.html#inspect-interface): Hardware inspection

* [Management Interface](https://docs.openstack.org/ironic/zed/admin/drivers/idrac.html#management-interface): Boot device and firmware management

* Power Interface: Power management

* [RAID Interface](https://docs.openstack.org/ironic/zed/admin/drivers/idrac.html#raid-interface): RAID controller and disk management

* [Vendor Interface](https://docs.openstack.org/ironic/zed/admin/drivers/idrac.html#vendor-interface): BIOS management (WSMAN) and eject virtual media (Redfish)


### Prerequisites

The `idrac` hardware type requires the `python-dracclient` library to be installed on the ironic conductor node(s) if an Ironic node is configured to use an `idrac-wsman` interface implementation, for example:

```
sudo pip install 'python-dracclient>=3.1.0'
```

Additionally, the `idrac` hardware type requires the `sushy` library to be installed on the ironic conductor node(s) if an Ironic node is configured to use an `idrac-redfish` interface implementation, for example:

```
sudo pip install 'python-dracclient>=3.1.0' 'sushy>=2.0.0'
```


### Enabling

The iDRAC driver supports WSMAN for the bios, inspect, management, power, raid, and vendor interfaces. In addition, it supports Redfish for the bios, inspect, management, power, and raid interfaces. The iDRAC driver allows you to mix and match WSMAN and Redfish interfaces.

The `idrac-wsman` implementation must be enabled to use WSMAN for an interface. The `idrac-redfish` implementation must be enabled to use Redfish for an interface.

To enable the `idrac` hardware type with the minimum interfaces, all using WSMAN, add the following to your `/etc/ironic/ironic.conf`:

```
[DEFAULT]
enabled_hardware_types=idrac
enabled_management_interfaces=idrac-wsman
enabled_power_interfaces=idrac-wsman
```

To enable all optional features (BIOS, inspection, RAID, and vendor passthru) using Redfish where it is supported and WSMAN where not, use the following configuration:

```
[DEFAULT]
enabled_hardware_types=idrac
enabled_bios_interfaces=idrac-redfish
enabled_inspect_interfaces=idrac-redfish
enabled_management_interfaces=idrac-redfish
enabled_power_interfaces=idrac-redfish
enabled_raid_interfaces=idrac-redfish
enabled_vendor_interfaces=idrac-redfish
```

| Interface  | Supported Implementations                                |
| ---------- | -------------------------------------------------------- |
| bios       | idrac-wsman, idrac-redfish, no-bios                      |
| boot       | ipxe, pxe, idrac-redfish-virtual-media                   |
| console    | no-console                                               |
| deploy     | direct, ansible, ramdisk                                 |
| inspect    | idrac-wsman, idrac, idrac-redfish, inspector, no-inspect |
| management | idrac-wsman, idrac, idrac-redfish                        |
| network    | flat, neutron, noop                                      |
| power      | idrac-wsman, idrac-redfish                               |
| raid       | idrac-wsman, idrac-redfish, no-raid                      |
| rescue     | no-rescue, agent                                         |
| storage    | noop, cinder, external                                   |
| vendor     | idrac-wsman, idrac-redfish, no-vendor                    |

!!! Note
	`idrac` is the legacy name of the WSMAN interface. It has been deprecated in favor of `idrac-wsman` and may be removed in a future release.

### Protocol-specific Properties

The WSMAN and Redfish protocols require different properties to be specified in the Ironic node’s `driver_info` field to communicate with the bare metal system’s iDRAC.

The WSMAN protocol requires the following properties:

* `drac_username`: The WSMAN user name to use when communicating with the iDRAC. Usually `root`.

* `drac_password`: The password for the WSMAN user to use when communicating with the iDRAC.

* `drac_address`: The IP address of the iDRAC.

The Redfish protocol requires the following properties:

* `redfish_username`: The Redfish user name to use when communicating with the iDRAC. Usually `root`.

* `redfish_password`: The password for the Redfish user to use when communicating with the iDRAC.

* `redfish_address`: The URL address of the iDRAC. It must include the authority portion of the URL, and can optionally include the scheme. If the scheme is missing, https is assumed.

* `redfish_system_id`: The Redfish ID of the server to be managed. This should always be: `/redfish/v1/Systems/System.Embedded.1`.

For other Redfish protocol parameters see [Redfish driver](https://docs.openstack.org/ironic/zed/admin/drivers/redfish.html).

If using only interfaces which use WSMAN (`idrac-wsman`), then only the WSMAN properties must be supplied. If using only interfaces which use Redfish (`idrac-redfish`), then only the Redfish properties must be supplied. If using a mix of interfaces, where some use WSMAN and others use Redfish, both the WSMAN and Redfish properties must be supplied.

### Enrolling

The following command enrolls a bare metal node with the `idrac` hardware type using WSMAN for all interfaces:

```
baremetal node create --driver idrac \
    --driver-info drac_username=user \
    --driver-info drac_password=pa$$w0rd \
    --driver-info drac_address=drac.host
```

The following command enrolls a bare metal node with the `idrac` hardware type using Redfish for all interfaces:

```
baremetal node create --driver idrac \
    --driver-info redfish_username=user \
    --driver-info redfish_password=pa$$w0rd \
    --driver-info redfish_address=drac.host \
    --driver-info redfish_system_id=/redfish/v1/Systems/System.Embedded.1 \
    --bios-interface idrac-redfish \
    --inspect-interface idrac-redfish \
    --management-interface idrac-redfish \
    --power-interface idrac-redfish \
    --raid-interface idrac-redfish \
    --vendor-interface idrac-redfish
```

The following command enrolls a bare metal node with the `idrac` hardware type assuming a mix of Redfish and WSMAN interfaces are used:

```
baremetal node create --driver idrac \
    --driver-info drac_username=user \
    --driver-info drac_password=pa$$w0rd
    --driver-info drac_address=drac.host \
    --driver-info redfish_username=user \
    --driver-info redfish_password=pa$$w0rd \
    --driver-info redfish_address=drac.host \
    --driver-info redfish_system_id=/redfish/v1/Systems/System.Embedded.1 \
    --bios-interface idrac-redfish \
    --inspect-interface idrac-redfish \
    --management-interface idrac-redfish \
    --power-interface idrac-redfish
```

!!! Note
	If using WSMAN for the management interface, then WSMAN must be used for the power interface. The same applies to Redfish. It is currently not possible to use Redfish for one and WSMAN for the other.

---

## **BIOS Interface**

The BIOS interface implementations supported by the `idrac` hardware type allows BIOS to be configured with the standard clean/deploy step approach.

### Example

A clean step to enable `Virtualization` and `SRIOV` in BIOS of an iDRAC BMC would be as follows:

```
{
  "target":"clean",
  "clean_steps": [
    {
      "interface": "bios",
      "step": "apply_configuration",
      "args": {
        "settings": [
          {
            "name": "ProcVirtualization",
            "value": "Enabled"
          },
          {
            "name": "SriovGlobalEnable",
            "value": "Enabled"
          }
        ]
      }
    }
  ]
}
```

See the [Known Issues](https://docs.openstack.org/ironic/zed/admin/drivers/idrac.html#known-issues) for a known issue with `factory_reset` clean step. For additional details of BIOS configuration, see [BIOS Configuration](https://docs.openstack.org/ironic/zed/admin/bios.html).

---

## **Inspect Interface**

The Dell iDRAC out-of-band inspection process catalogs all the same attributes of the server as the IPMI driver. Unlike IPMI, it does this without requiring the system to be rebooted, or even to be powered on. Inspection is performed using the Dell WSMAN or Redfish protocol directly without affecting the operation of the system being inspected.

The inspection discovers the following properties:

* `cpu_arch`: cpu architecture

* `cpus`: number of cpus

* `local_gb`: disk size in gigabytes

* `memory_mb`: memory size in megabytes

Extra capabilities:

* `boot_mode`: UEFI or BIOS boot mode.

* `pci_gpu_devices`: number of GPU devices connected to the bare metal.

It also creates baremetal ports for each NIC port detected in the system. The `idrac-wsman` inspect interface discovers which NIC ports are configured to PXE boot and sets `pxe_enabled` to `True` on those ports. The `idrac-redfish` inspect interface does not currently set `pxe_enabled` on the ports. The user should ensure that `pxe_enabled` is set correctly on the ports following inspection with the `idrac-redfish` inspect interface.

---

## **Management Interface**

The management interface for `idrac-redfish` supports:

* updating firmware on nodes using a manual cleaning step. See [Redfish driver](https://docs.openstack.org/ironic/zed/admin/drivers/redfish.html) for more information on firmware update support.

* updating system and getting its inventory using configuration molds. For more information see [Import and export configuration](https://docs.openstack.org/ironic/zed/admin/drivers/idrac.html#import-and-export-configuration).

### Import and export configuration

The clean and deploy steps provided in this section allow to configure the system and collect the system inventory using configuration mold files.

The introduction of this feature in the Wallaby release is experimental.

These steps are:

* `export_configuration` with the `export_configuration_location` input parameter to export the configuration from the existing system.

* `import_configuration` with the `import_configuration_location` input parameter to import the existing configuration mold into the system.

* `import_export_configuration` with the `export_configuration_location` and `import_configuration_location` input parameters. This step combines the previous two steps into one step that first imports existing configuration mold into system, then exports the resulting configuration.

The input parameters provided include the URL where the configuration mold is to be stored after the export, or the reference location for an import. For more information on setting up storage and available options see [Storage setup](https://docs.openstack.org/ironic/zed/admin/drivers/idrac.html#storage-setup).

Configuration molds are JSON files that contain three top-level sections: `bios`, `raid` and `oem`. The following is an example of a configuration mold:

```
{
  "bios": {
    "reset": false,
    "settings": [
      {
        "name": "ProcVirtualization",
        "value": "Enabled"
      },
      {
        "name": "MemTest",
        "value": "Disabled"
      }
    ]
  }
  "raid": {
    "create_nonroot_volumes": true,
    "create_root_volume": true,
    "delete_existing": false,
    "target_raid_config": {
      "logical_disks": [
        {
          "size_gb": 50,
          "raid_level": "1+0",
          "controller": "RAID.Integrated.1-1",
          "volume_name": "root_volume",
          "is_root_volume": true,
          "physical_disks": [
            "Disk.Bay.0:Encl.Int.0-1:RAID.Integrated.1-1",
            "Disk.Bay.1:Encl.Int.0-1:RAID.Integrated.1-1"
          ]
        },
        {
          "size_gb": 100,
          "raid_level": "5",
          "controller": "RAID.Integrated.1-1",
          "volume_name": "data_volume",
          "physical_disks": [
            "Disk.Bay.2:Encl.Int.0-1:RAID.Integrated.1-1",
            "Disk.Bay.3:Encl.Int.0-1:RAID.Integrated.1-1",
            "Disk.Bay.4:Encl.Int.0-1:RAID.Integrated.1-1"
          ]
        }
      ]
    }
  }
  "oem": {
    "interface": "idrac-redfish",
    "data": {
      "SystemConfiguration": {
        "Model": "PowerEdge R640",
        "ServiceTag": "8CY9Z99",
        "TimeStamp": "Fri Jun 26 08:43:15 2020",
        "Components": [
          {
            [...]
            "FQDD": "NIC.Slot.1-1-1",
            "Attributes": [
              {
              "Name": "BlnkLeds",
              "Value": "15",
              "Set On Import": "True",
              "Comment": "Read and Write"
              },
              {
              "Name": "VirtMacAddr",
              "Value": "00:00:00:00:00:00",
              "Set On Import": "False",
              "Comment": "Read and Write"
              },
              {
              "Name": "VirtualizationMode",
              "Value": "NONE",
              "Set On Import": "True",
              "Comment": "Read and Write"
              },
            [...]
            ]
          }
        ]
      }
  }
}
```

Currently, the OEM section is the only section that is supported. The OEM section uses the iDRAC Server Configuration Profile (SCP) and can be edited as necessary if it complies with the SCP. For more information about SCP and its capabilities, see [SCP\_Reference\_Guide](http://downloads.dell.com/manuals/common/dellemc-server-config-profile-refguide.pdf).

??? Note
	iDRAC BMC connection settings are not exported to avoid overwriting these in another system when using unmodified exported configuration mold in import step. If need to replicate iDRAC BMC connection settings, then add these settings manually to configuration mold for import step.

To replicate the system configuration to that of a similar system, perform the following steps:

1. Configure a golden, or one to many, system.

2. Use the `export_configuration` step to export the configuration to the wanted location.

3. Adjust the exported configuration mold for other systems to replicate. For example, remove sections that do not need to be replicated such as iDRAC connection settings. The configuration mold can be accessed directly from the storage location.

4. Import the selected configuration mold into the other systems using the `import_configuration` step.

It is not mandatory to use `export_configuration` step to create a configuration mold. Upload the file to a designated storage location without using Ironic if it has been created manually or by other means.

#### Storage setup

To start using these steps, configure the storage location. The settings can be found in the `[molds]` section. Configure the storage type from the `[molds]storage` setting. Currently, `swift`, which is enabled by default, and `http` are supported.

In the setup input parameters, the complete HTTP URL is used. This requires that the containers (for `swift`) and the directories (for `http`) are created beforehand, and that read/write access is configured accordingly.

!!! Note
	Use of TLS is strongly advised.

This setup configuration allows a user to access these locations outside of Ironic to list, create, update, and delete the configuration molds.

For more information see [Swift configuration](https://docs.openstack.org/ironic/zed/admin/drivers/idrac.html#swift-configuration) and [HTTP configuration](https://docs.openstack.org/ironic/zed/admin/drivers/idrac.html#http-configuration).

#### Swift configuration

To use Swift with configuration molds,

1. Create the containers to be used for configuration mold storage.

2. For Ironic Swift user that is configured in the `[swift]` section add read/write access to these containers.

#### HTTP configuration

To use HTTP server with configuration molds,

1. Enable HTTP PUT support.

2. Create the directory to be used for the configuration mold storage.

3. Configure read/write access for HTTP Basic access authentication and provide user credentials in `[molds]user` and `[molds]password` fields.

The HTTP web server does not support multitenancy and is intended to be used in a stand-alone Ironic, or single-tenant OpenStack environment.

---

## **RAID Interface**

See [RAID Configuration](https://docs.openstack.org/ironic/zed/admin/raid.html) for more information on Ironic RAID support.

RAID interface of `redfish` hardware type can be used on iDRAC systems. Compared to `redfish` RAID interface, using `idrac-redfish` adds:

* Waiting for real-time operations to be available on RAID controllers. When using `redfish` this is not guaranteed and reboots might be intermittently required to complete,

* Converting non-RAID disks to RAID mode if there are any,

* Clearing foreign configuration, if any, after deleting virtual disks.

The following properties are supported by the iDRAC WSMAN and Redfish RAID interface implementation:

!!! Note
	When using `idrac-redfish` for RAID interface iDRAC firmware greater than 4.40.00.00 is required.

### Mandatory properties

* `size_gb`: Size in gigabytes (integer) for the logical disk. Use `MAX` as `size_gb` if this logical disk is supposed to use the rest of the space available.

* `raid_level`: RAID level for the logical disk. Valid values are `0`, `1`, `5`, `6`, `1+0`, `5+0` and `6+0`.

!!! Note
	`JBOD` and `2` are not supported, and will fail with reason: ‘Cannot calculate spans for RAID level.’

### Optional properties

* `is_root_volume`: Optional. Specifies whether this disk is a root volume. By default, this is `False`.

* `volume_name`: Optional. Name of the volume to be created. If this is not specified, it will be auto-generated.

### Backing physical disk hints

See [RAID Configuration](https://docs.openstack.org/ironic/zed/admin/raid.html) for more information on backing disk hints.

These are machine-independent information. The hints are specified for each logical disk to help Ironic find the desired disks for RAID configuration.

* `disk_type`

* `interface_type`

* `share_physical_disks`

* `number_of_physical_disks`

### Backing physical disks

These are Dell RAID controller-specific values and must match the names provided by the iDRAC.

* `controller`: Mandatory. The name of the controller to use.

* `physical_disks`: Optional. The names of the physical disks to use.

!!! Note
	`physical_disks` is a mandatory parameter if the property `size_gb` is set to `MAX`.

### Examples

Creation of RAID `1+0` logical disk with six disks on one controller:

```
{ "logical_disks":
  [ { "controller": "RAID.Integrated.1-1",
      "is_root_volume": "True",
      "physical_disks": [
        "Disk.Bay.0:Enclosure.Internal.0-1:RAID.Integrated.1-1",
        "Disk.Bay.1:Enclosure.Internal.0-1:RAID.Integrated.1-1",
        "Disk.Bay.2:Enclosure.Internal.0-1:RAID.Integrated.1-1",
        "Disk.Bay.3:Enclosure.Internal.0-1:RAID.Integrated.1-1",
        "Disk.Bay.4:Enclosure.Internal.0-1:RAID.Integrated.1-1",
        "Disk.Bay.5:Enclosure.Internal.0-1:RAID.Integrated.1-1"],
      "raid_level": "1+0",
      "size_gb": "MAX"}]}
```

### Manual RAID Invocation

The following command can be used to delete any existing RAID configuration. It deletes all virtual disks/RAID volumes, unassigns all global and dedicated hot spare physical disks, and clears foreign configuration:

```
baremetal node clean --clean-steps \
  '[{"interface": "raid", "step": "delete_configuration"}]' ${node_uuid}
```

The following command shows an example of how to set the target RAID configuration:

```
baremetal node set --target-raid-config '{ "logical_disks":
  [ { "controller": "RAID.Integrated.1-1",
      "is_root_volume": true,
      "physical_disks": [
        "Disk.Bay.0:Enclosure.Internal.0-1:RAID.Integrated.1-1",
        "Disk.Bay.1:Enclosure.Internal.0-1:RAID.Integrated.1-1"],
      "raid_level": "0",
      "size_gb": "MAX"}]}' ${node_uuid}
```

The following command can be used to create a RAID configuration:

```
baremetal node clean --clean-steps \
  '[{"interface": "raid", "step": "create_configuration"}]' <node>
```

When the physical disk names or controller names are not known, the following Python code example shows how the `python-dracclient` can be used to fetch the information directly from the Dell bare metal:

```
import dracclient.client


client = dracclient.client.DRACClient(
    host="192.168.1.1",
    username="root",
    password="calvin")
controllers = client.list_raid_controllers()
print(controllers)

physical_disks = client.list_physical_disks()
print(physical_disks)
```

Or using `sushy` with Redfish:

```
import sushy

client = sushy.Sushy('https://192.168.1.1', username='root', password='calvin', verify=False)
for s in client.get_system_collection().get_members():
  print("System: %(id)s" % {'id': s.identity})
  for c in system1.storage.get_members():
      print("\tController: %(id)s" % {'id': c.identity})
      for d in c.drives:
        print("\t\tDrive: %(id)s" % {'id': d.identity})
```

---

## **Vendor Interface**

### idrac-wsman

Dell iDRAC BIOS management is available through the Ironic WSMAN vendor passthru interface.

| Method Name            | HTTP Method | Description                                                                                                                                                                                                                                                                                                                                                                                    |
| ---------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| abandon\_bios\_config  | DELETE      | Abandon a BIOS configuration job.                                                                                                                                                                                                                                                                                                                                                              |
| commit\_bios\_config   | POST        | Commit a BIOS configuration job submitted through `set_bios_config`. Required argument: `reboot` – indicates whether a reboot job should be automatically created with the config job. Returns a dictionary containing the `job_id` key with the ID of the newly created config job, and the `reboot_required` key indicating whether the node needs to be rebooted to execute the config job. |
| get\_bios\_config      | GET         | Returns a dictionary containing the node’s BIOS settings.                                                                                                                                                                                                                                                                                                                                      |
| list\_unfinished\_jobs | GET         | Returns a dictionary containing the key unfinished\_jobs; its value is a list of dictionaries. Each dictionary represents an unfinished config job object.                                                                                                                                                                                                                                     |
| set\_bios\_config      | POST        | Change the BIOS configuration on a node. Required argument: a dictionary of \{`AttributeName`: `NewValue`}. Returns a dictionary containing the `is_commit_required` key indicating whether `commit_bios_config` needs to be called to apply the changes and the `is_reboot_required` value indicating whether the server must also be rebooted. Possible values are `true` and `false`.       |

#### Examples

##### Get BIOS Config

```
baremetal node passthru call --http-method GET <node> get_bios_config
```

Snippet of output showing virtualization enabled:

```
{"ProcVirtualization": {
      "current_value": "Enabled",
      "instance_id": "BIOS.Setup.1-1:ProcVirtualization",
      "name": "ProcVirtualization",
      "pending_value": null,
      "possible_values": [
          "Enabled",
          "Disabled"],
      "read_only": false }}
```

There are a number of items to note from the above snippet:

* `name`: this is the name to use in a call to `set_bios_config`.

* `current_value`: the current state of the setting.

* `pending_value`: if the value has been set, but not yet committed, the new value is shown here. The change can either be committed or abandoned.

* `possible_values`: shows a list of valid values which can be used in a call to `set_bios_config`.

* `read_only`: indicates if the value is capable of being changed.

#### Set BIOS Config

```
baremetal node passthru call <node> set_bios_config --arg "name=value"
```

Walkthrough of perfoming a BIOS configuration change:

The following section demonstrates how to change BIOS configuration settings, detect that a commit and reboot are required, and act on them accordingly. The two properties that are being changed are:

* Enable virtualization technology of the processor

* Globally enable SR-IOV

```
baremetal node passthru call <node> set_bios_config \
  --arg "ProcVirtualization=Enabled" \
  --arg "SriovGlobalEnable=Enabled"
```

This returns a dictionary indicating what actions are required next:

```
{
  "is_reboot_required": true,
  "is_commit_required": true
}
```

#### Commit BIOS Changes

The next step is to commit the pending change to the BIOS. Note that in this example, the `reboot` argument is set to `true`. The response indicates that a reboot is no longer required as it has been scheduled automatically by the `commit_bios_config` call. If the reboot argument is not supplied, the job is still created, however it remains in the `scheduled` state until a reboot is performed. The reboot can be initiated through the Ironic power API.

```
baremetal node passthru call <node> commit_bios_config \
  --arg "reboot=true"
```

```
{
  "job_id": "JID_499377293428",
  "reboot_required": false
}
```

The state of any executing job can be queried:

```
baremetal node passthru call --http-method GET <node> list_unfinished_jobs
```

```
{"unfinished_jobs":
    [{"status": "Scheduled",
      "name": "ConfigBIOS:BIOS.Setup.1-1",
      "until_time": "TIME_NA",
      "start_time": "TIME_NOW",
      "message": "Task successfully scheduled.",
      "percent_complete": "0",
      "id": "JID_499377293428"}]}
```

#### Abandon BIOS Changes

Instead of committing, a pending change can be abandoned:

```
baremetal node passthru call --http-method DELETE <node> abandon_bios_config
```

The abandon command does not provide a response body.

### Change Boot Mode

The boot mode of the iDRAC can be changed to:

* BIOS – Also called legacy or traditional boot mode. The BIOS initializes the system’s processors, memory, bus controllers, and I/O devices. After initialization is complete, the BIOS passes control to operating system (OS) software. The OS loader uses basic services provided by the system BIOS to locate and load OS modules into system memory. After booting the system, the BIOS and embedded management controllers execute system management algorithms, which monitor and optimize the condition of the underlying hardware. BIOS configuration settings enable fine-tuning of the performance, power management, and reliability features of the system.

* UEFI – The Unified Extensible Firmware Interface does not change the traditional purposes of the system BIOS. To a large extent, a UEFI-compliant BIOS performs the same initialization, boot, configuration, and management tasks as a traditional BIOS. However, UEFI does change the interfaces and data structures the BIOS uses to interact with I/O device firmware and operating system software. The primary intent of UEFI is to eliminate shortcomings in the traditional BIOS environment, enabling system firmware to continue scaling with industry trends.

The UEFI boot mode offers:

* Improved partitioning scheme for boot media

* Support for media larger than 2 TB

* Redundant partition tables

* Flexible handoff from BIOS to OS

* Consolidated firmware user interface

* Enhanced resource allocation for boot device firmware

The boot mode can be changed via the WSMAN vendor passthru interface as follows:

```
baremetal node passthru call <node> set_bios_config \
  --arg "BootMode=Uefi"

baremetal node passthru call <node> commit_bios_config \
  --arg "reboot=true"
```

```
baremetal node passthru call <node> set_bios_config \
  --arg "BootMode=Bios"

baremetal node passthru call <node> commit_bios_config \
  --arg "reboot=true"
```

## idrac-redfish

Through the `idrac-redfish` vendor passthru interface these methods are available:

| Method Name  | HTTP Method | Description                                                                                                                                            |
| ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| eject\_media | POST        | Eject a virtual media device. If no device is provided, all attached devices will be ejected. Optional argument: `boot_device` – cd, dvd, usb, floppy. |
