---
title: "reboot-system"
date: 2026-10-30
weight: 2841050
---

### Requests a guest operating system reboot

```text
cloudmin reboot-system [--multiline | --json]
                       (--name name | --id uuid)
```


Requests an operating system reboot of the running machine selected by `--name` or `--id`. This is a clean reboot request; the guest must respond to it. The command returns when libvirt accepts the request, without waiting for the guest to reboot or its services to become ready.

An operating system reboot does not guarantee that pending CPU, memory or boot configuration changes take effect. Use `restart-system` for a complete shutdown and start with the saved hardware configuration. Use `reset-system` only when an immediate hardware reset is intended.

```sh
cloudmin reboot-system --name guest.example.com
cloudmin reboot-system --id MACHINE_UUID --json
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
