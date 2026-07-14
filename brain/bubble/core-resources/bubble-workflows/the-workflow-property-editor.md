# The workflow property editor
> Source: https://manual.bubble.io/core-resources/bubble-workflows/the-workflow-property-editor · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The workflow property editor is where you configure the properties of your app's events and actions. To open it, click the *Workflow* tab and select an event or action. Changes made in the workflow editor apply only to the specific event or action you're editing.

When you select, or create a new event or action, the property editor opens on the right-hand side of the screen and displays the settings specific to that event or action.

<figure><img src="/files/PaLplPIoT5fMjizxqpPw" alt="Screenshot showing the workflow property editor in Bubble"><figcaption><p>When an event or action is selected, the property editor is displayed along the right edge of the browser window.</p></figcaption></figure>

Every event and action comes with a set of general properties, described below:

## General properties

### Add a breakpoint in debug mode

<figure><img src="/files/iwHSvdLDfkk50owmWYAp" alt="&#x22;Add a breakpoint in debug mode” property in a Bubble workflow event."><figcaption><p>Every event and action has a "Add a breakpoint in debug_mode" property.</p></figcaption></figure>

When debugging your app, you can choose specific events or actions where execution should pause instead of stepping through every workflow step. Enable this option to add a breakpoint at that point in the workflow.

The breakpoint will only apply when the debugger is active. It has no effect when the debugger is not running, and it will not affect users interacting with the live app.

{% hint style="info" %}
**Enable or disable the debugger:** You can enable or disable the debugger from the preview URL of your app. Add the parameter `?debug_mode=true` to the URL to enable it. If the URL already contains other parameters, use `&debug_mode=true` instead. Removing this parameter disables the debugger.
{% endhint %}

### Only when (conditions)

Sometimes a workflow or action should only run when certain conditions are met. For example, when a user is logged in, a checkbox is selected, or a user’s email belongs to a specific domain.

To support this, you can add a condition[^1] to the event or action. Conditions are [dynamic expressions](#user-content-fn-2)[^2] that evaluate to **yes or no**. If the condition on an action is not met, that action is skipped. The workflow continues with the following actions, but they will not have access to any data that would have been produced by the skipped action.

### Notes

Notes can be added to an event or workflow to remember important things.

#### Adding notes

Adding notes can be done in two ways:

<figure><img src="/files/DPFX8aK3oKEVLxyQMnJe" alt="How to add notes to an action or event."><figcaption><p>To add a note to an event or action, click on the <em>Add notes</em> button or select that option from the property editor dropdown.</p></figcaption></figure>

1. Click the *Add notes* button at the top of the workflow canvas.
2. Click the dropdown menu in the top right corner of the property editor and click *Add notes*.

If you already have a note on the selected event or action, the label of the button and menu option will change to *View notes.*

<figure><img src="/files/g5rHxnG6ZqT0k3wjYa08" alt=""><figcaption><p>The note editor will open up on the right-hand side of the workflow tab.</p></figcaption></figure>

## Frontend events

Frontend events are events that are triggered from a page or view, often as the result of a user action.

| Category       | Description                                                                                                                                                                                               | Link                                                                                                                |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| General events | General events are triggered upon specific conditions not necessarily initiated by the user interacting with an element, such as when the page loads, a user logs in/out or a specific condition is true. | [General events](/core-resources/bubble-workflows/bubble-events/frontend-event-properties/general-event-properties) |
| Element events | Element events are events that are triggered by an element, such as when an element is clicked or its value changes.                                                                                      | [Element events](/core-resources/bubble-workflows/bubble-events/frontend-event-properties/element-event-properties) |
| Custom events  | Custom events can be triggered by other workflows and reused in multiple places.                                                                                                                          | [Custom events](/core-resources/bubble-workflows/bubble-events/frontend-event-properties/custom-event-properties)   |

## Backend events

Backend events are events that are triggered server-side (in the backend). They can run independently of pages and views.

| Event               | Description                                                                                                                                                                                                                                                                        | Link                                                                                                                             |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| API workflow        | API workflows are workflows that run on the server rather than in the browser. Unlike regular workflows, they aren't tied to a page or a user session, which means they can run in the background, be scheduled for a future time, or be triggered from outside your app entirely. | <p><a data-mention href="/pages/QT2BQ2gOa929o0uTqX6U">/pages/QT2BQ2gOa929o0uTqX6U</a><br>(Workflow API section)</p>              |
| A thing is modified | Triggers when a change happens in the database, regardless of source.                                                                                                                                                                                                              | [A thing is modified](/core-resources/bubble-workflows/bubble-events/backend-event-properties/trigger-event-a-thing-is-modified) |
| Recurring event     | Recurring events can be triggered or scheduled and will then run at a specified interval.                                                                                                                                                                                          | [Recurring event](/core-resources/bubble-workflows/bubble-events/backend-event-properties/recurring-event-properties)            |

## Bubble-made plugin events (web)

| Event category            | Description                               | Link                                                                                                  |
| ------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Bubble-made plugin events | Events related to plugins made by Bubble. | [Bubble-made plugin events](/core-resources/bubble-workflows/bubble-events/bubble-made-plugin-events) |

<table><thead><tr><th>Category</th><th width="126.203125">Web/mobile</th><th>Description</th><th>Link</th></tr></thead><tbody><tr><td>Account</td><td>Both</td><td>Actions related to user accounts.</td><td><a data-mention href="/pages/AtvmSLbVgKj4M2V2Pzpj">/pages/AtvmSLbVgKj4M2V2Pzpj</a></td></tr><tr><td>Navigation</td><td>Web</td><td>Actions related to web-specific navigation.</td><td><a data-mention href="/pages/fysfjGRIZUomTIC13Pp5">/pages/fysfjGRIZUomTIC13Pp5</a></td></tr><tr><td>Navigation</td><td>Mobile</td><td>Actions related to mobile-specific navigation.</td><td><a data-mention href="/pages/HFHHWwmIBgp0R1ftC4zk">/pages/HFHHWwmIBgp0R1ftC4zk</a></td></tr><tr><td>Data (things)</td><td>Both</td><td>Actions related to the database.</td><td><a data-mention href="/pages/oqiw0tFEKQv4w810mb2e">/pages/oqiw0tFEKQv4w810mb2e</a></td></tr><tr><td>Elements</td><td>Both</td><td>Actions related to elements.</td><td><a data-mention href="/pages/jBFRRz2u1brrkN2NclGa">/pages/jBFRRz2u1brrkN2NclGa</a></td></tr><tr><td>Email and notifications</td><td>Both</td><td>Actions related to sending emails and push notifications.</td><td><a data-mention href="/pages/2U66sb2WW4UpSaCxY9Yr">/pages/2U66sb2WW4UpSaCxY9Yr</a></td></tr><tr><td>Native mobile actions</td><td>Mobile</td><td>Mobile-specific actions</td><td><a data-mention href="/pages/QRdUg8x1O9U43N5cFkKQ">/pages/QRdUg8x1O9U43N5cFkKQ</a></td></tr><tr><td>Custom actions</td><td>Both</td><td>Actions related to triggering/scheduling custom events and reacting to database changes.</td><td><a data-mention href="/pages/cMxR69cKAafTkeQPf4YN">/pages/cMxR69cKAafTkeQPf4YN</a></td></tr><tr><td>Bubble-made plugin actions</td><td>Web</td><td>Actions related to plugins made by Bubble.</td><td><a data-mention href="/pages/DWuM09YMLrc47ca8It7y">/pages/DWuM09YMLrc47ca8It7y</a></td></tr><tr><td>In-app purchase actions</td><td>Mobile</td><td>Actions related to mobile in-app purchase actions (iOS and Android)</td><td><a data-mention href="/pages/43yY6ZbnnwBEV0deP2aB">/pages/43yY6ZbnnwBEV0deP2aB</a></td></tr></tbody></table>

[^1]: *Conditions*, or *conditional* [*expressions*](#user-content-fn-3)\[^3]*,* let you set up mechanisms that check whether a specific question returns a *yes* or a *no* answer and then take an action, stop an action or make a change in your app in response.

    User manual article: [Conditions](/help-guides/logic/conditions)

    User manual article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^2]: *Dynamic expressions* are like "live" formulas that update in real-time based on user input, database updates and other changes in your app.\ <br>

    User manual article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)
