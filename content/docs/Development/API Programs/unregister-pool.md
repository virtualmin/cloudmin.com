---
title: "unregister-pool"
date: 2026-10-31
weight: 2847090
---

### Removes a pool registration and keeps its data

```text
cloudmin unregister-pool [--multiline | --json]
                         (--review | --yes)
                         --pool ID|name
                         [--stop]
```


Removes the saved libvirt registration for a local directory or LVM pool. Files, logical volumes, volume groups and thin pools are preserved. Supply the parent pool's UUID or unambiguous name with `--pool`. LVM-thin destinations cannot be unregistered separately.

`--review` shows references and any reason removal is blocked without requiring `--yes`. Removing the registration requires `--yes` and repeats the revision and reference checks. References from running or stopped guests, images, snapshots and dependent disks block removal, as do pending operations. Other inactive pools may need to be started so their references can be checked.

An active pool requires `--stop`. For LVM, stopping deactivates every logical volume in the group, including thin volumes. Cloudmin refuses to stop the group if its volumes are mounted, used as swap, open, or used by other block devices outside the group. Register the group again to use it in Cloudmin.

Use `--stop --review` to review both steps without changing storage. `--stop --yes` repeats the checks under the host lock, stops the pool and removes its registration. Without `--stop`, the pool must already be inactive.

If the volume group no longer exists, Cloudmin can remove its inactive registration after checking for references. It must be able to read the LVM inventory and confirm that the group is absent. An active pool or a failed inventory read still blocks removal.

A failed stop keeps the registration. If stopping succeeds but removing the registration fails, the error says the pool is stopped. Review it again before retrying.

```sh
cloudmin unregister-pool --pool extra --review
cloudmin unregister-pool --pool extra --yes
cloudmin unregister-pool --pool guests --stop --review
cloudmin unregister-pool --pool guests --stop --yes
```

Options:

- `--pool ID|name`: Directory or parent LVM pool ID or name.
- `--review`: Show references and any reason unregistration is blocked.
- `--stop`: Stop the unused pool first; LVM deactivates the whole volume group.
- `--yes`: Confirm this operation.
