---
title: "discard-job"
date: 2026-10-30
weight: 2846050
---

### Keeps completed disk growth and discards the remaining failed edits

```text
cloudmin discard-job [--multiline | --json]
                     --job value
```


Abandons the remaining edits of an eligible failed settings-update job while keeping disk growth that already completed. `--job` identifies that update. Use this only when you want to stop recovery of the remaining edits; `recover-job` attempts to finish them instead.

Cloudmin first checks that the original hardware definition is unchanged. It removes new disks allocated by the job only after verifying their identity and that nothing uses them. Completed disk growth remains because it cannot be undone safely.

When those checks pass, the job releases its reservation so the machine can be edited again. Conflicting changes or uncertain ownership block the operation. This command does not delete job history, cancel an active worker or undo other operations.

```sh
cloudmin discard-job --job JOB_ID
```

Options:

- `--job value`: Job ID.
