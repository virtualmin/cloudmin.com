---
title: "set-notification-rule-enabled"
date: 2026-11-12
weight: 2849580
---

### Enables or disables a notification rule

```text
cloudmin set-notification-rule-enabled [--multiline | --json]
                                       --enabled yes|no
                                       --id value
```


Enables or disables the rule selected by `--id`. Supply `--enabled yes` or `--enabled no`. Its other settings are kept. Disabling stops its checks and cancels its queued deliveries. Enabling starts a new check period. Repeating the current state changes nothing.

```sh
cloudmin set-notification-rule-enabled --id RULE_ID --enabled yes
```

Options:

- `--enabled yes|no`: Whether the rule is enabled.
- `--id value`: Saved notification rule ID.
