---
title: "Privilege Separation"
date: 2026-10-28
author: "Ilia Ross"
weight: 2830000
---

Cloudmin's page handlers run as root, like other Webmin modules, but the risky work does not. Image and provisioning tools, consoles and relays run as separate processes without root privileges, even when the administrator is logged into Webmin as root.

### What runs as root

Webmin, Cloudmin's CGI scripts, the command line, the status server, the statistics collector and the controller jobs. They use normal Webmin initialization, authentication and permission checks, validate form tokens and input, record progress and make the libvirt changes. The module never installs host packages from a page request; `cloudmin-install` and Cloudmin-Config prepare the host.

### What runs without root

Downloads, host-file reads, checksum checks, disk inspection, SSH key validation, cloud-init seed generation, clone preparation, backup archive handling and transfers, guest software monitoring, and the console and terminal relays. Systemd assigns each task a temporary user ID through `DynamicUser` and releases it when the task stops; no permanent account is created.

Each worker starts as a fresh Perl or Python process without inheriting Webmin's memory, environment, open files or libvirt connections. It has private files, no Linux capabilities, a read-only view of the system, and no access to Webmin's credential files or libvirt control sockets. Download and size-lookup tasks receive Webmin's outgoing proxy settings, including proxy credentials when configured, in a private request file. Host-file reads, compatibility inspection, key validation and seed generation also have no host network access.

Libguestfs workers receive a private kernel copy from the root controller, so host kernel permissions stay unchanged, and need access to `/dev/kvm` through the `kvm` group. Installation readiness boots a real isolated KVM appliance the same way.

### Interactive relays

A root supervisor prepares each console or terminal connection, checks the session's permission, hands the relay only its prepared sockets and private credentials, and handles cleanup. The relay speaks WebSocket to the browser and SSH or VNC to the guest; the SSH client runs inside the relay's unit with the guest's pinned host key and the selected managed key delivered as a systemd credential. The supervisor rechecks the session's grant every five seconds and closes the connection when it is revoked. Serial consoles forward bytes between the libvirt stream in the supervisor and the relay, keeping the management connection out of the relay.

### Networking privileges

Cloudmin's root process checks permissions and input before applying network changes through libvirt and Webmin's network backends. Task workers cannot change host networking. Cloudmin does not need `passt` or `slirp4netns`.

### Requirements and limits

Workers require systemd 247 or later, `systemd-run` and working `nss-systemd` user lookup. If a worker cannot start with these restrictions, the operation fails; it never falls back to running the tools as root. A host-file import must be readable without root; use a browser upload for a private file. This design does not change the host to `qemu:///session` or replace its existing virtual networks.

### Secrets

Guest passwords are hashed for cloud-init and the hash is removed from the job record when creation finishes. Virtualmin Pro credentials are removed once the guest accepts them. Console passwords, Servers Index logins and backup destination secrets are kept out of job logs, process arguments, audit records and Webmin's file-change logs. Managed SSH private keys stay in Cloudmin's private module data directory with mode 0600.
