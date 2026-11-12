---
title: "delete-notification-target"
date: 2026-11-12
weight: 2849540
---

### Deletes a notification target

```text
cloudmin delete-notification-target [--multiline | --json]
                                    --id value
```


Removes the destination selected by `--id` and cancels its queued deliveries. Remove it from all rules first. Existing event history is kept.

```sh
cloudmin delete-notification-target --id TARGET_ID
```

Options:

- `--id value`: Saved notification target ID.
