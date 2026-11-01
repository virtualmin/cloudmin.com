---
title: "resize-disk"
date: 2026-10-30
weight: 2842060
---

### Grows a disk to the specified total capacity

```text
cloudmin resize-disk [--multiline | --json]
                     [--no-wait]
                     (--name name | --id uuid)
                     --disk size
                     --target value
```


Grows an attached disk on the machine selected by `--name` or `--id`. `--target` identifies the disk, and `--disk` is its new total capacity, not the amount to add. Bare sizes are GiB; for example, `--disk 50G` makes the disk 50 GiB.

Shrinking is not supported. Snapshots, checkpoints, shared storage or unsupported disk types can block growth. File disks can grow through libvirt while the guest runs. LVM and LVM-thin disks require the guest to be shut down first.

This changes virtual disk capacity only. Expand partitions, logical volumes and filesystems inside the guest separately. Completed growth cannot be rolled back, including when a later part of a job fails. The command waits for the job by default; `--no-wait` returns its ID.

```sh
cloudmin resize-disk --name guest.example.com --target vda --disk 50G
```

Options:

- `--disk size`: Total disk capacity; bare values use GiB.
- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
- `--target value`: Attached disk target.
