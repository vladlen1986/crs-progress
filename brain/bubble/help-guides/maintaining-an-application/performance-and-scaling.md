# Performance
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/performance-and-scaling · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The Bubble team is constantly looking to optimize scalability and performance. This means improvements to both the Bubble platform to handle all the thousands of Bubble apps (our scalability and performance), as well as to the platform so that Bubble apps provide a good experience for their end-users.

Performance and scaling of a Bubble app are heavily impacted by how the app is built. This page will give an overview of app performance and scalability as well as offer some concrete tips.

## General principles & tips about performance <a href="#general-principles-and-tips-about-performance" id="general-principles-and-tips-about-performance"></a>

* **The less data being fetched, the faster the performance** - a page often needs to fetch some data on page load; a page that fetches 100 things on page load will load faster than a page that fetches 1 million data items; similarly, fetching simple data types like numbers will be faster than fetching MBs of data
* **Similarly, having many small, simple pages will be faster than having fewer, complex pages**
* **Keep any sorting or filtering as close to the original search as possible** - Bubble already optimizes database queries in many ways, but performing a sort or filter at the database level is very efficient. This means that queries that apply :sort or :filter to them will tend to be more efficient than queries with sorting or filtering after some other kind of manipulation of the results (example: doing search:count will be more efficient than search:group by:count)
* **Using advanced filters can slow queries down** - An underlying principle is that if a filter (or sort) can be done "on the database", it will be faster than a filter (or sort) that Bubble has to do after retrieving an initial set of data from the database. Which filters are done on the database vs. not? Filters which show up in the Search palette (the additional sidebar which slides out when you click "Do a search for") are done on the database and are thus are generally fast. Filters which are applied with :filter are generally "advanced" filters that are generally slower.
* **Chained queries run in series, not in parallel** - With Bubble it's possible to use the results of one search as the constraints of another search, and so on. These searches run in series, not in parallel, so if the first search returns a lot of data, that will slow the second search down, and so on
* **Bubble already does a lot of performance optimization** - Bubble tries to run queries on the database, resize images on the server, tell the browser to cache Javascript, etc. as appropriate. If you're running a query that feels relatively simple and retrieves a relatively small amount of data that's running very slowly, check if there is some optimization that can be done to the app's data hierarchy or queries, based on some of the guidance here
* **In general, the simpler way to express a query is faster** - Not always true but a good rule of thumb. Bubble is constantly working on database optimizations for the most common patterns
* **Avoid modifying data on every page load** - Changing element states is more performant than making additional database calls to accomplish the same behavior
* **Try moving expensive calculations to behind-the-scenes scheduled workflows** - A scheduled workflow can run the heavy query then save the result somewhere to use later; this is more performant than running the heavy query on a page load
* **Use the "Make changes to a list of X" workflow action cautiously** - This action is great when making a quick change to a short list of things, but as the number in the list grows, it quickly raises the risk of the workflow timing out. If you're experiencing timeouts with this action, consider instead "Schedule API Workflow on a list", which is more performant because it takes the list and schedules an API Workflow to run on each item of the list, separately (i.e. lowering the risk of a timeout)

{% hint style="warning" %}
Watch out!

Your Bubble app's database is very flexible and powerful. It can store a lot - but if you try to store too much data in one field, it can lead to performance issues relating to that field. For example, if you have a Blog data type with a field for Contents, this should be able to handle blog posts just fine. But, if you try to stuff all the contents from Wikipedia into that one field, it probably will not work as well! More realistically, if you try to store a base64-encoded image (which is a lot of text) in a text field, this can lead to slower performance and unexpected behavior.
{% endhint %}

## What happens on page load? <a href="#what-happens-on-page-load" id="what-happens-on-page-load"></a>

Here is a rough sequence of events of what happens when Bubble loads a page:

1. Bubble sends the code for all the elements (visible and invisible)
2. Bubble draws all the *visible* elements on the page
3. Bubble fetches all the dynamic data needed for the *visible* elements

This means:

* Invisible elements aren't drawn until they get displayed later...
* ...unless a visible item refers to an invisible item's data source. (Note that using one visible element to cover another visible one does not make the latter one "invisible" in this context!)
* For page load speed, the number of elements is a bigger factor than the type of elements

All the element types are fairly similar to each other in terms of performance, with two exceptions:

1. Repeating groups load different amounts of data depending on the Layout Style property; notes on performance of the different choices are in the [Reference](https://bubble.io/reference#Elements.RepeatingGroup.data_source). Note also that the more elements there are in each cell of the repeating group, the more time it takes to render the page
   1. A repeating group with 10 cells each with 2 elements is faster than 20 separate elements, but slower than 3 elements
   2. A *nested* repeating group has a multiplicative effect on the number of elements!
2. Plugins have their code included on each page load regardless if it's used. This isn't as big a performance impact because Bubble won't *render* the plugin if it's not used, but in general, it's a good idea to uninstall plugins that the app isn't using

## Working with soft limits <a href="#additional-notes-about-performance" id="additional-notes-about-performance"></a>

### Hard vs soft limits

Before we look at how different limitations might affect your project, we'd like to briefly cover the concept of hard and soft limits:

**Soft limits** are flexible boundaries that can be exceeded in but may impact performance or stability. Soft limits are influenced by factors such as the structure of your application and your pricing plan. For instance, a large volume of database records with substantial data can result in slower search performance.

**Hard limits** are fixed boundaries that cannot be exceeded. Some hard limits can be increased by upgrading to higher pricing plans, and others can be circumvented through thoughtful app design and optimization, but as a developer you should be aware of them and how they might affect your project.

{% hint style="info" %}
You can read more about hard limits in our dedicated article on the subject:

Article: [Bubble's hard limits](/help-guides/maintaining-an-application/performance-and-scaling/hard-limits)
{% endhint %}

### Timeouts

Timeouts can happen when a specific action takes too long to complete and is terminated by the system. They are used to prevent a single request or app from monopolizing server resources, to make sure that all applications on our shared servers remain responsive and performant.

### Predicting and planning for limitations

As with any database system, slowdowns, timeouts and errors when applying pressure on the Bubble server can be challenging to predict and plan for and depend a great deal on how your app is designed and the volume of data you are working on.

Timeouts are rare, but can be challenging to predict and can lead to data loss and other consequences as a result of a process being terminated before it has finished.

While we can document the hard limits you might encounter, soft limits are more complex as they can vary greatly depending on what your app is doing. To minimize the risk of slowdowns and timeouts, we recommend you break up complex processes into smaller chunks.

### Throttling and how it may affect timeouts

If your app spends its near-maximum allotted capacity for some time (closing in one one minute), your app may be throttled to keep it running without exceeding capacity. This can lead to a negative feedback loop where workflows are slowed down and exceed their hard timeout limit as a result. Therefore, timeouts may appear to be unpredictable, as a process may complete successfully on one occasion but time out on another.

We recommend thinking holistically about your app's total capacity and keep in mind that simultaneous process can affect each other. If you can, try to move heavy processes to times when your app is less active (for example at times where you have fewer active users)

## Known soft limits

### SVG image size

SVG images are stored in XML code which is parsed by your browser to render a vector-based graphic that can be scaled up or down without losing resolution. This is different from raster images, such as JPEG or PNG files, that can become pixelated when scaled beyond their original size.

This makes SVG files very useful in many situations, but we recommend a **soft limit of 1 Mb** for SVG files to avoid the local device slowing down when processing the file.

### Searches with the :advanced constraint

Searches that use the :advanced operator can be more taxing on the server. While there's not a hard limit on what you can search through, we generally don't recommend using this constraint on more than 10,000 things.

## Additional notes about performance <a href="#additional-notes-about-performance" id="additional-notes-about-performance"></a>

The power of reuse:

* If a page has the same search in more than one place, Bubble will automatically combine them to run the query once
* Leveraging Styles helps improve performance
* The first few times you run a particularly heavy search might be a bit slower than future runs, because after Bubble sees a heavy query run a few times, Bubble builds an index that should massively speed up the search in the future (building the index could take up to an hour or so)

X vs Y:

* An action that changes a dozen fields is more efficient than a dozen actions that change one field
* Changing a list of things is fast for relatively small lists, but for bigger lists, an API workflow will be more scalable since it doesn't run the risk of timing out the workflow
* When changing a (large) list, recursively calling an API workflow for subsequent items on the list is more scalable, though a bit slower, than running the API workflow on the entire list at once
* Navigating to a new page via a link element is generally a little bit faster, because workflow actions that navigate will wait on other workflows to save data before changing the page
* For situations where data type A has connections to multiple Bs (e.g. posts having categories but only one category per post; A = category, B = post), having a field on B that references the A it belongs to is generally better. Having a field on A that lists out all the Bs that belong to it is not going to work as well when that list can get very long
* For API workflows, the number of items the workflow has to act upon is a bigger impact on performance than the size of each item

## Capacity <a href="#capacity" id="capacity"></a>

In non-technical terms, "capacity" measures how much "stuff" your app can do in a given period of time. A user coming to your website uses a bit of capacity; having hordes of users coming to your website uses much more capacity. Calling the database uses capacity; performing lots of heavy database queries uses much more capacity. Running certain workflows (the ones that happen on the server) uses capacity, and similarly calling an app's APIs uses capacity.

Throughout Bubble, there are references to "units" of capacity. A "unit" is a weighted measure of different scarce resources that Bubble's systems use; it includes factors like server CPU time, database CPU time, other backend systems, and more. The exact formula for a "unit" will change over time as Bubble adds, removes or improves backend systems; one of Bubble's goals is to improve the amount of user-facing performance that a unit of capacity delivers.

On certain Bubble [pricing tiers](https://bubble.io/pricing) (namely Free and Personal), the app will have "Basic" server capacity, which means it's sharing the same computing resources with all other Bubble apps of these tiers. When an app is upgraded to the "Professional" and "Production" tiers, the app gets dedicated or "reserved" units of capacity which are reserved for that app. When capacity is exceeded, the app is rate-limited; again in non-technical terms, it means the app won't be able to do as much "stuff" in a given period of time, and users' requests on the app will effectively be slowed down. Thus, having more capacity generally means that the app can do more "stuff" if a lot of "stuff" is going on.

There's a slight twist to this. Capacity can be compared to how many checkout lines there are at a grocery store. If the store adds more lines, it can handle more customers checking out at the same time. But, if a customer comes along with a cart of hundreds of items, that customer will still take up a whole checkout line for a while; also, having more checkout lines doesn't mean that resource-intensive customer will finish faster. Similarly, having more capacity won't make a very complex database query run that much faster - it's like that one customer checking out with a lot of items in their cart. (There is a caveat to this: if Bubble detects that a large query will eat up all of an app's capacity, Bubble will slow down that query to try to maintain a reasonable user experience for the rest of the app. Thus, in certain situations, adding capacity *might* make a large query run faster.)

Users can see how much capacity their apps are using by going to Logs on the left-side nav. The first chart shows how much time the app has hit its maximum capacity; the second chart shows how much capacity has been used by the app relative to its maximum capacity. Further down on the page is the server capacity usage details chart, which shows the breakdown of capacity used by different parts of the app within the past 24 hours. If an app is slow and is hitting capacity limits, purchasing reserved additional capacity may help.

{% hint style="warning" %}
**Note:** Our server logging provider, AppOptics, has limits on the metric we use for the Maximum Capacity charts. Very high-activity Bubble apps may hit this limit when trying to query the logs for a long time period (i.e. 30 days). If this happens in your app, consider setting the chart date range to a shorter duration (i.e. 7 days).
{% endhint %}

## What about dedicated instances? <a href="#what-about-dedicated-instances" id="what-about-dedicated-instances"></a>

Dedicated instances can help with performance in three primary ways:

1. Geography - a dedicated instance can be located geographically closer to your users, which helps with the performance of large static assets
2. Heavy data operations - these can be substantially faster on a dedicated instance
3. Stability - with dedicated instances you can test an app on the main Bubble cluster before upgrading the dedicated instance; this can be useful for ensuring an app's stability with a new version of Bubble, as well as eliminate the risk of a Bubble-wide outage

{% hint style="info" %}
If you're interested in hosting your app on a Dedicated instance of Bubble and want to learn more, please contact our sales team [here](https://bubble.io/contact-sales).
{% endhint %}

## In closing <a href="#in-closing" id="in-closing"></a>

At the end of the day, the above are general guidelines that are meant to provide some transparency into factors impacting performance. However, these are only guidelines; if performance is critical in a particular case for your app, try testing different approaches empirically to see what's faster\![<br>](https://manual.bubble.io/architecture-optimization-and-limits-of-the-bubble-engine)
