# Scheduling API workflows
> Source: https://manual.bubble.io/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/scheduling-api-workflows · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

API Workflows can be triggered or scheduled internally in your app

While the [Workflow API](#user-content-fn-1)[^1] is useful for building workflows that can be exposed and triggered by external applications and systems, [API workflows](#user-content-fn-2)[^2] can also be used to schedule workflows in your application.

## Scheduled API workflow use cases

There are many use cases where scheduling an API Workflow is a better alternative than running a workflow on the page.

* When you need to **schedule an action in the future**, such as:
  * Sending an email X number of hours after a User signs up
  * Send a reminder X number of days before an event
  * Terminate a trial one month after it has started
* Schedule **recurring events**, such as
  * Sending a weekly newsletter
  * Calculate and save statistics or aggregations
  * Delete redundant data to clean up the database
* Performing **complex workflows**, such as:
  * Actions that involve complex searches and filtering
  * Workflows that contain a long list of actions that can take some time to complete
* Set up [**cascading workflows**](#user-content-fn-3)[^3], such as:
  * Deleting Things in your database that are connected to other things that also need to be deleted or updated
* Running [**bulk workflows**](#user-content-fn-4)[^4] **from the Bubble editor**
  * If you need to quickly change something on a list of things
  * Note that bulk operations only accept one parameter: the list of things on which to perform the operation

## How to schedule an API Workflow

After you have built the API Workflow you want to trigger, you schedule it to run at the current date-time or in the future by using the action *Schedule API Workflow*.

<figure><img src="/files/kxqXWGHYeCLGsr4Iv83G" alt="" width="375"><figcaption></figcaption></figure>

You pick the API workflow you want to schedule and define the time of the scheduling. You'll be prompted to fill the different parameters[^5] that have been defined at the API workflow level.

{% hint style="warning" %}
When you schedule an API workflow to run at a later time or date, Bubble saves a snapshot of the workflow's structure and actions *as they exist at that moment*. Any changes you make to the API workflow *after* scheduling it — such as adding, removing, or modifying actions — will **not** be reflected in workflows that were already scheduled.

If you need scheduled workflows to reflect the updated version:

* [Cancel](#canceling-a-scheduled-workflow) any previously scheduled API workflows
* Re-schedule them using the updated version
  {% endhint %}

{% hint style="warning" %}
Note that if you schedule an API workflow in the **past**, it will **trigger immediately**.
{% endhint %}

## Schedule an API Workflow on a list of things

{% hint style="info" %}
The Schedule an API workflow on a list action currently supports scheduling up to 100,000 workflows. See our dedicated article on hard limits for details

Article: [Bubble's hard limits](/help-guides/maintaining-an-application/performance-and-scaling/hard-limits)
{% endhint %}

You can also schedule an API workflow on a list of things. This way you are scheduling one workflow per entry in the list.

For example, if you want to run a workflow on 5,000 users, you can use the *Schedule API Workflow on a list of things* action to schedule 5,000 separate API workflows. You can then set up that workflow to perform actions on one user at a time.

While this can be used to run a given workflow separately on each item in a list, it's not technically *looping* – scheduling an API Workflow on a list will schedule one workflow per item, but it will not wait for one to finish before it moves on to the next. In other words, they run in parallell.

### Interval

The Schedule an API workflow on a list feature lets you set an interval for the processing. This instructs Bubble to schedule the workflows with a defined gap, such as one second. When using this action, keep in mind the following:

* **Empty interval:** the default empty state (not zero, but empty) interval for Schedule API Workflow on a list will schedule the workflows with a slight gap in order to balance the need to complete jobs as quickly as possible with allowing other workflows in your app to run simultaneously. The entire batch does not need to finish before other scheduled API workflows can run, but for large lists it may take some time to finish.
* **0 seconds**: setting the interval to 0 is technically possible, but it has the drawback of blocking other scheduled workflows until the entire batch is completed. To avoid this bottleneck and allow for smoother processing of scheduled tasks, it's often more effective to leave the interval at its default setting. This approach helps in managing the execution flow more efficiently, ensuring that all scheduled workflows are processed without significant delay.
* **Third-party rate limits:** please note that while an interval is no longer needed to protect the performance of your Bubble app, there are some cases where it may be useful. For example, if your workflows are interacting with external APIs with restrictive rate limits, you may use the scheduling interval to slow down execution and avoid HTTP 429 Error responses.
* **Workflows still run in parallel:** Keep in mind that adding an interval does *not* guarantee that the workflows will not overlap – see the box below if you need to force your workflows to run sequentially.
* **Hard limits**: keep in mind the hard limits on the lengths of lists that can be scheduled, as [stated above.](#system-limits-on-schedule-api-workflow-on-a-list)

{% hint style="info" %}
If you are looking to create an API Workflow that loops over entries in a list **sequentially**, you can use [recursive workflows](#user-content-fn-6)[^6] instead of *Schedule API workflow on a list*.

Note that recursive workflows are slower and cost more WU than *Schedule API workflow on a list.*
{% endhint %}

To schedule an API Workflow on a list, make sure to define your endpoint with a parameter for a particular data type. In this example, we're adding a *user* parameter.

<figure><img src="/files/AwTPGUYtjzv5hgSzXhYv" alt=""><figcaption><p>You can define what kind of Data Type you want to schedule the list of Workflows on. In the example above we've set up a parameter with the <em>User</em> data type.</p></figcaption></figure>

Then, when you schedule the API workflow on a list, you'll choose the type of thing, the list to run on, and for the parameter you'll be able to choose "this thing".

<figure><img src="/files/5zxzs67GcQ9VBW9DWJ6J" alt="" width="375"><figcaption></figcaption></figure>

The API workflow well then run in the context of this thing for each thing in the list.

## Canceling a scheduled workflow

{% hint style="info" %}
The Bubble editor also retains a list of scheduled API workflows where you can view, pause and cancel individual or all scheduled workflows. See more in the article below:

Article: [The API workflow scheduler](/help-guides/maintaining-an-application/scheduler)
{% endhint %}

Whenever you schedule an API workflow Bubble generates a unique ID for that specific instance. The *Schedule API workflow* returns that ID so that you can reference that in a later step in the same workflow:

<figure><img src="/files/pgZ31rWGdX9oHsfIM2NC" alt=""><figcaption><p>Scheduling an API Workflow returns a unique ID that you can use in the next step. In this example we're saving the ID on the Current User-</p></figcaption></figure>

You can use this ID to cancel the API workflow at any time before it is scheduled to run by using the [*Cancel a scheduled API Workflow*](#user-content-fn-7)[^7] action.

To cancel a list of scheduled Workflows you can use the [*Cancel a list of scheduled API Workflows*](#user-content-fn-8)[^8] action.

## Other ways to learn

<details>

<summary><mark style="color:blue;">Running API workflows on a list from the Bubble editor</mark></summary>

You can also run API workflows directly from the *Data* tab in the Bubble editor, to make quick changes in bulk. Note that this method only accepts the list of things as parameter, and not any additional custom parameters on that API workflow.

You can learn more about this tool in the article below:

Article: [Bulk operations](/help-guides/maintaining-an-application/database-maintenance/bulk-operations)

</details>

[^1]: The Workflow API is the part of Bubble's built-in API that lets you set up workflows to be triggered by an external application.\
    \
    Article: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)

[^2]: API Workflows are server-side workflows that you can choose to expose to be triggered from external applications. They can also be scheduled to run from within your app without involving any third parties.\
    \
    Article: [API Workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows)

[^3]: Cascading Workflows are series of different Workflows that are interconnected.

[^4]: The Bubble database editor contains a *Bulk* feature, which runs an API workflow on a specific list of things.\
    \
    Article: [Bulk operations](/help-guides/maintaining-an-application/database-maintenance/bulk-operations)

[^5]: Parameters in the context of API Workflows is any kind of extra information that you include with the call to complete the request.\
    \
    For example, if you are requesting a new User to be created, parameters could include the email and name of that User.\
    \
    Article: [Creating API Workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/creating-api-workflows)\
    Article section: [Setting up parameters](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/creating-api-workflows#defining-parameters)

[^6]: A recursive workflow is an API workflow that uses an action to schedule itself, making it loop. You can use this if you want to force a sequence of workflows to run sequentially.\
    \
    Article: [Recursive API workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/recursive-api-workflows)

[^7]: The *Cancel a scheduled API workflow* action is used to cancel a single API workflow by referencing its ID.\
    \
    Reference: [Cancel a scheduled API workflow](/core-resources/actions/custom#cancel-a-scheduled-api-workflow)

[^8]: The *Cancel a list of scheduled API workflows* action is used to cancel a list of API workflow by referencing their IDs.\
    \
    Reference: [Cancel a list of scheduled API workflows](/core-resources/actions/custom#cancel-a-list-of-scheduled-api-workflows)
