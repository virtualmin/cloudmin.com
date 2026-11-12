---
title: "delete-notification-rule"
date: 2026-11-12
weight: 2849570
---

### Deletes a notification rule

```text
cloudmin delete-notification-rule [--multiline | --json]
                                  --id value
```


Removes the rule selected by `--id`, clears its current alert state and cancels its queued deliveries. Existing event history is kept.

```sh
cloudmin delete-notification-rule --id RULE_ID
```

Options:

- `--id value`: Saved notification rule ID.
