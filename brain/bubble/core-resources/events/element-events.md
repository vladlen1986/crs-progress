# Element events
> Source: https://manual.bubble.io/core-resources/events/element-events · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Events that are triggered when the user interacts with an element on the page.

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (10)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**Workflows**

* Article series: [Workflows](/help-guides/logic/workflows)
  * Article: [Events](/help-guides/logic/workflows/events)
  * Article: [Actions](/help-guides/logic/workflows/actions)

***

#### Elements

Elements are the objects that you place on the page, such as text, inputs, buttons, images and icons.

* Article series: [Elements](/help-guides/design/elements)

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

* Bubble Academy: [The Workflow Tab: Bubble Introduction Series \[4/10\]](https://www.youtube.com/watch?v=jbzl8EaAk_g\&t=3s)
* Bubble Academy: [Understanding Workflow Execution Rules](https://www.youtube.com/watch?v=IbhCrciOKHM\&t=41s)
* Getting started with Bubble: [Workflows and logic: Getting started with Bubble](https://www.youtube.com/watch?v=e-vhoR48QdY)

There are also relevant videos listed below the header in some entries below.
{% endtab %}
{% endtabs %}

## An element is clicked

{% embed url="<https://vimeo.com/569031574>" %}
Watch this video to learn how to use An Element is Clicked Event
{% endembed %}

This event is triggered when the user clicks on the element. Most [visual elements](#user-content-fn-2)[^2] can trigger this event, including texts, buttons, images, and icons.

[User manual](/help-guides/logic/workflows/events/frontend-events#example-button-click)

## An input's value is changed

{% embed url="<https://youtu.be/mDEVJLujlkQ>" %}
Our Academy quick tip on how to trigger workflows from inputs
{% endembed %}

This event is triggered when the value of an input changes. For text inputs, the event is triggered when the user removes focus from the input.

[User manual](/help-guides/logic/workflows/events/frontend-events#example-input-value-changed)

## A map's marker is clicked

{% embed url="<https://vimeo.com/569032491>" %}
Watch this video to learn more about the Map Marker is Clicked Event
{% endembed %}

This event is triggered when the user clicks a [map](/core-resources/elements/visual-elements#map)'s marker. 'This map's current marker' refers to the marker the user clicked.

## A popup is opened

{% embed url="<https://youtu.be/AhiJv3jYZEg>" %}
Watch our Academy quick tip on how to start workflows based on a popup
{% endembed %}

This event is triggered when a popup opens through a [Show an element](/core-resources/actions/element#show-an-element)/[Toggle an element](/core-resources/actions/element#toggle-an-element) action or if an [Animate an element](/core-resources/actions/element#animate-an-element) action [ends with showing the element](#user-content-fn-3)[^3].

## A popup is closed

This event is triggered when a popup is closed through a [Hide an element](/core-resources/actions/element#hide-an-element)/[Toggle an element](/core-resources/actions/element#toggle-an-element) action, if an [Animate an element](/core-resources/actions/element#animate-an-element) action [ends with hiding the element](#user-content-fn-3)[^3], or when the user presses Esc.

{% hint style="info" %}
**Note on timing:** An popup is considered *closed* as soon as the *Hide this element* action is executed, or the user presses the Esc button. However, popups fade out by default, and as a result the actions may run before the popup is actually hidden for the user.

In cases where you want to avoid this (such as when the result of the workflow may be visible on-screen while the popup is fading out), you can [schedule a custom event](/core-resources/actions/custom#schedule-a-custom-event) to run in about 0.5 seconds. This gives the popup time to be completely hidden before the actions run.
{% endhint %}

## An element has an error running a workflow

{% embed url="<https://vimeo.com/569031834>" %}
Watch this video to learn more about this event
{% endembed %}

This event is triggered whenever Bubble reports an error[^4] in a workflow that was initiated by a specified element, such as a failed login attempt, as well as unexpected errors, such as the user being offline and Bubble being unable to communicate with the server.

{% hint style="info" %}
This workflow takes priority over [An unhandled error occurs](/core-resources/events/general-events#an-unhandled-error-occurs).\
\
In other words, if both events are potentially triggered, only the The *An element has an error running a workflow* event will run.
{% endhint %}

The default handling of errors in a Bubble app is to automatically display the error to the user using the browser's default alert system.

For workflows handling unexpected errors, it's advised not to fetch data from the database or external APIs. This is because network or connectivity issues, which might cause the initial error, could also make the error workflow itself fail. This happens if the workflow depends on data that cannot be accessed due to these issues. In such cases, users might end up seeing an error alert if the error workflow doesn't execute successfully.

### Element

The *Element* setting specifies which element Bubble should watch for errors. For example, if you place it on a button, any errors happening in workflows initiated by that button will be caught.

### Identifying the error code

Each error in Bubble has a unique code. If you want to set up the workflow to react to a specific error, you can define this using a condition[^5] on the event or action that includes the error code:

To identify the error code:

* Use the [data source](#user-content-fn-6)[^6] [*Current workflow error's code*](/core-resources/data/data-sources#current-workflow-errors)
* You can find the list of all error codes in *Settings - Language* and scrolling to the bottom of the language text strings.
* Error codes are [**static**](#user-content-fn-7)[^7]**.**

### Returning the error message

In the same way as above, you can also return the error message Bubble would normally display. You can combine the *code* and the *message* to manage all errors in the same way, or identify specific errors by using conditions[^5].

To identify the error message:

* Use the [data source](#user-content-fn-6)[^6] [*Current workflow error's message*](/core-resources/data/data-sources#current-workflow-errors)
* You can find the list of all error messages in *Settings - Language* and scrolling to the bottom of the language text strings. They can be customized as you see fit.
* Error codes are **not** [**static**](#user-content-fn-8)[^8].

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: *Visual elements* are elements that are used to display something on the page without accepting user input, such as text, images, icons and buttons.

    Reference: [List of visual elements](/core-resources/elements/visual-elements)

    Article series: [Elements](/help-guides/design/elements)

[^3]: Animations that start with *Transition* are used to either show or hide the element at the end of the animation.

[^4]: Errors in this context are related to system errors, and not to errors that are flagged by Bubble's issue tracker.

    Article section: [Errors in workflows](/help-guides/logic/workflows#errors-in-workflows)

[^5]: A *condition* is a dynamic expression that returns a *yes* or *no* value, to determine whether to go ahead with something. In this context, the *yes/no* value would instruct Bubble whether to trigger an event or not.

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

    Article: [Conditions](/help-guides/logic/conditions)

[^6]: A *data source* is any source from which Bubble can pull data, such as the database, an option set, the current user or an API response.

    Reference: [List of data sources](/core-resources/data/data-sources)

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions) | [Data sources](/help-guides/logic/dynamic-expressions#data-sources)

[^7]: Error codes do not change and are not subject to changing the language setting in your app. As such, they can safely be used to identify errors across multiple languages.

[^8]: Error messages can be customized or displayed in different languages, depending on the language setting in your app. As such, it should not be used to identify errors, only to fetch the error message.
