# Conditional element properties
> Source: https://manual.bubble.io/core-resources/bubble-elements/conditional-element-properties · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Conditionals let you dynamically change how elements behave or appear based on defined criteria.

When a specified condition evaluates as true, the element’s properties update automatically. This allows you to modify visibility, style, content, layout, or other settings in response to user actions, data changes, or page state, without requiring workflows. A counter next to the tab name shows the number of conditionals currently on that element (if there are any).

> **Example:** A button with a blue color can be set to gray if the user is not logged in. To do this, set up the expression `Current User is Logged in`, and then set up the element's background color property to a gray color.

Conditionals are evaluated from top to bottom. If multiple conditions are true and they modify the same property, the lowest matching condition in the list takes precedence and overrides the others.

## Add conditional

To add a new conditional, click the + symbol in the header bar of the conditional tab.

## Expanding conditionals

To expand all conditionals and view their full property changes, click the expand icon in the header bar of the Conditional tab.

<figure><img src="/files/41KXIGwiFmHqHbUQpbow" alt="" width="101"><figcaption></figcaption></figure>

## How conditionals work

Conditionals function as if–this–then–that logic.

They consist of two parts:

* **When**: The condition that determines whether the rule applies. This is defined as a dynamic expression that returns a yes/no value
  * **Example**: `Current User is logged in`
* **Then**: The property or properties that change when the condition is true. This can include most built-in element properties, such as visibility, colors, borders, shadows, layout settings, or content.
  * **Example:** This element is visible (unchecked)

The easiest way to understand conditionals is to read them out as they're displayed in the property editor.

<figure><img src="/files/Pu3GTeHvLuDob2PIKw9b" alt="" width="346"><figcaption></figcaption></figure>

Reading this information as a sentence, we can quickly see:

* **Conditional:** this is a conditional.
* **When**
  * **Current User is Logged in:** a dynamic expression that returns a yes or no.
* **Then**
  * **This element is visible (unchecked):** this element should be visible.

As a sentence:

> When the `Current User is Logged in`, this element visibility should be set to `yes`.

{% hint style="warning" icon="lock" %}
**Security note:** Hiding elements with conditionals is a UI-level setting and should not be considered a secure way to prevent access or interaction. To properly restrict data access, use privacy rules in the Data tab. To control workflow behavior, enforce server-side conditions in workflows.
{% endhint %}

### The condition

The condition (the **When** part) follows these rules:<br>

* **The dynamic expression must return a yes/no value.**
  * If the expression doesn't return a yes/no value, **add an operator or comparison** to convert it into a boolean, such as:
    * Text → `Input's value is not empty`
    * Number → `Search for Orders:count > 0`
    * Date → `Current date/time > Event's date`
    * List → `Search for Users:count is 0` or `User's roles contains "admin"`<br>
* **Use the `and` operator** to require **multiple** criteria to be true. For example:\
  `Current User is logged in and Current User's admin is yes`
  * In this case, the user must both be logged in and have their *admin* field set to `yes`.<br>
* **Use the `or` operator** to allow the condition to pass if at least **one** criterion is true. For example:\
  `Current User's email is test@bubble.io or Current User's admin is yes`
  * Here, the user must either have the specified email address or have their *admin* field set to yes.<br>
* **Conditions are evaluated continuously.** If the underlying data changes, the conditional re-evaluates automatically<br>
* **Keep performance in mind.** Searches inside conditionals consume workload just like any other database operation.<br>
* **Multiple conditionals can evaluate as true at the same time**. If they modify the same property, the lowest matching conditional in the list overrides the others.

### The property change

The property change(s) follow these rules:<br>

* **The conditional only applies to the selected element.** Each element has its own set of conditionals.
  * Container elements can pass down certain property changes. For example, if a group is set to be invisible, its child elements will inherit that behavior.<br>
* Each conditional **can modify multiple properties** at once.<br>
* The new values can be **static or dynamic expressions**, depending on the property.<br>
* If multiple conditionals are true and they modify the same property, **the lowest matching conditional overrides the others**.<br>
* **If no condition is true**, the element **falls back to its default property values** (as defined in the Visual and Interaction tabs).<br>
* **Property changes apply immediately when the condition becomes true** and revert automatically when it becomes false.

## Changing conditionals

### Deleting a conditional

Do delete a conditional, click the ellipsis icon and select *Delete* from the dropdown.

### Moving a conditional

Conditionals are evaluated to-to-bottom and the lowest matching conditional overrides the others. As such, you may need to change their order. There are two ways to move a conditional:

* Hover the relevant conditional, and the drag handle <img src="/files/vYcyfz6a3fGtYXZNRf3K" alt="" data-size="line"> will appear. Click and hold to move the conditional up or down.
* Click the ellipsis icon and select *Move to top* or *Move to bottom* from the dropdown.

### Copy/pasting a conditional

You can copy and paste conditionals within the same element or between different elements. There are two methods:

#### Copying one condition

{% stepper %}
{% step %}

### Set up the conditional on one element

Select one of the elements and set up the condition.
{% endstep %}

{% step %}

### Copy the condition

Right-click the condition that you want to apply to the second element, and select *Copy*.
{% endstep %}

{% step %}

### Select the second element

Click the second element to bring up the property editor, navigate to the *Conditional* tab.
{% endstep %}

{% step %}

### Paste the condition

Right-click in the conditionals section and click *Paste condition.* Copying and pasting a named element copies the name as-is, with no prefix or suffix added.
{% endstep %}
{% endstepper %}

#### Copying multiple conditions

{% stepper %}
{% step %}

### Set up the conditional on one element

Select one of the elements and set up the conditionals you need.
{% endstep %}

{% step %}

### Copy the conditions

Right-click the element itself on the canvas, and navigate to *Copy special* and select *Copy conditional expressions*.
{% endstep %}

{% step %}

### Select the second element(s)

Select one or more elements.
{% endstep %}

{% step %}

### Paste the conditions

After having made your selection, right-click one of them, navigate to *Paste special* and select *Paste conditional expressions.* Copying and pasting a named element copies the name as-is, with no prefix or suffix added.
{% endstep %}
{% endstepper %}

{% hint style="warning" %}
**Note:** When pasting conditionals onto a different element, both the dynamic expression and properties may become invalid if the target element doesn't support the same properties.

* **Dynamic expression:** If the expression isn't compatible with the new element, it will be marked as invalid and flagged by the issue checker.
* **Properties:** If any properties in the conditional aren't supported by the new element, they are removed silently — the issue checker won't flag this.
* **Elements of the same type:** Pasting to an element of the same type works in most cases, but keep in mind that even elements of the same type can have different properties. For example, the *Type of content* of a group may differ between instances.

Always review conditionals on the target element after pasting.
{% endhint %}

### Duplicating a conditional

Instead of copy/pasting, you can also duplicate a conditional.

{% stepper %}
{% step %}

### Open the contextual menu

Click the ellipsis icon in the top-right corner of the conditional.
{% endstep %}

{% step %}

### Select *Duplicate*

Select *Duplicate* from the dropdown. The conditional will be placed at the bottom of the list. Keep in mind that conditions are evaluated top-to-bottom. Duplicating a named element copies the name as-is, with no prefix or suffix added.
{% endstep %}
{% endstepper %}

### Previewing conditionals

You can preview a conditional’s property changes to verify that they appear as expected. To preview, hover the conditional and click the Play icon <img src="/files/GqXE6xbaGcmpTPFNay8u" alt="" data-size="line"> in the conditional’s top bar. Click it again to disable the preview. This feature only affects the editor view. It does not change the app’s behavior at run-time.

<figure><img src="/files/gyTjQEL7qn7VASMK79cc" alt="" width="257"><figcaption><p>Hovering the conditional and clicking the preview icon shows you what the element will look like when the condition returns a <code>yes</code>.</p></figcaption></figure>

## Naming conditionals

You can give each conditional a name to make it easier to identify and navigate. The default name is *Conditional*, and you can change it by clicking the label at the top of the conditional. The name does not affect the conditional in any way.

Copying and pasting a named element copies the name as-is, with no prefix or suffix added.

{% hint style="warning" icon="lock" %}
**Sensitive data:** Conditional names don't affect how your app runs, but they are visible in your app's source code. Avoid including any sensitive information in the name.
{% endhint %}

##
