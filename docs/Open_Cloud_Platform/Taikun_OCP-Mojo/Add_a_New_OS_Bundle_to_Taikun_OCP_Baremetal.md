# **Add a New OS Bundle to Taikun OCP Baremetal**

OS Bundles are collections of operating system installation files, checksums, kickstart/preseed/cloud-init files, and metadata that allow Taikun OCP Baremetal to provision servers with a specific operation system.

This tutorial walks through how to add a new operating system into Taikun OCP Baremetal so it can be used to provision servers within the Taikun OCP Baremetal Platform.

---

## **Getting Started**

Before you begin, you must have an OS Bundle in mind to install. This can be prepared and distributed by taikun.cloud or created manually by you.

### Available Bundles

The following OS Bundles are available from taikun.cloud. Input the values from this table into the `./mojo-manage --os-image` command. OS Bundles are organized by `name` and `version`. The combination of these two fields is unique within the Taikun OCP Baremetal Platform.

| Name   | Version    | Architecture |
|--------|------------|--------------|
| Ubuntu | 22.04.03   | x64          |
| RHEL   | 8.8-net    | x64          |
| RHEL   | 9.2-net    | x64          |

## Running

You can upload a new OS Bundle by executing the following command *inside of your Taikun OCP Baremetal installation directory* and following the prompts.

```
sudo ./mojo-manage --os-image
```

In order to add a new OS Bundle, **the Taikun OCP Baremetal platform needs to be running**.

### Enter the OS Bundle `name`

The `name` field does not need to be equal to the operating system’s distribution name, it can be anything you would like it to be. In these examples they are the same (distro: `ubuntu`, name: `ubuntu`).

```
Name? [ubuntu]: ubuntu
```

### Enter the OS Bundle `version`

The `version` field does not need to be equal to the operating system’s version, it can be anything you would like it to be. In these examples they are the same (os-version: `22.04.03`, mojo-version: `22.04.03`).

```
Version? [22.04.03]: 22.04.03
```

### Enter the Architecture

The Architecture field is optional and only has an effect on the default URL to download an OS Bundle at. Taikun OCP Baremetal supports any architecture for its OS Bundles as long as it can PXE boot.

```
Architecture? [x64]: x64
```

### Add or Edit the Download URL

By convention, when receiving an OS Bundle from taikun.cloud, the URL will be organized with the `name`, `version`, and maybe the `architecture`. These fields are combine into a URL that is presented as the default for this field. If you are downloading an OS Bundle from taikun.cloud and were given a `name` and `version` to input, you should not change this field. If you have created your own OS Bundle, you will want to point this field to a URL with your downloadable OS Bundle.

```
Download URL? [https://download.taikun.cloud.io/repository/osimages-internal/images/ubuntu/22.04.03/ubuntu-22.04.03.tar.gz]:
```

### Edit Boot Menu Keyword

This field can be `kernel` or `chain`. If you don’t know what this should be, leave it set to the default of `kernel`

```
Boot Menu Keyword? [kernel]:
```

### Edit Location

Some OS Images (Live CDs) can PXE boot directly from an ISO image. If that is the case for your OS Bundle, enter the filename of the file to boot from in this field. Typically this will not be populated.

```
If your OS boots directly from an ISO and not an installation directory, enter the filename here. Location? []:
```

### Installing OS Bundle

The script will then download and install your OS Bundle if it was found at the configured URL.

```
Configured to add or update the following OS Image...
Name:         ubuntu
Version:      22.04.03
Arch:         x64
URL:          https://download.taikun.cloud.io/repository/osimages-internal/images/ubuntu/22.04.03/ubuntu-22.04.03.tar.gz
Boot Keyword: kernel
Location:

Downloading https://download.taikun.cloud.io/repository/osimages-internal/images/ubuntu/22.04.03/ubuntu-22.04.03.tar.gz...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 2141M  100 2141M    0     0  21.4M      0  0:01:40  0:01:40 --:--:-- 28.3M

Extracting to volumes/osimages/ubuntu/22.04.03...
boot/
boot/initrd
boot/boot.ipxe
boot/bootx64.efi
boot/vmlinuz
iso/
iso/ubuntu-22.04.03-mojo-amd64.iso
mojo/
mojo/default.init

Configuring Mojo with new OS...
Id 1.

Adding default customization template...
[+] Copying 1/0
 ✔ mojo-app-1 copy volumes/osimages/ubuntu/22.04.03/mojo/default.init to mojo-app-1:/tmp/default_mojo_ubuntu_22.04.03.init Copied 0.0s
```
