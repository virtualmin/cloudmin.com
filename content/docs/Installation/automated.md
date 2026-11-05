---
title: "Automated Installation"
date: 2026-10-28
author: "Ilia Ross"
draft: false
weight: 2030000
---

### Recommended host specifications
- A freshly installed [supported OS](/docs/os-support/) with CPU virtualization extensions and a working `/dev/kvm`
- Enough memory for the host plus the guests you plan to run; the installer can add managed swap
- Local disk space for images and guest disks, or an NFS mount you intend to use as a pool
- A fully qualified host name if you plan to install Virtualmin inside guests and reach them by name

### Installation

Install Cloudmin with the automated `cloudmin-install.sh` script. It is the only supported installation method; there is no manual package walkthrough yet. If you haven't already, read the [Download](/download/) page first, as it covers the steps most installations need.

{{< alert warning exclamation-triangle "Development channel" "There is no Cloudmin 10 stable repository yet. The installer uses the `unstable` channel. Expect changes between builds." >}}

### Running the install script

Download the script to the host and run it as root, using the toggles to add the flags that match your setup:

{{< install-command local >}}

Or download and run it in one step:

{{< install-command >}}

The script configures the Cloudmin repository, installs the package groups, then runs Cloudmin-Config, which completes the host configuration and checks readiness. It shows the installation plan, including any swap change, and asks for confirmation unless `--yes` is given. Logs are kept privately in `/root` by default.

### Install script options

```text
Usage: cloudmin-install.sh [options]

  --hostname|-n name              Set a fully qualified host name
  --no-package-updates|-x         Skip the initial distribution upgrade
  --extra package[,package...]    Install additional distribution packages
  --include plugin[,plugin...]    Include optional configuration plugins
  --exclude plugin[,plugin...]    Exclude plugins (required dependencies cannot be excluded)
  --setup|-s                      Configure repositories only
  --swap|-S size                  Managed swap size: MiB, K, M, G (or KB/MB/GB)
  --swap-only                     Change swap without installing Cloudmin
  --no-swap|-ns                   Leave swap unchanged
  --log-dir directory             Directory for the installation log
  --yes|-y                        Accept the installation or swap plan
  --verbose|-v                    Show debug messages
  --version|-V                    Show installer version
  --help|-h                       Show this help
```

#### Swap

Without a size, the installer chooses swap from available memory, existing swap and disk space. `--swap 4G` sets a size, `--no-swap` leaves swap alone, and `--swap 0` removes only installer-managed swap. The managed paths are `/swap.vm` and, on Btrfs, `/swap.virtualmin/swapfile`; unrelated swap is never removed. `--swap-only` changes swap on an already installed host without installing packages or configuring repositories.

#### Optional services

Cloudmin does not install or configure BIND or Postfix; no DNS or mail server is needed to run virtual machines. Install additional services separately and configure them through Webmin. All shipped configuration plugins run by default. Use `--exclude` to skip a plugin unless another plugin requires it; the final readiness check is required.

### What the installer configures

- **Packages.** On Rocky Linux and AlmaLinux, CRB and EPEL are enabled and the `cloudmincore` and `cloudmin-kvm` groups are installed. On Debian and Ubuntu, `cloudmin-core` and the native `cloudmin-kvm-stack` meta package are installed, with Ubuntu universe enabled for the Perl virtualization bindings. Dependencies install in one transaction; failures stop the installer.
- **Configuration history.** Etckeeper tracks changes in `/etc`. Rocky Linux and AlmaLinux need initialization and a daily timer; Debian and Ubuntu packages handle their own setup. Existing history is preserved.
- **Libvirt.** Modular daemons are preferred when `virtqemud` is installed, otherwise the stock `libvirtd` is used. The selected services and sockets are enabled at boot so guests, networks and pools marked for autostart come back after a reboot. An incomplete modular installation fails rather than falling back to `libvirtd`; the QEMU, network and storage units must all be present. An idle daemon may exit while its listening sockets remain available. An active monolithic installation is never switched to modular automatically; follow [libvirt's migration steps](https://libvirt.org/daemons.html#switching-to-modular-daemons) first.
- **Storage and network.** A default storage pool is prepared and tested with a volume creation and deletion. A persistent default NAT network is created after checking host routes, without touching the management interface.
- **Firmware.** Packaged EFI firmware is verified so UEFI guests can be created.
- **Security.** Webmin, nftables and Fail2ban are configured through Webmin's APIs. SELinux stays enforcing.
- **Readiness.** Before reporting success, Cloudmin-Config boots a temporary isolated KVM inspection appliance with a three-minute timeout and a 2 GiB memory limit. A failed boot stops the installation and shows the end of the configuration log; already installed packages are not rolled back.

The installer requires Cloudmin-Config 10.0.0 or newer, a Webmin with the systemd `get_unit_state` API, and the matching Cloudmin module, DEB meta packages and RPM groups. These are published together.

### After installation

Log in to Webmin at `https://your-hostname:10000` and open **Cloudmin**. The overview shows host details and any failed requirements. Continue with [Your first virtual machine](/docs/getting-started/how-to-create-a-virtual-machine/).

### Troubleshooting

- **Nested virtualization.** Enable nested KVM in the outer hypervisor. The appliance boot check fails otherwise.
- **Ubuntu 26.04 ARM64 under UTM.** A kernel boot failure has been reproduced in that environment; see [OS Support](/docs/os-support/#notes-on-specific-environments).
- **Repository problems.** Run `cloudmin-install.sh --setup --yes` to configure repositories and their prerequisites again without reinstalling.
- **Readiness failures after installation.** The Cloudmin overview lists failed requirements with the capability that is missing and how to fix it. See [Host requirements](/docs/installation/host-requirements/).
