---
title: "Virtual Machine API and CLI"
date: 2026-10-28
author: "Ilia Ross"
weight: 2810000
---

The web interface, the command line and remote clients share one versioned API for virtual machine creation, power controls, management, cloning, backups, restore, host storage, statistics, notifications and Pro SSH key management. The UI calls it internally; `api.cgi` exposes it over HTTP. The `cloudmin` command uses the same API on the host.

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

### SSH keys (Pro)

Saved-key and guest-key actions require Cloudmin Pro and host administrator access. They complete synchronously. `ssh_keys` and `guest_ssh_keys` allow GET without a token; changes and private-key downloads require manage access, POST, a signed token and a writable session.

| Action | Purpose |
| --- | --- |
| `ssh_keys` | List saved public keys, or read one with `key` |
| `save_ssh_key` | Generate or import a key; supply `key` and `revision` to edit its name or automatic setting |
| `delete_ssh_key` | Delete a library entry using `key`, `revision` and `confirm=1` |
| `download_ssh_key` | Return a generated private key in the `private` field; imported private keys are not retained |
| `guest_ssh_keys` | List an existing account's keys using the virtual machine `id` and `username` |
| `add_guest_ssh_key` | Add a saved `key` or `public` key text to that account |
| `remove_guest_ssh_key` | Remove a guest entry using `id`, `username`, the guest `key` ID, `revision` and `confirm=1` |

Guest operations require a running virtual machine and an agent that supports SSH key commands. A guest key ID comes from `guest_ssh_keys` and differs from a saved library key ID. Ordinary lists never return private keys. See [SSH Keys](/docs/remote-access/ssh-keys/) for the web interface and CLI.

### Notifications

Notifications are available in GPL and Pro. `notifications` returns events and current conditions. It accepts an optional guest `id`, a `limit` from 1 to 500, and either a `cursor` for reading successive batches or a `page` number starting at 1 for the newest events. Without a cursor or page it returns the latest events; `cursor=0` starts at the oldest retained event. Page responses include `total`, `page`, `pages` and `limit`. An optional `search` phrase of up to 200 characters filters events, ignoring letter case, before counting and paging. Delegated users must supply an assigned guest UUID. Their results omit destinations and delivery details.

`notification_config` requires host access and returns rules, destinations without tokens or private addresses, and the last background check status. Both read actions allow GET without a token. Changes require host and management access, POST, a signed token and a writable session.

| Action | Fields |
| --- | --- |
| `save_notification_target` | A complete `target` object; include its `id` to update it |
| `save_notification_rule` | A complete `rule` object; optionally supply a new `target` object to save both together |
| `set_notification_target_enabled`, `set_notification_rule_enabled` | Saved ID in `object`, plus `enabled` |
| `delete_notification_target`, `delete_notification_rule` | Saved ID in `object` |
| `test_notification_target` | Destination ID in `object` |
| `retry_notification` | Event ID in `object` |
| `mute_notifications` | Guest UUID or `all` in `id` |
| `unmute_notifications` | Guest UUID or `all` in `id` |

History returns `muted` and `all_muted` as 0 or 1. For guest history, `muted` reports only that guest's own mute. For combined history, it reports the global mute. `all_muted` always reports the global mute. A guest is muted if either value is 1. Mutes stay active until you undo them. Checks and history continue while muted.

Test and retry actions queue delivery for the background worker. Use `notifications` to check the result. See [Notifications](/docs/notifications/api-and-cli/#api) for rule fields, destination formats, pagination and webhook payloads.

### Statistics

Statistics are available in GPL and Pro. Both actions allow authenticated GET requests without a form token.

| Action | Purpose |
| --- | --- |
| `statistics` | Read chart data for the host or a guest, including units, coverage, peaks, events and latest live readings |
| `statistics_export` | Read completed summaries in batches, with a cursor for resuming exports |

Host queries and exports require host-administrator access. Delegated users can query only an assigned guest's exact UUID. `statistics` defaults to the last hour of host history and accepts ranges up to 366 days. See [Statistics API and CLI](/docs/statistics/api-and-cli/#api) for fields, limits and export handling.

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

Both GPL and Pro accept public text in `ssh_keys`. Pro also accepts `saved_ssh_keys`, a comma-separated list of library IDs, and merges automatic keys into cloud-image and prepared-clone requests. Password authentication stays enabled when selected. ISO installs and unchanged clones reject explicit saved-key selections and skip automatic keys.

### Jobs

Creation, cloning, backups, restores, captures and hardware changes return a job immediately. A job record carries its state, phase, events, error, cleanup status and, for Virtualmin installations, the URL to open when it completes. Jobs reserve the resources they touch, can be cancelled at safe points, and recover after a controller restart. Job records never expose private request fields.

### Command line

Run `cloudmin` as root on the Cloudmin host. Commands such as `cloudmin list-systems`, `cloudmin create-system` and `cloudmin backup-systems` share the API's validation and recovery. Lists use tables by default; add `--multiline` for details or `--json` for scripts. Jobs are followed unless `--no-wait` is supplied.

See the [command-line reference](/docs/development/command-line/) for all commands and examples, or run `cloudmin help COMMAND`. The raw JSON entry points remain available as `api.pl` and `cloudmin api ACTION`.

SSH key management commands appear in GPL help with `(Pro)` in their descriptions, but execution fails with `SSH key management requires Cloudmin Pro`. GPL can still use `--ssh-key` or `--ssh-keys-file` when creating virtual machines; `--saved-key` requires Pro.

### Planned

- A machine-readable API schema and generated reference documentation {{< planned >}}
- Revocable API credentials limited to individual actions, and automation credentials for projects {{< planned >}}
