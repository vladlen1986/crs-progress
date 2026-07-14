# Dynamic expressions
> Source: https://manual.bubble.io/help-guides/logic/dynamic-expressions · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how to set up dynamic expressions in Bubble

In this article we'll be diving into the world of dynamic expressions.

Dynamic expressions are like "live" formulas that update in real-time based on user input, database updates and other changes in your app.

<figure><img src="/files/AwMAzVgREc0NPfHxa5AP" alt=""><figcaption><p>Expression lets you work with data dynamically and in many different ways. In the example above we are searching for users in the database and counting them. The result would be a live reflection of the count of users that updates automatically every time a user is added or removed.</p></figcaption></figure>

Dynamic expressions are one of Bubble's basic building blocks and are used in a wide range of scenarios.

For example, let's say you're building an app that tracks customer orders. You might use a dynamic expression to calculate the total cost of an order, based on the price of each item and the quantity ordered. Or you might use a dynamic expression to automatically update inventory levels when a new order is placed.

Like formulas in a spreadsheet, dynamic expressions in Bubble update in real-time based on changes in your app and database. So if a customer changes the quantity of an item in their order, the total cost of the order will automatically update.

By mastering dynamic expressions, you'll be able to create powerful, interactive apps that are constantly kept in sync with relevant data.

{% embed url="<https://www.youtube.com/watch?v=mrh8OV79snk>" %}

## How dynamic expressions are structured

Although dynamic expressions can vary greatly in complexity, they essentially consist of three main components: **data sources**, **operators** and **comparisons.**

<table data-view="cards"><thead><tr><th></th><th></th><th></th></tr></thead><tbody><tr><td><strong>Data source</strong></td><td>A data source is any place from which Bubble can retrieve data, such as the database, the current user or an API.</td><td></td></tr><tr><td><strong>Operators</strong></td><td>Operators functions or actions that can be performed on the data source, such as counting, sorting and calculating.</td><td></td></tr><tr><td><strong>Comparisons</strong></td><td>Comparisons let you compare two compatible values, such as two numbers, data types or strings of text and get a yes/no result</td><td></td></tr></tbody></table>

### Data sources

A *data source* is any place from which Bubble can retrieve data, such as:

* A [database search](#user-content-fn-1)[^1]
* The [current user](#user-content-fn-2)[^2]
* An [Option set](#user-content-fn-3)[^3]
* An [API call](#user-content-fn-4)[^4]
* The current date/time
* The user's [current geographic position](#user-content-fn-5)[^5]

This is not an exhaustive list, but it illustrates the point that data sources are not just database records, but *any* channel from you can draw some sort of information. Expressions always start with a data source, and you and then (often optionally) add one or more operators to that data source to transform, aggregate or manipulate the data in some way.

### Operators

{% hint style="info" %}
Here we describe what operators are in general. If you want the list and technical documentation on each operator, you may be interested in checking out the core reference entry on operators.\
\
Reference: [Operators](/core-resources/data/operations-and-comparisons)
{% endhint %}

Operators are all kinds of functions or actions that can be performed on the data source, such as filtering, sorting, grouping, aggregating, reducing, joining, and many others, depending on the data type you are working on.

<figure><img src="/files/AwMAzVgREc0NPfHxa5AP" alt=""><figcaption></figcaption></figure>

As we saw in the example from earlier, the dynamic expression goes through two steps, separated by a colon (:):

1. **Data source**: we are using the *Do a search for* data source to search for users
2. **Operator:** we added the *count* operator to the search to instruct Bubble to count the results

An expression will always return the value of its last step. As such, the expression above would not return a list of users, but a number representing the count of users (such as 50).

#### Data-specific operators

Bubble will adjust the list of available operators based on what kind of data the data source returns. In the example above, the data source *searches for users and returns a list.* Since this is a quantifiable resource, we can instruct Bubble to count the number of entries in the list.

<figure><img src="/files/Kx1d9itZ5hrvkFBZ2PbD" alt=""><figcaption><p>Bubble will list the operators that are relevant for the type of data returned by the data source. In this example the data source is <em>Search for users</em> (which returns a list of database records) and we can select different operators that apply to that data type.</p></figcaption></figure>

Were we to change the data source to another type of data, such as a *date*, the list of available operators changes to reflect it:

<figure><img src="/files/eOH6m5PGSMDL3Y9pssHj" alt=""><figcaption><p>In this example we've changed the data source to one returning a datetime, and Bubble changes the list of available operators to reflect it.</p></figcaption></figure>

An operator will in many cases change the format of the data returned. Let's look at the two examples in the above screenshots:

* In the first we are using an operator to count the results of a search, and the data switches from a list of database records to a number
* In the second, we are looking at a datetime[^6], and the returned data depends on the operator:
  * The *formatted as 3/10-23* operator will turn the datetime into a text string such as "3/10-2023".
  * The < -range - > will turn two datetimes into a [date range](#user-content-fn-7)[^7]
  * The +seconds/+ minutes etc operators will add the number of seconds and minutes but keep the datetime format

### Comparisons

Comparisons are the third component of an expression and are used to compare two values to reach a value that is either yes or no. You can see comparisons as a sort of question. In the two examples below, we first see how a human would read the question, and then how it would be formatted in an expression.

```
Is 5 a bigger number than 3? Aswer: yes
```

This is how a human being would ask the question, and it's not open-ended: the answer will always be yes. In an expression, the same question would be laid out more mathematically and always have a clear answer:

```
5 > 3 = yes
```

The > symbol represents *bigger than*, and again the answer would be yes.

In these two examples, *5* and *3* are both *data sources*, and the > is the *comparison*. As such, we are comparing the value of two data sources to get to a yes or no (or true/false if you will).

Expressions are set up to work with dynamic data sources and operators, so let's compare two numbers in an expression that are the results of counting things. In our earlier example, we counted the number of users. Let's assume we have another data type called *Task* and compare how many there are of each.

The structure in this expression will be:

```
Data source:operator comparison data source:operator
```

```
Search for users:count is search for tasks:count
```

We are replacing the > with an *is*. In other words, we are not asking *is one bigger*, but changing the question to *are they the same*. This is what that looks like in an expression:

<figure><img src="/files/q114oSWhskIw4KqikGBT" alt=""><figcaption></figcaption></figure>

Let's assume we have 50 users and 20 tasks, in which case the question we ask is:

```
Is 50 the same as 20? Answer: No
```

#### Comparing other types of data

Comparisons can handle any type of data as long as they can be compared. For example, we could ask the question:

```
Is London the same as New York? Answer: No
```

In this example we're no longer looking at numbers, but comparing two strings of text. Since the two strings are not identical, we can conclude with the answer *no*. In a Bubble expression we might get those names from a data type called *City,* looking something like this:

<figure><img src="/files/iq8P5gQSxCHL1j1OXSHp" alt=""><figcaption></figcaption></figure>

In the expression above, we are combining multiple data sources, operators and a comparison to ask the question:

{% code overflow="wrap" %}

```
Is the name of the City saved on the current user the same as the name of the first city returned by this search? Answer: no
```

{% endcode %}

In this example we compared the *names* of the city (text) specifically, but we could also ask Bubble directly whether the two cities are indeed the same database record:

<figure><img src="/files/24OcDdKJmx3Cr8fJ4tVU" alt=""><figcaption></figcaption></figure>

The question has now changed to:

{% code overflow="wrap" %}

```
Is the database record saved in the City field of the user the same as the dataase record found with this search? Answer: No 
```

{% endcode %}

The two examples would yield the same result: no, they are not the same. However, if the two cities shared names (such as *Paris* in the US state of Texas and *Paris* the capitol of France), the first one would respond with yes and the second would respond with no: they have the same name, but they are not the same database record.

As we can see from that example, you should put some thought into comparisons to make sure that they can reliably give the right response.

## Adding Dynamic expressions

Dynamic expressions can in many cases be mixed in with regular text to produce a coherent message to your users. In the example above for example, we set up a dynamic expression to count the number of users, and wrapped the expression in a text:

```
There are [expression] users in your app
```

To your users, the full text will simply be: "There are 50 users in your app", hiding the calculation going on under the hood.

To add an expression anywhere in a text field, set focus to that field and then click the *Insert dynamic data* button that shows up next to it.

<figure><img src="/files/ramww4X0vD9QbZOWlVX2" alt=""><figcaption><p>1) Set focus to the text field, and then 2) click the <em>Insert dynamic data</em> button to create an expression where the insertion point is.</p></figcaption></figure>

Sometimes there will be a field with an empty expression.

* To create an expression there, simply click on it
* To delete it, click on it and then click backspace

<figure><img src="/files/gY9cm4sxNcpguaPfYKmQ" alt=""><figcaption><p>The <em>Click</em> text indicates that Bubble is already expecting an expression.</p></figcaption></figure>

## Expression use cases

Expressions, being such a central part of the Bubble platform, are used in a wide range of different scenarios. Let's look at a few:

### In elements

Dynamic expressions can be used in elements[^8] to provide a value. We have already looked at how we can place it in a text element to display the result of the expression as a text.

#### Example 1: Set an initial date

In the example below we are using an expression to set the initial value of a [date/time picker element](#user-content-fn-9)[^9]:

<figure><img src="/files/KIjpG8kdtRPsQaZ04B7d" alt=""><figcaption></figcaption></figure>

The *initial content* field tells Bubble to show a date in the element when the page loads. In a humanly readable sentence, we are telling Bubble:

{% code overflow="wrap" %}

```
Set the initial content of this Date/time picker element to the current date and time, but add one day
```

{% endcode %}

The result for the user would be that the default value of the element is at the current time tomorrow.

#### Example 2: Load a list of users and show them in a repeating group

When using a [repeating group](#user-content-fn-10)[^10], we need to provide a data source, and this too is done by setting up an expression. For this, we could simply define a data source such as *Do a search for Users*, but to show how we can use expressions to be more complex, let's include an operator as well:

<figure><img src="/files/X4MYyL0L8pRFmTmpSQxc" alt=""><figcaption></figcaption></figure>

In this example we are using the [*intersect with*](#user-content-fn-11)[^11] operator to generate a list of users thats different than what we would get in the data source alone. In a humanly readable sentence, we are telling Bubble:

{% code overflow="wrap" %}

```
Search for one set of users and a second set of users and then return the list of users who are in both lists
```

{% endcode %}

If we assume that the two searches produce different results by having different constraints, we would be left with the list of users that are present in both of the search results.

### In conditions (conditional expressions)

{% hint style="info" %}
In this section we briefly explore how conditions work. If you are interested in learning more you can check out our dedicated article on the subject:\
\
Article: [Conditions](/help-guides/logic/conditions)
{% endhint %}

Conditions, or conditional expressions, are expressions that are set up to return a value that's either yes or no and then use that answer to either *do* something or *not* do it:

This can be used to:

* Style an element depending on whether the condition is true
* Trigger a workflow to run whenever the condition is true
* Ask whether a workflow/action triggered somewhere else should run

#### Example 1: hide an element if the user isn't logged in

For our first example, we'll place a condition on an element that will hide the element if the user is logged out. For example, if we have a *Sign out* button, it makes sense to hide it.

<figure><img src="/files/mmLE4yFpsgxZlza2ncyl" alt=""><figcaption></figcaption></figure>

1. The first part is the expression: we use the data source *current user* and the operator *is logged out* to get a yes/no anwer
2. We instruct Bubble to change one of the element's properties: we set *this element is visible* to *unchecked.*

In a humanly readable sentence, we are saying:

```
If the current user is logged out, make this button invisible
```

#### Example 2: stop a workflow from running

In the second example, we'll look at how a conditional expression can determine whether a workflow should run or not when it's triggered. Let's say we have a form where users can create a new Task, but we don't want to create the contact if the user hasn't provided a name for the task:

<figure><img src="/files/cHpXtHBDpfPzc1MDII2r" alt=""><figcaption></figcaption></figure>

In this example, the data source is the input element *Input task* and we've added two operators:

* *value* instructs Bubble to return the value from that input (which would be the task name the user has provided)
* *is not empty* gives us a yes/no answer to whether the *value* operator returns an empty result or not

In a humanly readable sentence, we are saying:

```
Only run this workflow if the user has provided a name for the new task
```

### In workflows

{% hint style="info" %}
In this section we briefly explore how workflows work. If you are interested in learning more you can check out our dedicated article on the subject:\
\
Article: [Workflows](/help-guides/logic/workflows)
{% endhint %}

We can also use expressions in workflows to produce a particular result.

#### Example 1: saving aggregated data

Let's say that we run an app where users provide reviews for different products. In addition to the built-in user data type, we have a custom data type called *Review* which includes a number field where users give a score between 1-10.

As the user keeps adding reviews, we want to save their *average* score on their profile. Let's see how expressions can do that.

<figure><img src="/files/dyY6cGKJ7NmtlmfDUjyE" alt=""><figcaption></figcaption></figure>

1. We have workflow that makes changes to the current user, and we've set it to make a change in a field called *Average score*
2. We then add the data source *Search for users* and we add a constraint that the Review must have been created by the data source *This user*.
3. We add the operator *each item's Score* which changes the result from a list of Reviews to a list of numbers (the score from each review)
4. Lastly, we add the *average* operator, which takes a list of numbers and calculates the mean value. The data type in the end is a *number* which is what the *Average score* field on the user expects

In a humanly readable sentence, we are saying:

{% code overflow="wrap" %}

```
Save the average score to the user by searching for all the users review and calculating the mean
```

{% endcode %}

#### Example 3: creating a date range from two date values

A date range is a piece of data that provides a range between to datetimes[^12] by storing a start and end. They simplify the process of determining if a datetime falls within a specific range, among other uses.

Let's say we have system where users can pick a start and end date for a vacation, and we want to turn that into a date range and store it in a [custom state](#user-content-fn-13)[^13].

We'll use the value of the two date pickers as the data sources, and combine them using the < - range - > operator.

<figure><img src="/files/qlY8pR7xxRmgd7HOX5bs" alt=""><figcaption><p>Click the image to enlarge.</p></figcaption></figure>

1. The first field is the *element* where we store the custom state – in this case we chose the page itself (index)
2. Then we choose the custom state. We created one and named it *Date range*.
3. Then we generate the date range by using the < - range - > operator.

## Checking the value of an expression step

Every expression consists of steps, and each of those steps return a value. Each of those values will be of a specific type, such as a yes/no, a number, a text or a custom data type.

In complex expressions, it can be challenging to keep track of what kind of value is returned by each step. To see the type of data, simply hover the step with the mouse pointer:

<figure><img src="/files/MoP24KyexdFEvub2Td4u" alt=""><figcaption><p>Hovering a step in an expression will reveal the type of data that step returns.</p></figcaption></figure>

## Copy/pasting expressions

There are two ways in which you can copy and paste expressions:

### Copy one expression

The first way is to copy a single expression. To do that, right-click the expression and pick *Copy expression.*

<figure><img src="/files/mXhVAJAqN6JsvansJxis" alt=""><figcaption></figcaption></figure>

Note that to paste expressions, you need to right-click an area that accepts an expression. You may need to click the *Insert dynamic data* link.

<figure><img src="/files/RE59a4RgCJX5eeK7xtIp" alt=""><figcaption></figcaption></figure>

### Copy all content in a field

If you want to copy not just one expression, but all content of a field, you can right-click outside of the expression but still inside the input field. Note that this will copy both the expression and regular text:

<figure><img src="/files/13lUr9BQ3DiTuZWZZkcL" alt=""><figcaption></figcaption></figure>

To paste it, you need to click inside of a field that accepts it, but not on an expression.

## How expressions are processed

Dynamic expressions are evaluated from left to right, which means that the system reads each part of the expression in order, one at a time, starting from the leftmost component and moving towards the right. This is different from the mathematical convention used in many other programming languages, which evaluates expressions based on the order of operations, such as parentheses, exponents, multiplication and division, and addition and subtraction.

This left-to-right evaluation order can sometimes lead to unexpected results if you are used to other programming languages, so it's important to keep in mind when writing expressions in Bubble. However, it can also make expressions easier to read and understand, since they are evaluated in a more intuitive way that matches the way we typically think about expressions in everyday language.

## Parentheses in dynamic expressions

You can enable expression parentheses in *Settings – General – Advanced Options*. Parentheses expression parentheses automatically show you the order of operations in your dynamic expressions by adding parentheses around them. You can read more about this in the article section below:

Article section: [Settings tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab) | [Show parentheses in dynamic expressions in editor](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/settings-tab/overview#show-parentheses-in-dynamic-expressions-in-editor)

## Display names in dynamic expressions

{% hint style="info" %}
This feature is only available in the new property editor.
{% endhint %}

Certain parts of an expression can be named, so that they are easier to recognize and read. For example, a `Do a search for`, searching for users where `admin = yes`, can be named "All admin users", or a *`Find & replace`* can be named "Remove commas".

Display names can be set on:

* Do a search for
* Arbitrary text
* Arbitrary date
* Find & replace

[^1]: Bubble lets you set up flexible database searches and narrow down the results by applying dynamic constraints.\
    \
    Database searches are made using the *Do a search for* data source.\
    \
    Article: [Finding data in the database](/help-guides/data/the-database/finding-data)\
    Reference: [Do a search for](/core-resources/data/data-sources#do-a-search-for)

[^2]: Using the *current user* data source you can automatically fetch the data saved on the user currently using the app.\
    \
    Article: [Users](/help-guides/data/user-accounts)\
    Reference: [The Current User data source](/core-resources/data/data-sources#current-user)

[^3]: Option sets let you set up different types of static options in a database-like structure, but without using the database.\
    \
    This is useful to store information like days of the week, marital status, colors, states, countries and other data that you want to load quickly and that's rarely updated.\
    \
    Article: [Option sets](/help-guides/data/static-data/option-sets)

[^4]: An API call in this context means to send a request to an external application to get data back. For example, you could send a request to a Weather API service to get updated weather information back.\
    \
    Outgoing API calls are made with the API Connector.\
    \
    Article series: [APIs](/help-guides/integrations/api)\
    Article: [The API Connector](/help-guides/integrations/api/the-api-connector)

[^5]: You can use the *Current geographic position* data source to get an accurate reading of the user's current location, formatted as a Google Maps address.\
    \
    Note that in most browsers this requires a permission from the user and should not be considered a reliable way to track the location of all users.\
    \
    Reference: [The Current geograchic position data source](/core-resources/data/data-sources#current-geographic-position)

[^6]: Dates and times in Bubble are not stored separately, but always in a value that contains both, such as Jan 1 1970 12 am.\
    \
    You can choose to display a date or a time in isolation, at which time the datetime will change format to a text string.\
    \
    Article section: [How Bubble handles dates and time](/help-guides/design/elements/web-app/input-forms/dates-and-time#how-bubble-handles-dates-and-time)

[^7]: A date range is a data format that holds the range between two dates by storing a start date and an end date.

    Reference: [Date range operators and comparisons](/core-resources/data/operations-and-comparisons#date-range-type)

[^8]: *Elements* are the objects that you place on the page as you design your app. There are many different types of elements, like texts, buttons, input fields and calendars.\
    \
    Article: [Elements](/help-guides/design/elements)

[^9]: The *Date/time picker* element is a Bubble-native input form that lets users select a date and optionally a time from a calendar interface.\
    \
    Article series: [Input forms](/help-guides/design/elements/web-app/input-forms)\
    Article: [Dates and time elements](/help-guides/design/elements/web-app/input-forms/dates-and-time)

[^10]: A *repeating group* is a container element used to display a list of things. For example, you can use to show a list of users, products or blog posts.\
    \
    It works by designing one group, and then that group is multiplied by the number of entries in the list.

    Article: [Repeating groups](/help-guides/design/elements/web-app/containers/repeating-groups)

[^11]: Intersect with is an operator that takes two lists of things and returns the entries that are in both lists.\
    \
    Reference: [Intersect with](https://manual.bubble.io/help-guides/logic/pages/-MTpydODwo34mk5NucJy#...-intersect-with-...)

[^12]: Bubble always stores a date *and* a time, and we refer to it as datetime for clarity.\
    \
    Whenever you work with a date or a time in Bubble, keep in mind the value contains both.

    Article section: [How Bubble handles dates and time](/help-guides/design/elements/web-app/input-forms/dates-and-time#how-bubble-handles-dates-and-time)

[^13]: Custom states are variables that you can save on any element on the page, including the page itself. They let you store data temporarily that is reset when the page is reloaded.

    Article: [Custom states](/help-guides/data/temporary-data/custom-states)\
    Reference: [Setting custom states](/core-resources/actions/element#custom-state)
