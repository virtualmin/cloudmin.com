---
title: "attach-disk"
date: 2026-10-30
weight: 2842030
---

### Attaches an unused storage volume

```text
cloudmin attach-disk [--multiline | --json]
                     [--no-wait]
                     (--name name | --id uuid)
                     --pool ID|name
                     --volume value
```


Attaches an existing unused volume to the machine selected by `--name` or `--id`. `--pool` identifies its storage pool, and `--volume` is the volume's name inside that pool, not a host filesystem path. Use this when reusing a disk kept by `detach-disk` or machine deletion.

The volume must be a supported raw or QCOW2 disk and pass ownership and dependency checks. Cloudmin protects imported images and disks referenced by other machines or storage. To create a separate copy of an imported image, use `create-disk --image` instead.

Supported running guests can receive the attachment live; Cloudmin does not mount or reconfigure filesystems inside the guest. Snapshots or checkpoints may block this change. The command waits for the hardware job unless `--no-wait` is supplied. `list-disks` shows the new target after completion.

```sh
cloudmin attach-disk --name guest.example.com --pool default --volume \
    data.qcow2
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
- `--pool ID|name`: Destination storage pool ID or name.
- `--volume value`: Volume name in the pool.
