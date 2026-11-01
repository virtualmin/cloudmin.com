---
title: "backup-systems"
date: 2026-10-30
weight: 2844020
---

### Creates a full backup of one virtual machine

```text
cloudmin backup-systems [--multiline | --json]
                        [--no-wait]
                        (--name name | --id uuid)
                        [--compression | --no-compression]
                        [--dest-access-file file|-]
                        [--dest-account value]
                        [--dest-bucket value]
                        [--dest-ca-file value]
                        [--dest-endpoint value]
                        [--dest-host value]
                        [--dest-key-file value]
                        --dest-mode local|ssh|s3|gcs|azure|bb|dropbox|drive
                        [--dest-password-file file|-]
                        --dest-path value
                        [--dest-port number]
                        [--dest-project value]
                        [--dest-refresh-token-file file|-]
                        [--dest-region value]
                        [--dest-secret-file file|-]
                        [--dest-session-token-file file|-]
                        [--dest-subscription value]
                        [--dest-user value]
                        [--shutdown]
```


Creates one complete virtual machine backup per command. Select the machine with `--name` or `--id`. The archive includes writable disks, the saved hardware definition and supported firmware state. It retains the guest's identity and login settings for restoration.


- Guest preparation and storage

A running guest normally needs a responding agent to freeze filesystems while Cloudmin takes a temporary snapshot. `--shutdown` instead stops it cleanly for copying and restarts it afterward. A source that was already stopped stays stopped. Temporary file snapshot layers are merged back before completion; temporary LVM snapshots are removed.

`--compression` enables gzip; the default is an uncompressed archive. Allow space for disk copies, archive staging and temporary growth on the source. A filesystem-consistent backup does not coordinate transactions with other machines or replace application-specific backup steps.

- Local and SSH destinations

`--dest-mode local` writes to the absolute directory given by `--dest-path`. A mounted NFS or other network filesystem can be used as a local destination; mount and check it before starting the backup.

`--dest-mode ssh` transfers by SFTP. Supply `--dest-host`, `--dest-user`, an absolute `--dest-path`, and either `--dest-password-file` or `--dest-key-file`. The SSH port defaults to 22. A key option gives the path of a private key on the Cloudmin host; password options read the contents of a file. Unknown or changed server host keys must first be approved in Cloudmin's backup form.

- S3 destinations

`--dest-mode s3` uses `--dest-bucket` for the bucket and `--dest-path` for an object prefix. Supply the access key ID with `--dest-access-file` and the secret key with `--dest-secret-file`. Temporary credentials also use `--dest-session-token-file`.

`--dest-region` selects the region. `--dest-endpoint` selects an S3-compatible HTTPS endpoint; it must not include credentials or a path. `--dest-ca-file` supplies a CA bundle when needed. Supply provider credentials through the file options; the backup does not use the host's cloud login settings.

- Additional cloud destinations

Cloudmin Pro also supports `gcs`, `azure`, `bb`, `dropbox` and `drive`. For Google Cloud Storage, Google Drive and Dropbox, the access and secret files contain the OAuth client ID or app key and client secret. Supply `--dest-refresh-token-file` as well. Google Cloud Storage uses a bucket and object prefix; Drive and Dropbox use `--dest-path` as the folder.

For Azure, `--dest-account` is the storage account, `--dest-secret-file` supplies its storage key, and `--dest-bucket` is the container. For Backblaze B2, `--dest-access-file` supplies the application key ID and `--dest-secret-file` supplies the application key; also select the bucket. Object stores use `--dest-path` as the prefix within that bucket or container.

- Progress and recovery

The command waits for the job by default. `--no-wait` returns its ID, and `--json` returns the final job record, or the initial record with `--no-wait`, without progress text. Completed backups appear in `list-backups`. If copying or transfer fails, inspect the job and use `recover-job` when cleanup is pending to finish restoring the source.


```sh
cloudmin backup-systems --name guest.example.com --dest-mode local \
    --dest-path /srv/backups --compression
cloudmin backup-systems --name guest.example.com --dest-mode ssh \
    --dest-host backup.example.com --dest-user backup --dest-path \
    /srv/backups --dest-key-file /root/backup-key
cloudmin backup-systems --id MACHINE_UUID --dest-mode s3 --dest-bucket \
    example-backups --dest-path cloudmin --dest-access-file \
    /root/s3-access --dest-secret-file /root/s3-secret --no-wait
```

Options:

- `--compression | --no-compression`: Compress the archive with gzip.
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
- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
- `--shutdown`: Stop cleanly while copying and restart afterward.
