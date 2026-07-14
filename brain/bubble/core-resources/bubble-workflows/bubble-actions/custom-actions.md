# Custom actions
> Source: https://manual.bubble.io/core-resources/bubble-workflows/bubble-actions/custom-actions · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

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
This core reference entry covers how to trigger, schedule, and cancel custom events. For more information on how to create custom events, see the entries below.

Reference: [Events](/core-resources/bubble-workflows/bubble-events) | [Custom events](/core-resources/bubble-workflows/bubble-events/frontend-event-properties/custom-event-properties)
{% endhint %}

## Return data

This action passes a return value back to the workflow that triggered the custom event. When Bubble encounters a valid *Return data* action, the workflow stops and returns the value immediately.

If the custom event's return value isn't optional, at least one *Return data* action without a condition is required.

### Return value

The value to return. Must match the type defined for the return value on the custom event. The returned value is accessible in other workflows as the result of that custom event.

## Schedule a custom event

This action runs a custom event at a set time in the future. If the user leaves the page before the scheduled time, the workflow won't run. Unlike *Trigger a custom event*, workflows run by this action run independently from — and possibly in parallel with — the workflow that initiated it.

### Custom event

The custom event to schedule.

### Workflow parameters

The parameters defined at the custom event level.

### Delay

The number of seconds to wait before running the custom event. Fractional values are accepted.

## Set/cancel a recurring event

This action schedules or cancels a recurring workflow on a thing. Only one recurring event can be active per database thing at a time. Setting the frequency to *None* cancels the recurring event.

### Recurring event

The recurring event to schedule or cancel. These are defined in the *Backend workflows* page, found in the application menu above the palette.

### Workflow thing

The thing to attach the recurring workflow to. Must be the same type as the recurring event.

### Frequency

How often the workflow runs. Choose from *None*, *Weekly*, *Monthly*, *Quarterly*, and *Yearly*. Setting this to *None* cancels the recurring event.

{% hint style="warning" %}
The frequency options available may vary depending on your app's plan. See the [Pricing page](https://bubble.io/pricing) for up-to-date information.
{% endhint %}

### Start date

The date to start the recurring event. If the action is run on a thing that's already scheduled, the start date must be after the original next run date — otherwise it will be pushed back by one period.

## Trigger a custom event

This action triggers a custom event defined on the current page. Custom events are a way to share workflows and actions across the different workflows on a page.

### Custom event

The custom event to trigger.

### Workflow parameters

The parameters defined at the custom event level.

## Trigger a custom event from a reusable element

This action triggers a custom event that belongs to a reusable element. Defining custom events in a reusable element lets you build a shared library of workflows that can be used across pages and reusable elements in your app.

### Reusable element

The reusable element whose custom event you want to trigger.

### Custom event

The custom event to trigger. Only custom events from the selected reusable element are shown.

### Workflow parameters

The parameters defined at the custom event level.

## Trigger a custom event when data changes

This action watches a specific field on a thing and triggers a custom event once when that field changes. The custom event must have a parameter that matches the type of thing being watched — the thing is passed to the custom event when it runs.

Keep in mind that the event only triggers while the page remains open, and must be called again if the page is closed or reloaded. It also only triggers once per call of this action.

### Custom event

The custom event to trigger when the field changes.

### Parameter

The thing to watch. Must match the type of the custom event's parameter.

### Field

The field to watch for changes. If the value of this field changes, the custom event is triggered.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.
