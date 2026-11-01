---
title: "unpause-system"
date: 2026-10-30
weight: 2841070
---

### Resumes a paused virtual machine

```text
cloudmin unpause-system [--multiline | --json]
                        [--no-wait]
                        (--name name | --id uuid)
```


Resumes execution of a paused machine selected by `--name` or `--id`, using its existing memory and running hardware state. It does not boot the operating system again or apply settings saved for the next start.

By default, waits for the host to report the machine running. `--no-wait` returns after the resume request is accepted. Applications may need to reconnect after the pause, so a running state does not prove that all services have recovered.

Use `start-system` for a stopped machine. `list-systems --state paused` finds machines that can be resumed.

```sh
cloudmin unpause-system --name guest.example.com
cloudmin unpause-system --id MACHINE_UUID --no-wait
```

Options:

- `--id uuid`: Source virtual machine UUID.
- `--name name`: Source virtual machine name.
