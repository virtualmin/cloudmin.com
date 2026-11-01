---
title: "restore-snapshot"
date: 2026-10-30
weight: 2843030
---

### Restores a saved snapshot

```text
cloudmin restore-snapshot [--multiline | --json]
                          [--no-wait]
                          (--name name | --id uuid)
                          [--restart]
                          [--shutdown]
                          --snapshot value
                          --yes
```


Restores the machine selected by `--name` or `--id` to the restore point identified by `--snapshot`. Use `list-snapshots` to obtain that ID. `--yes` confirms replacing current disk contents and saved hardware settings with the snapshot's state.

The machine must be stopped, or `--shutdown` must permit a clean shutdown first. Add `--restart` to start it after a successful restore. Without that flag, it remains stopped. A failed clean shutdown does not become a forced power-off.

The restore does not resume the old running memory state. Changes made after the restore point can be lost, including files and application data. Other restore points are retained, but only supported Cloudmin-managed history can be restored.

The command waits for the background job by default. `--no-wait` returns its ID. After success, inspect the guest and its applications before treating the restored service as ready.

```sh
cloudmin restore-snapshot --name guest.example.com --snapshot \
    SNAPSHOT_ID --yes
cloudmin restore-snapshot --id MACHINE_UUID --snapshot SNAPSHOT_ID \
    --shutdown --restart --yes
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
- `--restart`: Start after restoring.
- `--shutdown`: Permit clean shutdown before restoring.
- `--snapshot value`: Snapshot ID.
- `--yes`: Confirm this operation.
