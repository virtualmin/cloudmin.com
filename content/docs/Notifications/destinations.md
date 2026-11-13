---
title: "Notification Destinations"
date: 2026-11-12
author: "Ilia Ross"
weight: 2722000
menuTitle: "Destinations"
---

A destination tells Cloudmin where to send messages. Add one from **All Notifications → Destinations → Add destination**, or create it while saving a rule. Each rule can use one or more saved destinations.

### Delivery methods

| Method | What to enter |
| --- | --- |
| Email | A mailbox address; delivery uses Webmin's mail settings |
| Webhook | A URL that accepts JSON, with an optional bearer token |
| Slack | An incoming webhook URL |
| Discord | An incoming webhook URL |
| Teams Workflows | A signed workflow webhook URL with access set to anyone |
| ntfy | A topic URL, with a bearer token if required |
| Telegram | A chat ID or public channel or supergroup username, and a bot token |
| Pushover | A user or group key and an application API token |
| Gotify | Your server's HTTPS URL and an application token |

Test messages check delivery to an enabled destination without triggering a rule. Tests use the same retry rules as alerts.

### Email and webhooks

Email uses Webmin's sender and mail settings. Messages describe the condition, reading, threshold and alert state, with a link back to Cloudmin. Links use Webmin's configured email URL, or its hostname and listening port. Message wording uses the module's language strings.

Generic webhooks send the event as JSON. Chat and push services receive readable messages in their own formats.

### HTTPS and tokens

All HTTP delivery checks HTTPS certificates, rejects redirects and requires HTTPS for bearer tokens. Slack, Discord and Teams URLs also require HTTPS. Saved tokens and private chat URLs are visible to authorized editors, but omitted from configuration listings. Saving an empty bearer token removes it. Telegram requires a bot token. Pushover and Gotify require application tokens. Gotify requires HTTPS. Pushover user and group keys are also hidden from configuration listings.

### Slack, Discord, Teams and ntfy

Use an incoming webhook URL for Slack or Discord. Discord requests wait for message creation before accepting success. For Teams, create a workflow with the Teams webhook trigger and access set to anyone, then use its signed URL. For ntfy, use the topic URL, with a bearer token if required. Slack and Discord messages are shortened to their text limits. ntfy messages are limited to 4096 UTF-8 bytes. All methods support test messages and delivery history.

### Telegram

Telegram uses a chat ID and a bot token from [BotFather](https://t.me/BotFather). Start the bot for a private chat. Add it to a group with permission to send messages, or to a channel with permission to post. Use a numeric chat ID, including its minus sign, or an `@username` for a public supergroup or channel.

To find an ID, send a command to the bot and read `message.chat.id` from its [getUpdates response](https://core.telegram.org/bots/api#getupdates). In a group, address the command to the bot, such as `/start@your_bot`. For a channel, read `channel_post.chat.id` after posting a message. If the bot already uses a webhook, read its incoming updates instead.

Telegram messages are plain text, limited to 4096 characters, with link previews disabled. Delivery needs both an HTTP success and Telegram's `ok: true` response. Rejections and rate limits use the normal retry schedule. Forum topics, automatic chat discovery and custom Bot API servers are not supported.

### Pushover

[Pushover](https://pushover.net/api) needs a user or group key and an application API token from your Pushover account. Both are private, case-sensitive keys containing 30 letters and digits. Messages use normal priority. Titles are shortened to 250 characters and message text to 1024 characters. Delivery requires an HTTP success and `status: 1` in the response.

Pushover HTTP 4xx responses, including quota-exhaustion 429 responses, and valid API rejection statuses stop delivery immediately. Correct the destination or restore its quota before retrying from History or with `retry-notification`. Network failures, server errors and unreadable responses still retry automatically.

### Gotify

[Gotify](https://gotify.net/docs/pushmsg) needs your server's HTTPS URL and an application token, not a client token. Include any reverse-proxy path in the server URL, but omit `/message`, query strings and fragments. Cloudmin appends `/message` and sends the token in the `X-Gotify-Key` header. Messages use plain text and priority 5. The server certificate must be trusted by the Cloudmin host. Delivery requires an HTTP success and a positive message ID in the response.
