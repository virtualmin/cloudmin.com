---
title: "What Is Virtualization"
date: 2024-12-03
author: "Ilia Ross"
weight: 6502010
---

Virtualization in Cloudmin refers to running virtual systems that behave like physical computers but are emulated on a real machine. These systems are often called “virtual machines” or “VPS.” 

{{< alert warning exclamation "" "Starting with Cloudmin 10, only KVM and Xen virtualization types are supported. This change allows the development team to focus on enhancing these platforms, as maintaining multiple virtualization types has become unsustainable." >}}

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

Virtualization technologies vary in how they handle isolation, resource allocation, and kernel usage, which impacts performance and flexibility.

   - **Pros**: High isolation, flexibility with disk and file systems, and the ability to use different kernels.  
   - **Cons**: Higher RAM and CPU usage per system. Unused resources in one system remain unavailable to others.  

### Which virtualization type to use

- **KVM**: Ideal for systems requiring full virtualization and a standard Linux kernel. While resource-intensive, it supports modern hardware features and offers a robust solution for most use cases.  

- **Xen**: Ideal for environments that prioritize efficiency and lower overhead, especially when the guest OS can be optimized for paravirtualization. Xen also supports full virtualization when required, making it flexible for diverse workloads.  
