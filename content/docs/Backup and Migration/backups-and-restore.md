---
title: "Backups and Restore"
date: 2026-10-28
author: "Ilia Ross"
weight: 2710000
---

Open **Backups and Restore** from the Cloudmin menu, or choose **Back up virtual machines** from a machine's actions. Each selected machine gets a separate full archive whose filename includes the guest name, the UTC date and the job ID.

### What a backup contains

A full backup archives the virtual machine's managed disks, whether QCOW2 or raw files or LVM logical volumes, its libvirt definition, UEFI variables for firmware-backed guests and a manifest with checksums. Backups use the same source preparation and recovery as [cloning](/docs/virtual-machines/cloning/): a stopped source is archived directly, and a running source is frozen through the guest agent and snapshotted, through temporary overlays for file disks or native snapshots with a brief pause for LVM disks, or shut down cleanly if you prefer. A running source with both file and LVM disks needs the clean shutdown. Unlike clones, backups preserve the guest identity and license credentials.

Manual and scheduled backups share the host's disk-work queue, so only one backup or other queued disk operation runs at a time. Backups pass data through several copies on the way to the destination, so temporary space on the host matters; the page shows the space needed.

### Destinations

- **Local** destinations are private directories, including mounted NFS storage. Cloudmin creates a missing backup directory with private permissions.
- **SSH** destinations use SFTP with host key trust: the first connection scans the server's key and asks you to approve its fingerprint, and later connections require the trusted key. Password and key authentication are supported.
- **S3** destinations work with Amazon S3 and compatible services.
- {{< pro >}} **Google Cloud Storage, Azure Blob Storage, Backblaze B2, Dropbox and Google Drive** transfers come with the Cloudmin Pro extension and use Virtualmin's provider helpers. Real-account transfer tests for these providers are still pending.

Provider credentials belong in the backup destination settings. Password fields stay empty on edit and keep the saved secret unless you enter a new one.

### Schedules and retention

Schedules run hourly, daily, weekly, monthly or yearly with a retention count. Cloudmin inspects destinations to apply retention and to list archives for restore, and an hourly inspection cleanup keeps the cache tidy. Scheduled backups appear as jobs like manual ones.

### Restore

Restore verifies the archive before asking for confirmation. It replaces a missing machine with its original identity and refuses to overwrite an existing name or UUID. The restored machine is left stopped with automatic startup disabled, and keeps the hostname, machine ID, host ID, MAC addresses, guest network files, passwords, SSH keys and license files. Restore does not deregister Virtualmin Pro or contact its license service. Use cloning to create another machine with a new identity.

Choose an active directory, filesystem, NFS, LVM or LVM-thin pool for the restored disks. Disks restored into an LVM pool become raw logical volumes. File and ordinary LVM pools need room for the disks' full capacities plus a margin, while thin pools allocate space as data is restored; local staging also needs space for downloading, extracting and inspecting the archive. UEFI variables are always restored into a file pool.

### API and CLI

Backup, backup inspection and restore are API actions with the same job model as creation, so they can be driven from `api.pl` or remote clients. See [Virtual machine API](/docs/development/virtual-machine-api/).

### Planned

- Scheduled snapshots as a lighter alternative to full backups {{< planned >}}
- Fleet backup policy across hosts in Cloudmin Connect Pro {{< planned >}}
