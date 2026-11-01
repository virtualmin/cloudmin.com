---
title: "cancel-job"
date: 2026-10-30
weight: 2846030
---

### Requests cancellation at the next safe point

```text
cloudmin cancel-job [--multiline | --json]
                    [--no-wait]
                    [--cleanup]
                    --job value
                    [--yes]
```


Requests cancellation of the unfinished job identified by `--job`. Cancellation takes effect at a safe point in the worker; it is not an immediate process kill. Copying and backup operations may need to restore source disk state before releasing their reservations.

Started hardware changes cannot be cancelled after their first write. If such a change fails, use `recover-job`. Completed, failed or already cancelled jobs cannot receive a new cancellation request.

During guest software setup, ordinary cancellation leaves the created machine and changes already made inside it. `--cleanup --yes` explicitly requests removal of an eligible unfinished creation and its owned resources. This is not a general command for deleting a completed virtual machine.

By default, waits for cancellation and any cleanup. `--no-wait` returns immediately. Inspect the job afterward; a cancellation request is not proof that cleanup has finished. `recover-job` retries pending cleanup if the worker could not complete it.

```sh
cloudmin cancel-job --job JOB_ID
cloudmin cancel-job --job JOB_ID --cleanup --yes
```

Options:

- `--cleanup`: Also remove an unfinished creation; requires --yes.
- `--job value`: Job ID.
- `--yes`: Confirm this operation.
