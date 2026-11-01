---
title: "passwd-system"
date: 2026-10-30
weight: 2841120
---

### Changes an existing guest account password through its agent

```text
cloudmin passwd-system [--multiline | --json]
                       (--name name | --id uuid)
                       --password-file file|-
                       --user value
```


Changes the login password of an existing account inside the machine selected by `--name` or `--id`. `--user` names the guest account, not a Webmin user. The machine must be running with a responding QEMU guest agent. This command cannot create an account or reset a password in a stopped guest.

`--password-file` reads the new password from a regular UTF-8 text file. `--password-file -` reads it from standard input. One final newline is removed. Keep password files private; the password itself is never a command-line argument or part of the public result.

The command returns after the agent accepts the change. It does not change SSH authentication policy, unlock other login methods or replace authorized SSH keys. For example, changing a password does not enable SSH password login if the guest disables it.

```sh
cloudmin passwd-system --name guest.example.com --user cloudmin \
    --password-file /root/guest-password
cloudmin passwd-system --id MACHINE_UUID --user cloudmin --password-file \
    - < /root/guest-password
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
- `--password-file file|-`: Password file, or - for stdin.
- `--user value`: Existing guest account.
