---
title: "start-pool"
date: 2026-10-31
weight: 2847050
---

### Starts a directory pool

```text
cloudmin start-pool [--multiline | --json]
                    --pool ID|name
```


Starts a stopped local directory pool with a saved registration. `--pool` accepts its UUID or a name that identifies exactly one pool. This includes pools unavailable for machine creation. The command reads the pool's revision before starting it. If its settings change in the meantime, run the command again.

Starting does not create or format the directory or change its start-at-boot setting. This command does not start LVM pools.

```sh
cloudmin start-pool --pool extra
```

Options:

- `--pool ID|name`: Pool ID or unambiguous name.
