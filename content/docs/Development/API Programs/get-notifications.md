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
                           [--page number]
                           [--search value]
```


Lists the latest 100 events by default. `--id` limits results to one guest UUID. Use `--cursor 0` to start at the oldest retained event, then pass the returned cursor to continue. `--limit` accepts 1 to 500. Events are kept for 30 days, or longer while delivery is pending.

`--page 1` returns the newest page. Increase it to read older pages. It cannot be combined with `--cursor`. Requesting a page past the end returns the last page. Results include the number of matching events and pages. Events within each batch are ordered by increasing ID.

`--search` finds a single-line phrase of up to 200 characters in event details. It ignores letter case, treats punctuation as ordinary text and trims spaces at both ends. It searches all retained events you can access before counting them and selecting a page. It does not search delivery addresses or errors, or filter current condition states.

```sh
cloudmin get-notifications --json
cloudmin get-notifications --cursor 0 --limit 100 --json
cloudmin get-notifications --page 2 --limit 25 --search memory --json
```

Options:

- `--cursor number`: Read after this event ID. Use 0 to start at the oldest.
- `--id value`: Limit to one virtual machine UUID.
- `--limit number`: Maximum events, from 1 to 500.
- `--page number`: Page number, with 1 for the newest events. Cannot be combined with `--cursor`.
- `--search value`: Find a phrase in event details, ignoring letter case.
