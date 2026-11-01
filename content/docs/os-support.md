---
title: "OS Support"
date: 2026-10-28
author: "Ilia Ross"
draft: false
weight: 900000
---

Cloudmin runs on top of Webmin and manages virtual machines through libvirt, so it needs a Linux host with KVM, systemd and the distribution's libvirt and QEMU packages. The automated installer and the host configuration are tested on a small set of current systems.

### Supported host systems

Cloudmin 10 installs on these hosts, on x86-64 or ARM64, with CPU virtualization extensions enabled and a working `/dev/kvm`:

#### Enterprise Linux and derivatives
- Rocky Linux 10 on x86_64 and aarch64
- AlmaLinux 10 on x86_64 and aarch64

Rocky Linux and AlmaLinux also use EPEL and CRB for dependencies, which the installer enables.

#### Debian Linux and derivatives
- Debian 13 on amd64 and arm64
- Ubuntu 26.04 LTS on amd64 and arm64

Debian supplies the Perl libvirt bindings in `main`; Ubuntu supplies them in `universe`, which the installer enables.

All hypervisor packages come from the distribution. Debian 13 and Ubuntu 26.04 use their stock monolithic `libvirtd` until modular packages become available; Cloudmin-Config prefers modular libvirt when `virtqemud` is installed.

### Notes on specific environments

- **Nested virtualization.** Installing inside UTM, VMware, KVM or another hypervisor works when nested KVM is enabled. The installer boots a temporary isolated KVM appliance before reporting success; a host where that boot fails is not reported as ready.
- **Ubuntu 26.04 on ARM64 under nested virtualization.** A boot failure has been reproduced with Ubuntu kernel 7.0.0-34 under Apple/UTM nested virtualization. A physical AMD x86-64 host with the same kernel passes. Use a Rocky Linux 10 or Debian 13 host in that environment, or retry after kernel or hypervisor updates.
- **Physical ARM64 hosts** remain untested.

### Guest operating systems

The host matrix does not limit guest choices. The image catalogue offers AlmaLinux, Alpine, Arch, CentOS Stream, Debian, Fedora, openSUSE, Rocky Linux and Ubuntu cloud images for the host architecture, and you can import your own QCOW2 or raw images or installer ISOs. Cloud images need cloud-init for account and network setup; custom images without catalogue metadata are inspected read-only with libguestfs. Installer ISO support is experimental: Alpine ARM64 has passed a full installation, and other installers still need testing.

### Cloudmin 9

Cloudmin 9 remains available and maintained for Xen users, including installer and critical compatibility fixes. Its end-of-support policy is not decided yet. Xen support in Cloudmin 10 is planned through libvirt after the KVM release is stable, with no date set.
