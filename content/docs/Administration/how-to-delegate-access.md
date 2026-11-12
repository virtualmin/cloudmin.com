---
title: "How to Delegate Access"
date: 2026-10-28
author: "Ilia Ross"
weight: 2751000
---

Cloudmin uses Webmin users and module permissions. A host administrator sees and manages everything; a delegated user sees only the virtual machines assigned to them, with the actions you grant.

### Host administrators

Granting the Cloudmin module to a Webmin user gives host administrator access by default, and existing users without saved Cloudmin permissions keep it. Creation, cloning, hardware editing, deletion, snapshots, backups, jobs, images, storage, networking and Module Configuration all require a host administrator.

### Assigning virtual machines to a user

1. Open **Webmin → Webmin Users**, select the user or group, and open the **Cloudmin** module permissions.
2. Set **Host administrator?** to **No**.
3. Select the virtual machines the user may view. Assignments use UUIDs, so renaming a guest does not change access. Without assignments, the user sees no virtual machines.
4. Grant the actions the user may perform on those guests. Each is a separate permission:
   - ordinary power controls (start, shutdown, reboot, suspend, resume, autostart);
   - forced power controls (hard reset and forced power off);
   - the graphical and serial consoles;
   - the SSH terminal;
   - guest password resets through the guest agent.

Assignment alone allows viewing details, live status, resource statistics and notification history for those guests. Changes and connections need their explicit grants, and Webmin's read-only mode blocks them even when granted. Webmin's safe and negative permission defaults grant no virtual machine access.

### What delegated users get

- The virtual machine details page with power state, guest agent, SSH reachability, addresses, disks, filesystems and transfer rates
- [Statistics charts and history](/docs/statistics/overview/) for assigned guests; host statistics and exports require host-administrator access
- [Notification history](/docs/notifications/history-and-delivery/) for assigned guests, without destinations or delivery results; changing rules or destinations requires host and management access
- The permitted power controls and Remote Access tabs
- The password reset form, which requires a running guest with a responding QEMU Guest Agent and never stores the password
- The same actions through the API with their own token, limited to their assigned UUIDs

Live status connections recheck permissions every 15 seconds and reload the page when they change. Console and terminal supervisors check every five seconds and close sessions when access is revoked.

### Guest Webmin through the host

The **Webmin** tab in Remote Access, which opens a Virtualmin guest through the host's Servers Index proxy, is available only to the host's `root` Webmin login and needs Servers Index permissions as well. Other users with creation permission can create virtual machines, but registration is skipped and their Remote Access page has no Webmin tab. See [Webmin access](/docs/remote-access/webmin-access/).

### Limits

Give delegated users only the other Webmin modules they need: Cloudmin permissions cannot restrict host access granted through another module or through SSH. Delegation covers existing virtual machines; self-service creation, project ownership and quotas are {{< planned >}} for Cloudmin Pro.
