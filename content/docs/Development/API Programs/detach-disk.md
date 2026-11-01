---
title: "detach-disk"
date: 2026-10-30
weight: 2842040
---

### Detaches a disk while keeping its data

```text
cloudmin detach-disk [--multiline | --json]
                     [--no-wait]
                     (--name name | --id uuid)
                     --target value
```


Removes an attachment from the machine selected by `--name` or `--id` while keeping the storage volume and its data. `--target` is an attached device name from `list-disks`, such as `vdb`. This is different from `delete-disk`, which also removes the volume permanently.

Before detaching a disk in use, stop the guest applications using it and unmount it. For live removal, Cloudmin waits for the device to disappear from libvirt's running definition before updating the saved configuration. If the guest does not acknowledge removal, the job can fail and require recovery.

Snapshots, checkpoints and unsupported devices can prevent detachment. The command waits for the job by default; `--no-wait` returns its ID. Use `attach-disk` with the original pool and volume name to attach the kept disk again.

```sh
cloudmin detach-disk --name guest.example.com --target vdb
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
- `--target value`: Attached disk target.
