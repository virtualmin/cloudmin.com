---
title: "Virtual Networks and Bridges"
date: 2026-10-28
author: "Ilia Ross"
weight: 2510000
---

Open **Networking** to see libvirt networks, host bridges, their addressing and the virtual machines attached to each. Cloudmin uses libvirt to manage virtual networks and guest interfaces, and Webmin's network backends to create host bridges.

### Virtual networks

The installer creates a persistent default NAT network after checking host routes, without changing the host's management interface. On the Networking page you can create more NAT, routed and isolated networks. Networks referenced by stopped or running guests are protected from deletion.

Virtual machine creation offers active libvirt networks and existing host bridges. It checks for duplicate MACs, duplicate managed addresses and missing networks before allocating resources. Cloud-init configures DHCP or static IPv4 and IPv6 inside the guest, including on-link gateway routes and /32 addresses, so guests on bridged or routed networks with provider-assigned addresses need no hand-editing after creation.

### Host bridges

A bridge lets guests join the upstream network and receive addresses from it. Each guest still needs a usable address from that network, and public access also depends on the upstream router, provider and firewall; creating a bridge does not allocate public IP addresses or configure the guest OS.

Guided bridge creation supports NetworkManager, Netplan and Debian ifupdown (which needs `bridge-utils`). Cloudmin reviews the selected standalone Ethernet interface, moves its saved addressing, routes and DNS to the new bridge, backs up the affected files and starts an independent systemd recovery timer before applying the change. You must confirm that the connection still works within the timeout, three minutes by default and two to fifteen minutes in Module Configuration. Unconfirmed changes are restored after the timeout, and also before networking starts after a reboot. Other host and virtual machine changes wait while a confirmation is pending. The timeout includes time spent applying the change. Changing it does not extend a pending transaction or disable recovery, including after a reboot.

For ifupdown, the interface must have an `inet` stanza, which may use `manual` on an IPv6-only host. If cloud-init regenerates the host's Netplan files at boot, update its network configuration or disable its network rendering before converting the interface; otherwise it can restore the old port addresses after confirmation. Cloudmin does not change cloud-init's host configuration. Unsupported custom interface configurations stay under Webmin's Network Configuration module, and you should avoid editing the same host configuration elsewhere while a bridge change awaits confirmation.

Use **Remove Bridge** on an unused, persistent host bridge with one Ethernet port to move its current addresses, routes and DNS back to that port. Removal uses the same confirmation timer as creation; without confirmation, Cloudmin restores the bridge. First detach virtual machines, including stopped ones, from the bridge and its port, and update virtual networks that use either device. Multiple ports, dependent VLANs or macvlans, and unsupported custom settings require Webmin Network Configuration. Removal is also available through the [CLI](/docs/development/api-programs/remove-bridge/) and [API](/docs/development/virtual-machine-api/).

On Netplan hosts, Cloudmin keeps the DHCP client identity and requests the current IPv4 lease when moving settings between Ethernet and a bridge. During recovery, it requests the original address if restoring the files gives it a different lease. The DHCP server can still assign another address; use a DHCP reservation or static address to keep the host address stable.

### Guest interfaces

Offline management can add, change and remove NICs on a stopped virtual machine, attaching them to any network or bridge. The networking page and the details page show each interface's MAC, source and discovered addresses.

### Planned

- VLAN tags on guest interfaces for tenant isolation {{< planned >}}
- Anti-spoofing through libvirt network filters {{< planned >}}
