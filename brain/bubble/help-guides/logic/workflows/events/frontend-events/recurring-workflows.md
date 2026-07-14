# Recurring workflows
> Source: https://manual.bubble.io/help-guides/logic/workflows/events/frontend-events/recurring-workflows · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers recurring client-side workflows

If you need to run a workflow multiple times with a set interval in-between, you an use a *Do every 5 seconds* event.

<figure><img src="/files/O7mgspT5U44mUbnqVtfZ" alt=""><figcaption></figcaption></figure>

The **5** is flexible, so you can set it to any number of seconds that you want, including decimals, and the workflow will keep running until you stop or the page is closed.

<figure><img src="/files/yC3yH1iZ5L06yjEB9EX7" alt=""><figcaption><p>The interval is customizable – in the example above, we've set it to 3.5 seconds.</p></figcaption></figure>

{% hint style="warning" %}
Keep in mind that continuously repeating a a workflow can potentially slow down your app (depending on what the workflow is doing), especially as your app scales with more users.

We recommend that you mostly use this event for [client-side actions](#user-content-fn-1)[^1], and that you do careful testing to see how it affects your app performance-wise if you are using [server-side actions](#user-content-fn-2)[^2] like database operations.
{% endhint %}

If you want to run a workflow continuously even if the page is closed, you may consider using [recursive API workflows](#user-content-fn-3)[^3] instead. Note that they can only run server-side actions.

[^1]: *Client-side actions* are actions that take place on the user's device (such as setting a custom state or changing the visibility of an element), as opposed to actions that happen on the server (such as database operations).

    In the context of recurring workflows, client-side actions are more lightweight to process, since they require no data to be sent to and/or from the server.

[^2]: *Server-side actions* are actions that take place on the Bubble server, as opposed to on the user's device. Server-side actions include making changes to the database.

    In the context of recurring workflows, server-side workflows can be taxing on the Bubble server, since they involve sending information back and forth and spending server capacity.

[^3]: Recursive API Workflows are backend workflows that run, and then schedule themselves to run one more time immediately or after a delay. They are useful for setting up workflows that should be repeated or executed on a list of things.

    Article: [Recursive API Workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/recursive-api-workflows)
