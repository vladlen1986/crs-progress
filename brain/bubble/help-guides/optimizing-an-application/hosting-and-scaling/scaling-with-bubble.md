# Scaling with Bubble
> Source: https://manual.bubble.io/help-guides/optimizing-an-application/hosting-and-scaling/scaling-with-bubble · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers what it means to scale your Bubble app, and the tools we provide to ensure that scaling happens smoothly

## What scaling means

Scaling can mean many things, but in the context of this article, we'll focus on the following definition:

> Scaling in Bubble means an increase in the consumption of server resources over an extended period of time

In the majority of cases, *scaling* is the result of more users signing up and actively using your app. But scaling can also be the result of other changes, such as:

* Adding new features that require more resources
* Adding connectivity to third-party systems, such as accepting incoming API requests
* Creating or importing a large volume of data that increases the need for searching and processing

Scaling a web application is akin to upgrading a power grid to meet growing electricity demands. Just as additional power plants and transmission lines are required to distribute electricity to a larger population or an increase in electricity usage, scaling your app involves adding more server resources to support the increased user base and data processing needs.

## Workload units

Bubble measures the total work that is performed to power your application in a metric called *workload units*. This unit tracks different activity types, such as database queries, workflows, file uploads and API calls and calculates a total.

{% hint style="info" %}
You can read more about exactly how the workload unit in our dedicated article series on the subject:

Article series: [Pricing and Workload](/account-and-marketplace/account-and-billing/pricing-plans)
{% endhint %}

Because each app is unique and can perform a wide range of different tasks, workload is use-agnostic metric that tracks your actual consumption. You can track each category and task down to single expressions in detailed reports to understand how your app is consuming workload, and to see how your app scales over time.

Each [Bubble plan](https://bubble.io/pricing) comes with a number of workload units and Bubble helps you scale automatically or manually (if you prefer) to facilitate for growth.

## How Bubble helps you scale

As we've covered, scaling your app in essence means to increase how much work the server is doing to keep the app running. Bubble is designed to make scaling as seamless and straightforward as possible. Let's look at a few points to learn what that means in practice:

* **We don't** [**rate limit**](#user-content-fn-1)[^1]**:** Your app will run at the same pace no matter how much workload it consumes: we don't rate limit. Essentially, this means your app can grow and perform consistently, irrespective of the workload it manages.
* **You can scale workload automatically or manually:** we offer a fully automated system that adds workload to your plan immediately as the need arises to facilitate for growth or sudden spikes in traffic or processing. You can also choose to manually add workload units which in some cases can give you a volume discount.
* **Changes on consumption is communicated clearly:** using the app metrics dashboard we provide a set of reports that detail your workload consumption, and we email you if it reaches a certain percentage so that you can stay on top of it
* **CDN Integration is included:** Through Cloudflare, we provide efficient Content Delivery Network capabilities to ensure quick access to your app globally.
* **We offer a dedicated server option:** if you need more control, we offer a dedicated server environment.

## Spikes

When there's a sudden increase in the consumption of server resources, it's often called a *spike.* This can traditionally lead to problems for any website or app, since the server is not set up to handle the unexpected increased need for processing power.

Spikes can happen for many reasons, many of them positive:

* Your app goes viral through social media, an article/video or a platform like ProductHunt, leading to an increase in traffic
* A lot of users try to use the app at the same time: for example, if your app handles *events*, a lot of users could be trying to access exactly when the event starts, but your traffic is otherwise stable
* A change in the app requires major changes in the database, and you need to do some heavy processing to facilitate (once or regularly)

Bubble's automated scaling is instant and flexible in the way that it doesn't bump you to a higher plan, making the cost increase permanent. It simply adds the workload units needed to handle the spike, keeping you on the same plan as before. If you expect a spike in advance, you may make it even more cost-efficient by pre-purchasing workload units.

## How many users can Bubble handle?

This is a question that needs to be looked at more carefully to answer. It's tempting to see scaling simply as the number of users, since it's such an easy metric to measure. However, it's important to note that what we are *really* talking about when it comes to scaling is the total amount of server resources those users consume.

The easiest way to illustrate this is to think in terms of active and inactive users; inactive users spend little or no server resources and as such can be scaled almost indefinitely in principle. Active users on the other hand may spend a small or large amount of resources, depending on what your app does.

### Understanding your product

To understand exactly how *your* app scales, it's helpful to drill into the actual mechanics of how it is used. Scaling is a process that rests on three pillars:

* Bubble's scaling capabilities
* The kind of work that your app does
* How efficiently your app is built

While Bubble is designed from a foundational level to make it easy and cost-effective to scale, the platform's flexibility also makes it possible to set up apps that don't perform as well as they could, consuming more server resources than necessary.

Scaling is mostly affected by the use of your database. An app with just few users could in principle consume a high level of server resources if you perform heavy database processing on a regular basis, and the opposite would also be true: lightweight database operations multiplied by a large volume of users can lead to a high consumption as well.

Predicting where your product falls on that spectrum can help you optimize your app, ask for advice from our Success team and forum members.

[^1]: *Rate limiting* means to limit the number of requests a user can make to the server in a given time.\
    \
    Note that to ensure the ongoing stability of the platform, we might need to make exceptions for processes that could potentially impact server performance. Also, bear in mind that timeout limits may be applied to operations that exceed a certain duration to maintain efficiency.
