# **Launch Virtual Machines (Instances)**

Instances are virtual machines that run inside the cloud. You can launch an instance from the following sources:

* Images uploaded to the Image service.

* Image that you have copied to a persistent volume. The instance launches from the volume, which is provided by the `cinder-volume` API through iSCSI.

* Instance snapshot that you took.

---

## **Launch an instance**

1. Log in to the dashboard.

2. Select the appropriate project from the drop down menu at the top left.

3. On the Project tab, open the Compute tab and click Instances category.The dashboard shows the instances with its name, its private and floating IP addresses, size, status, task, power state, and so on.

4. Click Launch Instance.

5. In the Launch Instance dialog box, specify the following values:Details tabInstance NameAssign a name to the virtual machine.

??? Note
	The name you assign here becomes the initial host name of the server. If the name is longer than 63 characters, the Compute service truncates it automatically to ensure dnsmasq works correctly.
	
	- After the server is built, if you change the server name in the API or change the host name directly, the names are not updated in the dashboard.

	- Server names are not guaranteed to be unique when created so you could have two instances with the same host name.

### Description

You can assign a brief description of the virtual machine.Availability Zone

By default, this value is set to the availability zone given by the cloud provider (for example, `us-west` or `apac-south`). For some cases, it could be `nova`.Count

To launch multiple instances, enter a value greater than `1`. The default is `1`.

Source tabInstance Boot Source

Your options are:Boot from image

If you choose this option, a new field for Image Name displays. You can select the image from the list.Boot from snapshot

If you choose this option, a new field for Instance Snapshot displays. You can select the snapshot from the list.Boot from volume

If you choose this option, a new field for Volume displays. You can select the volume from the list.Boot from image (creates a new volume)

With this option, you can boot from an image and create a volume by entering the Device Size and Device Name for your volume. Click the Delete Volume on Instance Delete option to delete the volume on deleting the instance.Boot from volume snapshot (creates a new volume)

Using this option, you can boot from a volume snapshot and create a new volume by choosing Volume Snapshot from a list and adding a Device Name for your volume. Click the Delete Volume on Instance Delete option to delete the volume on deleting the instance.Image Name

This field changes based on your previous selection. If you have chosen to launch an instance using an image, the Image Name field displays. Select the image name from the dropdown list.Instance Snapshot

This field changes based on your previous selection. If you have chosen to launch an instance using a snapshot, the Instance Snapshot field displays. Select the snapshot name from the dropdown list.Volume

This field changes based on your previous selection. If you have chosen to launch an instance using a volume, the Volume field displays. Select the volume name from the dropdown list. If you want to delete the volume on instance delete, check the Delete Volume on Instance Delete option.

Flavor tabFlavor

Specify the size of the instance to launch.

??? Note
	The flavor is selected based on the size of the image selected for launching an instance. For example, while creating an image, if you have entered the value in the Minimum RAM (MB) field as 2048, then on selecting the image, the default flavor is `m1.small`.

	1) Networks tabSelected NetworksTo add a network to the instance, click the + in the Available field.Network Ports tabPortsActivate the ports that you want to assign to the instance.Security Groups tabSecurity GroupsActivate the security groups that you want to assign to the instance.Security groups are a kind of cloud firewall that define which incoming network traffic is forwarded to instances.If you have not created any security groups, you can assign only the default security group to the instance.Key Pair tabKey PairSpecify a key pair.If the image uses a static root password or a static key set (neither is recommended), you do not need to provide a key pair to launch the instance.Configuration tabCustomization Script SourceSpecify a customization script that runs after your instance launches.Metadata tabAvailable MetadataAdd Metadata items to your instance.

	2) Click Launch Instance.The instance starts on a compute node in the cloud.

!!! Note
	If you did not provide a key pair, security groups, or rules, users can access the instance only from inside the cloud through VNC. Even pinging the instance is not possible without an ICMP rule configured.

You can also launch an instance from the Images or Volumes category when you launch an instance from an image or a volume respectively.

When you launch an instance from an image, OpenStack creates a local copy of the image on the compute node where the instance starts.

For details on creating images, see [Creating images manually](https://docs.openstack.org/image-guide/create-images-manually.html) in the *OpenStack Virtual Machine Image Guide*.

When you launch an instance from a volume, note the following steps:

* To select the volume from which to launch, launch an instance from an arbitrary image on the volume. The arbitrary image that you select does not boot. Instead, it is replaced by the image on the volume that you choose in the next steps.To boot a Xen image from a volume, the image you launch in must be the same type, fully virtualized or paravirtualized, as the one on the volume.

* Select the volume or volume snapshot from which to boot. Enter a device name. Enter `vda` for KVM images or `xvda` for Xen images.

!!! Note
	When running QEMU without support for the hardware virtualization, set `cpu_mode="none"` alongside `virt_type=qemu` in `/etc/nova/nova-compute.conf` to solve the following error:

```
libvirtError: unsupported configuration: CPU mode 'host-model'
for ``x86_64`` qemu domain on ``x86_64`` host is not supported by hypervisor
```

---

## **Connect to your instance by using SSH**

To use SSH to connect to your instance, use the downloaded keypair file.

!!! Note
	The user name is `ubuntu` for the Ubuntu cloud images on TryStack.

1. Copy the IP address for your instance.

2. Use the **ssh** command to make a secure connection to the instance. For example:

```
$ ssh -i MyKey.pem ubuntu@10.0.0.2
```

1. At the prompt, type `yes`.

It is also possible to SSH into an instance without an SSH keypair, if the administrator has enabled root password injection. For more information about root password injection, see [Injecting the administrator password](https://docs.openstack.org/nova/latest/admin/admin-password-injection.html) in the *OpenStack Administrator Guide*.

---

## **Track usage for instances**

You can track usage for instances for each project. You can track costs per month by showing meters like number of vCPUs, disks, RAM, and uptime for all your instances.

1. Log in to the dashboard.

2. Select the appropriate project from the drop down menu at the top left.

3. On the Project tab, open the Compute tab and click Overview category.

4. To query the instance usage for a month, select a month and click Submit.

5. To download a summary, click Download CSV Summary.

### Create an instance snapshot

1. Log in to the dashboard.

2. Select the appropriate project from the drop down menu at the top left.

3. On the Project tab, open the Compute tab and click the Instances category.

4. Select the instance from which to create a snapshot.

5. In the actions column, click Create Snapshot.

6. In the Create Snapshot dialog box, enter a name for the snapshot, and click Create Snapshot.The Images category shows the instance snapshot.

To launch an instance from the snapshot, select the snapshot and click Launch. Proceed with launching an instance.

### Manage an instance

1. Log in to the dashboard.

2. Select the appropriate project from the drop down menu at the top left.

3. On the Project tab, open the Compute tab and click Instances category.

4. Select an instance.

5. In the menu list in the actions column, select the state.You can resize or rebuild an instance. You can also choose to view the instance console log, edit instance or the security groups. Depending on the current state of the instance, you can pause, resume, suspend, soft or hard reboot, or terminate it.
