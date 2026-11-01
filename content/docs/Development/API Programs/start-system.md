---
title: "start-system"
date: 2026-10-30
weight: 2841030
---

### Starts a stopped virtual machine

```text
cloudmin start-system [--multiline | --json]
                      [--no-wait]
                      (--name name | --id uuid)
```


Select a stopped virtual machine with `--name` or `--id`. It starts with its saved hardware configuration, applying settings that were waiting for the next start. This command does not change whether the machine starts automatically when the host boots; use `modify-system --autostart yes` for that.

By default, waits up to two minutes for the host to report the machine running. That state does not mean the guest operating system, network, cloud-init or software installation is ready. `--no-wait` returns once the start request is accepted. It does not return a background job ID.

Use `unpause-system` for a paused machine. An unfinished operation can prevent starting a guest; check `list-jobs` before repeating a refused request.

```sh
cloudmin start-system --name guest.example.com
cloudmin start-system --id MACHINE_UUID --no-wait
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
