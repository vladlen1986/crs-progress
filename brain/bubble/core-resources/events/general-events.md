# General events
> Source: https://manual.bubble.io/core-resources/events/general-events · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Events that are triggered upon specific conditions not necessarily initiated by the user interacting with an element.

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (9)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**Workflows**

* Article series: [Workflows](/help-guides/logic/workflows)
  * Article: [Events](/help-guides/logic/workflows/events)
  * Article: [Actions](/help-guides/logic/workflows/actions)

***

#### Catching errors

To learn more about how lets you catch and react to different error messages, see the article below:

* Article: [Frontend events](/help-guides/logic/workflows/events/frontend-events) | [Catching errors](/help-guides/logic/workflows/events/frontend-events#example-catching-errors)

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

#### User accounts

Bubble automatically handles secure creation and management of user accounts in your app.

* Article: [User accounts](/help-guides/data/user-accounts)

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

## User is logged in

{% embed url="<https://vimeo.com/569032909>" %}
Watch this video to learn more about the User is Logged In Event
{% endembed %}

This event is triggered when the current user [logs in](#user-content-fn-2)[^2]. This event is triggered:

* On [page load](#page-is-loaded), if the user is logged in
* When the [*Log the user in*](/core-resources/actions/account#log-the-user-in) action is successfully completed
* When the [*Sign the user up*](/core-resources/actions/account#sign-the-user-up) action is successfully completed

## User is logged out

{% embed url="<https://vimeo.com/569032938>" %}
Watch this video to learn more about the User is Logged Out Event
{% endembed %}

This event is triggered when the current user logs out. This event is triggered:

* On [page load](#page-is-loaded), if the user is not logged in
* When the [*Log the user out*](/core-resources/actions/account#log-the-user-out) action is successfully completed

## Page is loaded

{% embed url="<https://youtu.be/Dm8Kp0micic>" %}
Our Academy quick tip on how to create an event on page load
{% endembed %}

This event is triggered when:

* The page is loaded
* The *Go to page* action is completed, even if the user stays on the same page

Note the last point; the *Go to page action* will trigger this event regardless of whether a new page was loaded. You can avoid this by using a condition[^3], such as [saving](/core-resources/actions/element#custom-state) and then checking[^4] a [custom state](#user-content-fn-5)[^5] the first time the page loads to avoid triggering the event repeatedly.

## Do every X seconds

{% embed url="<https://vimeo.com/569031787>" %}
Watch this video to learn more about the Do Every X Seconds Event
{% endembed %}

This event performs an action every X seconds. Bubble updates in real time, so this event will not be used often.

### Interval

Enter a number in seconds to define the interval.

{% hint style="warning" %}
**Note on performance and workload:** Running an operation at frequent intervals can quickly have a negative effect on your app's performance. It's best to use this feature with caution so that you don't overload the server or user's device.\
\
Be mindful of what kind of actions you are running, and don't repeat them more frequently than you need to. Repeated database operations in particular can consume a lot of workload[^6].
{% endhint %}

## Do when condition is true

{% embed url="<https://vimeo.com/569031813>" %}
Watch this video to learn more about the Do When Condition Is True Event
{% endembed %}

This event is triggered as soon as its condition[^3] is true.

### Run this...

* **Only once:** the event will trigger only once per page load. The *Go to page* action does *not* reset this option if the user remains on the same page – it will still only run once.
* **Every time:** the event is triggered every time the condition is true.

{% hint style="warning" %}
Note that the *Do When Condition is True* event can lead to performance issues if it is triggered too frequently. It's best to use this feature with caution so that you don't overload the server or user's device.\
\
Be mindful of what kind condition you are placing on the event and what kind of actions are executed when the condition is true to maintain a stable level of capacity usage.
{% endhint %}

## An unhandled error occurs

{% embed url="<https://vimeo.com/569031627>" %}
Watch this video to learn more about the Unhandled Error Occurs Event
{% endembed %}

This event is triggered whenever Bubble reports an error[^7] in a workflow. This will execute if the error happens anywhere on the page and happens for both expected errors, such as a failed login attempt, and unexpected errors, such as a bug with the Bubble platform.

{% hint style="info" %}
The *An element has an error running a workflow* event will take priority over this workflow.\
\
In other words, if both events are potentially triggered, only the The *An element has an error running a workflow* event will run.
{% endhint %}

The default handling of errors in a Bubble app is to automatically display the error to the user using the browser's default messaging system.

For workflows handling unexpected errors, it's advised not to fetch data from the database or external APIs. This is because network or connectivity issues, which might cause the initial error, could also make the error workflow itself fail. This happens if the workflow depends on data that cannot be accessed due to these issues. In such cases, users might end up seeing an error alert if the error workflow doesn't execute successfully.

### Catch

The *catch* setting lets you specify what type of errors the event will be triggered by.

#### Any workflow error

This will trigger the event regardless of which workflow caused the error.

{% hint style="warning" %}
If you place the *An unhandled error occurs* event on a page and sets *catch* to *Any workflow error*, Bubble will stop displaying workflow error messages altogether. This is useful if you want to set up your own system for displaying or silencing errors, but it can also stop you and/or the user to from seeing necessary/useful error messages.
{% endhint %}

#### Element workflow errors only

This will trigger the event only when the workflow is initiated by an element, such as a button being clicked or an input form element's value changing.

This applies to all elements on the same page. If you want to set up an error workflow on a specific element, use [*An element has an error running a workflow*](/core-resources/events/element-events#an-element-has-an-error-running-a-workflow) instea&#x64;*.*

### Identifying the error code

Each error in Bubble has a unique code. If you want to set up the workflow to react to a specific error, you can define this using a condition[^3] on the event or action that includes the error code:

To identify the error code:

* Use the [data source](#user-content-fn-8)[^8] [*Current workflow error's code*](/core-resources/data/data-sources#current-workflow-errors)
* You can find the list of all error codes in *Settings - Language* and scrolling to the bottom of the language text strings.
* Error codes are [**static**](#user-content-fn-9)[^9]**.**

### Returning the error message

In the same way as above, you can also return the error message Bubble would normally display. You can combine the *code* and the *message* to manage all errors in the same way, or identify specific errors by using conditions[^3].

To identify the error message:

* Use the [data source](#user-content-fn-8)[^8] [*Current workflow error's message*](/core-resources/data/data-sources#current-workflow-errors)
* You can find the list of all error messages in *Settings - Language* and scrolling to the bottom of the language text strings. They can be customized as you see fit.
* Error codes are **not** [**static**](#user-content-fn-10)[^10].

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Bubble automatically handles user account actions such as signing up and logging in. This keeps your app efficient and secure.

    Reference: [The *log the user in* action](/core-resources/actions/account#log-the-user-in)

    Article: [User accounts](/help-guides/data/user-accounts)

[^3]: A *condition* is a dynamic expression that returns a *yes* or *no* value, to determine whether to go ahead with something. In this context, the *yes/no* value would instruct Bubble whether to trigger an event or not.

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

    Article: [Conditions](/help-guides/logic/conditions)

[^4]: Checking in this context means to place a condition on the *Page is loaded* event to check the custom state for whichever value you've stored in it.

    Article: [Custom states](/help-guides/data/temporary-data/custom-states)

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

    Article: [Conditions](/help-guides/logic/conditions)

[^5]: A *custom state* is a way to temporarily store data that is lost when the session ends. You can use it to store variables and states that are needed just for the remainder of the session.

    Article: [Custom states](/help-guides/data/temporary-data/custom-states)

[^6]: *Workload* is the metric that calculates

[^7]: Errors in this context are related to system errors, and not to errors that are flagged by Bubble's issue tracker.

    Article section: [Errors in workflows](/help-guides/logic/workflows#errors-in-workflows)

[^8]: A *data source* is any source from which Bubble can pull data, such as the database, an option set, the current user or an API response.

    Reference: [List of data sources](/core-resources/data/data-sources)

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions) | [Data sources](/help-guides/logic/dynamic-expressions#data-sources)

[^9]: Error codes do not change and are not subject to changing the language setting in your app. As such, they can safely be used to identify errors across multiple languages.

[^10]: Error messages can be customized or displayed in different languages, depending on the language setting in your app. As such, it should not be used to identify errors, only to fetch the error message.
