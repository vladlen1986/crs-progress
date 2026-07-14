# Backend workflows
> Source: https://manual.bubble.io/core-resources/bubble-workflows/bubble-actions/backend-workflows · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Cancel a scheduled API workflow

This action cancels a previously scheduled API workflow, identified by the ID returned when the workflow was scheduled.

### Scheduled API ID

The ID of the scheduled workflow to cancel.

## Cancel a list of scheduled API workflows

This action cancels a list of previously scheduled API workflows, identified by the IDs returned when the workflows were scheduled.

### List of scheduled API IDs

The expression that returns the list of IDs to cancel. Must be a list of texts.

## Return data from API

Returns data from an API workflow.

### Content-type

The type of content you want to return:

<table><thead><tr><th width="186.08123779296875">Content-type</th><th width="262.015625">Description</th><th>Sun-properties</th></tr></thead><tbody><tr><td>Plain text</td><td>Returns plain, unformatted and unstructured text.</td><td></td></tr><tr><td>Structured JSON</td><td>Returns structured JSON with custom JSON parameters.</td><td><strong>JSON parameters:</strong> click + to add a parameter</td></tr><tr><td>Other content-type</td><td>Returns a custom content tupe.</td><td><strong>Custom type:</strong> the type of data you want to return.<br><strong>Custom content to return:</strong> the content to be returned.</td></tr></tbody></table>

## Schedule API workflow

This action schedules an API workflow to run at a specific point in the future. To run the workflow immediately, use the *current date/time* operator as the scheduled date.

### API workflow

The API workflow to run. These are defined in the *Backend workflows* page, found in the application menu above the palette. If the workflow takes parameters, they appear in the property editor.

### Scheduled date

The date and time to run the workflow.

### Ignore privacy rules when running the workflow

By default, a scheduled workflow runs in the context of the user who scheduled it, and all privacy rules apply to that user. Check this box to run the workflow as an admin with full access to all data.

{% hint style="warning" %}
This option bypasses privacy rules. Use it with caution.
{% endhint %}

### Workflow parameters

The parameters defined at the API workflow level.

## Schedule API workflow on a list

This action schedules an API workflow to run on each item in a list of things. Each workflow run operates on a single item and counts as one workflow run. This action supports lists of up to roughly 100,000 records.

The list is evaluated at the time of scheduling. If a thing matches the search at scheduling time but is later modified so that it no longer matches, the workflow still runs on it.

### Type of things

The type of thing to iterate over.

### List to run on

The list to iterate over. Can be the result of a search or an API call.

### API workflow

The API workflow to run on each item. These are defined in the *Backend workflows* page, found in the application menu above the palette. If the workflow takes parameters, they appear in the property editor.

### Scheduled date

The date and time to run the workflows.

### Interval (seconds)

The gap between each scheduled workflow run.

Leaving this field empty schedules workflows with a slight default gap. This helps balance completion speed with allowing other workflows in your app to run at the same time. When an app places a heavier load on the system — such as scheduling a very large number of workflows — completion times may vary to keep overall performance stable.

Setting the interval to 0 is possible but blocks all other scheduled workflows until the entire batch completes. Leaving the field at its default is usually more effective, as it allows all scheduled workflows to be processed without significant delay.

If your workflows interact with external APIs that have strict rate limits, you can use the interval to slow down execution and avoid HTTP 429 errors.

Note that adding an interval doesn't guarantee that workflows won't overlap. To force sequential execution, consider using recursive workflows instead.

{% hint style="warning" %}
Keep in mind the hard limits on list lengths that can be scheduled. See the [hard limits](/help-guides/maintaining-an-application/performance-and-scaling/hard-limits) article for details.
{% endhint %}

### Ignore privacy rules when running the workflow

By default, a scheduled workflow runs in the context of the user who scheduled it, and all privacy rules apply to that user. Check this box to run the workflow as an admin with full access to all data.

{% hint style="warning" %}
This option bypasses privacy rules. Use it with caution.
{% endhint %}

### Workflow parameters

The parameters defined at the API workflow level.
