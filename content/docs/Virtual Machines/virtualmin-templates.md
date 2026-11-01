---
title: "Virtualmin Templates and Guest Software"
date: 2026-10-28
author: "Ilia Ross"
weight: 2220000
---

The Software section of a template or creation request can install packages, run scripts and install Virtualmin inside a new guest. Cloudmin tracks the work from the host and keeps the virtual machine if setup fails.

### Guest software setup

Guest setup requires a cloud image and **Start after creation**. After cloud-init finishes, a dormant helper service inside the guest runs as root in this order: the preparation script, package installation, the optional Virtualmin installation, and the final setup script. Scripts use `/bin/sh -e` and can switch users for application work. A failed or interrupted step stops without repeating scripts and keeps the virtual machine, with the error naming the log location inside the guest.

Cloudmin connects to the guest over SSH with the host-managed key and verifies the guest's SSH host key through the guest agent channel before sending any credentials. Progress appears in the creation job while other guests continue disk operations. Guest software setup requires managed virtual machine SSH keys to be enabled in Module Configuration.

### Virtualmin templates

Cloudmin ships Virtualmin GPL and Pro templates with Apache or Nginx. They run the official Virtualmin installer inside a fresh guest with options matching the installer's command builder:

- **Bundle**: LAMP (Apache) or LEMP (Nginx)
- **Type**: full or minimal installation
- **PostgreSQL**: optionally installed alongside MariaDB
- **Hostname SSL**: request a certificate for the guest hostname
- **Add to host's Webmin Servers Index**: register the guest for the embedded Webmin view, on by default

Virtualmin needs a fully qualified guest hostname, a fresh supported cloud image, Internet access, at least 2048 MiB of memory for a full installation or 1024 MiB for minimal, and a 20 GiB disk. The creation form shows the installation phases: waiting for guest setup, downloading the installer, installing, then configuring Webmin access through the host.

When the installation completes, the job links to the guest's Webmin through the host, or directly to `https://hostname:10000/` when registration was turned off.

### Virtualmin Pro licenses

Pro credentials are supplied for each creation request. They never enter templates, cloud-init seed disks, review responses or public job records, and they are removed from the job record once the guest has accepted them. Clones and captured images replace the Pro license and repository credentials with a placeholder before boot, so each copy needs its own license or a manual downgrade to GPL; the source license stays unchanged.

### Webmin Servers Index registration

After Virtualmin installation, Cloudmin saves the initial guest username and password in the host's protected Servers Index configuration, with private permissions and excluded from Webmin's file-change and undo logs. The setup job deletes its copy of the password when setup ends. If no password was saved, Servers Index asks for the guest login and remembers it for the browser session.

Only the host's `root` Webmin login can register guests or use the Webmin tab. Creations by other users skip registration. If registration fails, the virtual machine remains usable and the progress page shows a warning; choose **Open embedded Webmin** on the Webmin tab to retry. See [Webmin access](/docs/remote-access/webmin-access/) for the trust model.

### Packages and scripts without Virtualmin

Package-only and script-only setups need no Virtualmin resources and work with any supported cloud image. Use them to install an agent, join a configuration management system or seed an application. Scripts run only inside the guest and can read the initial username from `CLOUDMIN_GUEST_USER`.
