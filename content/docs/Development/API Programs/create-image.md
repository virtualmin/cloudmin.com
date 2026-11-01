---
title: "create-image"
date: 2026-10-30
weight: 2845040
---

### Creates a reusable image from a virtual machine (Cloudmin Pro)

```text
cloudmin create-image [--multiline | --json]
                      [--no-wait]
                      (--name name | --id uuid)
                      [--clean-credentials yes|no]
                      --image-name value
                      --pool ID|name
                      [--shutdown]
```


Captures a reusable image from the machine selected by `--name` or `--id`. `--image-name` names the new image and `--pool` selects its storage pool. This operation requires Cloudmin Pro. Use `backup-systems` instead to preserve a complete machine for restoration.


- Source requirements

The source must have a supported Linux installation with enabled cloud-init and one writable system disk. Detach installation media and additional read-only data disks first; Cloudmin's own seed disk is omitted automatically. Unsupported devices or disk layouts are rejected before capture.

A running source needs a responding guest agent for a filesystem freeze and temporary snapshot. Alternatively, `--shutdown` stops it cleanly while copying and restarts it afterward. A source that was already stopped stays stopped. Cleanup changes are made to the independent image copy, not the source disk.

- Account cleanup

`--clean-credentials yes` is the default. It removes password hashes, SSH credentials and default shell history files for all local accounts in the image, including root. Accounts, ownership, permissions and application data remain. `--clean-credentials no` retains those login credentials and histories.

Custom history locations, application credentials and other secrets are not all discoverable, so review the image before sharing it. New-machine creation configures its selected administrator's access separately.

- Identity and licensing

Regardless of account cleanup, Cloudmin resets cloud-init state, machine and host IDs, SSH host keys and cached network identity on the copy. Each new machine receives its own identity and network settings. Copied Virtualmin Pro license credentials are also removed locally without contacting license servers; each new machine needs its own license or a manual downgrade to GPL.

- Result

The image retains the source disk's capacity, so new machines need a disk at least that large. The command waits for the capture job by default; `--no-wait` returns its ID. On success, the image appears in `list-images` and can be selected by `create-system`.

If capture is interrupted, inspect the job and use `recover-job` when needed to finish restoring the source and cleaning up incomplete output.


```sh
cloudmin create-image --name source.example.com --image-name base-server \
    --pool default
cloudmin create-image --id MACHINE_UUID --image-name private-copy --pool \
    default --clean-credentials no --shutdown
```

Options:

- `--clean-credentials yes|no`: Remove all local accounts' login credentials; defaults to yes.
- `--id uuid`: Source virtual machine UUID.
- `--image-name value`: New image name.
- `--name name`: Source virtual machine name.
- `--pool ID|name`: Destination storage pool ID or name.
- `--shutdown`: Stop cleanly while copying and restart afterward.
