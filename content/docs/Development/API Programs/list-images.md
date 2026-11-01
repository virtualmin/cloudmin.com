---
title: "list-images"
subSection: "Host and images"
date: 2026-10-30
weight: 2845010
---

### Lists imported and catalogue images

```text
cloudmin list-images [--multiline | --json]
                     [--name-only | --id-only]
```


Lists ready imported images and available catalogue images that can be selected for machine creation. The default table shows ID, name and format. `--multiline` or `--json` includes the available image metadata and compatibility information.

Imported images use their stored image ID. Catalogue entries use `catalogue:IMAGE_ID`; `create-system` downloads or reuses the selected catalogue image as part of creation. An unambiguous display name is also accepted by image-selection options, but use the ID when names are duplicated.

`--name-only` prints display names and `--id-only` prints selectable IDs. Catalogue entries can appear before their images are downloaded. Additional disks created with `create-disk --image` need a ready imported image, while `create-system` can use either source.

```sh
cloudmin list-images --multiline
cloudmin list-images --id-only
cloudmin list-images --json
```
