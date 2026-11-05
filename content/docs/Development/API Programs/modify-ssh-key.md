---
title: "modify-ssh-key"
edition: "pro"
date: 2026-11-04
weight: 2849030
---

### Changes the name or automatic setting of a saved key

```text
cloudmin modify-ssh-key [--multiline | --json]
                        [--automatic | --no-automatic]
                        --key value
                        [--name value]
```


Changes a saved key's name or whether it is added automatically. The key itself stays unchanged.

```sh
cloudmin modify-ssh-key --key KEY_ID --no-automatic
```

Options:

- `--automatic | --no-automatic`: Add to new virtual machines created from cloud images and to prepared clones.
- `--key value`: Saved key ID.
- `--name value`: New key name.
