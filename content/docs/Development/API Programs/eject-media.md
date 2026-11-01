---
title: "eject-media"
date: 2026-10-30
weight: 2842080
---

### Ejects media without removing the drive

```text
cloudmin eject-media [--multiline | --json]
                     [--no-wait]
                     (--name name | --id uuid)
                     --target value
```


Ejects the media from the CD/DVD target on the machine selected by `--name` or `--id`. Find the target with `list-disks`. The drive stays attached, and the ISO volume remains in its storage pool for later use.

This does not detach a writable disk or change the saved boot order. Supported guests can eject media while running. The command waits for the hardware job by default; `--no-wait` returns the job ID.

```sh
cloudmin eject-media --name guest.example.com --target sda
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
- `--target value`: CD/DVD target.
