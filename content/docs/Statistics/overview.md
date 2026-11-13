---
title: "Resource Statistics"
date: 2026-11-12
author: "Ilia Ross"
weight: 2731000
menuTitle: "Overview"
---

Cloudmin records CPU, memory, disk and network usage for the host and its virtual machines. Interactive charts show live readings and saved history, with peaks, averages and events to help explain changes in a workload. Statistics are included in both GPL and Pro.

Open **Host Statistics** in the host menu. For a guest, select the virtual machine and choose **Statistics** to open its **Guest Statistics** page. Host statistics require host-administrator access. Users assigned to a guest can read that guest's statistics without management permission, including in read-only mode.

The host page also shows load averages, storage pool usage and running guests' CPU and memory allocations against host capacity. Guest pages show filesystem usage when the QEMU Guest Agent can report it.

Collection is enabled by default and continues when no browser is open. Charts refresh every ten seconds while visible. History stays on the host, with configurable retention and a disk budget.

### In this section

- [Reading Charts](/docs/statistics/reading-charts/): Choose a period, zoom, compare devices and understand gaps and events.
- [Collection and History](/docs/statistics/collection-and-history/): Control sampling, recording, retention and host network totals.
- [API and CLI](/docs/statistics/api-and-cli/): Query history and export completed summaries for your own tools.

To receive messages when resource use crosses a threshold, configure [notifications](/docs/notifications/overview/). Statistics show what happened; notification rules decide when to alert.
