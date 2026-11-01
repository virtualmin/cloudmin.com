---
title: "delete-interface"
date: 2026-10-30
weight: 2842120
---

### Removes a network interface

```text
cloudmin delete-interface [--multiline | --json]
                          [--no-wait]
                          (--name name | --id uuid)
                          --mac value
```


Removes the interface identified by `--mac` from the machine selected by `--name` or `--id`. Use `list-interfaces` to find its MAC address. This removes the virtual device; it does not delete the host network or bridge.

Removing an interface can disconnect the guest, including an SSH session using that interface. To disconnect it temporarily while keeping its configuration, use `modify-interface --link down` instead. Guest network configuration is not rewritten automatically.

Supported devices can be removed live. The command waits for the hardware job unless `--no-wait` is supplied. If live removal fails or is interrupted, inspect the job before retrying; the guest may acknowledge the removal later.

```sh
cloudmin delete-interface --name guest.example.com --mac 52:54:00:12:34:56
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--mac value`: Guest MAC address; omitted generates one.
- `--name name`: Source virtual machine name.
