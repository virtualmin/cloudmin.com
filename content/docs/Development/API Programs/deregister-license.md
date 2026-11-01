---
title: "deregister-license"
date: 2026-11-01
weight: 2849040
---

### Removes this host's Cloudmin license

```text
cloudmin deregister-license [--multiline | --json]
                            --yes
```


Removes this host's saved license and repository credentials. Running machines,
scheduled backups and accepted jobs continue. Pro updates and new changes
through Cloudmin require a license again. Deregistration does not cancel your
subscription or immediately remove the host from the license server's count.

```sh
cloudmin deregister-license --yes
```

Options:

- `--yes`: Confirm this operation.
