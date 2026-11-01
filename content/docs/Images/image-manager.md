---
title: "Image Manager"
date: 2026-10-28
author: "Ilia Ross"
weight: 2310000
---

Image Manager holds the disk images that virtual machines are created from: catalogue cloud images, your own imports and installer ISOs. Importing an image does not create a virtual machine; use **Create Virtual Machine** to choose a catalogue image or an existing import.

### The catalogue

The built-in catalogue lists cloud images of AlmaLinux, Alpine, Arch, CentOS Stream, Debian, Fedora, openSUSE, Rocky Linux and Ubuntu for the host's architecture. Each entry records a stable ID, name, operating system, architecture, disk format, download size, minimum disk capacity, firmware and guest capabilities, release and support dates, and source URL. Catalogue downloads use HTTPS and are verified against the publisher's SHA-256 or SHA-512 checksum manifest before import. Detached signature verification is {{< planned >}}.

You can add custom catalogue entries with their own URL and optional SHA-256 checksum, and choose which columns the catalogue and import lists show in Module Configuration.

### Importing images

Imports use Webmin's HTTP APIs, `qemu-img` and the system's `Sys::Virt` Perl bindings. Downloads require the system CA certificate bundle.

Images can be downloaded from an HTTPS URL, uploaded from the browser or read from a file already on the host, into libvirt directory, filesystem and NFS pools. LVM pools cannot hold images; machines created in an LVM pool still take their image from a file pool. Imports accept standalone QCOW2 and raw disk images and installer ISOs; linked and encrypted QCOW2 images are rejected. Available space in temporary storage and the destination pool limits the size, and Module Configuration can set a maximum file size.

Downloads and imports run in the background with progress pages and batch operations. Temporary files are private, existing volumes are never overwritten, and a failed import removes the volume it created and reports any cleanup failure. A host-file import must be readable without root; use a browser upload for a private file.

### Images during creation

Templates can select a catalogue image before it is downloaded. A creation job reuses a verified copy or starts, or joins, an import in the destination pool before allocating guest disks. Downloads expose byte progress and do not hold the disk-work lock. Cancelling the creation leaves the shared import running; Image Manager can cancel it separately. Cached assets are reused without automatically refreshing rolling publisher URLs.

Cloudmin checks cloud image compatibility automatically. Custom cloud images without catalogue metadata are inspected read-only with libguestfs, its Perl bindings and YAML::XS.

### Deleting images

Images can be deleted individually or in bulk. Cloudmin checks that no volume still uses an image as a backing file before removing it, refreshing pools so entries removed outside libvirt do not block the check.

### Captured images

With Cloudmin Pro, **Create Image** captures one Linux system disk of an existing guest as a standalone image in Image Manager. See [Creating images from virtual machines](/docs/images/creating-images-from-virtual-machines/).
