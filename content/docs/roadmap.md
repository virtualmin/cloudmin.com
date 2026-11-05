---
title: "Feature Status and Roadmap"
date: 2026-10-28
author: "Ilia Ross"
weight: 950000
---

Cloudmin 10 is developed in the open and is not released yet. This page lists what works today and what is still planned, so the rest of the documentation can be read in context. Items marked {{< planned >}} are design targets, not available features.

### Implemented

#### Host
- Automated installer for Rocky Linux 10, AlmaLinux 10, Debian 13 and Ubuntu 26.04 on x86-64 and ARM64, with repository setup, package groups, managed swap and a readiness report.
- Cloudmin-Config prepares KVM, modular or monolithic libvirt, a default storage pool, a persistent NAT network, EFI firmware, Webmin, nftables and Fail2ban, and boots an isolated KVM appliance to verify the host.
- Host readiness checks with actionable errors, shown on the overview.
- Direct libvirt discovery through `Sys::Virt`, without parsing `virsh` output.

#### Images
- Catalogue of AlmaLinux, Alpine, Arch, CentOS Stream, Debian, Fedora, openSUSE, Rocky Linux and Ubuntu cloud images for the host architecture, verified against the publishers' SHA-256 or SHA-512 checksums.
- Background imports from HTTPS URLs, browser uploads and host files into directory, filesystem and NFS pools, with progress pages, batch downloads, bulk deletion and custom catalogue entries.
- Installer ISOs, with an empty system disk and the ISO in a read-only CD/DVD drive. Experimental.
- Image capture from an existing Linux guest, in Cloudmin Pro.

#### Virtual machines
- Creation from cloud images or ISOs with firmware selection, independent disks and recoverable jobs; cloud-init account setup, SSH keys, DHCP or static IPv4 and IPv6 including on-link gateways.
- Machine templates and resource plans, including Default Template, Default Plan and Virtualmin GPL and Pro templates.
- Guest packages and Virtualmin GPL/Pro installation run inside the guest after cloud-init. Preparation and final setup scripts require Cloudmin Pro. {{< pro >}}
- Power controls, pause and resume, confirmed hard reset, autostart, live CPU and balloon memory changes, offline resource maximums and boot settings.
- Disk and network interface changes, disk growth, ISO insertion and ejection, and deletion with explicit disk selection and shared-storage checks.
- Guest password reset through the QEMU Guest Agent.
- Disk snapshots with creation, restore, deletion, per-machine history, a host overview and guest-agent preparation.
- Full clones from stopped or running guests with fresh identities, or unchanged copies left stopped.
- Full backups and restore with hourly to yearly schedules and retention, to local, SSH and S3 destinations, plus cloud destinations in Pro.

#### Access
- Browser SSH terminals with pinned host keys, host-managed per-guest keys, remembered ports and optional automatic connection.
- Serial consoles with recorded output replay and graphical VNC consoles that work during boot.
- Guest Webmin through the host's Servers Index proxy for Virtualmin guests behind NAT, root-only and behind a trust warning.
- Delegation of individual virtual machines to Webmin users with separate grants; read-only mode blocks changes and consoles.
- Live status over authenticated WebSockets: power state, guest agent, SSH reachability, resource usage and guest filesystem usage.

#### Networking and storage
- NAT, routed and isolated virtual networks, and guided host bridge creation through NetworkManager, Netplan or ifupdown with connectivity confirmation and automatic rollback.
- Storage pool and volume inventory; directory, filesystem and NFS pools for creation, cloning, backups and imports; registered LVM volume groups and thin pools for creation, cloning, backups, restore and native snapshots, with raw guest disks.

#### Platform
- Durable jobs with reservations, progress, cancellation and recovery after a controller restart.
- One versioned JSON API shared by the UI, the `api.pl` command line and remote clients.
- Isolated systemd workers without root for downloads, inspection, seeds, consoles and relays.
- Compatibility wrappers for frame-based themes and older Cloudmin function names.

### Planned

#### First supported release
- Clean-install validation across the full host matrix, including physical ARM64. {{< planned >}}
- One fully tested shared storage path, such as NFS on every supported host. {{< planned >}}
- VLAN tags on guest interfaces and anti-spoofing through libvirt network filters. {{< planned >}}
- Scheduled snapshots. {{< planned >}}
- Adopting guests defined outside Cloudmin. {{< planned >}}
- Machine-readable API schema and generated API documentation. {{< planned >}}
- Catalogue signature verification, an update schedule and an end-of-life policy. {{< planned >}}
- Legacy Cloudmin 9 KVM import with a per-machine report, cutover and rollback. {{< planned >}}
- A stable Cloudmin 10 package repository. {{< planned >}}

#### Cloudmin Pro
- Projects, quotas, self-service creation, usage tracking and automation credentials. {{< planned >}}

#### Cloudmin Connect GPL
Cloudmin Connect is a separate planned fleet product. GPL will add host registration, combined inventory and search, consoles and terminals, resource views, safe cold moves and host backup/restore actions. It will have host and fleet VM limits; the numbers are not decided. Existing guests remain visible and recoverable after a limit is exceeded. {{< planned >}}

#### Cloudmin Connect Pro
- Live migration, evacuation and placement for tested host/storage combinations. {{< planned >}}
- Controller quorum, verified fencing, automatic failover and disaster recovery. Failover must never start a second owner of the same disks. {{< planned >}}
- Fleet backup policies, test restores, monitoring, alerting and capacity reports. {{< planned >}}
- SSO, enforced two-factor authentication, fleet roles, audit retention and SIEM integration. {{< planned >}}
- Scoped tokens, bulk actions, approvals, maintenance windows, Terraform, fleet storage and networking, security groups, chargeback and white-labeling. {{< planned >}}

Deliver Connect GPL and cold moves first, Pro live migration next, and automatic failover last. Hosts remain standalone libvirt systems; Connect does not require Corosync on every host. Cloudmin Pro and Connect Pro remain separate purchases. See [Professional features](/docs/professional-features/) for the edition rules.

#### After the base is stable
- Xen through libvirt's libxl driver. {{< planned >}}
- Managed iSCSI/SAN and Ceph RBD storage. {{< planned >}}
- Prometheus metrics and external logs. {{< planned >}}
- Declarative fleet deployment, hooks and autoscaling from snapshot clones. {{< planned >}}
- S3-compatible object storage, hosted databases and load balancers. {{< planned >}}
- Virtualmin Connect, the optional Webmin module that replaces Cloudmin Services for Virtualmin fleet management. {{< planned >}}

### Not planned

Containers and Kubernetes, public cloud providers, microVM or sandbox products, mail relay and OS upgrade services, and raw QEMU launch code are outside Cloudmin 10. Containers can run inside Cloudmin virtual machines.

### Delivery plan

| Stage | Content | Status |
| --- | --- | --- |
| 0. Contracts and evidence | Resources, job states, API conventions, host matrix, legacy fixtures, Cloudmin 9 policy | Partly done: resource model and host matrix defined; legacy fixtures and testing on every supported host still pending |
| 1. Installable foundation | Installer, meta-packages, Cloudmin-Config, libvirt adapter, readiness checks | Implemented; clean installs on every supported host not yet verified |
| 2. First complete virtual machine | Image manager; create, start, console, stop, delete | Implemented; not yet tested on every supported host |
| 3. Single-host management | Settings, disks, NICs, storage pools, networks, snapshots, clones, backups, audit | Implemented; public cloud account tests pending |
| 4. Cloudmin Connect and Pro tenancy | Connect GPL: registration and cold moves. Connect Pro: live migration, then fenced failover. Host Pro: projects, quotas, credentials | Pending |
| 5. Legacy import and preview | Repeatable migration tests across file, LVM, NFS and adopted block storage; user preview | Pending |
| 6. KVM release, Xen evaluation | Release gates, documentation, then Xen fixtures | Pending |

### Release gates

Cloudmin 10 ships when a supported clean OS reaches a running virtual machine without undocumented shell edits; every installer step is idempotent and tested; a supported legacy KVM guest imports without copying its disk; no failed import or migration can leave two startable owners of one disk set; create, backup, restore, clone and migration jobs survive controller restarts at tested interruption points; unsupported combinations fail in preflight with useful errors; the image catalogue has an owner and process; unit, libvirt integration and installer tests run automatically; the API and CLI are documented and covered by compatibility tests; and every supported UI workflow is documented here.
