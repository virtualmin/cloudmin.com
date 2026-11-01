---
title: "confirm-bridge"
date: 2026-10-30
weight: 2848040
---

### Keeps the new network settings after checking connectivity

```text
cloudmin confirm-bridge [--multiline | --json]
                        --id value
```


Keeps the new network settings for the pending bridge transaction identified by `--id`. Use the transaction ID returned by the change or `get-bridge-status`, not the bridge name. The transaction must still be awaiting confirmation and within its deadline.

Confirm only after reconnecting and checking the host's network access. Cloudmin performs its connectivity checks before accepting confirmation. A confirmed change no longer rolls back automatically when the original deadline passes.

To reject the change, use `rollback-bridge`. Once it is confirmed, that rollback command is not a general undo operation for the completed change.

```sh
cloudmin confirm-bridge --id TRANSACTION_ID
```

Options:

- `--id value`: Bridge transaction ID.
