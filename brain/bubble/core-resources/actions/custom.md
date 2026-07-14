# Custom
> Source: https://manual.bubble.io/core-resources/actions/custom · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Actions that trigger, schedule and cancel custom events and API workflows.

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:orange;">**intermediate-level builders**</mark><mark style="color:green;">**.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (11)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**Custom events**

* Article: [Custom events](/help-guides/logic/workflows/events/frontend-events/custom-events)

***

#### API Workflows

The below article series covers the more advanced API workflow capabilities that Bubble offers. These can be used to schedule server-side operations that run regardless of whether the user still has the page open. They can also be set up to be triggered from the outside, such as from another app.

* Article series: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)

***

**Workflows**

* Article series: [Workflows](/help-guides/logic/workflows)
  * Article: [Events](/help-guides/logic/workflows/events)
  * Article: [Actions](/help-guides/logic/workflows/actions)

***

#### **Logic**

Workflows is a part of the *Logic* series in the user manual.

* Article series: [Logic](/help-guides/logic)
  * Article: [The frontend and backend](/help-guides/logic/the-frontend-and-backend)
  * Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)\
    Dynamic expressions are used both to set up conditions, and are highly useful in different actions that you may want to add to your workflows.
  * Article: [Conditions](/help-guides/logic/conditions)\
    Conditions are used to determine whether a workflow or action should run or not, by checking whether something is true.
  * Article series: [Navigation](/help-guides/logic/navigation)\
    Using workflows to let the user navigate between pages and page sections.

***

#### Debugging

All apps have the occasional bug, and our debugging tools help you squish them efficiently. The debugger helps you go through workflows step by step to see how they perform and the values they return.

Article series: [Debugging your application](/help-guides/getting-started/navigating-the-bubble-editor/tools/using-the-debugger)
{% endtab %}

{% tab title="Videos (3)" %}
Bubble Academy: [The Workflow Tab: Bubble Introduction Series \[4/10\]](https://www.youtube.com/watch?v=jbzl8EaAk_g\&t=3s)\
Bubble Academy: [Understanding Workflow Execution Rules](https://www.youtube.com/watch?v=IbhCrciOKHM\&t=41s)\
Getting started with Bubble: [Workflows and logic: Getting started with Bubble](https://www.youtube.com/watch?v=e-vhoR48QdY)
{% endtab %}
{% endtabs %}

{% hint style="info" %}
This core reference entry covers how you **trigger, schedule** and **cancel** custom events. For more information on how to **create** custom events, see the entry below.

Reference: [Events](/core-resources/events) | [Custom events](/core-resources/events/custom-events)
{% endhint %}

## Trigger a custom event

This action triggers a custom event, which should be defined on the page already. These events are a way to share workflows/actions between the different workflows of the page.

### Custom event

Select the custom event to trigger.

### Workflow parameters

These are the parameters defined at the Custom Event level.

## Trigger a custom event when data changes

This action:

1. Looks for a change in a specific field of a given data type
2. Triggers a custom event once when that change occurs

The action relies on the parameter set in the Custom Event that is triggered when something changes to define the data type. For instance, if the Custom Event has a parameter set to the User type, this action can be employed to execute when a particular user's data is updated.

Keep in mind that:

* The event will only trigger for as long as the page remains open and must be called again if it's closed
* The event will only trigger once for each call of the action

### Custom event

Select the custom event to trigger when the thing changes.

### Parameter

This is the thing to watch for changes. It must be the same type as the parameter of the custom event that will be triggered, and the thing will be sent to the custom workflow. In other words, if the custom event expects a user, this field must be a user, and the custom workflow runs with that user when it changes.

### Field

This is the field we are watching for changes. For example, if the workflow thing is the 'Current user,' and the field is the 'Name,' then if someone changes the 'Current user's name' from Bob to Barbara, the custom event is triggered.

## Schedule a custom event

This action runs the selected custom workflow at a set time in the future. If the user changes the page before the workflow is scheduled to run, it will not happen. Unlike 'Trigger a custom event,' workflows run by this action run independently from and possibly in parallel with the workflow that initiated it.

### Custom event

This is the event that is triggered.

### Workflow parameters

These are the parameters defined at the Custom Event level.

### Delay

Enter the time in seconds to wait before running the custom workflow. Fractional times are accepted.

## Trigger a custom event from a reusable element

This action triggers a custom event that belongs to a reusable element. These events are a way to share workflows/actions between the different pages and reusable elements of the app. Defining them in a reusable element is a way to build a library of workflows.

### Reusable element

Choose the reusable element to use in the custom workflow.

### Custom event

Choose the custom event to trigger. Only custom events from the selected reusable element will appear.

### Workflow parameters

These are the parameters defined at the Custom Event level.

## Return data

This action allows you to use return values within a custom event workflow and pass them back to the workflow that triggered the custom event.

* If the custom event’s return value is not optional, at least one return data action without a condition is required.
* When Bubble encounters a valid return data action, the workflow stops and returns the value immediately.

### Return value

This is what you will return for any return values set for the custom event. It must be the same type as what you set as the return value’s type. This value will then be accessible in other workflows as the result of the custom event when triggered.

## Trigger a backend custom event

This action triggers a backend custom event. Triggering a backend custom event is slightly faster than scheduling an API workflow, since there's no scheduling/queuing. Backend custom events are only accessible from within your own app.

### Backend custom event

Sets the backend custom event to trigger.

### Ignore privacy rules

When enabled, the workflow runs with full privileges. A few important caveats apply:

* The custom event runs as if no privacy rules were in place.
* If the workflow returns data to the original workflow, that data is still limited to what the user is allowed to see.
* Because of this, backend custom events are best suited for answering questions or returning small pieces of data, such as a user's name as text.

{% hint style="warning" icon="lock" %}
**Security note:** When a backend custom event with override privileges returns a single thing, Bubble sends its unique ID to the client, and the record loads even if the user couldn't find it in a search. This is the same mechanic as storing a thing on another thing. Configure privacy rules carefully to **protect all sensitive fields.** If all fields are protected, only the unique ID will be visible on the client.
{% endhint %}

### Parameters

Sets the parameter values to send to the backend custom event. Parameters are defined on the backend custom event, in the backend workflow editor.

## Schedule API Workflow

This action allows you to schedule an API workflow at any point in the future, by selecting the workflow and assigning a time. If you want to run the workflow immediately, you can use the *:current date/time* operator.

### API Workflow

Select the API workflow to run. These are the workflows defined in the Backend workflows page found in the Application Menu above the Palette. If the workflow takes parameters, they are displayed in the Property Editor.

### Scheduled date

Define the date for the workflow execution. Use the expression Composer to define a dynamic date.

### Ignore privacy rules when running the workflow

A scheduled workflow runs in the context of the current user when it is scheduled. All privacy rules apply to that user. To bypass these rules and run as an admin user who has all rights to the data, check this box.

Warning: Because these are security and privacy options, use this feature with caution.

### Workflow parameters

These are the parameters defined at the API Workflow level.

## Schedule API Workflow on a list

This action allows you to schedule the run of an API workflow at a later time, on a list of things. This is useful to iterate on a list of things. Each workflow runs on a single item in the list and each counts as one workflow run.

This action supports lists up to roughly 100,000 records. See our [hard limits article](/help-guides/maintaining-an-application/performance-and-scaling/hard-limits) for more details.

### Type of things

Select the type of things to iterate on.

### List to run on

Define the list to iterate on. It can be the result of a search, an API call, etc.\
Note: the list is defined and evaluated at scheduling time. In other words, if a thing matches the search constraints when the scheduling happens and subsequently gets modified in a way that it doesn't anymore, the API workflow will still run on it.

### API Workflow

Select the API workflow to run. These are the workflows defined in the Backend workflows page found in the Application Menu above the Palette. If the workflow takes parameters, they are displayed in the Property Editor.

### Scheduled date

Define the date for the workflow execution. Use the expression Composer to define a dynamic date.

### Interval (seconds)

The interval instructs Bubble to schedule the workflows with a defined gap.

* **Empty interval:** the default empty state (not zero, but empty) interval for *Schedule API Workflow on a list* schedules workflows with a slight gap. This helps balance completing jobs quickly with allowing other workflows in your app to run at the same time. This behavior reflects how the system typically operates under normal usage conditions. When an app places a heavier load on the system, such as scheduling a very large number of workflows, completion times may vary, in order to keep overall performance stable.
* **0 seconds**: setting the interval to 0 is technically possible, but it has the drawback of blocking other scheduled workflows until the entire batch is completed. To avoid this bottleneck and allow for smoother processing of scheduled tasks, it's often more effective to leave the interval at its default setting. This approach helps in managing the execution flow more efficiently, ensuring that all scheduled workflows are processed without significant delay.
* **Third-party rate limits:** please note that while an interval is no longer needed to protect the performance of your Bubble app, there are some cases where it may be useful. For example, if your workflows are interacting with external APIs with restrictive rate limits, you may use the scheduling interval to slow down execution and avoid HTTP 429 Error responses.
* **Workflows still run in parallel:** Keep in mind that adding an interval does *not* guarantee that the workflows will not overlap – if you need to force API workflows to run sequentially, you can consider using [recursive workflows](#user-content-fn-2)[^2].
* **Hard limits**: keep in mind the hard limits on the lengths of lists that can be scheduled. You can read more about this in the [hard limits](/help-guides/maintaining-an-application/performance-and-scaling/hard-limits) article.

### Ignore privacy rules when running the workflow

A scheduled workflow runs in the context of the current user when it is scheduled. All privacy rules apply to that user. To bypass these rules and run as an admin user who has all rights to the data, check this box.

Warning: Because these are security and privacy options, use this feature with caution.

### Workflow parameters

These are the parameters defined at the API Workflow level.

## Cancel a scheduled API Workflow

This action cancels a scheduled workflow. The workflow is identified by the number returned by the scheduling action.

### Scheduled API ID

Enter the ID, which will most likely be an expression, that contains the ID of the scheduled workflow to cancel.

## Cancel a list of scheduled API Workflows

This action cancels a list of scheduled workflows. The workflows are identified by the number returned by the scheduling action.

### List of scheduled API IDs

Define the expression that will return the dynamic list of IDs, which should be a list of texts.

## Set/cancel a recurring event

This action schedules or cancels a recurring workflow on a thing. This is useful if you want to run something daily, monthly, etc. Only one recurring event can be used per database thing. A frequency of None cancels a recurring event.

### Recurring event

Select the event to run periodically or cancel. These events should be defined in the API Workflow page found in the Application Menu above the Palette.

### Workflow thing

Each recurring workflow should have a thing attached to it. This thing should be of the same type as the recurring event.

### Frequency

Select the frequency to apply to the recurring workflow. Choose from None, Weekly, Monthly, Quarterly, and Yearly. A frequency of None cancels a recurring event.

{% hint style="warning" %}
The **frequency at which you can trigger** recurring workflows may differ based **which plan** your app is on. Please see the [Pricing page](https://bubble.io/pricing) for up-do-date information.
{% endhint %}

### Start date

Select the date to start the recurring event. When running this action on a thing that has already been scheduled, the start date has to be after the original next run date. If not, it will be pushed back by another period.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: *Recursive API workflows* are workflows that schedule themselves in a separate action, forcing them to run one-by-one in a sequential manner. Note that recursive workflows can be WU-intensive.

    Article: [Recursive workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/recursive-api-workflows)
