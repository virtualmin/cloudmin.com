---
title: "Migrating from Cloudmin 9"
date: 2026-10-28
author: "Ilia Ross"
weight: 2720000
---

{{< alert warning exclamation-triangle "Planned feature" "The legacy import tool described here is a design target and is not available yet. Cloudmin 10 does not upgrade a Cloudmin 9 host in place, and a package upgrade never imports existing virtual machines." >}}

### Why import is explicit

Cloudmin 10 breaks internal compatibility with Cloudmin 9 on purpose, but it must not break user data. Existing KVM installations get a visible, tested import and rollback path, and Cloudmin 9 stays available and maintained for Xen users while the KVM line matures.

### The planned importer {{< planned >}}

The importer is a separate tool, never a package side effect:

1. `cloudmin migrate --scan` reads the old configuration without changing it and backs up the legacy controller state.
2. It inventories Servers Index records, flat files, running QEMU processes, boot scripts, disks, LVM volumes, iSCSI mappings, bridges, MACs, IPs, console settings, schedules, owners and image references.
3. It produces a report for each virtual machine:

| Result | Meaning |
| --- | --- |
| Ready | Cloudmin can import the virtual machine safely. |
| Review | Import is possible, but the administrator must confirm a choice. |
| Blocked | Part of the old configuration cannot be translated safely. |

4. For each ready virtual machine it generates and validates a libvirt definition without starting it, stops the old virtual machine, disables only its exact legacy start-up entry, defines and starts it through libvirt, runs health checks, and commits only when they pass.
5. If anything fails it undefines the new domain and restores the legacy boot entry.

The importer preserves the UUID where known, the name, MACs, disk paths and formats, boot order, CPU, memory, firmware, network attachments and autostart. It reuses disks in place when safe and does not copy old SSH or Webmin passwords. Unsupported QEMU options block with an explanation.

### What you can do today

- Install Cloudmin 10 on a fresh supported host and create new virtual machines there.
- Keep Cloudmin 9 hosts running; installer and critical compatibility fixes continue on a maintenance branch.
- Guests defined in libvirt by other tools appear in Cloudmin 10's inventory; full adoption with Cloudmin management is {{< planned >}}.

### Cloudmin Services and Virtualmin fleets

Cloudmin Services from Cloudmin 9 is not carried forward. Virtualmin Connect, an optional Webmin module, is {{< planned >}} to replace it: shared DNS, database, spam and virus services become remote-server settings in Virtualmin, and Connect distributes settings and policy, enforces per-owner quotas and the cross-server subdomain check, and keeps the server list, monitoring and provisioning log. A one-time script to migrate owners, limits and provisioning history from a Cloudmin 9 master is part of that plan.
