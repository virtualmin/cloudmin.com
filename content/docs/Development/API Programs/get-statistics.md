---
title: "get-statistics"
subSection: "Statistics"
date: 2026-11-12
weight: 2849410
---

### Shows host or virtual machine resource history

```text
cloudmin get-statistics [--multiline | --json]
                        [--entity value]
                        [--from number]
                        [--id value]
                        [--points number]
                        [--to number]
```


Shows the last hour of host history. `--id` selects a VM by UUID. `--from` and `--to` set the range using Unix timestamps in seconds, up to 366 days apart. `--points` sets the maximum number of points, from 60 to 1200. `--entity` selects a device ID from a previous query.

Use `--json` for timestamped readings, units, coverage and events. Missing readings are null. Resolution depends on the requested range and retained history.

```sh
cloudmin get-statistics --json
cloudmin get-statistics --id MACHINE_UUID --points 600 --json
```

Options:

- `--entity value`: Device ID returned by a statistics query.
- `--from number`: Start time in Unix seconds.
- `--id value`: Virtual machine UUID. Defaults to host.
- `--points number`: Maximum chart points, from 60 to 1200.
- `--to number`: End time in Unix seconds.
