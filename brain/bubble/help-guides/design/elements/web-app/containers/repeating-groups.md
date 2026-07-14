# Repeating groups
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/containers/repeating-groups · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers the container type repeating group, used to display lists of things such as records from the database

The repeating group is a container type used to show a list of things such as records from the database by repeating the content of the group one time for each entry.

{% hint style="info" %}
To show a list of things, you can also use the table element. You can read more about the table element and how it's different from a repeating group in the article below:

Article: [The table element](/help-guides/design/elements/web-app/containers/table-elements)\
Article section: [The difference between repeating groups and tables](/help-guides/design/elements/web-app/containers/table-elements#the-difference-between-repeating-groups-and-tables)
{% endhint %}

We explored in the earlier [general section about groups](/help-guides/design/elements/web-app/containers) that you can [load data into a group](/help-guides/design/elements/web-app/containers#loading-data-into-groups) and allow its child elements to reference that data. Repeating groups work much in the same way, except that they are set up to work with a *list* of data rather than a single record.

For example, let's say you want to display a list of users in your app and include information like their name and email address. By adding text elements to a repeating group showing that information, the content of the group will be duplicated for as many users are in the list. If the list contains five users, every element that you add to the Repeating Group will be repeated five times.

Let's explore a few different ways in which you can use repeating groups to set up flexible lists of data in creative ways:

## List design

In the example below there are some key things to note about how repeating groups work:

1. We have set the *Type of content* to User, meaning the repeating group will accept a list of users as its data source
2. In the *Data Source* we are using the *Do a search for* command to load a list of users
3. In the repeating group you can see that the text element inside is repeated once for each row. Each row is called a *cell*.
4. We can reference the user in each cell by including *Current Cell's X* in the expression. In the example below that makes it the *Current Cell's User* since our *Type of content* is set to user. From referencing the current user, we can fetch their first name.

<figure><img src="/files/yRJYHXMWptel8kYvQcan" alt=""><figcaption></figcaption></figure>

Let's see how that would look in the live app:

<figure><img src="/files/n88vGbWppUjuKp8Ga7bU" alt=""><figcaption><p>By referencing the <em>Current cell's User's Name</em> we can display information about the relevant user loaded into each cell.</p></figcaption></figure>

## Card design

As we saw in the previous example, repeating groups can be used to set up simple lists such as a list of contacts in a CRM[^1] or products in a product inventory system.

But they can also be used in powerful ways to set up lists that are designed in other ways such as product cards:

<figure><img src="/files/cxgatA0zdKBpCXLQVqeS" alt=""><figcaption><p>In this example we're showing a Repeating Group of two cells. Inside of those cells we're combining Regular Groups and other elements to create a design that's very different from the list we created earlier.</p></figcaption></figure>

In the illustration above, the white card with the shadow is a [regular group](/help-guides/design/elements/web-app/containers/groups) placed within the cell of the Repeating Group. We've styled it with a white background, rounded corners and a shadow and placed an image, a few text elements and a button to complete the design.

<figure><img src="/files/uqowJxxpx2WSKkZPY4mp" alt=""><figcaption><p>Looking at the elements in the Bubble Design Editor we can see that each element references the parent Group's data – the Product. The parent Group (the one with the shadow) in turn references the current cell of the Repeating Group.</p></figcaption></figure>

From a database perspective, the products we are looking at would include fields for Name (text), Price (number), Image (image) and Description (text) that we can then load and display for each cell of the Repeating Group.

<figure><img src="/files/njjuEweL54XU3upeWn7J" alt=""><figcaption><p>In this example we've set up a Data Type called Product and assigned a few fields that we can then show in the Repeating Group.</p></figcaption></figure>

## Masonry design

With Bubble's responsive engine, you can use Repeating Groups to set up a fully responsive masonry design.

<figure><img src="/files/GI425dMsOf0VCXlBdjsE" alt=""><figcaption><p>Using the <em>Display items as a masonry grid</em> you can show the items in the Repeating Group in a dynamic size that automatically adjusts to every screen size.</p></figcaption></figure>

Try our interactive tutorial below or scroll down for the text version.

{% embed url="<https://demo.arcade.software/hVybqmgzGgm6oMMX93c2?embed>" %}

To use the masonry design, you need to complete a few steps:

* The masonry layout requires that you use the [responsive engine](/help-guides/design/responsive-design).
* In the [Property Editor](#user-content-fn-2)[^2] for the Repeating Group, make sure you have both *Set fixed number of rows* and *Stretch rows to fill vertical space* unchecked:<br>

<figure><img src="/files/JlYbmCBf3908vhRP5598" alt=""><figcaption></figcaption></figure>

* Set *Scroll Direction* of the Repeating Group to *Vertical*.
* Check *Display items as masonry grid*

When the masonry grid settings have been set you can adjust the gap between each cell in pixels by changing the *Row cell gap* and *Column cell gap* settings.

## Other ways to learn

<details>

<summary><mark style="color:blue;">Core reference:</mark> repeating group settings</summary>

In the core reference section, you'll find all the settings associated with repeating groups.

Reference: [Repeating groups](/core-resources/elements/containers#repeating-group)

</details>

<details>

<summary><mark style="color:blue;">Video lessons and interactive demos</mark></summary>

We have multiple video lessons that cover different uses of Repeating Groups:

* [Creating your first Repeating Group](https://www.youtube.com/watch?v=e6oQU__8pmE)
* [How to create a full list Repeating Group](https://www.youtube.com/watch?v=X6aaew_twCA\&t=1s)
* [Using Repeating Group layout styles](https://www.youtube.com/watch?v=abMbztw-lmc)
* Horizontal and vertical scrolling Repeating Groups
  * [Vertical scrolling](https://www.youtube.com/watch?v=vcWUgBEQPCk) ↑↓
  * [Horizontal scrolling](https://www.youtube.com/watch?v=J6mvea8B1Wk) ←→
* [How to create a fixed Repeating Group](https://www.youtube.com/watch?v=h2EVLsL_inU)
* How to create a masonry grid layout using Repeating Groups
  * [Youtube video](https://www.youtube.com/watch?v=-asG45y04aI)
  * [Interactive demo](https://www.youtube.com/watch?v=-asG45y04aI)
* Searching for data
  * [How to set the type of data to search for](https://www.youtube.com/watch?v=MJPNaa1FvDE)
  * [How to use search constraints](https://www.youtube.com/watch?v=gOjGDCJrXYI)

</details>

[^1]: CRM is an abbreviation for Customer Relationship Management and is a category of applications used by companies to keep track of customers.

[^2]: The Property Editor is the floating window that lets you edit the settings of a given element.\
    \
    You display the Property Editor either by double-clicking the element in the design tab or clicking it once in the Element Tree.
