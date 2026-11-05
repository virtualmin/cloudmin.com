---
title: "list-system-keys"
edition: "pro"
date: 2026-11-04
weight: 2849060
---

### Lists an existing guest account's SSH keys

```text
cloudmin list-system-keys [--multiline | --json]
                          [--name-only | --id-only]
                          (--name name | --id uuid)
                          --user value
```


Lists keys authorized for an existing account. The virtual machine must be running and its guest agent must support SSH key commands. Requires host administrator access.

```sh
cloudmin list-system-keys --name guest.example.com --user admin --json
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
- `--user value`: Existing guest account.
