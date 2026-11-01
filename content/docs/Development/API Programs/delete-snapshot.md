---
title: "delete-snapshot"
date: 2026-10-30
weight: 2843040
---

### Deletes a snapshot while keeping current disk data

```text
cloudmin delete-snapshot [--multiline | --json]
                         [--no-wait]
                         (--name name | --id uuid)
                         --snapshot value
                         --yes
```


Removes the restore point identified by `--snapshot` from the machine selected by `--name` or `--id`. `--yes` is required. Use `list-snapshots` to select the snapshot ID, rather than its label.

Deleting a file snapshot merges its disk layers. Deleting an LVM snapshot removes its saved volumes. Both preserve the machine's current disk contents and hardware settings. The selected restore point is no longer available afterward.

History dependencies can prevent deletion, and external snapshot history cannot be changed through this command. Merges may take time and require free space. The command waits for the job unless `--no-wait` is supplied. If a merge is interrupted, use `get-job` and `recover-job`; deleting layer files by hand can damage the remaining disk chain.

```sh
cloudmin delete-snapshot --name guest.example.com --snapshot SNAPSHOT_ID \
    --yes
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
- `--snapshot value`: Snapshot ID.
- `--yes`: Confirm this operation.
