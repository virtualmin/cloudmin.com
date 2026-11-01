---
title: "Host Requirements"
date: 2026-10-28
author: "Ilia Ross"
draft: false
weight: 2020000
---

The installer satisfies these requirements on a supported host. This page explains what they are, so readiness failures and optional features make sense.

### Core

- **KVM.** CPU virtualization extensions enabled in firmware and a working `/dev/kvm`. Inside another hypervisor, nested virtualization must be enabled. Installation readiness boots a real isolated KVM appliance rather than only checking that `/dev/kvm` exists.
- **systemd 247 or later** with `systemd-run` and working `nss-systemd` user lookup. Cloudmin's isolated workers and console relays depend on it; if a worker cannot start with its restrictions, the operation fails rather than running the tool as root.
- **libvirt and QEMU** from the distribution, with the Perl `Sys::Virt` bindings. Cloudmin connects as root to the system connection (`qemu:///system`). Distribution socket permissions are kept. Rocky Linux and AlmaLinux also use EPEL for dependencies; Debian supplies `libsys-virt-perl` in main and Ubuntu in universe.
- **Webmin** at the version released with Cloudmin 10. Cloudmin uses Webmin's authentication, permissions, UI widgets and HTTP APIs, and development installations need current Webmin sources for widgets such as `ui_action_button` and grouped image choices.
- **EFI firmware** packages for UEFI guests, and the system CA certificate bundle for catalogue downloads.

### Optional tools

| Feature | Requires |
| --- | --- |
| Custom cloud image inspection | libguestfs and its Perl bindings, YAML::XS |
| Cloning and prepared clones | libguestfs, its Perl bindings, bsdtar, YAML::XS; access to `/dev/kvm` through the `kvm` group and the running kernel and modules for the appliance |
| Image capture (Pro) | libguestfs, its Perl bindings, YAML::XS 0.69 or later, bsdtar |
| SSH terminal | Webmin's Terminal module, `Net::WebSocket::Server`, OpenSSH, Python 3 |
| Graphical and serial consoles | Webmin's Terminal module, `Net::WebSocket::Server`, Python 3; a VNC display for the graphical console |
| Serial output recording | `virtlogd` with `stdio_handler = "logd"`, a positive `max_size` and 1–32 backups |
| Host bridges on ifupdown | `bridge-utils` |
| Backup archives | `qemu-img`, Python 3 |

The root controller supplies a private kernel copy to each libguestfs worker; host kernel permissions stay unchanged.

### Readiness checks

The Cloudmin overview shows host details and requirements. Healthy details can be hidden in Module Configuration, but failed requirements are always shown to host administrators. Each failed check names the missing capability and how to fix it. Checks include the libvirt connection and daemon layout, KVM availability, the default pool and NAT network, firmware, worker isolation, and the tools above.

### Module Configuration

Settings are grouped by purpose: host connection and overview, virtual machine lists and details, creation, remote connections, backups, snapshots, images, networking and storage. Choose a category to edit its settings. These settings apply to all Cloudmin users on the host without changing their permissions or the data collected.

You can set the libvirt connection URI, bridge confirmation timeout, maximum image file size, default SSH authentication method, remembered Remote Access tab, automatic SSH connection, Webmin connection warning, pre-generated passwords and host-managed SSH keys. Edit creation defaults in **System Settings → Machine Templates** and **Resource Plans**; administrators can override them on the creation form without changing the saved presets or existing virtual machines. Creation checks host capacity, available space and image requirements.

Choose columns for virtual machines, imported images, the image catalogue, networks, storage pools and volumes, backups, backup schedules and the host snapshot list. Names always remain visible. Virtual machine and imported image states, backup schedule status and snapshot history position also remain visible.

Choose which sections start expanded on creation and backup forms and virtual machine detail pages. Advanced image import options and healthy host details can also start open. Failed host requirements are always shown to host administrators. Collapsed sections can still be opened on the page.

Images, networking and storage remember the last selected tab by default, separately for each Webmin user. Links to a specific tab override the saved choice. With this setting off, images opens the imported image list; networking and storage open their overviews. Read-only users can use saved choices but cannot update them.

Image settings choose a default import pool and whether the catalogue shows the host architecture or all architectures. By default, pool selection is automatic and only the host architecture is shown. An unavailable preferred pool falls back to automatic selection. Snapshot notes appear in each virtual machine's history by default; hiding them does not delete them.

### What is not managed

Cloudmin does not change cloud-init's host configuration, does not create public IP addresses, and does not configure the guest OS beyond what cloud-init and the optional guest setup scripts do. Unsupported custom interface configurations stay under Webmin's Network Configuration module.
