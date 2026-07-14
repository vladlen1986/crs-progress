# Database trigger event
> Source: https://manual.bubble.io/core-resources/events/trigger-event · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Database trigger events execute server-side when a specific change happens in the database, regardless of how the change was made.

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:red;">**advanced-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (13)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**Database trigger events**

* Article: [Database trigger events](/help-guides/logic/workflows/events/backend-events/database-trigger-events)
* Article: [Client-side and server-side](/help-guides/security/client-side-and-server-side)\
  Client-side means that a workflow is executed in whole on the Bubble server. Client-side means that the workflow may include part, such as the event, on the user's device.

***

#### **Workload**

To understand how the workload metrics works, and how you can optimize for it, you may find the following articles useful:

* Article series: [Pricing and workload](/account-and-marketplace/account-and-billing/pricing-plans)
* Article series: [Optimizing for workload](/help-guides/workload)

***

#### **Logic**

Workflows is a part of the *Logic* series in the user manual.

* Article series: [Logic](/help-guides/logic)
  * Article: [The frontend and backend](/help-guides/logic/the-frontend-and-backend)
  * Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)\
    Dynamic expressions are used both to set up conditions, and are highly useful in different actions that you may want to add to your workflows.
  * Article: [Conditions](/help-guides/logic/conditions)\
    Conditions are used to determine whether a workflow or action should run or not, by checking whether something is true.
  * Article series: [Workflows](/help-guides/logic/workflows)
    * Article: [Events](/help-guides/logic/workflows/events)
    * Article: [Actions](/help-guides/logic/workflows/actions)
* Article series: [Navigation](/help-guides/logic/navigation)\
  Using workflows to let the user navigate between pages and page sections.

***

#### Debugging

All apps have the occasional bug, and our debugging tools help you squish them efficiently. The debugger helps you go through workflows step by step to see how they perform and the values they return.

Article series: [Debugging your application](/help-guides/getting-started/navigating-the-bubble-editor/tools/using-the-debugger)
{% endtab %}

{% tab title="Videos (2)" %}

* Bubble Academy: [The Workflow Tab: Bubble Introduction Series \[4/10\]](https://www.youtube.com/watch?v=jbzl8EaAk_g\&t=3s)
* Bubble Academy: [Understanding Workflow Execution Rules](https://www.youtube.com/watch?v=IbhCrciOKHM\&t=41s)
  {% endtab %}
  {% endtabs %}

The database trigger event triggers whenever specific data is changes in the database. It is defined in the [backend workflow editor](#user-content-fn-2)[^2].\
\
Whenever a database thing of the specified type is modified, Bubble checks the "Only when..." condition[^3] of the event. If the condition returns a *yes,* the workflow runs.

* You first set the *Type* of data on the event. This instructs Bubble what data[^4] type to watch.
* Then, use the *Only when*... field to set a condition[^3] for what kind of changes should trigger the event

Database trigger events are kicked off by any change to the data, regardless if the change is initiated by a workflow, an API call, or from manually editing the data in the editor.

[User manual](/help-guides/workload/optimizing-workload/optimization-checklist/backend-workflows#database-trigger-events)

## *Thing before change* and *thing now*

When working with database trigger events, two unique data sources become available:

* [Thing before change](#user-content-fn-5)[^5]
* [Thing now](#user-content-fn-6)[^6]

"Thing" will change to match the type of thing you are working with. You can reference these two data sources in the condition on the event itself, and in any actions within the database trigger event workflow.

## If a thing is created or deleted

Triggers are also fired when a thing is [created](#created) or [deleted](#deleted).

### Created

If a thing is created, its [*`thing before change`*](#user-content-fn-5)[^5] data source will return an empty value, since there is no former thing to refer to. To check whether a thing was created, you can use the condition `Thing before change is empty`.

### Deleted

If a thing is deleted, its [*`thing now`*](#user-content-fn-6)[^6] data source will return an empty value, since the change made to the thing was to remove it altogether. To check whether a thing was deleted, you can use the condition `Thing now is empty`.

## Precautions

There are a few caveats and precautions you should be aware of when using trigger events.

### Multiple changes in one workflow

If a workflow[^7] modifies a thing [multiple times](#user-content-fn-8)[^8], database trigger events will only triggers once:

* *Thing before change* will reflect the data in the thing before any changes were made, and *Thing now* will reflect the data in the thing after the last change has happened.

### Privacy rules

The following guidelines are important to note regarding [privacy rules](#user-content-fn-9)[^9]:

* You can refer the *Current user* in an action in the database trigger event workflow
* Unlike other workflows, database trigger events **run with full administrative privileges**
  * This means privacy rules are **not** applied to any actions and expressions within that workflow
  * Searches performed within the workflow will return **all** results, not just the results the current user is allowed to see

### Triggers cannot kick of other triggers

A database event trigger cannot kick off a second triggers:

* if data is modified by a workflow initiated by a trigger, Bubble does not check to see if those modifications are eligible for initiating *other* trigger events.
* You can get around this by scheduling a separate custom event or API workflow from the original database trigger event workflow. Any database change made by this second workflow will trigger as expected.
  * This method will consume more workload
  * Also, while sometimes necessary, it should be used with caution, since it can easily set up a cascade or loop of workflows that can spend significant resources and possible lead to data corruption

### Data source availability

The *Only when...* condition can only use [`Thing now`](#user-content-fn-6)[^6] and [`Thing Before Change`](#user-content-fn-5)[^5] instead of the full list of Bubble data sources. The full list of data sources are available in the actions kicked off by the trigger.

{% hint style="warning" %}
**A note on workload:** keep in mind that workflows kicked off by triggers consume server capacity, like any other Bubble workflow. If your application kicks off multiple trigger workflows every time data is modified, this can add up to a lot of overhead to the total capacity used by your application.

To control this, use strict Only when... conditions to make sure you are only running trigger workflows when you need to.\
\
Article series: [Pricing and workload](/account-and-marketplace/account-and-billing/pricing-plans)
{% endhint %}

{% hint style="info" %}
**Note:** If you have more than 20 database triggers that kick off at once, the remaining triggers will be scheduled[^10] to protect your app's infrastructure from consuming too much memory.
{% endhint %}

### Event name

Enter the name of the workflow[^7].

### Type of thing

A database trigger event watches a certain [type of thing](#user-content-fn-11)[^11] for changes[^12]. Define the type here.

### Timezone selection

Override the backend trigger's timezone by setting an alternative timezone with a static or dynamic choice. For this setting to be available you must first enable the setting *Enable timezone override controls* in your app's [general settings](/core-resources/application-settings/general#enable-timezone-override-controls).

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: The backend workflow editor lets you set up server-side workflows and API workflows.

    Article: [The frontend and backend](/help-guides/logic/the-frontend-and-backend)\
    Article: [Backend events](/help-guides/logic/workflows/events/backend-events)

[^3]: A *condition* is a dynamic expression that returns a *yes* or *no* value, to determine whether to go ahead with something. In this context, the *yes/no* value would instruct Bubble whether to trigger an event or not.

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

    Article: [Conditions](/help-guides/logic/conditions)

[^4]: As the name suggests, database trigger events watch **database** data types specifically.

[^5]: *Thing before change* returns the thing as it looked **before** the change happened.

    For example, if a change was made to a user, renaming them from "John" to "Jonathan", the thing before change will return John.

[^6]: *Thing now* returns the thing as it looks **after** the change happened.

    For example, if a change was made to a user, renaming them from "John" to "Jonathan", the thing now change will return Jonathan.

[^7]: A *workflow* is the combination of an event and one or more actions.

    Article: [Workflows](/help-guides/logic/workflows)\
    Reference: [Workflows](/core-resources/workflows)

[^8]: Meaning that there is more than one *Make changes to a thing* or similar action in the same workflow.

[^9]: *Privacy rules* are constraints that are set on the server-level to protect unauthorized access to database data.

    Article: [Privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

[^10]: Scheduled in this context means that Bubble will queue the workflows to run with slight delays to avoid overloading the server.

[^11]: A type of thing means any type of data that Bubble works with. In the context of database trigger events, this applies only to things in the database such as *Users* and any custom data type you create.

[^12]: Change in this context means any editing in the database, such as creating a thing, deleting a thing or making changes to any of the fields on a thing.
