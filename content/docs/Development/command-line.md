---
title: "Command Line API"
date: 2026-10-30
author: "Ilia Ross"
weight: 2820000
---

Run `cloudmin` as root on the Cloudmin host. Lists use tables by default; `--multiline` shows details. `--json` returns an object with `command`, `status` and `data` fields; `data` holds the API result. Success exits 0, operation failures exit 1, and usage errors exit 2.

Commands wait for jobs by default; `--no-wait` returns the job ID immediately. Passwords and license credentials are read from files or standard input.

Each command has its own page with syntax, options and examples. `cloudmin help COMMAND` shows the same text on the host, and `cloudmin COMMAND --help` shows the syntax alone.

### Virtual machines

- [list-systems](/docs/development/api-programs/list-systems/): Lists the virtual machines on this host.
- [get-system](/docs/development/api-programs/get-system/): Shows a virtual machine and its saved settings.
- [start-system](/docs/development/api-programs/start-system/): Starts a stopped virtual machine.
- [shutdown-system](/docs/development/api-programs/shutdown-system/): Shuts down a virtual machine cleanly.
- [reboot-system](/docs/development/api-programs/reboot-system/): Requests a guest operating system reboot.
- [pause-system](/docs/development/api-programs/pause-system/): Pauses a running virtual machine.
- [unpause-system](/docs/development/api-programs/unpause-system/): Resumes a paused virtual machine.
- [restart-system](/docs/development/api-programs/restart-system/): Shuts down and starts with the saved settings.
- [reset-system](/docs/development/api-programs/reset-system/): Resets virtual hardware immediately.
- [poweroff-system](/docs/development/api-programs/poweroff-system/): Powers off immediately without a clean shutdown.
- [modify-system](/docs/development/api-programs/modify-system/): Changes saved resources, boot settings or automatic startup.
- [passwd-system](/docs/development/api-programs/passwd-system/): Changes an existing guest account password through its agent.
- [create-system](/docs/development/api-programs/create-system/): Creates a virtual machine from a cloud image or installer ISO.
- [clone-system](/docs/development/api-programs/clone-system/): Copies a virtual machine to independent disks.
- [delete-system](/docs/development/api-programs/delete-system/): Deletes a virtual machine and only the selected disk targets.

### Disks and interfaces

- [list-disks](/docs/development/api-programs/list-disks/): Lists a virtual machine's disks and removable drives.
- [create-disk](/docs/development/api-programs/create-disk/): Creates and attaches a disk.
- [attach-disk](/docs/development/api-programs/attach-disk/): Attaches an unused storage volume.
- [detach-disk](/docs/development/api-programs/detach-disk/): Detaches a disk while keeping its data.
- [delete-disk](/docs/development/api-programs/delete-disk/): Detaches and permanently deletes one disk.
- [resize-disk](/docs/development/api-programs/resize-disk/): Grows a disk to the specified total capacity.
- [insert-media](/docs/development/api-programs/insert-media/): Inserts an ISO in an existing CD/DVD drive.
- [eject-media](/docs/development/api-programs/eject-media/): Ejects media without removing the drive.
- [list-interfaces](/docs/development/api-programs/list-interfaces/): Lists a virtual machine's network interfaces.
- [add-interface](/docs/development/api-programs/add-interface/): Adds a virtio network interface.
- [modify-interface](/docs/development/api-programs/modify-interface/): Changes an interface's network, link or bandwidth.
- [delete-interface](/docs/development/api-programs/delete-interface/): Removes a network interface.

### Snapshots

- [list-snapshots](/docs/development/api-programs/list-snapshots/): Lists snapshots for the host or one virtual machine.
- [create-snapshot](/docs/development/api-programs/create-snapshot/): Creates a disk snapshot.
- [restore-snapshot](/docs/development/api-programs/restore-snapshot/): Restores a saved snapshot.
- [delete-snapshot](/docs/development/api-programs/delete-snapshot/): Deletes a snapshot while keeping current disk data.

### Backups

- [list-backups](/docs/development/api-programs/list-backups/): Lists completed backup archives.
- [backup-systems](/docs/development/api-programs/backup-systems/): Creates a full backup of one virtual machine.
- [inspect-backup](/docs/development/api-programs/inspect-backup/): Verifies a backup archive before restoring it.
- [restore-systems](/docs/development/api-programs/restore-systems/): Restores an inspected backup with its original identity.

### Host and images

- [list-images](/docs/development/api-programs/list-images/): Lists imported and catalogue images.
- [list-networks](/docs/development/api-programs/list-networks/): Lists usable virtual networks and host bridges.
- [get-host](/docs/development/api-programs/get-host/): Shows host capabilities.
- [create-image](/docs/development/api-programs/create-image/): Creates a reusable image from a virtual machine (Cloudmin Pro).

### Jobs

- [list-jobs](/docs/development/api-programs/list-jobs/): Lists recent and unfinished jobs.
- [get-job](/docs/development/api-programs/get-job/): Shows a job's current progress.
- [cancel-job](/docs/development/api-programs/cancel-job/): Requests cancellation at the next safe point.
- [recover-job](/docs/development/api-programs/recover-job/): Resumes interrupted work or retries cleanup.
- [discard-job](/docs/development/api-programs/discard-job/): Keeps completed disk growth and discards the remaining failed edits.

### Host storage

- [list-pools](/docs/development/api-programs/list-pools/): Lists active and inactive storage pools.
- [list-volumes](/docs/development/api-programs/list-volumes/): Lists storage volumes and their owners.
- [list-volume-groups](/docs/development/api-programs/list-volume-groups/): Lists LVM volume groups available for registration.
- [create-pool](/docs/development/api-programs/create-pool/): Registers a directory or an existing LVM volume group.
- [start-pool](/docs/development/api-programs/start-pool/): Starts a directory pool.
- [stop-pool](/docs/development/api-programs/stop-pool/): Stops a directory pool without deleting its files.
- [set-pool-autostart](/docs/development/api-programs/set-pool-autostart/): Changes whether a directory pool starts at boot.
- [delete-volume](/docs/development/api-programs/delete-volume/): Deletes an unused storage volume after a review.
- [unregister-pool](/docs/development/api-programs/unregister-pool/): Removes a pool registration and keeps its data.

### Host bridges

- [list-bridges](/docs/development/api-programs/list-bridges/): Lists host bridges outside libvirt-managed networks.
- [get-bridge-status](/docs/development/api-programs/get-bridge-status/): Shows the current bridge transaction.
- [remove-bridge](/docs/development/api-programs/remove-bridge/): Moves the bridge's network settings back to its Ethernet port.
- [confirm-bridge](/docs/development/api-programs/confirm-bridge/): Keeps the new network settings after checking connectivity.
- [rollback-bridge](/docs/development/api-programs/rollback-bridge/): Requests recovery of the previous network settings.

### SSH keys

- [list-ssh-keys](/docs/development/api-programs/list-ssh-keys/): Lists saved SSH keys (Pro).
- [create-ssh-key](/docs/development/api-programs/create-ssh-key/): Generates or imports an SSH key (Pro).
- [modify-ssh-key](/docs/development/api-programs/modify-ssh-key/): Changes the name or automatic setting of a saved key (Pro).
- [download-ssh-key](/docs/development/api-programs/download-ssh-key/): Writes a generated private key to standard output (Pro).
- [delete-ssh-key](/docs/development/api-programs/delete-ssh-key/): Deletes a library entry without changing guests (Pro).
- [list-system-keys](/docs/development/api-programs/list-system-keys/): Lists an existing guest account's SSH keys (Pro).
- [add-system-key](/docs/development/api-programs/add-system-key/): Adds public keys to an existing guest account (Pro).
- [remove-system-key](/docs/development/api-programs/remove-system-key/): Removes one guest SSH key (Pro).

### Notifications

- [get-notifications](/docs/development/api-programs/get-notifications/): Lists notification events.
- [get-notification-config](/docs/development/api-programs/get-notification-config/): Shows notification rules, destinations and worker status.
- [save-notification-target](/docs/development/api-programs/save-notification-target/): Saves a notification target from a JSON object.
- [delete-notification-target](/docs/development/api-programs/delete-notification-target/): Deletes a notification target.
- [set-notification-target-enabled](/docs/development/api-programs/set-notification-target-enabled/): Enables or disables a notification target.
- [save-notification-rule](/docs/development/api-programs/save-notification-rule/): Saves a notification rule from a JSON object.
- [delete-notification-rule](/docs/development/api-programs/delete-notification-rule/): Deletes a notification rule.
- [set-notification-rule-enabled](/docs/development/api-programs/set-notification-rule-enabled/): Enables or disables a notification rule.
- [retry-notification](/docs/development/api-programs/retry-notification/): Retries failed deliveries for one event.
- [test-notification-target](/docs/development/api-programs/test-notification-target/): Queues a test notification for the next delivery run.

### License Manager

- [get-license](/docs/development/api-programs/get-license/): Shows the Cloudmin license status.
- [check-license](/docs/development/api-programs/check-license/): Rechecks the Cloudmin license with the license server.
- [change-license](/docs/development/api-programs/change-license/): Validates and saves a Cloudmin Pro license.
- [deregister-license](/docs/development/api-programs/deregister-license/): Removes this host's Cloudmin license.

### Raw API

- [api](/docs/development/api-programs/api/): Runs the raw JSON API with a request on standard input.

