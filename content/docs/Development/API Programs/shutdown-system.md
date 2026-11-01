---
title: "shutdown-system"
date: 2026-10-30
weight: 2841040
---

### Shuts down a virtual machine cleanly

```text
cloudmin shutdown-system [--multiline | --json]
                         [--no-wait]
                         (--name name | --id uuid)
```


Requests a clean shutdown of the machine selected by `--name` or `--id`. The guest operating system must respond to the shutdown request. Its disks, saved hardware settings and automatic startup setting are retained.

By default, waits up to two minutes for the host to report the machine stopped. A timeout fails the command but does not cancel the shutdown request: the guest can still stop later. Cloudmin never turns a timed-out clean shutdown into a forced power-off.

`--no-wait` returns after the request is accepted. Use `get-system` or `list-systems` to check the state later. Use `restart-system` for a clean shutdown followed by a start, or `poweroff-system --yes` when a forced stop is necessary.

```sh
cloudmin shutdown-system --name guest.example.com
cloudmin shutdown-system --id MACHINE_UUID --no-wait
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
