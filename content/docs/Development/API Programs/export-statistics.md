---
title: "export-statistics"
date: 2026-11-12
weight: 2849420
---

### Exports completed resource summaries for synchronization

```text
cloudmin export-statistics [--multiline | --json]
                           [--cursor value]
                           [--limit number]
                           [--step number]
```


Exports completed summaries for host administrators. `--step` selects 60, 300 or 3600 seconds. `--limit` sets the maximum batch size, from 1 to 1000 rows. Pass the returned cursor with `--cursor` to resume. Retry the same cursor after a failed transfer.

Use `--json` and save rows and their cursor in one transaction. Restart synchronization if the database generation changes. A retention gap means summaries have expired. Use a coarser interval for the missing range without combining overlapping resolutions.

```sh
cloudmin export-statistics --step 60 --limit 500 --json
cloudmin export-statistics --step 60 --cursor CURSOR --json
```

Options:

- `--cursor value`: Cursor returned by the previous export batch.
- `--limit number`: Maximum rows per batch, from 1 to 1000.
- `--step number`: Summary interval: 60, 300 or 3600 seconds.
