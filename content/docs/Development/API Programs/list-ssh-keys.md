---
title: "list-ssh-keys"
subSection: "SSH keys"
edition: "pro"
date: 2026-11-04
weight: 2849010
---

### Lists saved SSH keys

```text
cloudmin list-ssh-keys [--multiline | --json]
                       [--name-only | --id-only]
```


Lists saved public keys from the library, including IDs and fingerprints. Private keys are never included. Use `--json` for JSON output.

```sh
cloudmin list-ssh-keys --json
```
