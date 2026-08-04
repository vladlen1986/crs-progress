# Repeating group element (web)
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/containers/repeating-groups · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

This section covers the container type repeating group, used to display lists of things such as records from the database

A repeating group is a container used to display a list of items, such as records from your database. It works by repeating the same set of elements once for each item in the list, making it easy to build lists, grids, and card layouts without writing code.

Repeating groups are one of the most powerful tools in Bubble. Almost any interface that shows more than one thing at a time, from feeds to product catalogs to search results, is built using them.

{% hint style="info" %}
To show a list of things, you can also use the **table element**. You can read more about the table element and how it's different from a repeating group in the article below:

Article: [The table element](/help-guides/design/elements/web-app/containers/table-elements)\
Article section: [The difference between repeating groups and tables](/help-guides/design/elements/web-app/containers/table-elements#the-difference-between-repeating-groups-and-tables)
{% endhint %}

## What repeating groups do

At the most basic level, a repeating group takes a list of things and repeats its child elements once for each item. For example, if you show a list of five blog posts, everything you add to the repeating group is duplicated five times, once per post.

<figure><img src="/files/RTbHwEcsFALqHQ1DaQh8" alt="Repeating group showing a list of blog posts."><figcaption><p>A repeating group is used to show a list of something, such as these blog posts.</p></figcaption></figure>

Each of these repetitions is called a **cell**. A cell holds all the child elements and represents a single item from the list. Text elements can display data from that item, buttons can trigger actions on it, and containers can be styled to give each cell its own look.

Repeating groups work similarly to regular groups: you set a *Type of content*, provide a *Data source*, and the elements inside can reference the data. The difference is that a regular group holds one item, while a repeating group holds many.

## Referencing data in a cell

Because each cell represents a different item in the list, referencing data inside a cell uses the *Current cell* expression. If the *Type of content* is *Post*, you'd reference `Current cell's Post's Title` to show the post's title.

This pattern lets Bubble automatically insert the right data into each cell without you having to configure them individually. One text element inside the repeating group displays all the names in the list, one per cell.

## Common designs

Repeating groups are flexible enough to build almost any list-based interface. Here are three of the most common patterns.

### Simple lists

The most basic use of a repeating group is a straightforward list, such as a contact list, a task list, or a search result list. Each cell displays a few pieces of information, usually as text.

To build one:

1. Set the [*Type of content*](#user-content-fn-1)[^1] to the data type you want to display, such as `Post`.
2. Set the [*Data source*](#user-content-fn-2)[^2] using an expression like `Do a search for Posts`.
3. Add text elements inside the cell and reference the data with expressions[^3] like `Current cell's Post's Title`.

The result is a clean list that updates automatically when the underlying data changes.

### Card layouts

The same repeating group can be used to display richer content, like product cards or dashboard tiles.

To build a card layout, place a regular group inside the cell of the repeating group. Style that inner group with a background color, border radius, and shadow to give it the look of a card. Inside the card, add elements like images, text, and buttons.

<figure><img src="/files/cxgatA0zdKBpCXLQVqeS" alt=""><figcaption><p>By combining the repeating group with child containers and elements, you can set up card designs.</p></figcaption></figure>

Each element inside the card references its parent group's data (the current item), and the parent group references the current cell of the repeating group. This lets you design complex, styled cards that populate automatically for each item in the list.

For example, a product catalog might use cards that show a product image, name, price, and an *Add to cart* button, all inside a single card group that repeats once per product.

### Masonry grids

Repeating groups can also display items in a masonry layout, where cells have varying heights and pack together automatically. This is useful for image galleries, blog previews, or any content where items naturally have different sizes.

{% embed url="<https://demo.arcade.software/hVybqmgzGgm6oMMX93c2?embed>" %}

To set up a masonry layout:

1. Make sure the page uses the responsive engine.
2. Open the repeating group's property editor and uncheck both *Set fixed number of rows* and *Stretch rows to fill vertical space*.
3. Set *Scroll direction* to *Vertical*.
4. Check *Display items as masonry grid*.

<figure><img src="/files/GI425dMsOf0VCXlBdjsE" alt=""><figcaption><p>Enabling <em>Display items as a masonry grid</em> lets you show items in the repeating group at dynamic sizes that adjust automatically to any screen size.</p></figcaption></figure>

You can control the spacing between cells using the *Row cell gap* and *Column cell gap* settings.

## Loading data into a repeating group

There are two main ways to load data into a repeating group:

### Set the data source directly

{% hint style="info" %}
Repeating groups require a **list** as their data source, unlike most other containers, which work with a single item.
{% endhint %}

The list loads as soon as the page loads, using an expression like `Do a search for Users`. This is useful when the data is known in advance.

<figure><img src="/files/CAjdc716ZjqhZj9QN84k" alt="Loading content into a repeating group by setting a data source."><figcaption><p>You can load a list into a repeating group by using a data source such as <a href="/pages/-MShSvpeDGq5TEeTupJf#do-a-search-for"><em>Do a search for.</em></a></p></figcaption></figure>

### Push data with a workflow

Use the [*Display list in a repeating group or table*](/core-resources/bubble-workflows/bubble-actions/element-actions#display-list-in-a-repeating-group-or-table) action to load a list in response to a user action, such as clicking a filter or performing a search. This is useful when the data depends on something the user does.

<figure><img src="/files/RhinWV5Gwl38V4oaL9JB" alt=""><figcaption><p>You can also load a list into a repeating group using the <a href="/pages/jBFRRz2u1brrkN2NclGa#display-list-in-a-repeating-group-or-table"><em>Display list in a repeating group</em></a> action.</p></figcaption></figure>

## Layout and scrolling

Repeating groups give you a lot of flexibility in how they arrange and display their cells. By combining a few key properties, you can build everything from short, contained lists to long, infinite feeds and horizontally scrolling carousels.

The main levers to play with are:

* **Rows**, which controls how many rows the repeating group shows at a time.
* **Columns**, which controls how cells are arranged horizontally.
* **Scroll direction**, which controls whether the repeating group scrolls vertically or horizontally, or wraps to the next row.
* **Display items as masonry grid**, which enables a dynamic, packed layout with variable cell heights.

The way you combine these determines the character of the list.

#### **Fitting the list to its content**

Setting *Rows* to *Fit to content* makes the repeating group grow to show every row it contains, with no internal scrolling. The page itself scrolls if the list is long enough to run off the screen. This works well for lists where you want the entire list visible at once, or where the surrounding page layout should adjust to the size of the list.

#### **Filling the container**

Setting *Rows* to *Fill container* makes the repeating group take up all the vertical space available inside its parent, and adds internal scrolling when the list is longer than the visible area. This is useful when the repeating group sits inside a fixed-height section, like a sidebar or a card, and you want the list to scroll within that space without affecting the rest of the page.

#### **Setting a fixed number of rows**

Setting *Rows* to *Fixed number* shows a specific number of rows at a time, regardless of how many items are in the list. This is the foundation for paginated interfaces, where users click through pages of results. The *Show next*, *Show previous*, and *Go to page* actions let you build controls that navigate between pages.

#### **Building grids**

The *Columns* setting controls how many cells sit side by side in each row. Combining a multi-column layout with *Fit to content* is a common pattern for grid-based designs, like a product catalog or an image gallery. Combining columns with *Fill container* creates a grid that fills the available space and scrolls internally.

#### **Horizontal scrolling**

Setting *Scroll direction* to *Horizontal* turns the repeating group into a row that scrolls sideways. This works well for carousels, thumbnail rows, and featured content sections. Horizontal repeating groups typically use a single row with multiple columns, and their width is limited by the parent container.

#### **Masonry layouts**

Enabling *Display items as masonry grid* creates a packed grid where cells have varying heights and fit together automatically. This is ideal for image galleries, blog previews, or any layout where content naturally comes in different sizes. Masonry layouts require the responsive engine and work only with vertical scrolling.

#### **Mixing and matching**

Most real-world designs come from combining these settings in specific ways:

* A social feed: *Rows* set to *Fit to content*, one column, vertical scrolling.
* A product grid: *Rows* set to *Fit to content*, multiple columns, vertical scrolling.
* A dashboard sidebar list: *Rows* set to *Fill container*, one column, vertical scrolling.
* A featured content carousel: *Rows* set to a fixed number, multiple columns, horizontal scrolling.
* A photo gallery: masonry grid enabled, multiple columns, vertical scrolling.

Experimenting with these combinations is the fastest way to get a feel for what each setting does.

### FAQ: Repeating groups

<details>

<summary>How many items can a repeating group display?</summary>

There's no strict limit, but very large lists can affect performance. For long lists, use extended vertical scrolling to load items progressively, or apply constraints to the search to limit how much data is returned.

</details>

<details>

<summary>Can I sort or filter the items in a repeating group?</summary>

Yes. When using *Do a search for* as the data source, you can add constraints and sorting rules directly in the search. You can also chain operators like `:sorted by` or `:filtered` to control the order and contents of the list.

</details>

<details>

<summary>What's the difference between a repeating group and a table?</summary>

Both display lists, but tables are designed for structured, column-based data, while repeating groups offer more layout flexibility. Repeating groups are better suited to cards, feeds, and mixed-content lists.

</details>

<details>

<summary>Can I nest a repeating group inside another repeating group?</summary>

Yes, but it comes with a performance cost. Each parent cell runs its own data query for the nested repeating group, which can consume significant workload even with small lists. Use nesting carefully.

</details>

<details>

<summary>How do I reference the item in a cell?</summary>

Use the *Current cell* expression. For example, if the *Type of content* is *User*, `Current cell's User's name` references the name of the user in that specific cell.

</details>

<details>

<summary>Can I make the cells clickable?</summary>

Yes. Add a workflow triggered by a click on any element inside the cell.

</details>

<details>

<summary>What happens if the list is empty?</summary>

The repeating group renders no cells and takes up no space. You can use conditions to show a placeholder message or graphic when the list is empty.

</details>

<details>

<summary>Can I display a list without loading it from the database?</summary>

Yes. The data source can be any expression that returns a list, such as a list stored in a [custom state](/help-guides/data/temporary-data/custom-states), a list returned by an [API call](/help-guides/integrations/api/the-api-connector), or options from an [option set](/help-guides/data/static-data/option-sets).

</details>

<details>

<summary>Can I paginate a repeating group?</summary>

Yes. Set *Rows* to *Fixed number* to show a set number of items at a time, and use the *Show next*, *Show previous*, and *Go to page* actions to control navigation between pages.

</details>

<details>

<summary>How do I find the position of an item in the list?</summary>

Use `Current cell's index` to reference the position of the item within the repeating group. Bubble uses 1-indexing, so the first cell is index 1.

To find the index of a specific record (as opposed to a specific cell), you can use the :`index of` operator.

</details>

<details>

<summary>Can I update the list without reloading the page?</summary>

Yes. Use the *Display list in a repeating group* action to load a new list based on user actions, or update the data source dynamically through workflows. The list refreshes automatically without a page reload.

</details>

<details>

<summary>Are repeating groups available in native mobile apps?</summary>

No. Repeating groups are web-only. For native mobile apps, use other alternative list elements.

</details>

## Other ways to learn

<details>

<summary><mark style="color:blue;">Core reference:</mark> Repeating group properties</summary>

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

[^1]: The **Type of content** property tells Bubble what kind of data the repeating group will hold, such as `User` or `Post`. This determines what data source it accepts and what child elements can reference through `Current cell`.

[^2]: A **data source** is any source your app pulls data from, such as a database search, a specific record, an option set, or an external API.

    **Core reference:** [Data sources](/core-resources/data/data-sources)

[^3]: **Dynamic expressions** are how you reference and manipulate data in Bubble. They let you pull values from data sources, apply operators, and combine data in different ways to produce a final result, such as `Current User's name` or `Do a search for Posts:count`.

    **Article:** [Dynamic expressions](/help-guides/logic/dynamic-expressions)
