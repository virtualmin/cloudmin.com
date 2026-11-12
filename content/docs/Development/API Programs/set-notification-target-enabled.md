---
title: "set-notification-target-enabled"
date: 2026-11-12
weight: 2849550
---

### Enables or disables a notification target

```text
cloudmin set-notification-target-enabled [--multiline | --json]
                                         --enabled yes|no
                                         --id value
```


Enables or disables the destination selected by `--id`. Supply `--enabled yes` or `--enabled no`. Its other settings and saved token are kept. Disabling cancels its queued deliveries. They are not resent when it is enabled again.

```sh
cloudmin set-notification-target-enabled --id TARGET_ID --enabled no
```

Options:

- `--enabled yes|no`: Whether the target is enabled.
- `--id value`: Saved notification target ID.
