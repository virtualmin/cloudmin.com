---
title: "Notification History and Delivery"
date: 2026-11-12
author: "Ilia Ross"
weight: 2734000
menuTitle: "History and Delivery"
---

**History** shows conditions needing attention and the latest 100 events, including alerts, reminders, recoveries and test messages. Host administrators can see each destination's delivery result. Users with management access can also retry failed deliveries unless the session is read-only. Select a guest and open **Notifications** to see only its history.

### Delivery retries

Failed deliveries retry with increasing delays, up to six attempts in total, except for permanent Pushover rejections. Messages more than a day overdue expire. Successful email delivery means the receiving server accepted the message, not that it reached an inbox. If the receiver accepts a message but its response is lost, Cloudmin may send it again. Webhook receivers can use `(instance, id)` or the `Idempotency-Key` header to avoid processing the same alert more than once.

### Retention and restarts

Cloudmin keeps rules, alert state and unsent messages across restarts in the private `notifications/notifications.sqlite` database. It is separate from resource history and its disk budget. Events older than 30 days are removed once none of their deliveries are pending.

Use the [API or CLI](/docs/notifications/api-and-cli/) to read more than the latest 100 events. Both support batches of up to 500 events and a cursor to continue from the previous batch.
