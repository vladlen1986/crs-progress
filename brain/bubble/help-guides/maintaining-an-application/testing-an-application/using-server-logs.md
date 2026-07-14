# The server logs
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/testing-an-application/using-server-logs · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how to use the Server Logs for debugging your app

While the Debugger lets you to test and debug the current situation, server logs enable you to explore issues in the past. This is useful both to check the results of changes that you made during testing, and for looking at what actually happened when a live user experienced an issue.

{% hint style="info" %}
Keep in mind that the server logs for **Development** and **Live** are separate. If you have created any custom branches using [Version control](#user-content-fn-1)[^1], they are still contained within the Development and Live environments.
{% endhint %}

## Accessing the logs

To access the server logs, do the following:

* Click on the *Logs* tab
* Then the *Server logs* section

<figure><img src="/files/odc9AMXh2oeee8Am8uQM" alt=""><figcaption></figcaption></figure>

## Searching logs

The logs let you search for log entries with the following constraints

* **Start/end time** lets you enter a time range for the event(s) you are looking for.
* **User email** lets you constrain the search by the user who initiated the events.
* **Contains** is a freetext field that lets you search for the workflow label to narrow it down further.

### More filter

In addition to the main filters above, clicking the *Advanced* button gives you access to an extended list of filters.

* Started running workflow
* Action condition failed
* Autobinding operation
* Scheduled task completed
* Sending email failed
* Event condition passed
* Finished running action
* Plugin server side output
* HTTP request
* Event condition not passed
* Finished running workflow
* Plugin server side error
* HTTP response
* Running action
* Workflow error
* Scheduled task to run

Combined, these tools create a comprehensive toolset to refining your search and zeroing in on the issue

{% hint style="info" %}
If you are searching through an app with a lot of activity, searching through logs can be time-consuming and potentially time out if the amount of data is too big. If you experience this, we recommend **narrowing down the timeframe** in which to search.
{% endhint %}

### Zooming in on a workflow

Each workflow consists of several steps in the log:

* one for the event:
  * one for the condition on the event (even if empty)
* one for each action step.

Unless you are very specific with your constraint, most log searches will return a long list of results (especially if you are searching in an app with active users). To isolate one workflow and see all the steps logged in that workflow, you can use the *Zoom on this workflow* feature:

<figure><img src="/files/Kj3I6dqV0DCtcS5bfX2W" alt=""><figcaption><p><em>Zoom on this workflow</em> lets you isolate a workflow to make it easier to follow all the associated steps. Click image to enlarge.</p></figcaption></figure>

The Server Logs section in the Logs tab allows searches of the log of server-side actions, such as send email or change data, executed when users interacted with the app. Search for a particular user by email or ID, within certain dates, or specific keywords.

Note that server logs depend on the version of your app, so you should make sure you are focusing on the version where the issue was reported (Live versus Development).

To search logs, you need to define the starting and the ending dates of the search. Searching logs can take some time, and the Editor will display entries as they arrive. When you already see some results and scroll down, the editor will fetch more entries (and the caption of the search button will change according to the situation).

**If your app has a lot of traffic, you'll see a lot of logs.** It is useful to narrow down the search by using some search criteria. The most common criteria you can use when searching for logs is picking the type of events you're interested in.

![](/files/-M5smwO999JyiJW9wJZf)

* Workflow starts: shows all initiated workflows that run on the server, whether the condition is met and the workflow is executed, or not.
* Passed events: shows all workflows that run after the condition evaluated to yes.
* Non-passed events: shows all workflows that didn't run after the condition evaluated to no. This is useful as you try to debug something that *didn't* happen.
* Actions: only shows actions, and not the events that led to this action's execution.
* Errors: shows server-side errors that happened when executing a workflow. For instance, a credit card failure, or a send email failure. This will be especially useful to diagnose issues.

{% hint style="info" %}
Tip

If your app has a lot of activity, chances are it has a *lot* of logs. If you're searching through the logs and the query is slow or timing out, try narrowing the time window of your search.
{% endhint %}

When you search for logs, if you have more information about the problematic workflows, you can narrow down the search even more by searching for specific users and terms. The first input lets you enter a user's email or a user's unique ID. When this is filled, the search will only return workflows started by this user.

The last box lets you type a string that you want to search for. If an action has a property that evaluated to some text and if you search for this text, the workflow will be retrieved. For instance, if you know an email was sent with the text 'Boston' in it, searching for 'Boston' will return the Send Email action.

## Looking at the results

After the results are retrieved, they will appear in descending order, with the most recent ones displayed first.

For each entry, you will see the following details:

<figure><img src="/files/DP3wxI5mMAut4VG96pci" alt=""><figcaption></figcaption></figure>

1. **Action/event name**: this name reflects the label on the action/event of the workflow.
2. **User email:** the email of the user who initiated the workflow. If the user isn't signed up, the field will show *Anonymous user*)
3. **User ID:** the unique ID of the user who initiated the workflow.
4. **Timestamp:** the date and time of the logged event/action
5. **Message/properties**: properties for this event/action, or any error message(s)

## Following editor links

Clicking on a step in the Log takes you directly to the workflow editor for the relevant event or action in that log entry:

<figure><img src="/files/kn1JseEo3pgSToZdwCSb" alt=""><figcaption><p>Clicking on an event or action takes you directly to the relevant entry in the workflow editor.</p></figcaption></figure>

[^1]: *Version control* helps you manage different stages or iterations of your app during its development.

    It allows you to create, track, and switch between multiple branches of your app, making it easier to experiment with new features, fix bugs, or roll back to a previous state if needed.

    Article series: [Version control](/help-guides/maintaining-an-application/version-control)
