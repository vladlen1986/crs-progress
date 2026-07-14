# Conditional workflow properties
> Source: https://manual.bubble.io/core-resources/bubble-workflows/conditional-workflow-properties · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Conditions let you control whether a workflow event or action runs based on defined criteria.

When a condition is set on an event, the entire workflow only runs if that condition evaluates as true. When a condition is set on an individual action, only that action is skipped or run based on the result. This lets you build conditional logic directly into your workflows without duplicating them.

### How conditions work

Conditions function as if–this–then logic.

A condition consists of a single part:

* **When**: The condition that determines whether the event or action runs. This is defined as a dynamic expression that returns a yes/no value.
  * **Example:** `Current User is logged in`

If the condition evaluates as true, the event or action runs. If it evaluates as false, it's skipped.

#### The condition

The condition follows these rules:

* **The dynamic expression must return a yes/no value.** If the expression doesn't return a yes/no value, add an operator or comparison to convert it into a boolean, such as:
  * Text → `Input's value is not empty`
  * Number → `Search for Orders:count > 0`
  * Date → `Current date/time > Event's date`
  * List → `Search for Users:count is 0` or `User's roles contains "admin"`
* **Use the `and` operator** to require multiple criteria to be true. For example: `Current User is logged in and Current User's admin is yes`
* **Use the `or` operator** to allow the condition to pass if at least one criterion is true. For example: `Current User's email is test@bubble.io or Current User's admin is yes`
* **Conditions are evaluated each time the event or action is about to run.** If the underlying data changes between runs, the condition reflects the latest state.
* **Keep performance in mind.** Searches inside conditions consume workload just like any other database operation.

### Setting a condition on an event

A condition on an event controls whether the entire workflow runs. If the condition is false when the event fires, no actions in the workflow run.

To add a condition to an event, select the event and open its property editor. Click *Add a conditional* and define the expression.

### Setting a condition on an action

A condition on an action controls whether that specific action runs, independently of other actions in the same workflow. If the condition is false, the action is skipped and the workflow continues to the next step.

To add a condition to an action, select the action and open its property editor. Click *Add a conditional* and define the expression.

### Naming conditions

You can give each condition a name to make it easier to identify and navigate. The default name is *Condition*, and you can change it by clicking the label at the top of the condition. The name has no effect on how the condition runs.

{% hint style="warning" %}
Condition names don't affect how your app runs, but they are visible in your app's source code. Avoid including any sensitive information in the name.
{% endhint %}
