# Workload
> Source: https://manual.bubble.io/help-guides/workload · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Bubble is a platform for apps of all sizes. Whether you’re launching a new idea or scaling a business, it’s our responsibility to support our users by growing in a sustainable way. In order to do so, we have a usage-based pricing model so users will only pay for the resources their app uses.

Our mission is to make software development more accessible — Instead of requiring users to monitor all of the various metrics in a traditional tech stack built with code, we introduced a single pricing metric to track resources needed for each app: **workload**.

## What is workload?

Workload represents the server resources needed to host, run, and scale apps built on Bubble. It aggregates how much server resources is needed for different processes. The amount of workload an app consumes is measured in **workload units (WU)**.

## How workload streamlines server metrics

Teams of traditional software developers typically need to manage a complex infrastructure with various systems, like servers, network, storage, and more. Each system also comes with its own set of technical metrics to monitor — like CPU usage, load balancing, bandwidth consumption, and network latency, just to name a few.\
\
For teams building on Bubble, workload is the only metric you need to manage. This approach allows you to:

* **Streamline performance monitoring:** By focusing on a single metric, you can focus on creating great apps and let Bubble handle the rest.
* **Identify optimization opportunities:** Workload reflects which processes in your app are consuming resources, so you can optimize if needed.
* **Adapt to changing needs:** Add more workload easily with pay-as-you-go workload overages or purchase a workload subscription for a volume discount.

### How much workload do I need?

The majority of users find that their plans have more than enough workload units (WU) to get started with building, testing, and launching their apps. As your app grows and attracts more users, there are flexible ways to add more WU, either manually[^1] or automatically[^2], to avoid the app going offline. This flexibility ensures that your app can handle increasing demand.\
\
We’ll share more about how pricing works in the [Account and billing section](/account-and-marketplace/account-and-billing/pricing-plans).

## How are capacity and workload different?

Before Bubble introduced the concept of workload alongside our new workload-based pricing plans in April 2023, legacy plans used a different metric called capacity. Unfortunately, capacity was too closely connected to Bubble’s infrastructure, so each app had a capacity limit to protect Bubble's overall performance. For users, this meant apps slowed down when they exceeded the capacity limit — they were “throttled” right when they most needed to keep up with increased demand from end-users. While capacity worked well in Bubble’s earlier years, it was no longer sustainable for our growing customers and their scaling apps.

Unlike capacity, workload is not a shared or scarce resource — it measures the resources each individual app uses to go as fast as it needs. In essence, capacity was a speed limit on the highway, whereas workload works more like the fuel for your car.

## The 3 steps to workload management

In the following articles, we will delve deeper into each of the steps that are part of a healthy workload management strategy. We also offer practical insights to help you make sure your app is using workload efficiently.

<figure><img src="/files/HPL48gHXSFtEJTIFZVa5" alt=""><figcaption></figcaption></figure>

<details>

<summary>Understanding</summary>

Before you start tracking and optimizing your app’s workload, it’s important to grasp the fundamentals. This section provides an overview of how workload is calculated, what factors contribute to it, and how it might influence your choice of pricing plans.

By understanding these core concepts, you’ll be better equipped to manage your app’s workload consumption and select the right plan for your needs.

Article series: [Understanding workload](/help-guides/workload/understanding-workload)

</details>

<details>

<summary>Tracking</summary>

Effectively tracking your app’s workload helps you maintain optimal performance and prepare your app for future growth. This section delves into the key components of tracking workload usage, including measuring and monitoring.

#### Measuring

Bubble offers tools to help you measure how much workload is used to fuel your app. You can dive into your app’s detailed performance metrics, pinpointing resource-intensive areas and understanding how each component contributes to the overall workload.

Article series: [Measuring workload](/help-guides/workload/tracking-workload/measuring-workload)

#### Monitoring

Monitoring workload helps you maintain your app’s performance and reliability and avoid unexpected costs. By setting up alerts and infinite recursion protection, you can be notified immediately when significant events or thresholds are reached.

Article series: [Tracking workload](/help-guides/workload/tracking-workload)

</details>

<details>

<summary>Optimizing</summary>

After you learn more about your historical workload consumption, the next step is to optimize it. This section explores how to use that data to fine-tune actions such as page loads, workflows, actions, searches, and bulk operations.

Article series: [Optimizing workload](/help-guides/workload/optimizing-workload)\
Article: [WU optimization checklist](/help-guides/workload/optimizing-workload/optimization-checklist)

</details>

[^1]: If your app consumes more workload units (WU) than is included in the plan, you can buy additional, discounted workload tiers.

    Article: [Pricing and plans](/account-and-marketplace/account-and-billing/pricing-plans)

[^2]: Bubble can automatically add Workload Units (WU) to your app to handle an increase in traffic or processing. Read more in the article below.\
    \
    Article: [Pricing and plans](/account-and-marketplace/account-and-billing/pricing-plans)
