---
title: "Muting Alerts"
date: 2026-11-12
author: "Ilia Ross"
weight: 2723500
menuTitle: "Muting Alerts"
---

Muting pauses alert delivery for one guest or for the host and all guests. Muting all alerts also covers guests added later. Mutes stay active until you unmute them, including after restarts.

Unmuting all alerts leaves separately muted guests muted. Unmuting one guest does not override a mute for all alerts.

Checks and history continue. Pending deliveries are marked muted and will not be sent later. Destination tests still send. A delivery already in progress may finish.

After unmuting, a problem still present at the next fresh check sends one new alert, even when reminders are disabled. A problem that has recovered stays quiet. A missing reading leaves the check paused.

You need host and management access to mute or unmute alerts. Changes are blocked in read-only mode. Users assigned to a guest can see its mute status and events.
