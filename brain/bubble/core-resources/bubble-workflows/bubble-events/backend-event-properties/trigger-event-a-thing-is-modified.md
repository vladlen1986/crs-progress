# A thing is modified event properties
> Source: https://manual.bubble.io/core-resources/bubble-workflows/bubble-events/backend-event-properties/trigger-event-a-thing-is-modified · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

A thing is modified events execute server-side when a specific change happens in the database, regardless of how the change was made.

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

The *A thing is modified* event is triggered when data in the database is changed. It is configured in the backend workflow editor.

When a thing of the specified data type is modified, Bubble evaluates the *Only when...* condition. If the condition returns yes, the workflow runs.

First, set the *Type of data* on the event to define which data type should be monitored. Then, use the *Only when...* field to specify which changes should trigger the event.

*A thing is modified* events run for any change to the data, regardless of whether the change comes from a workflow, an API call, or a manual edit in the editor.

## Properties

### Event name

Enter the name of the workflow[^2].

### Type

An *a thing is modified* event watches a certain [type of thing](#user-content-fn-3)[^3] for changes[^4]. Define the type here.

### Timezone selection

Override the backend trigger's timezone by setting an alternative timezone with a static or dynamic choice. For this setting to be available you must first enable the setting *Enable timezone override controls* in your app's [general settings](/core-resources/application-settings/general#enable-timezone-override-controls).

| Time zone selection                | Description                                                                 | Sub-properties                                                                                                                                                                                                                                                                |
| ---------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Timezone where event was scheduled | Uses the time zone reported from the browser of the user setting the event. |                                                                                                                                                                                                                                                                               |
| Static choice                      | Set a static time zone from a dropdown.                                     | **Time zone ID:** sets the time zone ID you want to use.                                                                                                                                                                                                                      |
| Dynamic choice                     | Set a time zone from a dynamic expression.                                  | <p><strong>Dynamic time zone</strong>: sets the time zone ID using a dynamic expression.<br><br>Must match the <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">IANA time zone format</a> (also known as the tz database or Olson database format).</p> |

## Data sources

### *Thing before change* and *thing now*

When working with *a thing is modified* events, two unique data sources become available:

* [Thing before change](#user-content-fn-5)[^5]
* [Thing now](#user-content-fn-6)[^6]

"Thing" will change to match the type of thing you are working with. You can reference these two data sources in the condition on the event itself, and in any actions within the *A thing is modified* event workflow.

## Methods

### Triggering when a specific field changes

The event can be configured to trigger only when a specific field changes by using dynamic expressions and the data sources provided by the *A thing is modified* event.

These data sources represent the state of the thing before the change and after the change. By comparing fields between the two, you can detect and target changes to specific fields.

#### Example 1: Price change

In this example, we have a data type *Product* with a field *Price*. We want the event to trigger when a Product is modified, but only **if the change affects the price**.

To do this, compare the value of *Price* before and after the change. If the two values are different, it means the price has been updated, and the event can run.

<pre><code><a data-footnote-ref href="#user-content-fn-7">Product before change's price</a> <a data-footnote-ref href="#user-content-fn-8">is not</a> <a data-footnote-ref href="#user-content-fn-7">Product after change's price</a>.
</code></pre>

#### Example 2: Price increase

In this example, we still have a data type *Product* with a field *Price*. We want the event to trigger when a Product is modified, but only if the price has **increased**.

To do this, compare the value of *Price* before and after the change. If the value after the change is greater than the value before the change, the price has increased and the event can run.

<pre><code><a data-footnote-ref href="#user-content-fn-7">Product before change's price</a> <a data-footnote-ref href="#user-content-fn-8">&#x3C;</a> <a data-footnote-ref href="#user-content-fn-7">Product after change's price</a>.
</code></pre>

### Triggering when a thing is created or deleted

Triggers are also fired when a thing is [created](#created) or [deleted](#deleted).

#### Created

If a thing is created, its [*`thing before change`*](#user-content-fn-9)[^9] data source will return an empty value, since there is no former thing to refer to. To check whether a thing was created, you can use the condition `Thing before change is empty`.

<figure><img src="/files/pUWSePECRJcj4PzRQLrr" alt="Checking if a new database thing was created before triggering the &#x22;A thing is modified&#x22; event."><figcaption><p>The condition checks whether <code>Product before change is empty</code>. If it is, the expression returns yes, indicating that a new Product has been created.</p></figcaption></figure>

#### Deleted

If a thing is deleted, its [*`thing now`*](#user-content-fn-10)[^10] data source will return an empty value, since the change made to the thing was to remove it altogether. To check whether a thing was deleted, you can use the condition `Thing now is empty`.

## Precautions

There are a few important caveats and considerations to keep in mind when using *A thing is modified* events.

### Multiple changes in one workflow

If one workflow[^2] modifies a thing [multiple times](#user-content-fn-11)[^11], *A thing is modified* events will only triggers once:

* *Thing before change* will reflect the data in the thing before any changes were made, and *Thing now* will reflect the data in the thing after the last change has happened.

### Privacy rules

The following guidelines are important to note regarding [privacy rules](#user-content-fn-12)[^12]:

* You can refer the *Current user* in an action in the *a thing is modified* event workflow
* Unlike other workflows, *a thing is modified* events **run with full administrative privileges**
  * This means privacy rules are **not** applied to any actions and expressions within that workflow
  * Searches performed within the workflow will return all results, not just those the current user is allowed to see. Use search constraints to limit the data returned.

### Triggers cannot kick of other triggers

A *a thing is modified* event cannot kick off a second triggers:

* if data is modified by a workflow initiated by a trigger, Bubble does not check to see if those modifications are eligible for initiating *other* trigger events.
* You can get around this by scheduling a separate custom event or API workflow from the original *a thing is modified* event workflow. Any database change made by this second workflow will trigger as expected.
  * This method will consume more workload
  * Also, while sometimes necessary, it should be used with caution, since it can easily set up a cascade or loop of workflows that can spend significant resources and possible lead to data corruption

### Data source availability

The *Only when...* condition can only use [`Thing now`](#user-content-fn-10)[^10] and [`Thing Before Change`](#user-content-fn-9)[^9] instead of the full list of Bubble data sources. The full list of data sources are available in the actions kicked off by the trigger.

{% hint style="warning" %}
**Workload**: workflows triggered by the *A thing is modified* event consume workload like any other Bubble workflow. If your app triggers multiple workflows each time data is modified, this can quickly add significant overhead.

To manage this, use strict *Only when...* conditions to ensure trigger workflows only run when necessary.\
\
Article series: [Pricing and workload](/account-and-marketplace/account-and-billing/pricing-plans)
{% endhint %}

{% hint style="info" %}
**Note:** If you have more than 20 *A thing is modified events* that kick off at once, the remaining triggers will be scheduled[^13] to protect your app's infrastructure from consuming too much memory.
{% endhint %}

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: A *workflow* is the combination of an event and one or more actions.

    Article: [Workflows](/help-guides/logic/workflows)\
    Reference: [Workflows](/core-resources/workflows)

[^3]: A *type of thing* refers to any data type that Bubble works with.\
    \
    In the context of database trigger events, this applies specifically to database things such as *User* and any custom data types you create.

[^4]: In this context, a change refers to any modification in the database, such as creating a thing, deleting a thing, or updating any of its fields.

[^5]: *Thing before change* returns the thing as it looked **before** the change happened.

    For example, if a change was made to a user, renaming them from "**John**" to "**Jonathan**", the thing before change will return **John**.

[^6]: *Thing now* returns the thing as it looks **after** the change happened.

    For example, if a change was made to a user, renaming them from "**John**" to "**Jonathan**", the thing now change will return **Jonathan**.

[^7]: Data source

[^8]: Comparison

[^9]: *Thing before change* returns the thing as it looked **before** the change happened.

    For example, if a change was made to a user, renaming them from "John" to "Jonathan", the thing before change will return John.

[^10]: *Thing now* returns the thing as it looks **after** the change happened.

    For example, if a change was made to a user, renaming them from "John" to "Jonathan", the thing now change will return Jonathan.

[^11]: Meaning that there is more than one *Make changes to a thing* or similar action in the same workflow.

[^12]: *Privacy rules* are constraints that are set on the server-level to protect unauthorized access to database data.

    Article: [Privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

[^13]: Scheduled in this context means that Bubble will queue the workflows to run with slight delays to avoid overloading the server.
