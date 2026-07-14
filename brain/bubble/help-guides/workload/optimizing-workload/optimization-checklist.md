# Optimization checklist
> Source: https://manual.bubble.io/help-guides/workload/optimizing-workload/optimization-checklist · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
Workload optimization sometimes touches on advanced Bubble practices. We recommend this guide for developers who are fairly experienced with Bubble, and it's useful to read up relevant chapters in the User manual to prepare for the process.
{% endtab %}

{% tab title="Related articles (10)" %}
**Client-side versus server-side**

Understanding the difference between server-side and client-side is key to evaluating processes for workload.

Article: [Server-side vs client-side processing](/help-guides/workload/understanding-workload/client-side-and-server-side-processing)

***

**Data**\
In this article series, we cover how to work with different types of data in Bubble:

Article series: [Data](/help-guides/data)

***

**Workflows**

* Article series: [Workflows](/help-guides/logic/workflows)
  * Article: [Events](/help-guides/logic/workflows/events)
  * Article: [Actions](/help-guides/logic/workflows/actions)

***

#### **Logic**

Workflows is a part of the *Logic* series user manual series.

* Article series: [Logic](/help-guides/logic)
  * Article: [The frontend and backend](/help-guides/logic/the-frontend-and-backend)
  * Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)\
    Dynamic expressions are used both to set up conditions, and are highly useful in different actions that you may want to add to your workflows.
  * Article: [Conditions](/help-guides/logic/conditions)\
    Conditions are used to determine whether a workflow or action should run or not, by checking whether something is true.
  * Article series: [Navigation](/help-guides/logic/navigation)\
    Using workflows to let the user navigate between pages and page sections.
    {% endtab %}
    {% endtabs %}

<details>

<summary>Optimization framework</summary>

The content of this article follows our workload optimization framework, which consists of the following points:

1. **Complexity:** How complex is a given process?
2. **Repetition:** How frequently is a given process repeated?
3. **Volume:** How much data is returned by the database in a given process?

To learn more about the optimization framework, check out the article below.

Article: [Workload optimization framework](/help-guides/workload/optimizing-workload/optimization-framework)

</details>

***

In this article, we provide a quick guide to optimize areas of your app where optimization opportunities are common. Each expandable box below includes a link to a more detailed article for deeper insights.

Before diving into each point, please remember that while these tips can serve as a checklist for optimizing your app, they won’t cover every unique scenario. Think of them as examples of how to apply the optimization framework by assessing whether a process is complex, repeated, or returns a high volume of data.

<details>

<summary>Page load</summary>

Full article: [Optimizing page load](/help-guides/workload/optimizing-workload/optimization-checklist/page-load)

### Go to page action

Page is loaded events will trigger every time the *Go to page* action is used, even if the user remains on the same page, and it doesn't technically refresh.

#### Solutions:

* **Repetition:** remove *Page is loaded* events, or replace them by another event that doesn't repeat as often.
* **Repetition:** use conditions to ensure *Go to page* only runs once.

### Loading data on page load

Loading data and/or performing searches on page load means that they are likely to be performed frequently.

* **Repetition:** instead of on page load, load data later (such as requiring a [user interaction](#user-content-fn-1)[^1]).
* **Repetition:** [use conditions](#user-content-fn-2)[^2] to stop invisible elements from loading data.
* **Repetition/volume/complexity**: avoid [nested searches](#user-content-fn-3)[^3].
* **Volume:** set up your database in a way that returns less data

### Page load workflows

It can be useful to run workflows as soon as the page loads, but keep in mind that anything that happens on page load is *repetitive.*

* Look for ways to make page load workflows lightweight
  * **Complexity:** reduce the number of actions.
  * **Complexity:** simplify dynamic expressions.
  * **Complexity:** Avoid [nested searches](#user-content-fn-3)[^3].
  * **Volume:** avoid searches that return a [large amount of data](#user-content-fn-4)[^4].
* **Repetition:** consider whether a workflow needs to run on every page load.
* **Repetition:** check whether the *Go to page action* forces a workflow to run more often than you anticipated.

### Redirects

Redirecting users to a different page is common in cases such as when the user is not logged in. Redirection can happen server-side (before the first page is loaded), or client-side (after the first page is loaded).

Performing redirects server-side means that no workload is spent sending the page HTML before the user is redirected.

* **Complexity:** keep redirection events as straightforward as possible, such as using *User is logged out* with no conditions. When Bubble doesn't need to check anything on the page, it can redirect the user immediately instead of [loading the page first](#user-content-fn-5)[^5].

### Data aggregation

Many apps aggregate data in different ways (such as counting or calculating a sum or average). This is often done through a data source like *Do a search for* in combination with an operator like *:count, :sum,* or *:average.*

* **Repetition:** considering calculating the numbers and storing them somewhere, instead of redoing the calculation every time they are displayed.
* **Repetition:** consider not showing data until the user asks for it through interaction such as a button click.
* **Repetition:** use conditions to avoid querying the data until an element is visible.
* **Complexity:** set up the dynamic expression with as few sub-expressions as possible, and avoiding nested searches.

</details>

<details>

<summary>Searches</summary>

Searching for data is on its own not an especially heavy database operation, but we can use the optimization framework to determine whether a search spends a more significant amount than is necessary.

* **Complexity:** avoid nested searches.
  * In repeating groups where each row contains a second search.
  * In search expressions, where a constraint or field contains a second search.
* **Complexity:** avoid advanced filters.
  * Advanced filters (using the :filtered and :advanced operators) can substantially increase the WU needed to complete the query.
* **Volume:** be mindful of structured and unstructured data.
  * Structured data is short, to-the-point data like names, phone numbers and emails.
  * Unstructured data can be long and "heavy", like blog posts, articles and product descriptions.
  * More text means more data to download, which translates into spending more WU.
* **Repetition:** Be mindful of how often a search query is repeated
  * Searches on page load are naturally loading every time the page loads
  * Search results auto-update[^6]; you don't need to perform another query for updated results.
  * Identical searches on the same page are only queried once, but queries in workflows are performed each time the workflow is executed. Consider using search results that have already been loaded when possible.

Full article: [Searches](/help-guides/workload/optimizing-workload/optimization-checklist/searches)

</details>

<details>

<summary>Workflows and actions</summary>

Full article: [Workflows and actions](/help-guides/workload/optimizing-workload/optimization-checklist/workflows-and-actions)

### Number of actions

Each action that interacts with the server may add some WU to the calculation. Additionally, more actions can increase the total size of your app’s code. While this doesn’t affect WU consumption, it can lead to slower page load performance.

* **Complexity:** look for ways to reduce the number of actions.

### Workflow complexity

**Complexity:** look for dynamic expressions that are more complex than they need to.

* Containing nested searches or advanced filters.

### Workflow frequency

Even a low-impact workflow can spend considerable amounts of workload if it is repeated frequently.

* **Repetition:** be mindful of using events like *Page is loaded,* *Do every X seconds* and potentially *Do when condition is true,* especially when they contain database operations such as searching or changing data.
* **Repetition:** for particularly resource-heavy operations, find ways to encourage users to run them less frequently.

### Working with lists

Working with lists, such as *Make changes to a list of things* and *Delete a list of things* are of course sometimes necessary. Still, keep in mind that it manipulating a list of things consumes more workload than a single thing.

* **Volume/repetition:** avoid making frequent changes to a list of things.
* **Repetition:** consider using [*Make changes to a list of things*](#user-content-fn-7)[^7] instead of [*Schedule API workflow on a list*](#user-content-fn-8)[^8] and [recursive workflows](#user-content-fn-9)[^9] when possible.

</details>

<details>

<summary>Backend workflows and API</summary>

Full article: [Backend workflows](/help-guides/workload/optimizing-workload/optimization-checklist/backend-workflows)

### Schedule API workflow on a list vs recursive workflows

These two methods of performing bulk operations can often produce the same outcome, while one consumes a lot of more WU than the other.

* **Repetition:** using recursive workflows forces Bubble to re-schedule the workflow a lot of times, whereas Schedule API workflow on a list will schedule all the workflows in one operation. In other words, Schedule API workflow on a list spends less WU and is the recommended method from a WU perspective.

### Bulk operations

Bulk operations are sometimes necessary, but are among the most WU-intensive tasks you can give the server.

* **Repetition:** be mindful of how often you run a bulk operation. Optimally, they should be rare.
* **Repetition:** Smaller bulk operations can sometimes be more efficiently handled by *Make changes to a list of things*, rather than Schedule API workflow on a list/recursive workflows.
* **Complexity/repetition:** optimize bulk processes to not do more work than they absolutely need to.
  * Look for actions that could be repeated just once (such as on the last cycle, as opposed to on every cycle)
  * Pass lists as parameters, instead of performing the search query in every workflow
  * Set up conditions to be as lightweight as possible. For example, a condition that includes *Do a search for* may consume an unnecessary amount of WU<br>

### Database trigger events

The database trigger event is a powerful feature for ensuring database integrity, but since they can trigger frequently, they can also potentially consume a significant amount of WU.

* **Repetition:** set up database triggers with conditions that ensures it doesn't trigger too frequently.
* **Complexity:** ensure that a database trigger event and its actions and conditions don't perform complex queries such as searches with *:filtered* and *:advanced* operators, and nested searches.
* **Repetition:** sometimes, database trigger events can be combined into one. This lets you perform the condition on the event only once, and may also make the actions inside more lightweight.

### API authentication

API workflows and Data API endpoints that don't require authentication can be repeatedly accessed.

* **Repetition:** As a general rule, inbound API requests to your app should require authentication, to avoid anyone simply calling them repeatedly.
* **Volume:** avoid sending more data than you need via the Data API by setting up privacy rules and protect fields that should not be returned by the database.

</details>

[^1]: User interaction in this context could mean requiring the user to click an element to initiate the search, instead of doing it automatically on page load.

[^2]: Client-side conditions, such as *Element is visible* can be a lightweight way to stop data from loading immediately, and instead load when it's needed.

[^3]: *Nested search* means a search that initiates one or more additional searches to finish. For example, by using a constraint with a dynamic expression that contains *Do a search for*.

    This can substantially increase both *complexity* and *volume.*

[^4]: The workload calculation of data returned by the database takes both the *number of things* and *number of bytes* returned. As such, keep the number of things as low as possible, and avoid heavy fields, such as unstructured data.

[^5]: Client-side redirects happen when the page is loaded, and then the user is redirected. Since the page needs to load first, Bubble will spend some WU on that process.

    Article series: [Navigation](/help-guides/logic/navigation)

[^6]: Bubble sets up a web socket connection that pushes new data to the device whenever something changes in the database.

    This is taken care of automatically.

[^7]: *Make changes to a list of things* is an action that makes changes to multiple things in one operation.

    Reference: [Make changes to a list of things](/core-resources/actions/data-things#make-changes-to-a-list-of-things)

[^8]: *Schedule API workflow on a list* schedules a list of workflows that will execute once for each item in a list.

    Article: [Bulk operations](/help-guides/maintaining-an-application/database-maintenance/bulk-operations/bulk-operation-methods-compared)

[^9]: *Recursive workflows* are workflows that schedule themselves at the end, in essence making it a loop.

    Article: [Bulk operations](/help-guides/maintaining-an-application/database-maintenance/bulk-operations/bulk-operation-methods-compared)
