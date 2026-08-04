# Input forms (web)
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/input-forms · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

This section covers Input forms. These are element that accept data input from a user such as text, numbers, dates, uploads and dynamic content.

Input forms are how you collect information from your users. They range from simple text fields and checkboxes to more advanced controls like date pickers, dropdowns, and file uploaders.

Bubble includes a range of built-in input types for common needs, letting you build everything from a quick signup form to a detailed multi-step questionnaire.&#x20;

{% hint style="info" %}
Bubble includes a wide range of built-in input types for common needs. If you need something more specialized, the [plugin store](https://bubble.io/plugins) offers additional inputs from Bubble and the community.
{% endhint %}

## Categories of input

User input can mean many things, and most apps combine several input types to make forms easy to fill out and to collect data in the right format.

<table><thead><tr><th width="169.29296875">Category</th><th width="332.015625">Purpose</th><th>Examples</th></tr></thead><tbody><tr><td><a href="/pages/9usn2lynDsMjIzGqjm6r">Text and numbers</a></td><td>Collect written or numerical values, from short entries like names and email addresses to long-form content like descriptions. Supports plain and rich text.</td><td>Text input, multiline input, number input</td></tr><tr><td><a href="/pages/yU4rI57C4wpL8CQuejLA">Dates and time</a></td><td>Collect date and time values.</td><td>Date/time picker, date range picker</td></tr><tr><td><a href="/pages/yF6fIrsbNIvkMzWEmd8K">File uploads</a></td><td>Let users upload files.</td><td>File uploader, image uploader</td></tr><tr><td><a href="/pages/uNmsNaHIMteorQ6PaDIa">Selection controls</a></td><td>Present pre-defined options for the user to choose from, either static or dynamic.</td><td>Checkbox, radio button, dropdown, sliding switch</td></tr></tbody></table>

## Combining inputs into forms

Most real interfaces combine several inputs into a single form. A signup form, for example, typically includes text inputs for a name and email, a password input, and a submit button. A checkout form might combine text inputs, dropdowns, and a date picker.

<figure><img src="/files/X0JLOEx4Tmcu2k0QsY5w" alt="Laptop showing a signup form."><figcaption><p>A simple signup form like the one above combines several different categories of input forms to make the UI easy for your users to understand and to prepare the data for processing – such as saving it in the database.</p></figcaption></figure>

There's no dedicated "form" element in Bubble. Forms are built by placing multiple inputs inside a container (usually a group) and setting up a workflow that reads their values when the user submits.

A common pattern:

1. Place the inputs inside a group.
2. Give the group a [*Type of content*](#user-content-fn-1)[^1] that matches the record being created or edited, such as `User`.
3. Add a *Submit* button below the inputs.
4. Set up a workflow that runs when the button is clicked, referencing the inputs' values to create or update the record.

This makes forms easy to organize, style, and reset as a unit.

## Input values

### Referencing input values

Every input element has a value that can be referenced in expressions. For example, `Input Email's value` returns whatever the user has typed into the email input.

Input values are used in:

* **Workflows.** Actions like [*Create a new thing*](/core-resources/bubble-workflows/bubble-actions/database-actions#create-a-new-thing) or [*Make changes to a thing*](/core-resources/bubble-workflows/bubble-actions/database-actions#make-changes-to-thing) can pull values directly from inputs to save them to the database.
* **Expressions.** Text elements, conditions, and other inputs can reference the value of another input to display or react to it.
* **Conditions.** Element visibility, styles, and behavior can respond to what the user has typed.

### Setting initial content

Most inputs support an *Initial content* setting, which populates the input with a value when the page loads. This is useful for edit forms, where the current data should be pre-filled so the user can update it.

<figure><img src="/files/NsyywxmK9QwoDsYrsOLu" alt="Setting the initial content property of an input element."><figcaption></figcaption></figure>

For example, an "edit post" form might load with `Parent group's Post's excerpt` as the initial content in the excerpt input.

Initial content is dynamic, so it updates automatically if the underlying data changes.

### Triggering a workflow when an input is changed

{% hint style="info" %}
If you want to save data immediately when an input's value is changed, you can also use [auto-binding](#auto-binding).
{% endhint %}

You can trigger a workflow whenever the value of an input changes, using the [*An input's value is changed*](/core-resources/bubble-workflows/bubble-events/frontend-event-properties/element-event-properties#an-inputs-value-is-changed) event. This is useful for real-time actions, such as saving changes to the database whenever the value changes. &#x20;

<figure><img src="/files/bxj40kOA3CNv7ynNTF2h" alt="The &#x22;In input&#x27;s value is changed&#x22; event."><figcaption><p>Using the <a href="/pages/PsKwiWQlXizeRXZbz1so#an-inputs-value-is-changed"><em>An input's value is changed</em></a> event, you can trigger a workflow immediately when the value of an input form changes.</p></figcaption></figure>

Workflows can also be triggered by clicking submit buttons, pressing Enter inside an input, or interacting with any other element in the form.

### Resetting inputs

{% hint style="info" %}
The [*Reset relevant inputs*](/core-resources/bubble-workflows/bubble-actions/element-actions#reset-relevant-inputs) action returns each input to its original state, which may include a default value rather than clearing it entirely.
{% endhint %}

The [*Reset relevant inputs*](/core-resources/bubble-workflows/bubble-actions/element-actions#reset-relevant-inputs) action resets all inputs used in the current workflow, returning them to empty or to their default values. This is useful after submitting a form, so the fields are ready for the next entry.

<figure><img src="/files/DDtVw9xg82ey9yTQaBNS" alt="The &#x22;Reset relevant inputs&#x22; action."><figcaption><p>The reset relevant inputs action returns each input used in the workflow to its original state.</p></figcaption></figure>

Alternatively, resetting a group with [*Reset a group/popup*](/core-resources/bubble-workflows/bubble-actions/element-actions#reset-a-group-popup) clears every input inside the group at once, regardless of which workflow they were used in.

## Validation and required fields

Inputs support validation to help ensure users provide the right kind of data. Options include:

* **Content format.** Restricting an input to a specific format, such as email, integer, decimal or password.
* **Required fields.** Marking inputs as required, which prevents submit buttons from running workflows until the required inputs are filled.
* **Min and max values.** Setting numerical or date limits for what the input accepts.

<figure><img src="/files/jhQSp9vIRoCdbdz5RDS7" alt="Choosing the format of a text input element."><figcaption><p>Use the <em>Format</em> property to set an input format. The example above shows a text input element.</p></figcaption></figure>

Validation is a UI convenience and helps guide users to fill out forms correctly, but it isn't a security measure. Data sent to the server should still be validated [server-side](/help-guides/security/client-side-and-server-side).

## Auto-binding

Auto-binding is a feature that saves an input's value directly to the database as the user changes the value, without needing a workflow to trigger the save. It's a fast way to build "always saved" experiences, where changes are persisted automatically instead of waiting for a submit button.

### **How auto-binding works**

When auto-bind is enabled on an input, three things need to be in place:

1. The input sits inside a container with a *Type of content* set to the record being edited, such as `Current User`.
2. The input's *Field to modify* property is configured to save to a specific field on that record.
3. The relevant [privacy rules](#user-content-fn-2)[^2] allow auto-binding on that field.

<figure><img src="/files/dWKJRNlC7X5GGQeImrpZ" alt="Auto-binding properties of a text input element."><figcaption><p>Auto-binding lets you automatically save changes to the database as the input's value changes.</p></figcaption></figure>

Once these are set, any change to the input value is written straight to the database. There's no need for a *Save* button or a workflow to handle the update.

### **When to use auto-binding**

Auto-binding works best in scenarios where you want fields to be saved instantly as the user interacts with input elements. You cannot create new things with auto-binding, only make changes to existing ones.

For forms that need to be validated before saving, or where the user should have a chance to review changes, a standard workflow with a submit button is usually a better fit.

### **Auto-binding and privacy rules**

Auto-binding is controlled by privacy rules. For a field to be editable through auto-bind, the current user must match a privacy rule that grants auto-bind access to that specific field.

<figure><img src="/files/UPreNlsLO19ybJkVS6pY" alt="Privacy rules for auto-binding."><figcaption><p>Auto-bind privacy rules controls what fields a user who matches the rules can edit.</p></figcaption></figure>

This gives you fine-grained control over which fields can be edited through auto-binding, even when the data itself is visible. For example, a user might be able to view a shared document but only auto-bind edits to fields they own.

### **Things to keep in mind**

* **Changes are saved instantly.** There's no confirmation step, so undoing an accidental change means restoring the previous value manually.
* **Every change is a database write.** Rapidly changing inputs can generate a lot of workload. For inputs that update frequently, consider using a workflow that saves on blur or after a short delay instead.
* **Auto-binding is web-only.** On native mobile, values need to be saved through workflows.

## Input forms and security

Inputs can be disabled through the *This input is disabled* property, which makes them read-only in the UI. This is a display setting, **not** a security control.

For real security, use privacy rules to control who can see and modify data in the database, and add server-side conditions to your workflows so sensitive actions only run when the user is authorized.

**Article series:** [Security](/help-guides/security)\
**Article:** [Client-side and server-side](/help-guides/security/client-side-and-server-side)

## FAQ: Input forms

<details>

<summary>How do I read the value of an input?</summary>

Use an expression like `Input Email's value`. Every input has a value that can be referenced in workflows, expressions, and conditions.

</details>

<details>

<summary>How do I pre-fill an input with data?</summary>

Use the [*Initial content*](#setting-initial-content) property to set a default value. This can be static text or a dynamic expression, such as `Current User's name`. When auto-bind is enabled, the initial content is populated automatically from the auto-bound field.

</details>

<details>

<summary>How do I clear an input after the user submits a form?</summary>

Add the [*Reset relevant inputs*](/core-resources/bubble-workflows/bubble-actions/element-actions#reset-relevant-inputs) action to the workflow that runs when the form is submitted. It clears all inputs used in that workflow. To clear every input in a group at once, use [*Reset a group/popup*](/core-resources/bubble-workflows/bubble-actions/element-actions#reset-a-group-popup) on the containing group.

</details>

<details>

<summary>Can I trigger a workflow every time the user types?</summary>

Yes. Use the [*An input's value is changed*](/core-resources/bubble-workflows/bubble-events/frontend-event-properties/element-event-properties#an-inputs-value-is-changed) event to run a workflow every time the input's value updates. Bubble triggers this event automatically as the user types.

{% hint style="info" %}
Be careful when running workflows on every input change. The event can trigger very frequently, which can quickly generate a high number of workflow runs, consume workload, and slow down the user experience.
{% endhint %}

</details>

<details>

<summary>How do I make an input required?</summary>

Enable the This input should not be empty option in the input's properties. When the input is empty, workflows that depend on it won't run until it's filled.

</details>

<details>

<summary>Can I validate the format of a text input?</summary>

Yes. Set the Content format property to restrict the input to a specific format. Validation runs client-side and gives immediate feedback in the UI.

For more advanced validations, use conditions.

</details>

<details>

<summary>How do I save the value of an input to the database?</summary>

Use a workflow triggered by the submit button. Add a [*Create a new thing*](/core-resources/bubble-workflows/bubble-actions/database-actions#create-a-new-thing) or [*Make changes to a thing*](/core-resources/bubble-workflows/bubble-actions/database-actions#make-changes-to-thing) action, and reference the input's value in the field you want to save, such as `Input Email's value`.

</details>

<details>

<summary>Can I autosave inputs as the user types?</summary>

Yes. Use the [*An input's value is changed*](/core-resources/bubble-workflows/bubble-events/frontend-event-properties/element-event-properties#an-inputs-value-is-changed) event to run a [*Make changes to a thing*](/core-resources/bubble-workflows/bubble-actions/database-actions#make-changes-to-thing) action every time the input value changes. Alternatively, enable auto-bind on the input to save the value automatically to the parent group's thing.

</details>

<details>

<summary>Can I disable an input based on a condition?</summary>

Yes. Add a condition to the input that sets This input is disabled to yes when the condition is true. Remember that disabling is a UI control, not a security measure.

</details>

<details>

<summary>How do I combine multiple inputs into a form?</summary>

Place the inputs inside a group with a [Type of content](#user-content-fn-1)[^1] matching the record you want to create or edit. Add a submit button that runs a workflow to save the inputs' values to the database.

</details>

<details>

<summary>Are input elements the same in web and native mobile apps?</summary>

Most input types are available on both platforms, but some inputs and options are specific to one. Refer to the article on mobile inputs for details on how they differ.

</details>

## Other ways to learn

<details>

<summary>Video lessons</summary>

* [How to trigger workflows from input changes](https://www.youtube.com/watch?v=mDEVJLujlkQ)

</details>

[^1]: The **Type of content** property tells Bubble what kind of data the container will hold, such as `User` or `Post`. This determines what data source it accepts and what child elements can reference through `Parent group`.

[^2]: **Privacy rules** are settings that control who can see and modify data in your database. They're evaluated on the server, making them the primary way to keep sensitive data secure and to control access at the field level.

    **Article:** [Privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)
