---
title: "Reading Charts"
date: 2026-11-12
author: "Ilia Ross"
weight: 2732000
---

### Choose and explore a period

Choose the last hour, six hours, 24 hours, seven days or 30 days. **Custom** accepts a range in 15-minute steps, up to 366 days. How far back you can see depends on retained history.

Hover over a chart to read values at that time. Hold Shift and scroll to zoom around the pointer. Once zoomed, scroll sideways or drag to move through the period. All charts stay aligned, and automatic refreshes keep your zoom. Double-click to restore the full period.

Charts show current readings and period peaks. CPU charts also show the period's average. Older history uses summaries, so a brief peak can be higher than the plotted line.

### Understand the readings

| Reading | Meaning |
| --- | --- |
| Guest CPU usage | The share of the guest's assigned CPUs in use |
| Guest CPU waiting time | Time the guest was ready but waiting for the host to run it |
| Host load averages | Tasks running or waiting for CPU time or some I/O operations, averaged over one, five and 15 minutes |
| Memory | Usage against a dashed capacity line; guest usage needs a working balloon driver |
| Disk I/O | Reads above zero and writes below zero |
| Network traffic | Received traffic above zero and sent traffic below zero; host totals use the configured uplinks |

Guest CPU waiting time depends on the counters available from libvirt and the host. It may read zero where the necessary counters are unavailable.

Use the **Device** selector when the period contains more than one disk or network interface. Removed devices remain selectable while their history is retained. Disk history follows the guest's device slot, such as `vda`, so replacing its volume keeps the slot's history. Network interface history follows its MAC address.

### Storage and capacity

Storage bars show current pool or guest filesystem usage. The change below the heading compares the first and last available totals in the selected period. Host pools sharing a filesystem count its space once in that total.

Pool readings refresh once a minute. Guest filesystem readings need a running guest and a working QEMU Guest Agent, and refresh every 60 seconds by default. A slow or unavailable agent can delay them without stopping CPU, memory, disk or network collection.

The host page also compares the CPU and memory allocated to running guests with the host's capacity. Allocations show what guests have been assigned, rather than how much they are currently using.

### Gaps and events

Blank gaps mean readings are missing, not zero. A notice identifies gaps of at least two sampling intervals. Restarts, device changes and counter resets can leave transfer rates unknown until enough new readings are available.

The event timeline shows up to 200 state, device and connection changes in the selected period, newest first. These also appear as chart markers. The timeline is hidden when there are no events.

These measurements help monitor workloads and diagnose problems. They are estimates and are not intended for billing.
