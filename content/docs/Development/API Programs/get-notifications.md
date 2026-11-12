---
title: "get-notifications"
subSection: "Notifications"
date: 2026-11-12
weight: 2849510
---

### Lists notification events

```text
cloudmin get-notifications [--multiline | --json]
                           [--cursor number]
                           [--id value]
                           [--limit number]
```


Lists the latest 100 events by default. `--id` limits results to one guest UUID. Use `--cursor 0` to start at the oldest retained event, then pass the returned cursor to continue. `--limit` accepts 1 to 500. Events are kept for 30 days, or longer while delivery is pending.

```sh
cloudmin get-notifications --json
cloudmin get-notifications --cursor 0 --limit 100 --json
```

Options:

- `--cursor number`: Read after this event ID. Use 0 to start at the oldest.
- `--id value`: Limit to one virtual machine UUID.
- `--limit number`: Maximum events, from 1 to 500.
