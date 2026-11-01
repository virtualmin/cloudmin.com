---
title: "modify-interface"
date: 2026-10-30
weight: 2842110
---

### Changes an interface's network, link or bandwidth

```text
cloudmin modify-interface [--multiline | --json]
                          [--no-wait]
                          (--name name | --id uuid)
                          [--inbound-kib number]
                          [--link up|down]
                          --mac value
                          [--network ID|name]
                          [--outbound-kib number]
```


Changes the interface identified by `--mac` on the machine selected by `--name` or `--id`. Find the MAC address with `list-interfaces`. Omitted fields keep their current values; `--mac` selects the interface and does not change its address.

`--network` moves the interface to another available virtual network or host bridge. `--link down` disconnects its virtual link while retaining the interface; `--link up` reconnects it. Network changes can interrupt the guest's connection and may require new addressing inside the guest. Cloudmin does not rewrite guest networking or its cloud-init seed.

`--inbound-kib` and `--outbound-kib` set average bandwidth limits in KiB per second, not kilobits. A value of zero removes that direction's limit. Live support depends on the interface and network backend.

The command waits for the hardware job by default; `--no-wait` returns its ID. This command does not change the interface model or MAC address.

```sh
cloudmin modify-interface --name guest.example.com --mac \
    52:54:00:12:34:56 --network bridge:br0
cloudmin modify-interface --name guest.example.com --mac \
    52:54:00:12:34:56 --inbound-kib 10240 --outbound-kib 10240
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--inbound-kib number`: Inbound average KiB/s; zero removes the limit.
- `--link up|down`: Interface link state.
- `--mac value`: Guest MAC address; omitted generates one.
- `--name name`: Source virtual machine name.
- `--network ID|name`: Network key, UUID or name, or bridge:name.
- `--outbound-kib number`: Outbound average KiB/s; zero removes the limit.
