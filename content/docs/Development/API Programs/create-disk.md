---
title: "create-disk"
date: 2026-10-30
weight: 2842020
---

### Creates and attaches a disk

```text
cloudmin create-disk [--multiline | --json]
                     [--no-wait]
                     (--name name | --id uuid)
                     [--disk size]
                     [--image ID|name]
                     --pool ID|name
```


Creates a disk in `--pool` and attaches it to the machine selected by `--name` or `--id`. Specify `--disk` for an empty disk, or `--image` for an independent copy of a ready imported image. File pools use QCOW2; LVM and LVM-thin pools use raw logical volumes. Catalogue entries must be imported before they can be used as additional disks.

`--disk` is the total capacity, in GiB when no suffix is given. With an image, omitting it keeps the image's capacity; a larger value grows the copy, and a smaller value is rejected. The copied disk has no dependency on the original image.

Supported running guests can receive the disk live. A guest may still need to discover, partition, format and mount it. Existing snapshots or backup checkpoints can prevent adding disks. The command waits for the hardware job by default; `--no-wait` returns its ID. Use `list-disks` afterward to find the assigned target.

```sh
cloudmin create-disk --name guest.example.com --pool default --disk 50G
cloudmin create-disk --id MACHINE_UUID --pool default --image \
    IMPORTED_IMAGE_ID
```

Options:

- `--disk size`: Total disk capacity; bare values use GiB.
- `--id uuid`: Source virtual machine UUID.
- `--image ID|name`: Imported or catalogue image ID or name.
- `--name name`: Source virtual machine name.
- `--pool ID|name`: Destination storage pool ID or name.
