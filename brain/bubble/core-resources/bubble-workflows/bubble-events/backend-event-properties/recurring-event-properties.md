# Recurring event properties
> Source: https://manual.bubble.io/core-resources/bubble-workflows/bubble-events/backend-event-properties/recurring-event-properties · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Events that trigger on the Bubble server at a specific interval.

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:red;">**advanced-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (5)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**Workflows**

* Article series: [Workflows](/help-guides/logic/workflows)
  * Article: [Events](/help-guides/logic/workflows/events)
  * Article: [Actions](/help-guides/logic/workflows/actions)

***

#### **Recursive API workflows**

An alternative way to set up recurring backend workflows is to use recursive workflows. These are not scheduled at a set interval, but are instead workflows that include an action that re-schedules the workflow when it's finished.

This method will consume more workload[^2], but allows for [dynamic recursion times](#user-content-fn-3)[^3].

Article: [Recursive API workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/recursive-api-workflows)

***

#### The frontend and the backend

To learn more about the difference between frontend and backend workflows, we recommend the article below.

* Article: [The frontend and the backend](/help-guides/logic/the-frontend-and-backend)

***

#### Debugging

All apps have the occasional bug, and our debugging tools help you squish them efficiently. The debugger helps you go through workflows step by step to see how they perform and the values they return.

Article series: [Debugging your application](/help-guides/getting-started/navigating-the-bubble-editor/tools/using-the-debugger)
{% endtab %}

{% tab title="Videos (2)" %}
Bubble Academy: [The Workflow Tab: Bubble Introduction Series \[4/10\]](https://www.youtube.com/watch?v=jbzl8EaAk_g\&t=3s)\
Bubble Academy: [Understanding Workflow Execution Rules](https://www.youtube.com/watch?v=IbhCrciOKHM\&t=41s)
{% endtab %}
{% endtabs %}

## Recurring event

Recurring events are defined in the [backend workflow editor](#user-content-fn-4)[^4]. Recurring events can be set to trigger at the following schedules:

* None
* Daily
* Weekly
* Monthly
* Quarterly
* Yearly

{% hint style="info" icon="clock" %}
The schedule is set when the recurring event is first triggered by the [*Set/cancel a recurring event*](/core-resources/bubble-workflows/bubble-actions/custom-actions#set-cancel-a-recurring-event) action. The interval is calculated that time onwards.
{% endhint %}

## Properties

<figure><img src="/files/qEoNDVay10yULrXtb6vs" alt=""><figcaption></figcaption></figure>

### Recurring Event Name

Enter the name of the event. The name does not affect the workflow in any way.

### Type of thing

A recurring event requires a thing[^5] to run on. Define the type here.

### Ignore privacy rules when running the workflow

A recurring event runs in the [context of the current user](#user-content-fn-6)[^6], so all relevant [privacy rules](#user-content-fn-7)[^7] are applied. In some cases, you may want the workflow to bypass these rules and run with admin-level permissions, with full access to data even without user authentication.

Check this box to bypass the privacy rules set in the Privacy section in the Data Tab.

{% hint style="danger" icon="lock" %}
**Warning**: Because these are security and privacy options, use this feature with caution.
{% endhint %}

{% hint style="warning" %}
**Note:** In very rare circumstances, it's possible for a recurring event to get in a bad infinite loop rescheduling itself. If this happens, you can pause the Scheduler, bulk delete all the extraneous scheduled tasks, unpause the Scheduler, and try again.
{% endhint %}

### Timezone selection

Override the recurring event's timezone by setting an alternative timezone with a static or dynamic choice.

| Time zone selection                | Description                                                                 | Sub-properties                                                                                                                                                                                                                                                                |
| ---------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Timezone where event was scheduled | Uses the time zone reported from the browser of the user setting the event. |                                                                                                                                                                                                                                                                               |
| Static choice                      | Set a static time zone from a dropdown.                                     | **Time zone ID:** sets the time zone ID you want to use.                                                                                                                                                                                                                      |
| Dynamic choice                     | Set a time zone from a dynamic expression.                                  | <p><strong>Dynamic time zone</strong>: sets the time zone ID using a dynamic expression.<br><br>Must match the <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">IANA time zone format</a> (also known as the tz database or Olson database format).</p> |

{% hint style="info" %}
For this setting to be available you must first enable the setting *Enable timezone override controls* in your app's [general settings](/core-resources/application-settings/general#enable-timezone-override-controls).
{% endhint %}

## Plan limits

Recurring events have limits on the number of recurring events per thing[^8] in the database. The limits are as follows:

| Plan    | Recurring events per thing |
| ------- | -------------------------- |
| Starter | 1                          |
| Growth  | 5                          |
| Team    | 20                         |

You can read more about our pricing plans on the page below.

Page: [Bubble plans](https://bubble.io/pricing)

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: *Workload* is the metric used to calculate the total work the server has to do to power your app.

    Article series: [Workload and pricing](/account-and-marketplace/account-and-billing/pricing-plans)\
    Article series: [Optimizing for workload](/help-guides/workload)

[^3]: This means that you can specify dynamically when the next iteration should take place, as opposed to a set value like "weekly".

[^4]: The backend workflow editor lets you set up server-side workflows and API workflows.

    Article: [The frontend and backend](/help-guides/logic/the-frontend-and-backend)\
    Article: [Backend events](/help-guides/logic/workflows/events/backend-events)

[^5]: A *thing* is any type of data that Bubble can manage, such as a database thing, a user, a text, a number, or a date.

    Article series: [Data](/help-guides/data)

[^6]: This means the workflow is treated as being triggered by the current user in every iteration. As a result, any data accessed in the workflow is governed by the privacy rules that apply to that user and that data.

    Article: [Privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

[^7]: *Privacy rules* are constraints that are set on the server-level to protect unauthorized access to database data.

    Article: [Privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

[^8]: A database *thing* is a single record of any data type in the Bubble database.

    Article series: [The database](/help-guides/data/the-database)
