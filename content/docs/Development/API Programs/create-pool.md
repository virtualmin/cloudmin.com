---
title: "create-pool"
date: 2026-10-31
weight: 2847040
---

### Registers a directory or an existing LVM volume group

```text
cloudmin create-pool [--multiline | --json]
                     [--autostart | --no-autostart]
                     [--group value]
                     --name value
                     [--path value]
```


Registers a storage destination and starts it immediately. Supply a unique `--name` and exactly one of `--path` or `--group`. Directory paths must be absolute, have an existing parent and not overlap another pool. A missing directory is created; existing files and permissions are preserved.

`--group` names an existing LVM volume group. Registration does not format disks or create logical volumes. Its thin pools become separate destinations, named `POOL/THIN_POOL`. Startup with the host is enabled by default; use `--no-autostart` to disable it.

The command finishes before returning and shows the new pool record with `--json`. Running it again with the same name or volume group reports a duplicate registration.

```sh
cloudmin create-pool --name extra --path /var/lib/libvirt/extra
cloudmin create-pool --name guests --group vg_guests --no-autostart
```

Options:

- `--autostart | --no-autostart`: Start the pool at host boot; defaults to enabled.
- `--group value`: Existing LVM volume group; cannot be used with --path.
- `--name value`: New pool name.
- `--path value`: Absolute directory path; cannot be used with --group.
