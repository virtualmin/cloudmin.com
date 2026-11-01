---
title: "Professional Features"
date: 2026-10-29
author: "Ilia Ross"
weight: 910000
---

Cloudmin GPL manages the host it runs on, with an unlimited number of virtual machines. Cloudmin Pro adds features for that host. Cloudmin Connect GPL and Pro are separate planned products for managing a fleet of Cloudmin hosts.

GPL and Pro share the same API, libvirt adapter and UI. Pro implementations install under `server-manager/pro`. Security fixes, safe cold migration, data export and restore are never Pro-only.

### Available host features

#### Custom setup scripts {#setup-scripts}

{{< pro >}} Preparation and final setup scripts run inside a new guest, before and after its software installation. Scripts can be entered directly or read from an allowed host file. Guest packages and Virtualmin GPL/Pro installation remain available in Cloudmin GPL. See [Templates and plans](/docs/virtual-machines/templates-and-plans/).

#### Cloud backup destinations {#cloud-backups}

{{< pro >}} Google Cloud Storage, Azure Blob Storage, Backblaze B2, Dropbox and Google Drive transfers use Virtualmin's provider helpers. Local directories, mounted storage, SSH and S3-compatible backups remain in GPL, including schedules, retention, live backups and restore. Real-account transfer tests for the Pro providers are still pending. See [Backups and restore](/docs/backup-and-migration/backups-and-restore/).

#### Create Image {#image-capture}

{{< pro >}} Capture an existing Linux guest's virtio system disk as a standalone QCOW2 image, using live snapshot or clean-shutdown preparation. New machines receive fresh identities and login settings. Importing and using existing images remain in GPL. See [Creating images from virtual machines](/docs/images/creating-images-from-virtual-machines/).

Everything else currently implemented remains in GPL, including ordinary Webmin permissions, per-machine grants, read-only access, consoles, networking, storage, snapshots, clones, CLI and API access. Virtualmin Pro guest templates do not require Cloudmin Pro.

### Pro previews in GPL

GPL shows Pro controls in context, disabled and marked with a Pro badge. **Module Configuration → Host connection and overview → Show Pro features overview?** can hide these previews. Hiding advertising does not change permissions or unlock features; the server also refuses Pro operations without the package.

Templates saved with scripts remain readable after Pro is removed. Their script controls become read-only, and creation refuses those scripts. An administrator can explicitly clear both saved scripts when editing the template. Other template edits preserve them.

### Planned products

All Connect features below are {{< planned >}}. They are not available in the current host module.

| Product | Scope | Features |
| --- | --- | --- |
| Cloudmin GPL | One host, unlimited virtual machines | Existing host management, packages, Virtualmin installation, backups and Webmin access grants |
| Cloudmin Pro | One host | Custom scripts, cloud backup providers and image capture; projects, quotas, self-service creation, usage tracking and automation credentials {{< planned >}} |
| Cloudmin Connect GPL | A fleet, with host and fleet VM limits to be decided | Host registration, combined inventory and search, consoles, terminals, basic resource views, safe cold moves and host backup/restore actions {{< planned >}} |
| Cloudmin Connect Pro | Fleet operations | Live migration, evacuation, placement, failover, controller availability, disaster recovery, fleet policy and automation {{< planned >}} |

Connect Pro also plans SSO, enforced two-factor authentication, fleet roles, audit retention and SIEM integration, backup policies and test restores, alerts, capacity reports, chargeback, scoped fleet tokens, bulk actions, approvals, maintenance windows, Terraform integration, shared storage and networking, security groups, white-labeling and priority support. Delivery is incremental: Connect GPL and cold moves first, Pro live migration next, automatic failover last. Each migration combination must be tested. Automatic failover requires controller quorum and verified fencing to prevent two hosts starting the same guest disks.

#### Connect limits and purchases

Connect GPL will count registered compute hosts and all virtual machines on them, including machines created locally. A controller with no guests will not count as a compute host; a controller that also runs guests will. Pro hosts count too.

Exceeding a Connect GPL limit will restrict new registrations, creation and moves through Connect. Existing machines will remain visible and available for monitoring, recovery and restore. Local Cloudmin GPL will retain unlimited virtual machines. Exact limits and prices are not final.

Cloudmin Pro and Cloudmin Connect Pro are separate purchases. Buying one does not unlock the other's features. Commercial bundles may offer discounts without merging these entitlements.

Virtualmin Connect is a separate planned Webmin module for managing Virtualmin servers and replacing Cloudmin Services. Its edition split, counting rules and commercial bundles remain undecided.

### Licensing

Cloudmin Pro licenses are sold through the [Virtualmin shop](https://www.virtualmin.com/product/cloudmin-professional-monthly-subscription/). Cloudmin 10 licensing and Connect prices are not final. The current Pro extensions do not contact a license server.

### Virtualmin Pro inside guests

Virtualmin Pro licensing is separate from Cloudmin. Its guest template asks for a license serial and key per virtual machine, keeps them out of templates and cloud-init seed disks, and removes them from the job record once the guest has accepted them. Clones and captured images replace Pro credentials with a placeholder, so each copy needs its own license or a manual downgrade to GPL.
