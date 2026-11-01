---
title: "add-interface"
date: 2026-10-30
weight: 2842100
---

### Adds a virtio network interface

```text
cloudmin add-interface [--multiline | --json]
                       [--no-wait]
                       (--name name | --id uuid)
                       [--mac value]
                       --network ID|name
```


Adds a virtio network interface to the machine selected by `--name` or `--id`. `--network` selects an available virtual network or host bridge from `list-networks`. It accepts a network key, UUID, unambiguous name or `bridge:NAME`.

Cloudmin generates a MAC address unless `--mac` supplies one. The new interface can be attached live when the guest and host support it. The guest may need network configuration for the new device; this command does not rewrite its cloud-init seed or assign an IP address inside it.

The command waits for the job by default. `--no-wait` returns its ID. Use `list-interfaces` afterward to find the new MAC address and source.

```sh
cloudmin add-interface --name guest.example.com --network default
cloudmin add-interface --id MACHINE_UUID --network bridge:br0
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--mac value`: Guest MAC address; omitted generates one.
- `--name name`: Source virtual machine name.
- `--network ID|name`: Network key, UUID or name, or bridge:name.
