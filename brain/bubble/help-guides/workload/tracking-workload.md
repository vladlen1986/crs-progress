# Tracking workload
> Source: https://manual.bubble.io/help-guides/workload/tracking-workload · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

<figure><img src="/files/ZAM18erZCKr6quJ9WiUM" alt=""><figcaption></figcaption></figure>

In this section, we’ll dive into tracking to look at how you can use historically aggregated data and real-time reporting to learn where your app can be optimized. We’ll also cover Bubble’s tools that let you receive timely alerts and stay on top of any changes in workload trends.

Tracking can be broken out into

1. Measuring
2. Monitoring

## Measuring

Measuring workload is about understanding how much workload your app is currently using. By analyzing both historical data and real-time insights, you can gain a comprehensive view of your app’s performance with actual users and in isolated scenarios.

### App metrics: Historical data

The app metrics dashboard displays all data collected over a specific time period by all users in your system, with separate tracking for development and live environments. This helps you identify where your workload is being spent. From this dashboard, you can drill down from the overall usage to specific actions and expressions. For example, you may find that an action is writing to the database more frequently than it needs to, or a dynamic expression is more complex that it has to be.

The advantage of using historical data is that it can provide an accurate picture of which processes truly consume the most WU over a period of time. For example, a complex workflow might use less WU than expected if it's triggered infrequently, whereas a seemingly lightweight search could consume more WU than anticipated if it's refreshed frequently. Getting these clear insights can help you make decisions that we’ll discuss in the next section on optimizing.

Article: [Using app metrics](/help-guides/workload/tracking-workload/measuring-workload/using-app-metrics)

### Server logs: Real-time insights

Server logs provide real-time insights into the workload consumption of a single operation — seconds after it occurs. This immediate data allows you to experiment with isolated processes in the context of your application. For example, if you identify an unusually resource-hungry workflow in app metrics, your server logs can help you test ways to reduce its consumption.

Article: [Server logs](/help-guides/maintaining-an-application/testing-an-application/using-server-logs)

## Monitoring

Monitoring workload involves setting up automations that alert you to changes in WU consumption that may require your attention.

### Workload notifications

Workload notifications provide automatic and custom notifications. Automatic notifications use a preset set of criteria to notify you when a higher-than-usual WU consumption is detected, and custom notifications let you set up your own criteria.

Article: [Workload notifications](/help-guides/workload/tracking-workload/monitoring-workload/workload-notifications)

### Infinite recursion protection

Infinite recursion protection safeguards against unexpected increases in workload or CPU usage. It enables you to define a limit for the total number of successive workflows that a root workflow, along with any subsequent workflows, can execute. Once this limit is reached, the workflow is automatically terminated, thereby preventing excessive resource consumption.

Article: [Infinite recursion protection](/help-guides/workload/tracking-workload/monitoring-workload/infinite-recursion-protection)

<br>
