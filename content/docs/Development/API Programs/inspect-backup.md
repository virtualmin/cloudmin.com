---
title: "inspect-backup"
date: 2026-10-30
weight: 2844030
---

### Verifies a backup archive before restoring it

```text
cloudmin inspect-backup [--multiline | --json]
                        [--no-wait]
                        [--backup value]
                        [--dest-access-file file|-]
                        [--dest-account value]
                        [--dest-bucket value]
                        [--dest-ca-file value]
                        [--dest-endpoint value]
                        [--dest-host value]
                        [--dest-key-file value]
                        [--dest-mode local|ssh|s3|gcs|azure|bb|dropbox|drive]
                        [--dest-password-file file|-]
                        [--dest-path value]
                        [--dest-port number]
                        [--dest-project value]
                        [--dest-refresh-token-file file|-]
                        [--dest-region value]
                        [--dest-secret-file file|-]
                        [--dest-session-token-file file|-]
                        [--dest-subscription value]
                        [--dest-user value]
                        [--filename value]
```


Retrieves and verifies a backup before restoration. `--backup` selects a backup job ID from `list-backups` and uses its saved destination. To inspect an archive that is not in this host's inventory, supply destination options and `--filename` instead. The filename is the archive's name within the destination, not the destination directory itself.

The destination fields have the same meaning as in `backup-systems`, including credential files and SSH host-key approval. Supported archives are the complete backup files produced by Cloudmin, including gzip-compressed archives.

Inspection checks the manifest, checksums, disk information and saved machine definition. It does not create or start a virtual machine. The archive is downloaded or staged locally, so sufficient temporary space is required.

By default, waits for the inspection job. `--no-wait` returns its ID for `get-job`. Pass the completed inspection job ID, not the original backup ID, to `restore-systems --inspection`. Inspection downloads expire after one day; inspect the archive again if the staged copy is no longer available.

```sh
cloudmin inspect-backup --backup BACKUP_JOB_ID --json
cloudmin inspect-backup --dest-mode local --dest-path /srv/backups \
    --filename guest.tar.gz
```

Options:

- `--backup value`: Backup job ID from the local inventory.
- `--dest-access-file file|-`: Destination access file, or - for stdin.
- `--dest-account value`: Backup destination account.
- `--dest-bucket value`: Backup destination bucket.
- `--dest-ca-file value`: Backup destination ca-file.
- `--dest-endpoint value`: Backup destination endpoint.
- `--dest-host value`: Backup destination host.
- `--dest-key-file value`: Backup destination key-file.
- `--dest-mode local|ssh|s3|gcs|azure|bb|dropbox|drive`: Backup destination mode.
- `--dest-password-file file|-`: Destination password file, or - for stdin.
- `--dest-path value`: Backup destination path.
- `--dest-port number`: Backup destination port.
- `--dest-project value`: Backup destination project.
- `--dest-refresh-token-file file|-`: Destination refresh-token file, or - for stdin.
- `--dest-region value`: Backup destination region.
- `--dest-secret-file file|-`: Destination secret file, or - for stdin.
- `--dest-session-token-file file|-`: Destination session-token file, or - for stdin.
- `--dest-subscription value`: Backup destination subscription.
- `--dest-user value`: Backup destination user.
- `--filename value`: Archive filename in the destination.
