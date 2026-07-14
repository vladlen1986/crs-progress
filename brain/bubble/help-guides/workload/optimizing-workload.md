# Optimizing workload
> Source: https://manual.bubble.io/help-guides/workload/optimizing-workload · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

<figure><img src="/files/UrwSIkdz3OXAGVbd0yKt" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
If you want a quick overview of common optimization opportunities, check out our *Optimization checklist*.

Article: [WU optimization checklist](/help-guides/workload/optimizing-workload/optimization-checklist)
{% endhint %}

## Balancing optimization with user experience

The workload metric gives a glimpse into how much server power your app is using. We've used the metaphor of a car's fuel gauge – it shows how much energy we're consuming as we drive our app forward.

But here's the interesting part: while we do want to be mindful of our "fuel" consumption (after all, it can influence hosting costs and scalability), it's just as important to ensure our app delivers a smooth ride for its users.

It's all about balance. In this article, we're going to explore how to plan for workload in a way that keeps both the app's performance and user experience in harmony.

## The user experience

The user experience encompasses how your users feel and interact when navigating your app. Does the app feel snappy? Is it well-designed? Does it solve problems efficiently?

Think about it: our daily lives are filled with interactions in different applications: we order food, plane tickets, tourist experiences, and taxis in seconds. We keep track of customers, projects, tasks, and fitness goals. We chat, and attend live video meetings with friends, family and colleagues and send files across the planet in seconds.

All of this feels second-nature; it's simply how the world works. But think about it: some of the processes being performed are highly complex. They can involve huge, complicated databases, GPS coordinates, payment systems, and different kinds of artificial intelligence, all wrapped up in a good-looking, easy-to-use application.

Successful apps work hard to hide how complex they really are – *that's* why they are so successful. Your users will not care how much advanced machinery is working under the hood, as long as they have a smooth experience that solves their problem quickly.

This understanding is crucial as you plan for workload: you need to balance the UX with the optimal workload consumption. The underlying point in that is of course that most apps *need* to spend workload in order to give your users the experience they expect – but with careful planning and good design you can avoid spending *more* than what is needed.

### Three levels of decision making

Planning is all about making decisions. Should the app look like this or that? Should this feature work this way, or that way? Is it needed at all? In our general section about [planning your app's features](/help-guides/getting-started/building-your-first-app/planning-features), we explore how to think about your app in versions and not let [feature creep](#user-content-fn-1)[^1] delay your release.

When it comes to striking the balance between workload and UX, you can think about decision making in three levels:

#### 1. Save workload at no cost to UX

If you can implement or change a process that saves you workload at no cost to your user's experience, the decision is easy: you can go right ahead and implement it.

Keep it mind though that this too can lead to [scope creep](#user-content-fn-1)[^1]; you can implement it right away or you can plan it for a future release. While we won't delve into the specifics of *when* to make this change, if it aligns with your development timeline, there's little reason not to go ahead with it.

#### 2. Save workload at a slight cost to UX

The second level involves making a slight sacrifice to the user experience in order to reduce workload consumption. It's essential to understand that compromising isn't always negative; it merely demands careful evaluation. There are instances where tweaking the UX can result in a more efficient app, while in other situations, the user experience should take precedence over server efficiency.

Choices within this realm aren't necessarily binary. Thoughtfully weigh the options to ensure that any modifications don't compromise user satisfaction. We'll delve deeper into these considerations and strategies throughout this series.

#### 3. Save workload at a major cost to UX

At the third level, we are making cuts or changes in the user experience that user's may find to be reducing the overall quality of the app. If you find yourself in this level, you may think about what we said in the introductory article: that workload is there to be spent – you would never expect your car to run without fuel or electricity.

If workload concerns compromise your app's primary function or its ability to address a specific problem, you might be placing too much emphasis on it. Remember, the main goal is for your app to effectively serve its intended purpose, not to race towards the lowest possible workload consumption.

That's not to say that you should not spend time reflecting over points that consume a lot of workload but are important to your users: there may be methods or UX changes that lowers consumption in a more UX-friendly way than you initially thought.

## One-time expenses versus running costs

It can also be beneficial to view workload through an economist's lens: one-time expenses, even if steep initially, can often be more manageable in the long run than continuous operational expenses.

One-time workload costs can happen for numerous reasons:

* Importing or changing large amounts of data at once
* A sudden spike in traffic to your app that subsides after some time
* Batch processing or running a series of complex workflows in a short span
* Initial setup processes such as syncing with third-party services or apps
* Major updates or migrations which require significant recalculations or data transformations
* Running intensive, but infrequent, analytics or reporting functions
* User-driven events, like large file uploads or mass data entries during specific campaigns or promotions
* Special promotions or launches which result in short-term high user activity
* Mistakes, like unknowingly running a [recursive workflow](#user-content-fn-2)[^2] more times than intended

This list isn't comprehensive, but it highlights that certain events can cause a temporary surge in workload cost. However, this doesn't always indicate that you should allocate a significant amount of resources to mitigate that load. If such events are rare or one-offs, it might be more practical to absorb the occasional extra cost rather than over-optimizing for it.

## The workload optimization framework

Having looked at how you can adapt a mindset that helps you balance the needs of users with the need for efficient server operations, we'll move on to the framework we'll use to identify processes that can benefit from optimization.

Continue to the next article: [Workload optimization framework](/help-guides/workload/optimizing-workload/optimization-framework)

[^1]: *Feature creep* or *scope creep* are common terms to describe the tendency of continually extending an app's launch or deadline by adding new features that were not part of the original pla&#x6E;*.*

[^2]: *Recursive workflows* are API workflows that schedule themselves one or more times, resulting in a loop. They are used (among other things) for bulk operations.

    Article: [Recursive API workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/recursive-api-workflows)
