---
title: "Notifications"
date: 2026-11-12
author: "Ilia Ross"
weight: 2731000
menuTitle: "Overview"
aliases:
  - /docs/administration/notifications/
---

Cloudmin sends email, chat and push messages or webhooks for resource use, guest problems, monitoring failures and failed jobs. Each rule sets what to watch, when to alert and where to send messages.

Notifications are included in both Cloudmin GPL and Pro. Choose thresholds, waiting periods, reminders and recovery messages for the host, all guests or selected guests. Send each alert to one or more destinations.

You need host and management access to change rules or destinations. Users assigned to a guest can read that guest's events.

### Set up your first alert

1. Open **All Notifications** in the Cloudmin menu, then choose **Destinations**.
2. Select **Add destination**, give it a name, choose its delivery method and enter the address and any required token. Save it with delivery enabled.
3. Use **Send test** to check the destination. Check **History** for the delivery result.
4. Open **Rules** and select **Add rule**. Choose the condition and which machines to monitor. For example, monitor host memory usage at or above 90% for five minutes.
5. Choose your saved destination, set reminders and recovery messages as needed, and save the enabled rule. You can also create a destination while saving a rule.

Open **History** to check delivery results, or select a guest and open **Notifications** for its events.

### In this section

- [Destinations](/docs/notifications/destinations/): Set up email, chat, push messages and webhooks, and test delivery.
- [Rules](/docs/notifications/rules/): Choose conditions, machines, thresholds, waiting periods, reminders and recovery messages.
- [History and Delivery](/docs/notifications/history-and-delivery/): Read event history, understand delivery results and retry failed messages.
- [API and CLI](/docs/notifications/api-and-cli/): Manage notifications from scripts and read webhook payloads.

### Host outages

A powered-off host or stopped Webmin service cannot send alerts. Detecting either requires another monitoring system.
