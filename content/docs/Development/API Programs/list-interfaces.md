---
title: "list-interfaces"
date: 2026-10-30
weight: 2842090
---

### Lists a virtual machine's network interfaces

```text
cloudmin list-interfaces [--multiline | --json]
                         [--name-only | --id-only]
                         (--name name | --id uuid)
```


Lists saved network interfaces for the machine selected by `--name` or `--id`. The default table shows each MAC address, source type, network or bridge, device model and link state. `--multiline` and `--json` include available bandwidth and other interface settings.

Interface commands identify an existing interface by its MAC address, not a guest name such as `eth0`. `--name-only` and `--id-only` therefore both print MAC addresses. Use `list-networks` to find network choices for adding or moving an interface.

These are virtual hardware settings. They do not show or rewrite the guest operating system's complete network configuration.

```sh
cloudmin list-interfaces --name guest.example.com --multiline
cloudmin list-interfaces --id MACHINE_UUID --id-only
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
