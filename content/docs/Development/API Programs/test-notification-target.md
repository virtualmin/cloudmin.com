---
title: "test-notification-target"
date: 2026-11-12
weight: 2849600
---

### Queues a test notification for the next delivery run

```text
cloudmin test-notification-target [--multiline | --json]
                                  --id value
```


Queues a test for the enabled destination selected by `--id`. Delivery runs at the configured interval, which defaults to 60 seconds. Check the delivery result with `get-notifications`. Command success means the test was queued, not delivered.

```sh
cloudmin test-notification-target --id TARGET_ID
```

Options:

- `--id value`: Destination ID.
