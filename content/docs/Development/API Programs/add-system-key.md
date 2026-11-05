---
title: "add-system-key"
edition: "pro"
date: 2026-11-04
weight: 2849070
---

### Adds public keys to an existing guest account

```text
cloudmin add-system-key [--multiline | --json]
                        (--name name | --id uuid)
                        [--key value]
                        [--public-key-file file|-]
                        --user value
```


Adds a saved public key with `--key`, or public keys from `--public-key-file FILE`, to an existing guest account. Other keys stay unchanged. The virtual machine must be running with an agent that supports SSH key commands. Requires host administrator access.

This command does not change SSH login settings. The account and SSH server must allow key login before the key can be used.

```sh
cloudmin add-system-key --name guest.example.com --user admin --key KEY_ID
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--key value`: Saved key ID.
- `--name name`: Source virtual machine name.
- `--public-key-file file|-`: Public keys to add instead of a saved key.
- `--user value`: Existing guest account.
