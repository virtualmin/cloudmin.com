---
title: "list-volumes"
date: 2026-10-31
weight: 2847020
---

### Lists storage volumes and their owners

```text
cloudmin list-volumes [--multiline | --json]
                      [--name-only | --id-only]
                      [--pool ID|name]
```


Lists volumes from active storage pools, with their pool, capacity, allocated space and owners. `--pool` accepts a UUID or a name that identifies exactly one pool, including LVM-thin destinations such as `guests/thin`. Omit it to list volumes across pools. Stopped pools cannot report their volumes.

`--multiline` and `--json` include ownership records and any reason deletion is blocked. A stopped virtual machine, imported image, snapshot or dependent disk can keep a volume in use. Cloudmin also blocks deletion when it cannot check these references. Listing volumes does not change storage.

```sh
cloudmin list-volumes --pool guests/thin
cloudmin list-volumes --json
```

Options:

- `--pool ID|name`: Pool ID or unambiguous name.
