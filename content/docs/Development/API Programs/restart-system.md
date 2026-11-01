---
title: "restart-system"
date: 2026-10-30
weight: 2841080
---

### Shuts down and starts with the saved settings

```text
cloudmin restart-system [--multiline | --json]
                        [--no-wait]
                        (--name name | --id uuid)
```


Performs a full shutdown and start of the machine selected by `--name` or `--id`. Use this to apply saved CPU, memory or boot settings that `get-system` shows as pending. A guest operating system reboot alone may leave those changes pending.

The operation runs as a background job. If the machine is running, the worker requests a clean shutdown and waits up to two minutes. A timeout fails the job without forcing the guest off or starting it again. A delayed guest shutdown may still finish after the job reports failure.

By default, waits for the job to finish. `--no-wait` returns its ID for later inspection with `get-job`. Success means the machine has been started with its saved configuration; it does not wait for guest applications to become ready.

```sh
cloudmin restart-system --name guest.example.com
cloudmin restart-system --id MACHINE_UUID --no-wait
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
