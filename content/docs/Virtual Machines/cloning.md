---
title: "Cloning"
date: 2026-10-28
author: "Ilia Ross"
weight: 2250000
---

Cloning copies a virtual machine's private writable disks into a new, independent machine. Choose **Clone virtual machine** from a guest's action menu or **Clone Virtual Machine** on **Edit Virtual Machine**.

### Requirements

Cloning works into directory, filesystem, NFS, LVM and LVM-thin pools; copies placed in an LVM pool become raw logical volumes. It requires libguestfs and its Perl bindings, bsdtar, and exactly one Linux installation that libguestfs can inspect. Prepared clones also require YAML::XS, enabled cloud-init inside the guest and one network interface.

### Stopped and running sources

A stopped source is copied directly. For a running source, Cloudmin uses the guest agent to freeze filesystem writes, takes a temporary snapshot, thaws the source and copies the stable disks. File disks use an atomic external overlay that is merged back afterwards; LVM disks use native snapshots with a brief guest pause, and writes stay on the original volumes. A running source with both file and LVM writable disks needs a clean shutdown instead. The alternative for any source is a clean shutdown followed by copying and a restart. Filesystem freezing does not guarantee database consistency; stop databases or use their own tools for a consistent copy.

Both the source UUID and the destination name are reserved while the job runs. Cancellation and interrupted-job recovery restore the source before releasing either reservation. File and ordinary LVM pools need room for the full disk capacities and temporary snapshots, while thin pools allocate space as data is copied; these are included in the free-space checks, and output disks are checked for backing links before use.

### Clone modes

**Prepared clone (new identity).** Cloudmin resets the copied guest offline and supplies a new cloud-init seed before boot. A libguestfs task with networking disabled clears the machine ID, SSH host keys, DHCP leases, random seed and the cloud-init cache. The clone receives a new UUID, MAC addresses, console password, host ID and the access, network, boot and hostname settings you choose on the clone form, which reuses the creation form without installation media or software setup.

For Virtualmin guests, Cloudmin also updates Virtualmin's management hostname, the Postfix hostname references and the management TLS certificate. Hosted domains and their certificates stay unchanged; application settings that use the source IP address still need review.

**Keep guest settings and leave stopped.** The copy preserves the machine ID, host keys, hostname, addresses and account credentials, and is left stopped with autostart disabled, so you can change its identity yourself before starting it beside the source.

Both modes assign a new host ID and replace Virtualmin Pro license and repository credentials with a placeholder before boot, using Virtualmin's offline license API without contacting a server. The administrator must acknowledge that the clone needs a separate Pro license or a manual downgrade to GPL. The source license stays unchanged.

### Firmware and devices

UEFI variables can be copied from a stopped source and are stored in a file pool, even when the clone's disks go to an LVM pool. Live cloning defaults to fresh variables, which do not preserve the source's firmware boot entries. Passthrough devices, TPMs, shared folders, persistent memory and external device state cannot be copied; the clone and snapshot checks reject such guests. Linked copies and cross-host cloning are outside this implementation.

### Related features

- [Snapshots](/docs/virtual-machines/snapshots/) keep a restore point on the same machine instead of creating a new one.
- [Backups](/docs/backup-and-migration/backups-and-restore/) use the same source preparation and recovery but preserve guest identity.
- [Create Image](/docs/images/creating-images-from-virtual-machines/) (Pro) captures one system disk as a reusable image.
- Autoscaling from snapshot clones with pre and post hooks is {{< planned >}}.
