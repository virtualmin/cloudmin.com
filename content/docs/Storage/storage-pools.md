---
title: "Storage Pools"
date: 2026-10-28
author: "Ilia Ross"
weight: 2610000
---

Storage in Cloudmin is a set of named libvirt pools. **Storage** lists each pool with its type, state, capacity, free space and volumes, and Module Configuration chooses the columns shown for pools and volumes.

### Supported pools today

The installer prepares a default directory pool and tests it with a volume creation and deletion. Virtual machine creation, extra disks, cloning, snapshots, backups and restore work with directory, filesystem and NFS pools, using QCOW2 or raw files, and with LVM and LVM-thin pools, using raw logical volumes. Imported images, installation media, captured images and copied UEFI variable files always live in a file pool, so keep at least one directory, filesystem or NFS pool active. Mount NFS storage before using it as a pool, and mount remote storage before using a directory on it as a backup destination.

Pools differ in what they can do. Cloudmin checks free space before every disk operation, including full disk capacities and temporary snapshots during clones and backups, and checks output volumes for backing links before using them. Libvirt caches directory entries, so Cloudmin refreshes pools before checks that depend on removed files.

### Creating pools

**Create Storage Pool** on the Storage page registers a directory or an existing LVM volume group. A missing directory is created if its parent exists, and existing files and permissions are preserved. Registering a volume group does not format or erase its disks, and each thin pool in the group appears as a separate storage destination. Use Webmin's Logical Volume Management module to create and extend volume groups and thin pools. New pools start immediately, and the start-at-boot choice is saved with the registration.

### LVM and LVM-thin pools

LVM disks reserve their full capacity and are zeroed before use, so a new disk never exposes data from an earlier volume. LVM-thin disks allocate space as the guest writes, so their combined capacity can exceed the pool's physical space. The pool card shows data and metadata usage; extend the thin pool before either fills, because running out stops guest disk writes. Cloudmin refuses new allocation at 95% data usage or 90% metadata usage, and thin pools must have block zeroing enabled.

Shut down a virtual machine before growing one of its LVM disks; file disks can grow while the guest runs. Converting an image into a logical volume needs free space for a private temporary copy. Native LVM snapshots are described on the [Snapshots](/docs/virtual-machines/snapshots/) page.

### Volumes

Each virtual machine gets a separate writable disk so the source image stays reusable. Extra disks can be added, grown, attached and detached from the virtual machine's hardware page, and deletion asks which disks to remove with shared-storage checks. Cloud-init seed disks and read-only media are excluded from the usage summaries on the overview, which total writable data-disk capacity and mounted guest filesystem usage rather than equating host allocation with guest usage.

Unused files in local directory pools and unused logical volumes can be deleted from the Storage page after a review step. Host mounts, swap, snapshot volumes and volumes still referenced by a machine, an image or another volume are protected.

### Removing a registration

**Unregister Pool** removes a directory or parent LVM pool from libvirt after checking for references. Files, logical volumes, volume groups and thin pools remain intact. References from stopped guests, snapshots, imported images or backing disks block removal, as do pending operations and unreadable ownership records. Thin destinations cannot be unregistered separately.

**Stop and Unregister** on the confirmation page stops an active pool before removing its registration. For LVM, this deactivates every logical volume in the group, including thin volumes. Host mounts, swap, open volumes and external device dependencies block the operation. Data is preserved; register the group again to use it in Cloudmin.

### API and CLI

The [command-line reference](/docs/development/command-line/) covers `list-pools`, `list-volumes`, `list-volume-groups`, `create-pool`, directory pool lifecycle controls, `delete-volume` and `unregister-pool`. Removal commands accept `--review` to show owners and any refusal reason, and require `--yes` to proceed. They recheck ownership and the reviewed identity before changing storage. Use `unregister-pool --pool NAME --stop --review` to inspect removal of an active pool, then replace `--review` with `--yes` to apply it.

The same operations are available through the [JSON API](/docs/development/virtual-machine-api/). Reads require host access. Changes and reviews also require manage access, a signed token and a writable session. These operations finish synchronously.

### Support order

1. Local directory pools with QCOW2 or raw volumes (available)
2. Registered LVM volume groups and their thin pools, with raw guest disks, offline growth and native snapshots (available)
3. NFS shared pools (available for imports, creation, cloning and image capture; not yet tested on every supported host and architecture)
4. Safe adoption of existing iSCSI and SAN volumes {{< planned >}}
5. Managed iSCSI/SAN and Ceph RBD {{< planned >}}

Pools of other types can be defined with libvirt's own tools; Cloudmin lists active and inactive registrations. A setup UI that discovers candidates, validates every host and shows which operations a pool supports is {{< planned >}}.
