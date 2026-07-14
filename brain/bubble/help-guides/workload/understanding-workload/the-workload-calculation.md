# The workload calculation
> Source: https://manual.bubble.io/help-guides/workload/understanding-workload/the-workload-calculation · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

In the last article, we looked at the activity types that are part of the workload calculation. In this article, we'll look closer at how the actual calculation happens.

## The entrance ticket metaphor

To get an understanding of why the values in the table don't necessarily represent what you see in the final logs, we'll use the theme park metaphor. Imagine the workload table values as entrance tickets to a theme park. While the ticket gets you into the park, each ride inside might have its own additional cost, which can vary depending on the details and specifics of that activity.

Just as some roller coasters might have a higher fee due to their popularity or thrill factor, certain operations in your Bubble app can be more resource-intensive based on how they're executed. In other words, the value in the table represents the *starting* cost of an operation – but the complexity of that operation determines the final value.

## Examples

Having established that metaphor, let's have a look at some examples to further illustrate the point:

### Each item written to or modified in the database

This item in the table is easy to understand: for each item that you write to in the database (For example using the [*Make changes to a thing*](#user-content-fn-1)[^1] action), a cost of 0.5 workload units is incurred. Now, let's return to the theme park metaphor: 0.5 is the price of the entrance ticket to the theme park called *Make changes to a thing*. Within that theme park, we may still have to pay for the rides inside.

Let's imagine that we are storing some statistical information in the database. We want to count all the registered users in our app, and save them on a data type called *Statistic.*

<figure><img src="/files/SL0gFvQE4J5JW55WhXUM" alt="" width="375"><figcaption></figcaption></figure>

We've already paid our 0.5 for the entrance ticket (starting the *Make changes to a thing* action), now let's see what rides in the theme park we have to pay for. In the example above, we're asking the server to do three things:

1. Search for a *Statistic* thing and return the first result
2. Search for the *User* thing and return the count
3. Make changes to the field *Number of users,* using the result of step 2

So while our ticket allows us to enter the park, at the end of the day we can also look back at having paid for three different rides with varying costs. This is why, as we mentioned in the opening of this article, it's important to understand the *total* server load rather than just the cost of starting a process.

In the above example, you are not asking the server to do *one* thing, but three. The final load on the server also depends on the number of *Users* and *Statistics* in the database, and how much data they contain.

### Performing an aggregate query in the database

This point too is pretty easy to read: to *perform an aggregate query* means to take a list of data and make an aggregation such as a *count* or calculating an *average*. This is listed with a cost (entry ticket) of 0.2, but again we need to take every detail of the operation into account.

Starting the aggregation calculation has a cost of 0.2, but the data to be aggregated needs to come from a [data source](#user-content-fn-2)[^2]. In many cases, this will be the result of a dynamic expression using the [*Do a search for*](#user-content-fn-3)[^3] data source.

What this means, is that *this* operation needs to be added to the total calculation. According to the activity type chart, a database search has a starting cost of 0.3. The complexity[^4] of that search can add to the cost of it.

Returning data from the database also has a cost of 0.000003 per character of data transmitted. Since we are returning a number in this case, that cost would be very low, but still a part of the full picture. Let's sum up what we are adding to workload in this example:

* A *Do a search* for query (cost: 0.3 per operation)
* An *aggregation* of the results of that data (cost 0.2 per operation)
* Sending the data to the user's device (cost 0.000003 per character)

Again, it's important to understand that the *total* cost can increase, depending on the complexity of an operation. If the *Do a search for* includes advanced filters performed server-side, then that will be calculated into the total.

Again, it may seem like we are performing one action, but technically, Bubble's server is performing the three listed above.

## How to think about the total

Workload is a calculation of the total work the server has to do to power your app. Our goal in sharing these examples is to give you basic understanding of how workload is calculated behind the scenes and help you see activity types as the building blocks for more complex operations in your app.

Because Bubble is so flexible, there’s also usually more than one way to achieve a certain outcome - and those different ways could be implemented invoking different basic activity types that can result in different workload calculation.

With this information in mind as you plan and build your app, you can take into account how different activity types are combined inside of a single action or expression to make up a total. For example, knowing that an complex search as part of an action is a fairly heavy database operation, you can take steps to find alternative solutions that consume less workload while retaining the same functionality.

## Backend versus front-end and workload

Workload is all about *server* work; in other words, things happening client-side don't cost workload at all, unless it involves some work from the server. Let's illustrate with an example:

#### Example 1: Setting a custom state containing text

Custom states are saved on the user's device, and as such do not involve the server. Thus, the action to set a custom state in itself does not incur any WU. Let's say you want to set a custom state of type *text* and assign it the value "Example".

In this case, the workload consumption would be 0.

#### Example 2: Setting a custom state containing data from the database

In our second example, we want to use a custom state with a custom data type that we need to fetch from the database. In this case, the *Set state of a custom element* action would still be free, but searching for the data would incur a cost, in two steps:

* Using *Do a search for* incurs a starting price (the "entry ticket")
  * The complexity of the search and volume of data returned is calculated into the total
* The data returned from the server incurs a cost per character returned

As we can see in this example, since the client-side action (setting the custom state) requires an additional server-side action (searching for and returning data), it will incur a small WU cost.

#### Example 3: Using the Go to page action to navigate within the same page

The *Go to page* can be used to assign URL parameters to the URL and navigate a single-page application. As long as you are staying on the same page and not loading a different page, this too is a purely client-side action and does not incur any WU consumption.

(keep in mind that workflows that execute on page load might still be repeated and consume WU. We cover this in-depth in the article below).

Article: [Page load and workload](/help-guides/workload/optimizing-workload/optimization-checklist/page-load)

#### Example 4: Using the Go to page action to change the *Page thing*

In this example, we're using the *Go to page* action to change the Page thing. In this case, even though we are still on the same page, Bubble will need to fetch the data for the new Page thing and spend some WU on it. How much depends on how you instruct Bubble to find the data. For example, if you use *Do a search for* you may be consuming a bit more WU than if you reference it directly, such as *Current user's Active project.*

#### Example 5: Using the Go to page action to navigate to a different page

If you are using the *Go to page* action to navigate to a different page, you're again asking the server for some information:

* Loading the page itself (generating the code and sending it to the browser)
* Loading the data needed for the page (searches, repeating groups, aggregated numbers and other dynamic expressions)
* Running workflows set to execute on page load

Again, page load is covered more in-depth in the article below:

Article: [Page load and workload](/help-guides/workload/optimizing-workload/optimization-checklist/page-load)

[^1]: The *Make changes to a thing* action is used to write in the database on an existing thing (record).<br>

    Article: [Creating, saving and deleting data](/help-guides/data/the-database/creating-saving-and-deleting-data)

    Reference: [Make changes to a thing](https://manual.bubble.io/help-guides/workload/understanding-workload/pages/-MTujs88N9W-2FUmQGag#make-changes-to-thing...)

[^2]: A *data source* is any source from which Bubble can fetch data, such as the current user, a database search or the response to an API call.

    Article series: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^3]: *Do a search for* is a data source that performs a database search with specific constraints and sortin&#x67;*.* It returns a list of things from the database.

    Article: [Finding data](/help-guides/data/the-database/finding-data)

[^4]: *Complexity* in this context refers to adding the *:filtered* operator to the search. This can sometimes force Bubble to perform additional tasks on a search, leading to an a separately calculated WU cost.
