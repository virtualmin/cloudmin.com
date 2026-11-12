---
title: "Cloudmin 10.0 released"
date: 2026-10-28
tags: ["changelog", "cloudmin-changelog"]
author: "Ilia Ross"
---

Cloudmin 10.0 is a rewrite of Cloudmin around libvirt. It supports QEMU/KVM and replaces the previous hypervisor backends. Existing Cloudmin 9 hosts are not upgraded in place; install on a fresh supported host and see the [feature status](/docs/roadmap/) page for what is still planned, including the Cloudmin 9 import tool.

* Add a libvirt-based core that manages QEMU/KVM through `Sys::Virt`, keeping libvirt as the source of truth so `virsh`, virt-manager and Cockpit keep working on the same machines
* Add an automated installer for Rocky Linux 10, AlmaLinux 10, Debian 13 and Ubuntu 26.04 on x86-64 and ARM64, with repository setup, package groups, managed swap and a readiness report
* Add Cloudmin-Config host preparation for modular or monolithic libvirt, a default storage pool, a persistent NAT network, EFI firmware, nftables and Fail2ban, verified by booting an isolated KVM appliance before reporting success
* Add host readiness checks with actionable errors on the overview
* Add an image catalogue of AlmaLinux, Alpine, Arch, CentOS Stream, Debian, Fedora, openSUSE, Rocky Linux and Ubuntu cloud images for the host architecture, verified against the publishers' checksums
* Add Image Manager with background imports from HTTPS URLs, browser uploads and host files into directory, filesystem and NFS pools, batch downloads, progress pages, bulk deletion and custom catalogue entries
* Add virtual machine creation from cloud images or installer ISOs with firmware selection, independent disks and recoverable jobs
* Add cloud-init account setup with passwords or SSH keys, and DHCP or static IPv4 and IPv6 networking including on-link gateways and /32 addresses
* Add machine templates and resource plans that fill the creation form, with built-in Default Template, Default Plan and Virtualmin GPL and Pro templates for Apache or Nginx
* Add guest packages in GPL and custom preparation and final setup scripts in Cloudmin Pro, running inside new guests after cloud-init with or without Virtualmin
* Add Virtualmin installation inside new guests with progress on the host, per-machine Pro license credentials kept out of templates and seeds, and automatic registration in the host's Webmin Servers Index
* Add live CPU and balloon memory adjustment, offline resource maximums, boot settings, disk and network interface changes, disk growth, and live ISO insertion and ejection
* Add pause, resume, confirmed hard reset, autostart control and virtual machine deletion with explicit disk selection, shared-storage checks and recovery of interrupted operations
* Add guest password reset through the QEMU Guest Agent with its own permission and no password stored in jobs or logs
* Add a saved SSH key library, automatic keys for new virtual machines, and guest authorized-key management through the web interface, CLI and API in Cloudmin Pro
* Add disk snapshots with creation, restore, deletion, per-machine history, a host overview, guest-agent preparation and an optional clean shutdown
* Add full cloning from stopped or running guests with fresh identities, Virtualmin hostname and management certificate updates, Pro license placeholders, and unchanged copies left stopped
* Add full backups and restore with hourly to yearly schedules and retention, to local, SSH and S3 destinations, with Google Cloud Storage, Azure Blob Storage, Backblaze B2, Dropbox and Google Drive destinations in Cloudmin Pro
* Add image capture of an existing Linux guest's system disk into Image Manager in Cloudmin Pro
* Add browser SSH terminals with pinned host keys, host-managed per-guest login keys, remembered ports and optional automatic connection
* Add serial consoles with recorded output replay and graphical VNC consoles that work during boot and without a guest network, with fullscreen, zoom and guest keyboard shortcuts
* Add embedded guest Webmin through the host's Servers Index proxy for Virtualmin guests behind NAT, limited to the host's root login, behind a trust warning and with confirmation of changed guest addresses
* Add NAT, routed and isolated virtual networks, and guided host bridge creation through NetworkManager, Netplan or ifupdown with connectivity confirmation and automatic rollback
* Add storage pool and volume inventory with free-space checks before every disk operation
* Add LVM and LVM-thin storage pools registered from existing volume groups, with raw guest disks, offline growth, native snapshots, clones, backups and restore
* Add delegation of individual virtual machines to Webmin users with separate grants for power controls, forced power controls, consoles, SSH terminals and password resets, enforced by read-only mode and rechecked on open connections
* Add live status over authenticated WebSockets for power state, guest agent, SSH reachability, resource usage and guest filesystem usage, without browser polling
* Add a versioned JSON API shared by the web interface, the `api.pl` command line and remote clients, with signed requests and audit logging
* Add durable jobs with resource reservations, progress, cancellation at safe points and recovery after a controller restart for creation, cloning, backups, restores, captures and hardware changes
* Add isolated systemd workers without root privileges for downloads, host-file reads, checksum checks, disk inspection, SSH key validation, cloud-init seeds, consoles and terminal relays
* Add Module Configuration options for list columns, initially expanded sections, remembered Remote Access tabs, automatic SSH connection and the Webmin connection warning
* Add host and guest [notifications](/docs/notifications/overview/) in GPL and Pro for resource use, guest health, collector problems and failed jobs
* Add email, JSON webhook, Slack, Discord, Teams Workflows, ntfy, Telegram, Pushover and Gotify delivery with configurable thresholds, durations, reminders, recovery messages and automatic pauses for planned guest operations
* Add persistent notification queues with delivery retries, test messages, per-guest history and rule and destination management through the web interface, API and CLI
* Add compatibility wrappers so frame-based themes and older Cloudmin function names keep working
* Change Virtualmin fleet management to move out of Cloudmin; Cloudmin Services is not carried forward and the optional Virtualmin Connect module is planned to replace it
* Remove Xen, OpenVZ, LXC, VServer, Zones, Docker, Citrix, EC2, GCE and other provider screens; Xen returns through libvirt after the KVM release, and Cloudmin 9 remains maintained for Xen users
* Remove raw QEMU process management and `virsh` output parsing

{{< link "dark|outline|small" "newspaper" "/docs/roadmap/" "Feature status and roadmap" >}}
