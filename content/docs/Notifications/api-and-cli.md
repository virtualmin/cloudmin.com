---
title: "Notification API and CLI"
date: 2026-11-12
author: "Ilia Ross"
weight: 2735000
menuTitle: "API and CLI"
---

The web interface, command line and JSON API share the same notification rules and destinations. Run `cloudmin` as root on the host. See the [command reference](/docs/development/command-line/#notifications) for all notification commands.

### Command line

Save this destination in `target.json` with file permissions `0600`, so only its owner can read or write it:

```json
{"name":"Operations","type":"email","address":"ops@example.com","enabled":1}
```

```sh
cloudmin save-notification-target --file target.json
cloudmin get-notification-config --json
cloudmin test-notification-target --id TARGET_ID
```

Save this rule in `rule.json`. Replace `TARGET_ID` with the destination ID returned above:

```json
{
  "name": "Host memory pressure",
  "metric": "memory",
  "scope": "host",
  "threshold": 90,
  "duration": 5,
  "reminder": 0,
  "recovery": 1,
  "severity": "warning",
  "targets": ["TARGET_ID"],
  "enabled": 1
}
```

```sh
cloudmin save-notification-rule --file rule.json
cloudmin get-notifications --json
cloudmin get-notifications --id GUEST_UUID --cursor 0 --limit 100 --json
cloudmin delete-notification-rule --id RULE_ID
cloudmin delete-notification-target --id TARGET_ID
```

To switch a rule or destination on or off without resending its settings, use `set-notification-rule-enabled` or `set-notification-target-enabled`:

```sh
cloudmin set-notification-rule-enabled --id RULE_ID --enabled no
cloudmin set-notification-target-enabled --id TARGET_ID --enabled yes
```

To update a rule or destination, include its existing `id` and the full settings you want to save. Keep any optional values you still need. Omitting `secret` keeps its saved token only if the type and address stay the same. An empty `secret` removes a bearer token, but is rejected for Telegram, Pushover and Gotify.

Use these commands to mute or unmute one guest or all alerts:

```sh
cloudmin mute-notifications --id GUEST_UUID
cloudmin unmute-notifications --id GUEST_UUID
cloudmin mute-notifications --id all
cloudmin unmute-notifications --id all
```

Use `--file -` to read JSON from standard input. Remove a destination from all its rules before deleting it.

### API

These actions use version 1 of the authenticated API. `notifications` returns events and the latest status of each monitored condition. An optional guest `id` limits both to that guest. The `limit` sets how many events to return, from 1 to 500, with a default of 100.

Without a cursor, the API returns the latest events. Set `cursor=0` to start with the oldest retained event. Pass the returned cursor to read the next batch. Event IDs increase but may have gaps.

`notification_config` returns saved rules, destinations without tokens or private chat URLs, and the last background job status. Each destination's `last_delivery` shows the current result of its last recorded attempt. If that attempt record is unavailable, it uses the newest retained delivery record. The optional `at` field gives the attempt time. Records without a finished attempt have no time. `last_delivery` is null when no delivery record remains.

Changes require POST, host and management access, and a signed `token` obtained from `options`. Changes are blocked in read-only mode.

| Action | Fields |
| --- | --- |
| `save_notification_target` | `target` object |
| `set_notification_target_enabled` | `object` target ID and `enabled` flag |
| `save_notification_rule` | `rule` object and optional new `target` object |
| `set_notification_rule_enabled` | `object` rule ID and `enabled` flag |
| `delete_notification_target` | `object` target ID |
| `delete_notification_rule` | `object` rule ID |
| `test_notification_target` | `object` target ID |
| `retry_notification` | `object` event ID |
| `mute_notifications` | Guest UUID or `all` in `id` |
| `unmute_notifications` | Guest UUID or `all` in `id` |

`notifications` returns `muted` and `all_muted` as 0 or 1. For guest history, `muted` reports only that guest's own mute. For combined history, it reports the global mute. `all_muted` always reports the global mute. A guest is muted if either value is 1.

Events marked muted have a `silenced` field set to `guest` or `all`. Deliveries with state `muted` cannot be retried or sent later.

Passing a `target` object with `save_notification_rule` creates a destination for that rule instead of using `rule.targets`. Both are saved together. If either is invalid, neither is saved. The new target must not have an `id`. Use `save_notification_target` to update an existing destination.

The `metric` sets what to watch:

| Metrics | Units | Default threshold |
| --- | --- | --- |
| `cpu`, `memory`, `filesystem`, `pool` | Percent | 90 |
| `memory_free`, `filesystem_free`, `pool_free` | GiB | 1 |
| `load_1`, `load_5`, `load_15` | Load average | 1 |
| `network_receive`, `network_transmit`, `disk_read`, `disk_write` | MiB/s | 100 |
| `guest_down`, `guest_agent`, `pool_inactive`, `collector_stale` | Status | None |
| `job_failed` | Event | None |

Numeric rules accept `comparison: "ge"` for at or above, or `"le"` for at or below. Free memory and space metrics default to `le`; other numeric metrics default to `ge`. The `severity` can be `notice`, `warning` or `error`. The `device` identifies a mount point or a pool name or UUID.

Destination `type` accepts `email`, `webhook`, `slack`, `discord`, `teams`, `ntfy`, `telegram`, `pushover` or `gotify`. The `address` is the mailbox, webhook URL, ntfy topic URL, Telegram chat ID, Pushover user or group key, or Gotify server URL. Telegram stores its required bot token in `secret`.

Numeric chat IDs must fit Telegram's 52-bit range; usernames accept `@` followed by 4 to 32 letters, digits or underscores. Slack, Discord and Teams URLs may include signed query fields; generic webhook, ntfy and Gotify URLs may not.

Configuration responses replace private Slack, Discord and Teams addresses with `address_host` and `has_private_address: 1`. Pushover responses omit the recipient key and set `has_private_address: 1`. Supply the full private address when updating these destinations.

Pushover and Gotify store their required application token in `secret`. Omitting `secret` keeps it only when the destination type and address are unchanged. These methods reject an empty token or `clear_secret: 1`.

The `scope` sets which machines to monitor and defaults to `host`. It also accepts `guests`, one guest UUID or an array of one or more guest UUIDs. An array monitors only those guests and tracks their problems separately. `guests` includes guests added later. Only job failure rules accept `all`, which covers the host and all guests. Pool, load and collector-health rules require `host`. Guest power and agent rules require guests.

Generic webhook messages include `version`, `instance`, `id`, `host`, `owner`, `subject`, `label`, `rule`, `name`, `metric`, `threshold`, `comparison`, `unit`, `duration`, `value`, `phase`, `severity` and `created`. The `unit` is `%`, `GiB`, `MiB/s` or empty. The `duration` is the rule's wait in minutes, and is null for job failure and test events. The `phase` is `firing`, `reminder`, `resolved`, `failed` or `test`. Times are Unix timestamps in seconds. Measurements may be null, and so is the `unit` of a test event.

Guest history leaves out destinations and delivery results. Neither webhook messages nor API responses include raw guest agent or job errors.
