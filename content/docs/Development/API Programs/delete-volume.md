---
title: "delete-volume"
date: 2026-10-31
weight: 2847080
---

### Deletes an unused storage volume after a review

```text
cloudmin delete-volume [--multiline | --json]
                       (--review | --yes)
                       --pool ID|name
                       --volume value
```


Permanently deletes one unused volume from an active local directory or LVM destination. Supply `--pool` and the exact `--volume` name. `--review` shows owners and any refusal reason without changing anything or requiring `--yes`.

Deletion requires `--yes`. The command reviews the volume, then sends its revision for a final check under the host storage lock. A replaced volume, new reference or pending operation prevents deletion. Host mounts, swap and Cloudmin snapshots also block deletion. Deleting the volume destroys its data and cannot be undone.

The command finishes before returning. To delete several volumes, run it separately for each volume and check each result before continuing.

```sh
cloudmin delete-volume --pool guests/thin --volume unused.raw --review
cloudmin delete-volume --pool guests/thin --volume unused.raw --yes
```

Options:

- `--pool ID|name`: Pool ID or unambiguous name.
- `--review`: Show owners and any reason deletion is blocked.
- `--volume value`: Exact volume name.
- `--yes`: Confirm this operation.
