---
title: ""
date: 2026-10-28
showtoc: false
hideMeta: true
loadGalleryIndex: true
---

{{< html span "" "" cloudmin-intro >}}
Cloudmin is a virtual machine management panel for Linux hosts. Cloudmin 10 is a rewrite around libvirt, the standard Linux API for managing virtual machines, and supports QEMU/KVM. It runs inside Webmin on your own hardware, keeps every virtual hardware definition in libvirt, and adds the parts libvirt leaves to you: images, templates, jobs, permissions, consoles, snapshots, clones and backups.

Install it on a fresh Rocky Linux, AlmaLinux, Debian or Ubuntu host, download a cloud image from the catalogue or bring your own, and create a guest from one form. Cloud images are configured through cloud-init with the account, SSH keys and addressing you choose; installer ISOs boot into a graphical console. Every long operation is a recoverable job with progress, and the risky parts run in isolated workers without root.

Cloudmin GPL is free and manages one host with an unlimited number of virtual machines. Cloudmin Pro adds custom guest setup scripts, cloud backup destinations and image capture today, with tenancy planned. Both editions share one core, one API and one command line. Managing many hosts from one place, with placement and live migration, is planned for Cloudmin Connect, a separate product.

If you run Virtualmin, Cloudmin is the quickest way to get more of it: choose a Virtualmin GPL or Pro template and the hosting stack installs inside the new guest, with progress on the host and the guest's Webmin reachable through it, even behind NAT.

<!-- {{< html div chocolat-drop >}} -->

## Cloudmin Features
Cloudmin gives you one place to create, run, protect and reach KVM virtual machines on a Linux host. Built on Webmin, it adds the operational tools around libvirt that a host needs every day.

{{< index-1 >}}

## Built for safety, speed and control

Cloudmin has plenty of company, both open source and commercial. It sets out to be the panel that makes a single KVM host effortless without hiding Linux from you, and to grow into a multi-host platform on the same foundation through Cloudmin Connect.

{{< index-2 >}}

{{< index-3 >}}
