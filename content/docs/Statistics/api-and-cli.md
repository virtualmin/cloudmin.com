---
title: "API and CLI"
date: 2026-11-12
author: "Ilia Ross"
weight: 2734000
---

### Command line

Run `cloudmin` as root on the host. [get-statistics](/docs/development/api-programs/get-statistics/) reads chart data. [export-statistics](/docs/development/api-programs/export-statistics/) reads completed summaries in batches. Use `--json` for scripts.

```sh
cloudmin get-statistics --json
cloudmin get-statistics --id MACHINE_UUID --points 600 --json
cloudmin export-statistics --step 60 --limit 500 --json
cloudmin export-statistics --step 60 --cursor CURSOR --json
```

### API

Both read actions use the [versioned JSON API](/docs/development/virtual-machine-api/) and allow authenticated GET requests without a form token. Host queries and exports require host-administrator access. Delegated users must supply an assigned guest UUID when querying its history.

Use `action=statistics` with these fields:

| Field | Meaning |
| --- | --- |
| `id` | `host` or an exact guest UUID; defaults to `host` |
| `from`, `to` | Unix timestamps in seconds; defaults to the last hour, with a maximum span of 366 days |
| `points` | Maximum output points, from 60 to 1200; defaults to 600 |
| `entity` | Optional device ID returned by a previous authorized query |

The result includes units, available devices, the selected resolution, timestamped readings, coverage, peaks, events, collector status and latest live readings. Missing values are JSON `null`. Device choices include removed devices with retained history in the requested period.

### Export summaries

Use `action=statistics_export` with `step` set to 60, 300 or 3600 seconds and `limit` from 1 to 1000 rows. The defaults are 60 seconds and 500 rows. Pass the returned `cursor` to read the next batch. Retry the same cursor after a failed transfer, and save received rows and their new cursor in one transaction.

Identify a summary by `(host_id, generation, entity, step, t)`. Completed numeric summaries do not change, while entity names reflect their current display names. Each metric carries `sum`, `duration`, `min`, `max` and `count`. For gauges, `sum` is the reading multiplied by valid seconds. For counters, it is the accumulated increment, while `min` and `max` are rates. Divide `sum` by `duration` for an average. Merge summaries by adding sums and durations, rather than averaging their averages.

The response includes `more`, `available_from` and `retention_gap`. A retention gap means some summaries have expired. Try a coarser interval for the missing period, without adding overlapping resolutions together. A cursor from another database generation requires a new synchronization session.

The host ID is a random UUID saved in `statistics-host-id` in the module configuration directory. Recreating the history database changes its generation but keeps the host ID. A cloned host installation needs its own statistics host ID before collection starts. The optional `hardware_uuid` is for inventory only and must not replace `host_id`.

This API can support your own monitoring tools and future Cloudmin Connect synchronization. It does not install a Connect server, send history elsewhere automatically or expose an unauthenticated metrics endpoint.
