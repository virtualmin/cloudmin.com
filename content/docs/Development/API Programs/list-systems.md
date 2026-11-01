---
title: "list-systems"
subSection: "Virtual machines"
date: 2026-10-30
weight: 2841010
---

### Lists the virtual machines on this host

```text
cloudmin list-systems [--multiline | --json]
                      [--name-only | --id-only]
                      [--name name]*
                      [--id uuid]*
                      [--state running|stopped|paused]
                      [--template ID|name]
                      [--plan ID|name]
```


With no filters, lists the virtual machines visible to the caller, ordered by name. The default table shows each machine's name, power state, CPU count, memory allocation and known IP addresses.

Use `--name` or `--id` to select exact names or UUIDs. Repeat either option to select several machines. Multiple values of the same option are alternatives; different filters must all match. For example, two `--name` options with `--state running` show only the named machines that are running. An empty result means no machines matched.

`--state` accepts `running`, `stopped` or `paused`. `--template` and `--plan` accept an existing preset's ID or unambiguous name and match the recorded creation preset. They do not compare the machine's current settings with the preset.

Use `--multiline` to see details including UUID, disk capacity and automatic startup. A disk capacity that could not be measured is unknown, not zero. `--json` returns structured data for scripts. `--name-only` and `--id-only` print one name or UUID per line, without a heading.

```sh
cloudmin list-systems
cloudmin list-systems --state running --multiline
cloudmin list-systems --name web.example.com --name db.example.com \
    --id-only
cloudmin list-systems --plan "Default Plan" --json
```

Options:

- `--name name`: Exact virtual machine name.
- `--id uuid`: Exact virtual machine UUID.
- `--state running|stopped|paused`: Power state.
- `--template ID|name`: Template ID or name.
- `--plan ID|name`: Plan ID or name.
