# Recurring event
> Source: https://manual.bubble.io/core-resources/events/recurring-event · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

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

Note that the schedule is set when the recurring event is first triggered by the [*Set/cancel a recurring event*](/core-resources/actions/custom#set-cancel-a-recurring-event) action. The interval is calculated that time onwards.

### Event name

Enter the name of the workflow[^5]. The name does not affect the workflow in any way.

### Type of thing

A recurring event requires a thing[^6] to run on. Define the type here.

### Ignore privacy rules when running the workflow

A recurring workflow[^5] is run [with the current user in context](#user-content-fn-7)[^7]. All [privacy rules](#user-content-fn-8)[^8] apply accordingly. Sometimes you want the workflow to bypass these rules and be run as an admin user who has all rights on the data, even when run without authentication.

Check this box to bypass the privacy rules set in the Privacy section in the Data Tab.

**Warning**: Because these are security and privacy options, use this feature with caution.

{% hint style="warning" %}
**Note:** In very rare circumstances, it's possible for a recurring event to get in a bad infinite loop rescheduling itself. If this happens, you can pause the Scheduler, bulk delete all the extraneous scheduled tasks, unpause the Scheduler, and try again.
{% endhint %}

### Timezone selection

Override the recurring event's timezone by setting an alternative timezone with a static or dynamic choice.

{% hint style="info" %}
For this setting to be available you must first enable the setting *Enable timezone override controls* in your app's [general settings](/core-resources/application-settings/general#enable-timezone-override-controls).
{% endhint %}

## Plan limits

Recurring events have limits on the number of recurring events per thing[^9] in the database. The limits are as follows:

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

[^5]: A *workflow* is the combination of an event and one or more actions.

    Article: [Workflows](/help-guides/logic/workflows)\
    Reference: [Workflows](/core-resources/workflows)

[^6]: A *thing* is any type of data that Bubble can manage, such as a database thing, a user, a text, a number, or a date.

    Article series: [Data](/help-guides/data)

[^7]: This means that the workflow is registered as triggered by the current user in all iterations. As such, any data you access in the workflow is subject to the privacy rules that apply to that data/user.

    Article: [Privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

[^8]: *Privacy rules* are constraints that are set on the server-level to protect unauthorized access to database data.

    Article: [Privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

[^9]: A database *thing* is a single record of any data type in the Bubble database.

    Article series: [The database](/help-guides/data/the-database)
