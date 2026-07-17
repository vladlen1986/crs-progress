<!-- source: The Ultimate Guide to Bubble Performance (Petter Amlie), Revision 3 — physical PDF pages 205-225 -->
<!-- Workload (WU): what it is and the cost model -->

# Workload

## What is workload (WU)?

Bubble's pricing model is designed to cater to your business's growth stage and specific feature needs. Each plan includes an allotted amount of workload, with different options available to increase that amount. Workload is basically a calculation of how much effort Bubble exerts in running your app.

As your app's user base, workflows, transactions, and page views increase, you can adjust the resources to fit your app's growing requirements.

In essence, this is a way for Bubble as a company to ensure three things: That one individual app does not consume an overwhelming amount of server resources, potentially slowing down other apps, and giving Bubble an increased server cost without any additional revenue to make up for it To give developers an incentive to build apps that spend server resources efficiently, to the benefit of all members of the ecosystem To remove the need for developers to think about optimizing their app within the constraints of capacity.

To illustrate with a simple metaphor: Let’s say you want to drive across the United States in your car.

The old capacity system would force you to maintain a steady speed limit. You would not be able to put the pedal to the metal and reach your destination faster. But you would also not have to think about fuel consumption.

The workload system lets you drive your car as fast as you want, going from New York to Los Angeles at full speed. But, you may need to refuel along the way.

You can see Bubble’s perspective here: if you build an app that’s optimized for workload, you are essentially shopping around for a car with lower fuel consumption.

To transfer that metaphor to Bubble, let’s have a look at the difference between the “old” system of capacity versus the workload system when working with the database.

In the legacy capacity system, you as a developer would need to take into account that you don’t overspend your capacity by giving the server too much work all at once. For example, if you were to run a bulk operation (such as a recursive workflow making changes to a list of things in sequential order), you would have to space those workflows out by placing a delay in-between each cycle. Let’s say you are making a change to 500 database things, and to avoid blowing your capacity you place a one-second delay in-between the processing of each one. This would mean that no matter how long the processing actually takes, you would be extending the processing time by 499 seconds (about 8 minutes), where basically nothing happens. You’re slowing down your car to stay within the speed limit.

With the workload system, Bubble no longer cares how much work you are doing over one given, short period of time. You can remove the one-second delay, and simply instruct Bubble to finish as fast as it can. In other words, workload gives you the freedom to spend more server resources (speed up your car) to reach your goal more quickly.

For those who have been around long enough to have worked on apps before workload, the introduction of the workload metric can be seen as a necessary step to make sure Bubble is profitable over time. This is of course a necessary step to take for a company that at the time of writing this hosts more than three million applications, and it makes sure that… well, that they’re still around five and ten years from now.

### Plans and growth

Bubble offers a spectrum of plans, from a no-cost option to a customizable enterprise solution. Each is crafted to meet the needs of your app at every stage of its lifecycle, providing increasingly advanced tools for collaboration, data management, log retention, and backups. You can see the details of these plans on Bubble’s pricing page.

Each plan comes with an allotted amount of workload to spend as you see fit, and there are a few ways that you can keep your app running, even if that amount is fully spent:

Overages Enabling overages instructs Bubble to dynamically add more workload units at a set cost per 1,000 units. This is the most flexible option in the case of a sudden spike of traffic for example. If your app gets sudden traction from a marketing campaign, PR or successful social media post, you’ll know that the app will never go offline, but there may be an extra cost associated with the extra work the server has to do to serve that user spike.

Workload tiers If your app is on a more basic plan, and you don’t require the advanced features offered in the upper tier plans, you can still scale up. This is possible through the addition of workload tiers, which are available at discounted rates. This feature allows you to secure more workload units at a lower cost, ensuring that as your user base expands, and as your app engages in more complex tasks such as processing large volumes of data or frequent API interactions, you can manage the increased demand without necessarily upgrading your entire plan.

Upgrading your plan Finally, you can of course upgrade your plan to get the larger allotted amount of workload included in a higher tier plan.

Depending on your budget and workload needs, you can also consider the Enterprise plan (what used to be called Dedicatedserver), where you will indeed get a dedicated server in an AWS region of your choice, where workload is no longer calculated. In other words, the Enterprise plan lets you spend server capacity as you please with no “fuel” restrictions. Full speed with limitless fuel.

### Avoiding WU anxiety

Let’s just get one simple truth out of the way first: without spending WU, your app won’t be doing much. Just like your app’s performance, low WU consumption is a feature of your app, not your overarching goal.

WU is there to be spent on creating a great experience for your users.

Your goal should not be to minimize WU consumption obsessively at the cost of the user experience, deadlines and other features. Your app should spend workload – the trick is to not spend more than necessary. Most operations are pretty low-cost, and making them slightly lower may not pay off. Keep a cool head and see WU as one more variable in your planning. As with everything else, setting up right the first time is the

best approach, but keep a realistic perspective: even after reading about it, it takes some time and experimentation to learn. Use the Server logs to see how different processes behave.

### What spends WU - the quick introduction

Before we dive into the technical stuff, we’ll get some basic rules down that can make it easier to plan.

The overarching rule is that the more work you give the server, the more WU you spend. So let’s have a look at what that means.

WU is only consumed by server-side workflows; in most cases, this means communication with the database WU is mostly spent on dynamic expressions, since they form the basis of searches and changes being made to database records The WU spent by an action (and by extension by a workflow) is determined not only by what it does, but by the expressions inside of that action Dynamic expressions spend the same amount of WU regardless of where they are placed: be it in an action, conditional expression or a data source.

Making changes to a list of things requires more WU than making changes to a single thing, no matter what method you use In searches, more constraints are better, since it helps Bubble quickly rule out records that don’tmatch the criteria The exception is when you use :filtered and :advanced – this approach will often add a lot of complexity to the search, and often force Bubble to perform a query on eachrow of the search results. Nested searches, where you place a search inside a search constraint or in the cell of a repeating group, can drastically increase the number of database queries Bubble has to do Working with bulk operations, Schedule API workflow on a list is more efficient than recursive workflow (contrary to what it was when the first edition of this book was published), since it requires an extra “Schedule API workflow” action for every thing being processed Frequency matters: a heavy workflow is mostly only costly if it’s repeated frequently. Testing it repeatedly can sometimes give a skewed impression of where your actual WUs go.

### How is workload calculated

Workload is calculated in two steps:

The process has a startingcost

Bubble then calculates the processing power needed to complete it. Let’s call this processingcost.

To gain an understanding of these two steps, we’ll return to the car metaphor in each step:

The starting cost As we explored earlier, workload is spread out in a list of different activities, each having different costs associated with them. You’ll find these activities in the Bubble documentation.

However, you may find that the final cost of a dynamic expression is higher than what Bubble lists in the table. What gives? Luckily, our long road trip across the U.S. has given us ample time to think, and this is where we’ll find our answer:

The starting cost is essentially the fuel needed to start the car for the journey. If all you do is start the car, but never leave the parking spot, you won’t spend any additional fuel.

But of course you’ll never get anywhere either.

The processing cost As soon as you start moving your car out of the parking space and towards Los Angeles, you’ll be spending more fuel. This is the second step of the workload calculation.

During the trip (which takes about a week), you may stop for meals, visit a museum or two and pay for lodging. All of these add to your total expenses for the trip.

Returning to Bubble, we can translate that metaphor into the following: the starting cost (step one) is the starting of the engine, and everything you do from start to finish is added to the total cost of the trip. We’ll further illustrate with some examples from Bubble: Make changes to a thing: The action that makes changes to a thing in the database has a starting cost of 0.5 workload units You then search for the thing you want to make changes to using Doasearchfor. You then change a field on the thing with a static text

Ok, so what have we done here? We have of course started our car by executing the Makechangestoathing action. But then… we’re also searching for a thing inside of that workflow. Doasearchfor has its own starting cost of 0.3, plus the server resources needed to find the right record.

That part of the process consists of two things:

The complexity of the search The volume of data to search through

The complexity is determined by the kind of operators you apply to the search. For example, using :filtered,especially in combination with :advanced, can make a search more taxing on the server.

The volume of the database can also be split into a few parts: The number of fields on the data type The number of things (records) in the database The amount of data saved (for example, a field like Blogpost can take up more space than a field like Firstname, even if they are both text fields)

How do you personally calculate the exact total cost? Well… you don’t, really. The metric is a complicated measurement, and the resulting WU consumption can only really be measured as it happens and reported after the fact. While it’s more or less impossible to get an accurate description of exactly how a calculation for a given expression or action will end up, you will get a sense over time about how your design choices affect the total consumption. Don’t obsess over the decimals, but pick the low-hanging fruits that require more server resources than they need to.

### How can I learn more about workload consumption in my

### app?

With the launch of the workload metric, a brand new Appmetrics dashboard was also introduced. This replaced the old “capacity” dashboard (the term capacity has been made redundant), and allows you to get a clear sense of the total consumption of WU over a given period of time, as well as drilling into what processes in your app are consuming the most.

Describing how to use the WU metric dashboard is outside of the scope of this book, since there is already an article in the Bubble docs (coincidentally also written by me) which explains it in detail. Suffice it to say that this is your most important tool to analyze and optimize your app.

### How does workload affect the performance optimization

### tips in this book?

This chapter was added in late 2023 in the third revision of the book, and one of the most frequent questions I received leading up to it was whether the book has been updated to include WU.

I hesitated for a while to update it, as a lot of adjustments were made to the metric itself, as well as the tools available for measuring it and for running bulk operations, in the months after the launch. My response to the question has usually been that it doesn’t really affect the methods outlined in the book that much. The book focuses on performance, not on minimizing the work put on the server. In other words, it focuses on the user of your app and their experience of how snappy and responsive it feels, regardless of whether the server catches fire in the meantime.

Having said that, it’s not hard to understand why people feel that the two walk hand-in-hand, especially in the sense that the metric has added an additional variable to some of the performance decisions you will be making as a result of having read this book. That new variable is cost. How much WU are you willing to spend in order to make a sufficiently performant application?

This shouldn’t be interpreted as low WU spending and performance being mutually exclusive – sometimes an optimization effort is good for both, other times one takes precedence over the other.

For example, as we’ve explored earlier,, the number of elements on your page can affect the loading performance of that page, but it has a minimal effect on WU. Setting up nested searches (where you perform a second search inside the cell of a repeating group for example), on the other hand, is detrimental both to WU and performance.

What kind of decisions are affected? To answer that, we’ll need to return to a previous point: WU is a metric that determines how much work the server has to do to keep your application running.

The reason I’m parroting this, is that the sentence puts you into the right mindset for making informed decisions. There’s no getting around one simple fact; creating, finding, reading, changing and deleting database records are among the most taxing operations you can do. This is mainly what we mean when we talk about the server working.

Database processing can be a pretty resource-demanding process in any kind of app, not just Bubble apps, and its demands grow in parallel with your app’s growth. Costly processes can remain fairly invisible during your app testing, but then gradually make their presence known as your database volume and user base expands.

How one process can grow Instead of thinking about elements and workflows, we’ll think about dynamic expressions.For example, if you perform a database search using Doasearchfor, it doesn’t matter from a WU perspective whether it happens in a workflow or in the data source field of a repeating group – the search will consume the same amount of WU either way.

What you need to consider is the following:

Workload versus UX Over a given month, you will rarely be able to place any blame on one expression being processed once. The consequences for WU appear when a poorly-performing expression is repeatedlytriggered.In other words, you should take this into consideration when you analyze your metrics; a given workflow can make up a significant amount of WU consumption during your testing, but in the live app behavior may be different. You can usually predict the frequency at which the workflow or expression will be processed, and make a decision from there.

Keep a simple formula in mind: WU consumption = expression * frequency.

Typical things you should watch out for are:

User growth: will an increasing number of users lead to a higher frequency of this workflow running? Typical culprits are: Frequent user action, such as: Frequently clicking a button (such as refreshing a statistics dashboard). Creating things that lead to heavy processing (for example, creating a new user account leading to the creation of other linked things). Bulk operations initiated by users. Page load:

Loading a lot of searches (typical for statistics and long lists) Page load workflows that include database processing like creating/updating things or searching for things. Bulk operations API workflows that run at set intervals (hourly, daily, etc) Do they need to run as frequently? What about inactive user accounts? Should their data be processed frequently too, or can it wait until they are active? Is the processing needed at all?

The way to think about this is to see the app how your users see it. What is the first thing that users see when they load a page? A bunch of statistics that require complex aggregation in the database? A long list of things that forces Bubble to perform a search every time the page is loaded?

As you can see, this is as much about UX as it is about efficient processing: if your landing page requires a search, perhaps you could “hide” that search behind user actions, such as the user actively navigating to statistics instead of showing it by default. The expression itself is only part of the equation. If a particular expression is costly, the most efficient thing to do is to not run it

Of course, that’s not necessarily realistic or user-friendly, but it opens up an interesting question: how can I make this expression not be processed as frequently?

Weighing workload and database volume The database is a central part of your app’s WU consumption, and its volume adds to the work the server needs to do. Of course, most data is needed – that’s why there is a database in the first place – but some is not. Database bloating is a very real phenomenon, and can happen for a few different reasons:

Saving unnecessary data Not all data is worthy of a room in the hotel that is the Bubble database. Allow yourself to pause for a second and reflect on whether a specific piece of data is really necessary. Think about the concept of dataweight. This is a metaphor we’ve used to understand how different field types on a given data type affect the total volume of that data type.

Ghost records Ghost records is another term for things in your database that are no longer needed. They are often the result of a process that the user has started, and then abandoned. For example, in an eCommerce app, you may create a Cart item for the current user. The user never completes the purchase and leaves your app for good, leaving a cart in the database that is of no use. You can look into different ways of avoiding this by creating the cart at a later point or routinely deleting abandoned carts.

The most efficient is of course to not create the cart until it needs to be stored permanently.

Not planning the database structure Searching for database things can be taxing on the server when it needs to sift through vast amounts of data. Keep it mind that this is not only affected by the number of records, but of whatthoserecordscontain. For example, if your application is a blog, it might contain fields that store long texts; perhaps thousands of words. In isolation, one blog post may not be more than a couple of kilobytes, but as you add more posts, their total size can balloon. This affects at least two WU activity types:

The Doasearchfor can become increasingly costly as you keep adding articles. Let’s say you are using the Anyfieldcontains search constraints, you are potentially forcing Bubble to search through huge amounts of data. Surely there are better ways to do it! You’re also paying for the data transmitted from the server to the user’s device. Even if you’re just showing the title of the blog post in a list, Bubble downloads all the data that privacy rules allow.

In this case, you can consider setting up satellitedatatypes to separate the posts into two data types: one to search for, and another to display. Not only can it make the search faster, but you are searching through and downloading a lot less data.

Not considering external platforms

Let’s say you want to store some statistics every time a user visits a page. How many page views are you getting? How many additional pages does the user visit? Are they clicking on stuff?

This type of statistical approach to user behavior is one of the drivers of continuous app improvement. It can be tempting to store the data in your database. There are some upsides to this. You can circumvent ad blockers. You have the freedom to collect and aggregate data in the exact way you want. You don’t need to learn an external analytics platform; some of them can indeed have a fairly high learning curve.

From a WU perspective, it’s not a very efficient approach. Remember the formula from earlier: WU consumption = expression * frequency. The last part is the key in this case; collecting statistics is not necessarily a heavy operation, but it tends to be triggered very frequently.

Try to find a balance between the pros and cons of setting up your own statistics platform. Not only are you spending WU when you collect the data, but also when you later look at any lists or graphs based on that data. If another platform such as Google Analytics and Mixpanel could do the same thing, it may be more cost-effective to outsource it.

### Identifying taxing operations

As we’ve explored, the metrics dashboard is your most powerful tool available as of now, in learning how different design decisions affect the WU consumption. Use it frequently and take notes, mental or physical – you’ll start to get a sense of it over time and can start working proactively instead of reactively.

One of the most important starting points is the realization that workload is mostly not spent on workflows, actions or elements – it’s spent on dynamicexpressions. An action can be lightweight, but if you place a Doasearchfor expression inside of it, you’ve increased its spending quite a bit. Likewise, a group added to your page has a minimal effect on WU, but if the data source of that group is set via a Doasearchfor, you’ve suddenly given the server another task to finish..

Whereveryou place a dynamic expression that queries the server for something, it will incur a WU cost. It doesn’t matter if the expression is part of an action, a condition, an element data source or a database trigger event – server work is server work is server work.

Some assume that a condition that returns a negative value (“no”) doesn’t spend WU, but of course it does: how else would Bubble be able to return the value if not by spending server resources checking the condition?

The exception is dynamic expressions that rely on client-side processing, or that work with data that’s already loaded. For example, checking whether an element is visible is a client-side operation; it doesn’t need the server. Likewise, the Currentuser is always loaded along with the page, and referencing data stored on that same user does not cost anything. Finally, identical server queries are mostly not repeated. For example, if you have two identical Doasearchfor expressions on the same page, Bubble will only perform the search once.

### Optimizing for workload

Optimizing for workload is a broad area to explore and cover, and one that needs continuous updates to stay relevant. I have worked with Bubble’s engineers to create an extensive article series that covers the optimization process from different perspectives. This article series is available for free over in Bubble’s user manual at the URL below:

https://manual.bubble.io/help-guides/maintaining-an-application/performance-and-s caling/optimizing-for-workload
