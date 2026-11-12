---
title: "save-notification-rule"
date: 2026-11-12
weight: 2849560
---

### Saves a notification rule from a JSON object

```text
cloudmin save-notification-rule [--multiline | --json]
                                --file file|-
```


Reads a complete rule object from `--file`, or standard input with `--file -`. Include `name`, `metric` and a `targets` array of one or more destination IDs. Include an existing `id` to replace a rule. This cancels its queued deliveries and starts a new check period. Include optional settings you want to keep.

Metrics are `cpu`, `memory`, `filesystem`, `pool`, `memory_free`, `filesystem_free`, `pool_free`, `load_1`, `load_5`, `load_15`, `network_receive`, `network_transmit`, `disk_read`, `disk_write`, `guest_down`, `guest_agent`, `pool_inactive`, `collector_stale` and `job_failed`. Scope defaults to `host`. It accepts `host`, `guests`, a guest UUID or an array of one or more guest UUIDs. An array checks only those guests, with separate incidents for each. `guests` includes guests added later. Job failures also accept `all`. Pool, load and collector-health rules monitor only the host. Guest power and agent conditions require guests.

`threshold` defaults to 90 for usage in percent, 1 for free memory or space in GiB, 1 for host load, and 100 for rates in MiB/s. `comparison` accepts `ge` for at or above and `le` for at or below. Free memory and space rules default to `le`; other numeric rules default to `ge`. `duration` and `cooldown` default to five minutes. `reminder` defaults to zero minutes, which disables reminders. Zero duration removes the initial wait but still respects the interval between new alerts.

`severity` defaults to `warning`. `enabled` and `recovery` default to 1. Recovery messages always use `notice`. `device` selects a mount point or pool. A blank host filesystem path selects `/`. A blank guest mount point selects every reported filesystem. A blank pool selects every active pool for usage or free space. Pool inactivity rules include all known pools.

```sh
cloudmin save-notification-rule --file rule.json
```

Options:

- `--file file|-`: JSON file, or - for stdin.
