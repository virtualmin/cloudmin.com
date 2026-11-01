---
title: "list-pools"
subSection: "Host storage"
date: 2026-10-30
weight: 2847010
---

### Lists active and inactive storage pools

```text
cloudmin list-pools [--multiline | --json]
                    [--name-only | --id-only]
```


Lists all registered storage pools, including stopped pools and LVM-thin destinations. The table shows each pool's name, UUID, backend, active state and available space. Free space is unavailable for inactive pools.

Use `--multiline` for pool settings, volumes and references, or `--json` for the full records. `--name-only` and `--id-only` print one name or UUID per line. Creating a virtual machine requires an active pool with a supported backend.

```sh
cloudmin list-pools
cloudmin list-pools --json
```
