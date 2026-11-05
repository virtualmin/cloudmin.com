---
title: "download-ssh-key"
edition: "pro"
date: 2026-11-04
weight: 2849040
---

### Writes a generated private key to standard output

```text
cloudmin download-ssh-key [--multiline | --json]
                          --key value
```


Writes a generated private key to standard output. Protect the destination file with `umask 077`, as below. Imported keys have no saved private key to download. Requires write access.

```sh
umask 077
cloudmin download-ssh-key --key KEY_ID > admin.key
```

Options:

- `--key value`: Saved key ID.
