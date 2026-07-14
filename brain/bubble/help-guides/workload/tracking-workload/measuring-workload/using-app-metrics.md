# Using App Metrics
> Source: https://manual.bubble.io/help-guides/workload/tracking-workload/measuring-workload/using-app-metrics · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how to use App metrics to analyze how different activities contribute to your app's total workload over a given period of time

You can think of workload as the sum of all the work performed by a variety of [activity types](#user-content-fn-1)[^1].

The App Metrics dashboard gives you several visualizations of the work that your app is doing. The charts serve two purposes:

* To give you an overview of your app’s total workload
* To give you an easy way to drill down into each metric category and get a granular view of how single workflows and expressions contribute

## Metric categories

Each of the metric categories and how they can be explored in the App Metrics dashboard is listed in the table below. Click each category type to learn more about it.

<table><thead><tr><th width="253">Metric category</th><th>App Metrics drill-down</th></tr></thead><tbody><tr><td><a data-footnote-ref href="#user-content-fn-2">Scheduled API Workflows</a></td><td>Click to view list of Workflows, click workflow name to go to that workflow in the workflow tab</td></tr><tr><td><a data-footnote-ref href="#user-content-fn-3">Database Trigger Workflows</a></td><td>Click to view list of Workflows, click workflow name to go to that workflow in the workflow tab</td></tr><tr><td><a data-footnote-ref href="#user-content-fn-4">Recurring Workflows</a></td><td>Click to view list of Workflows, click workflow name to go to that workflow in the workflow tab</td></tr><tr><td><a data-footnote-ref href="#user-content-fn-5">Workflow</a></td><td>Click to view list of Workflows, click workflow name to go to that workflow in the workflow tab</td></tr><tr><td><a data-footnote-ref href="#user-content-fn-6">File Uploads</a></td><td>No drill-down</td></tr><tr><td><a data-footnote-ref href="#user-content-fn-7">Page Load</a></td><td>Click to view list of Pages, click page name will take you to that page</td></tr><tr><td><a data-footnote-ref href="#user-content-fn-8">Outbound API calls</a></td><td>Click to view the list of API calls, prefixed by Workflow and Data.</td></tr><tr><td><a data-footnote-ref href="#user-content-fn-9">Inbound API calls</a></td><td>Click to view list of API names:<br><br><a data-footnote-ref href="#user-content-fn-10">Workflow API</a>: name of the API Workflow<br><a data-footnote-ref href="#user-content-fn-11">Data API</a>: name of the data type</td></tr><tr><td><a data-footnote-ref href="#user-content-fn-12">Data Exports</a></td><td>No drill-down</td></tr><tr><td><a data-footnote-ref href="#user-content-fn-13">CSV Imports</a></td><td>Click to view names of CSV Files</td></tr><tr><td><a data-footnote-ref href="#user-content-fn-14">App Editor - Run bulk</a></td><td>No drill-down</td></tr><tr><td><strong>Fetching Data</strong></td><td><br></td></tr><tr><td>∟ <a data-footnote-ref href="#user-content-fn-15">Real-time Search</a></td><td>Click to view list of searches, clicking will take you to expression in editor</td></tr><tr><td>∟ <a data-footnote-ref href="#user-content-fn-16">Aggregate Search</a></td><td>Click to view list of searches, clicking will take you to expression in editor</td></tr><tr><td>∟ <a data-footnote-ref href="#user-content-fn-17">Individual Data Request</a></td><td>No drill-down</td></tr><tr><td>∟ <a data-footnote-ref href="#user-content-fn-18">Group by Search</a></td><td>Click to view list of searches, clicking will take you to expression in editor</td></tr><tr><td>∟ <a data-footnote-ref href="#user-content-fn-19">Search</a></td><td>Click to view list of searches, clicking will take you to expression in editor</td></tr><tr><td>∟ <a data-footnote-ref href="#user-content-fn-20">Autobinding</a></td><td>Click to view list of searches, clicking will take you to expression in editor</td></tr></tbody></table>

## Workload usage

The bar graph helps you get a transparent view of how much app your work is doing in total, and at what times. This visualization lets you see trends and patterns in your app's workload usage over time, which can help you plan and make more informed decisions about future upgrades or changes to your app.

<figure><img src="/files/g25DlRwfgCLd9QMU2APl" alt=""><figcaption></figcaption></figure>

Each column in the bar graph represents one day, going back 30 days from the current date by default. This example above is from a complex app that processes thousands of users, searches and workflows.

#### Changing the time frame

To drill down into an individual day, simply click that day in the chart. Let’s look at August 22nd when the workload was a bit higher:

<figure><img src="/files/FmrNYyRGt8pdCYOFOjyH" alt=""><figcaption></figcaption></figure>

Here, we can see that something occurred between 6:00 pm (18:00) and 9:00 pm (21:00) that increased the workload for the day.

Clicking it allows you to zoom in on that specific time period to better understand what caused the spike in activity and added extra tasks for Bubble to handle.

<figure><img src="/files/fVmJh1LABtXbKEBerxzV" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
The App metrics will reflect the time zone of the device that is accessing them.
{% endhint %}

Isolating the timeframe extends down to the granular pie chart below, which lets you identify activity types on the top level and drill down into individual workflows and expressions to see what they are doing.

### Granular view

The granular view gives you a pie chart where each slice represents one of the activity types that we track. This way, you get an understanding of the types of processes that contribute the most.

Let’s look at an example:

<figure><img src="/files/QpLJkuOUMAqJVSSuC2rt" alt=""><figcaption><p>The <em>Workload by activity</em> chart gives you an overview of the types of activities that consumed the most WU in a given period.</p></figcaption></figure>

In the chart above we can see clearly that two activities make up the majority of the work that this app performs:

* Scheduled workflows
* Data exports

Hovering that section in the pie chart or the legend on the right side will provide more information about the actual number of WU spent, and its percentage of the total.

<figure><img src="/files/nnTtgDCgAQAs8uvkcPYa" alt=""><figcaption><p>Hovering a section of the chart (or the legend on the right side) gives you additional information about the WU consumption of that activity.</p></figcaption></figure>

This data alone can already tell us something about how the app is built: Scheduled workflows are server-side API workflows, and they make up a singificant part of the total in this example. A large part also goes to the *Data export* feature, suggesting that one or more large exports have taken place in this time period.

#### Activity details

By hovering one of the slices in the pie chart (or one of its corresponding entries in the legend on the right side), you get the following additional information:

* Total WU consumption
* Percentage of total consumption
* Number of activity runs

<figure><img src="/files/yWyuLrGKm681QfYa2UJ3" alt=""><figcaption><p>Hovering a section in the pie chart or legend will reveal more information about that activity.</p></figcaption></figure>

#### Drilling down

Clicking on each of these activity types provides an even more detailed view of individual instances of that activity type, and how much each one contributes to its total. Let’s click on the *Scheduled workflow* sector to dig deeper:

<figure><img src="/files/lweMSPKiAuRTcOI0DlNs" alt=""><figcaption></figcaption></figure>

Now we are down to a list of different data fetching operations.

By again hovering the mouse over one of the vectors in the chart, we can see the percentage consumed by that specific activity. Clicking that takes us directly to the *workflow* in the workflow editor that's consuming the workload, so that we can investigate it.

<figure><img src="/files/I11Z5yakjAPJpqCSNx6p" alt="" width="464"><figcaption></figcaption></figure>

This way of continually drilling down in the chart can teach us a lot about where the work happens and where we can potentially make adjustments to make the app more efficient.

This not only helps you keep your app operating at a cost-effective level, but it can also speed up processes to improve the overall experience for users.

#### Excluding details

As you research your app’s workload, it can sometimes be useful to see what the chart looks like if we exclude some information. For example, if you want to stop focusing on *Scheduled workflows*, you can hide that information in the chart by clicking on that activity type in the right-hand list:

<figure><img src="/files/nydDZnjzAi8WVs47uzcN" alt=""><figcaption></figcaption></figure>

As you can see, when we click on the activity entry in the list, it becomes crossed out, and the chart is updated to exclude it: the dark blue slice is no longer visible.

### Real-time metrics

The real-time workload reporting allows you to view and access workload data in real time. The bar chart provides one-minute granularity for the last 24 hours. This is useful for checking recent or highly time-specific workloads to learn more about how they contribute in isolation.

### Checking specific workload units consumed in the logs

Using the *Server logs* tab, you can check the workload charged for each action, as well as the total for each workflow.

### Using the data

Creating efficient applications is a process of continuous improvement. Using the App Metrics dashboard is an effective method for recognizing the processes that have the greatest impact on your app’s workload. As you analyze your workload data, you will discover that some activities are essential for your app to operate, while others can be optimized.

The flexibility of Bubble’s platform opens up to different ways of solving the same problem, and sometimes small changes can lead to great improvements in efficiency.<br>

[^1]: Workload is broken down into a list of activity types. You can read more about this in our dedicated article.

    Article: [What contributes to workload?](/help-guides/workload/understanding-workload/what-contributes-to-workload)

[^2]: All the work done in API Workflows that have been triggered internally in your app using the Schedule API Workflow or Schedule API Workflow on a list actions.

    Article: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)

[^3]: All the work done in workflows that are triggered by a Database Trigger event.\
    \
    Article: [Database trigger events](/help-guides/logic/workflows/events/backend-events/database-trigger-events)

[^4]: All the work done by Recurring Workflows set up in the backend editor.

    Article: [Recurring workflows](/help-guides/logic/workflows/events/frontend-events/recurring-workflows)

[^5]: All the work done in on-page workflows.

    Workflows that consist entirely of client-side actions do not consume workload.\
    \
    Article: [Workflows](/help-guides/logic/workflows)

[^6]: The File uploads activity type tracks the processing needed to process the upload. The transfer and storage of the file is not included in workload.

    Article: [Files](/help-guides/data/files)

    Article: [File uploader elements](/help-guides/design/elements/web-app/input-forms/file-uploads)

[^7]: Page load is defined as the work required to first render all the elements and data on the page.

[^8]: API means outbound API calls that are made with the API Connector or a plugin. They are visualized as actions or data sources, depending on the setting for the specific request.\
    \
    Article: [The API Connector](/help-guides/integrations/api/the-api-connector)\
    Article: [Bubble's API terminology](/help-guides/integrations/api/the-bubble-api/bubble-api-terminology)\
    Reference: [The API Connector](/core-resources/bubble-made-plugins/api-connector)

[^9]: Inbound API calls are calls that are sent from an external app to the Bubble API: This includes both the Workflow API and Data API.\
    \
    Article: [The Bubble API](/help-guides/integrations/api/the-bubble-api)\
    Article: [Bubble's API terminology](/help-guides/integrations/api/the-bubble-api/bubble-api-terminology)

    Reference: [The Bubble API](/core-resources/api/the-bubble-api)

[^10]: The Workflow API is the part of Bubble's built-in API that lets you set up workflows that can be triggered from an external application or system by sending an API request or by scheduling an API workflow in your app.

    Article series: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)

[^11]: The Data API is Bubble’s automated way of providing external systems access to your app’s database.

    Article series: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)

[^12]: Data exports means when you export data to a CSV file in your app using the Download data as CSV action, or using the Export feature in Bubble's database editor.\
    \
    Reference: Download data as CSV

[^13]: CSV means whenever you upload a CSV file in your app using the Upload data as CSV action or using the Upload feature in Bubble's database editor.

[^14]: API Workflows that are scheduled using the *Bulk* feature in the database tab of the Bubble editor.

[^15]: Real-time search in Bubble involves actively monitoring the database for changes related to a particular search and dynamically updating it as new data is added or updated.

[^16]: The aggregate search type refers to searches that involve aggregating data, such as using the count operator in a "Do a search for" to count the number of items.

[^17]: Individual Data Requests means when an expression fetches data about a specific thing in the database, such as Current User's Company (Company being the thing requested).

[^18]: Group by search means when you add the Group By operator to a search.

[^19]: Search means any Do a Search for that is **not** aggregated (such as adding the count operator) or has the Group by operator.\
    \
    Article: Finding data\
    Article: Data sources

[^20]: Auto-binding means whenever data is loaded to an Auto-bound element (such as loading initial data into an input form element) as well as the database operation when data in that element is changed.\
    \
    Article section: [Auto-binding](/help-guides/data/the-database/creating-saving-and-deleting-data#auto-binding)
