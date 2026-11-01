---
title: "list-snapshots"
subSection: "Snapshots"
date: 2026-10-30
weight: 2843010
---

### Lists snapshots for the host or one virtual machine

```text
cloudmin list-snapshots [--multiline | --json]
                        [--name-only | --id-only]
                        [--name name | --id uuid]
```


With no machine selector, lists snapshots across the host. Supply `--name` or `--id` to limit the list to one virtual machine. `--id` is the machine UUID; a restore point's own identifier is passed as `--snapshot` to restore or delete commands.

The default table shows snapshot ID, machine, label, state and creation time. `--multiline` or `--json` provides detailed records. `--id-only` and `--name-only` both print snapshot IDs, since labels need not be unique.

Cloudmin can show externally created snapshots, but it may not support restoring or deleting them. Cloudmin-managed snapshots contain disk state and saved hardware configuration, not running memory. They remain on the host's storage and do not replace backups stored elsewhere.

```sh
cloudmin list-snapshots
cloudmin list-snapshots --name guest.example.com --multiline
cloudmin list-snapshots --id MACHINE_UUID --id-only
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
