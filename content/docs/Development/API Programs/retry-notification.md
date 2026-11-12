---
title: "retry-notification"
date: 2026-11-12
weight: 2849590
---

### Retries failed deliveries for one event

```text
cloudmin retry-notification [--multiline | --json]
                            --id number
```


Retries deliveries that have stopped after failure or expiry for the event selected by `--id`. Successful or cancelled deliveries are left alone. The original event ID is reused. Correct the destination or restore its quota before retrying a permanent Pushover rejection.

```sh
cloudmin retry-notification --id 42
```

Options:

- `--id number`: Notification event ID.
