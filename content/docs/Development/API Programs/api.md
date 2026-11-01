---
title: "api"
subSection: "Raw API"
date: 2026-10-30
weight: 2850010
---

### Runs the raw JSON API with a request on standard input

```text
cloudmin api [action] < request.json
```


Runs the raw JSON API entry point. Use `cloudmin api ACTION` with a JSON request object on standard input. This is useful for API fields that have no named-command option or for clients that already construct API requests. With no action, it returns `options`.

The raw response is a JSON object with `version` and `result` fields. Named commands use `command`, `status` and `data` instead. Raw errors are written to standard error and exit 1. Do not add named-command output flags such as `--json` or `--multiline`.

`options`, `list`, `backups`, `bridges` and `storage` need no request body. `machines` accepts an optional exact name or UUID selector and otherwise lists the visible inventory. Other actions take a JSON object with their documented fields. The root entry point supplies a form token when omitted, but callers remain responsible for other required fields such as revisions and confirmations.

Raw requests return their initial result without waiting for a job to finish. Use the returned job ID with `get-job` or the raw `status` action. When retrying a job submission, reuse the same request, token and attempt value so the API can return the existing job. A new named command generates a new token and submits a separate request.

Use the virtual machine API reference for action-specific JSON fields. For example, the selector file below can contain `{"id":"guest.example.com"}`, and the status request file can contain `{"job":"JOB_ID"}`. A request file is often easier to review than a long shell-quoted object. Keep files containing passwords or provider credentials private.

```sh
cloudmin api options
cloudmin api machines < /root/machine-selector.json
cloudmin api status < /root/job-request.json
```

