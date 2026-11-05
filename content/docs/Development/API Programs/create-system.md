---
title: "create-system"
date: 2026-10-30
weight: 2841130
---

### Creates a virtual machine from a cloud image or installer ISO

```text
cloudmin create-system [--multiline | --json]
                       [--no-wait]
                       [--address-mode dhcp|static]
                       [--after-script-file file|-]
                       [--after-script-mode none|file|inline]
                       [--after-script-path value]
                       [--auth-type keys|password|both]
                       [--autostart | --no-autostart]
                       [--before-script-file file|-]
                       [--before-script-mode none|file|inline]
                       [--before-script-path value]
                       [--cpus number]
                       [--desc value]
                       [--disk size]
                       [--dns value]
                       [--firmware auto|efi|bios]
                       [--gateway4 value]
                       [--gateway6 value]
                       [--host-ssh-key | --no-host-ssh-key]
                       [--hostname value]
                       [--image ID|name]
                       [--install-source cloud|iso]
                       [--ipv4 value]
                       [--ipv6 value]
                       [--license-file file|-]
                       [--license-serial-file file|-]
                       [--mac value]
                       [--memory size]
                       --name value
                       [--network ID|name]
                       [--packages value]
                       [--password-file file|-]
                       [--plan ID|name]
                       [--pool ID|name]
                       [--require-fqdn | --no-require-fqdn]
                       [--review]
                       [--saved-key value]*
                       [--software none|virtualmin-gpl|virtualmin-pro]
                       [--ssh-key value]*
                       [--ssh-keys-file file|-]
                       [--start | --no-start]
                       [--template ID|name]
                       [--username value]
                       [--virtualmin-bundle LAMP|LEMP]
                       [--virtualmin-postgres | --no-virtualmin-postgres]
                       [--virtualmin-ssl | --no-virtualmin-ssl]
                       [--virtualmin-type full|mini]
                       [--webmin-register | --no-webmin-register]
```


Creates a new virtual machine named by `--name`. This name must be unused on the host. The operation runs as a background job; by default the command waits for creation and any selected software setup to finish. `--no-wait` returns the job ID instead.

On Pro hosts, use `--saved-key KEY_ID` to select a library key; repeat it for more keys. Keys marked automatic are also added to virtual machines created from cloud images. ISO installs reject `--saved-key` and skip automatic keys.


- Image, storage and resources

Use `list-images`, `list-pools` and `list-networks` to find available choices. Image, pool, template and plan options accept an ID or an unambiguous name. A catalogue image uses an ID such as `catalogue:IMAGE_ID`; Cloudmin downloads or reuses it as needed. `--pool` selects the destination for the new disk, not the image's existing location.

`--template` supplies creation defaults and `--plan` supplies resource defaults. They are used only when explicitly selected. Command-line fields override their defaults, except that a template's required fully qualified hostname cannot be disabled. If you omit a required setting without a preset that supplies it, validation reports the missing value.

`--cpus` sets the CPU count. Bare `--memory` values are MiB, and bare `--disk` values are GiB; `2G` and `20G` are also accepted. `--disk` sets the total disk capacity and cannot be smaller than the image requires.

- Guest access and networking

For a cloud image, `--username` names the initial administrator. `--auth-type keys` requires SSH public keys, supplied with repeatable `--ssh-key` options or `--ssh-keys-file`. Use `--auth-type password` with `--password-file`, or `both` with both password and keys. A password filename of `-` reads standard input. Do not pass a password as a command argument.

`--hostname` defaults to the new machine's name. Use a fully qualified hostname when installing Virtualmin. `--network` selects a virtual network or `bridge:NAME`; it does not create that network. `--address-mode dhcp` uses automatic addressing. For `static`, supply addresses with prefixes, gateways where needed and `--dns` as a quoted list of server addresses. These settings configure the new guest through cloud-init.

- Power and firmware

The new machine starts by default, including when a template is selected. Use `--no-start` to leave it stopped. `--autostart` and `--no-autostart` control startup when the host boots. `--firmware auto`, `efi` or `bios` must be compatible with the selected image and host.

For an installer ISO, use `--install-source iso` and select an ISO image. Cloudmin creates an empty disk and attaches the installer. Complete operating system installation through the console; cloud-image account setup and automatic software installation do not apply to this mode.

- Software and scripts

`--packages` accepts a quoted, space-separated package list. `--software virtualmin-gpl` or `virtualmin-pro` installs Virtualmin after initial cloud-init setup. `--virtualmin-bundle LAMP` selects Apache, and `LEMP` selects Nginx; `--virtualmin-type full` or `mini` chooses the installation size. Virtualmin Pro also requires `--license-serial-file` and `--license-file` for its own license credentials.

When **Enable Virtualmin installation?** is disabled in Module Configuration, both review and creation reject requests to install Virtualmin. Templates that select Virtualmin directly or inherit it from Default Template are also blocked, even if the command overrides `--software`. Re-enable the setting to use them.

This setting does not affect package installation or setup scripts. Jobs submitted before it changed keep their settings.

Preparation and final setup scripts require Cloudmin Pro. `--before-script-file` or `--after-script-file` reads script contents; the corresponding `--before-script-path` or `--after-script-path` selects a file on the Cloudmin host. The scripts execute inside the guest as root, before package installation or after successful setup. Explicit script mode `none` clears an inherited script. Selecting guest software or scripts requires starting the guest.

- Review and results

`--review` validates the request and shows its resolved settings without creating a virtual machine. Omit that flag to submit the same settings for creation. A successful review does not reserve the name or resources against later changes.

`--json` returns the final job record, or the initial record with `--no-wait`. If the command loses its connection or times out while waiting, check `list-jobs` and `get-job` before submitting another creation. A software setup failure can leave the created machine available for inspection.


```sh
cloudmin create-system --name guest.example.com --template \
    "Default Template" --plan "Default Plan" --auth-type keys \
    --ssh-keys-file /root/guest-public-keys --review
cloudmin create-system --name guest.example.com --template \
    "Default Template" --plan "Default Plan" --auth-type keys \
    --ssh-keys-file /root/guest-public-keys
cloudmin create-system --name installer.example.com --install-source iso \
    --image INSTALLER_IMAGE_ID --pool default --network default --cpus 2 \
    --memory 2G --disk 20G
```

Options:

- `--address-mode dhcp|static`: Guest address configuration.
- `--after-script-file file|-`: Read guest script contents from a file.
- `--after-script-mode none|file|inline`: Guest script source (Cloudmin Pro).
- `--after-script-path value`: Guest script file on the Cloudmin host.
- `--auth-type keys|password|both`: Initial login authentication.
- `--autostart | --no-autostart`: Start when the host boots.
- `--before-script-file file|-`: Read guest script contents from a file.
- `--before-script-mode none|file|inline`: Guest script source (Cloudmin Pro).
- `--before-script-path value`: Guest script file on the Cloudmin host.
- `--cpus number`: Number of CPUs.
- `--desc value`: Description.
- `--disk size`: Total disk capacity; bare values use GiB.
- `--dns value`: Space- or comma-separated DNS servers.
- `--firmware auto|efi|bios`: Guest firmware.
- `--gateway4 value`: IPv4 gateway.
- `--gateway6 value`: IPv6 gateway.
- `--host-ssh-key | --no-host-ssh-key`: Create a managed host SSH key for the guest.
- `--hostname value`: Guest hostname; defaults to its name.
- `--image ID|name`: Imported or catalogue image ID or name.
- `--install-source cloud|iso`: Cloud image or installer ISO.
- `--ipv4 value`: Static IPv4 address with prefix.
- `--ipv6 value`: Static IPv6 address with prefix.
- `--license-file file|-`: Virtualmin Pro license key file, or - for stdin.
- `--license-serial-file file|-`: Virtualmin Pro serial file, or - for stdin.
- `--mac value`: Guest MAC address; omitted generates one.
- `--memory size`: Memory allocation; bare values use MiB.
- `--name value`: New virtual machine name.
- `--network ID|name`: Network key, UUID or name, or bridge:name.
- `--packages value`: Space-separated guest packages.
- `--password-file file|-`: Password file, or - for stdin.
- `--plan ID|name`: Plan ID or name.
- `--pool ID|name`: Destination storage pool ID or name.
- `--require-fqdn | --no-require-fqdn`: Require a fully qualified hostname.
- `--review`: Validate without creating.
- `--saved-key value`: Saved SSH key ID (Pro); repeat for more keys.
- `--software none|virtualmin-gpl|virtualmin-pro`: Software to install.
- `--ssh-key value`: SSH public key; repeat for more keys.
- `--ssh-keys-file file|-`: File containing SSH public keys.
- `--start | --no-start`: Start after creation.
- `--template ID|name`: Template ID or name.
- `--username value`: Initial guest administrator account.
- `--virtualmin-bundle LAMP|LEMP`: Apache or Nginx stack.
- `--virtualmin-postgres | --no-virtualmin-postgres`: Install PostgreSQL.
- `--virtualmin-ssl | --no-virtualmin-ssl`: Request a hostname certificate.
- `--virtualmin-type full|mini`: Virtualmin installation size.
- `--webmin-register | --no-webmin-register`: Register the guest in the host Servers Index.
