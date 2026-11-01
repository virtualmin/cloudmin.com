---
title: "get-bridge-status"
date: 2026-10-30
weight: 2848020
---

### Shows the current bridge transaction

```text
cloudmin get-bridge-status [--multiline | --json]
                           [--id value]
```


Shows the current host bridge transaction, including its state and available confirmation or recovery information. Without `--id`, selects the current transaction. With `--id`, requires that specific transaction so a stale script does not act on a newer change.

The transaction ID is returned by bridge changes; it is not the bridge name or a normal background job ID. The result can be empty when there is no transaction. `--json` returns structured status for scripts, and `--multiline` expands human-readable details.

Use this after a connection interruption or `remove-bridge --no-wait`. A change awaiting confirmation must be kept with `confirm-bridge` before its deadline, or it is automatically rolled back. Private recovery files are not included in the response.

```sh
cloudmin get-bridge-status --multiline
cloudmin get-bridge-status --id TRANSACTION_ID --json
```

Options:

- `--id value`: Transaction ID; omitted selects the current transaction.
