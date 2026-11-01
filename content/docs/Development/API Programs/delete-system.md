---
title: "delete-system"
date: 2026-10-30
weight: 2841150
---

### Deletes a virtual machine and only the selected disk targets

```text
cloudmin delete-system [--multiline | --json]
                       [--no-wait]
                       (--name name | --id uuid)
                       [--disk value]*
                       [--shutdown]
                       --yes
```


Removes the definition of the machine selected by `--name` or `--id`. `--yes` is required. Disk deletion is a separate choice: with no `--disk` options, every disk is kept, including the cloud-init seed. Repeat `--disk` with attached target names such as `vda` to permanently delete only those disks. Use `list-disks` to inspect the targets first.

A running machine requires `--shutdown`. If any writable disk is being kept, Cloudmin requests a clean shutdown and waits up to two minutes. If every writable disk is selected for deletion, it powers the machine off immediately. A failed or timed-out stop leaves the definition and disks intact; a delayed clean shutdown may still finish.

Remove native LVM snapshots before deleting the machine. Removing the machine also removes its libvirt snapshot and checkpoint metadata, firmware variable store and Cloudmin-managed SSH keys. Kept disks retain their backing chains, but the deleted machine's snapshot list is no longer available. Selected disks' private snapshot layers are deleted; shared layers and imported images remain protected.

Deletion runs as a job. The command waits for completion by default; `--no-wait` returns the job ID. Recovery can finish an interrupted deletion but cannot restore deleted data. Kept disks can be transferred or reattached, but they do not preserve the machine definition. Use a backup to preserve the complete machine.

```sh
cloudmin delete-system --name guest.example.com --yes
cloudmin delete-system --name guest.example.com --shutdown --disk vda \
    --disk vdb --yes
```

Options:

- `--disk value`: Attached disk target to delete; repeat for more disks.
- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
- `--shutdown`: Permit stopping a running guest.
- `--yes`: Confirm this operation.
