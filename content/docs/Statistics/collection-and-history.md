---
title: "Collection and History"
date: 2026-11-12
author: "Ilia Ross"
weight: 2723000
---

### Background collection

Cloudmin installs and enables `cloudmin-statistics.service` unless resource statistics are disabled. It collects host readings and samples all libvirt guests in one bulk call, even when no browser is open. Guest filesystem checks run separately, with timeouts and increasing retry delays when an agent is unavailable.

The service supplies live readings to the overview, guest details and Statistics pages. SSH reachability, address discovery and application health checks are separate. Collection requires Linux and a local `qemu:///system` connection.

### Sampling and recording

Host administrators can change these settings in **Module Configuration**:

| Setting | Default | Effect |
| --- | --- | --- |
| Enable resource statistics? | Yes | Disabling stops collection, prevents it starting at boot and hides both Statistics menu links. Saved history is kept and VM power controls remain available. |
| Record resource history? | Yes | Disabling stops new history records while live readings continue. Existing history remains subject to retention and the disk budget. |
| Live sampling interval in seconds | 10 | Accepts 5–60 seconds. The chart display still refreshes every ten seconds. |
| Guest filesystem interval in seconds | 60 | Accepts 60–300 seconds. Failed checks may wait longer before retrying. |

Saving the collection setting starts or stops the service immediately. Other settings apply on its next sampling tick. Settings survive upgrades. Saved history can still be queried through the API when collection is disabled.

### Retention and disk space

Cloudmin keeps detailed recent readings and summarizes older history. The default limits are:

| Setting | Default retention | Detail retained |
| --- | --- | --- |
| Keep full-resolution history in hours | 24 hours | Host, guests and individual devices at the sampling interval |
| Keep one-minute history in days | 7 days | Host, guests and individual devices |
| Keep five-minute history in days | 30 days | Host, guests and individual devices |
| Keep hourly history in days | 365 days | Host and guest totals, without individual devices |

State, device and connection events use the hourly history retention limit. The allowed ranges are 1–168 hours for full-resolution history, 1–30 days for one-minute history, 1–366 days for five-minute history and 1–1825 days for hourly history.

**History disk budget in MiB** defaults to 1024. Retention settings are maximum ages, not guaranteed storage periods. When the budget is reached, older detailed readings are removed first, so a busy host may retain less history. Lowering the budget does not shrink existing files immediately.

History is stored in the module's private `metrics.sqlite` database, separate from jobs. Keep it on local storage because its SQLite write-ahead log requires a local filesystem. Live readings use a separate runtime cache, so a history write failure does not stop live collection.

### Host network totals

Leave **Host network uplinks** empty for automatic selection of physical interfaces and bonds, without counting both a bond and its member ports. Guest tap and vnet interfaces are excluded.

To choose the measured interfaces yourself, enter names separated by spaces or commas, such as `eno1 eno2`. Do not include both an interface and its underlying ports. A bridge's own counters can omit forwarded traffic, so select the ports carrying the traffic you want to measure.
