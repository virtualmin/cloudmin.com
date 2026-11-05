---
title: "SSH Keys"
date: 2026-11-04
author: "Ilia Ross"
weight: 2415000
edition: "pro"
---

Cloudmin Pro provides a saved SSH key library and manages authorized keys on existing guest accounts. Both features are available through the web interface, CLI and API and require host administrator access.

GPL still accepts public keys during virtual machine creation and in templates. Its [SSH terminal and host-managed login keys](/docs/remote-access/ssh-terminal/) also remain available.

### Save and reuse keys

Open **System Settings → SSH Keys → Add SSH Key**. Give the key a name, then generate an Ed25519 or RSA pair, import a public key, or import an unencrypted private key. Public imports take one OpenSSH key without `authorized_keys` options.

Only generated private keys are saved for download. A private-key import saves only its public key. To replace key material, add a new entry; editing an existing entry changes its name or automatic setting.

Use **Add saved key** below the public key field when creating, cloning or editing a template. It copies the public key into the field. Deleting a library entry leaves keys on existing virtual machines and in templates unchanged.

### Automatic keys

Enable **Install on new virtual machines** for up to five saved keys. They are added to new virtual machines created from cloud images and to prepared clones. They appear with an **Automatic** badge in the dropdown and cannot be selected again. Password login stays enabled when selected.

Automatic keys do not change existing virtual machines. ISO installations and unchanged clones do not receive new keys.

### Manage a guest account's keys

Open **Edit Virtual Machine → Access → SSH Keys**, choose an existing account and click **Show Keys**. The virtual machine must be running, and its QEMU Guest Agent must support SSH key commands. An account created with only a password can receive keys later.

Add a saved key or paste public keys, one per line without `authorized_keys` options. Removing a key deletes the selected entry; other entries and open sessions stay unchanged. Cloudmin's managed login key is protected from removal here. These operations do not enable SSH key login or change the account's password; the account and SSH server must already allow key login.

After first boot, the agent may respond before guest setup finishes. If access is denied just after creation, wait and click **Show Keys** again. If it remains denied, check the account and file permissions. On SELinux guests that provide `virt_qemu_ga_manage_ssh`, the agent needs that setting enabled. Cloudmin enables it during cloud-image and prepared-clone setup; to enable it manually, run this as root inside the guest:

```sh
setsebool -P virt_qemu_ga_manage_ssh on
```

### Command line

Run `cloudmin` as root on the host. These commands require Pro:

| Command | Purpose |
| --- | --- |
| [list-ssh-keys](/docs/development/api-programs/list-ssh-keys/) | List saved public keys and their IDs |
| [create-ssh-key](/docs/development/api-programs/create-ssh-key/) | Generate or import a key |
| [modify-ssh-key](/docs/development/api-programs/modify-ssh-key/) | Change a name or automatic setting |
| [download-ssh-key](/docs/development/api-programs/download-ssh-key/) | Download a generated private key |
| [delete-ssh-key](/docs/development/api-programs/delete-ssh-key/) | Delete a library entry |
| [list-system-keys](/docs/development/api-programs/list-system-keys/) | List an existing guest account's keys |
| [add-system-key](/docs/development/api-programs/add-system-key/) | Add a saved key or public key text to an account |
| [remove-system-key](/docs/development/api-programs/remove-system-key/) | Remove a guest key entry |

For example, import a public key and add it to an existing account. Replace `KEY_ID` with the ID returned by the library:

```sh
cloudmin create-ssh-key --name Administrators --source public --key-file admin.pub
cloudmin list-ssh-keys --json
cloudmin add-system-key --name guest.example.com --user admin --key KEY_ID
```

For creation or prepared clones, use `--saved-key KEY_ID`, repeating it for more keys. Automatic keys are included without that option. See [create-system](/docs/development/api-programs/create-system/) and [clone-system](/docs/development/api-programs/clone-system/).

### GPL behavior

GPL help still lists the SSH key management commands, marked `(Pro)`. Running them returns `SSH key management requires Cloudmin Pro`. The commands are blocked, not hidden. The web setting that hides Pro previews does not change CLI help or permissions.

Use `--ssh-key` or `--ssh-keys-file` to supply public keys during creation in GPL. Selecting a library key with `--saved-key` requires Pro. The [JSON API](/docs/development/virtual-machine-api/#ssh-keys-pro) enforces the same edition and permission checks.
