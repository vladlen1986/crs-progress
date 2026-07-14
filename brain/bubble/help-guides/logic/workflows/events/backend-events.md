# Backend events
> Source: https://manual.bubble.io/help-guides/logic/workflows/events/backend-events · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers backend events, which are events that trigger on Bubble's server

Backend events are the triggers that happen on Bubble's **server**. They can be triggered by a few different conditions:

* They can be scheduled to trigger at a specific time with the *Schedule an API workflow* action
* They can be triggered by an API call from an external app
* They can trigger as a response to a change in the database
* They can be set to run at a specific interval

## How are backend events different from frontend events?

Backend events are handled completely by Bubble's server, and does not involve the user's device at all, whereas a frontend event will be passed from the user's device to the server.

This has a few implications, the most important being that they are always accessible. A page will stop doing any work as soon as it's closed, but the server is available 24/7.

* Frontend events are the triggers that happen on a **page.** It's often – but not always – initiated by a user. Frontend events will only trigger as long as the page is open.
* Frontend events can still lead to actions happening on the server – but the *event* (or trigger) happens on the page.

## Triggering an event at a specific time

You can schedule a backend event to trigger at a specific time. This is a part of the [Bubble Workflow API](#user-content-fn-1)[^1] and is done in the following away:

1. In the backend editor, create a new [API Workflow](#user-content-fn-2)[^2] that contains all the actions that you need to perform
2. Use the *Schedule API Workflow* to set the workflow to run at a specific time.

{% hint style="info" %}
If you want to learn more about how to create and schedule API Workflows, check out our dedicated articles on these subjects:

Article: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api) (start here if you are unfamiliar with the Workflow API)

Article: [Creating API Workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/creating-api-workflows)

Article: [Scheduling API Workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/scheduling-api-workflows)
{% endhint %}

Note that the *scheduling* is not the event – the event happens when the workflow is triggered at the specified time. As such, the scheduling can happen both on the frontend and the backend, but the *event* will happen on the backend. As such it's available even if the user closes your app.

## Triggering a workflow from an external application

By using the Bubble Workflow API you can also trigger a workflow from an external application. To do this:

* Create an API Workflow in the backend editor, and make sure that *Expose as a public API workflow* is checked
* Set up the external application to send a request to the workflow's endpoint

{% hint style="info" %}
If you want to learn more about how to create API workflows and expose them to external apps, check out our dedicated articles covering this subject:<br>

Article: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api) (start here if you are unfamiliar with the Workflow API)

Article: [API Workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows)

Article: [Creating API Workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/creating-api-workflows)
{% endhint %}

## Triggering an event when data changes in the database

You can set up an event in the backend to start running a workflow whenever something specific is changed in the database by using [Database trigger events](#user-content-fn-3)[^3]. For example, let's say you are running an eCommerce app and you want to send an email whenever a data type called *Order* has a field called *Completed purchase* set to *yes.*

By combining a *Database trigger event* with an expression[^4], you can specify exactly what kind of changes you want the event to respond to and run a workflow accordingly.

1. Create a *Database trigger event* in the backend editor
2. Specify the conditions for the trigger in the *Only when* field

<details>

<summary>Articles</summary>

If you want to learn more about creating Database trigger events, check out our dedicated article:

Article: [Database trigger events](/help-guides/logic/workflows/events/backend-events/database-trigger-events)

</details>

## Running a workflow at a specific interval

There are two ways you can set up workflows to run at an interval such as once per day/week/month:

### Recurring events

{% hint style="info" %}
The settings for recurring events vary based on the plan that you have subscribed to. You can check our pricing comparison page to learn more:

Page: [Bubble pricing](https://bubble.io/pricing/compare)
{% endhint %}

[Recurring events](#user-content-fn-5)[^5] are events that are built specifically to trigger:

* Daily
* Weekly
* Monthly
* Quarterly
* Yearly

They consist of two parts:

* The recurring event, which contains the workflow to run and the database thing to run it on
* The action Set/Cancel a recurring event which runs the first instance of the workflow and instructs Bubble at what frequency it should run.

### Recursive workflows

Recursive workflows are workflows that re-schedule themselves by using the *Schedule API workflow* as an action and picking the same workflow as the one that contains the action. Since you can set a dynamic time to schedule the next cycle, this gives you a way to set an interval freely.

Recursive workflows are a bit more complicated to set up, but offer more flexibility than Recurring events and are available on lower-tier plans.

{% hint style="info" %}
To learn more about how to use recursive workflows, you can check out our dedicated article on the subject:

Article: [Recursive workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/recursive-api-workflows)
{% endhint %}

{% hint style="warning" %}
Using recursive workflows can potentially lead to infinite recursion, resulting in significant workload unit (WU) consumption. Starting on **July 1st, 2024**, Bubble will apply a default setting to terminate recursive workflow chains at 10 iterations for all new apps.

This means you need to either disable this feature or set a higher limit (recommended) if you plan to use recursion, or else any **recursive workflow chain will be terminated after 10 iterations.**

Article: [Infinite recursion protection](/help-guides/workload/tracking-workload/monitoring-workload/infinite-recursion-protection)
{% endhint %}

## Overriding timezones

{% hint style="info" %}
Overriding timezones in the backend requires that you activate the advanced setting *Enable timezone override controls* in your app's general settings.

Reference: [Application settings: Advanced](/core-resources/application-settings/general#advanced-options)
{% endhint %}

Some backend workflows allow you to override the *Current user's current timezone* by setting an alternative timezone with a static or dynamic choice. In practice, the timezone replacement works as following:

* **API Workflows:** override the time zone of the API request
* **Recurring event:** override the time zone in which the recurring event was first scheduled
* **Database trigger event**: Override the time zone in which the change happened (i.e. the user's timezone when the change was made)

This helps you standardize the way in which your app parses and stores data. For example:

* if you parse **1/1/2000 from Eastern Time** and keep the default setting, Bubble will save that date as **1/1/2000 12:00 AM Eastern Time**
* If you instead override the client timezone with Pacific Time, selecting 1/1/2000 will save **1/1/2000 12:00 AM Pacific Time**

This type of timezone standardization is useful in different scenarios:

* Where an external API request includes a timestamp, but not a timezone: you can set a static or dynamic timezone when that call is received to ensure its properly parsed
* Apps that deal with scheduling where the timezone of the scheduled appointment needs to remain constant: for example, if a user books a conference in London from Tokyo, your app can ensure that the timezone used is indeed London and not Tokyo.

{% hint style="info" %}
Overriding timezones is not just available in backend workflows. It can also be set on individual input forms and on pages.

Reference: [Input forms](/core-resources/elements/input-forms)

Reference: [The page element](/core-resources/elements/page-element#time-zone-selection)
{% endhint %}

## Other ways to learn

<details>

<summary>Articles</summary>

To learn more about the different features and methods mentioned in this article, see the articles below.

Article: [Database trigger events](/help-guides/logic/workflows/events/backend-events/database-trigger-events)\
Article: [API workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows)\
Article: [Recurring events](/help-guides/logic/workflows/events/frontend-events/recurring-workflows)

</details>

[^1]: The Workflow API is the part of Bubble's [built-in API](#user-content-fn-6)\[^6] that lets you set up workflows that can be triggered from an external application or system by sending an API request or by scheduling an API workflow in your app.\
    \
    Article: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)\
    Reference: [The Workflow API](/core-resources/api/the-bubble-api/the-workflow-api)

[^2]: *API workflows* are server-side workflows that you can schedule/trigger in your application and/or expose to be triggered from an external application or system through an API request. API Workflows are part of the Bubble Workflow API.\
    \
    Article: [API Workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows)\
    Article: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)

[^3]: *Database trigger events* are events that watch for specific changes in the database, and trigger a workflow any time a change in data happens.

[^4]: Dynamic expressions are like "live" formulas that update in real-time based on user input, database updates and other changes in your app.\
    \
    Article: Dynamic expressions

[^5]: Recurring events are backend events that run on a thing at a specific interval such as once per day or once per week.\
    \
    Reference: [Recurring events](/core-resources/events/recurring-event)
