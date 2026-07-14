# Element event properties
> Source: https://manual.bubble.io/core-resources/bubble-workflows/bubble-events/frontend-event-properties/element-event-properties · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (10)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**Workflows**

* Article series: [Workflows](https://manual.bubble.io/help-guides/logic/workflows)
  * Article: [Events](https://manual.bubble.io/help-guides/logic/workflows/events)
  * Article: [Actions](https://manual.bubble.io/help-guides/logic/workflows/actions)

***

**Elements**

Elements are the objects that you place on the page, such as text, inputs, buttons, images and icons.

* Article series: [Elements](https://manual.bubble.io/help-guides/design/elements)

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

**Debugging**

All apps have the occasional bug, and our debugging tools help you squish them efficiently. The debugger helps you go through workflows step by step to see how they perform and the values they return.

Article series: [Debugging your application](https://manual.bubble.io/help-guides/maintaining-an-application/testing-and-debugging/using-the-debugger)
{% endtab %}

{% tab title="Videos (3)" %}

* Bubble Academy: [The Workflow Tab: Bubble Introduction Series \[4/10\]](https://www.youtube.com/watch?v=jbzl8EaAk_g\&t=3s)
* Bubble Academy: [Understanding Workflow Execution Rules](https://www.youtube.com/watch?v=IbhCrciOKHM\&t=41s)
* Getting started with Bubble: [Workflows and logic: Getting started with Bubble](https://www.youtube.com/watch?v=e-vhoR48QdY)

There are also relevant videos listed below the header in some entries below.
{% endtab %}
{% endtabs %}

Element events are events that are triggered by an element, such as when an element is clicked or its value changes.

## An element is clicked

This event is triggered when the user clicks on the element. Most [visual elements](#user-content-fn-2)[^2] can trigger this event, including texts, buttons, images, and icons.

{% hint style="info" icon="desktop" %}
The *an element is clicked* event is only available in web apps. If you want to handle tap events in a native mobile app, see *An element is tapped*. For tap-and-hold events, see *An element is pressed.*
{% endhint %}

### Element

Specifies which element triggers the event when clicked.

## An element is pressed

This event is triggered when the user presses and holds and element. Most [visual elements](#user-content-fn-2)[^2] can trigger this event, including texts, buttons, images, and icons.

{% hint style="info" icon="mobile" %}
The *an element is pressed* event is only available in mobile apps. If you want to handle click events in a web app, see [*An element is clicked*](#an-element-is-clicked).
{% endhint %}

## An element is tapped

This event is triggered when the user clicks on the element. Most [visual elements](#user-content-fn-2)[^2] can trigger this event, including texts, buttons, images, and icons.

{% hint style="info" icon="mobile" %}
The *an element is tapped* event is only available in mobile apps. If you want to handle click events in a web app, see [*An element is clicked*](#an-element-is-clicked). For tap-and-hold events on mobile, see [*An element is pressed*](#an-element-is-pressed)*.*
{% endhint %}

## An input's value is changed

This event is triggered when the value of an input changes. For text inputs, the event is triggered when the user removes focus from the input.

### Element

Specifies which input form element triggers the event.

## A map's marker is clicked

This event is triggered when the user clicks a [map's](https://manual.bubble.io/~/changes/1175/bubble-elements/element-types-and-properties/web-elements/visual-elements#map) marker. 'This map's current marker' refers to the marker the user clicked.

### Properties

#### Element

Specifies which Map element triggers the event.

### Data sources

This event introduces three data sources.

#### This map's current marker

Returns the marker currently selected by the user. The type of this data source is the type of content of map.

#### This map's center address

Returns the address at the center of the map’s current view.

#### This map's zoom level

Returns the current zoom level of the map as a number.

## A popup is opened

This event is triggered when a popup opens through a [Show an element](https://manual.bubble.io/actions/element#show-an-element)/[Toggle an element](https://manual.bubble.io/actions/element#toggle-an-element) action or if an [Animate an element](https://manual.bubble.io/actions/element#animate-an-element) action [ends with showing the element](#user-content-fn-3)[^3].

### Element

Specifies which popup element triggers the event.

## A popup is closed

This event is triggered when a popup is closed through a [Hide an element](https://manual.bubble.io/actions/element#hide-an-element)/[Toggle an element](https://manual.bubble.io/actions/element#toggle-an-element) action, if an [Animate an element](https://manual.bubble.io/actions/element#animate-an-element) action [ends with hiding the element](#user-content-fn-3)[^3], or when the user presses Esc.

{% hint style="info" %}
**Note on timing:** An popup is considered *closed* as soon as the *Hide this element* action is executed, or the user presses the Esc button. However, popups fade out by default, and as a result the actions may run before the popup is actually hidden for the user.

In cases where you want to avoid this (such as when the result of the workflow may be visible on-screen while the popup is fading out), you can [schedule a custom event](https://manual.bubble.io/actions/custom#schedule-a-custom-event) to run in about 0.5 seconds. This gives the popup time to be completely hidden before the actions run.
{% endhint %}

### Element

Specifies which popup element triggers the event.

## An element has an error running a workflow

This event is triggered whenever Bubble reports an error[^4] in a workflow that was initiated by a specified element, such as a failed login attempt, as well as unexpected errors, such as the user being offline and Bubble being unable to communicate with the server.

{% hint style="info" %}
This workflow takes priority over [An unhandled error occurs](https://manual.bubble.io/core-resources/general-events#an-unhandled-error-occurs).

In other words, if both events are potentially triggered, only the The *An element has an error running a workflow* event will run.
{% endhint %}

The default handling of errors in a Bubble app is to automatically display the error to the user using the browser's default alert system.

For workflows handling unexpected errors, it's advised not to fetch data from the database or external APIs. This is because network or connectivity issues, which might cause the initial error, could also make the error workflow itself fail. This happens if the workflow depends on data that cannot be accessed due to these issues. In such cases, users might end up seeing an error alert if the error workflow doesn't execute successfully.

### Properties

### Catch

The *Catch* property instructs Bubble to react to the following two error types:

* **Element workflow errors:** If selected, Bubble will only react to errors that happen as a result of the user interacting with an element, such as clicking a button.
* **Any workflow error:** If selected, Bubble will react to any error, regardless of the event of the workflow.

### Data sources

This event introduces two new data sources.

#### Current workflow error code

Returns the error code of the error. Each error in Bubble has a unique code. If you want to set up the workflow to react to a specific error, you can define this using a condition[^5] on the event or action that includes the error code.

* Use the data source `Current workflow error's code`.
* You can find the list of all error codes in *Settings - Language* and scrolling to the bottom of the language text strings.
* Error codes are static.

#### Current workflow error message

Returns the error message. This allows you to display that message to the user.

To identify the error message:

* Use the [data source](#user-content-fn-6)[^6] *`Current workflow error's message`*
* You can find the list of all error messages in *Settings - Language* and scrolling to the bottom of the language text strings. They can be customized as you see fit.
* Error codes are **not** [**static**](#user-content-fn-7)[^7].

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

[^2]: *Visual elements* are elements that are used to display something on the page without accepting user input, such as text, images, icons and buttons.

[^3]: Animations that start with *Transition* are used to either show or hide the element at the end of the animation.

[^4]: Errors in this context are related to system errors, and not to errors that are flagged by Bubble's issue tracker.

[^5]: A *condition* is a dynamic expression that returns a *yes* or *no* value, to determine whether to go ahead with something. In this context, the *yes/no* value would instruct Bubble whether to trigger an event or not.

[^6]: A *data source* is any source from which Bubble can pull data, such as the database, an option set, the current user or an API response.

[^7]: Error messages can be customized or displayed in different languages, depending on the language setting in your app. As such, it should not be used to identify errors, only to fetch the error message.
