# Backend workflows
> Source: https://manual.bubble.io/help-guides/workload/optimizing-workload/optimization-checklist/backend-workflows · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
This article focuses on backend workflows from the perspective of optimizing for workload unit (WU) consumption. For a more general introduction to backend workflows, you can read the article series below:

Article series: [Backend workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows)
{% endhint %}

{% hint style="info" %}
This article series on workload will sometimes reference documentation shared in other parts of the series, as well as the core reference entry for workload. We recommend you get to know the core reference entry, and proceed to read the series as a whole (in that order).

Reference: [Pricing and workload](/account-and-marketplace/account-and-billing/pricing-plans)\
Article series: [Optimizing for workload](/help-guides/workload)
{% endhint %}

One of the places that apps can run into an increase in workload consumption is in backend workflows. Let's first agree on what backend workflows are.

[Backend workflows](#user-content-fn-1)[^1] is the umbrella term for all workflows that are created in the *Backend workflows* editor:

* API workflows
* Database trigger events
* Recurring events
* Custom events (that are not on a page)

<figure><img src="/files/hgGJnLjP37RLVPwMvbat" alt=""><figcaption></figcaption></figure>

You can read more about backend events in general in [this article](/help-guides/logic/workflows/events/backend-events).

In the illustration above, we'll focusing mainly on the two first types of workflows:

* API workflows
* Database trigger events

While the two latter types can certainly also spend workload, it's typically the two first that are the primary contributors to system load and warrant optimization.

## API workflows

API workflows can be triggered from outside of your app or inside, depending on how you set them up. An important introductory point is that the work being performed by the workflow will spend workload, regardless of whether it's triggered internally or from an external source.

API workflows consume workload in the following operations:

* Workflow:
  * The scheduling of the workflow (Schedule API workflow/Schedule API workflow on a list)
  * Any condition(s) on the workload
* Actions
  * Any processing done by the actions in the workflow
  * Any condition(s) on any of the actions

What this tells us is that simply looking at the actions does not give you the full picture; the scheduling and conditions also give the server work to do. When you plan workload on the page, you can sometimes perform certain conditions client-side, but it's worth remembering that *everything* that happens in an API workflow is performed server-side.

### The scheduling

Scheduling an API workflow consumes a tiny bit of workload. For one-off operations, this is negligible, but if you are repeatedly scheduling new workflows (by setting up [recursive workflows](#user-content-fn-2)[^2] for example), this part of the workflow can accumulate.

Recursive workflow and the *Schedule API workflow on a list* behave a bit differently and as such consume a different amount of workload:

* A **recursive workflow** schedules itself once per time it iterates, until a condition is met. In other words, if you run a recursive workflow on a list of 100 things, the *Schedule API workflow* action will run a 100 times, consuming a tiny portion of workload each time. This also means that recursive workflows are executed sequentially (as opposed to in parallell).
* **Schedule API workflow on a list** schedules all of its workflows in one operation. While that operation may require more workload than scheduling a single API workflow, the on-going re-scheduling of a recursive workflow will in most cases consume more. Schedule API workflow on a list attempts to execute all the operations in parallell (as opposed to sequentially).

As we have emphasized earlier, this doesn't mean that you should always choose one method over the other; it means that you can make an informed decision.

Recursive workflows run in a sequential manner and offer a bit more flexibility. *Schedule API workflow on a list* is faster to configure and typically completes more swiftly, while consuming less WU. It can also be directly executed from the database editor using the Bulk feature.

### Conditions

Conditions can be placed on the workflow/event itself, or on any of the action steps inside. Conditions are a double-edged sword since they can both *save* workload and *consume* workload, depending on how they are used. Let's look at each case:

#### Saving workload with conditions

Conditions tell a workflow or action whether it should run or not. As a result, a condition can stop a workflow or action from ever triggering, saving the workload that would have been spent.

> A condition can stop a workflow or action from ever triggering, saving the workload that would have been spent

Unless a specific workflow or action should *always* run when requested, it makes sense to place a condition on it to stop it from running unnecessarily.

If you are setting up recursive workflows, a condition is also needed to stop the workflow from re-scheduling itself indefinitely.

#### Consuming workload with conditions

With that covered, we can look at the flip side: conditions themselves spend workload. Since everything in an API workflow happens server-side, the condition will spend an amount of server resources no matter how it's set up. As such, there are two questions you can ask yourself:

* Do I need this condition?
* Is there any way I can make this condition spend less workload?

A condition is built with a [dynamic expression](#user-content-fn-3)[^3], just like workflows and element data sources; in other words, they consume the same amount of workload performing the same operation. Let's say for example that you set up a condition that performs a database search, like the example below:

<figure><img src="/files/89rSG2IPFyYDXhT5RZS9" alt="" width="375"><figcaption></figcaption></figure>

In this example, the Bubble server has to perform that search query every single time the API workflow is triggered, which can potentially consume a lot of server resources. Maybe there are ways to make the condition more lightweight, or maybe it's even more performant to run the workflow regardless of the search result (if the workflow is more lightweight than the condition).

As the example illustrates, conditions do spend workload too: the location of a dynamic expression—whether in a condition, workflow, or as a data source in a [repeating group](#user-content-fn-4)[^4]—doesn't exempt it from consuming server resources.

Be mindful of how you structure your conditions to keep them from spending too much. Placing a condition on an action, rather than on the event, incurs the same resource cost. However, halting the workflow at the event step can conserve workload by preventing it from progressing to subsequent action steps.

### Actions

Each action in an API workflow will also spend resources. Again, we need to keep in mind that on the front-end (the page), we can sometimes leverage client-side actions to move some of the processing away from the server, but in an API workflow everything happens server-side.

Once more, our aim isn't to reduce the use of actions to the extent that it compromises the user experience of our app. Rather, it's about recognizing and understanding that every action step in a workflow uses resources. If you are looking to optimize an API workflow, it's worth reflecting on each action step whether:

* It's needed at all
* It could run only when needed, using a lightweight condition
* It could be set up in a more efficient way (see below)

Furthermore, the expressions within each action will also make server queries for processing.

<figure><img src="/files/GXj2p4cb4Ztnjy3ze2Ff" alt="" width="375"><figcaption></figcaption></figure>

In the example above, workload is spent:

* On the action itself (writing data to two fields on the Product data type)
* On *three* searches:
  * First, we search for the product to make changes to
  * Then, we search for and count the number of products (Field 1)
  * Lastly, we search for a user and return their address

This is an action step that likely would benefit from optimization. Perhaps one or more of the searches could be replaced with a parameter[^5] (that is itself not the product of a search) or there are other ways you locate the data without having to search for it. If you need to use searches, make sure that you set them up efficiently:

* Avoid nested searches (searches that use another search as a constraint)
* Avoid advanced filters
* Use as many constraints as you can, so that Bubble can [rule out database things quickly](#user-content-fn-6)[^6]

### Authenticating API clients

It's common for API workflows to require authentication. This mandates that the client present evidence of their identity to execute the workflow, often in the form of a token that Bubble has generated for you.

Authentication is vital not just for security but also to safeguard your server resources. An unprotected API workflow, accessible to anyone aware of its endpoint, leaves your app vulnerable to a flood of requests. This could be from well-intentioned users or malicious actors deploying botnets.

#### Authentication and conditions

Additionally, requiring authentication can give you access to a broader set of conditions for workflows and actions. You can halt an API workflow at the event level using this approach. Examining fields on the user that the client represents offers a lightweight method to determine whether the condition should proceed or be bypassed.

Similarly, while a client may authenticate and gain permission to initiate the workflow, certain action steps might be bypassed based on their identity, saving workload in the process.

### API workflows and privacy rules

Privacy rules are of course necessary to protect your database data from unathorized access, but it too can help you save workload. Privacy rules are essentially search constraints, which means that any query you perform can finish faster and deliver a shorter list of results if you use more constraints.

Privacy rules centralize many of your search conditions based on the client's identity, streamlining the retrieval process for search results.

## Database trigger events

Database trigger events execute whenever a specific change happens in the database. What this means is that whenever something is created, changed or deleted, the event will trigger.

By combining this event with a dynamic expression, you can specify exactly what *kind* of change you want the event to be watching.

### How database trigger events work

Let's first look at the cycle that a database trigger event works through:

* Any database trigger event is connected to one specific data type
* Conditions are normally used to specify exactly what *kind* of change we're looking for
* Whenever *any* change is made on that data type, Bubble will check the condition on the trigger event to see whether it matches.
  * Changes include writing to any field on that data type, as well as things being created and deleted

As that cycle suggests, conditions that you place on a database trigger event will consume a tiny bit of workload even if the condition returns a *no* and the workflow is not triggered. This understanding is the first step to planning efficient database triggers.

That being said, database trigger events have access to a limited list of data sources:

* Thing before change
* Thing after change

What this means is that because you're not able to perform database searches and other resource-heavy operations, the condition on a database trigger event will usually be fairly lightweight.

### Reducing the workload on the trigger

There are a few questions you can ask yourself about each database trigger event that can help you reduce workload:

#### How often is the data type associated with this trigger changed?

In other words; how many times over a given period will Bubble write to the database on *any* record of that specific data type. Keep in mind that for *every* change, Bubble will need to check the condition: if this specific data type changes many times per hour, minute or even second, a considerable amount of resources may be spent simply checking whether the event should trigger or not.

We can illustrate with an example: let's imagine you are building an app with a chat feature similar to WhatsApp or Facebook Messenger. It's in the nature of apps like this to create a lot of new records, as each message is typically saved in the database as a thing. Each individual user could be creating new messages several times per minute, and as your user base grows, this could extend into many times per second. In this scenario, a database trigger event, regardless of the actions it performs, can consume considerable workload, and you may want to find other ways to perform the tasks that the event executes, to avoid spending too much on the condition being repeatedly checked.

#### Can you combine triggers?

It's not uncommon to set up multiple database trigger events for the same data type. While this is not a practice we discourage in any way, there is still a potential to reduce the workload consumption in some scenarios by combining two database trigger events into one.

Take a look at the whole picture: if you can reduce the number of events and actions by combining them, there's a change it consumes less server resources in total.

#### Does it need to be handled by a database trigger event?

Database trigger events are sometimes used to watch for one data type/field to change, and then update another one in response. Let's look at this from two scenarios:

**Scenario 1: use database trigger event to update field**

In scenario 1, a data type is updated by the user in a form in the app using the [*Make changes to a thing*](#user-content-fn-7)[^7] action. The database trigger event reacts, and writes something to the database in response. In this case, workload is spent on the following:

* The original database change
* Starting the evaluation of the database trigger event
  * Checking the condition on the database trigger event
    * Running the actions in the database trigger event workflow

**Scenario 2: make the change in the original workflow**

In scenario 2, instead of using a database trigger event to react to the changes, we make the change using an action in the original workflow on the page. In this case, workload is spent on the following:

* The original database change
* The secondary database change

As you can see, we have reduced one step in this process: Bubble no longer has to spend resources on the database trigger event condition, but instead simply runs the action in the original workflow.

Using method 2 over method 1 can reduce the total workload; as always, it's up to you as the developer to weigh the advantages and drawbacks of each method. Database trigger events provide a reliable way to maintain your database integrity (and will respond even to manual changes in the Bubble database editor), but at the expense of a slightly higher workload cost.

### Actions

Just like with API workflows, each action (and the condition and dynamic expressions in that action) spends server resources. From this point on, database trigger events follow the same logic as [actions in an API workflow](#actions), and the same advice applies.

## Finding the right balance

It's important to yet again emphasize a point: workload is spent doing *work*. In other words, it's not a competition to reduce the metric to its absolute possible minimum. Server-side processes can be an incredibly important resource in your app to maintain security, database integrity, and speed up development. There's no doubt that these concerns can weigh more heavily than workload consumption in many cases, and before you spend your time over-engineering your app to reduce workload, it's worth reflecting on *each* task whether that's the right priority.

Your workload metrics dashboard will give you an overview of where your workload is being spent; use it wisely to prioritize. Sometimes, even the most workload-hungry process *needs* to be there in order for your app to be useful to your users or to allow you to spend time on other optimizations such as new features.

Remember, while this article provides strategies to reduce workload, the exact reduction can be challenging to estimate due to the unique nature of every Bubble project. Sometimes, significant optimization efforts might not bring the results you were hoping for. If you're uncertain about the benefits of a particular optimization, don't hesitate to consult with fellow [forum members](https://forum.bubble.io/) or our [Success team](https://bubble.io/contact).

## Summary

<details>

<summary>Summary: Backend workflows and workload</summary>

* Backend workflows, including API and database trigger events, can increase workload consumption.
* API workflows, triggered internally or externally, consume workload in their scheduling, actions, and any attached conditions.
* The scheduling of API workflows, especially in recursive workflows, accumulates workload over time.
* Conditions in workflows, while potentially saving workload by halting unnecessary operations, also consume resources. All backend conditions are performed server-side.
* Every action in an API workflow incurs server resources. Client-side conditions are not applicable, since all backend workflows are executed on the server.
* Database trigger events are activated by changes in the database and consume workload every time they check conditions.
* Combining multiple database triggers into one and questioning the necessity of each trigger can reduce workload.
* Directly making changes in the original workflow instead of using database trigger events can sometimes be more efficient.
* The balance between necessary server-side processes for security and integrity and workload reduction is crucial.
* Monitoring the workload dashboard helps identify key areas for optimization but remember that not all optimizations yield significant workload reductions.
* Lastly, always keep your users in mind: creating a secure, well-performing app with a good user experience should usually be a higher priority than saving WU.

</details>

[^1]: *Backend workflows* is an umbrella term for all workflows that are scheduled/triggered to run on the server, as opposed to on a page. This includes API workflows, database trigger events and more.\
    \
    Article series: [Backend workflows](/help-guides/logic/workflows/events/backend-events)

[^2]: *Recursive workflows* are API workflows that schedule themselves one or more times, so that they are looped. This is usually done for bulk editing a list of things for example.

    Article: [Recursive API workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/recursive-api-workflows)

[^3]: *Dynamic expressions* are like "live" formulas that update in real-time based on user input, database updates and other changes in your app.

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^4]: A *repeating group* is a container type element used to display a list of things. For example, you can use a repeating group to show a list of users, products or tasks.

    Article: [Repeating groups](/help-guides/design/elements/web-app/containers/repeating-groups)

[^5]: A *parameter* in this context, refers to a specific piece of data or value that is passed into the API workflow from an external system or using the *Schedule API Workflow* action.

    Article section: [API workflows: defining parameters](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/creating-api-workflows#defining-parameters)

[^6]: Database searches are a process of elimination. By adding more constraints, Bubble can rule out things (records) faster and reach the final result using less server resources.

    Article series: [The database](/help-guides/data/the-database)

[^7]: The *Make changes to a thing* action is used to write in the database on an existing thing (record).<br>

    Article: [Creating, saving and deleting data](/help-guides/data/the-database/creating-saving-and-deleting-data)

    Reference: [Make changes to a thing](https://manual.bubble.io/help-guides/workload/optimizing-workload/optimization-checklist/pages/-MTujs88N9W-2FUmQGag#make-changes-to-thing...)
