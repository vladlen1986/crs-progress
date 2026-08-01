# Table elements
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/containers/table-elements · Captured: 2026-07-21 (verbatim from manual.bubble.io llms-full.txt)

This section covers the table element, used to display lists of things such as records from the database in a table-like structure of rows and columns

{% hint style="warning" %}
The Table element requires:

* that you are using [Bubble version 21+](#user-content-fn-1)[^1]
* that the page is set to use the [responsive engine](#user-content-fn-2)[^2]
  {% endhint %}

{% hint style="info" %}
To show a list of things, you can also use the repeating group element. You can read more about the repeating group element and how it's different from a table element in the article below:

Article: [Repeating groups](/help-guides/design/elements/web-app/containers/repeating-groups)\
Article section: [The difference between repeating groups and tables](#the-difference-between-repeating-groups-and-tables)
{% endhint %}

The table element is a container[^3] used to display a list of items in a structured, column-based layout. Like a [repeating group](/help-guides/design/elements/web-app/containers/repeating-groups), it repeats its content once for each entry in a list. Unlike a repeating group, it's designed specifically for tabular data, with rows, columns, and features like [sticky headers](#repeating-rows) built in.

<figure><img src="/files/oZgcemgt41CAw2fzOTci" alt="Table element displaying a list of users."><figcaption><p>Using the table element, you can set up lists in a structured, column-like layout.</p></figcaption></figure>

Tables are especially useful for interfaces where data is naturally organized in columns, such as user lists, product catalogs, financial reports, or admin dashboards.

## When to use a table vs. a repeating group

Tables and [repeating groups](/help-guides/design/elements/web-app/containers/repeating-groups) share a lot of behavior. Both are containers that display a list of items by repeating their content for each entry. The difference comes down to how the content is arranged.

**Use a table when:**

* The data has a clear column structure.
* You want column headers that stay in place as users scroll.
* You need to keep row content aligned across columns automatically.
* The layout is closer to a spreadsheet or data grid than a card feed.

**Use a repeating group when:**

* The design is flexible and doesn't fit neatly into rows and columns.
* Cards, masonry grids, or media-rich lists suit your content better.
* You want more freedom over how each cell is laid out.

## Static and repeating rows

Tables are made up of two kinds of rows:

### Static rows

Static rows aren't tied to the data source. Elements placed inside them appear exactly once. Static rows are typically used for column headers, but they can also hold summary rows, filters, or any content that shouldn't repeat with the list.&#x20;

<figure><img src="/files/JZqie3S25Th6zZhagzG4" alt="The static row of a table element."><figcaption><p>Static rows are useful for non-dynamic content, such as column headers.</p></figcaption></figure>

You can [add multiple static rows](#add-columns-and-rows) if needed.

### Repeating rows

Repeating rows are where the list data lives. They work the same way as a repeating group cell: the content of the first repeating row is duplicated once for each entry in the data source. You only ever edit the top repeating row, and the rest follow along automatically.

<figure><img src="/files/fc3qEZH1geaPiD7pttNn" alt="The repeating row of a table element."><figcaption><p>The repeating row is displayed in the editor with a ∞ symbol. Its content is duplicated for each entry in the table's data source.</p></figcaption></figure>

This split is what makes tables so well suited to structured data. Column headers stay put, and the data below them updates automatically as the list changes.

<figure><img src="/files/wKpU4wMnOC8GDkx9XWst" alt="The element property editor highlighting the &#x22;make sticky&#x22; feature."><figcaption><p>With the <em>Make sticky</em> property, the table's column headers stay in view while the user scrolls.</p></figcaption></figure>

Static rows can also be made sticky, so they stay in view as users scroll through long lists. This is what enables the classic "sticky header" pattern common in data grids and dashboards.

## Building a table

When you draw a table on the page, Bubble creates one with three columns and four rows by default, with the top row set as static. From there, you build the table in a few steps.

### **Load the data**

{% hint style="info" %}
Tables require a **list** as their data source, unlike most other containers, which work with a single item.
{% endhint %}

#### **Set the data source directly**

Click the table itself, either by clicking the icon in its top-left corner or selecting it in the element tree. In the property editor, set:

* [**Type of content**](#user-content-fn-4)[^4]**:** the data type the table will hold, such as `User` or `Post`.
* [***Data source***](#user-content-fn-5)[^5]***:*** the expression[^6] that returns the list, such as `Do a search for Users`.

<figure><img src="/files/vAtoPRR8CROkSQaasDn0" alt="The data source of a table element in the property editor."><figcaption><p>The <a href="/pages/-MShSvpeDGq5TEeTupJf#do-a-search-for"><em>Do a search for</em></a> data source populates the table with a list of users.</p></figcaption></figure>

Once the data source is set, the repeating rows below the static row will populate with the list.

#### Push data with a workflow

Use the [*Display list in a repeating group or table*](/core-resources/bubble-workflows/bubble-actions/element-actions#display-list-in-a-repeating-group-or-table) action to load a list in response to a user action, such as clicking a filter or performing a search. This is useful when the data depends on something the user does.

<figure><img src="/files/Wn5JL2krVXSaC4CDncee" alt=""><figcaption></figcaption></figure>

### **Add content to the rows**

Click into the cells of the static row to add column headers, usually as text elements. Then click into the first repeating row to add the content that will appear in each row of data. Reference the list item with `Current cell's [Type]'s [field]`, such as `Current cell's User's name`.

### **Add columns and rows**

You can add or remove columns and rows as your design evolves:

* **Add a column** by right-clicking a column and selecting *Add column to left* or *Add column to right*, or by hovering between two columns and clicking the plus icon that appears.
* **Add a static row** by right-clicking an existing row and selecting *Add row above* or *Add row below*.
* **Remove a column** by right-clicking it and selecting *Delete*, or by clicking the X above its column handle.
* **Remove a row** by right-clicking it and selecting *Delete*.

You can't delete the last remaining column, since a table must have at least one.

Repeating rows work differently: they aren't added individually. Instead, the number of rows is controlled by the data. If *Set fixed number of repeating rows* is checked, you specify the row count directly. If it isn't, Bubble displays as many rows as there are items in the data source.

## Working with rows, columns, and cells

The table element behaves a little differently from other containers, since rows, columns, and cells are all selectable pseudo-elements with their own properties. You can select elements in the element tree, or by using the methods below.

### The whole table

Click the icon in the top-left corner of the table to select the entire element. From here, you can set the *Type of content*, *Data source*, styling, layout, and conditions for the table as a whole. The element tree also lists the table with all its rows and columns as children.

<figure><img src="/files/vrux3OcttnRYjRqlvPOq" alt="Selecting a table element by clicking its handle."><figcaption><p>Clicking the handle in the top-left corner selects the entire table and opens its properties in the property editor.</p></figcaption></figure>

### Rows

Click a row's numbered handle to select it and manage its [properties](/core-resources/bubble-elements/element-properties/web-element-properties/container-properties/table-element/table-row-column). For repeating rows, changes made to the top row apply to all rows below.

<figure><img src="/files/Hb0BK2u4HzTIfLV1MkYD" alt=""><figcaption><p>Clicking a row's numbered handle selects it and opens its properties in the property editor.</p></figcaption></figure>

### Columns

Click a column's lettered handle to select it and manage its [properties](/core-resources/bubble-elements/element-properties/web-element-properties/container-properties/table-element/table-row-column). Column changes affect the entire column across both static and repeating rows.

<figure><img src="/files/pzhX3AZfuKe4oisnHEN4" alt="Selecting a column in a table."><figcaption><p>Clicking a column's numbered handle selects it and opens its properties in the property editor.</p></figcaption></figure>

### Cells

Click directly on a cell to select it. Each cell has its own [properties](/core-resources/bubble-elements/element-properties/web-element-properties/container-properties/table-element/table-row-column/table-row-column-cell). Cells in static rows are edited individually, while cells in repeating rows are edited on the first row and repeat for all rows below.

<figure><img src="/files/2awO5KeVxmhVRdLbi2W9" alt="Selecting a cell in a table."><figcaption><p>Clicking an individual cell selects it and opens its properties in the property editor.</p></figcaption></figure>

### **Selecting multiple rows or columns**

Hold Shift while clicking to select multiple rows or columns at once, then apply properties to all of them at the same time. Note that not all properties can be changed in bulk.

## Orientation

By default, tables are oriented vertically, with rows stacked top-to-bottom. Setting the orientation to horizontal transposes rows and columns, so rows run left-to-right and columns stack vertically. This can be useful for comparison tables or layouts where categories run horizontally instead of vertically.

<figure><img src="/files/7zkhHFDiMCbfFbsfkyHq" alt="Table element with horizontal orientation."><figcaption><p>Setting the orientation to horizontal transposes rows and columns.</p></figcaption></figure>

## Responsive behavior

Tables handle responsive design a little differently from other containers. It helps to think of the table itself, and each of its rows and columns, as separate containers with their own responsive settings.

**Table size** is set on the table element as a whole. This defines the overall width and height, and constrains the size of the rows and columns unless the table is set to fit its content.

**Column width** is set at the column level. Changing a column's width affects every row in that column, both static and repeating.

**Row height** is set at the row level. For repeating rows, the height is controlled by the properties on the top repeating row.

**Cell layout** works like any other container. Each cell can use column, row, align, or fixed layout to control its child elements. Static row cells are edited individually, while repeating row cells are controlled by the top row.

## FAQ: Table element

<details>

<summary>Can I sort or filter the items in a table?</summary>

Yes. When using Do a search for as the data source, you can add constraints and sorting rules directly in the search, or chain operators like :sorted by and :filtered to control the order and contents of the list.

</details>

<details>

<summary>Can I have multiple static rows?</summary>

Yes. You can add multiple static rows.&#x20;

</details>

<details>

<summary>Can static rows be sticky when scrolling?</summary>

Yes. Static rows can be [set to remain in view](#static-rows) as users scroll through the list below, which is useful for keeping column headers visible in long tables.

</details>

<details>

<summary>How do I reference the item in a row?</summary>

Use the Current cell expression, just like in a repeating group. If the Type of content is Post, `Current cell's Post's title` references the title of the post in that row.

</details>

<details>

<summary>Can I make rows or cells clickable?</summary>

A static or repeated row can be set to clickable by using the [*An element is clicked*](/core-resources/bubble-workflows/bubble-events/frontend-event-properties/element-event-properties#an-element-is-clicked) action.

Columns and cells aren't clickable directly, but you can add a workflow triggered by a click on any child element. Reference `Current cell's [Type]` inside the workflow to act on that specific item.

</details>

<details>

<summary>How do I paginate a table?</summary>

Set the number of rows to *Fixed* and combine it with actions like [Show next page](/core-resources/bubble-workflows/bubble-actions/element-actions#show-next-page-of-a-repeating-group-or-table), [Show previous page](/core-resources/bubble-workflows/bubble-actions/element-actions#show-previous-page-of-a-repeating-group-or-table), and [Go to page](/core-resources/bubble-workflows/bubble-actions/element-actions#go-to-page-of-a-repeating-group-or-table) on the table.

</details>

<details>

<summary>What happens if the data source is empty?</summary>

The repeating rows disappear, leaving only the static rows visible. You can add a conditional to display a placeholder message in the table when the list is empty.

</details>

<details>

<summary>Can I nest tables inside other tables?</summary>

It's possible but not recommended. Nested lists come with a performance cost, since each parent row runs its own query for the nested content.

</details>

<details>

<summary>Are tables available in native mobile apps?</summary>

No. The table element is web-only.&#x20;

</details>

<details>

<summary>Can I export the data in a table?</summary>

The table itself doesn't include built-in export functionality, but the Download data as CSV action can export the data behind it. Use this to give users an export button that pulls from the same data source as the table.

</details>

## Other ways to learn

<details>

<summary><mark style="color:blue;">Core reference:</mark> Table element properties</summary>

In the core reference section, you'll find all the settings associated with table elements.

Reference: [Table elements](/core-resources/elements/containers#table-element)

</details>

[^1]: To ensure compatibility with existing apps, some updates from Bubble require manual enabling. Updates are applied to individual apps.

    \
    You can apply updates in *Settings - Versions*.

[^2]: Bubble updated its editor and page rendering engine to better support responsive design.\
    \
    You can read more about this in the article series below:\
    \
    Article series: [Responsive design](/help-guides/design/responsive-design)

[^3]: Containers are used to contain elements and control how they behave on the page.\
    \
    Article series: [Containers](/help-guides/design/elements/web-app/containers)

[^4]: The **Type of content** property tells Bubble what kind of data the repeating group will hold, such as `User` or `Post`. This determines what data source it accepts and what child elements can reference through `Current cell`.

[^5]: A **data source** is any source your app pulls data from, such as a database search, a specific record, an option set, or an external API.

    **Core reference:** [Data sources](/core-resources/data/data-sources)

[^6]: **Dynamic expressions** are how you reference and manipulate data in Bubble. They let you pull values from data sources, apply operators, and combine data in different ways to produce a final result, such as `Current User's name` or `Do a search for Posts:count`.

    **Article:** [Dynamic expressions](/help-guides/logic/dynamic-expressions)
