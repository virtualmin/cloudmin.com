---
title: "Notification History and Delivery"
date: 2026-11-12
author: "Ilia Ross"
weight: 2724000
menuTitle: "History and Delivery"
---

**History** shows conditions needing attention and all retained events, including alerts, reminders, recoveries and test messages. Events appear 25 at a time, newest first. Host administrators can see each destination's delivery result. Users with management access can also retry failed deliveries unless the session is read-only. Select a guest and open **Notifications** to see only its history.

### Searching history

Use the search box above the events to find alerts, recoveries, reminders and tests by rule name, affected resource, condition, severity, state or recorded values. Searches cover all retained history, including older events. Letter case is ignored and punctuation is matched as ordinary text. Delivery addresses and errors are not searched.

Each event shows the reading and threshold saved when it occurred, so older events keep their original values even after a rule changes. Users assigned to a guest can search only that guest's events. Conditions needing attention stay visible while you search or browse older pages.

### Delivery retries

Failed deliveries retry with increasing delays, up to six attempts in total, except for permanent Pushover rejections. Messages more than a day overdue expire. Successful email delivery means the receiving server accepted the message, not that it reached an inbox. If the receiver accepts a message but its response is lost, Cloudmin may send it again. Webhook receivers can use `(instance, id)` or the `Idempotency-Key` header to avoid processing the same alert more than once.

### Retention and restarts

Cloudmin keeps rules, alert state and unsent messages across restarts in the private `notifications/notifications.sqlite` database. It is separate from resource history and its disk budget. Events older than 30 days are removed once none of their deliveries are pending.

The [API and CLI](/docs/notifications/api-and-cli/) read the same history in batches of up to 500 events, by page or by cursor, with the same search filter.

### Muted events

Muted events stay in history. This includes events created during a mute and queued alerts canceled when you mute. Deliveries marked muted cannot be retried or sent later. After unmuting, a problem still present at the next fresh check sends one new alert. Problems that have recovered stay quiet. See [Muting Alerts](/docs/notifications/muting-alerts/).
