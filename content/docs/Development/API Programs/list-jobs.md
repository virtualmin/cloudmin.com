---
title: "list-jobs"
subSection: "Jobs"
date: 2026-10-30
weight: 2846010
---

### Lists recent and unfinished jobs

```text
cloudmin list-jobs [--multiline | --json]
                   [--name-only | --id-only]
```


Lists recent and unfinished jobs recorded by Cloudmin. Jobs include creation, software setup, hardware changes, cloning, snapshots, image capture and backup operations. The default table shows ID, name, operation, state and phase.

Use `--multiline` for details, or `--json` for scripts. Results exclude private requests, credentials and recovery backups. `--id-only` prints job IDs for later `get-job`, `cancel-job` or `recover-job` calls. `--name-only` prints job names, which need not be unique.

An unfinished job can reserve a machine or storage resource and block another change. Check its phase, error and cleanup status before resubmitting an operation. Leaving a terminal or timing out while waiting does not cancel a worker.

```sh
cloudmin list-jobs
cloudmin list-jobs --multiline
cloudmin list-jobs --id-only
```
