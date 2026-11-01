---
title: "reset-system"
date: 2026-10-30
weight: 2841090
---

### Resets virtual hardware immediately

```text
cloudmin reset-system [--multiline | --json]
                      (--name name | --id uuid)
                      --yes
```


Immediately resets the virtual hardware of the machine selected by `--name` or `--id`. The guest has no opportunity to stop applications or flush pending writes. Unsaved data can be lost. `--yes` is required to confirm this operation.

Use `reboot-system` for a clean operating system reboot. A hardware reset does not guarantee that pending saved hardware changes are applied; use a full shutdown and start for those changes.

The command returns when the reset is accepted, without waiting for the operating system or services to become ready. It does not delete the machine or its disks.

```sh
cloudmin reset-system --name guest.example.com --yes
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
- `--yes`: Confirm this operation.
