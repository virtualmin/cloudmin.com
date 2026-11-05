---
title: "create-ssh-key"
edition: "pro"
date: 2026-11-04
weight: 2849020
---

### Generates or imports an SSH key

```text
cloudmin create-ssh-key [--multiline | --json]
                        [--automatic | --no-automatic]
                        [--key-file file|-]
                        --name value
                        [--source generate|public|private]
                        [--type ed25519|rsa]
```


Generates an Ed25519 key pair by default. Use `--type rsa` for RSA. To import a key, use `--source public` or `--source private` with `--key-file FILE`. Private imports must be unencrypted; only their public key is saved. Download a generated private key with `download-ssh-key` or from the web interface.

`--automatic` adds the public key to new virtual machines created from cloud images and to prepared clones. It does not change existing guests or unchanged clones.

```sh
cloudmin create-ssh-key --name Administrators --source public \
    --key-file admin.pub --automatic
```

Options:

- `--automatic | --no-automatic`: Add to new virtual machines created from cloud images and to prepared clones.
- `--key-file file|-`: Imported key file, or - for stdin.
- `--name value`: Key name.
- `--source generate|public|private`: Generate, import a public key or import an unencrypted private key.
- `--type ed25519|rsa`: Generated key type; defaults to Ed25519.
