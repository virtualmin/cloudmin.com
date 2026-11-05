---
title: "How to Create a Virtual Machine"
date: 2026-10-28
author: "Ilia Ross"
weight: 1040000
---

This guide walks through creating a KVM virtual machine from a cloud image on a freshly installed Cloudmin host.

### Before you start

Log in to Webmin as a host administrator and open **Cloudmin**. The overview shows the host checks; fix any failed requirement first. Nothing else is needed: the installer already prepared a default storage pool, a NAT network and the EFI firmware, and the image catalogue is built in.

### Create the virtual machine

1. **Open Create Virtual Machine**  
   Click **Create Virtual Machine** in the Cloudmin menu. The form is based on Virtualmin's Create Virtual Server page: the first section is open and the rest start collapsed.

2. **Enter the details**  
   Give the virtual machine a name. Names do not need to be domain names or have DNS records. The guest hostname defaults to the name; tick the checkbox below the name to set a separate hostname. Choose a **template** and a **plan**. The built-in Default Template selects Rocky Linux 10 for the host architecture, and Default Plan gives 2 CPUs, 2 GiB of memory and a 20 GiB disk (1 CPU on a one-CPU host).

3. **Set the login**  
   Supply the initial password or SSH public keys required by the selected login method. Cloud images configure the account through cloud-init. By default Cloudmin also creates a separate host-managed SSH key for the browser terminal; Module Configuration controls this.

4. **Review the summary**  
   A summary below the selectors shows the image, any download still needed, CPU, memory, disk size, network, addressing mode and software. It updates when you change a preset or edit a field.

5. **Adjust sections if needed**  
   **Image and storage**, **Resources**, **Access**, **Software**, **Network** and **Boot options** hold the editable template and plan settings. Change the image, pool, network, addressing (DHCP or static IPv4 and IPv6, including a /32 address with an on-link gateway), guest packages and scripts, firmware or autostart here. Manual changes keep the selected preset.

6. **Click Create Virtual Machine**  
   Creation returns a job immediately and shows its progress. If the catalogue image has not been downloaded yet, the job downloads and verifies it first and caches it for later use. Cloudmin chooses the machine type, UEFI or BIOS, and the disk bus from the host and image settings, and gives the guest its own writable disk so the source image stays reusable.

7. **Open the guest**  
   When the job completes, the virtual machine page shows live power state, guest agent status, SSH reachability, addresses and resource usage. Use **Remote Access** for the SSH terminal, serial console or graphical console. The serial console shows boot output; the graphical console works even before the guest has a network.

### If creation fails

The job removes the resources it created and reports any cleanup that still needs attention, so you can retry. Guest setup failures, such as a failed script or installer, keep the virtual machine and point at the log inside the guest.

### Installer ISOs

To install an operating system from an ISO instead of a cloud image, choose **Installer ISO** as the source. Cloudmin creates an empty system disk and attaches the ISO in a read-only CD/DVD drive. Complete the installation through the graphical console, then eject the ISO or set the system disk as the first boot device. See [Installer ISOs](/docs/virtual-machines/installer-iso/).

### Virtualmin guests

Choose a Virtualmin GPL or Pro template to install a complete hosting stack inside the new guest. Virtualmin requires a fully qualified hostname, a fresh supported cloud image, at least 2048 MiB of memory for a full installation (1024 MiB for minimal) and 20 GiB of disk. See [Virtualmin templates](/docs/virtual-machines/virtualmin-templates/).

### From the command line or API

The same creation runs through `api.pl` on the host or the HTTP API with a signed token. See [Virtual machine API](/docs/development/virtual-machine-api/).
