---
title: "change-license"
date: 2026-10-31
weight: 2850030
---

### Validates and saves a Cloudmin Pro license

```text
cloudmin change-license [--multiline | --json]
                        --key-file file|-
                        --serial value
```


Checks a new Cloudmin Pro license before saving it. Read the key from a private
file or standard input. Failed validation leaves the current license in place.

```sh
cloudmin change-license --serial 12345 --key-file /root/cloudmin-key
```

Expiry grace lasts seven days after the expiry date ends in UTC. Migration
grace lasts 21 days from when this host first detects use on too many hosts.
A failed check allows up to 21 days from the last successful check, without
extending expiry or migration deadlines. Existing machines, accepted jobs,
scheduled backups, job recovery and network rollback keep working when new
changes are blocked.

Options:

- `--key-file file|-`: License key file, or - for stdin.
- `--serial value`: Cloudmin license serial number.
