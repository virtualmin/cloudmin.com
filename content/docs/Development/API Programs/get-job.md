---
title: "get-job"
date: 2026-10-30
weight: 2846020
---

### Shows a job's current progress

```text
cloudmin get-job [--multiline | --json]
                 --job value
```


Reads the current public record for `--job`. This is a job ID returned by a submitted operation or `list-jobs`, not a virtual machine UUID. It reports state, phase, recorded events, errors and available cleanup information.

The command reads once and returns; it does not keep following the worker. Use it after submitting an operation with `--no-wait` or after losing a terminal connection. `--multiline` expands details, while `--json` is suitable for polling from a script.

A successful status read does not itself mean the underlying job succeeded. Check the returned job state and error. A failed or cancelled job with cleanup pending may still hold resources; `recover-job` can retry that cleanup. For bridge changes, use `get-bridge-status` instead.

```sh
cloudmin get-job --job JOB_ID --multiline
cloudmin get-job --job JOB_ID --json
```

Options:

- `--job value`: Job ID.
