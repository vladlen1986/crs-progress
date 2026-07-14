# Backend custom events
> Source: https://manual.bubble.io/help-guides/logic/workflows/events/backend-events/backend-custom-events · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

A backend custom event is a backend workflow that can be triggered from the frontend. It's similar to an API workflow, with a few key differences:

* **Privacy rules can be overridden at the action level.** You can choose whether to respect or ignore privacy rules directly on the *Trigger backend custom event* action, rather than at the workflow level.
  * **Note:** Even when overriding privacy rules is enabled, the return data is still subject to privacy rules. Read more about this [below](#privacy-rules-and-return-data).
* **They aren't scheduled like API workflows.** This makes them slightly more performant.
* **The triggering workflow waits for completion.** Like a frontend custom event, the workflow that triggered the backend event pauses until it finishes before continuing.
* **Backend custom events can't be triggered from an external system.** API workflows, when configured with a public endpoint, can be triggered by an external app or system. Backend custom events are only accessible from within your own app.

## Parameters

Parameters are values passed from the triggering workflow to the backend custom event. They let the event work with different inputs each time it runs, while the logic inside stays the same.

To set up parameters, open the backend custom event and define each parameter under the event's settings. Each parameter has a name and a type, such as text, number, date, or a specific data type like *User* or *Post*.

When you call the event using the *Trigger backend custom event* action, the parameters appear as dynamic expression fields in the action's property editor.&#x20;

## Return values

A backend custom event can return data back to the workflow that triggered it. Return values are defined on the event itself, with a type and a label. Inside the event, use the *Return data* action to send a value back.

Once a return value is defined, the triggering workflow can reference the result of the backend event in subsequent steps using *Result of step X*.&#x20;

## Privacy rules and return data

When a backend custom event is set to ignore privacy rules, the event itself runs with full access to the database. However, any data returned to the triggering workflow is still subject to privacy rules in the calling context. For example, if the event returns a *User*, that user record is still filtered by the privacy rules that apply to the current user in the frontend.

{% hint style="warning" icon="lock" %}
**Security note:** When a backend custom event with override privileges returns a single thing, Bubble sends its unique ID to the client, and the record loads even if the user couldn't find it in a search. This is the same mechanic as storing a thing on another thing. Configure privacy rules carefully to **protect all sensitive fields**. If all fields are protected, only the unique ID will be visible on the client.
{% endhint %}

To return information that would otherwise be hidden by privacy rules, return it in a format that isn't bound by them. For instance, instead of returning a *User*, return the user's name as text. The text value isn't subject to privacy rules, so the information can pass through.

This pattern is useful for answering specific questions or returning small pieces of data that the user wouldn't normally have access to, without exposing the underlying records.
