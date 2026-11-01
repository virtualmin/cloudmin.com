---
title: "poweroff-system"
date: 2026-10-30
weight: 2841100
---

### Powers off immediately without a clean shutdown

```text
cloudmin poweroff-system [--multiline | --json]
                         [--no-wait]
                         (--name name | --id uuid)
                         --yes
```


Immediately stops the machine selected by `--name` or `--id`, without asking the guest operating system to shut down. Unsaved data can be lost. `--yes` is required. Use `shutdown-system` when the guest can shut down cleanly.

The machine definition, disks and automatic startup setting are retained. Use `start-system` to start the machine again.

By default, waits for the host to report the machine stopped. `--no-wait` returns after the forced stop is accepted. This is a power operation, not a background job.

```sh
cloudmin poweroff-system --name guest.example.com --yes
cloudmin poweroff-system --id MACHINE_UUID --yes --no-wait
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
- `--yes`: Confirm this operation.
