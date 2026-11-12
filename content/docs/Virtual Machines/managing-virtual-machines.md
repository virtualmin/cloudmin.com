---
title: "Managing Virtual Machines"
date: 2026-10-28
author: "Ilia Ross"
weight: 2230000
---

Select a virtual machine from the guest selector to open its details, actions and Remote Access above the host-wide navigation links. Everything below is also available through the [API and command line](/docs/development/virtual-machine-api/).

### Details and live status

The details page shows power state, guest agent status, SSH reachability, addresses, individual disks, guest filesystems, network interfaces, and disk and network transfer rates. Power state and inventory update through libvirt events over an authenticated WebSocket; browsers do not poll. CPU usage is normalized to the assigned CPUs, and memory usage comes from balloon reports every ten seconds by default and excludes reclaimable cache. Filesystem usage and guest OS details require the QEMU Guest Agent and refresh about once a minute.

Power state, guest-agent health, SSH reachability and application health are separate signals. A responding agent does not mean guest setup has finished, and an SSH banner does not mean the first boot is complete.

The overview totals writable data-disk capacity and mounted filesystem usage, excluding read-only media and cloud-init disks. Host disk-image allocation is not guest filesystem usage. When usage is unavailable or stale, summaries show the known capacity alone. Host administrators also see counts of active image imports and unfinished virtual machine jobs from all users.

One status server shares results among viewers. Each browser receives an initial snapshot and later changes over an authenticated WebSocket, with session and module permissions checked on connection and while it remains open. Hidden tabs keep their connection but pause updates and their guest health checks. The status server exits about a minute after its last subscriber leaves; it uses Perl and Webmin's WebSocket proxy, without a Node.js service.

Visible detail and connection pages share guest-agent and SSH-banner probes because SSH has no libvirt readiness event. Checks back off from five to thirty seconds when SSH responds; the overview does not probe SSH for every guest.

A separate background statistics service samples resources for all guests every ten seconds by default, even when no browser is open. The status server reads its latest values. New guests enable ten-second balloon reports; the statistics collector enables reports at the configured sampling interval for existing running guests without changing their RAM allocation or saved definition. Host process RSS is not a substitute for guest memory usage.

The statistics service also checks guest filesystems and OS details in a separate worker, normally once a minute per guest. Slow or unavailable guest agents do not block resource sampling. Open **Statistics** in the guest menu for charts and saved history. See [Resource Statistics](/docs/statistics/overview/) for chart controls, collection settings and retention.

### Power controls

Start, shutdown, reboot, suspend, resume and autostart are the ordinary power controls. Hard reset and forced power off are abrupt and require confirmation and a separate permission. Live ISO insertion and ejection work on running guests.

### Resources

CPU count and balloon memory can be adjusted on a running virtual machine. Offline settings cover the resource maximums, boot order and firmware. The page explains when a change needs the guest shut down and what still has to be done inside the guest, such as growing a filesystem after a disk was enlarged.

### Disks and media

Add extra disks, grow existing disks, attach or detach volumes, and change the CD/DVD media. New disks are QCOW2 files in directory, filesystem and NFS pools, or raw logical volumes in LVM and LVM-thin pools; LVM disks grow only while the machine is shut down. Free-space checks run before every disk operation. Deleting a virtual machine asks which disks to remove, checks shared storage, and recovers an interrupted deletion the next time a host administrator opens Cloudmin.

### Network interfaces

Add, change or remove NICs on a stopped guest, choosing a libvirt network or a host bridge. Cloudmin checks for duplicate MACs, duplicate managed addresses and missing networks before allocating resources.

### Guest password reset

**Edit Virtual Machine → Access → Password** changes an existing guest account's password through the QEMU Guest Agent. The form is always available to permitted users; saving requires a running virtual machine with a responding agent. Passwords are not stored in jobs or logs, and SSH authentication settings stay unchanged.

### Guest SSH keys (Pro)

In Cloudmin Pro, **Access → SSH Keys** lists, adds and removes authorized keys for an existing guest account. An account created with only a password can receive keys later. The virtual machine must be running, and its guest agent must support SSH key commands. Other keys and open sessions stay unchanged. See [SSH Keys](/docs/remote-access/ssh-keys/) for requirements and CLI examples. {{< pro >}}

### Snapshots, clones, backups and images

- [Snapshots](/docs/virtual-machines/snapshots/) save a disk state you can restore or delete later.
- [Cloning](/docs/virtual-machines/cloning/) copies a guest into an independent machine with a fresh identity.
- [Backups](/docs/backup-and-migration/backups-and-restore/) write a full archive to local, SSH, S3 or Pro cloud destinations and restore it later.
- [Create Image](/docs/images/creating-images-from-virtual-machines/) (Pro) turns a guest's system disk into a reusable image.

### Jobs

Creation, cloning, backups, restores, captures and offline hardware changes run as jobs. The progress page shows each step, the error if one fails, and whether cleanup is pending. Jobs reserve the virtual machine they work on, so conflicting operations wait. Unfinished jobs are recovered when a host administrator with write access visits Cloudmin; read-only and delegated visits never resume jobs.

### Changes made outside Cloudmin

Libvirt is the source of truth, so machines changed or created with `virsh` or virt-manager appear in Cloudmin. Deleting a guest with external tools does not run Cloudmin's cleanup: remove its managed SSH key, serial logs and Servers Index entry separately in that case. Adopting guests defined outside Cloudmin with full management is {{< planned >}}.
