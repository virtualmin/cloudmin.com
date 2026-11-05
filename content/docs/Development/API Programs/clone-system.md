---
title: "clone-system"
date: 2026-10-30
weight: 2841140
---

### Copies a virtual machine to independent disks

```text
cloudmin clone-system [--multiline | --json]
                      [--no-wait]
                      (--name name | --id uuid)
                      [--address-mode dhcp|static]
                      [--auth-type keys|password|both]
                      [--autostart | --no-autostart]
                      [--confirm-license]
                      [--confirm-unchanged]
                      [--cpus number]
                      [--desc value]
                      [--disk size]
                      [--dns value]
                      [--gateway4 value]
                      [--gateway6 value]
                      [--host-ssh-key | --no-host-ssh-key]
                      [--hostname value]
                      [--ipv4 value]
                      [--ipv6 value]
                      [--mac value]
                      [--memory size]
                      [--mode prepared|unchanged]
                      [--network ID|name]
                      --new-name value
                      [--nvram-mode fresh|copy]
                      [--password-file file|-]
                      [--plan ID|name]
                      [--pool ID|name]
                      [--require-fqdn | --no-require-fqdn]
                      [--saved-key value]*
                      [--shutdown]
                      [--ssh-key value]*
                      [--ssh-keys-file file|-]
                      [--start | --no-start]
                      [--template ID|name]
                      [--username value]
```


Select the source with `--name` or `--id`, and give the destination an unused `--new-name`. Writable disks are copied to independent volumes with no backing files. The copy includes the source's applications and data.


- Prepared and unchanged copies

The default `--mode prepared` configures a new guest identity, hostname, network and administrator access before boot. It requires one inspectable Linux installation, enabled cloud-init and one network interface. Supply the new login settings with `--username`, `--auth-type` and the password or public-key file options.

On Pro hosts, `--saved-key KEY_ID` and automatic library keys apply to prepared clones as they do to `create-system`. Unchanged clones reject `--saved-key` and skip automatic keys.

`--mode unchanged` retains guest settings and login credentials, but still resets the host ID and removes copied Virtualmin Pro credentials. It requires `--confirm-unchanged` and must remain stopped with automatic startup disabled. Review its network and access settings before starting it alongside the source.

Both modes require libguestfs with its Perl bindings and bsdtar on the host. Prepared cloning also needs YAML::XS. A source with Virtualmin Pro requires `--confirm-license`: copied license credentials are removed, and the clone needs its own license or a manual downgrade to GPL. The source's credentials are unchanged.

- Resources and source preparation

Without explicit presets, the clone uses the source's CPU count, memory, first-disk capacity, pool and network. `--pool` changes the destination pool. `--disk` can enlarge the first disk but cannot shrink it. A selected plan supplies resource defaults; a template supplies access, network and boot defaults. Template software installation and scripts are not run on the clone.

A running source needs a responding guest agent for a filesystem freeze and temporary snapshot. Alternatively, `--shutdown` stops it cleanly for copying and restarts it afterward. A source that was already stopped stays stopped. Allow storage for independent disk copies and temporary source disk growth.

For UEFI, `--nvram-mode fresh` creates new firmware variables. `copy` preserves them from a stopped source or requires `--shutdown`. The default is fresh variables when copying a running source without shutdown, and copied variables otherwise.

- Completion

Without a preset or explicit startup options, the clone stays stopped and automatic startup is disabled. Use `--start` for a prepared clone you want to boot after copying. An unchanged copy cannot start automatically.

The command waits for the job by default. `--no-wait` returns its ID. If copying or cleanup fails, use `get-job` and `recover-job` so Cloudmin can finish restoring the source and remove incomplete copies before releasing their reservations.


```sh
cloudmin clone-system --name source.example.com --new-name \
    copy.example.com --auth-type keys --ssh-keys-file \
    /root/guest-public-keys --no-start
cloudmin clone-system --id MACHINE_UUID --new-name spare.example.com \
    --mode unchanged --confirm-unchanged --no-start --no-autostart \
    --shutdown
```

Options:

- `--address-mode dhcp|static`: Guest address configuration.
- `--auth-type keys|password|both`: Initial login authentication.
- `--autostart | --no-autostart`: Start when the host boots.
- `--confirm-license`: Acknowledge copied Virtualmin Pro credentials will be removed.
- `--confirm-unchanged`: Acknowledge that guest settings and credentials are retained.
- `--cpus number`: Number of CPUs.
- `--desc value`: Description.
- `--disk size`: Total disk capacity; bare values use GiB.
- `--dns value`: Space- or comma-separated DNS servers.
- `--gateway4 value`: IPv4 gateway.
- `--gateway6 value`: IPv6 gateway.
- `--host-ssh-key | --no-host-ssh-key`: Create a managed host SSH key for the guest.
- `--hostname value`: Guest hostname; defaults to its name.
- `--id uuid`: Source virtual machine UUID.
- `--ipv4 value`: Static IPv4 address with prefix.
- `--ipv6 value`: Static IPv6 address with prefix.
- `--mac value`: Guest MAC address; omitted generates one.
- `--memory size`: Memory allocation; bare values use MiB.
- `--mode prepared|unchanged`: Prepare a new identity or keep guest settings.
- `--name name`: Source virtual machine name.
- `--network ID|name`: Network key, UUID or name, or bridge:name.
- `--new-name value`: Destination virtual machine name.
- `--nvram-mode fresh|copy`: Create fresh firmware variables or copy them.
- `--password-file file|-`: Password file, or - for stdin.
- `--plan ID|name`: Plan ID or name.
- `--pool ID|name`: Destination storage pool ID or name.
- `--require-fqdn | --no-require-fqdn`: Require a fully qualified hostname.
- `--saved-key value`: Saved SSH key ID (Pro); repeat for more keys.
- `--shutdown`: Cleanly stop the source while copying and restart it afterward.
- `--ssh-key value`: SSH public key; repeat for more keys.
- `--ssh-keys-file file|-`: File containing SSH public keys.
- `--start | --no-start`: Start after creation.
- `--template ID|name`: Template ID or name.
- `--username value`: Initial guest administrator account.
