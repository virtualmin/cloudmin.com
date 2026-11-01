---
title: "modify-system"
date: 2026-10-30
weight: 2841110
---

### Changes saved resources, boot settings or automatic startup

```text
cloudmin modify-system [--multiline | --json]
                       [--no-wait]
                       (--name name | --id uuid)
                       [--autostart yes|no]
                       [--boot value]
                       [--bootmenu yes|no]
                       [--changes-file file|-]
                       [--cpu-limit number]
                       [--cpus number]
                       [--desc value]
                       [--enable-live]
                       [--memory size]
                       [--memory-limit size]
```


Changes selected settings of the machine identified by `--name` or `--id`. Omitted fields keep their existing values. The command reads the current configuration revision before submitting the update, so a conflicting concurrent edit can still cause the request to fail.


- Resources and boot settings

`--cpus` and `--memory` set the allocation. `--cpu-limit` and `--memory-limit` set the maximum CPU count and memory, not CPU usage or scheduling limits. Bare memory values use MiB; `4G` means 4 GiB.

Supported CPU and memory allocation changes can apply while the guest runs. Allocation changes outside its running limits, changes to resource maximums, and boot settings are saved for the next full shutdown and start. If a supported live change fails, the command reports the error. Check `get-system --multiline` for running values and pending changes, then use `restart-system` when needed. Adding CPUs or adjusting memory through ballooning also requires guest support.

`--boot disk:vda` selects a disk as the first boot device; `--boot nic:MAC` selects a network interface. This replaces the saved boot order. `--bootmenu yes` enables the firmware boot menu. Use `list-disks` and `list-interfaces` to find device identifiers.

- Preparing for live changes

`--enable-live` requires a stopped guest. It adds CPU slots, spare device ports and a CD drive for later changes while preserving the current allocation. The command does not shut a running guest down automatically.

- Combined hardware edits

`--changes-file` reads a JSON array of up to 128 disk or interface edits. Each entry uses an API action and its fields, for example `grow_disk` with `target` and `disk_gib`. An existing device can be changed only once in the array. Disk deletion requires the separate `delete-disk` command.

The whole request is validated before any changes, but disk growth cannot be undone if a later step fails. Use `get-job` and `recover-job` for an interrupted update. When its safety checks pass, `discard-job` keeps completed growth and releases the machine for further edits.

- Automatic startup and completion

`--autostart yes` starts the machine when the host boots; `--autostart no` disables that behavior. If combined with hardware edits, it is changed only after their job succeeds. With `--no-wait`, submit automatic startup as a separate command.

The command waits for hardware edits by default. `--no-wait` returns the job ID. Use `--json` for the job record, including any fields saved for the next start.


```sh
cloudmin modify-system --name guest.example.com --memory 4G --cpus 2
cloudmin modify-system --name guest.example.com --boot disk:vda \
    --bootmenu yes
cloudmin modify-system --name guest.example.com --autostart yes
cloudmin modify-system --id MACHINE_UUID --changes-file \
    /root/hardware-edits.json
```

Options:

- `--autostart yes|no`: Start when the host boots.
- `--boot value`: First boot device: disk:TARGET or nic:MAC.
- `--bootmenu yes|no`: Enable the firmware boot menu.
- `--changes-file file|-`: JSON array of hardware edits.
- `--cpu-limit number`: Maximum CPUs.
- `--cpus number`: Number of CPUs.
- `--desc value`: Description.
- `--enable-live`: Add CPU slots, spare device ports and a CD drive while stopped.
- `--id uuid`: Source virtual machine UUID.
- `--memory size`: Memory allocation; bare values use MiB.
- `--memory-limit size`: Maximum memory; bare values use MiB.
- `--name name`: Source virtual machine name.
