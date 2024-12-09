---
title: "LVM in KVM"
date: 2024-12-09
author: "Ilia Ross"
weight: 6502012
---

### Why use LVM?

Cloudmin supports storing KVM disk images in LVM logical volumes instead of regular files. This offers better performance by avoiding the overhead of the filesystem layer and can simplify expanding virtual disk capacity. However, it also adds complexity, as managing disk images in logical volumes is not as straightforward as working with regular files.

### Host system requirements

For a KVM host system to use LVM, it must either have its filesystems already set up on LVM during installation or have unused disks available to create an LVM volume group. If a volume group already exists, it must have free space available for new logical volumes.

For increased reliability, consider running LVM on top of RAID. For example, four disks could form a Linux software RAID 5 array, which then serves as the physical volume (PV) for an LVM volume group. If you need more space later, simply add another RAID set as a new PV to the volume group.

### Setting up LVM on the host

Before configuring LVM, install Webmin on your KVM host system if it’s not already there. From your Cloudmin master, you can select the host and navigate to "System Operations ⇾ Install Webmin".

Once Webmin is installed on the host, you can use its LVM and RAID modules under the "Hardware" category to set up your volume group.

#### Example scenario

1.	In Webmin on the host, go to "Hardware ⇾ Partitions on Local Disks" page.
2.	Select the first new disk. If partitions exist, remove them. Create a new primary partition that spans the entire disk and select "Linux LVM" as the partition type.
3.	Repeat the above step for the second (and any additional) disk.
4.	Go to "Hardware ⇾ Logical Volume Management" page.
    * If a VG already exists, click "Physical volumes" tab, then "Add a physical volume", and add the disk you just configured.
    * If no VG exists, click "Add a new volume group"; enter a name like "kvmvg" and select your first new disk.
   
    Click "Create", then add any additional disks to this VG.

### Configuring Cloudmin to use LVM
1. In Cloudmin, go to "Host Systems ⇾ KVM Host Systems" page, and select your host.
2. From the "LVM volume group for disk images" dropdown, select the new volume group created above.
3. Click "Save" button.

Create a test KVM instance on this host and verify that it works correctly. After provisioning, go to "Resources ⇾ Manage Disks" and confirm that the virtual disk is stored in a logical volume. This confirms that your LVM setup is complete and ready for production use with KVM.
