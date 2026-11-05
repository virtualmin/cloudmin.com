---
title: "License Manager"
date: 2026-10-31
weight: 2752000
---

Open **System → Settings → License Manager** to view, recheck, replace or deregister a Cloudmin Pro license. GPL does not require a license. Host administrators can change licenses; read-only users can view their status.

### Renewing or changing a license

Renew through your [Virtualmin account](https://www.virtualmin.com/account/), then select **Recheck License**. To use another license, enter its serial number and key. Cloudmin validates the replacement before saving it and updating existing Cloudmin package repository credentials. Credentials are stored in `/etc/cloudmin-license`. Administrators who can change the license can see its saved key; read-only users cannot.

### Deregistering a license

**Deregister License** asks for confirmation, then removes this host's saved license and repository credentials. Pro updates and new changes through Cloudmin require a license again. Existing machines, scheduled backups and accepted jobs keep running. This does not cancel your subscription or immediately remove the host from the license server's count.

### Grace periods

An expired license allows changes for seven days after the licensed date ends in UTC. When the server reports use on too many hosts, there are 21 days to finish the migration or assign separate licenses. Rechecking does not restart either period.

Checks use `https://www.virtualmin.com/api/license/client` with `product=cloudmin`. The license must belong to Cloudmin; Virtualmin licenses are rejected. The server reports the expiry date, host allowance and host use. Migration grace starts when this host first observes use above that allowance.

If verification fails, the last verified license can remain usable for up to 21 days. An earlier expiry or migration deadline still applies. Check the host clock and HTTPS connectivity, then recheck the license. Missing or invalid cached state requires successful verification.

### After grace ends

Cloudmin blocks new changes through the web interface, API and CLI. Existing machines and services keep running. Inventory, guest connections, accepted jobs, scheduled backups and recovery remain available. Forms and buttons stay available under their normal permissions. Submitting a blocked change opens an error page with instructions for restoring access. License Manager remains available throughout.

### Command line

```sh
cloudmin get-license
cloudmin check-license
cloudmin change-license --serial 12345 --key-file /root/cloudmin-key
cloudmin deregister-license --yes
```

Keep the key in a private file, or use `--key-file -` to read standard input. See the [command reference](/docs/development/command-line/#license-manager) for details.
