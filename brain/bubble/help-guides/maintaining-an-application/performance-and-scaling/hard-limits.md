# Hard limits
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/performance-and-scaling/hard-limits · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
This article focuses on Bubble's **hard limits**. Hard limits are fixed boundaries that cannot be exceeded, such as the number of minutes a workflow will attempt to finish before it's terminated. Some hard limits can be increased by upgrading to higher pricing plans.

For soft limits (flexible boundaries that can be exceeded in but may impact performance or stability) check out our [general article on performance and scaling](/help-guides/maintaining-an-application/performance-and-scaling).
{% endhint %}

<details>

<summary>Plugins and plugin builders</summary>

The limitations discussed in the article are equally applicable to tasks performed by plugins. If you're developing plugins, you should familiarize yourself with these limits to prevent any issues for your users.

</details>

Like all development frameworks and server systems, Bubble comes with its own set of capabilities and limitations. While we are working hard to make a platform that is flexible and versatile enough to reliably handle as wide a range of applications as possible, we also want to be as transparent as we can with our developer community as to what kind of limitations you might experience.

This article will attempt to highlight known limitations and issues that should be taken into consideration when you are evaluating Bubble for your project.

## Understanding the system limits

An app reaching Bubble’s hard limits is fairly rare, but as a developer it can still be useful to know about them to be able to recognize and debug them should they occur.

They can aid in the planning and development of your app, but it’s worth nothing that understanding and predicting how they can affect your app can be a bit more complicated. The limits offer insight into the system's absolute limits and can be valid in one-off cases, but they will be less accurate in predicting the app's performance under varying conditions and workloads.

For instance, if a Do a search for times out after a maximum limit of 10 seconds, it does not imply that a search that takes 3 seconds to complete is always "safe" in all situations. For example, a 3-second search that’s happening simultaneously for a million users will still, in aggregate, become very taxing for your app. At that scale, it would be best to redesign the search to complete faster. While hard limits will kick in in rare situations, it’s also important to keep in mind the combination of everything you’ve built your app to do.

Hard limits can clarify why a process has stopped due to reaching a time limit and serve as a reminder that a resource-intensive process will eventually reach its limit. However, this information must be incorporated into an overarching strategy to ensure that the app’s activity remains at sustainable levels that allows your app to scale safely.

## Database

### Number of custom data types

Any app can have up to 1,000 custom data types.

### Sorted searches

Searches that have a sorting applied (or with the *:sorted* operator added to the expression) will return a list of maximum 50,000 things.

### Text fields

A single text field saved in the database has a hard limit of **10 million characters**. Keep in mind that this includes characters like spaces and BBCode/HTML formatting.

### Thing size

The total size of data stored in one thing[^1] has a hard limit of **20 MB**. This refers to data stored in the thing itself, and not associated data such as files and images.

### Deleting references to a thing

Sometimes when you delete a thing in the database, Bubble needs to update other records to reflect that the thing has been deleted. For example, a *user* might be connected to other records because they are referenced in the *Created by* field.

This can lead to a seemingly simple operation becoming more complex and resource-demanding. If the number of referenced records exceeds 100,000 records you may start to experience that referenced records are not properly updated, and by 1,000,000 there's a significant chance that the process will lead to unexpected database errors.

### Storing a list of things

Storing a list of database things on another thing (such as User's Tasks) has a **hard limit of 10,000 records**. Note that long lists can start to affect performance at a lower number, depending on how much data the records are holding and what kind of processing you apply. In many cases, using *Do a search for* instead of storing long lists will be more efficient.

### CSV Upload

CSV files uploaded in the Bubble editor or in your app have a hard file size limit of **5GB.** However, several major browsers do not reliably allow uploads bigger than 2 GB, making this the practical limit for most users.

### File Upload

Files uploaded in the Bubble editor or in your app have a hard file size limit of **5GB.** However, several major browsers do not reliably allow uploads bigger than 2 GB, making this the practical limit for most users.

## Design and logic

### Workflow timeout

Workflows that take more than **300 seconds (5 minutes)** will time out. Note that other processes running simultaneously can lead to Bubble throttling your app to maintain stability if your app comes close to maxing out its capacity. This can sometimes lead to workflows timing out because they are slowed down.

### Number of elements and events/actions on a page

There's a hard limit of **10,000 combined total of elements, events and actions** on a single page.

### Length of URL

Bubble doesn't have a maximum URL lengths, but to ensure browser compatibility you should stay within **2,000 characters**. We generally recommended keeping URLs as short as possible for usability and SEO purposes.

URL parameters are included in the character count.

### Schedule API workflow on a list

The maximum number of workflows that can be scheduled using the Schedule API workflow on a list action is as follows:

<table><thead><tr><th width="183">List</th><th>Limit</th></tr></thead><tbody><tr><td>Unsorted list</td><td>100,000</td></tr><tr><td><a data-footnote-ref href="#user-content-fn-2">Sorted list</a></td><td>50,000</td></tr></tbody></table>

If you attempt more than this, only the number of workflows up to the limit will be scheduled

#### Enterprise plan with dedicated instance

The Enterprise plan [with a dedicated instance](#user-content-fn-3)[^3] doesn't have a hard limit on Schedule API workflow on a list, meaning you can schedule more than the numbers stated above. The actual limit as to how much Bubble can process, and the time it takes to do so, will vary based on the server configuration, general load and the size (in bytes) of the workflow parameters.

Please visit our [Support center](https://bubble.io/support) to get in touch with a member of our Support team if you have questions regarding dedicated server instances.

### Database trigger events

If you have more than 20 database triggers that kick off at once, the remaining triggers will be scheduled to protect your app's infrastructure from consuming too much memory.

## Integrations

### API Connector responses

There's a hard limit of **50 MB** for responses to an outgoing API call made with the API Connector or a plugin. Exceeding the limit will generate an error in the logs: "response too large".

### Headers in API calls

The headers in API calls can have a maximum total size of 8,000 characters

### Keys in API calls

The keys in an API call can have a maximum total size of 20,000 characters.

### Bubble API requests

The Data API and Workflow API handle a set number of requests per minute depending on your plan:

* Starter: 15 000
* Growth: 25 000
* Team: 35 000

{% hint style="info" %}
We have additional rate limits enforced to protect our cluster from malicious attacks. These are subject to change and are unlikely to affect legitimate usage.

If you have questions please [open a support ticket](https://bubble.io/contact).
{% endhint %}

#### Legacy plans

Note that if you are on Bubble's [legacy plan](#user-content-fn-4)[^4], requests are rate-limited by default to 1,000 requests/minute per application, collectively between Live and Development. A rate-limited request will return an HTTP 429 error.

### Recursive limits when using the API Connector

{% hint style="info" %}
For recursive workflows that are triggered via the [*Schedule API workflow*](/core-resources/actions/custom#schedule-api-workflow) action, you can apply custom depth limits to avoid infinite recursion.

Article: [Infinite recursion protection](/help-guides/workload/tracking-workload/monitoring-workload/infinite-recursion-protection)
{% endhint %}

When using the API Connector to recursively call a backend workflow, Bubble enforces limits to prevent infinite loops. These limits differ depending on the type of recursion:

**Direct API Connector recursion**\
This occurs when your app calls its own backend workflow through the API Connector.

* **Limit:** Maximum depth[^5] of 3

**Indirect API Connector recursion**\
This occurs when your app calls another app’s backend workflow, and that app calls back to yours—creating a loop across apps.

* **Limit:** Maximum depth of 10

These recursion limits are internal system constraints and cannot be configured or overridden.

[^1]: A *thing* in the Bubble database is one specific database record.

[^2]: Sorted list in this context refers to lists that are generated using *Do a search for,* with a sorting property applied to the search, or using the *:sorted* operator.

[^3]: A dedicated instance, or dedicated server, is available on the Enterprise plan, and means your apps run on their own exclusive server.

    Article: [Dedicated instance](/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance)

[^4]: If your app was created before the introduction of Workload, it may still be on the legacy plan.

[^5]: Depth is the number of workflows in a direct scheduling path back to the root workflow.\
    \
    Article: [Infinite recursion protection](/help-guides/workload/tracking-workload/monitoring-workload/infinite-recursion-protection#depth)
