# **Installing Taikun OCP Baremetal**

## **System Requirements**

Taikun OCP Baremetal is best installed on a fresh operating system. Debian (Ubuntu, Mint, etc.) and Fedora (RedHat, CentOS, Alma, Rocky, etc) distros have been tested. Taikun OCP Baremetal can also be installed on top of Kubernetes in TaikunCloudWorks. Other operating systems are supported but they have not yet been tested. If you are starting from scratch and don’t have a strong OS preference, the Taikun OCP Baremetal platform has been well-tested on both `ubuntu-22.04.03` and `debian12 (bookworm)`. However, any OS that can satisfy the installation requirements should work. We recommend a dedicated machine for the Taikun OCP Baremetal Platform, although it is not required. The Taikun OCP Baremetal installation process will not install any additional packages on your machine and all changes will be contained in the installation directory you choose during setup and the `/tmp` folder.

---

## **Software Requirements**

The Taikun OCP Baremetal installation requires: `git`, `docker`, `jq`, `yq`, `curl`, `sudo`, and `bash`.

1\. Install system packages. This may be different depending on your OS. Generally the names for these highly generic packages are standard across platforms

| OS           | Command                             |
| ------------ | ----------------------------------- |
| Debian-based | `apt install -y curl sudo bash git` |
| RedHat-based | `dnf install -y curl sudo bash git` |

2\. [Install Docker 1](https://docs.docker.com/engine/install/).

3\. [Install jq 1](https://stedolan.github.io/jq/download/).

| OS           | Command             |
| ------------ | ------------------- |
| Debian-based | `apt install -y jq` |
| RedHat-based | `dnf install -y jq` |

4. [Install yq 1](https://github.com/mikefarah/yq?tab=readme-ov-file#install).

```
sudo wget [https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64](https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64) -O /usr/bin/yq && sudo chmod +x /usr/bin/yq
```

---

## **Install Taikun OCP Baremetal**

After satisfying the System, Software, and License Requirements, you are ready to install Taikun OCP Baremetal! Run the following command to download and run the installer script. You will be prompted for a location to install Taikun OCP Baremetal.

```
curl -L -s [https://download.taikun.cloud.io/repository/filestore-external/mojo-installer/releases/latest/mojo-install](https://download.taikun.cloud.io/repository/filestore-external/mojo-installer/releases/latest/mojo-install) | sudo bash
```

---

## **Setup Taikun OCP Baremetal**

Setup is run automatically during installation. If for some reason the installation failed or you need to setup Taikun OCP Baremetal again, you can run the setup script manually. To run the setup script manually, change directories into your Taikun OCP Baremetal installation directory (default: `/opt/mojo`) and run the following command:

```
sudo ./mojo-setup
```

This will create a series of files in the `configs` directory and save any existing configuration in a backup folder for safe keeping.

---

## **Configure Taikun OCP Baremetal**

Basic configuration is done automatically during setup. The `configs/mojo.env` file contains the most recent Taikun OCP Baremetal configuration. You can choose to re-run the `./mojo-setup` script to update this file or you can edit it directly. Please be aware that any edits done manually to the file will be over-ridden the next time `./mojo-setup` is run and may not be compatible with the future releases of Taikun OCP Baremetal.

### SSL Certificates

Taikun OCP Baremetal will automatically generate self-signed SSL certificates for you. If you would like to use your own certificates replace the files in `configs/ssl/` with your own. The files should be named `cert.crt` and `cert.key`.

---

## **Run Taikun OCP Baremetal**

When you are ready to run Taikun OCP Baremetal for the first time, execute the following command:

```
sudo ./mojo-launcher start mojo --update
```

This may take some time as it downloads all of the supporting Taikun OCP Baremetal Docker images. Once complete, you should be able to access Taikun OCP Baremetal at the hostname you configured Taikun OCP Baremetal with.

If Taikun OCP Baremetal is operating as expected with your hardware profile and you do not need any updates, you can start Taikun OCP Baremetal without updating it by executing the same command without the `--update` flag. This is the recommended way to re-start Taikun OCP Baremetal after it has been stopped or the hardware Taikun OCP Baremetal was installed to is restarted.

```
sudo ./mojo-launcher start mojo
```

---

## **Update Taikun OCP Baremetal**

If you want to update the version of Taikun OCP Baremetal you are running, execute the following command:

```
sudo ./mojo-launcher update mojo
```

This will not bring down your Taikun OCP Baremetal instance, it will only update the backing Docker images. You will need to stop and start Taikun OCP Baremetal manually for the updated images to take effect. Sometimes updates can take some time to migrate data or other platform features. Please be patient when updating the Taikun OCP Baremetal Platform.

---

## **Stop Taikun OCP Baremetal**

If you want to stop the Taikun OCP Baremetal platform, execute the following command:

```
sudo ./mojo-launcher stop mojo
```

All persistent data required to re-launch Taikun OCP Baremetal is present in the installation directory and you can relaunch Taikun OCP Baremetal at any time as long as the installation directory remains intact.
