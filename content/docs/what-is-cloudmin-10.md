---
title: "What Is Cloudmin 10"
date: 2026-10-28
author: "Ilia Ross"
weight: 700000
---

Cloudmin 10 is a rewrite of Cloudmin around libvirt, the standard Linux API for managing virtual machines. It supports QEMU/KVM and runs as a module inside Webmin, using Webmin's authentication, navigation, permissions and UI widgets.

The goal is simple: install Cloudmin on a supported Linux system, choose or supply an image, and get a safe, manageable KVM virtual machine without manual host setup. Cloudmin is useful on its own and integrates with Virtualmin for people who run hosting inside their guests.

### What changed from Cloudmin 9

- **Libvirt is the only management layer.** Cloudmin does not build raw QEMU command lines or scrape `virsh` output. Libvirt stores the virtual hardware, network and storage configuration, so `virsh`, virt-manager and Cockpit keep working on the same machines.
- **KVM first.** Xen comes later through libvirt's libxl driver once KVM is stable. Cloudmin 9 stays available and maintained for Xen users until then.
- **A short default path.** Install, pick an image, create a virtual machine. Firmware, machine type, extra disks and NICs live under advanced settings.
- **One shared core for GPL and Pro.** Pro adds features on top; it is not a second copy of the application.
- **Virtualmin fleet management moves out.** Cloudmin Services is not carried forward; an optional Webmin module, Virtualmin Connect, is planned to replace it.
- **No provider clutter.** Docker, Podman, LXC, OpenVZ, VServer, Zones, Citrix, EC2, GCE and similar screens are removed.
- **Explicit import.** Existing KVM installations will be imported by a tool with a per-machine report, cutover and rollback, never by a package upgrade. That tool is still [planned](/docs/backup-and-migration/migrating-from-cloudmin-9/).

### How it works

{{< how-it-works >}}

The Cloudmin backend runs within Webmin. Virtual machine creation, power controls and management use a versioned API shared by the UI, the command line and external clients. Long operations such as image imports, creation, cloning, backups and restores run as background jobs with progress, resource reservations, cancellation at safe points and recovery after a restart. SQLite stores job records, short-lived password hashes, resource history and notification state. Other settings use Webmin's file-based configuration and audit log.

Downloads, host-file reads, checksum checks, disk inspection, SSH key validation, cloud-init seed generation, consoles and terminal relays run as separate processes without root privileges, each in a systemd unit with a temporary user ID. See [Privilege separation](/docs/development/privilege-separation/).

### What it manages today

- Images from a verified catalogue, URLs, uploads and host files, plus installer ISOs
- Virtual machine creation from templates and plans with cloud-init accounts and networking
- Virtualmin GPL and Pro installation inside new guests, with progress on the host
- Power controls, live CPU and memory changes, disks, NICs, boot settings and media
- Disk snapshots, full clones and full backups with restore and schedules
- SSH terminals, serial and graphical consoles, and guest Webmin through the host
- NAT, routed and isolated networks and guided host bridges
- Storage pools on directories, NFS and LVM volume groups, with volume inventory
- Delegated access per virtual machine and live status in the browser
- [Notifications](/docs/notifications/overview/) for resource use, guest health and failed jobs, with nine delivery methods in GPL and Pro
- [Resource statistics](/docs/statistics/overview/) with interactive host and guest charts, background collection and local history in GPL and Pro

See the [feature status](/docs/roadmap/) page for what is planned, including Cloudmin Connect for multiple hosts, Cloudmin 9 import and Xen.

### Editions

Cloudmin GPL manages one host with an unlimited number of virtual machines. Cloudmin Pro currently adds custom guest setup scripts, cloud backup destinations and image capture, with tenancy planned. Multi-host placement, live migration and failover are planned for Cloudmin Connect, a separate product. See [Professional Features](/docs/professional-features/).

### Next steps

- [Download and install](/download/) Cloudmin on a supported host
- [Create your first virtual machine](/docs/getting-started/how-to-create-a-virtual-machine/)
- [Delegate access](/docs/getting-started/how-to-delegate-access/) to other Webmin users
