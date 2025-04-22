# **Supported OS Images**

| Guest                   | Guest Bitness | Host Version        | Host CPU  | Host Bitness | Status    |    |
| ----------------------- | ------------- | ------------------- | --------- | ------------ | --------- | :- |
| Ubuntu (LTS)            | 64-bit        | Ubuntu 22.04        | Intel/AMD | 64-bit       | Supported |    |
| Ubuntu (LTS)            | 64-bit        | Ubuntu 20.04        | Intel/AMD | 64-bit       | Supported |    |
| Ubuntu (LTS)            | 64-bit        | Ubuntu 18.04        | Intel/AMD | 64-bit       | Supported |    |
| Debian                  | 64-bit        | Debian 11           | Intel/AMD | 64-bit       | Supported |    |
| Debian                  | 64-bit        | Debian 10           | Intel/AMD | 64-bit       | Supported |    |
| Debian                  | 64-bit        | Debian 9            | Intel/AMD | 64-bit       | Supported |    |
| Oracle Linux Enterprise | 64-bit        | OEL 8               | Intel/AMD | 64-bit       | Supported |    |
| Oracle Linux Enterprise | 64-bit        | OEL 7               | Intel/AMD | 64-bit       | Supported |    |
| Oracle Linux Enterprise | 64-bit        | OEL 6               | Intel/AMD | 64-bit       | Supported |    |
| Windows Server          | 64-bit        | Windows Server 2022 | Intel/AMD | 64-bit       | Supported |    |
| Windows Server          | 64-bit        | Windows Server 2019 | Intel/AMD | 64-bit       | Supported |    |
| Windows Server          | 64-bit        | Windows Server 2016 | Intel/AMD | 64-bit       | Supported |    |
| RedHat Enterprise Linux | 64-bit        | RHEL 8              | Intel/AMD | 64-bit       | Supported |    |
| RedHat Enterprise Linux | 64-bit        | RHEL 7              | Intel/AMD | 64-bit       | Supported |    |
| RedHat Enterprise Linux | 64-bit        |                     | Intel/AMD | 64-bit       | Supported |    |

!!! Note
	All OS versions newer than the ones listed in the tables below are supported by the KVM.

---

## **Windows Family**

| Guest                                         | Guest bitness | Host version                                                | Host CPU   | Host bitness | Status     |
| --------------------------------------------- | ------------- | ----------------------------------------------------------- | ---------- | ------------ | ---------- |
| Windows Small Business Server 2011            | 64            | qemu-kvm-0.12.1.2-2.355.0.1.el6.centos.2                    | Intel      | 64           | Integrated |
| Windows 2012 R2 Standard                      | 64            | qemu-kvm.x86\_64 10:1.5.3-60.el7\_0.5                       | Intel      | 64           | Integrated |
| Windows 2012 Standard 180-days Evaluation     | 64            | qemu-kvm-0.12.1.2-2.295.el6                                 | Intel      | 64           | Integrated |
| Windows 2008 Essential Business Server        | 64            | qemu-kvm-0.11.0                                             | AMD        | 64           | Integrated |
| Windows 2008 Small Business Server            | 64            | qemu-kvm-0.11.0                                             | AMD        | 64           | Integrated |
| Windows 2008 Standard                         | 64            | qemu-kvm-0.11.0                                             | AMD        | 64           | Integrated |
| Windows 2008 Standard                         | 32            | qemu-kvm-0.11.0                                             | Intel      | 32           | Integrated |
| Windows 2008 R2 RTM                           | 64            | kvm-88                                                      | Intel      | 64           | Integrated |
| Windows 2008 R2 Standard                      | 64            | qemu-kvm-0.12.5                                             | Intel      | 64           | Integrated |
| Windows 2008 R2 Datacenter                    | 64            | qemu-kvm-0.12.5                                             | Intel      | 64           | Integrated |
| Windows 10 Technical Preview for Enterprise   | 64            | qemu-kvm-1.1.2                                              | AMD        | 64           | Integrated |
| Windows 10 Professional build 10240 (release) | 64            | qemu-kvm-2.3.0                                              | Intel      | 64           | Integrated |
| Windows 8 Enterprise                          | 64            | qemu-kvm-devel-1.1.92 3.7.0-rc2                             | AMD        | 64           | Integrated |
| Windows 7 Professional (Final)                | 64            | qemu-kvm-0.12.1.2-1 ARCH-2.6.32                             | AMD        | 64           | Integrated |
| Windows 7 RTM                                 | 32, 64        | kvm-88                                                      | Intel      | 64           | Integrated |
| Windows 7 RC                                  | 64            | kvm-72+dfsg-5                                               | Intel      | 64           | Integrated |
| Windows 7 Beta                                | 64            | kvm-84                                                      | AMD        | 64           | Integrated |
| Windows 7 Beta                                | 32            | kvm-83                                                      | Intel      | 32           | Integrated |
| Windows 7 Beta                                | 32            | kvm-62                                                      | AMD        | 64           | Integrated |
| Windows Server 2008 (Datacenter)              | 64            | kvm-72                                                      | Intel, AMD | 64           | Integrated |
| Windows Server 2008 (Datacenter)              | 32            | kvm-72                                                      | Intel, AMD | 64, 32       | Integrated |
| Windows Vista Ultimate                        | 64            | kvm-84                                                      | Intel, AMD | 64           | Integrated |
| Windows Vista Ultimate                        | 32            | kvm-84                                                      | Intel, AMD | 64, 32       | Integrated |
| Windows Server 2003 R2 (Std)                  | 32            | qemu-kvm-0.11.1                                             | Intel      | 64           | Integrated |
| Windows Server 2003 R2 (Std)                  | 32            | qemu-kvm-0.13                                               | Intel      | 64           | Integrated |
| Windows Server 2003 x64                       | 64            | qemu-kvm-0.13                                               | Intel, AMD | 64           | Integrated |
| Windows Server 2003 x64                       | 64            | kvm-72                                                      | Intel, AMD | 64           | Integrated |
| Windows Server 2003 (Enterprise)              | 32            | kvm-72                                                      | Intel      | 32, 64       | Integrated |
| Windows Server 2003 (Enterprise)              | 32            | kvm-72                                                      | AMD        | 64           | Integrated |
| Windows XP Pro x64                            | 64            | kvm-72                                                      | Intel, AMD | 64           | Integrated |
| Windows XP Pro                                | 32            | kvm-72                                                      | Intel      | 32, 64       | Integrated |
| Windows XP Pro                                | 32            | qemu-kvm-0.11.0                                             | AMD        | 64           | Integrated |
| Windows XP Pro                                | 32            | qemu-kvm-0.12.1.2-2.415; kernel 2.6.32-358.23.2, CentOS 6.5 | Intel      | 64           | Integrated |
| Windows XP Pro                                | 32            | kvm-72                                                      | AMD        | 64           | Integrated |
| Windows 2000 Pro (SP4)                        | 32            | kvm-64                                                      | Intel, AMD | 64           | Integrated |
| Windows 2000 Pro (SP4)                        | 32            | kvm-64                                                      | Intel      | 32           | Integrated |
| Windows 2000 Advanced Server                  | 32            | kvm-44                                                      | Intel      | 64           | Integrated |
| Windows NT Server 4.0 sp 1                    | 32            | kvm-72, 2.6.30                                              | Intel      | 64           | Integrated |
| Windows NT Workstation 4.0 (no SP)            | 32            | qemu-kvm 0.12.3, 2.6.33                                     | AMD        | 64           | Integrated |
| Windows NT 4.0 SP6                            | 32            | kvm 1.0, 2.6.32                                             | Intel      | 64           | Integrated |
| Windows NT 4.0 SP6                            | 32            | qemu-kvm 1.4.1, 2.6.32                                      | Intel      | 64           | Integrated |

---

## **Linux Family: Fedora/RedHat Derivatives**

### CentOS

| Guest      | Guest bitness | Host version                                                | Host CPU          | Host bitness | Status     |
| ---------- | ------------- | ----------------------------------------------------------- | ----------------- | ------------ | ---------- |
| CentOS 6.5 | 64            | CentOS 6.5, qemu-kvm-0.12.1.2-2.415, kernel 2.6.32-358.23.2 | Intel             | 64           | Integrated |
| CentOS 6.2 | 32, 64        | 0.14.1+noroms-0ubuntu6.2                                    | Intel, AMD        | 32, 64       | Integrated |
| CentOS 6.1 | 32, 64        | 0.14.1+noroms-0ubuntu6.2                                    | Intel, AMD        | 32, 64       | Integrated |
| CentOS 6.0 | 64            | kvm-83                                                      | Intel             | 64           | Integrated |
| CentOS 5.8 | 32            | qemu-kvm-0.12.1.2-2.295.el6                                 | Intel             | 64           | Integrated |
| CentOS 5.6 | 64            | kvm-83                                                      | Intel             | 64           | Integrated |
| CentOS 5.5 | 64            | kvm-83-164.el5.x86\_64.rpm                                  | AMD (Sempron 140) | 64           | Integrated |
| CentOS 5.5 | 32            | qemu-kvm-0.12.1.2-2.295.el6                                 | Intel             | 64           | Integrated |

### Enterprise Linux

| Guest                                    | Guest bitness | Host version | Host CPU | Host bitness | Status     |
| ---------------------------------------- | ------------- | ------------ | -------- | ------------ | ---------- |
| Enterprise Linux 5.4 / Unbreakable Linux | 64            | kvm-83       | Intel    | 64           | Integrated |

### Fedora

| Guest     | Guest bitness | Host version                      | Host CPU   | Host bitness | Status     |
| --------- | ------------- | --------------------------------- | ---------- | ------------ | ---------- |
| Fedora 18 | 32, 64        | qemu-kvm 0.14.1+noroms-0ubuntu6.2 | Intel, AMD | 32, 64       | Integrated |
| Fedora 17 | 32, 64        | qemu-kvm 0.14.1+noroms-0ubuntu6.2 | Intel, AMD | 32, 64       | Integrated |
| Fedora 16 | 32, 64        | qemu-kvm 0.14.1+noroms-0ubuntu6.2 | Intel, AMD | 32, 64       | Integrated |
| Fedora 15 | 64            | kvm-83                            | Intel      | 64           | Integrated |
| Fedora 13 | 64            | kvm-83                            | Intel      | 64           | Integrated |
| Fedora 11 | 32            | kvm-87                            | Intel      | 64           | Integrated |
| Fedora 10 | 32, 64        | kvm-85                            | Intel, AMD | 64           | Integrated |
| Fedora 9  | 32, 64        | kvm-85                            | Intel, AMD | 64           | Integrated |
| Fedora 8  | 32, 64        | kvm-85                            | Intel, AMD | 64           | Integrated |
| Fedora 7  | 32, 64        | kvm-75                            | Intel, AMD | 64           | Integrated |
| Fedora 6  | 32            | kvm-26                            | Intel, AMD | 32, 64       | Integrated |
| Fedora 5  | 32, 64        | kvm-12                            | Intel, AMD | 32, 64       | Integrated |
| Fedora 3  | 64            | kvm-78                            | AMD        | 64           | Integrated |
| Fedora 1  | 32            | qemu-kvm-0.11.1                   | Intel      | 64           | Integrated |

### RedHat Enterprise Linux

| Guest             | Guest bitness | Host version | Host CPU   | Host bitness | Status     |
| ----------------- | ------------- | ------------ | ---------- | ------------ | ---------- |
| RHEL6 beta        | 64            | kvm-83       | Intel      | 64           | Integrated |
| RHEL5             | 32, 64        | kvm-85       | Intel, AMD | 64           | Integrated |
| RHEL4             | 32, 64        | kvm-85       | Intel, AMD | 64           | Integrated |
| RHEL3             | 32, 64        | kvm-85       | Intel, AMD | 64           | Integrated |
| Red Hat Linux 9   | 32            | kvm-51       | Intel      | 64           | Integrated |
| Red Hat Linux 7.3 | 32            | kvm-78       | AMD        | 64           | Integrated |

### Scientific Linux

| Guest                  | Guest bitness | Host version | Host CPU | Host bitness | Status     |
| ---------------------- | ------------- | ------------ | -------- | ------------ | ---------- |
| Scientific Linux 5.4.1 | 64            | kvm-83       | Intel    | 64           | Integrated |

### Trixbox

| Guest            | Guest bitness | Host version | Host CPU | Host bitness | Status     |
| ---------------- | ------------- | ------------ | -------- | ------------ | ---------- |
| Trixbox (CentOS) | 32            | kvm-12       | Intel    | 64           | Integrated |

---

## **Linux Family: Ubuntu/Debian Derivatives**

### Debian GNU/Linux

| Guest                                    | Guest bitness | Host version                      | Host CPU   | Host bitness | Status     |
| ---------------------------------------- | ------------- | --------------------------------- | ---------- | ------------ | ---------- |
| Debian GNU/Linux 7.0 beta (Kernel 3.4.4) | 32, 64        | qemu-kvm 0.14.1+noroms-0ubuntu6.2 | Intel, AMD | 32, 64       | Integrated |
| Debian GNU/Linux 6.0                     | 64            | kvm-83                            | Intel      | 64           | Integrated |
| Debian GNU/Linux 5.0                     | 64            | kvm-88                            | Intel, AMD | 64           | Integrated |
| Debian GNU/Linux 5.0                     | 64            | kvm-83                            | Intel      | 64           | Integrated |
| Debian Lenny 5.0                         | 64            | qemu-kvm-0.12.3                   | Intel      | 64           | Integrated |
| Debian Lenny 5.0                         | 64            | qemu-kvm-0.11.1                   | Intel      | 64           | Integrated |
| Debian Lenny 5.0                         | 32, 64        | kvm-72/77                         | Intel      | 64           | Integrated |
| Debian Etch 4.0                          | 64            | kvm-72                            | Intel, AMD | 64           | Integrated |
| Debian Etch 4.0                          | 32            | kvm-64                            | Intel      | 64, 32       | Integrated |
| Debian Sarge 3.1                         | 32            | kvm-12                            | Intel      | 32           | Integrated |

### Ubuntu

| Guest                  | Guest bitness | Host version                      | Host CPU   | Host bitness | Status     |
| ---------------------- | ------------- | --------------------------------- | ---------- | ------------ | ---------- |
| Ubuntu 12.10           | 32, 64        | qemu-kvm 0.14.1+noroms-0ubuntu6.2 | Intel, AMD | 32, 64       | Integrated |
| Ubuntu 12.04           | 32, 64        | qemu-kvm 0.14.1+noroms-0ubuntu6.2 | Intel, AMD | 32, 64       | Integrated |
| Ubuntu 11.10           | 32, 64        | qemu-kvm 0.14.1+noroms-0ubuntu6.2 | Intel, AMD | 32, 64       | Integrated |
| Ubuntu 11.04           | 32, 64        | qemu-kvm 0.14.1+noroms-0ubuntu6.2 | Intel, AMD | 32, 64       | Integrated |
| Ubuntu 10.10           | 64            | kvm-83                            | Intel, AMD | 64           | Integrated |
| Ubuntu 10.04 LTS       | 32, 64        | kvm-84                            | Intel, AMD | 64           | Integrated |
| Ubuntu 9.04            | 64            | kvm-84                            | Intel      | 64           | Integrated |
| Ubuntu 8.10            | 32            | kvm-85                            | Intel, AMD | 32, 64       | Integrated |
| Ubuntu 8.04 LTS        | 32, 64        | kvm-64                            | Intel, AMD | 32, 64       | Integrated |
| Ubuntu 7.10 Server     | 64            | kvm-60                            | AMD        | 64           | Integrated |
| Ubuntu 6.06 LTS Server | 32            | kvm-20                            | Intel      | 32           | Integrated |

### Xandros

| Guest         | Guest bitness | Host version | Host CPU | Host bitness | Status     |
| ------------- | ------------- | ------------ | -------- | ------------ | ---------- |
| Xandros 3 OCE | 32            | kvm-29       | Intel    | 64           | Integrated |

### Knoppix

| Guest         | Guest bitness | Host version | Host CPU | Host bitness | Status     |
| ------------- | ------------- | ------------ | -------- | ------------ | ---------- |
| KNOPPIX 5.1.1 | 32            | kvm-18       | Intel    | 64           | Integrated |
| Knoppix 5.2   | 32            | kvm-18       | Intel    | 32           | Integrated |
| Knoppix 6.2   | 32            | kvm-1.12.5   | AMD      | 32, 64       | Integrated |
| Knoppix 6.7.1 | 32            | kvm-1.12.5   | AMD      | 32, 64       | Integrated |

---

## **Other Linux Distros**

### Android

| Guest       | Guest bitness | Host version | Host CPU | Host bitness | Status     |
| ----------- | ------------- | ------------ | -------- | ------------ | ---------- |
| Android 2.2 | 32            | kvm-83       | Intel    | 64           | Integrated |

### SUSE Linux Enterprise Server

| Guest                           | Guest bitness | Host version | Host CPU   | Host bitness | Status     |
| ------------------------------- | ------------- | ------------ | ---------- | ------------ | ---------- |
| SUSE Linux Enterprise Server 11 | 32, 64        | kvm-88       | Intel, AMD | 64           | Integrated |
| SUSE Linux Enterprise Server 10 | 32            | kvm-88       | Intel, AMD | 64           | Integrated |

### openSUSE

| Guest          | Guest bitness | Host version | Host CPU   | Host bitness | Status     |
| -------------- | ------------- | ------------ | ---------- | ------------ | ---------- |
| openSUSE 11.3  | 64            | kvm-83       | Intel      | 64           | Integrated |
| openSUSE 11.2  | 64            | kvm-83       | Intel      | 64           | Integrated |
| openSUSE 11.1  | 32, 64        | kvm-88       | Intel, AMD | 64           | Integrated |
| openSUSE 11.1  | 32, 64        | kvm-85       | Intel, AMD | 64           | Integrated |
| openSUSE 11.0  | 32, 64        | kvm-85       | Intel, AMD | 64           | Integrated |
| openSUSE 10.3  | 32            | kvm-57       | AMD        | 64           | Integrated |
| SUSE Linux 9.1 | 32            | kvm-72       | Intel/AMD  | 64, 32       | Integrated |

### Slackware

| Guest          | Guest bitness | Host version | Host CPU | Host bitness | Status     |
| -------------- | ------------- | ------------ | -------- | ------------ | ---------- |
| Slackware 12.2 | 32            | kvm-36       | Intel    | 32           | Integrated |
| Slackware 12   | 32            | kvm-36       | Intel    | 32           | Integrated |
| Slackware 11   | 32            | kvm-15       | Intel    | 64           | Integrated |

### Qemu-Puppy

| Guest             | Guest bitness | Host version | Host CPU | Host bitness | Status     |
| ----------------- | ------------- | ------------ | -------- | ------------ | ---------- |
| Qemu-Puppy 2.01-3 | 32            | kvm-17/18    | Intel    | 32           | Integrated |
| Qemu-Puppy 2.13-1 | 32            | kvm-17/18    | Intel    | 32           | Integrated |

### SystemRescueCD

| Guest                | Guest bitness | Host version | Host CPU | Host bitness | Status     |
| -------------------- | ------------- | ------------ | -------- | ------------ | ---------- |
| SystemRescueCD 0.3.4 | 32            | kvm-18       | Intel    | 64           | Integrated |

### Gentoo 

| Guest             | Guest bitness | Host version    | Host cpu | Host bitness | Status     |
|-------------------|---------------|-----------------|----------|--------------|------------|
| Gentoo 2006.1     | 32            | kvm-24          | Intel    | 64           | Integrated |
| Gentoo 2007.0     | 32            | kvm-24          | Intel    | 64           | Integrated |
| Gentoo 20100311   | 64            | qemu-kvm-0.11.1 | Intel    | 64           | Integrated |

### Arch Linux 

| Guest                | Guest bitness | Host version | Host cpu | Host bitness | Status     |
|----------------------|---------------|--------------|----------|--------------|------------|
| Arch Linux (Duke)    | 32            | kvm-17       | AMD      | 64           | Integrated |

### Mandrake Linux 

| Guest               | Guest bitness | Host version | Host cpu | Host bitness | Status     |
|---------------------|---------------|--------------|----------|--------------|------------|
| Mandrake Linux 9.2  | 32            | kvm-51       | Intel    | 64           | Integrated |

### Crux Linux 

| Guest               | Guest bitness | Host version | Host cpu | Host bitness | Status     |
|---------------------|---------------|--------------|----------|--------------|------------|
| Crux Linux 2.5      | 32            | kvm-82       | Intel    | 32           | Integrated |

### Mikrotik 

| Guest               | Guest bitness | Host version   | Host cpu | Host bitness | Status     |
|---------------------|---------------|----------------|----------|--------------|------------|
| Mikrotik 5.0rc3     | 32            | qemu-kvm-0.13.0| Intel    | 64           | Integrated |

---

## **UNIX Family: BSD**

### OpenBSD

| Guest                      | Guest bitness | Host version                                      | Host cpu                | Host bitness | Status     |
|----------------------------|---------------|---------------------------------------------------|-------------------------|--------------|------------|
| OpenBSD 5.5/5.6            | 32            | qemu 1.7                                          | Intel with flexpriority | 32/64        | Integrated |
| OpenBSD 5.5/5.6            | 64            | qemu 1.7                                          | Intel+AMD               | 64           | Integrated |
| OpenBSD 5.2 (prerelease)   | 32            | qemu-kvm-1.0+noroms-0ubuntu14.1                   | Intel Core2 6400        | 64           | Integrated |
| OpenBSD 5.2 (prerelease)   | 64            | qemu-kvm-1.0+noroms-0ubuntu14.1                   | Intel Core2 6400        | 64           | Integrated |
| OpenBSD 5.0                | 64            | qemu-kvm-0.15.0, Linux 2.6.37.6 (Slackware 13.37) | Intel Core2Duo E8400    | 64           | Integrated |
| OpenBSD 4.9                | 64            | qemu-kvm-0.14, linux 2.6.38.4 (Fedora 15 Beta)    | AMD Phenom(tm) 9650 Quad-Core | 64       | Integrated |
| OpenBSD 4.8                | 32            | kvm-83, linux 2.6.18 (CentOS 5.5)                 | Intel E5700             | 64           | Integrated |
| OpenBSD 4.7                | 64            | qemu-kvm-0.12.5                                   | Intel                   | 64           | Integrated |
| OpenBSD 4.6                | 32, 64        | qemu-kvm-0.11.0-0ubuntu6.3                       | Intel                   | 64           | Integrated |
| OpenBSD 4.6                | 32            | kvm-84-7.6                                        | AMD                     | 32           | Integrated |
| OpenBSD 4.5                | 64            | kvm-84                                            | Intel                   | 64           | Integrated |
| OpenBSD 4.4                | 64            | kvm-78                                            | AMD                     | 64           | Integrated |
| OpenBSD 4.2                | 32            | kvm-58                                            | Intel                   | 32           | Integrated |
| OpenBSD 4.1                | 32            | kvm-72                                            | Intel, AMD              | 64           | Integrated |
| OpenBSD 4.0                | 64            | kvm-12                                            | Intel                   | 64           | Integrated |
| OpenBSD 4.0                | 32            | kvm-16 + CVS                                      | Intel                   | 64           | Integrated |

### NetBSD

| Guest          | Guest bitness | Host version                                    | Host cpu               | Host bitness | Status     |
|----------------|---------------|-------------------------------------------------|------------------------|--------------|------------|
| NetBSD 3.1     | 32            | kvm-17/18                                       | Intel                  | 32           | Integrated |
| NetBSD 3.1     | 32            | kvm-21                                          | AMD                    | 64           | Integrated |
| NetBSD 4.0     | 32            | kvm-60                                          | Intel                  | 64           | Integrated |
| NetBSD 5.0.2   | 32            | kvm from 2.6.32-2-amd64 debian kernel on debian sid | both Intel and Amd     | 64           | Integrated |

### PC-BSD

| Guest    | Guest bitness | Host version | Host cpu | Host bitness | Status     |
|----------|---------------|--------------|----------|--------------|------------|
| PC-BSD 1.4 | 32            | kvm-56       | Intel    | 64           | Integrated |

### Darwin 

| Guest       | Guest bitness | Host version | Host cpu | Host bitness | Status     |
|-------------|---------------|--------------|----------|--------------|------------|
| Darwin 8.0.1 | 32            | kvm-29       | Intel    | 64           | Integrated |

### Dragonfly BSD

| Guest           | Guest bitness | Host version | Host cpu | Host bitness | Status     |
|-----------------|---------------|--------------|----------|--------------|------------|
| DragonflyBSD 1.10.1 | 32            | kvm-58       | Intel    | 64           | Integrated |
| DragonflyBSD 2.2.1 | 32            | kvm-85       | Intel    | 64           | Integrated |

---

## **UNIX Family: Solaris/OpenSolaris**

| Guest                            | Guest bitness | Host version                              | Host cpu       | Host bitness | Status     |
|----------------------------------|---------------|-------------------------------------------|----------------|--------------|------------|
| Solaris 10 U1                    | 32            | kvm-12                                    | Intel          | 64           | Integrated |
| Solaris 10 U3                    | 64            | kvm-58 + patch                            | Intel          | 64           | Integrated |
| Oracle Solaris 10 1/13           | 64            | qemu-kvm 2.3.1                            | Intel          | 64           | Integrated |
| Nexenta Core 1.0                 | 64            | kvm-61                                    | Intel          | 64           | Integrated |
| Nexenta Core 2.0 b104 rc3        | 32 / 64       | qemu-kvm-0.11.0                           | Intel          | 64           | Integrated |
| OpenSolaris 2008.05              | 64            | kvm-69                                    | Intel          | 64           | Integrated |
| Milax 0.3.2                      | 32            | kvm-62                                    | Intel          | 64           | Integrated |
| Belenix 0.7.1                    | 64            | kvm-62                                    | Intel          | 64           | Integrated |
| OpenSolaris 2008.11              | 64            | kvm-62                                    | Intel          | 64           | Integrated |
| OpenSolaris 2009.06              | 32, 64       | qemu-kvm-0.11.0-0ubuntu6.3                | Intel          | 64           | Integrated |
| OpenIndiana Build 151a (Desktop) | 64            | qemu-kvm-0.12.5+dfsg-5+squeeze           | Intel Core i7  | 64           | Integrated |

---

## **Other UNIX System**

### Minix 

| Guest        | Guest bitness | Host version                                     | Host cpu | Host bitness | Status |
|--------------|---------------|--------------------------------------------------|----------|--------------|--------|
| MINIX 3.1.2a | 32            | kvm-71, qemu-kvm-0.14.1+noroms-0ubuntu6.2       | Intel    | 32, 64       | Works  |

### Debian GNU/Hurd

| Guest                       | Guest bitness | Host version                                     | Host cpu   | Host bitness | Status    |
|-----------------------------|---------------|--------------------------------------------------|------------|--------------|-----------|
| GNU hurd live CD (20051117)  | 32            | kvm-28, qemu-kvm-0.14.1+noroms-0ubuntu6.2       | Intel, AMD | 32, 64       | Integrated|
| GNU/Hurd (Debian K16)        | 32            | kvm-69, qemu-kvm-0.14.1+noroms-0ubuntu6.2       | Intel, AMD | 32, 64       | Integrated|
| GNU/Hurd (Debian K14)        | 32            | kvm-33                                          | Intel, AMD | 32, 64       | Integrated|

### QNX

| Guest        | Guest bitness | Host version                                       | Host cpu | Host bitness | Status    |
|--------------|---------------|----------------------------------------------------|----------|--------------|-----------|
| QNX 6.4.1    | 32            | qemu-kvm-0.11.0, 2.6.31.5; qemu-kvm-0.14.1+noroms-0ubuntu6.2 | Intel    | 32, 64       | Integrated|
| QNX 6.4.0    | 32            | kvm-83, qemu-kvm-0.14.1+noroms-0ubuntu6.2         | Intel    | 32, 64       | Integrated|
| QNX 6.3.2    | 32            | qemu-kvm 88, host kernel: 2.6.30; qemu-kvm-0.14.1+noroms-0ubuntu6.2 | Intel    | 32, 64       | Integrated|
| QNX 4.25     | 32            | qemu-kvm-0.12.3, kernel 2.6.32-24                  | Intel    | 64           | Integrated|

---

## **Others**

| Guest                        | Guest bitness | Host version   | Host cpu | Host bitness | Status    |
|------------------------------|---------------|----------------|----------|--------------|-----------|
| Haiku OS                      | 32            | kvm-12         | AMD      | 64           | Integrated|
| Amiga Research OS (AROS)      | 32            | kvm-12         | AMD      | 64           | Integrated|
| Amiga Research OS (AROS)      | 32            | kvm-58         | Intel    | 32           | Integrated|
| ReactOS 0.3.0                 | 32            | kvm-14         | AMD      | 64           | Integrated|
| FreeDOS 1.0                   | 32            | kvm-71         | Intel    | 64           | Integrated|
| MS DOS 6.22                   | 32            | kvm-88         | Intel    | 64           | Integrated|
| MS DOS 5.0                    | 32            | kvm-62         | Intel    | 64           | Integrated|
| Plan 9                        | 32            | kvm-68         | Intel    | 64           | Integrated|
| FreeDOS 7 + Novell Netware 4.1| 32            | kvm-83         | AMD      | 64           | Integrated|
| clonezilla-live-1.2.* – iso   | 32            | kvm-1.12.5     | AMD      | 32, 64       | Integrated|
