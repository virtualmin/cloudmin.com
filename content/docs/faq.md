---
title: "FAQ"
date: 2026-10-28
author: "Ilia Ross"
weight: 800000
---
## FAQ
### General

> ##### What is Cloudmin 10?

A rewrite of Cloudmin around libvirt, the standard Linux API for managing virtual machines. It manages QEMU/KVM guests on a Linux host from inside Webmin, and adds images, templates, jobs, permissions, consoles, snapshots, clones and backups on top of libvirt. See [What is Cloudmin 10](/docs/getting-started/what-is-cloudmin-10/).

> ##### Is Cloudmin 10 released?

Not yet. It is in development, and the installer uses the `unstable` channel. The [feature status](/docs/roadmap/) page lists what is implemented and what is still planned.

> ##### What happened to Xen, OpenVZ, Docker and the cloud providers?

Cloudmin 10 supports KVM through libvirt first. Xen is planned through libvirt's libxl driver once KVM is stable, and Cloudmin 9 remains available and maintained for Xen users until then. OpenVZ, LXC, VServer, Zones, Docker, Podman, Citrix, EC2, GCE and the other provider screens are not carried forward. Containers can run inside Cloudmin virtual machines; the rest belongs to other products.

> ##### Can I upgrade a Cloudmin 9 host to Cloudmin 10?

Not by a package upgrade, on purpose. Existing KVM installations will be imported by an explicit tool with a report for each virtual machine, cutover and rollback. That tool is [planned](/docs/backup-and-migration/migrating-from-cloudmin-9/) and not available yet. Install Cloudmin 10 on a fresh host.

> ##### How do GPL and Pro differ?

Cloudmin GPL manages one host with an unlimited number of virtual machines. Cloudmin Pro adds custom guest setup scripts, Google Cloud Storage, Azure, Backblaze B2, Dropbox and Google Drive backup destinations and image capture today. Managing multiple hosts from one place is planned for Cloudmin Connect GPL and Pro, separate fleet products. See [Professional Features](/docs/professional-features/).

> ##### Does Cloudmin replace virsh or virt-manager?

No. Libvirt stores the virtual hardware, network and storage configuration, so standard tools keep working on the same machines. Cloudmin adds ownership, jobs, images and consoles around it. Changes made outside Cloudmin are picked up from libvirt; Cloudmin's own records such as managed SSH keys are only cleaned up when a virtual machine is deleted through Cloudmin.

### Installation

> ##### Which hosts are supported?

Rocky Linux 10, AlmaLinux 10, Debian 13 and Ubuntu 26.04, on x86-64 or ARM64 with KVM available. See [OS Support](/docs/os-support/).

> ##### Should I install libvirt, QEMU or Webmin first?

No. Run the installer on a freshly installed supported OS. It installs the distribution's hypervisor packages, Webmin and Cloudmin, and configures them through Cloudmin-Config.

> ##### Can I install inside a virtual machine?

Yes, when nested virtualization is enabled and `/dev/kvm` works in the guest. The installer boots a small isolated KVM appliance before reporting success, so a host without working KVM fails early with a clear message.

> ##### Does the installer change my network?

It creates a persistent NAT network for guests and does not touch the host's management interface. Bridging a physical interface is a separate, confirmed step on the Networking page with automatic rollback. See [Virtual networks and bridges](/docs/networking/virtual-networks-and-bridges/).

### Virtual machines

> ##### Which images can I use?

Catalogue cloud images for AlmaLinux, Alpine, Arch, CentOS Stream, Debian, Fedora, openSUSE, Rocky Linux and Ubuntu, your own QCOW2 or raw disk images from a URL, an upload or a host file, and installer ISOs. See [Image Manager](/docs/images/image-manager/).

> ##### Do virtual machine names need to be fully qualified domain names?

No. Names do not need DNS records. Templates can require a fully qualified guest hostname, and the Virtualmin templates always do, because Virtualmin needs one.

> ##### How does Cloudmin set the guest password and network?

Cloud images are configured through cloud-init with the account, password or SSH keys, and DHCP or static addressing you choose. Cloudmin does not mount and rewrite guest filesystems during normal creation. Installer ISOs are set up through the graphical console instead.

> ##### Can I install Virtualmin inside a guest automatically?

Yes. Choose a Virtualmin GPL or Pro template. See [Virtualmin templates](/docs/virtual-machines/virtualmin-templates/).

> ##### What happens if creation fails halfway?

Creation is a durable job. On failure it removes the resources it created and reports any cleanup that still needs attention, so it can be retried. Interrupted jobs are recovered when a host administrator next opens Cloudmin.

### Access and security

> ##### Can I give a user access to one virtual machine only?

Yes. Set **Host administrator?** to **No** for that Webmin user and assign the guests they may see, with separate grants for power controls, forced power controls, consoles, SSH terminals and password resets. See [How to delegate access](/docs/getting-started/how-to-delegate-access/).

> ##### What runs as root?

Webmin, Cloudmin's page handlers, the CLI, the status collector and the controller jobs run as root and make the libvirt changes. Downloads, host-file reads, checksum checks, disk inspection, SSH key validation, cloud-init seed generation, consoles and terminal relays run without root in systemd-managed workers. See [Privilege separation](/docs/development/privilege-separation/).

> ##### Where do I report a security issue?

Use the `security@` address at `virtualmin.com` rather than the public forum or issue tracker.
