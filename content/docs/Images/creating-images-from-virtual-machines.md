---
title: "Creating Images from Virtual Machines"
date: 2026-10-28
author: "Ilia Ross"
weight: 2320000
edition: pro
---

{{< pro >}} **Create Image** turns an existing virtual machine's system disk into a reusable image in Image Manager. It is part of the Cloudmin Pro extension; the shared module rejects capture when the extension is absent, including direct API requests.

### Capturing an image

Choose **Create image** from a guest's action menu or **Create Image** on **Edit Virtual Machine**. Enter an image name and a destination file pool (directory, filesystem or NFS), choose whether to remove login credentials for all local accounts, then choose whether to keep the source running with guest-agent preparation or shut it down cleanly before copying. Capture reuses the clone preparation, recovery and isolated guest preparation code, and requires libguestfs with its Perl bindings, YAML::XS 0.69 or later and bsdtar on the host. Host administrator access is required, and read-only sessions cannot submit a capture.

### Supported sources

Capture supports one writable Linux system disk using virtio, with working cloud-init and an installation libguestfs can inspect. Cloudmin seed disks are omitted. Additional writable disks, attached installation media and read-only data disks are rejected, as are devices whose state cannot be copied, such as TPMs.

### What the image contains

The result is a standalone QCOW2 image, also when the source disk is an LVM logical volume. Capture resets machine identity and cloud-init state, removes cloud-init logs, and replaces copied Virtualmin Pro license credentials with a placeholder. **Remove login credentials?** defaults to **Yes**: it clears password hashes, SSH credentials and default shell histories for all local accounts. **No** preserves those login credentials. Accounts, permissions, applications, data and other secrets remain, so captured images must stay private.

Virtual machines created from a captured image receive fresh host IDs, SSH host keys and access settings before boot, through the same prepared-clone path. Templates can select captured images like any other import.

### Related

- [Cloning](/docs/virtual-machines/cloning/) for a one-off copy with a fresh identity
- [Image Manager](/docs/images/image-manager/) for catalogue and imported images
