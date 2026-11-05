---
title: "remove-system-key"
edition: "pro"
date: 2026-11-04
weight: 2849080
---

### Removes one guest SSH key

```text
cloudmin remove-system-key [--multiline | --json]
                           (--name name | --id uuid)
                           --key value
                           --user value
                           --yes
```


Removes an entry listed by `list-system-keys`. Use its guest entry ID with `--key`. Other entries and open sessions stay unchanged.

Requires host administrator access and confirmation. The virtual machine must be running with an agent that supports SSH key commands. Cloudmin's managed login key cannot be removed here.

```sh
cloudmin remove-system-key --name guest.example.com --user admin \
    --key GUEST_KEY_ID --yes
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--key value`: Guest key ID from list-system-keys.
- `--name name`: Source virtual machine name.
- `--user value`: Existing guest account.
- `--yes`: Confirm this operation.
