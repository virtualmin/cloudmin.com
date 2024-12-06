---
title: "What Is Virtualization"
date: 2024-12-03
author: "Ilia Ross"
weight: 6502010
---

Virtualization in Cloudmin refers to running virtual systems that behave like physical computers but are emulated on a real machine. These systems are often called “virtual machines” or “VPS.” 

{{< alert primary exclamation "" "Starting with Cloudmin 10, only the KVM virtualization type is supported. Existing installations using Xen and other types will continue to function, but new installations will exclusively use KVM." >}}

### Why use virtualization

Virtualization provides several benefits:
1. **Resource efficiency**

    Multiple virtual systems can run on a single physical machine, each allocated specific memory, CPU, and disk space. This reduces hardware costs and improves resource utilization.

2. **Isolation and control**

    Each virtual system operates independently, ensuring security and stability. Users have full *root* access, making it suitable for hosting services like websites, databases, or email.

3. **Flexibility and migration**

    Virtual systems can be moved between physical hosts without downtime or reconfiguration. This is invaluable for maintenance or handling hardware failures.

4. **Cost savings**

    Since many applications don’t require the full capacity of physical systems, virtualization optimizes the use of resources.

### Virtualization types

In previous versions, Cloudmin supported multiple virtualization technologies like Xen and some other. However, starting with Cloudmin 10, the focus has shifted entirely to KVM due to its integration into the Linux kernel, robust performance, and broad industry support.

**KVM**:
- **Pros**: High isolation, flexibility with disk and file systems, and the ability to use a standard Linux kernel. Widely supported and well-integrated with modern hardware virtualization extensions.
- **Cons**: Slightly higher resource overhead compared to container-based solutions.

### Hardware and configuration requirements

- **CPU virtualization support**: Ensure your system’s BIOS/UEFI settings enable Intel VT-x or AMD-V extensions.
- **Sufficient resources**: Have enough RAM, disk space, and ideally set up LVM for efficient virtual disk management.
- **Bridged networking**: A network bridge is typically required so virtual machines can share and manage host networking resources.

### Getting started with KVM

For detailed steps on setting up KVM hosts, configuring bridging, and managing virtual machines, refer to the [KVM Virtualization](/docs/virtualization/kvm/).