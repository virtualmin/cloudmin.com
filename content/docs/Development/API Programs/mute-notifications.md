---
title: "mute-notifications"
date: 2026-11-12
weight: 2849610
---

### Mutes alerts until manually unmuted

```text
cloudmin mute-notifications [--multiline | --json]
                            --id value
```


Mutes alerts for the guest selected by `--id`. Use `--id all` to mute the host and every guest, including guests added later. Mutes stay active until you undo them with `unmute-notifications`, including after restarts.

Checks and history continue. Pending deliveries are marked muted and will not be sent later. Destination tests still send. A delivery already in progress may finish.

You need host and management access. Changes are blocked in read-only mode.

```sh
cloudmin mute-notifications --id MACHINE_UUID
cloudmin mute-notifications --id all
```

Options:

- `--id value`: Virtual machine UUID, or all for host and guests.
