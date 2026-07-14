# The debugger
> Source: https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tools/using-the-debugger · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

When encountering unexpected behavior, the debugger comes in handy for closely examining each step of a workflow or the details of an element as the app is being used.

The debugger primarily serves two key purposes:

* **Run workflows action-by-action** and check data (such as the result of a search) related to each step
* **Inspect the elements on the page** to check their attributes, conditions and associated data

The debugger does not have any visible parts in the Bubble editor, but is visible when you run your app in Development.

## Enabling and disabling the debugger <a href="#activating-the-debugger" id="activating-the-debugger"></a>

When you click *Preview* to see your app in run-mode, the debugger is automatically activated. If you want to enable or disable it, you simply have to change the [URL parameter](#user-content-fn-1)[^1] *debug\_mode*. When the debugger is enabled, you will see the parameter in the URL:

```
debug_mode=true
```

A full URL will look like the following:

```
https://my-bubble-application.bubbleapps.io/version-test?debug_mode=true
```

...or if you have multiple URL parameters:

{% code overflow="wrap" %}

```
https://my-bubble-application.bubbleapps.io/version-test?parameter=key&debug_mode=true
```

{% endcode %}

The debugger is meant for desktop use and is not designed to work on mobile.

To disable the debugger, simply remove the parameter, or set its value to *false*.

## Using the debugger

When the debugger is active, you will see a bar at the bottom of the screen when you preview your app:

<figure><img src="/files/sjQKv13NqUtESw1hqric" alt=""><figcaption><p>When the debugger is active you will see it as a bar at the bottom of the screen.</p></figcaption></figure>

{% hint style="info" %}
When the debugger is enabled, Bubble automatically adds space at the bottom of the page. This is only visible in debugging mode and not to your Live users.
{% endhint %}

<figure><img src="/files/nqRCaYz9P5SoZ3MKrThc" alt=""><figcaption></figcaption></figure>

* The **left-hand side** shows the different controllers for inspecting **workflows**
* The **right-hand side** shows the controls for inspecting **elements**

### Workflows

The left side of the Debugger is the Workflow Debugger. You can see three buttons that control how the debugger behaves when a workflow is being triggered. Three modes are possible:

1. **Normal** mode runs workflows without interruption.
2. **Slow** mode runs workflows with a a one-second pause between each action
3. **Step-by-step**' mode lets you control the execution of the workflow by pausing between each action until you click *Run next* (only visible when step-by-step mode is enabled)

Step-by-step is the most widely used debugger mode, as it gives you complete control over each action step, allowing you to progress at your own pace.

When the mode is active, Bubble will work for a workflow to be triggered by an event. As soon as that happens, it will pause on the event itself so that you can check what triggered it and any associated data.

<figure><img src="/files/SEUfw2M45ThXP3uJLF4j" alt=""><figcaption><p>The first step the debugger will show is the event that triggered the workflow. In this case it was a button-click. The step we are currently inspecting is marked in grey, and the next step is in white.</p></figcaption></figure>

Clicking *Run next* will move on to the the next step: the *Create a new Product* action:

<figure><img src="/files/OMqa6GlB8lCZy4EwpC4O" alt=""><figcaption></figcaption></figure>

Note the numbers in the screenshot above:

1. In this example, we inspect the *Name* field of the Product we are creating, where the value "T-shirt" is displayed. By clicking the value, we can trace the data source from which it is derived.
2. After clicking the value, we can see its data source on the right-hand side: in this example the value came from an input form called *Input Product name*.

By pausing at each step and examining the details of each action, you can verify if the data yields the anticipated values and is saved as intended.

{% hint style="info" %}
The debugger status is saved when the page is refreshed. If a workflow navigates to a different page or triggers a page refresh, the resuming workflow will execute subsequent actions in the same mode.
{% endhint %}

### Adding breakpoints <a href="#adding-breakpoints" id="adding-breakpoints"></a>

When working on complex pages with numerous workflows, the step-by-step mode might not be ideal since it stops too frequently. If you want to investigate a specific workflow, event, or action, you can add a breakpoint that activates the debugger in step-by-step mode when that event or action is executed.

<figure><img src="/files/wIVK30WEYWmgfqNACILY" alt=""><figcaption></figcaption></figure>

Breakpoints are added in the workflow editor, either on an event or an action. As soon as Bubble encounters that event or action, it will pause and enable step-by-step mode from that point forward.

{% hint style="info" %}
Note that this setting only has an effect when the debugger is active (meaning debug\_mode=true appears in the URL) and will not influence how your application runs in Live.
{% endhint %}

## Inspecting elements

Sometimes, you may need to determine why an element is displayed in a specific manner, particularly when using conditions or displaying data. The debugger lets you select an element on the page and view the list of conditions and fields, along with their values.

<figure><img src="/files/qJKoWIWgiYi6tsTKunlK" alt=""><figcaption></figcaption></figure>

First, to enable Inspect mode, click the *Inspect* button in the bottom right corner. There are two ways to select an element to inspect:

* You can click the element on the page (workflows will not trigger when you are in inspect mode)
* You can use the dropdown list next to the *Inspect* button and search for/select the element from there (this is useful for elements that are invisible).

### Understanding expression evaluations <a href="#understanding-expressions-evaluations" id="understanding-expressions-evaluations"></a>

When an element is selected, you can start to evaluate its properties, conditions and expressions. In the example below, we have selected the *Create Product* button.

<figure><img src="/files/uhfwPfakSpbS0jG1ufEZ" alt=""><figcaption></figcaption></figure>

Conditions are displayed in a separate list under the header *Conditions*. If they are in red color, it means the condition does *not* return true. If the condition is true, it will be displayed in a green color.

### Digging into expressions

By clicking the relevant expression[^2], you can take a closer look at each step and how it evaluates.

<figure><img src="/files/vw6X2RsUuf0GjNdXHdQ1" alt=""><figcaption></figcaption></figure>

In the example above, we can check the last part of the expression: *is logged in*. We can see that this part of the expression returns a *no*.

If we click the first part of the expression, we can see the parameters associated with the data source *Current user:*

<figure><img src="/files/VD5rfAZDvkFLLWQsbR30" alt=""><figcaption></figcaption></figure>

Any expression can be inspected in this way. Most fields on this user are empty since they are logged out, but you can see the unique ID and Created/Modified date that Bubble generates for all users who visit your app.

Each expression allows you to inspect every data source, operator and comparison. Any sub-expressions are also accessible by clicking them.

## Run-mode execution errors

The debugger also lets you identify run-mode execution errors, such as when an API call to a service returns an error due to a missing parameter. When a workflow or element encounters an error, the debugger icon turns red and becomes clickable.

Clicking on it reveals the list of errors.

When you encounter an issue, particularly when using external services through plugins, checking for execution errors in the debugger should be one of your initial troubleshooting steps.

<figure><img src="/files/5zcZRHnVcg1WHLlZdEfd" alt=""><figcaption></figcaption></figure>

## Other ways to learn

<details>

<summary>Video lessons</summary>

* [How to use the debugger](https://youtu.be/UNtXp_VDssk)

</details>

[^1]: A *URL parameter* is a piece of information added to the page's URL after a question mark (?).\
    \
    It can be used to store data and for navigation.

    Article: [Navigation](/help-guides/logic/navigation)

[^2]: *Expressions* are dynamic pieces of data or calculations that are used within elements, workflows, or conditions to define values, set up booleans, or manipulate data.

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)
