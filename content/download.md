---
title: "Downloading and Installing"
date: 2026-10-28
draft: false
showtoc: false
hideMeta: true
---

Getting started with Cloudmin takes a few steps on a fresh host, using our automated [install script](https://download.cloudmin.dev/cloudmin-install.sh). The script sets up your package manager, installs the Cloudmin, Webmin, libvirt and QEMU packages with their dependencies, and runs Cloudmin-Config to prepare the host for virtual machines.

{{< alert warning exclamation-triangle "Cloudmin 10 is in development" "There is no stable Cloudmin 10 repository yet. The installer uses the `unstable` channel. Use it on test hosts, read the [feature status](/docs/roadmap/) page, and keep Cloudmin 9 for production Xen hosts." >}}

### Install your operating system
Start with a freshly installed [supported host OS](/docs/os-support/): Rocky Linux 10, AlmaLinux 10, Debian 13 or Ubuntu 26.04, on x86-64 or ARM64. The host needs CPU virtualization extensions and a working `/dev/kvm`. Installing inside another hypervisor works when nested virtualization is enabled. A minimal server installation is ideal; Cloudmin installs what it needs.

{{< alert primary question "" "Don't pre-install or pre-configure libvirt, QEMU or Webmin. The installer expects a clean supported OS and uses only the distribution's hypervisor packages. Add third-party repositories only after installing Cloudmin, and with caution." >}}

### Download and run install script
Cloudmin GPL is free. [Cloudmin Professional](/docs/professional-features/) licenses are sold through the [Virtualmin shop](https://www.virtualmin.com/product/cloudmin-professional-monthly-subscription/), and the Pro extension installs alongside the shared module.

{{< link "success|medium|outline|rounded" heart "https://www.virtualmin.com/product/cloudmin-professional-monthly-subscription/" "Try Cloudmin Professional" >}}&nbsp;&nbsp;or&nbsp;&nbsp;{{< link "dark|medium|outline|rounded" download "https://download.cloudmin.dev/cloudmin-install.sh" "Download Cloudmin GPL" >}}

The quickest way to start the installation is to log in to the host over SSH and run the prepared command:

{{< install-command >}}

The installer shows its plan, including any swap change, and asks for confirmation unless you pass `--yes`. Use the toggles under the command to pick the repository channel, choose how swap is handled, or switch to `wget`.

### Install script options

Run the script with `--help` for the full list. The most useful options:

- `--hostname name` sets a fully qualified host name before installation.
- `--swap SIZE`, `--no-swap` and `--swap-only` control installer-managed swap. Without a size, the installer chooses one from available memory, existing swap and disk space. Unrelated swap is never removed.
- `--no-package-updates` skips the initial distribution upgrade.
- `--extra package,...` installs additional distribution packages first; `--include` and `--exclude` adjust configuration plugins. BIND and Postfix are not installed or configured by Cloudmin.
- `--setup` only configures repositories and their prerequisites.

### What the installer does

On Rocky Linux and AlmaLinux the script enables CRB and EPEL, then installs the `cloudmincore` and `cloudmin-kvm` package groups. On Debian and Ubuntu it installs `cloudmin-core` and the native `cloudmin-kvm-stack` meta package. Dependencies are installed in one transaction, and a failed download, missing package or failed configuration step stops the installer.

Cloudmin-Config sets up Etckeeper for configuration history, then loads KVM, enables the modular libvirt daemons where they are available (or the stock `libvirtd` otherwise), prepares a default storage pool and a persistent NAT network, verifies the packaged EFI firmware, and configures Webmin, nftables and Fail2ban through Webmin's own APIs. SELinux stays enforcing.

Before reporting success, the configuration boots a temporary, isolated KVM inspection appliance on the host. A failed boot stops the installation and shows the end of the configuration log. The readiness report names any missing capability and how to fix it.

After a few minutes, log in to Webmin at `https://your-hostname:10000` and open **Cloudmin**. The overview shows the host checks, and **Create Virtual Machine** takes you to your first guest. See [Your first virtual machine](/docs/getting-started/how-to-create-a-virtual-machine/) for the next steps.

### Check the documentation

If your host doesn't fit these steps, see the [installation documentation](/docs/installation/automated/) and [host requirements](/docs/installation/host-requirements/). Existing Cloudmin 9 KVM hosts are not upgraded by this installer; a separate import tool with a report and rollback is [planned](/docs/backup-and-migration/migrating-from-cloudmin-9/).

### Sign up for announcements

To stay up to date with Cloudmin news, subscribe to the [News Forum](https://forum.virtualmin.com/c/news/5) at Virtualmin.com.
