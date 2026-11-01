---
title: "get-host"
date: 2026-10-30
weight: 2845030
---

### Shows host capabilities

```text
cloudmin get-host [--multiline | --json]
```


Shows host capabilities reported by Cloudmin, including relevant virtualization and image-handling support. Use this to check the host side of a creation or management requirement before choosing guest settings.

`--multiline` expands the capability fields, and `--json` returns structured data for scripts.

Use `list-pools`, `list-networks` and `list-images` for selectable resources. `cloudmin api options` returns the complete raw options response, including templates and plans, when a script needs those choices.

```sh
cloudmin get-host --multiline
cloudmin get-host --json
```
