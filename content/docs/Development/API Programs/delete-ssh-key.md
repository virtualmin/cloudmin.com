---
title: "delete-ssh-key"
edition: "pro"
date: 2026-11-04
weight: 2849050
---

### Deletes a library entry without changing guests

```text
cloudmin delete-ssh-key [--multiline | --json]
                        --key value
                        --yes
```


Deletes a library entry after confirmation. Keys on existing virtual machines and in templates stay unchanged.

```sh
cloudmin delete-ssh-key --key KEY_ID --yes
```

Options:

- `--key value`: Saved key ID.
- `--yes`: Confirm this operation.
