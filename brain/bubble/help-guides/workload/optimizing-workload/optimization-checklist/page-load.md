# Page load
> Source: https://manual.bubble.io/help-guides/workload/optimizing-workload/optimization-checklist/page-load · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

In this article, we'll have a look at one of the key decision points when you optimize your app for workload: what happens when the page loads?

Before we dive in, let's define what we mean.

## What do we mean by page load?

As straightforward as the question may feel, it deserves a proper definition. Of course, by page load, we mean *when a user visits the page*. But there's more to it then that:

### Go to page

If you have actions that run on page load, they will be triggered once more if you use the [*Go to page*](#user-content-fn-1)[^1] action and go to the same page that's currently being viewed, even if the page is not refreshed.

This is not uncommon: the *Go to page* action is frequently used to update the [page thing](#user-content-fn-2)[^2] or URL parameters, for example. Especially in single-page applications, updating a URL parameter does not necessarily mean that you are leaving or refreshing the page.

Using the go to page action on the same is instant, and happens without reloading, but **page load events will still trigger**.

### Users reloading the page

Another point is that users sometimes refresh the page all on their own. In other words, one user does not necessarily equal one page load. There are many reasons for why a user might reload the page inside of even a short timeframe, ranging from the power of habit, to changing device to browser crashes.

In other words, you are not always in control of the number of page loads that happen per user.

### Page load from a workload perspective

From a workload perspective, a fresh page load consists of three processes:

* Loading the page itself (generating the code and sending it to the browser)
* Loading the data needed for the page (searches, repeating groups, aggregated numbers and other dynamic expressions)
* Running workflows set to execute on page load

## Why page load is important

The most obvious point is that whatever happens on page load happens every single time a user visits or refreshes that page in your app. In other words, the load that you place on the server in that moment should be carefully considered.

Let's look at how that translates into real-life design decisions.

### What do you show when the page loads?

#### Example 1: Statistics dashboard

Let's imagine that you are building an [eCommerce marketplace](#user-content-fn-3)[^3] where users can sell their own products. When a seller logs in to their seller dashboard, they are immediately greeted with a dashboard that shows their sales statistics.

Statistics and reports can be resource-demanding to generate: they can require multiple complicated database searches and complex aggregation. Showing this by default on page load can consume a significant amount of workload. While this may of course be the right UX choice for your app, it may be worth considering a few questions:

* Does this information need to be displayed on page load, or can you "hide" it behind a button or menu click: in other words, that the user *requests* the reports instead of showing them by default.
* Do you need to show real-time data, or can you generate reports that you can then load as a single data type instead of generating the report every time the page loads?
* Are there parts of the report that you can cut, or hide behind a navigation option such as a link or button?

#### Example 2: eCommerce front page

Let's now look at the front page of your eCommerce marketplace (the index page of your app). As soon as the page loads, you show a list of popular products. Again, this can lead to at least one search being performed on every page load. For an open app like an eCommerce store (that doesn't require users to log in and are visible in search engines), this can require significant server resources as traffic grows.

Again, we can ask the question: is there a way to spend less workload without sacrificing the user experience? In this case, we may ask:

* Can the front page be set up as a static page instead of a dynamic product search?
  * You can use static data in elements for option sets to load the data
* How many products do you need to show on page load: can you make the list shorter?

Showing products is of course necessary to getting any sales in an eCommerce app: still, considering how database queries can consume workload, it can be worth considering different methods to preserve workload without it affecting the user experience. Avoiding database requests can also make the page load faster.

At this point, we should re-visit the point that workload consumption is just one of many considerations as you design your app: don't sacrifice a great, dynamic shopping experience for your users if this is an important part of your app – but keep in mind that you have options that consume less workload if your front page will perform just as well with static data.

As always, it's about finding the right balance: in this case, if we switch to a static front page, we're weighing three facts:

👍 The page will spend less workload and may load faster\
👎 The list of products will not be dynamic: it will look the same to all users\
👎 The page will require more manual upkeep since the static data is not automatically synced with the database (if the price or image of a product changes, for example)

#### Lessons

Let's sum up how we can make informed decisions about what to show on page load:

1. **Limit initial data load**: instead of loading large lists of data, only load what's immediately necessary for the user. Implement pagination or infinite scrolling to progressively load more data as needed.
2. **Optimize searches**: make sure your database searches are precise. Use specific constraints in your searches to minimize the number of results returned.
3. **Defer data loading**: use hidden containers[^4] to load some data only when it's actually needed (e.g., when a user clicks a button). For example, a list of things or statistical aggregations may not be necessary to show before the user asks for it.
4. **Avoid redundant searches**: if you find that multiple elements or workflows are performing similar (but not identical) searches, consider ways to consolidate or reuse the results. Searches that are identical are only performed once.

### Actions on page load

Whenever you use the *Page is loaded* event, every action in that workflow will trigger when the page loads, as well as any time the *Go to page* action is used to update the page thing or URL parameters. In other words, the *Go to page* event can lead to a workflow running multiple times within the same session.

Even without those repetitions, workflows running on page load should be carefully considered, as they can lead to a higher workload consumption than you intended. Keep in mind that client-side actions (such as hiding and showing elements) *don't* consume workload––only server-side actions (like reading or writing to the database). Let's again illustrate with examples.

#### Example 1: App statistics

Let's say that you'd like to keep track of the number of visitors to a page. To solve it, you set up a workflow that runs on page load, which adds a +1 to an existing count on a data type called *Traffic statistics.* Pretty lightweight, eh?

Technically, yes––this is not a big operation. But the *volume* of requests can still make this a taxing process, since it happens every single time the page loads. There are many external systems (like Google Analytics, Mixpanel and Segment) that can track the same information without spending your workload, and they also come with advanced reports that you would otherwise have to build yourself.

As usual, there's a caveat here: there *are* valid reasons to log the numbers yourself. Running a workflow may be more precise than using a third-party tracking tool, or there may be reasons you need this data in your database. Weigh the advantages and drawbacks, and decide from there.

#### Example 2: Creating a cart for users

Let's return to our eCommerce example. On page load, you have a workflow that checks the following:

1. Does the user have a thing of data type *Shopping cart* saved in its *Cart* field?
2. If not, create a *Cart* and assign it to the *Current User's Cart.*

This way, you ensure that the data type *Cart* is already assigned to the user and they can put items in it immediately.

Again, there may be perfectly valid reasons for why you want to create the cart before the user starts shopping, but it's worth it to pause and reflect: do you need to create the cart at that time? Do you need to check it every single time the page loads?

Creating the cart is a small operation, and would quickly finish even if you execute it at the time the user adds the first item to the cart. Additionally, if the user ends up leaving your site without ever adding any items, you'll be left with a lot of [*ghost data*](#user-content-fn-5)[^5] in your app––empty carts that are never used again.

#### Lessons

These are just two niche examples to illustrate a point: workflows triggered on page load will recur often, and their frequency will amplify as your user numbers rise. In many scenarios, there are alternatives that are gentler on workload while still preserving a quality user experience.

1. **Minimize on-page load workflows**: instead of running multiple workflows when the page loads, see if some can be triggered by user actions or be delayed until they're absolutely needed.
2. **Look for ways to make page load workflows lightweight:** look for ways to minimize the server interaction in page load workflows. Communicating with the database (especially if searches are involved) can be very taxing, and should be avoided when possible.
3. **Use conditions to avoid running workflows multiple times:** using a simple, client-side[^6] condition, you can avoid running the same workflow every time the *Go to page* action is used. For example, in the original *Page is loaded* action, you can add a step that sets a [custom state](#user-content-fn-7)[^7], such as *Page loaded = yes*, and then place a condition on the event of the same workflow that checks if that custom state has been set to *yes*. This is an easy way to check if it has already run once, and since it all happens client-side, it spends no workload at all.

## Summary

<details>

<summary>Summary: Page load and workload</summary>

* Page load includes:
  * loading the page code
  * loading dynamic data
  * executing any workflows set to trigger on page load
* Strategies to optimize page load workload involve careful consideration of what data and workflows are necessary immediately upon loading.
* Limiting data loaded initially, optimizing searches, and deferring data loading until necessary can significantly reduce workload.
* Reducing the number of workflows that trigger on page load, and ensuring they are lightweight, can help manage workload.
* Considering alternative methods to monitor page visits, like using third-party analytics, can save workload compared to custom-built solutions.

</details>

[^1]: *Go to page* is an action used to send the user to a different page, or to update the URL parameters or Page thing of the current page.

    Article series: [Navigation](/help-guides/logic/navigation)

    Article: [URL parameters](/help-guides/data/temporary-data/url-parameters)

    Reference: [Go to page](https://manual.bubble.io/help-guides/workload/optimizing-workload/optimization-checklist/pages/-MTujrgFLiHe7MfwSBOF#go-to-page-...)

    \
    \
    \ <br>

[^2]: The *page thing* is the data thing (record) that you load to a page. The page thing will be visible in the page's URL.

    For example you could be loading a product with the URL `www.myapp.com/product/baseball-cap`. In that example, the baseball cap is the page thing (reflected by its slug).

    Reference: [The page thing](/core-resources/data/data-sources#current-page-thing)

    \
    \ <br>

[^3]: *Marketplace apps* are apps where both the buyers and sellers of a products are user&#x73;*.* For example, you may have an app that lets freelancers sell their services to clients.

    Marketplace apps usually handle both the marketplace and payment. We have an extended guide on how to structure your database for marketplace apps.

    Article: [Marketplace app database structure](/help-guides/data/the-database/database-structure-by-app-type/marketplace-apps)

[^4]: *Containers* are the type of elements that can contain other elements, such as groups, popups, floating groups, etc.

    Article series: [Containers](/help-guides/design/elements/web-app/containers)

[^5]: *Ghost data* is a term that describes leftover data in your database that is of no us&#x65;*.* In this context, numerous shopping carts could end up clogging your database, but they are never used for anything.

[^6]: In this context, client-side means that the condition does not need to communicate with the server to work.

    In the example we provide in this section, we're using a custom state, which works entirely client-side.

    Article: [Client-side and server-side](/help-guides/security/client-side-and-server-side)

[^7]: A *custom state* is a kind of variable that you can save on an element to hold temporary information. Custom states can hold every kind of information, including custom data types, but they will be reset when the page reloads.

    Article: [Custom states](/help-guides/data/temporary-data/custom-states)
