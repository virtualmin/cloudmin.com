---
title: "pause-system"
date: 2026-10-30
weight: 2841060
---

### Pauses a running virtual machine

```text
cloudmin pause-system [--multiline | --json]
                      [--no-wait]
                      (--name name | --id uuid)
```


Pauses execution of a running machine selected by `--name` or `--id`. Its memory and virtual devices remain allocated on the host. This is not a saved state on disk and does not survive stopping the machine or shutting down the host.

The guest cannot process requests while paused. Network connections and application operations may time out. Resume execution with `unpause-system`; use `shutdown-system` when the goal is to stop the operating system cleanly and release its resources.

By default, waits for the paused state. `--no-wait` returns as soon as the pause request is accepted. Neither form creates a background job.

```sh
cloudmin pause-system --name guest.example.com
cloudmin pause-system --id MACHINE_UUID --no-wait
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
