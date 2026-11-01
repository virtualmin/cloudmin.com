---
title: "recover-job"
date: 2026-10-30
weight: 2846040
---

### Resumes interrupted work or retries cleanup

```text
cloudmin recover-job [--multiline | --json]
                     [--no-wait]
                     --job value
```


Reattaches or restarts work for the job identified by `--job`, including retrying cleanup marked as pending. It uses the original job's recorded operation and resource identities rather than submitting a new request.

The result depends on the operation. Recovery can finish an interrupted hardware write, restore a source after copying, or remove incomplete creation resources. It checks the recorded state before proceeding and refuses unrelated changes. It cannot shrink a disk back after growth or recover data that was permanently deleted.

A failed job without pending cleanup is not automatically retried as a fresh operation. Likewise, recovery is not a way to rerun completed guest setup scripts. Inspect `get-job --multiline` for the failure and cleanup state first.

By default, waits until work or cleanup finishes. `--no-wait` returns immediately. Successful cleanup can leave the original job failed or cancelled with no cleanup pending; that records the original outcome while releasing its resources.

```sh
cloudmin recover-job --job JOB_ID
cloudmin recover-job --job JOB_ID --no-wait
```

Options:

- `--job value`: Job ID.
