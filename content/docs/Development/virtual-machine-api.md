---
title: "Virtual Machine API and CLI"
date: 2026-10-28
author: "Ilia Ross"
weight: 2810000
---

The web interface, the command line and remote clients share one versioned API for virtual machine creation, power controls, management, cloning, backups, restore and host storage. The UI calls it internally; `api.cgi` exposes it over HTTP. The `cloudmin` command uses the same API on the host.

### Requests and responses

Send a JSON object or form fields with an `action`. Responses are JSON with `version: 1` and either `result` or `error`. Always check the `error` field: Webmin's CGI server returns HTTP 200 for JSON responses. Actions that make changes require POST and a signed `token` returned by the `options` action, which also lists the images, pools, networks, templates and plans available to the caller.

HTTP clients must pass Webmin's referer check: send a `Referer` from the same Webmin origin, or use the supported `User-Agent: Webmin` API convention. Webmin authentication and Cloudmin module permissions apply. Delegated users can call `options` and use the permitted power and password reset actions on their assigned virtual machine UUIDs.

### Actions

| Action | Purpose |
| --- | --- |
| `machines` | List visible virtual machines or read one by name or UUID |
| `options` | Available images, pools, networks, templates, plans and a form token |
| `review` | Validate a creation request without creating anything; stores only a private password hash for reuse |
| `create` | Create a virtual machine; repeated submissions of one attempt return the same job |
| `status`, `list` | Read a job or the caller's recent jobs |
| `start`, `shutdown`, `reboot`, `suspend`, `resume`, `reset`, `force_off`, `autostart` | Power controls; abrupt actions need `confirm` |
| `reset_password` | Change a guest account through the guest agent |
| `update`, `add_disk`, `grow_disk`, `attach_disk`, `detach_disk`, `delete_disk`, `delete` and related actions | Offline and live hardware management |
| `clone` | Full clone with a new identity or an unchanged stopped copy |
| `backup`, `backup_inspect`, `restore` | Full backups and restore |
| `snapshot_create`, `snapshot_restore`, `snapshot_delete` | Disk snapshots |
| `capture_image` | Image capture, with the Cloudmin Pro extension |

Passwords and license credentials are removed from input before anything is logged or rendered. Review stores a password hash privately for one day, bound to the token, attempt ID, Webmin user and initial username, so a following `create` can omit `password`. Responses never contain passwords or hashes.

### Host license

`license` returns public license status and accepts GET without a token. `check_license` refreshes it; `change_license` takes `serial` and `license_key`; `deregister_license` removes saved license and repository credentials and requires `confirm=1`. All license actions require host access. Writes also require POST, a signed token and a writable session. These repair actions remain available when licensing blocks new changes. See [License Manager](/docs/getting-started/license-manager/) for grace periods and the operations that continue after expiry.

### Host storage

`storage` returns active and inactive pools, volumes, ownership information, revisions and unregistered LVM groups. It requires host access and allows GET without a token. The following synchronous actions also require manage access, POST, a signed token and a writable session:

| Action | Purpose |
| --- | --- |
| `register_pool` | Register a directory or an existing LVM volume group |
| `pool_start`, `pool_stop`, `pool_autostart` | Change a directory pool's state or boot policy using its current revision |
| `volume_review`, `delete_volume` | Review ownership, then delete one unused volume with its revision and `confirm=1` |
| `pool_review`, `unregister_pool` | Review references, then remove a directory or parent LVM registration with its revision and `confirm=1` |

API pool selectors are UUIDs; volume selectors are exact names within a pool. CLI pool selectors also accept unambiguous names. Unregistration keeps all data. An active pool requires `stop=1` in both `pool_review` and `unregister_pool`; the review reports `stop_required`. For LVM this deactivates the whole volume group after checking host use and dependencies. The default `stop=0` refuses active pools. See [Storage Pools](/docs/storage/storage-pools/) and the [command-line reference](/docs/development/command-line/) for usage and limits.

### Creation request fields

A creation request names the virtual machine and selects an `image` or catalogue entry, `install_source` (`cloud` or `iso`), `pool`, `network`, `cpus`, `memory_mib`, `disk_gib`, the initial `username`, `auth_type` (`password`, `keys` or `both`) with `password` or `ssh_keys`, `address_mode` (`dhcp` or `static`) with `ipv4`, `ipv6`, `gateway4`, `gateway6` and `dns`, `firmware`, `start`, `autostart`, an optional `hostname` and `mac`, and a `template` and `plan`. Software fields are `software` (`none`, `virtualmin-gpl` or `virtualmin-pro`), `virtualmin_bundle`, `virtualmin_type`, `virtualmin_postgres`, `virtualmin_ssl`, `webmin_register`, `packages`, and the before and after scripts with their modes and paths. Pro creations also take `virtualmin_serial` and `virtualmin_key` on each request.

### Jobs

Creation, cloning, backups, restores, captures and hardware changes return a job immediately. A job record carries its state, phase, events, error, cleanup status and, for Virtualmin installations, the URL to open when it completes. Jobs reserve the resources they touch, can be cancelled at safe points, and recover after a controller restart. Job records never expose private request fields.

### Command line

Run `cloudmin` as root on the Cloudmin host. Commands such as `cloudmin list-systems`, `cloudmin create-system` and `cloudmin backup-systems` share the API's validation and recovery. Lists use tables by default; add `--multiline` for details or `--json` for scripts. Jobs are followed unless `--no-wait` is supplied.

See the [command-line reference](/docs/development/command-line/) for all commands and examples, or run `cloudmin help COMMAND`. The raw JSON entry points remain available as `api.pl` and `cloudmin api ACTION`.

### Planned

- A machine-readable API schema and generated reference documentation {{< planned >}}
- Revocable API credentials limited to individual actions, and automation credentials for projects {{< planned >}}
