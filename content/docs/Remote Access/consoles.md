---
title: "Serial and Graphical Consoles"
date: 2026-10-28
author: "Ilia Ross"
weight: 2420000
---

The serial and graphical consoles reach a local virtual machine without a guest network, SSH service or guest agent. Both require the virtual machine's console permission, a local libvirt connection, Webmin's Terminal module, `Net::WebSocket::Server`, Python 3 and systemd with `systemd-run`.

### Graphical console

**Remote Access → Graphical console** shows the guest's screen and lets you use its keyboard and mouse, including during boot and OS installation. It requires a VNC display on the guest. Webmin authenticates the connection and libvirt opens the display directly, so VNC passwords stay on the host and no public VNC port is needed. Use **Fullscreen** for a larger view and the keyboard menu to send shortcuts such as **Ctrl+Alt+Delete** or **Ctrl+Alt+F1**; their effect depends on the guest. Select the tab again after a connection closes.

Click inside the console and use **Command +** and **Command -** on macOS, or **Ctrl +** and **Ctrl -** on Linux, to scale the guest's screen; **Command 0** or **Ctrl 0** restores the fitted view. Scaling keeps the guest's proportions and does not change its resolution. Authentic Theme saves the zoom for your account.

Cloudmin ships the console client, layout and noVNC library, without noVNC's separate application UI. Both consoles work with frame-based and SPA themes.

### Serial console

**Serial console** connects through libvirt to the guest's PTY console or serial port, using the same permissions and non-root WebSocket relay as the graphical console; a root supervisor forwards bytes between the libvirt stream and the relay. New Cloudmin virtual machines have a serial port, but the guest OS must send boot output or a login prompt to it; Cloudmin does not configure that. Log in with a guest account and password; the managed SSH key is not used here.

Only one connection can use the serial port at a time. Close an existing connection before opening another, and leaving the page releases the port. An interrupted connection clears within about a minute, abandoned startup expires after 15 seconds, and both consoles close after 60 seconds without a browser response while protocol pings keep an idle connected session alive.

Zoom in the serial console changes the text size. Resizing the browser does not send new dimensions to the guest; if text wraps incorrectly, run `stty rows 24 cols 80` inside the guest with the dimensions you need.

#### Recorded output

Cloudmin enables libvirt serial logging on supported ports when creating a virtual machine or starting one that is fully stopped; a guest reboot or resume from a managed save does not enable it. Serial connections replay up to 64 KiB of recent output without sending keystrokes, which can show the existing login prompt or a partly typed command. The limited history may not fully restore a full-screen application.

Logs are private to root on the host at `/var/log/libvirt/qemu/cloudmin-<UUID>-serial.log` and contain all serial output, including echoed commands. Native `virtlogd` rotation defaults to 2 MiB per file with three backups, about 8 MiB per virtual machine. Each cold start clears the previous recording, and deleting the virtual machine through Cloudmin removes its logs. Cloudmin preserves custom console logs; its own recording requires `stdio_handler = "logd"`, a positive `max_size` and 1–32 backups.

Guests without managed logging still show live output. If the console is blank, press Enter only when it is safe to submit any pending input.
