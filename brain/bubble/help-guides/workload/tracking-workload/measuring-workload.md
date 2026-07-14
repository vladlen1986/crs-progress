# Measuring
> Source: https://manual.bubble.io/help-guides/workload/tracking-workload/measuring-workload · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Measuring workload involves gauging the current workload usage of your app. By examining both past data and real-time metrics, you can obtain a complete understanding of your app’s performance, both with real users and in isolated processes while you are developing.

<details>

<summary>App metrics (historical data)</summary>

The app metrics dashboard shows all collected data over a specific period, separately tracking development and live environments. This helps you pinpoint where your workload is spent. From overall usage, you can drill down to specific actions and expressions. Historical data gives a clear picture of WU consumption over time, revealing whether complex workflows or frequently refreshed searches are using more resources than expected.

Article: [Using app metrics](/help-guides/workload/tracking-workload/measuring-workload/using-app-metrics)

</details>

<details>

<summary>Server logs (real-time data)</summary>

The server logs provide a chronological view of all tasks performed by the server, along with their WU calculations. This lets you run isolated tests of workflows, actions, and other processes to track their respective WU consumption while you are developing.

Article: [The server logs](/help-guides/maintaining-an-application/testing-an-application/using-server-logs)

</details>
