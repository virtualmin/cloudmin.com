---
title: "insert-media"
date: 2026-10-30
weight: 2842070
---

### Inserts an ISO in an existing CD/DVD drive

```text
cloudmin insert-media [--multiline | --json]
                      [--no-wait]
                      (--name name | --id uuid)
                      --pool ID|name
                      --target value
                      --volume value
```


Inserts an ISO volume into an existing CD/DVD drive on the machine selected by `--name` or `--id`. Find the drive target with `list-disks`, then supply that `--target`, the `--pool` containing the ISO and its `--volume` name. The volume name is not an image ID or a host path.

This changes the drive's media; it does not create a drive, install an operating system or change boot order. For a stopped machine without a CD drive, `modify-system --enable-live` can add one. Set the desired boot device separately with `modify-system --boot`.

Supported guests can change media while running. The command waits for the hardware job unless `--no-wait` is supplied. Use `eject-media` to remove the media without deleting its storage volume.

```sh
cloudmin insert-media --name guest.example.com --target sda --pool \
    default --volume installer.iso
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
- `--pool ID|name`: Destination storage pool ID or name.
- `--target value`: CD/DVD target.
- `--volume value`: ISO volume name.
