---
title: "stop-pool"
date: 2026-10-31
weight: 2847060
---

### Stops a directory pool without deleting its files

```text
cloudmin stop-pool [--multiline | --json]
                   --pool ID|name
```


Stops a local directory pool while keeping its saved registration and all files. Stop virtual machines using the pool and finish or cancel pending operations and image imports first. Start the pool again before using it for new storage operations.

The command checks the current revision and finishes before returning. It does not stop LVM pools. Use `unregister-pool --stop` to stop an unused LVM pool and remove its registration after checking for host and guest use.

```sh
cloudmin stop-pool --pool extra
```

Options:

- `--pool ID|name`: Pool ID or unambiguous name.
