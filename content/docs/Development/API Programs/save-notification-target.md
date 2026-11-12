---
title: "save-notification-target"
date: 2026-11-12
weight: 2849530
---

### Saves a notification target from a JSON object

```text
cloudmin save-notification-target [--multiline | --json]
                                  --file file|-
```


Reads a complete destination object from `--file`, or standard input with `--file -`. Required fields are `name`, `type` and `address`. Type is `email`, `webhook`, `slack`, `discord`, `teams`, `ntfy`, `telegram`, `pushover` or `gotify`. Optional fields are `enabled`, `secret` and `clear_secret`. Destinations are enabled by default.

Tokens and private chat URLs require HTTPS. Protect files containing either with mode `0600`. Teams uses a Workflows webhook with access set to anyone. ntfy uses a topic URL.

Telegram uses a numeric chat ID or a public supergroup or channel `@username` in `address`, and a required bot token in `secret`. For a private chat, the user must start the bot. For a group or channel, the bot needs permission to send messages. Telegram messages use plain text and are limited to 4096 characters.

Pushover uses a private user or group key in `address` and an application token in `secret`. Both must contain exactly 30 letters and digits. Messages use normal priority, with titles limited to 250 characters and message text to 1024 characters.

Gotify uses an HTTPS server URL in `address` and an application token in `secret`. Include any reverse-proxy path but omit `/message`, query strings and fragments. Cloudmin appends `/message` and sends plain text at priority 5.

Include an existing `id` to update a destination. Include optional settings you want to keep. An empty `secret` removes a saved bearer token, but is rejected for Telegram, Pushover and Gotify. Omitting `secret` keeps the saved token only when its type and address are unchanged. Setting `clear_secret` to 1 removes a bearer token even if `secret` is supplied. Telegram, Pushover and Gotify reject token removal. Email uses Webmin's mail settings.

```sh
cloudmin save-notification-target --file target.json
```

Options:

- `--file file|-`: JSON file, or - for stdin.
