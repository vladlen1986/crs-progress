# Activity types
> Source: https://manual.bubble.io/help-guides/workload/understanding-workload/what-contributes-to-workload · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how different activity types contribute to your app's total workload

We track various activity types, each of which contributes to the overall workload. We calculate the total work that occurs during each month, and reset the count at the beginning of each new month. Since every app is unique, this approach ensures a use-case agnostic way that lets you scale your app based on actual consumption.

Each of the activity types below contribute to your app’s total monthly workload. You can gain deeper insight into some of these metrics by exploring your app's workload charts and identify the areas of your app that are doing the most work and take steps to optimize their performance.

## What do activity types measure?

#### Server processing versus client-side processing

Workload incurs for work that happens on the Bubble server. This is often, but not exclusively, related to database operations. As such, operations that happen client-side (on the user's device) without having to communicate with the server, do not incur workload.

Keep in mind that a client-side action (such as show/hide an element) happens on the client, but may still incur a cost if you involve the server in another way. For example, if the show/hide action contains a condition that checks something on the server, that dynamic expression will incur a cost. Likewise, the *Go to page* action [is a client-side action](#user-content-fn-1)[^1], but it may result in loading a new page, which does incur a WU cost.

If you are looking into optimizing your app for workload, it's important to understand the difference between server-side and client-side operations.

* Article: [Client-side and server-side processing](/help-guides/workload/understanding-workload/client-side-and-server-side-processing)\
  This article covers the difference between the work that happens on the server, and what happens on the user's device (the client).<br>
* Article: [The frontend and backend](/help-guides/logic/the-frontend-and-backend)\
  This article covers the difference in operations that are triggered by your users from the frontend (your app), and operations that are triggered and performed 100% on the server (such as inbound API calls).

The table below illustrates the workload associated with various low-level server activities. These activities form the building blocks of more complex operations in your application.

## Activity types are building blocks

The table below illustrates the workload units associated with each basic activity type. **Basic activity types are the building blocks for your app's functionality.** Your app's functionality is made up of multiple basic activity types and the total cost of a specific operation is the sum of all the underlying activity types required to execute it.\
\
For example, performing a database search has the base cost reflected in the table, but the total cost can vary depending on the complexity of the search and the amount of data to search through and return.

By understanding these basic activities and their associated costs, you can better optimize your application's performance and resource usage. As a result, if the actual workload consumption doesn't match your expectations, we recommend using your [app metrics](/help-guides/workload/tracking-workload/measuring-workload/using-app-metrics) to isolate the activities that consume the most workload and look at ways to make it more efficient.

<details>

<summary>Editor vs. run-mode behavior</summary>

The table below lists workload usage across different activity types, but it’s important to understand how usage differs between the editor and run-mode. Database operations consume workload units only when they occur in run-mode—for example, when a repeating group performs a database search or an action makes changes to a thing.

These operations do not apply inside the editor. Actions such as deleting items from the database in the editor do not generate workload usage, and loading data in the App Data tab also does not contribute to workload.

The exception is CSV activity: uploading, exporting, or running bulk operations through CSV tools does incur workload units, even in the editor.

</details>

<table><thead><tr><th width="471">Activity</th><th width="119">WU</th><th>Uses<select multiple><option value="8KsK81zTbwKB" label="Backend" color="blue"></option><option value="e6fWbaCXKPjf" label="Frontend" color="blue"></option><option value="bUdA3qJ4yp2F" label="Database" color="blue"></option><option value="eB4eHoDnmnOM" label="API" color="blue"></option><option value="rr746UIPhcM8" label="SQL" color="blue"></option><option value="62v7hKf7SWix" label="Plugin" color="blue"></option></select></th></tr></thead><tbody><tr><td><strong>Page load</strong></td><td></td><td></td></tr><tr><td><a data-footnote-ref href="#user-content-fn-2">Loading page HTML</a></td><td>0.15</td><td><span data-option="e6fWbaCXKPjf">Frontend</span></td></tr><tr><td></td><td></td><td></td></tr><tr><td><strong>Plugins</strong></td><td></td><td></td></tr><tr><td>Each call to a server-side plugin action</td><td>0.2</td><td><span data-option="62v7hKf7SWix">Plugin</span></td></tr><tr><td>Each millisecond spent executing a server-side plugin action</td><td>0.0005</td><td><span data-option="62v7hKf7SWix">Plugin</span></td></tr><tr><td>Each row retrieved by our SQL Connector plugin</td><td>0.015</td><td><span data-option="rr746UIPhcM8">SQL, </span><span data-option="62v7hKf7SWix">Plugin</span></td></tr><tr><td>Each call made by our SQL Connector plugin</td><td>0.1</td><td><span data-option="rr746UIPhcM8">SQL, </span><span data-option="62v7hKf7SWix">Plugin</span></td></tr><tr><td></td><td></td><td></td></tr><tr><td><a data-footnote-ref href="#user-content-fn-3"><strong>Database</strong></a></td><td></td><td></td></tr><tr><td><a data-footnote-ref href="#user-content-fn-4">Performing a database search</a></td><td>0.3</td><td><span data-option="bUdA3qJ4yp2F">Database</span></td></tr><tr><td>∟ <a data-footnote-ref href="#user-content-fn-5">Each character</a> of data returned from the database</td><td>0.000003</td><td><span data-option="bUdA3qJ4yp2F">Database</span></td></tr><tr><td>∟ <a data-footnote-ref href="#user-content-fn-6">Each thing</a> returned from the database</td><td>0.015</td><td><span data-option="bUdA3qJ4yp2F">Database</span></td></tr><tr><td><a data-footnote-ref href="#user-content-fn-7">Lookup</a> a specific item</td><td></td><td></td></tr><tr><td>∟ <a data-footnote-ref href="#user-content-fn-5">Each character</a> of data returned from the database</td><td>0.000003</td><td></td></tr><tr><td>∟ <a data-footnote-ref href="#user-content-fn-6">Each thing</a> returned from the database</td><td>0.015</td><td></td></tr><tr><td>Each call to watch a search for real-time updates</td><td>0.005</td><td><span data-option="bUdA3qJ4yp2F">Database</span></td></tr><tr><td>Performing an aggregate query in the database</td><td>0.2</td><td><span data-option="bUdA3qJ4yp2F">Database</span></td></tr><tr><td>Performing a "group by" query in the database</td><td>0.3</td><td><span data-option="bUdA3qJ4yp2F">Database</span></td></tr><tr><td>Each thing deleted from the database</td><td>0.1</td><td><span data-option="bUdA3qJ4yp2F">Database</span></td></tr><tr><td>Each thing written to or modified in the database</td><td>0.5</td><td><span data-option="bUdA3qJ4yp2F">Database</span></td></tr><tr><td></td><td></td><td></td></tr><tr><td><strong>Backend and API</strong></td><td></td><td></td></tr><tr><td>Each backend database trigger event <a data-footnote-ref href="#user-content-fn-8">evaluated</a></td><td>0.05</td><td><span data-option="8KsK81zTbwKB">Backend</span></td></tr><tr><td>Each inbound call to an app's Data and Workflow API</td><td>0.01</td><td><span data-option="eB4eHoDnmnOM">API, </span><span data-option="8KsK81zTbwKB">Backend</span></td></tr><tr><td>Bytes sent to or from an app via inbound or outbound API</td><td>0.000003</td><td><span data-option="eB4eHoDnmnOM">API</span></td></tr><tr><td>Each outbound API call made to an external API</td><td>0.1</td><td><span data-option="eB4eHoDnmnOM">API</span></td></tr><tr><td>Running a server-side workflow action</td><td>0.6</td><td><span data-option="8KsK81zTbwKB">Backend</span></td></tr><tr><td>Adding a new item to the API workflow scheduler</td><td>0.1</td><td><span data-option="eB4eHoDnmnOM">API</span></td></tr></tbody></table>

### Checking specific workload units consumed in the logs

Using the *Server logs* tab, you can check the workload charged for each action, as well as the total for each workflow.

### Drilling down using the App metrics dashboard

In many cases, workload consumption can be isolated to a select few of your app’s processes that are either workload-intensive or triggered frequently. To help you identify what pages and activities in your app are consuming the most workload, you can use the App Metrics dashboard to get an overview.

<figure><img src="/files/AAfB5JFikeMyUPrprddx" alt=""><figcaption><p>The App metrics dashboard gives an overview and a detailed view of your app's workload and what contributes to it.</p></figcaption></figure>

There, you can see the total aggregated workload usage for the last 30 days, broken down by Development and Live consumption. Both Development and Live contribute to your total usage.

{% hint style="info" %}
To learn more about how to use app metrics to drill down into your app’s workload activities, check out the article below or try our interactive walk-through:

Article: [Using App metrics](/help-guides/workload/tracking-workload/measuring-workload/using-app-metrics)\
Interactive walk-through: [Exploring Workload Usage](https://app.arcade.software/share/2GEV5tX8KshJSW95Yc7P)
{% endhint %}

In the same dashboard, you can also see a pie chart visualization of which activities contributed the most to workflow usage in the selected period. You can use the bar chart to select the time period to include in the pie chart visualization. By clicking on a sector in the pie chart, you can drill down to see where in your app this is occurring, down to individual pages, workflows, elements and expressions.

[^1]: *Go to page* is considered a client-side action if it happens after the page has started loading, as opposed to redirecting a user to a different page before the page has started to load.

[^2]: Generating and transferring the HTML files needed to render the page on the client's device.

    The size of the page's "code" (number of elements, workflows, etc) does not affect the calculation.

[^3]: "Data returned from the database" refers to any data the database provides. This applies whether the data is sent to the user's device or stays on the server.

[^4]: Defined as using *Do a search for*. The cost of initiating the search is the same regardless of the number of elements in the database.

    The below points in the table are then added to this calculation.

[^5]: This is counted as the number of characters returned.

    For example, performing a search that returns 100 characters means that the value in the WU column is multiplied by 100.

[^6]: This is counted as the number of database things (records) returned.

    For example, performing a search that returns 10 users means that the value in the WU column is multiplied by ten.

[^7]: A *lookup* is the fetching of a database thing by its unique ID (as opposed to as the result of *Do a search for*).

    For example, an expression like *Current User's Company* means Bubble is using a lookup to find the *Company* (i.e. it doesn't need to search for it).

[^8]: Evaluating a backend database trigger incurs a cost regardless of whether it returns a yes or no.

    Any conditions on the event and actions/dynamic expressions within the workflow will incur their own expected cost.

    Article section: [Database trigger events and workload](/help-guides/workload/optimizing-workload/optimization-checklist/backend-workflows#database-trigger-events)
