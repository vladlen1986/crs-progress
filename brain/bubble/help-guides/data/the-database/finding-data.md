# Finding data
> Source: https://manual.bubble.io/help-guides/data/the-database/finding-data · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how to search for data using constraints

{% hint style="info" %}
This section takes a long-form look at how searches in Bubble work.\
\
To see the the more concise and technical complete list of settings, constraints and operators, you can check out our [core reference entry on searches](/core-resources/data/search).
{% endhint %}

Having added and updated data in our database, we'll also need a way search for that data and display it around our app.

## Finding data

Whenever you need to find some data in the database, you can perform a search using the *Do a search for* [data source](#user-content-fn-1)[^1]. This lets you set up a dynamic query to the database with specific constraints, and Bubble returns all things of that data type that match the constraints. You can only search for one data type at a time, such as *Users.*

Let's say you want to search for all users who have the name John. We can set up the *Do a search for* function like the example below.

{% hint style="info" %}
Data sources like *Do a search for* are one of the building blocks in **dynamic expressions.** To read more about how to work with expressions, check out our dedicated article on the subject:\
\
Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)
{% endhint %}

First, we set the Type of content to *User* and in the *Data source* dropdown we pick *Do a search for:*

<figure><img src="/files/TvGj1ib8FfLYpEVmZPkv" alt=""><figcaption></figcaption></figure>

Then we set up a *constraint* which instructs Bubble to only return users that have the name John. The result will always be a list, even if it contains just one thing.

<figure><img src="/files/27ENsjLinrp7R1qjNRrH" alt=""><figcaption><p>In this example we are searching for users named John.</p></figcaption></figure>

This is the basic way that database queries work: we tell Bubble what kind of data to search for, and then provide one or more constraints that each thing in the returned list needs to match. We can use this logic to find data in all sorts of scenarios:

* To display the results on a screen
* As part of a workflow (for example if we want to make changes to one or more things)
* As part of a [conditional expression](#user-content-fn-2)[^2]

In the example above, we used a static value as a constraint: the name John. We can also set this up as a *dynamic* value. For example, we could change the condition to ask for the value of an input field instead. This would let your users type in a name and search the database for users that match:

<figure><img src="/files/tyFQ7aFW2cyFkM6bOr7p" alt=""><figcaption><p>In this example we are searching for a dynamic value from an input field called <em>Input search by name</em>. By referring to that value as a search, we can let our users specify what to search for.</p></figcaption></figure>

{% hint style="info" %}
Element data sources using *Do a search for* are synchronised with the database in real-time. This means that any changes happening in the database, even if made by another user, will be immediately visible in your app.

There's no need to manually update searches. The exception is if the initial search was fetched in a workflow.
{% endhint %}

## Sorting the results

Sometimes you'll want to sort the result in a specific way, such as showing users in alphabetical order or tasks by their priority or deadline. This can be used to display the records in a list, or it can be used to find a specific record. For example, if you want to load the *last* user that was created in your database, you can sort the list by creation date and isolate the newest user with the *first item* or *last item* operator (depending on the sorting order).

You can set the sort order when you perform a search.

<figure><img src="/files/bCnGvya0dOo8AB8WOKpA" alt=""><figcaption><p>In this screenshot we are sorting users by their name.</p></figcaption></figure>

In some cases you will be referring to a list that's *not* loaded from a search, or where for some reason you need to apply the sorting *after* another operator in the expression. In that case you can use the *sorted* operator.

<figure><img src="/files/8FLKHxEnlYBrRZQdiUGk" alt=""><figcaption><p>In this example we are using another repeating group as the data source and then applying sorting on that list.</p></figcaption></figure>

## The difference between a *list* and a single thing

Bubble has two ways of handling database records: as single items or as a list. It's important to understand this distinction, because the two are treated differently. For example, when you [load data into container elements](#user-content-fn-3)[^3], a [*group*](/help-guides/design/elements/web-app/containers/groups) element will expect a single thing, while a [*repeating group*](/help-guides/design/elements/web-app/containers/repeating-groups) will expect a list of things.

Whenever you perform a search, the result will be a list – even if it only returns one thing (meaning it's a list with a count of one, but still a list).

### Loading a single record from a list

Whenever you set up a data source that returns a list, such as *Do a search for*, Bubble elements[^4] and expression operators[^5] that expect a *single* item will return an error in the [issue tracker](#user-content-fn-6)[^6]. In cases like this, you will need to instruct Bubble to load *one* of the records in the list. You do this by adding another operator in the data source expression:

* **First item** will return the first item in the list. What item that will be depends on how the list is sorted. The default sorting is by creation date.
* **Last item** will return the last item in the list. What item that will be depends on how the list is sorted. The default sorting is by creation date.
* **Random item** will return a pseudorandom[^7] item from the list.
* **Item #:** will return a single item as specified by its index number in the list. This operator requires you to also define a number, such as *Item 5*.

By combining search constraints with the *first item* operator you can often reach the exact thing you were looking for. For example, you could search for *users* and use the Email field as a constraint. Since emails are unique, you can be sure to find the right record by providing the email address of an existing user. If you then apply the *first item* to the list of results, you will have turned the list into a single thing.

### Turning a single record into a list

Sometimes you'll need to go the other way and turn a single item into a list, even if that list still only contains the one record. To do this, use the [*Converted to list*](#user-content-fn-8)[^8] operator.

<figure><img src="/files/8fBX9rReV3wdtfkSuREm" alt=""><figcaption><p>In this example we are taking the <em>User</em> loaded into a group called <em>Group User</em> and turning it into a list. The list will still contain just one record, but Bubble will treat it as a last. In the example this makes it a valid data source for a repeating group.</p></figcaption></figure>

## Other data sources

Searching for data in the database with *Do a search for* is one way of finding data.

| Data source            | Description                                                                         | Returns                                         |
| ---------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------- |
| Do a search for        | Searches the database using constraints.                                            | A list of things                                |
| Current user           | The user currently using the app                                                    | One thing                                       |
| Current page thing     | The database record currently loaded onto the page using the *Go to page* action.   | One thing                                       |
| Get data from page URL | Getting a thing from a URL parameter that contains a unique ID.                     | One thing                                       |
| Things's X             | Getting a thing from a field saved on another thing, such as Current User's Company | A list or a single item, depending on the field |

## Other ways to learn

<details>

<summary><mark style="color:blue;">Core reference</mark></summary>

* [Searching](/core-resources/data/search)

</details>

<details>

<summary><mark style="color:blue;">Video lessons</mark></summary>

* [How to use search constraints](https://youtu.be/gOjGDCJrXYI)
* [How to use the *Do a search for* data source](https://www.youtube.com/watch?v=-2_3kuyOxkw)

</details>

[^1]: A *data source* the part of an expression that makes up the source from which Bubble will pull the data.\
    \
    In this context, the data source is a databse search. It could also load the data saved on the current user by using the *current user* data source.

    In an expression, the data source can (but doesn't have to) be followed by an *operator*. For example, if you search for users and want to return the first item in the list of results, you can use the *first item* operator:\
    \
    Do a search for users:first item.

    In this case, the *Do a search for* is the data source and the *first item* is the operator.

[^2]: A conditional expression is a way to ask Bubble a question that returns either a true or false value. We can then use the response to in some kind of logic, such as to change the formatting of an element or determine whether a workflow should run or not.\
    \
    In the context of database searches, we could for example set up an expression that checks whether there is already a user named John by searching for it and counting the results. If the result is bigger than 0, Bubble returns a yes.

[^3]: Container elements such as group can have a database thing loaded into them. This way, each child element can reference that data to display data, auto-bind input elements and in workflows.\
    \
    Article: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)\
    Article section: [Loading data into containers](/help-guides/design/elements/web-app/containers#loading-data-into-containers)

[^4]: *Elements* are all the things that you place on the page, such as containers, input forms and visual elements like icons and images.\
    \
    Article series: [Elements](/help-guides/design/elements)

[^5]: An *operator* is any step that you add to an expression after the data source.

    \
    For example, if you have a list of things, and you want to return the *first* item in that list, the expression might look like this:\
    \
    \&#xNAN;*Do a search for:first item*.

    In this example the *Do a search for* is the data source and the *first item* an operator.

[^6]: The issue tracker is the counter in the upper right part of the screen in the Bubble editor. Whenever there is one or more issue with your app it will show a red text and the number of issues.

[^7]: *Pseudorandomness* means that the generated number appears to be random, but is actually produced by a deterministic system.\
    \
    To your users it makes no noticeable difference, but it means that the number is not cryptographically secure.

[^8]: The *Converted to list* is an operator that you can add to a data source in an expression. It will turn a single database record into a list containing that record.\
    \
    Reference: [The converted to list operator](https://manual.bubble.io/help-guides/data/the-database/pages/-MTpydODwo34mk5NucJy#...-converted-to-list)
