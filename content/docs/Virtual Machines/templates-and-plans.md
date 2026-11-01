---
title: "Templates and Plans"
date: 2026-10-28
author: "Ilia Ross"
weight: 2210000
---

Machine templates and resource plans are the presets behind the creation form. A template saves image, storage, network, guest access, software and boot defaults. A plan saves CPU, memory and system disk size. Both fill the form, where administrators can still change every value for one creation.

### Where to find them

Both pages are under **System Settings** in the Cloudmin menu. The template editor uses a section selector with Previous, Next and Save and Next controls; resource plans use a collapsible Basic plan details section. Both use Webmin's standard form widgets, Webmin configuration files, host access controls, form tokens, locking and audit logging. Reading presets never creates configuration files.

### Built-in presets

Cloudmin ships **Default Template**, four Virtualmin templates (GPL and Pro, each with Apache or Nginx) and **Default Plan**. Default Template selects Rocky Linux 10 for the host architecture. Default Plan supplies 2 CPUs, 2 GiB of memory and a 20 GiB disk; on a one-CPU host it uses 1 CPU. The Virtualmin templates use a full installation by default; minimal installation remains available.

All presets can be edited or copied. Default Template and Default Plan cannot be deleted. Virtualmin and custom templates can be deleted when no existing virtual machine or pending creation uses them; deleted built-in templates stay removed.

### Template sections

- **Basic settings** including the name, description and **Require fully qualified hostname**. Custom templates can require it independently of their name or software; Virtualmin templates always do. The rule applies to cloud images, not ISO installers.
- **Image and storage**: the source image, which can be a catalogue entry not downloaded yet, the installation source and the destination pool.
- **Access**: the initial username, the authentication method (password, SSH keys or both) and SSH keys.
- **Network**: the libvirt network or host bridge, DHCP or static addressing, gateways and DNS.
- **Software**: packages and Virtualmin installation options, including whether to add the guest to the host's Webmin Servers Index. Preparation and final setup scripts require Cloudmin Pro. {{< pro >}}
- **Boot options**: firmware, whether to start after creation and autostart.

Scripts can be disabled, entered directly or read from a host file. Host file access follows Webmin's global file permissions and configured Unix user. Templates store the paths; creation jobs copy the contents before allocating resources, and scripts run only inside the guest.

### Descriptions and names

Supplied descriptions explain the shipped settings. Changing a built-in template's name or settings clears its supplied description; custom descriptions are preserved. Built-in Virtualmin template names update on save to match the edition, web server and PostgreSQL option, with a numeric suffix for duplicates. Manually renamed and copied templates keep their custom names, and Default Template is never renamed automatically.

Template descriptions are hidden on the creation page by default. **Show template description?** in Module Configuration can display nonempty descriptions always, or only when they differ from the template name.

### How presets apply

The creation form always selects a template and a plan; API callers select them explicitly. Editing a preset affects future forms; existing virtual machines and submitted jobs keep their settings. Manual field changes keep the selected preset, and deleting a custom default selects the built-in default again. Module Configuration retains the display, password generation and managed SSH key preferences, which do not add fields to the form.

Templates store settings, not prepared disk images. To create machines from a prepared disk instead, use [cloning](/docs/virtual-machines/cloning/) or, in Cloudmin Pro, [capture an image](/docs/images/creating-images-from-virtual-machines/) and select it in a template.

Custom preparation and final setup scripts require Cloudmin Pro. {{< pro >}} Packages and Virtualmin installation remain available in GPL, including the Virtualmin Pro templates. Virtualmin Pro itself needs a separate guest license.

GPL shows script controls as disabled previews unless Pro advertising is hidden in Module Configuration. Existing saved scripts remain visible and read-only. Clear both scripts explicitly when saving a template to use it without Pro; other edits preserve them, and creation refuses active scripts without the Pro package.
