# General event properties
> Source: https://manual.bubble.io/core-resources/bubble-workflows/bubble-events/frontend-event-properties/general-event-properties · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (9)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**Workflows**

* Article series: [Workflows](https://manual.bubble.io/help-guides/logic/workflows)
  * Article: [Events](https://manual.bubble.io/help-guides/logic/workflows/events)
  * Article: [Actions](https://manual.bubble.io/help-guides/logic/workflows/actions)

***

**Catching errors**

To learn more about how lets you catch and react to different error messages, see the article below:

* Article: [Frontend events](https://manual.bubble.io/help-guides/logic/workflows/events/frontend-events) | [Catching errors](https://manual.bubble.io/help-guides/logic/workflows/events/frontend-events#example-catching-errors)

***

**Logic**

Workflows is a part of the *Logic* series in the user manual.

* Article series: [Logic](https://manual.bubble.io/help-guides/logic)
  * Article: [The frontend and backend](https://manual.bubble.io/help-guides/logic/the-frontend-and-backend)
  * Article: [Dynamic expressions](https://manual.bubble.io/help-guides/logic/dynamic-expressions)\
    Dynamic expressions are used both to set up conditions, and are highly useful in different actions that you may want to add to your workflows.
  * Article: [Conditions](https://manual.bubble.io/help-guides/logic/conditions)\
    Conditions are used to determine whether a workflow or action should run or not, by checking whether something is true.
  * Article series: [Navigation](https://manual.bubble.io/help-guides/logic/navigation)\
    Using workflows to let the user navigate between pages and page sections.

***

**User accounts**

Bubble automatically handles secure creation and management of user accounts in your app.

* Article: [User accounts](https://manual.bubble.io/help-guides/data/user-accounts)

***

**Debugging**

All apps have the occasional bug, and our debugging tools help you squish them efficiently. The debugger helps you go through workflows step by step to see how they perform and the values they return.

Article series: [Debugging your application](https://manual.bubble.io/help-guides/maintaining-an-application/testing-and-debugging/using-the-debugger)
{% endtab %}

{% tab title="Videos (3)" %}
Bubble Academy: [The Workflow Tab: Bubble Introduction Series \[4/10\]](https://www.youtube.com/watch?v=jbzl8EaAk_g\&t=3s)\
Bubble Academy: [Understanding Workflow Execution Rules](https://www.youtube.com/watch?v=IbhCrciOKHM\&t=41s)\
Getting started with Bubble: [Workflows and logic: Getting started with Bubble](https://www.youtube.com/watch?v=e-vhoR48QdY)
{% endtab %}
{% endtabs %}

General events are triggered upon specific conditions not necessarily initiated by the user interacting with an element, such as when the page loads, a user logs in/out or a specific condition is true.

General events are triggered upon specific conditions not necessarily initiated by the user interacting with an element, such as when the page loads, a user logs in/out or a specific condition is true.

## An unhandled error occurs

This event is triggered whenever Bubble reports an error[^2] in a workflow. This will execute if the error happens anywhere on the page and happens for both expected errors, such as a failed login attempt, and unexpected errors, such as a bug with the Bubble platform.

{% hint style="info" %}
The *An element has an error running a workflow* event will take priority over this workflow.

In other words, if both events are potentially triggered, only the [*An element has an error running a workflow*](/core-resources/bubble-workflows/bubble-events/frontend-event-properties/element-event-properties#an-element-has-an-error-running-a-workflow) event will run.
{% endhint %}

The default handling of errors in a Bubble app is to automatically display the error to the user using the browser's default messaging system.

For workflows handling unexpected errors, it's advised not to fetch data from the database or external APIs. This is because network or connectivity issues, which might cause the initial error, could also make the error workflow itself fail. This happens if the workflow depends on data that cannot be accessed due to these issues. In such cases, users might end up seeing an error alert if the error workflow doesn't execute successfully.

### Catch

#### Any workflow error

This will trigger the event regardless of which workflow caused the error.

{% hint style="warning" %}
If you place the *An unhandled error occurs* event on a page and set *catch* to *Any workflow error*, Bubble will stop displaying workflow error messages altogether. This is useful if you want to set up your own system for displaying or silencing errors, but it can also stop you and the user from seeing necessary or useful error messages.
{% endhint %}

#### Element workflow errors only

This will trigger the event only when the workflow is initiated by an element, such as a button being clicked or an input form element's value changing.

This applies to all elements on the same page. If you want to set up an error workflow on a specific element, use *An element has an error running a workflow* instead.

### Data sources

#### Code: <mark style="color:$info;">returns the error code</mark>

Each error in Bubble has a unique code. If you want to set up the workflow to react to a specific error, you can define this using a condition[^3] on the event or action that includes the error code.

**Using the error code**

* Use the [data source](#user-content-fn-4)[^4] *Current workflow error's code*
* You can find the list of all error codes in *Settings - Language* and scrolling to the bottom of the language text strings.
* Error codes are [**static**](#user-content-fn-5)[^5].

#### Message: <mark style="color:$info;">returns the error message</mark>

In the same way as above, you can also return the error message Bubble would normally display. You can combine the *code* and the *message* to manage all errors in the same way, or identify specific errors by using conditions[^3].

**Using the error message**

* Use the [data source](#user-content-fn-4)[^4] [*Current workflow error's message*](https://manual.bubble.io/data/data-sources#current-workflow-errors)
* You can find the list of all error messages in *Settings - Language* and scrolling to the bottom of the language text strings. They can be customized as you see fit.
* Error codes are **not** [**static**](#user-content-fn-6)[^6].

## Do every 5 seconds

This event performs an action at a fixed interval that you set.

### Interval (seconds)

Enter the interval in seconds to define how often the event runs. Decimal values are supported and must use a dot `.` rather than a comma `,`.

{% hint style="warning" %}
**Note on performance and workload:** Running an operation at frequent intervals can quickly have a negative effect on your app's performance and workload consumption.

Be mindful of what kind of actions you are running, and don't repeat them more frequently than you need to. Repeated database operations in particular can consume a lot of workload[^7].
{% endhint %}

## Do when condition is true

#### Description

This event is triggered as soon as its condition[^3] is true.

#### Run this

**Only once**

The event will trigger only once per page load. The *Go to page* action does *not* reset this option if the user remains on the same page. It will still only run once.

**Every time**

The event is triggered every time the condition is true.

{% hint style="warning" %}
Note that the *Do When Condition is True* event can lead to performance issues if it is triggered too frequently. It's best to use this feature with caution so that you don't overload the server or user's device.

Be mindful of what kind condition you are placing on the event and what kind of actions are executed when the condition is true to maintain a stable level of capacity usage.
{% endhint %}

## Page is loaded

This event is triggered when:

* The page is loaded
* The *Go to page* action is completed, even if the user stays on the same page

{% hint style="warning" %}
The *Go to page* action triggers this event even if the user remains on the same page. To prevent repeated execution, add a condition. For example, store a value in a custom state on first load and check that state before running the event again.
{% endhint %}

## User is logged in

This event is triggered when the current user [logs in](#user-content-fn-8)[^8]. Specifically:

* On page load, if the user is logged in
* When the [*Log the user in*](https://manual.bubble.io/actions/account#log-the-user-in) action is successfully completed
* When the [*Sign the user up*](https://manual.bubble.io/actions/account#sign-the-user-up) action is successfully completed

## User is logged out

This event is triggered when the current user logs out. Specifically:

* On page load, if the user is not logged in
* When the [*Log the user out*](https://manual.bubble.io/actions/account#log-the-user-out) action is successfully completed

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

[^2]: Errors in this context are related to system errors, and not to errors that are flagged by Bubble's issue tracker.

[^3]: A *condition* is a dynamic expression that returns a *yes* or *no* value, to determine whether to go ahead with something. In this context, the *yes/no* value would instruct Bubble whether to trigger an event or not.

[^4]: A *data source* is any source from which Bubble can pull data, such as the database, an option set, the current user or an API response.

[^5]: Error codes do not change and are not subject to changing the language setting in your app. As such, they can safely be used to identify errors across multiple languages.

[^6]: Error messages can be customized or displayed in different languages, depending on the language setting in your app. As such, it should not be used to identify errors, only to fetch the error message.

[^7]: *Workload* is the metric that calculates

[^8]: Bubble automatically handles user account actions such as signing up and logging in. This keeps your app efficient and secure.
