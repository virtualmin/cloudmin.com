---
title: "list-bridges"
subSection: "Host bridges"
date: 2026-10-30
weight: 2848010
---

### Lists host bridges outside libvirt-managed networks

```text
cloudmin list-bridges [--multiline | --json]
                      [--name-only | --id-only]
```


Lists host bridges outside libvirt-managed virtual networks. These bridges connect guests to the host's existing network. Libvirt-managed NAT or routed bridges belong to their virtual networks and are not removal targets here.

The default table shows each bridge's name, whether it is active, its addresses and its ports. `--multiline` and `--json` include saved-configuration and dependency details. `--name-only` and `--id-only` both print bridge names, such as `br0`.

Use `remove-bridge --review` to see whether a bridge can be removed and what settings would move to its Ethernet port. Active or recent bridge transactions are inspected separately with `get-bridge-status`.

```sh
cloudmin list-bridges --multiline
cloudmin list-bridges --name-only
```
