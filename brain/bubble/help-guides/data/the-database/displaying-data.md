# Displaying data
> Source: https://manual.bubble.io/help-guides/data/the-database/displaying-data · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how to display data from the database in your app

After your users submit information which becomes data, you can use page elements to display it.

Container elements don't *display* the data per se, but load the data so that all of its child elements can easily reference it. This lets you easily load a thing into a container, and then use that as a data source to display and let users make changes to the data.

Things are displayed either as a single instance (for example viewing the current user) or a list of things (such as a list of products, contacts or tasks). The info-boxes below provide more information about these two scenarios:

<details>

<summary>Displaying a single thing in a container</summary>

In order to display data, it's often useful to load that data into a container such as a group. You can read more about the different ways to do that in our article in our article on containers:\
\
Article: [Container elements](/help-guides/design/elements/web-app/containers#loading-data-into-containers)

</details>

<details>

<summary>Displaying multiple things in a list</summary>

Whenever Bubble returns a list of results, such as when using the [*Do a search for*](#user-content-fn-1)[^1] operator, you can display the results in a list. Lists can be designed flexibly and responsively just like other elements, meaning you can show the results in an Excel-like table, as cards or as a masonry grid or any other way you can think of in our responsive engine.

We cover displaying data in lists in our [article on Repeating Groups](/help-guides/design/elements/web-app/containers/repeating-groups).

</details>

## Displaying data using expressions

To display data in an element such as a text, we need to set up an expression that tells Bubble what data we want to display. The expression consists of a *data source* and optionally one or more *operators* that further instructs Bubble what to do with the data. In the example below, we're using *Do a search for* as the data source and then adding the *first item* operator to load the first entry in the list of results that the search returns:

<figure><img src="/files/ix08p0txV5QOubaq2xsI" alt=""><figcaption></figcaption></figure>

This loads the Product into the container element, in this case a group, but doesn't actually show anything to the user. To show some information, such as the name of the Product, we'll need to add another element inside of that group. We can then set up an expression on that element that refers to the thing loaded into the parent element:

<figure><img src="/files/nvyCqYdu83zZPybdUuKd" alt=""><figcaption><p>The <em>Parent group's product</em> is the data source in this expression, and the <em>Name</em> is the operator that tells Bubble which field on the Product data type we want to display.</p></figcaption></figure>

We could also set up the entire expression on the text element itself: *Do a search for Products:first item's Name* – but it would be cumbersome to do that for every element where we want to refer to that product.

By setting up a parent container and loading the data into it we speed things up and make sure that all elements inside refer to the same database thing.

The same logic can be applied to other things than text. We could for example set up an image element and load the correct Product image by again referring to the parent group's thing and the custom field *Image.*

<figure><img src="/files/5tJZiExKp784bTd8HxX1" alt=""><figcaption><p>In this example we are fetching an image URL from the database instead of text. The field on the data type is of type <em>image.</em></p></figcaption></figure>

By combining different element types and fields saved on a data type we can design our app to show info from the database in a way that our users hopefully find appealing.

<figure><img src="/files/cxgatA0zdKBpCXLQVqeS" alt=""><figcaption><p>In this example we are pulling the name, description, price and image for two different products from the database.</p></figcaption></figure>

## Displaying data using auto-bind

Auto-bind is used to automatically save changes to a thing whenever an input field changes, but it alse serves another purpose: it automatically loads the *existing* data into the field to which it's assigned. Let's say we didn't just want to display the name of the Product, we wanted users to be able to edit it.

By assigning a field that the element is auto-bound to, Bubble will automatically load any existing data from that field when the page is loaded:

<figure><img src="/files/9Keu2CFAoKxRttfC379t" alt=""><figcaption><p>By auto-binding the input element to the <em>Name</em> field on the Product, Bubble automatically loads any existing data into that field when the page loads.</p></figcaption></figure>

## Other ways to learn

<details>

<summary><mark style="color:blue;">Video lessons</mark></summary>

* [Instantly modify data with autobinding](https://youtu.be/MamNYJmZjVY)

</details>

[^1]: *Do a search for* is a data source that you can set up to search for records in your database. By providing constraints, you can narrow down searches to match specific criteria, and Bubble will return the results as a list.\
    \
    Article: [Finding data](/help-guides/data/the-database/finding-data)\
    Reference: [Search](/core-resources/data/search)
