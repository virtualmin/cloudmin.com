---
title: "list-networks"
date: 2026-10-30
weight: 2845020
---

### Lists usable virtual networks and host bridges

```text
cloudmin list-networks [--multiline | --json]
                       [--name-only | --id-only]
```


Lists available virtual networks and host bridges that Cloudmin offers for guest network interfaces. The default table shows a selection key, name, type and forwarding mode. Use it before `create-system`, `add-interface` or `modify-interface`.

A libvirt network key has the form `network:UUID`; a host bridge uses `bridge:NAME`. `--id-only` prints these selection keys, not just bare UUIDs. `--name-only` prints display names. Network options also accept a UUID or an unambiguous name.

`--multiline` and `--json` show additional reported network details. Selecting a network connects an interface to its existing configuration; this command does not create networks, configure host bridges or assign addresses inside an existing guest.

```sh
cloudmin list-networks --multiline
cloudmin list-networks --id-only
```
