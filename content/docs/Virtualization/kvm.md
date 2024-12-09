---
title: "KVM Virtualization"
date: 2024-12-05
author: "Ilia Ross"
weight: 6502011
---

KVM is built into the Linux kernel and supported by most modern distributions. KVM does not require a custom kernel, but it still does need CPU virtualization extensions enabled.

Although not required, your host system should have LVM set up with free space in the volume group to allow Cloudmin to create virtual machine disk images as logical volumes.

### Supported systems
EL-based (Rocky 9, AlmaLinux 9, Oracle 9), Ubuntu 24.04, and Debian 12.

### Automatic installation

Cloudmin 10 automates the setup of a KVM host on supported systems using an automated installation script.

### Manual installation steps

#### Install packages

- EL-based

```shell
dnf install qemu-kvm bridge-utils parted lsof
```

- Ubuntu 24.04 or Debian 12

```shell
apt install qemu-kvm bridge-utils parted lsof
```

This installs the KVM `qemu-kvm` hypervisor package. The `bridge-utils` package is needed for network bridging.

#### Configure a network bridge

To allow KVM guests full network access, create a network bridge.

The steps vary by distribution and setup.

##### Using NetworkManager (EL-based systems)

```shell
nmcli connection add type bridge ifname br0
nmcli connection modify bridge-br0 ipv4.addresses "192.168.1.10/24" ipv4.gateway "192.168.1.1" ipv4.method manual
nmcli connection add type bridge-slave ifname eth0 master bridge-br0
nmcli connection modify eth0 ipv4.addresses "" ipv4.method disabled
nmcli connection up bridge-br0
reboot
```

{{< alert primary exclamation "" "Replace `192.168.1.10/24` and `192.168.1.1` with your actual network settings, and `eth0` with the correct network interface name if it differs." >}}

##### Using Netplan (Ubuntu systems)

Edit a netplan file in `/etc/netplan/` (e.g. `01-netcfg.yaml` file):

```yaml
network:
    version: 2
    renderer: networkd
    ethernets:
        eth0:
            dhcp4: false
    bridges:
        br0:
            dhcp4: false
            interfaces:
                - eth0
            addresses:
                - 192.168.1.10/24
            routes:
                - to: 0.0.0.0/0
                  via: 192.168.1.1
```

{{< alert primary exclamation "" "Replace `192.168.1.10/24` and `192.168.1.1` with your actual network settings, and `eth0` with the correct network interface name if it differs." >}}

Then apply new settings by running:

```shell
netplan apply
```

After these steps, the host’s IP address and gateway now reside on `br0` instead of `eth0`.

##### Using ifupdown (Debian systems)

Edit the `/etc/network/interfaces` file to configure the bridge:

```
# Loopback interface
auto lo
iface lo inet loopback

# Physical interface (slave)
allow-hotplug eth0
iface eth0 inet manual

# Bridge interface
auto br0
iface br0 inet static
    address 192.168.1.10
    netmask 255.255.255.0
    gateway 192.168.1.1
    bridge_ports eth0
    bridge_stp off       # Disable Spanning Tree Protocol
    bridge_waitport 0    # No waiting for ports
    bridge_fd 0          # No forwarding delay
```

{{< alert primary exclamation "" "Replace `192.168.1.10/24` and `192.168.1.1` with your actual network settings, and `eth0` with the correct network interface name if it differs." >}}

Then apply new settings by running:

```shell
ifdown eth0 && ifup br0
```

#### Add a new KVM host system
- Install Webmin and Cloudmin packages on the host system
- Add the system to Cloudmin:
    - Navigate to "Host Systems ⇾ KVM Host Settings" page and fill in the host's details.
      - Select the newly added host, provide the `/kvm` directory and specify an LVM volume group if preferred.
      - Enter an IP range for guests and a DNS domain to assign to new VMs.
      - Click "Save" button.

After completing these steps, your host should be ready to create and run KVM-based virtual machines through Cloudmin.
