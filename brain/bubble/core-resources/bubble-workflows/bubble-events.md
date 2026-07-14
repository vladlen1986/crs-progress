# Events and properties
> Source: https://manual.bubble.io/core-resources/bubble-workflows/bubble-events · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Events trigger workflows[^1].

<figure><img src="/files/hSA6ohISkg2sxudIaUFe" alt="" width="563"><figcaption></figcaption></figure>

## Event properties

Events have different properties depending on the type of event. An event is always the top element in a workflow. When you select the event, the property editor appears in the panel on the left.

<figure><img src="/files/AJJQON8lxlxYZKOi622O" alt=""><figcaption><p>Select an event or action to display the property editor and manage properties.</p></figcaption></figure>

The **Properties** section lists all events associated with the selected element. In the **Only when** section, you can add conditional expressions that determine whether the event runs.

General event and action properties are described in the article below:

{% content-ref url="/pages/LLilsGUG695atHtijTjV" %}
[The workflow property editor](/core-resources/bubble-workflows/the-workflow-property-editor)
{% endcontent-ref %}

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

[^1]: A *workflow* is the combination of an event and one or more actions.

    Article: [Workflows](/help-guides/logic/workflows)\
    Reference: [Workflows](/core-resources/workflows)
