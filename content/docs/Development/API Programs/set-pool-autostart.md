---
title: "set-pool-autostart"
date: 2026-10-31
weight: 2847070
---

### Changes whether a directory pool starts at boot

```text
cloudmin set-pool-autostart [--multiline | --json]
                            --enabled yes|no
                            --pool ID|name
```


Changes whether a local directory pool with a saved registration starts with the host. Supply `--pool` as a UUID or unambiguous name and `--enabled yes` or `--enabled no`. This setting does not immediately start or stop the pool.

The command reads and checks the current revision before saving. LVM registrations receive their start-at-boot setting during `create-pool`; this command manages directory pools only.

```sh
cloudmin set-pool-autostart --pool extra --enabled no
```

Options:

- `--enabled yes|no`: Whether to start at host boot.
- `--pool ID|name`: Pool ID or unambiguous name.
