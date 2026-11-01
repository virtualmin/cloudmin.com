---
title: "Snapshots"
date: 2026-10-28
author: "Ilia Ross"
weight: 2260000
---

Disk snapshots save the state of a virtual machine's disks so you can return to it later. Open **Snapshots** from a guest's menu for its history, or the host overview to see snapshots across all virtual machines.

### Creating a snapshot

Snapshots cover private raw or QCOW2 file disks and managed LVM disks. On a running guest, Cloudmin asks the QEMU Guest Agent to freeze filesystem writes before the snapshot and thaws it afterwards, so the copy is filesystem-consistent. When the agent is not available you can choose an explicit clean shutdown first, or take an unprepared snapshot of the running disks. Filesystem freezing does not guarantee database consistency.

File disks get an external QCOW2 overlay managed through libvirt: new writes go to the overlay and the saved layer stays unchanged. LVM disks get a native snapshot volume instead: writes stay on the original logical volume, and Cloudmin pauses the guest briefly while the snapshot is created. A live LVM snapshot needs a disk cache mode that keeps no unflushed writes; disks created by Cloudmin use direct I/O. Classic LVM snapshots reserve room for a full disk's changes in the volume group, while thin snapshots share their thin pool, so watch thin-pool data and metadata usage. One snapshot cannot mix file and LVM disks.

Snapshots are not supported for guests with shared folders, passthrough devices, TPMs or persistent memory, because their state cannot be captured; the check rejects them before any change is made. Up to 20 snapshots can be kept per machine, and snapshot history blocks disk attachment, removal and growth until it is removed.

### Restoring and deleting

Restore returns the disks to the saved state. Restoring an LVM snapshot copies the saved data back into the original logical volumes while the machine is stopped, and needs temporary space under `/var/tmp` for the largest disk's full capacity plus 256 MiB. Delete merges a file snapshot's overlay back into the disk and removes an LVM snapshot's saved volumes; either way the current disk contents stay. Remove LVM snapshots before deleting a virtual machine. Both run as jobs with the usual reservations and recovery, and both respect the host's disk-work queue so they do not race with clones or backups.

### Planned

Scheduled snapshots and retention policies are {{< planned >}}. Until then, use scheduled [backups](/docs/backup-and-migration/backups-and-restore/) for unattended protection.
