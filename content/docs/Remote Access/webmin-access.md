---
title: "Webmin Access"
date: 2026-10-28
author: "Ilia Ross"
weight: 2430000
---

The **Webmin** tab in Remote Access opens a Virtualmin guest's Webmin from the host, either directly in a new tab or embedded through the host's Webmin Servers Index proxy. The embedded view works for guests on private NAT networks that your browser cannot reach.

### Who can use it

Only the host's `root` Webmin login can register guests or use the Webmin tab, and Servers Index permissions apply on top, including read-only restrictions. Other users with creation permission can create virtual machines, but registration is skipped and their Remote Access page has no Webmin tab.

### Connection choices

By default the tab shows a trust warning and two choices:

- **Open directly in new tab** opens the guest's own HTTPS address. Sign in with a guest Webmin account. Private addresses may be unreachable from your browser. Direct access uses neither the host proxy nor its saved login.
- **Open embedded Webmin** uses the host's Servers Index proxy and signs in with the saved guest login. The embedded view replaces the choices, supports fullscreen, and follows the host's light or dark palette and navigation color without changing the guest's saved theme preferences. Clicking the Webmin tab again returns to the choices.

To open registered guests in the embedded view immediately, set **Show Webmin connection choices and a trust warning?** to **No** in Module Configuration. Use it only when every registered virtual machine is fully trusted; changed IP addresses still require confirmation.

### Trust warning

Use the proxy only for fully trusted guests. The proxied pages share the host's browser origin and your host session, so a compromised guest can use its Webmin pages to compromise the host and other virtual machines. Opening the proxy in another tab does not isolate it either.

### Registration

Virtualmin templates enable **Add to host's Webmin Servers Index** by default; turn it off in the template's Software section to skip registration. After Virtualmin installation, Cloudmin saves the initial guest username and password in the host's protected Servers Index configuration. The setup job deletes its copy of the password when setup ends, and Cloudmin excludes its changes to these login files from Webmin's file-change and undo logs. Registration needs no extra guest account or SSH connection.

If no password was saved, for example when the guest was created with SSH keys only, Servers Index asks for the guest login and remembers it for the browser session. If the guest password changes later, update the saved login in the host's Webmin Servers Index module.

If registration fails, the virtual machine remains usable and the progress page shows a warning. Choose **Open embedded Webmin** to retry after setup finishes; the same button registers an older or unregistered Virtualmin guest.

### Address changes

When the guest's saved IP changes, an orange alert shows the old and new addresses and whether the new one matches the host's static configuration for the guest or a DHCP lease for its MAC address. Addresses reported only by the guest agent or ARP are marked unverified. Confirm the address before opening the proxy; the saved entry is not changed until you do.

Cloudmin removes its Servers Index entry when it deletes the virtual machine.
