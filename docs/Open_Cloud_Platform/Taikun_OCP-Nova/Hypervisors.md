# **Hypervisors**

## **Kernel Virtual Machine**

KVM (for Kernel-based Virtual Machine) is a full virtualization solution for Linux on x86 hardware containing virtualization extensions (Intel VT or AMD-V). It consists of a loadable kernel module, kvm.ko, that provides the core virtualization infrastructure and a processor specific module, kvm-intel.ko or kvm-amd.ko.

Using KVM, one can run multiple virtual machines running unmodified Linux or Windows images. Each virtual machine has private virtualized hardware: a network card, disk, graphics adapter, etc.

KVM is open source software. The kernel component of KVM is included in mainline Linux, as of 2.6.20. The userspace component of KVM is included in mainline QEMU, as of 1.3.

Blogs from people active in KVM-related virtualization development are syndicated at [http://planet.virt-tools.org/](http://planet.virt-tools.org/)

KVM is configured as the default hypervisor for Compute.

The KVM hypervisor supports the following virtual machine image formats:

* Raw

* QEMU Copy-on-write (QCOW2)

* QED Qemu Enhanced Disk

* VMware virtual machine disk format (vmdk)

---

## **Configuration**

To enable KVM explicitly, add the following configuration options to the `/etc/nova/nova.conf` file:

```
[DEFAULT]
compute_driver = libvirt.LibvirtDriver

[libvirt] 
virt_type = kvm
```

---

## **Enable KVM**

The following sections outline how to enable KVM based hardware virtualization on different architectures and platforms. To perform these steps, you must be logged in as the `root` user.

### For x86-based systems

1\. To determine whether the `svm` or `vmx` CPU extensions are present, run this command:

```
grep -E 'svm|vmx' /proc/cpuinfo
```

This command generates output if the CPU is capable of hardware-virtualization. Even if output is shown, you might still need to enable virtualization in the system BIOS for full support.

If no output appears, consult your system documentation to ensure that your CPU and motherboard support hardware virtualization. Verify that any relevant hardware virtualization options are enabled in the system BIOS.

The BIOS for each manufacturer is different. If you must enable virtualization in the BIOS, look for an option containing the words `virtualization`, `VT`, `VMX`, or `SVM`.

2\. To list the loaded kernel modules and verify that the `kvm` modules are loaded, run this command:

```
lsmod | grep kvm
```

If the output includes `kvm_intel` or `kvm_amd`, the `kvm` hardware virtualization modules are loaded and your kernel meets the module requirements for OpenStack Compute.

If the output does not show that the `kvm` module is loaded, run this command to load it:

```
modprobe -a kvm
```

Run the command for your CPU. For Intel, run this command:

```
modprobe -a kvm-intel
```

For AMD, run this command:

```
modprobe -a kvm-amd
```

Because a KVM installation can change user group membership, you might need to log in again for changes to take effect.

If the kernel modules do not load automatically, use the procedures listed in these subsections.

If the checks indicate that required hardware virtualization support or kernel modules are disabled or unavailable, you must either enable this support on the system or find a system with this support.

!!! Note
	Some systems require that you enable VT support in the system BIOS. If you believe your processor supports hardware acceleration but the previous command did not produce output, reboot your machine, enter the system BIOS, and enable the VT option.

If KVM acceleration is not supported, configure Compute to use a different hypervisor, such as [QEMU](https://docs.openstack.org/nova/zed/admin/configuration/hypervisor-qemu.html#compute-qemu).

These procedures help you load the kernel modules for Intel-based and AMD-based processors if they do not load automatically during KVM installation.

**Intel-based processors**

If your compute host is Intel-based, run these commands as root to load the kernel modules:

```
modprobe kvm
modprobe kvm-intel
```

Add these lines to the `/etc/modules` file so that these modules load on reboot:

```
kvm
kvm-intel
```

**AMD-based processors**

If your compute host is AMD-based, run these commands as root to load the kernel modules:

```
modprobe kvm
modprobe kvm-amd
```

Add these lines to `/etc/modules` file so that these modules load on reboot:

```
kvm
kvm-amd
```

### For POWER-based systems

KVM as a hypervisor is supported on POWER system’s PowerNV platform.

1\. To determine if your POWER platform supports KVM based virtualization run the following command:

```
cat /proc/cpuinfo | grep PowerNV
```

If the previous command generates the following output, then CPU supports KVM based virtualization.

```
platform: PowerNV
```

If no output is displayed, then your POWER platform does not support KVM based hardware virtualization.

2\. To list the loaded kernel modules and verify that the `kvm` modules are loaded, run the following command:

```
lsmod | grep kvm
```

If the output includes `kvm_hv`, the `kvm` hardware virtualization modules are loaded and your kernel meets the module requirements for OpenStack Compute.

If the output does not show that the `kvm` module is loaded, run the following command to load it:

```
modprobe -a kvm
```

For PowerNV platform, run the following command:

```
modprobe -a kvm-hv
```

Because a KVM installation can change user group membership, you might need to log in again for changes to take effect.

---

## **Configure Compute backing storage**

Backing Storage is the storage used to provide the expanded operating system image, and any ephemeral storage. Inside the virtual machine, this is normally presented as two virtual hard disks (for example, `/dev/vda` and `/dev/vdb` respectively). However, inside OpenStack, this can be derived from one of these methods: `lvm`, `qcow`, `rbd` or `flat`, chosen using the [`libvirt.images_type`](https://docs.openstack.org/nova/zed/configuration/config.html#libvirt.images_type) option in `nova.conf` on the compute node.

??? Note
	The option `raw` is acceptable but deprecated in favor of `flat`. The Flat back end uses either raw or QCOW2 storage. It never uses a backing store, so when using QCOW2 it copies an image rather than creating an overlay. By default, it creates raw files but will use QCOW2 when creating a disk from a QCOW2 if [`force_raw_images`](https://docs.openstack.org/nova/zed/configuration/config.html#DEFAULT.force_raw_images) is not set in configuration.

QCOW is the default backing store. It uses a copy-on-write philosophy to delay allocation of storage until it is actually needed. This means that the space required for the backing of an image can be significantly less on the real disk than what seems available in the virtual machine operating system.

Flat creates files without any sort of file formatting, effectively creating files with the plain binary one would normally see on a real disk. This can increase performance, but means that the entire size of the virtual disk is reserved on the physical disk.

Local [LVM volumes](https://en.wikipedia.org/wiki/Logical_Volume_Manager_\(Linux\)) can also be used. Set the [`libvirt.images_volume_group`](https://docs.openstack.org/nova/zed/configuration/config.html#libvirt.images_volume_group) configuration option to the name of the LVM group you have created.

---

## **Direct download of images from Ceph**

When the Glance image service is set up with the Ceph backend and Nova is using a local ephemeral store (`[libvirt]/images_type!=rbd`), it is possible to configure Nova to download images directly into the local compute image cache.

With the following configuration, images are downloaded using the RBD export command instead of using the Glance HTTP API. In some situations, especially for very large images, this could be substantially faster and can improve the boot times of instances.

On the Glance API node in `glance-api.conf`:

```
[DEFAULT]
show_image_direct_url=true
```

On the Nova compute node in nova.conf:

```
[glance]

enable_rbd_download=true
rbd_user=glance
rbd_pool=images
rbd_ceph_conf=/etc/ceph/ceph.conf
rbd_connect_timeout=5
```

---

## **Nested guest support**

You may choose to enable support for nested guests — that is, allow your Nova instances to themselves run hardware-accelerated virtual machines with KVM. Doing so requires a module parameter on your KVM kernel module, and corresponding `nova.conf` settings.

### Host configuration

To enable nested KVM guests, your compute node must load the `kvm_intel` or `kvm_amd` module with `nested=1`. You can enable the `nested` parameter permanently, by creating a file named `/etc/modprobe.d/kvm.conf` and populating it with the following content:

```
options kvm_intel nested=1
options kvm_amd nested=1
```

A reboot may be required for the change to become effective.

### Nova configuration

To support nested guests, you must set your [`libvirt.cpu_mode`](https://docs.openstack.org/nova/zed/configuration/config.html#libvirt.cpu_mode) configuration to one of the following options:

**Host passthrough (`host-passthrough`)**

In this mode, nested virtualization is automatically enabled once the KVM kernel module is loaded with nesting support.

```
[libvirt]

cpu_mode = host-passthrough
```

However, do consider the other implications that [host passthrough](https://docs.openstack.org/nova/zed/admin/cpu-models.html) mode has on compute functionality.

**Host model (`host-model`)**

In this mode, nested virtualization is automatically enabled once the KVM kernel module is loaded with nesting support, **if** the matching CPU model exposes the `vmx` feature flag to guests by default (you can verify this with `virsh capabilities` on your compute node). If your CPU model does not pass in the `vmx` flag, you can force it with [`libvirt.cpu_model_extra_flags`](https://docs.openstack.org/nova/zed/configuration/config.html#libvirt.cpu_model_extra_flags):

```
[libvirt]
cpu_mode = host-model cpu_model_extra_flags = vmx
```

Again, consider the other implications that apply to the [host model](https://docs.openstack.org/nova/zed/admin/cpu-models.html) mode.

**Custom (`custom`)**

In custom mode, the same considerations apply as in host-model mode, but you may *additionally* want to ensure that libvirt passes not only the `vmx`, but also the `pcid` flag to its guests:

```
[libvirt]
cpu_mode = custom
cpu_models = IvyBridge
cpu_model_extra_flags = vmx,pcid
```

More information on CPU models can be found in [CPU models](https://docs.openstack.org/nova/zed/admin/cpu-models.html).

### Limitations

When enabling nested guests, you should be aware of (and inform your users about) certain limitations that are currently inherent to nested KVM virtualization. Most importantly, guests using nested virtualization will, *while nested guests are running*,

* fail to complete live migration;

* fail to resume from suspend.

See [the KVM documentation](https://www.linux-kvm.org/page/Nested_Guests#Limitations) for more information on these limitations.

---

## **KVM performance tweaks**

The [VHostNet](http://www.linux-kvm.org/page/VhostNet) kernel module improves network performance. To load the kernel module, run the following command as root:

```
modprobe vhost_net
```

---

## **Troubleshooting**

Trying to launch a new virtual machine instance fails with the `ERROR` state, and the following error appears in the `/var/log/nova/nova-compute.log` file:

```
libvirtError: internal error no supported architecture for os type 'hvm'
```

This message indicates that the KVM kernel modules were not loaded.

If you cannot start VMs after installation without rebooting, the permissions might not be set correctly. This can happen if you load the KVM module before you install `nova-compute`. To check whether the group is set to `kvm`, run:

```
ls -l /dev/kvm
```

If it is not set to `kvm`, run:

```
udevadm trigger
```

---

## **HW TPM2**

In Taikun OCP we use TPM2 tools to strengthen the security infrastructure. The Trusted Platform Module 2.0 (TPM2) plays a central role in ensuring the integrity and confidentiality of sensitive data within our ecosystem.

**Description**

tpm2(1) – Simplifying the installation process of tpm2-tools in initrd or embedded systems where optimizing size and managing limited resources are crucial. This means that a unified executable is available that is capable of executing various TPM2 functions based on the specified argument corresponding to one of the available tool names.
Subsequent options and arguments either pertain to common options or are specific to the chosen tool name.
It’s important that individual tools prefixed with ‘tpm2\_’ remain callable, but they are now symbolically linked to the ‘tpm2’ executable. Therefore, unlike BusyBox, the executable offers the individual tools’ complete functionality. For instance, ‘tpm2\_getrandom 8’ can alternatively be invoked as ‘tpm2.

---

## **Enabling TPM functionality in Taikun OCP**

Enabling Trusted Platform Module (TPM) functionality in Taikun OCP involves several steps, including hardware configuration and software setup:

**1. Ensure Hardware Support:** Verify that the server hardware used for Taikun OCP is equipped with a TPM chip that supports TPM2.0. Most modern server hardware should include TPM support, but it’s essential to confirm compatibility.

**2. Enable TPM in BIOS/UEFI:** Access the BIOS or UEFI settings of the server and enable TPM. The specific steps to do this vary depending on the server manufacturer and model. Look for options related to security or TPM in the BIOS/UEFI settings and ensure TPM is enabled.

**3. Install Required Software Packages:** Install the necessary software packages for TPM support in Taikun OCP. This may include TPM2-tools, which provide utilities and libraries for interacting with TPM devices.

**4. Configure TPM in Taikun OCP:** Once TPM support is enabled in the hardware and the required software packages are installed, configure Taikun OCP to utilize TPM. This typically involves setting up TPM-related options in the hypervisor configuration or management interface.

**5. Verify TPM Functionality:** After configuring TPM in Taikun OCP, verify that it is functioning correctly. This may involve running tests or commands provided by TPM2-tools to ensure that the TPM chip is detected and operational.

**6. Integrate TPM Features:** Depending on the specific use cases and security requirements, integrate TPM features into your virtualized environments running on Taikun OCP. This may include tasks such as enabling secure boot, attestation, key management, and encryption using TPM functionality.

By following these steps, you can enable TPM functionality in Taikun OCP, enhancing the security and integrity of your virtualized environments.
