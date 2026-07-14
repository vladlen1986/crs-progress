# Custom event properties
> Source: https://manual.bubble.io/core-resources/bubble-workflows/bubble-events/frontend-event-properties/custom-event-properties · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Bubble allows custom workflows[^1] to reuse the same logic in more than one workflow.

* The *Create a custom event* event defines the workflow
* You can **trigger** a custom event in two ways:
  * The [*Trigger a custom event*](/core-resources/bubble-workflows/bubble-actions/custom-actions#trigger-a-custom-event) action
  * The [*Schedule a custom event*](/core-resources/bubble-workflows/bubble-actions/custom-actions#schedule-a-custom-event) action

To learn more about custom events, see our dedicated [User manual](/help-guides/logic/workflows/events/frontend-events/custom-events) article.

## Properties

### Custom event name

The name of the custom event. The name does not affect how the custom event works, and it's not visible to your users.

{% hint style="warning" icon="lock" %}
**Custom event names** aren't visible in your app, but they are visible in the app's source code. **Avoid including any sensitive information in the name.**
{% endhint %}

{% hint style="info" %}
A custom event has two separate identifiers: the custom event name and the workflow name. The workflow name appears in the workflows list on the right-hand side of the editor, while the custom event name is what you reference when triggering the event from another workflow.
{% endhint %}

### Parameters

You can include parameters when you trigger a custom event. These parameters first need to be defined on the custom event itself.

* **Name:** This field accepts any name you want to give the parameter.
* **Type:** This field determines what data type the parameter should expect, such as *User, text,* or *number.*
* **Optional:** if checked, the parameter will not be treated as required. If unchecked, the Bubble issue tracker will create an issue if you use the [*Trigger a custom event*](/core-resources/bubble-workflows/bubble-actions/custom-actions#trigger-a-custom-event) *or* [*Schedule a custom event*](/core-resources/bubble-workflows/bubble-actions/custom-actions#schedule-a-custom-event) actions without specifying the required parameters.
* **Is a list/array**: if checked, the parameter will accept lists, such as multiple users or texts.

{% hint style="warning" icon="lock" %}
Parameter event names aren't visible in your app, but they are visible in the app's source code. **Avoid including any sensitive information in the name.**
{% endhint %}

### Return values <a href="#return-values" id="return-values"></a>

If you intend for the custom workflow to provide a return value, such as the outcome of a calculation, specify the type and label for this new return value here.

* Return values can be any type of data, just like parameters.
* Use the [*Return data* action](https://manual.bubble.io/~/changes/1175/core-resources/actions/custom#return-data) in the custom workflow to return data.
  * Use conditions to specify whether the data should be returned.
* The workflow will **stop running** if it hits a valid *Return data* action.

[^1]: A *workflow* is the combination of an event and one or more actions.

    Article: [Workflows](/help-guides/logic/workflows)\
    Reference: [Workflows](/core-resources/workflows)
