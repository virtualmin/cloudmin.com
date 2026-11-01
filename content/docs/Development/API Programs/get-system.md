---
title: "get-system"
date: 2026-10-30
weight: 2841020
---

### Shows a virtual machine and its saved settings

```text
cloudmin get-system [--multiline | --json]
                    (--name name | --id uuid)
```


Select one virtual machine with `--name` or `--id`. The result combines its inventory summary with its saved configuration, including resources, disks, network interfaces and boot settings. Use `list-systems` to find its name or UUID.

For a running machine, the result also includes running resource settings and any differences from the saved settings. Pending changes take effect after a full shutdown and start; an operating system reboot may not apply them. Use `restart-system` to perform that full restart.

`--multiline` expands nested details, and `--json` returns the complete structured result. For a shorter view of attached devices, use `list-disks` or `list-interfaces`. This command reads settings once; it does not monitor changes.

```sh
cloudmin get-system --name guest.example.com --multiline
cloudmin get-system --id MACHINE_UUID --json
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
