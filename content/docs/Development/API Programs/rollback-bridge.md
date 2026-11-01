---
title: "rollback-bridge"
date: 2026-10-30
weight: 2848050
---

### Requests recovery of the previous network settings

```text
cloudmin rollback-bridge [--multiline | --json]
                         [--no-wait]
                         --id value
```


Requests restoration of the previous network settings for the bridge transaction identified by `--id`. Use the transaction ID from `get-bridge-status`. The transaction must still allow recovery; this is not an undo command for an already confirmed change.

Recovery runs on the host and can interrupt the SSH connection again as addresses move back. By default, the command waits for the transaction's recovery result. `--no-wait` returns immediately; check `get-bridge-status` after reconnecting.

A timed-out unconfirmed change also starts automatic recovery. If recovery reports an error, inspect its status and resolve the error before submitting another bridge change.

```sh
cloudmin rollback-bridge --id TRANSACTION_ID
cloudmin rollback-bridge --id TRANSACTION_ID --no-wait
```

Options:

- `--id value`: Bridge transaction ID.
