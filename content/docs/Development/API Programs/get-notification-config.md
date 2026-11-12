---
title: "get-notification-config"
date: 2026-11-12
weight: 2849520
---

### Shows notification rules, destinations and worker status

```text
cloudmin get-notification-config [--multiline | --json]
```


Shows rules, destinations, each destination's last delivery result and the status of background checks. Tokens, private chat webhook URLs and Pushover recipient keys are never returned. Use `get-notifications` for delivery results for individual events.

```sh
cloudmin get-notification-config --json
```
