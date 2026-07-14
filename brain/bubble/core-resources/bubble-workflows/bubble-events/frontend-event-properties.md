# Frontend event properties
> Source: https://manual.bubble.io/core-resources/bubble-workflows/bubble-events/frontend-event-properties · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Frontend events are workflows that run in the browser and are typically triggered by user interactions or page-level conditions.

They are defined in the page workflow editor and are used to respond to actions such as clicks, input changes, navigation, or visual state changes. Frontend events can also run based on conditions, such as when a page loads or when a condition becomes true.

Because they run on the client, frontend events have access to page elements and their states.

| Event type         | Description                                                                                                                                                                                               | Link                                                                                                                |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **General events** | General events are triggered upon specific conditions not necessarily initiated by the user interacting with an element, such as when the page loads, a user logs in/out or a specific condition is true. | [General events](/core-resources/bubble-workflows/bubble-events/frontend-event-properties/general-event-properties) |
| **Element events** | Element events are events that are triggered by an element, such as when an element is clicked or its value changes.                                                                                      | [Element events](/core-resources/bubble-workflows/bubble-events/frontend-event-properties/element-event-properties) |
| **Custom events**  | Custom events are workflows that can be triggered by other workflows, re-using the logic in multiple places.                                                                                              | [Custom events](/core-resources/bubble-workflows/bubble-events/frontend-event-properties/custom-event-properties)   |
