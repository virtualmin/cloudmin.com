---
title: "unmute-notifications"
date: 2026-11-12
weight: 2849620
---

### Resumes alerts after a manual mute

```text
cloudmin unmute-notifications [--multiline | --json]
                              --id value
```


Ends the mute selected by `--id`. Use a guest UUID for that guest or `all` for the host and all guests. Guests muted separately stay muted when you unmute all. Unmuting a guest does not override a global mute.

At the next fresh check, a problem that is still present sends one new alert, even when reminders are disabled. A problem that has recovered stays quiet. Muted deliveries are never sent later.

You need host and management access. Changes are blocked in read-only mode.

```sh
cloudmin unmute-notifications --id MACHINE_UUID
cloudmin unmute-notifications --id all
```

Options:

- `--id value`: Virtual machine UUID, or all for host and guests.
