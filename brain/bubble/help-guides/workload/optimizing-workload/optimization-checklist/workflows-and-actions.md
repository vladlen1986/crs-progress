# Workflows and actions
> Source: https://manual.bubble.io/help-guides/workload/optimizing-workload/optimization-checklist/workflows-and-actions · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
This article series on workload will sometimes reference documentation shared in other parts of the series, as well as the core reference entry for workload. We recommend you get to know the core reference entry, and proceed to read the series as a whole (in that order).

Reference: [Pricing and workload](/account-and-marketplace/account-and-billing/pricing-plans)\
Article series: [Optimizing for workload](/help-guides/workload)
{% endhint %}

In the earlier article [*Understanding workload calculation*](/help-guides/workload/understanding-workload/the-workload-calculation), we explored the theme park entry ticket metaphor to illustrate that the [activity type/cost table](/help-guides/workload/understanding-workload/what-contributes-to-workload#what-does-an-activity-cost-in-wu) reflects the cost of entry, but you can still add additional workload by accessing different rides inside of the park.

This is especially true for workflows[^1]; each workflow can have a very low or even zero entry cost, but as you add [dynamic expressions](#user-content-fn-2)[^2] to it, the number and complexity of server requests can go up accordingly.

Keep in mind that a *workflow* is the umbrella term for the combination of an *event* and *one or more actions –* like a folder. As such, a workflow doesn't in itself consume any WU at all, but instead each event and action leaves a footprint. This is not just semantics: it's a helpful way to focus on the right things: instead of thinking of a workflow spending a given amount of workload, we can focus on the event and the actions in isolation.

In this article, we'll continue looking at how different workflows – and the operations that you add *to* a workflow – contribute to the net total.

## Workflow volume

Before we dive in, we'll repeat a point from earlier: each workflow in isolation does not usually incur a substantial workload cost. Of course, it still makes sense to optimize each and every workflow to be as efficient as it can be without compromizing on UX or features, but there are also deadlines and developer resources to think about.

The way to prioritize, is to look at workflows that have two similarities in common:

* They contain operations that typically consume a relatively **high amount of workload**, such as:
  * Complex database searches
  * Changing/copying/deleting a list of things
  * Scheduling bulk operations (API workflows on a list or recursive workflows)
* They are **repeated frequently,** such as:
  * Many times per user
  * Many times as a result of user growth

What we can learn from this is that a "heavy" operation that runs infrequently is not necessarily a big consumer of workload. Likewise, a frequent operation that is very lightweight is not necessarily worth optimizing. As you plan your workloads, try to identify those that spend a high amount *over time*. These are the ones that you want to try to optimize.

## The total calculation of an action

Like we've done a few times in this article series, we'll have a look at how running an action is akin to the "entry ticket" metaphor.

<figure><img src="/files/zwVQuyhzK0aVHrLS0vwD" alt="" width="375"><figcaption></figcaption></figure>

In the example above, we want a list of Products to have a price that's an average of another list of products. Let's look at what we're doing:

* First, we're starting the *Make changes to a list of things* action
  * The total cost of the operation depends on the volume of the list and the number of changes being made
* Then, we perform a *Do a search for* to find the list of Products we want to make changes to
* Then, to make the requested change, we use another *Do a search for* and add the *average* operator to calculate the final price.

As we've seen in some of the earlier examples, it's important to be aware of the total work we're asking the server to do. We are not just running the *Make changes to a list* action, but also performing two database queries (Do a search for).

There are not necessarily any more efficient ways to do this: *Make changes to a list of things* is still more WU-friendly than [*Schedule API workflow on a list*](#user-content-fn-3)[^3] and [recursive workflows](#user-content-fn-4)[^4]. Make changes to a list of things works well for smaller lists (up to a few hundred things), but may [time out](#user-content-fn-5)[^5] if the list is too long.

The purpose is not to caution against the use of this action or its searches, but to further illustrate that WU consumption does not only depend on the specific action, but on other factors, as we listed above.

## Number of actions

The number of server-side[^6] actions in a workflow has an impact on WU. With that in mind, when you develop your app and plan for WU consumption, it makes sense to think of each *action* in isolation rather than each workflow. A workflow in itself doesn't incur any cost; it's just the combination of a trigger and a collection of actions – a folder, if you will.

There are a few things you can do to reduce the number of actions running in a workflow:

* Consider each action and see if it's needed
* Can one or more action be combined into one?
* Do all actions have to be executed every time the workflow runs, or could you stop one or more of them from running by using the [*Terminate this workflow*](#user-content-fn-7)[^7] action?

## Working with lists of things

Some actions work with a list of database things, as opposed to just one thing. Although these actions can be very useful, it's worth noting that processing a list of things demands more from the server compared to handling a single item, resulting in a greater WU cost. Actions include:

* Make changes to a list of things
* Delete a list of things
* Copy a list of things

Using these actions is still less costly than using *Schedule API workflow on a list* or a recursive workflow. As such, it's important to note that we're not cautioning against their use – but merely pointing out that working with lists gives the server more work to do than working with a single item. Knowing that, you can make informed design and development decisions.

## *Do when condition is true* and conditions

*Do when condition is true* works by checking a condition to see if it's true, and executing a workflow if it is. *Do when condition is true* is based on dynamic expressions, that can happen client-side or server-side, depending on what the condition is checking. Let's quickly look at a few examples.

{% hint style="warning" %}
As you plan your app's design and logic for WU, remember that WU management shouldn't be your sole focus. Server-side conditions offer more security compared to client-side ones. Therefore, for processes requiring heightened security, prioritizing security over WU considerations is often the smarter choice. You can read more about this in the article below:

Article: [Page security](/help-guides/security/page-security)\
Article series: [Security](/help-guides/security)
{% endhint %}

#### 1. Checking something in the database (server-side)

The database is stored and maintained securely on Bubble's servers. As such, any condition that requires communication with the database (whether it's creating, reading, updating or deleting something) will incur a slight WU cost.

<figure><img src="/files/EHwKq6ntLMmEbcvL97cc" alt="" width="375"><figcaption><p>In this example we are running a workflow if he number of users in your app exceeds 100. Note that <em>Every time</em> is checked, which means that every time a new user is added to your app, the condition will be re-checked and the workflow will run.</p></figcaption></figure>

It should be noted that this communication with the server can happen more often than you think:

* As the condition is first checked, Bubble performs a database query
* As your database is updated (by that user or anyone else), Bubble's server may send the updated information to the user's device, again incurring a small WU cost

Knowing this, we can again ask a few questions to optimize:

* Is the workflow needed at all?
* Does *Run this - every time* need to be selected, or can I reduce its frequency by instead selecting *Just once*?
* Is there some way we can trigger it by something other than a server-side condition? Such as a client-side condition or user action?
* The condition will usually be checked on page load. In other words, it will be checked every time a user loads a page. Can we avoid this somehow?

There are two lessons you should take away from this. The first is that the condition itself might incur a workload cost. The second is that the actions inside of that workflow may execute more often than you intended if you are not careful when setting up the *Do when condition is true* conditional expression.

#### 2. Checking if an element is visible (client-side)

Let's have a look at another example. In this one, we are checking if a group element is visible in order to trigger the workflow:

<figure><img src="/files/pJh7Lcj9mBLbfAwplq6y" alt="" width="375"><figcaption><p>In this example, we are checking something on the user's device: whether a group is visible. This doesn't need Bubble's server to get involved, and does not incur a WU cost. However, it's less secure.</p></figcaption></figure>

Bubble can verify if a condition holds true directly on the user's device, meaning the check is done client-side and doesn't involve Workload Units (WU). This kind of condition is executed swiftly as it doesn't require server communication, but it's less secure.

Employ client-side conditions for workflows where security isn't a major concern.

### The order in a conditional expression

The order in which you place multiple conditions in a dynamic expression can make a difference in your WU consumption (as well as the speed at which Bubble will complete checking the condition). Before we dive into the example, let's summarize the logic with two simple rules:

* Bubble reads conditions from left to right
* If any step connected with the *and* operator in the conditional expression returns a "no", Bubble will not check the rest of the conditions

In other words, Bubble doesn't do more work than it has to when checking conditions. If a condition has two steps (connected with the *and* operator, as opposed to the *or* operator), and the first condition returns a "no", the second step will be disregarded. You can use this to your advantage. Let's combine the two conditions from our earlier example to see how this can work in practice.

<figure><img src="/files/KnvAZL1VQyMTLwqhC2tU" alt="" width="375"><figcaption><p>In this example, the conditional expression has two steps: the first one is performed client-side, and the second one server-side.</p></figcaption></figure>

In the example above, the condition has two steps, combined with the *and* operator:

1. Is the element called *Group example* visible?
   * and
2. Is the number of users in the database more than 100?

If the first condition returns a "no", Bubble will not check the second, meaning that in that case, the condition has not incurred any WU cost. If you used the *or* operator, Bubble would have to check both of them, since any of them being true would return a "yes."

The example above would also be secure than only using a client-side condition. If a user was able to somehow manipulate the first step to return a "yes" you didn't intend, the second server-side condition still cannot be tampered with and will return the correct response.

## Summary

<details>

<summary>Summary: Workflows, actions and workload</summary>

Let's go over the points we've covered in this article:

* Workflows start with low impact but can increase in workload with added expressions and server-side actions.
* Prioritize workflows that are both high in workload and frequently executed.
* Consider overall workload, including associated database queries, not just the action itself.
* Merge actions when possible and use "Terminate this workflow" to stop unnecessary operations.
* Operations on lists are more demanding than single items.
* Faster and don't add to workload but offer less security.
* Bubble stops evaluating "and" conditions after a "no," which can reduce workload.
* Optimize workflows for workload without compromising security or user experience.

</details>

## Other ways to learn

<details>

<summary>Articles</summary>

* Article series: [Workflows](/help-guides/logic/workflows)
* Article: [Custom events](/help-guides/logic/workflows/events/frontend-events/custom-events) (including *Do when condition is true*)

</details>

<details>

<summary>Videos</summary>

* [Using the *Do when condition is true* event](https://www.youtube.com/watch?v=6mqbQ37y32c)

</details>

[^1]: A *workflow* consists of a trigger and the subsequent actions that are executed when that trigger is activated. In the context of WU, server-side actions and any server-side conditions on or inside the workflow will incur a WU cost.\
    \
    Article: [Workflows](/help-guides/logic/workflows)

    Article: [Client-side and server-side](/help-guides/security/client-side-and-server-side)

[^2]: *Dynamic expressions* are like "live" formulas that update in real-time based on user input, database updates and other changes in your app.

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^3]: The *Schedule API workflow on a list* action is used to schedule one of you're app's API workflows internally (as opposed to it being executed from an external app or system).\
    \
    Article series: [API Workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows)

[^4]: A *Recursive workflow* in an API workflows that schedules itself to run more than once. This can be used to run them sequentially.\
    \
    Article: [Recursive API workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/recursive-api-workflows)

[^5]: To *time out* means that the action stops running because it takes too long to finish. You can read more about Bubble's different hard limits, such as timeouts, in the article below:\
    \
    Article: [Hard limits](/help-guides/maintaining-an-application/performance-and-scaling/hard-limits)

[^6]: *Server-side* actions are actions that require the Bubble server to perform some work, as opposed to the user's device (client-side). In the context of WU, only server-side actions incur a cost.\
    \
    Article: [Client-side and server-side](/help-guides/security/client-side-and-server-side)

[^7]: The *Terminate this workflow* stops a workflow, preventing any subsequent actions from being executed.

    Reference: [Terminate this workflow](/core-resources/actions/navigation#terminate-this-workflow)
