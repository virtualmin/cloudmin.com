---
title: "restore-systems"
date: 2026-10-30
weight: 2844040
---

### Restores an inspected backup with its original identity

```text
cloudmin restore-systems [--multiline | --json]
                         [--no-wait]
                         --inspection value
                         --pool ID|name
                         --yes
```


Restores one backup that has already completed `inspect-backup`. `--inspection` is the inspection job ID, and `--pool` selects the destination storage pool. `--yes` confirms restoring the archived machine and disks.

Restoration preserves the original machine name, UUID, MAC addresses, guest credentials and supported firmware state. It refuses a conflicting existing name or UUID even if that machine is stopped. This command is for recovering a machine; use `clone-system` when you need another machine with a new identity.

The destination host must support the archive's architecture, firmware and saved network sources. Ensure those networks and bridges are available and that the pool has enough space. The restored machine is left stopped with automatic startup disabled, so its configuration can be checked before it joins the network.

The command waits for the restore job by default. `--no-wait` returns its ID. After success, use `get-system`, then `start-system` when ready. If restoration or cleanup is interrupted, inspect the job and use `recover-job` rather than submitting duplicate restores.

```sh
cloudmin restore-systems --inspection INSPECTION_JOB_ID --pool default \
    --yes
cloudmin restore-systems --inspection INSPECTION_JOB_ID --pool default \
    --yes --no-wait
```

Options:

- `--inspection value`: Completed inspection job ID.
- `--pool ID|name`: Destination storage pool ID or name.
- `--yes`: Confirm this operation.
