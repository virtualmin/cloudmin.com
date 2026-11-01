---
title: "Installer ISOs"
date: 2026-10-28
author: "Ilia Ross"
weight: 2240000
---

Besides cloud images, Cloudmin can create a virtual machine that boots an installer ISO so you can install an operating system the traditional way.

{{< alert warning exclamation-triangle "Experimental" "Installer ISO support is experimental. Alpine 3.24.2 ARM64 has passed a full installation and boot with the ISO ejected. Other installers still need testing." >}}

### Import the ISO

Open **Image Manager** and import the ISO from an HTTPS URL, a browser upload or a file on the host. Imports accept installer ISOs alongside standalone QCOW2 and raw disk images. A host-file import must be readable without root; use a browser upload for a private file.

### Create the virtual machine

1. Open **Create Virtual Machine** and choose **Installer ISO** as the installation source in **Image and storage**.
2. Pick the imported ISO. Cloudmin creates an empty system disk of the plan's size and attaches the ISO in a read-only CD/DVD drive.
3. Choose the firmware. UEFI is used where the host and image settings call for it; BIOS remains available for installers that need it.
4. Create the machine. Cloud-init, the guest account settings and the managed SSH key are not used for ISO installations; access is configured inside the guest by the installer.

Templates can require a fully qualified hostname, but that rule applies to cloud images only.

### Install the OS

Open **Remote Access → Graphical console** to use the installer's screen, keyboard and mouse. The console works during boot and without guest networking, and Webmin authenticates the connection without exposing a VNC password or port. When the installation finishes, eject the ISO from the virtual machine's media controls or set the system disk as the first boot device, then reboot the guest.

### After installation

Install the QEMU Guest Agent inside the guest to get filesystem usage, guest OS details, password resets and live cloning support. Configure the guest's serial port for a login prompt or boot output if you want to use the serial console. Cloudmin does not inspect ISO contents or configure the installed system.
