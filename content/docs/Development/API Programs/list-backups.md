---
title: "list-backups"
subSection: "Backups"
date: 2026-10-30
weight: 2844010
---

### Lists completed backup archives

```text
cloudmin list-backups [--multiline | --json]
                      [--name-only | --id-only]
```


Lists completed backup archives recorded by this Cloudmin host. The table includes backup job ID, source machine name, creation time, archive size and destination. Use the ID with `inspect-backup --backup` before restoring.

This is the local backup inventory, not a scan of every destination. An archive removed outside Cloudmin can still have a record here; inspection verifies that it is available and usable. Backups created on another host can be inspected by supplying their destination and filename directly.

`--multiline` and `--json` show detailed records without destination credentials. `--name-only` prints source machine names, which can repeat across backups. `--id-only` prints backup job IDs, not virtual machine UUIDs.

```sh
cloudmin list-backups --multiline
cloudmin list-backups --id-only
```
