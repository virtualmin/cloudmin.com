---
title: "list-disks"
subSection: "Disks and interfaces"
date: 2026-10-30
weight: 2842010
---

### Lists a virtual machine's disks and removable drives

```text
cloudmin list-disks [--multiline | --json]
                    [--name-only | --id-only]
                    (--name name | --id uuid)
```


Lists saved disk and removable-drive attachments for the machine selected by `--name` or `--id`. The default table shows the target, device type, role, format and path. Use it to distinguish writable disks, cloud-init seed media and CD/DVD drives before changing storage.

`--target` in disk commands refers to a guest device such as `vda` or `sda`, not a pool volume name, image ID or host path. `--multiline` or `--json` includes available volume details. `--name-only` and `--id-only` both print attachment targets, one per line.

This command shows storage attached to this machine. `list-images` lists reusable creation images instead. It does not inspect filesystems inside the guest.

```sh
cloudmin list-disks --name guest.example.com --multiline
cloudmin list-disks --id MACHINE_UUID --id-only
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
