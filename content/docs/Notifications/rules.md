---
title: "Notification Rules"
date: 2026-11-12
author: "Ilia Ross"
weight: 2723000
menuTitle: "Rules"
---

Rules define what to watch and when to alert. Open **All Notifications → Rules → Add rule**, choose a condition and the machines to monitor, then select one or more [destinations](/docs/notifications/destinations/).

### Conditions and scope

A rule can monitor the host, all guests or selected guests. Monitoring all guests includes guests added later. Each guest is checked separately. Pool, load and collector-health rules apply only to the host. Guest power and agent rules require guests. Job failure rules can cover the host and all guests together.

Numeric rules can alert at or above a threshold, or at or below it. Usage uses percent, free memory and space use GiB, and network and disk rates use MiB/s. Host load uses the one-, five- or fifteen-minute load average. Free memory is total memory minus reported usage. Rates come from the collector's measured change per second, rather than lifetime counters.

Filesystem rules check mounted filesystems. A host path must be a mount point, such as `/` or `/boot`. A blank host path means `/`. Other directories get no readings, so their rules never alert. A blank guest path checks every reported filesystem. A blank pool name checks every active storage pool for usage or free space, or every known pool for inactivity. Problems are tracked separately for each device.

Job failure rules report new failures, including scheduled backups. These alerts skip the duration and cooldown waits. They have no reminders or recovery messages. Errors while preparing scheduled backups or removing old backups are recorded for the host. A failed backup may create both a guest job event and a host schedule event.

### Check intervals and waiting periods

Checks run as a background job every 60 seconds by default. In **Module Configuration**, **Notification check interval in seconds** accepts 10 to 3600 seconds. Slow checks or deliveries can delay the next run.

Resource and guest status rules alert after a problem lasts for five minutes by default. For example, a CPU rule with a 90% threshold needs readings of 90% or higher across checks for five minutes. Each rule's `duration` sets this wait in minutes. Setting it to `0` alerts on the first matching check, subject to the minimum gap between alerts.

By default, each rule also waits at least five minutes between new alerts for the same host, guest or device. This gap starts from the last alert or reminder. Set it in minutes with `cooldown`. Both waits must finish before a new alert is sent.

### Reminders and recovery

An ongoing resource or guest problem produces one alert. Reminders are off by default. When enabled, they repeat while the problem continues and readings are available. Recovery messages are on by default and always use notice severity. Alerts and reminders use the rule's severity. Each enabled destination gets its own copy and delivery result.

Recovery requires the reading to pass the threshold in the opposite direction by two percentage points for usage, or 2% of the threshold for other measurements. A high-usage rule at 90% clears at 88% or lower. A low-free-space rule at 10 GiB clears at 10.2 GiB or higher. High-usage thresholds at or below 2% clear only at zero. A zero threshold clears when its comparison stops matching.

### Missing readings and collector health

CPU, memory, load, transfer rates, guest status, guest filesystem and storage pool checks need resource collection enabled. They use its latest readings, so checking more often does not collect new data. Saving statistics history is optional. Host filesystem checks and job failures work even when collection is disabled.

Missing readings restart the wait for a new threshold alert and pause checks for an ongoing problem. They do not count as recovery. Guests that leave an all-guests rule, and guest filesystems or pools that are no longer reported, are dropped from the current conditions once no alert or cooldown remains. Explicitly selected guests and host mount points remain paused while their readings are unavailable. Dedicated collector and pool conditions report monitoring problems separately.

Collector health rules report when no fresh snapshot is available for three collection intervals, followed by the rule's duration. They create one host incident per rule, not one alert per guest. Deliberately disabling collection pauses these rules. Pool inactivity rules use a separate inventory of active and inactive pools, refreshed about once a minute. A failed or stale inventory read cannot establish inactivity.

Guest power rules detect guests that are not running. Agent rules detect an unavailable agent while a guest is running. Retries after failed agent checks can be an hour apart, so detecting recovery can take that long. Results older than 65 minutes pause the rule until another agent check completes.

### Planned guest operations

Planned stops made in Cloudmin pause checks until the guest runs again. If the guest is still running when checked after two minutes, checks resume. Reboots allow ten minutes to recover. Unfinished guest jobs, such as backups, snapshots and disk changes, also pause checks. So do failed jobs that still require recovery. Stops made outside Cloudmin may trigger alerts.

[Muting alerts](/docs/notifications/muting-alerts/) pauses delivery while checks continue. Disabling a rule or destination keeps it disabled until you enable it again.

### Changing or disabling rules

Disabling a rule or destination cancels its pending deliveries. Saving or re-enabling a rule starts its waiting period again. Saving also cancels deliveries queued under the old settings. Deleting a rule stops tracking its conditions and cancels its pending deliveries. Event history remains. A delivery already in progress may still finish.
