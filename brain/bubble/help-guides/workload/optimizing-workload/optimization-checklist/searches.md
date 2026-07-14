# Searches
> Source: https://manual.bubble.io/help-guides/workload/optimizing-workload/optimization-checklist/searches · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

One aspect that often contributes to workload[^1] consumption is the use of database searches via the [*`Do a search for`*](#user-content-fn-2)[^2] [data source](#user-content-fn-3)[^3]. A search operation is not in itself a particularly heavy operation, but can typically consume higher workload if the search:

* Returns a high volume of data
* Is particularly complex
* Is repeated frequently

These three points can sometimes lead to slowing down the query itself. In some cases, this can be noticeable to your users, and can be detrimental to your app's user experience. Sometimes, complex queries are needed – it's simply a part of the work your app is doing and cannot be avoided – other times they can be tweaked to be more efficient or even removed altogether.

In this article series we'll dive into some of the different aspects of searches and how the affect WU[^4].

## What is a database search?

{% hint style="info" %}
If you are new to databases, we have an entire section dedicated to the database is and what it does. We recommend reading this first to know the essentials if you are unfamiliar with this part of Bubble.

Article series: [The database](/help-guides/data/the-database)
{% endhint %}

Let's first look at what a database search is from a WU perspective. Database searches are a data source, meaning that they are a place from which Bubble can pull data to use in your app, such as populating a repeating group or table element.

### Dynamic expressions and WU

Database searches are built using [dynamic expressions](#user-content-fn-5)[^5]. They are highly flexible, giving you as the developer the freedom to set them up to serve almost any purpose – but that flexibility also means that you are free to set up searches that are not optimized for performance and WU consumption.

Two main points affect search WU consumption:

1. The **volume of data returned by the database**: For example:
   1. **Records in a repeating group**: if you load an unusually high number of things into a repeating group, the amount of data returned by the database will increase.
   2. **Data saved in each field**: if each thing contains a high volume of text data, such as long articles or blog post, and especially if this is combined with a high number of records, the amount of data returned by the database will increase.
2. **The complexity of the dynamic expressions** can also increase the server load. A search can be made more complex by adding advanced filters. Keep in mind also that different steps in an expression can make up separate calculations. For example, if you set up a constraint in a search that itself contains another search, you may be multiplying the number of searches

### How it is calculated

Earlier in this series, we described the [*theme park entry ticket metaphor*](/help-guides/workload/understanding-workload/the-workload-calculation). The [WU activity table](#user-content-fn-6)[^6] gives you an overview of the entry ticket cost of performing a search, and from there, additional work that you give the server is added to that base cost.

<table><thead><tr><th width="272">Operation</th><th width="122">WU</th><th>Calculated</th></tr></thead><tbody><tr><td>Database search</td><td>0.3</td><td>Per search operation</td></tr><tr><td>Data returned from database</td><td>0.000003</td><td>Per byte returned</td></tr><tr><td>Results</td><td>0.015</td><td>Per record returned</td></tr><tr><td>Joined results</td><td>0.015</td><td>Per joined record returned<br>(e.g. Current Cell’s User’s <strong>Team</strong>)</td></tr></tbody></table>

## The volume returned by the database

The total volume of your database does not increase WU consumption in a search. For example, a search spanning 100 records will spend the same amount as a search spanning 10,000 records.

However, the final volume of data returned from the database has a preset WU cost. For example, product descriptions, blog posts and articles can contain more data than names, phone numbers and emails. As such, the “weight” of a single thing, combined with the number of things can increase volume of data returned (which is a part of the WU equation), but neither variable affects the cost of the search process itself.

It's worth remembering that the cost per character is very low, but you can stop Bubble from sending more data than you intended by saving less data on each record, stopping fields from being sent by use of privacy rules and avoiding downloading a high number of things on page load.

## What is search complexity?

The second part of the equation is the complexity of the dynamic expression that makes up the search. To understand what makes a search complex, we need to look briefly into how a search is actually performed.

In simple terms, a database search works by eliminating records that don’t match your constraints. For example, if your database contains 100,000 records and 80,000 of them don’t match a specific constraint, Bubble can exclude those 80,000 from the potential “candidates.”

This means that Bubble can quickly rule out large portions of the database based on the constraints, using techniques like indexing to speed up the process on the backend. For instance, if your app frequently searches for products by a number field (such as a price), indexing allows us to arrange a table where products are sorted by their price. This makes it easier and quicker to eliminate non-matching records during the search, since the sorting allows us to "cut" the list at a point where the price is lower than 50 (see the screenshot below).

<figure><img src="/files/Yj7D4s2cV8TBlAphh3ct" alt="" width="375"><figcaption><p>Most searches are completed through a process of elimination; whatever <em>doesn't</em> match constraints is removed in chunks.</p></figcaption></figure>

This is a part of the database’s inherent functionality. It’s handled automatically and does not consume additional WU.

#### Advanced filters

The method described above is how most searches in Bubble are performed. However, it’s possible to create a more complex search by adding filters that require Bubble to process each row of data individually, rather than eliminating candidates in bulk.

In those cases, it’s technically not the original query that spends more WU, but potentially additional queries that each incur their own WU costs.This happens when you add advanced filters that forces Bubble to do processing on each row of the data.

Take a look at the expression below:

<br>

<figure><img src="/files/ATxpe3Ygv9jxIyi4vXvP" alt="" width="563"><figcaption><p>The <em>:filtered</em> operator can sometimes drastically decrease the efficiency of a search, both slowing it down and increasing WU consumption. Click screenshot to enlarge.</p></figcaption></figure>

The `:filtered` operator can sometimes drastically decrease the efficiency of a search, both slowing it down and increasing WU consumption. Click the screenshot to enlarge.

In the example above, it might seem like you’re performing a single search, but in reality, you could be performing one search per row of the initial search results. The expression in the screenshot is searching for products that match the average price of all products within the same category.

First, the `Do a search for` operation matches 1,000 products, and then Bubble applies the filtering. This means Bubble is not performing one search, but potentially 1,001 searches: a drastic increase that consumes a significant amount of workload and slows down the search process.

What could we do instead?

* Here’s a clean, proofread version with the typo fixed and everything else left intact:

  If you can, try to avoid using the `:filtered` operator (and especially with advanced constraints), and instead rely on constraints that don’t in themselves initiate a second query. If they contain simple, non-dynamic constraints, Bubble will attempt to combine them into a single query, but when adding the `:advanced` operator in particular, you may unknowingly make the query more complex.
* Instead of performing a search every time we want to know a *Category's* average price, we could save the average price on each *Category* in a number field. This way, we could set up a dynamic expression that checks a *This* *Product's Categories' Average price* (see screenshot below).
* Consider whether there are even simpler ways to set up a search with similar results, and if the search is "nice to have" or necessary.
* You can also save the results of the search as a list, to avoid having to perform the query every time a user requests it. For this method, you'll need to develop your app to keep the list up to date, as lists don't automatically update. Also, lists can hold a maximum of 10,000 things.

<figure><img src="/files/0ldzGdoliYQAYdA804Dc" alt="" width="563"><figcaption><p>By storing the average price in a separate <em>number</em> field on the <em>Category</em> data type, we can avoid performing as many searches as in the first example.</p></figcaption></figure>

The example above still requires Bubble to check the price of each Product in the search against its category, but we avoid performing multiple searches to calculate the average.

This would require you to keep the average price on a Category up to date. You can ensure this by using [database trigger events](#user-content-fn-7)[^7] whenever a Product's price changes for example.

## Nested searches

Nested searches are a common source of high WU consumption. Let's say that you are loading a list of client companies in a CRM and displaying the result in a repeating group. Two data types are used here:

* Company
* Employee (connected to a Company)

In each row, you also search for and count the number of employees in each company, looking something like the table below:

<table><thead><tr><th width="196">Company</th><th>Employees</th></tr></thead><tbody><tr><td>Company 1</td><td>1500</td></tr><tr><td>Company 2</td><td>2000</td></tr><tr><td>Company 3</td><td>800</td></tr></tbody></table>

How many searches are performed in this example? You may think one, since the list is showing one list of companies. But the actual number is four: one search for companies, and then three searches/counting of the employees in each row.

In this example, we're showing only three rows, but if this were to grow to hundreds of rows, you could potentially be performing hundreds of searches every single time the page loads: this can quickly lead to an overconsumption of workload.

A possible solution to this is to instead save the number of employees in a number field on each company, and update it each time an employee is added or removed. It's a bit more work for you as the developer, but can drastically reduce the work for the server.

## Sending the data

When a search is complete, the database returns the results. The amount of data being sent can vary dramatically, depending on how much data the data type contains (the "blog post" vs "first name" example), how many things to send and any operators that you add to the search.

For example, downloading a list of 1,000 blog posts to a repeating group (even if you are only *displaying* the title of the post) can mean that Bubble has to send a significant amount of data, whereas if you instead use an aggregation operator such as `:count` or `:average`, Bubble only returns a number, which is an insignificant amount of data almost regardless of the number.

It's important to be aware that Bubble sends *all* data saved on a thing when a thing is queried, and not just those that are displayed on-screen. The exception is fields that are protected with [privacy rules](#user-content-fn-8)[^8] that the current user does not match – that data never leaves the server.

Knowing this, we can tailor our database to download less data:

* Consider what data is needed on your data type. Sometimes fields are added that do not add to the overall user experience or general quality of the app
* Also consider the number of things you need to download. You can avoid downloading too much data by setting up repeating groups that load as the user scrolls, use pagination or simply reduce the number of things overall.
* In some cases, it makes sense to split data types into separate types where one is specialized for search results, and the other contains the data. This is often referred to as a *satellite data type* in the Bubble community.

As you plan your database, we again encourage you to not put emphasis only on WU. The cost of sending data is very low, and you should balance the optimization process with deadlines, app complexity and user experience.

## Search updates

Whenever [`Do a search for`](#user-content-fn-9)[^9] is used as a data source for an element, Bubble maintains a web socket connection with the database as long as the page is open and the device is connected to the internet. This ensures that any changes in the database (even if made by another user) are automatically updated in the search results on the page.

In other words, there is no need to manually refresh a search query; it updates automatically. The exception to this is when the initial fetch happens through a workflow[^10]: in that case, the results will not update automatically and will require another workflow to refresh the data.

## FAQ: Database searches and WU

#### If I perform an identical search multiple times on the same page, do they all add to WU?

Bubble is set up to not process a search query more than one time. In other words, if you perform the same identical search in two different places on the same page, the search will only be performed once. If the queries are *not* identical (such as one having an extra constraint), they will be processed separately.

Note that if you perform that search in a *workflow*, the query will be repeated.

#### If a search is performed, and then a change is made in the database that updates the results, is the query performed all over again?

The results from a database search is dynamic in the sense that any change made to the database by any user is immediately visible in the app of all other users. However, this doesn't mean that the entire query has to be re-processed. Bubble only sends the necessary updated data, making the process very lightweight. You can see the specific cost of updating data on the page in the [WU activity table](#user-content-fn-6)[^6].

If you'd still like to avoid this, you can use the [`:make static`](#user-content-fn-11)[^11] operator to save the list without the dynamic connection to the database. While there are scenarios where this approach makes sense, we'd generally discourage using this to save WU, as it can lead to data inconsistencies in your app.

#### If I use the "Current user" data source, will it consume WU?

Any information on the Current user is downloaded when the page loads, regardless of whether you reference this anywhere on the page. This includes all fields saved on that user, except for those that the current user is not allowed to see as a result of privacy rules. Note that linked data types, such as `Current User's Company's name` may still consume a tiny bit of WU to load when you reference it, as it's only loaded when needed.

#### If a *Make changes to a thing* has a condition, which uses a search that is used in the make changes action itself too, will we be charged for search twice?

Generally, Bubble doesn't perform a search more than once, as longs as they are identical. Note that this applies to elements, while `Do a search for` performed in a workflow will be repeated each time that condition or action is executed.

#### If I search for data and load it into a repeating group on one page, will Bubble cache the result so that the query doesn't need to be performed a second time when I navigate to a second page?

Bubble searches are dynamic, and always kept up to date with new information in the database. As such, every time `Do a search for` *is* used on a new page, the query will be processed as a new search. This also applies if the current page is refreshed.

#### If I use the *Go to Page* action and remain on the same page (such as updating URL parameters), will searches be queried again?

No, as long as you stay on the same page, searches on the page will not be repeated. Keep in mind that searches in *workflows* are repeated each time they are executed, and the *Go to page* action may lead to workflows running more times than you intended.

#### Does Bubble perform indexing on the database to make searches as efficient as possible?

Yes, with some caveats. Database indexing can greatly improve the efficiency of a search, but only when the database volume is large enough. Bubble processes different data types and queries intelligently to index the database as needed. This can sometimes lead to varying search speed, depending on whether the database has been indexed for a specific query, but it does not affect WU.

[^1]: *Workload* is the metric that Bubble uses to calculate and display how much work the Bubble server has to do to keep your app running. It's often abbreviated to WU (Workload Unit).\
    \
    Article series: [Pricing and workload](/account-and-marketplace/account-and-billing/pricing-plans)

[^2]: *Do a search for* is the data source in Bubble that searches your app's database for specific information using dynamic constraints, and then downloads the data to the user's device.

    Reference: [Do a search for](/core-resources/data/data-sources#do-a-search-for)\
    Article series: [The database](/help-guides/data/the-database)

[^3]: A *data source* is any place from which Bubble can fetch data, such as the database, the current user, the current time or an external API. They are used in dynamic expressions.

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)\
    Reference: [Data sources](/core-resources/data/data-sources)

[^4]: *WU* is an abbreviation for Workload Unit. This is the metric that Bubble uses to calculate and display how much work the Bubble server has to do to keep your app running.\
    \
    Article series: [Pricing and workload](/account-and-marketplace/account-and-billing/pricing-plans)

[^5]: *Dynamic expressions* are like "live" formulas that update in real-time based on user input, database updates and other changes in your app.

    \
    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^6]: WU is calculated by assigning specific activities different "entry ticket" costs. You can see the exact values in the article below.\
    \
    Article section: [WU activity types and cost](/help-guides/workload/understanding-workload/what-contributes-to-workload#what-does-an-activity-cost-in-wu)

[^7]: *Database trigger events* are a type of backend event that triggers whenever some specific data in the database changes. What this means is that whenever something is created, changed or deleted, the event will trigger and execute a workflow.

    Article: [Database trigger events](/help-guides/logic/workflows/events/backend-events/database-trigger-events)

[^8]: *Privacy rules* are conditions that you set up on each data type in order to protect the data from being viewed and edited by unauthorized users.\
    \
    Article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

[^9]: *Do a search for* is a data source that's used to search for and return a list of results from the database, such as searching for a list of users.\
    \
    Article series: [The database](/help-guides/data/the-database)\
    Reference: [Do a search for](/core-resources/data/data-sources#do-a-search-for)

[^10]: Such as using the

[^11]: *Make static* takes a list that relies on dynamic data and converts it into a list with the current items. Once converted to static, the list will not change if underlying values change.\
    \
    Reference: [The :make static operator](https://manual.bubble.io/help-guides/workload/optimizing-workload/optimization-checklist/pages/-MTpydODwo34mk5NucJy#...-make-static)
