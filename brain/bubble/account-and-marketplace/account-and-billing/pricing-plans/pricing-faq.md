# FAQ: Pricing and Workload
> Source: https://manual.bubble.io/account-and-marketplace/account-and-billing/pricing-plans/pricing-faq · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers frequently asked questions about workload and our pricing plans

## Workload Basics

### What is workload?

Workload is a measure of the work that Bubble does in order to power your application. Whenever your app is asked to perform a task like processing a payment, communicating with an API, or searching through your database, this counts towards your monthly workload usage. More technically, workload measures all the underlying activities your app does as it runs. Activities include database operations, workflows, and web requests. For a full list of inputs, see our article on [what contributes to workload](/help-guides/workload/understanding-workload/what-contributes-to-workload).

### How much workload will I need?

The amount of workload an app needs depends on a variety of factors. If you’re new to Bubble, the best way to assess your workload needs is to get started on a Free plan. From within your free app, you will be able to see how the activities unique to your app contribute to workload usage. The Free plan comes with more than enough workload to build any kind of app you can imagine! Most apps on a paid plan do not need more workload than the amount included in the Starter, Growth, and Team plans. If your app scales to the point where you outgrow the amount of workload on your plan, then you can subscribe to a workload tier on a monthly or annual basis. To learn more, see our [workload explainer blog post](https://bubble.io/blog/what-is-workload).

### What are my options if I need more workload?

If you need more workload than the amount that comes with the Starter, Growth, or Team plan, you have two options: you can purchase a workload tier for additional workload, or you can pay for overages as you go. Apps on the Free plan or Agency plan cannot subscribe to [workload tiers](/account-and-marketplace/account-and-billing/pricing-plans#workload-tiers) and cannot enable overages.

### What are workload overages?

In a given month, your app on the Starter, Growth, or Team plan will incur overages if workload usage exceeds the amount of workload that comes bundled into your app plan plus the amount of workload that you may have purchased via a workload tier. Overages are pay-as-you-go. If you do not have a workload tier subscription, then the overage rate is $0.30 per 1,000 workload units. If you have a workload tier subscription, you can find your app’s overage rate [here](/account-and-marketplace/account-and-billing/pricing-plans#overages). Apps on the Free or Agency plan cannot incur overages because these plans are designed for development. For details on overage billing, please see our [billing section](#billing).

### Can I cap the amount of workload my app uses?

Yes, you can disable overages in the App Plan tab so that your application does not use more than the amount that comes with your app plan plus any additional workload you may have purchased via a workload tier. If your app hits the workload limit while overages are disabled, you will receive an email notification that your app has been taken offline. You can bring your app back online if you enable overages or purchase a workload tier. If you keep overages disabled, then your app will go live again at the start of your next billing period.

## Workload Details

### What is the relationship between workload and speed?

Workload is a measure of the work that Bubble does to power your application over the month. There is no direct relationship between workload and speed. However, apps that were previously throttled by capacity will experience significant improvements in speed after switching to the new pricing plans.

### What is the relationship between user count and workload?

The more users who use your app the more activities your app is performing, which means your app will consume more workload. The size of your user base is a factor, but it is not necessarily the main driver of workload usage. For example, your application could have a small number of users but run a lot of activities in the background throughout the month. Whenever Bubble is doing work to power your application, workload usage goes up. The load of each activity is just as important as the quantity of activities.

### What is the relationship between workflow runs and workload?

The more workflows your app runs, the more workload your app will consume. The amount of workload it takes to run a workflow can vary significantly depending on how many steps are in the workflow and what actions the workflow is performing. Thus, the number of workflow runs is a factor, but it is not necessarily the main driver of workload usage. For example, your application could have a small number of workflow runs that each consume a lot of workload. Or your application could have a large number of workflow runs that each consume very little workload. The load of each workflow is just as important as the quantity of workflows run. To learn more, see our [blog post on workload](https://bubble.io/blog/what-is-workload).

### What is the difference between Live vs. Development workload?

{% hint style="info" %}
All paid apps have 100,000 monthly workload units for their Development environment included in their plan.
{% endhint %}

Live workload comes from your end users interacting with the Live version of your application. Development workload comes from app editors interacting with your Development environment. Common sources of Development workload include activities like testing your app and cleaning your database. Live and Development workload both contribute to your total workload usage.

### Does using the editor consume workload?

The only activity in the editor that uses workload is running bulk operations and importing/exporting data in the Data tab. Otherwise, interacting with the editor does not contribute to workload usage.

### What are ways I can optimize and reduce my app’s workload usage?

You can view workload charts in the Logs tab of the editor to see your app’s workload usage over time and to drill into the activities that are contributing to workload usage. To learn more, see our article on [how to use the workload charts](/help-guides/workload/tracking-workload/measuring-workload/using-app-metrics).

## Billing

### Do I need a plan for each project?

You can have as many projects as you’d like, and each project has its own plan.

### When do I get billed? When is my billing period?

You will get billed on a monthly or annual basis for your app plan. Your billing period starts on the day you sign up for your subscription. If you purchase a workload tier, your initial charge will be prorated based on the same billing period as your app plan. If workload overages are enabled on your app, you will get billed for any additional workload units your app consumes above the limit in the previous calendar month.

### How does overage billing work?

If your app plan is on a monthly billing cycle, then any overages that your app incurs in the previous calendar month will get calculated and charged on the last day of that month, at 12 AM UTC. If your app plan is on an annual billing cycle, then you will get billed at the start of each month for the previous calendar month’s overages.

### Will I get notified before I’m charged for overages?

Yes, you will receive an email notification when your app has reached 75% of its available workload units. You will also receive an email notification when your app has reached 100% and overages will kick in.

### Can I upgrade, downgrade, or cancel my app plan at any time?

Yes, you can make changes to your subscription in the App Plan tab.

### Can I switch between monthly and annual billing at any time?

You can switch from monthly to annual billing at any time.

### Can I subscribe to an annual subscription for my app plan and a monthly subscription for my app’s workload tier?

No, your app plan and workload tier must be on the same billing cadence.

### What are add-ons that I can purchase separate from what comes in the plans?

Workload tiers (only available to apps on the Starter, Growth, or Team plans), additional file storage for $3 per 100 GB, and plugin subscriptions.

## Capacity

### What happened to server capacity? Will it still be different across the new plans?

All apps across all the new pricing plans will operate at the highest capacity that Bubble can offer while maintaining the integrity of our own infrastructure. Apps that were previously throttled by capacity will experience significant improvements in speed after switching to the new plans.

### How does server capacity translate to workload?

There is no direct conversion from server capacity to workload. Capacity is like a speed limit on the highway, whereas workload is the distance traveled. On legacy pricing plans based on capacity, apps get throttled when they exceed the capacity limit. On the new pricing plans, we avoid throttling apps and instead measure monthly workload, the aggregate amount of work Bubble does to power your app in a given month. There are no limitations to the amount of workload your app can consume unless you choose to disable overages.
