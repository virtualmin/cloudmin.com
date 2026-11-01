---
title: "list-volume-groups"
date: 2026-10-31
weight: 2847030
---

### Lists LVM volume groups available for registration

```text
cloudmin list-volume-groups [--multiline | --json]
                            [--name-only | --id-only]
```


Lists existing local LVM volume groups that have no libvirt registration. Groups already registered are excluded even when their pool is stopped. Thin pools appear as storage destinations after their parent group is registered.

Create and extend groups with Webmin's Logical Volume Management module or the LVM tools. This command lists groups without allocating or formatting disks. If discovery fails, it reports an error.

```sh
cloudmin list-volume-groups
```
