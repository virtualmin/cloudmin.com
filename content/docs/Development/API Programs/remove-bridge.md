---
title: "remove-bridge"
date: 2026-10-30
weight: 2848030
---

### Moves the bridge's network settings back to its Ethernet port

```text
cloudmin remove-bridge [--multiline | --json]
                       [--no-wait]
                       --name value
                       [--review]
```


Removes an unused, saved host bridge with one supported Ethernet port. `--name` is the bridge name from `list-bridges`, not a virtual machine name. The bridge's current addresses, routes and DNS settings move back to its Ethernet port.

Cloudmin supports bridge removal with NetworkManager, Netplan and Debian ifupdown. It refuses unsupported layouts, bridges used by virtual machines or virtual networks, and VLANs or macvlans attached to the bridge or its port. A virtual machine can block removal even when stopped.

`--review` checks the bridge and shows the plan without applying network changes. Without that flag, the command checks it again and starts the change. Applying settings can interrupt SSH if the bridge carries the host connection. The recovery worker continues on the host even if that connection drops.

By default, waits until the change needs confirmation or has finished. `--no-wait` returns the initial transaction record instead. The command never confirms automatically. Check the transaction with `get-bridge-status`, verify connectivity, and use `confirm-bridge --id` before its deadline to keep the new settings. Otherwise Cloudmin restores the previous settings. `rollback-bridge` requests that restoration immediately.

```sh
cloudmin remove-bridge --name br0 --review
cloudmin remove-bridge --name br0
```

Options:

- `--name value`: Host bridge name.
- `--review`: Show the removal plan without applying it.
