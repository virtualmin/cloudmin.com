---
title: "create-snapshot"
date: 2026-10-30
weight: 2843020
---

### Creates a disk snapshot

```text
cloudmin create-snapshot [--multiline | --json]
                         [--no-wait]
                         (--name name | --id uuid)
                         [--desc value]
                         --label value
                         [--mode prepared|unprepared]
                         [--restart]
                         [--shutdown]
```


Creates a disk restore point for the machine selected by `--name` or `--id`. `--label` is required; `--desc` adds an optional description. The label describes the restore point, while its generated ID is used for later restore and deletion.

The default `--mode prepared` uses the guest agent to freeze filesystems briefly when the machine is running. `--shutdown` permits a clean shutdown when the agent is unavailable. It does not force a shutdown when agent preparation is available. A stopped guest does not need an agent. Add `--restart` to start the machine after a successful snapshot if it was stopped for the operation.

`--mode unprepared` captures a running guest's disks without freezing filesystems. The captured data is crash-consistent: applications may need recovery when it is restored, as they would after a sudden power loss. Neither mode saves running memory or external services. Filesystem freezing does not replace application-specific backup steps.

Snapshots support private raw or QCOW2 files and managed LVM disks. A snapshot cannot mix file and LVM disks. Cloudmin limits managed restore points to 20 per machine. Snapshot history restricts disk attachment, removal and growth until that history is removed.

Live LVM snapshots briefly pause the guest and require direct I/O or synchronous disk caching. Disks created by Cloudmin use direct I/O. Standard LVM snapshots reserve space for a full disk's changes, while thin snapshots share their pool. Restoring an LVM snapshot requires temporary space under `/var/tmp` for the largest disk's full capacity plus 256 MiB.

The command waits for the job by default; `--no-wait` returns its ID. Find the completed restore point with `list-snapshots`. Snapshot layers use the same storage as the guest, so maintain separate backups for host or disk failure.

```sh
cloudmin create-snapshot --name guest.example.com --label before-upgrade
cloudmin create-snapshot --id MACHINE_UUID --label maintenance \
    --shutdown --restart
```

Options:

- `--desc value`: Description.
- `--id uuid`: Source virtual machine UUID.
- `--label value`: Snapshot label.
- `--mode prepared|unprepared`: Snapshot preparation mode.
- `--name name`: Source virtual machine name.
- `--restart`: Start after success.
- `--shutdown`: Permit clean shutdown if the guest agent is unavailable.
