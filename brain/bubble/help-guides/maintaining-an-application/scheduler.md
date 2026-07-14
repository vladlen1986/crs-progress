# API workflow scheduler
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/scheduler · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers the scheduler, which lets you view, pause and delete upcoming scheduled workflows

A scheduled workflow (known as an [API workflow](#user-content-fn-1)[^1]) is a workflow that is scheduled to run on the Bubble server at a specific time. In the *Logs* tab of your application editor, you can access the scheduler to view all upcoming scheduled workflows.

{% hint style="info" %}
The Live and Development environments in your app have separate schedules. If you don't see workflows that you expected to be in the list, check that you are looking at the right environment.
{% endhint %}

## How scheduled workflows are queued

The scheduler is a queue, and can be imagined as a funnel. If a funnel is filled with water faster than the rate at which it drains, it will be congested and it will affect its flow. Similarly, if the scheduler is "filled" with a lot of simultaneous or very shortly spaced workflows, the scheduler can be "congested", leading to delays.

### Avoiding delays

To avoid delays when working with scheduled workflows, follow the recommendations below:

* The more *heavy* the workload of the workflow, the more server capacity it will use. This is both affected by the number of actions in the workflow, and the complexity of those workflows
  * Database operations that work on a large volume of data (searches (especially with advanced filters) and actions that work on a list of things are particularly taxing
  * A high number of actions, and in particular if they depend on each other (such as using *result of step X*) can also slow things down
* If you are scheduling a big number of workflows (by use of Schedule API Workflow on a list or recursively), it helps to consider spacing them out with some time in-between each cycle. How much time depends on the complexity of the workflow and how much capacity your app has in general
  * If the process does not need to finish at the highest possible speed, you can experiment setting a delay time of several seconds to control the capacity.

Overall, server-side workflow are a very powerful feature, but you may find that you need to experiment a bit to learn how to build workflows that don't overwhelm the system.

## Navigating scheduled workflows

To search for scheduled workflows, set a time in the datetime input and click *Show*. Bubble will search for all workflows that are scheduled after the time you have specified. Note that the search can take a little bit of time to finish.

The columns let you see the details for that specific workflow:

**Scheduled time** is the datetime when the workflow is scheduled to run. It will show in the timezone reported by your browser (meaning it may look different to you and the user who scheduled it if you are not in the same timezone).

**ID** is the ID of the scheduled workflow. Every workflow that is scheduled has a [unique ID](#user-content-fn-2)[^2] used to identify that workflow.

**API Event** is the event of the workflow, recognized by the label you have given it in the Workflow editor.

**Current user** is the email of the user that scheduled the workflow

**Parameters** include any custom parameters that were provided when the workflow was scheduled

![](/files/5HzcmqpjHJuavJkuNf7F)

## Pause Tasks

{% hint style="danger" %}
Be careful when using the *Pause tasks* feature, as this will stop all API Workflows from running; if you are working in the Live environment and have live users scheduling API workflows, they will not run until *Pause tasks* has been deactivated.

If you are experiencing workflows not running as expected, check this setting.![](/files/5HzcmqpjHJuavJkuNf7F)
{% endhint %}

Click here to pause upcoming workflows. If they are already on pause, this will read “Resume tasks,” which you can click in order for scheduled workflows to run again.

## Cancel all

You can delete all past workflows that have not run yet, or scheduled workflows in their entirety.

## FAQ: API Workflow scheduler

#### Does the scheduler show external API requests?

No, since workflow API requests that come from an external app are not *scheduled* but triggered immediately, they will not show up in the scheduler.

#### What happens if a workflow is scheduled in the past?

An API workflow scheduled in the past will trigger immediately, and as such will not show up in the scheduler.

[^1]: API Workflows are server-side workflows that can be scheduled internally in your app or be triggered from an external app through an API Request.\
    \
    Article: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)

    Article: [Scheduling API Workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/scheduling-api-workflows)\
    Reference: [The Workflow API](/core-resources/api/the-bubble-api/the-workflow-api)\
    Reference: [The Schedule an API Workflow action](/core-resources/actions/custom#schedule-api-workflow)

[^2]: The *unique ID* of an API workflow servers two purposes:

    * It's used to identify a specific API workflow in the list described in this article
    * It's used to *cancel* a workflow with the *Cancel a scheduled API Workflow* action, which requires the ID as a parameter

    Article section: [Cancel a scheduled API Workflow](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/scheduling-api-workflows#canceling-a-scheduled-workflow)

    Reference: [Cancel a scheduled API Workflow](/core-resources/actions/custom#cancel-a-scheduled-api-workflow)
