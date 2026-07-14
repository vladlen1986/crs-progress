# Logs tab
> Source: https://manual.bubble.io/core-resources/bubbles-interface/logs-tab · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for an **intermediate-level builders.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (5)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### The API workflow scheduler

The API workflow scheduler lets you search for and list any scheduled API workflows, as well as pausing and canceling them.

Article: [The API workflow scheduler](/help-guides/maintaining-an-application/scheduler)

***

#### The logs tab

This article covers how to use the *Logs* tab.

Article: [The logs tab](/help-guides/maintaining-an-application/testing-an-application/using-server-logs)

***

#### Workload

The articles below explore how the workload metric works, as well as how you can optimize your app for workload:

Article series: [Pricing and workload](/account-and-marketplace/account-and-billing/pricing-plans)\
Article: [Workload FAQ](/account-and-marketplace/account-and-billing/pricing-plans/pricing-faq)\
Article series: [Optimimizing for workload](/help-guides/workload)<br>
{% endtab %}
{% endtabs %}

The Logs Tab monitors activity when users interact with the app. It shows the overall usage statistics, allowing you to keep an eye on your plan limits. It also allows to you view individual server-side workflow runs, so you can see when users modify data or take other server actions, such as sending an email. Finally, you can view and manually cancel scheduled future workflow runs.

## App metrics

This sub-tab shows you various data around your app's workload usage. In other words, it shows the general activity of users on your app and the computing resources used by your app. If you suspect that your app is slower than expected because you are capacity-constrained (since each app plan comes with a certain level of capacity), this is where you can investigate that.

### Server capacity usage and real time metrics

This section of the page shows you various metrics around your app's capacity. See [article](https://manual.bubble.io/help-guides/optimizing-an-application/performance-and-scaling#capacity).

### **Email preferences**

By default, Bubble will send you certain emails when we detect that capacity has hit certain thresholds. One option you have is "Do not send daily emails when the application hits its maximum capacity usage over the previous 24 hours" - this will suppress the corresponding email.

In addition, you can choose to "Only send emails when the maxed-out period exceeds this duration (minutes)".

### Server capacity usage details

This section of the page shows you a breakdown of what parts of your app are using capacity in a given time period. Note that you can click on sections of the chart to go into deeper levels of detail. Also note that the chart represents the % breakdown of what capacity was used on - so the chart will total 100% in periods of high and low capacity usage.

### Workflow runs history and storage

This section shows summary stats on how many workflows have run this month as well as how much file storage your app is using.

For workflow runs, note that the number does not include workflows that have run solely on the end-user's browser (on the client).

### Page load metrics

This section shows various metrics relating to pages of your app being loaded, including data that shows how much data is being loaded on those pages.

These charts show metrics about your pages loading time. This data is gathered over the latest page loads by all your users over the last 60 minutes.

### **Metric to display**

You can see three different kind of metrics:\
– **Page load duration: render complete** The time in milliseconds from when the Bubble server first receives a request for a page, to when all elements on the page are finished rendering. This includes the time it takes for the server to process the request, latency between the server and the web browser, the time it takes to load all client-side javascript and css, and the time it takes the browser to draw the elements on the page.\
– **Page load duration: data loaded:** The time in milliseconds from when the Bubble server first receives a request for a page, to when all the elements on the page are rendered, and all the dynamic data required by above-the-fold elements is fetched and displayed. This is equivalent to the "Page Loaded Above Fold" data source. It includes all the time included "Page load duration: render complete", plus the time to load data (such as Repeating Groups lists).\
– **Page load: count of data items required:** This is the number of data Things loaded during the period tracked by the "Page load duration: data loaded" metric. It's an estimate of the total data the page requires in order for all the above-fold elements to finish loading. It's useful for investigating the impact that loading data (for instance, in Repeating Groups) is having on page load times.

### **Percentile (%)**

You can choose to show averages over the best X percents. The best 1% will show the best performance, while 99% will show all situations.

## Server logs

The Server Logs section in the Logs Tab allows searches of the log of server-side actions, such as send email or change data, executed when users interacted with the app. Search for a particular user by email or ID, within certain dates, or specific keywords. Scroll down to automatically load older events in the results view.

### Basic filtering

You can filter your application's logs with the following options:

* From date - Choose the earliest date for which you want to see events. Searches start at midnight of that day. If empty, the search continues until the day the app was created. Results are currently limited to the previous two weeks.
* To date - Choose the latest date for which you want to see events. Searches end at 11:59 pm of that day. If empty, the current date is used.
* User - Filter actions by a specific user by typing in the user's email or unique ID. If this field is empty, the data for all users is returned.
* Contains - Enter some text to search for. For example, to search for the word: mountain, type: mountain, without quotes. To search for the exact phrase: tallest mountain, type: tallest mountain with single quotes, 'tallest mountain.' To search for log entries containing either: tall or mountain, type: tall OR mountain, without quotes. OR must be in all caps. If this field is empty, all log entries are returned.

### Advanced filtering

Click "Show advanced" to toggle additional search criteria, such as:

* Started running workflow - This marks the beginning of a workflow executing
* Event condition passed - The event condition evaluated to true (or wasn't set), so Bubble is going to run the workflow
* Event condition not passed - The event condition evaluated to false, so Bubble is going to end the workflow
* Running action - Bubble is beginning to run a specific workflow action
* Action condition failed - Bubble is ending the execution of a workflow action because the condition evaluation to false
* Workflow error - The workflow stopped running because of an error
* Autobinding operation - A user modified data by editing an input that uses autobinding
* Plugin server side output - A server-side plugin action ran; this is the raw output, for use in debugging
* Plugin server side error - A server-side plugin action failed with an error; this is the error, for use in debugging
* Scheduled task to run - Bubble scheduled a task to be executed at a future point in time
* Scheduled task completed - A scheduled task that was running finished execution
* HTTP request - The app made an outbound HTTP request to an external API
* HTTP response - An outbound HTTP request the app made completed with the given response
* Request for API workflow - An API endpoint in our workflow API was called
* Sending email failed - Bubble was unable to send an email because of an error

### Server log entries

For each log entry, you will see a number of fields:

* Name: the name of the item relevant to the log, which sometimes is what kind of log it is or the name of a specific workflow action, for example
* Email: the email of the user associated with this log running, often the end-user causing the workflow / action to happen
* ID: the unique ID of the user with the email above
* Timestamp: when the log happened, in your local time
* Message / properties: the body of the log, which gives information about that particular entry; the information available will depend on what kind of log it is

## Scheduler

One feature of Bubble is the ability to set a workflow to run later at a certain time or on a recurring basis going into the future. You can see any such scheduled future workflows on this sub-tab.

### Scheduler entries

Each result from the search represents a scheduled workflow that will run in the future. For each result, you see the following information:

* Scheduled time: when the workflow will run, represented in your local time
* ID: the ID of this scheduled workflow, which you can use, for example, to cancel that scheduled workflow from another workflow
* API event: the workflow that will run
* Current user: generally signifies which user caused this workflow to be scheduled (may not map to the user whose permissions will be applied when the workflow runs, as that can be configured in the definition of the workflow itself)
* Parameters: any parameters that workflow will run with, as expected in the definition of the workflow

## Other ways to learn

<details>

<summary>User manual articles</summary>

*

</details>

<details>

<summary>Video lessons</summary>

* [Building efficiently on Bubble (webinar)](https://www.youtube.com/watch?v=mnrwVdz_wKU)

</details>

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.
