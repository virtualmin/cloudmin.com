---
title: "delete-disk"
date: 2026-10-30
weight: 2842050
---

### Detaches and permanently deletes one disk

```text
cloudmin delete-disk [--multiline | --json]
                     [--no-wait]
                     (--name name | --id uuid)
                     --target value
                     --yes
```


Detaches and permanently deletes one managed disk from the machine selected by `--name` or `--id`. `--target` must be an attached disk target from `list-disks`. `--yes` confirms deletion. Other disks and the machine itself are retained.

Use `detach-disk` when the data should be kept. Deletion cannot be undone by job recovery. Imported images, shared disks and disks with protected dependencies are refused. Snapshot or checkpoint history can also block the operation.

The operation runs as a job. By default, the command waits for completion; `--no-wait` returns its ID. If deletion is interrupted after detachment, use `recover-job` to let Cloudmin verify and finish removal of the same volume. This operation cannot be included in `modify-system --changes-file`.

```sh
cloudmin delete-disk --name guest.example.com --target vdb --yes
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
- `--target value`: Attached disk target.
- `--yes`: Confirm this operation.
