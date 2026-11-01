---
title: "SSH Terminal"
date: 2026-10-28
author: "Ilia Ross"
weight: 2410000
---

Open **Remote Access → SSH terminal** on a running virtual machine to connect from your browser using its host-managed key or a guest password. The terminal requires Webmin's Terminal module, `Net::WebSocket::Server`, OpenSSH, Python 3 and systemd with `systemd-run`.

### Connecting

The connection form offers the guest's current IP addresses, the SSH port, the username and the authentication method. The default username comes from the virtual machine's creation settings when available, and the **SSH service** card shows whether SSH answers on the saved port before you connect. Choose the host SSH key created for this virtual machine or password login; passwords are typed into the terminal and are never saved or logged by Cloudmin.

On first use, the terminal asks you to confirm the guest's SSH host key. Cloudmin remembers it for your Webmin account and that virtual machine, and blocks the connection if it changes.

### Saved ports and automatic connection

SSH defaults to port 22. After a successful login, Cloudmin saves that virtual machine's port as the default for all Webmin users and for status checks. If the guest's SSH port changes, enter the new port and log in once to save it. Failed logins leave the saved port unchanged.

Turn on **Connect automatically when opening the SSH tab?** in Module Configuration to skip the form. It is off by default. Each Webmin user has separate saved login settings for each virtual machine; automatic connection uses the saved port, username and authentication method, or the form defaults on first use. You still enter passwords and confirm host keys in the terminal. Failed or unfinished attempts return to the form and pause automatic connection until a login succeeds. **Connection settings** above the terminal opens the form at any time.

### Host-managed keys

By default, new virtual machines receive a separate host login key, added to the initial guest account through cloud-init. Module Configuration controls key creation and the terminal's default authentication method; existing virtual machines are unchanged. Private keys stay in `vm-ssh-keys` under Cloudmin's private module data directory with mode 0600, the terminal receives only its selected virtual machine's key through systemd credentials, and the key is removed on creation rollback or when Cloudmin deletes the guest through its libvirt adapter. Deleting a guest with external tools does not run this cleanup; remove its saved key separately. These preferences do not add fields to the creation form.

### How it runs

The browser relay and the SSH client run without root on the host, inside a systemd unit with a temporary user, no capabilities and no access to Webmin's credential files. A root supervisor authorizes each connection, rechecks the session's terminal permission every five seconds and stops the SSH process when you leave the page or the permission is revoked. Read-only Webmin accounts cannot open terminals.

### Remembered tabs

Remote Access reopens your last selected tab, including when you open another virtual machine, with a separate choice for each Webmin user. **Remember the last remote connection tab?** is on by default in Module Configuration; links to a specific tab always override it, and an unavailable tab falls back to an allowed one.
