# Table elements
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/containers/table-elements · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

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

The table element is a [container type](#user-content-fn-3)[^3] used to show a list of things, such as records from the database, by repeating the content of the group one time for each entry, similar to Repeating Groups. The two elements differ in some basic ways, and as the name suggests, the table element has specific properties that make it well suited to creating neat tables.

<figure><img src="/files/CddPCx5rA5w9zjl8Pxe2" alt=""><figcaption><p>The table element lets you easily set up tables with sticky column headers.</p></figcaption></figure>

Let’s first have a look at how the repeating group and table elements are different:

### The difference between repeating groups and tables

These two element types share many characteristics and are edited in much the same way: Elements that you place inside one cell will be repeated for each record that is specified in the element’s [data source](#user-content-fn-4)[^4].

For example, if you load a list of the User data type into any of these elements and place a text element that references the *Current Cell’s User’s email address*, then each row will show the email address of that entry in the database.

The table element offers a few additional features that make tables even easier to set up and maintain:

* You can prevent one or more static rows at the top of the table from being affected by the element’s data source. This is useful for creating column headers.
* Static rows can be made sticky, meaning that they will remain at the top as you scroll through the records below
* You can add and delete rows and columns, making it easier to make changes to the overall table structure as needed
* Rows and columns can be copy/pasted
* Tables have columns that keep content perfectly aligned within rows

Repeating groups are your best choice when you want to set up flexible displays of list information, like simple lists, card designs, or masonry grids. Table elements are faster to work with when you want to set up classic table structures with rows/columns and labels.

## Using the table element

When you draw a table element on the page, a table will be created with three columns and four rows, with the top row being static.

### Static rows/columns

The top row in the automatically generated table is a static row, meaning that it doesn’t rely on the list of data loaded into the rows below. You can have one or more static rows, and the elements placed in them will not be repeated (unlike the repeating rows and a repeating group).

As the table element works with columns in addition to rows, you can easily align the content of the static rows with that of the repeating rows. This makes it easier to design neat tables that consistently resize responsively: For example, you can place column headers in the static rows and they’ll align with the content in the repeating rows automatically.

{% hint style="info" %}
If you configure the table to have a horizontal orientation instead of a vertical one, the rows and columns will be transposed.
{% endhint %}

### Repeating rows/columns

Repeating rows contain the data specified in the element’s Type of data and Data source fields. Just like in a repeating group, each row will repeat itself (along with its content) with one row per entry in the data source list.

This means you can only ever edit the first repeating row. Then that content will be duplicated to the rows below. You can add as many columns as you need, and each of them can contain their own elements.

{% hint style="info" %}
If you configure the table to have a horizontal orientation instead of a vertical one, the rows and columns will be transposed.
{% endhint %}

## Selecting and managing the table element

The table element has an orientation property, which allows you to switch the axis of the rows and columns. By default, the table orientation is vertical. When the orientation is configured to horizontal, the information below is inverted, meaning that the rows and columns are transposed.

<figure><img src="/files/71AQHS6T4PXA5uVLfvqy" alt=""><figcaption><p>Clicking the icon in the upper left corner selects the entire table.</p></figcaption></figure>

The table element behaves a bit differently from other Bubble elements, as it allows you to select pseudo-elements that each have their own properties. When you hover over the table element, column and row handles appear to help you make the correct selection. The element itself and the pseudo-elements can be selected individually.

### General properties

You can select the whole table element by clicking the icon in the top-left corner. This opens up the property editor for the full element, where you select the type of data you want to load, the data source for the list, as well as the general settings for styling, responsive behavior, and conditions.

The table element also allows you to select multiple rows and columns to apply specific properties to more than one at a time. To select multiple rows or columns, press and hold the Shift key while clicking on the rows/columns you want to include in your selection.

### Managing rows

You can select and manage both static and repeating rows. Each static row that you add can be selected individually, but you can only select the first repeating row.

The easiest way to select a row is to click the numbered row handle. Bubble also displays your rows and columns as pseudo-elements in the element tree.

When a row is selected, you can set its:

* Background style
* Opacity
* Height controls (Min width / Max width / Fit height to content)
* Page load visibility
* Conditions

#### Adding/removing rows

You can add and remove rows as needed to your table. Static and repeating rows behave a bit differently in this regard:

#### Static rows

To add a static row, right-click any static row or the top repeating row and select Add row above/below. To delete one, right-click that row and select Delete from the floating menu.

#### Repeating rows

Repeating rows are not added individually. Instead, they’re controlled with the properties specified in the top-most repeating row.

1. Select the top repeating row by clicking the row handle. The row is marked with a ∞ symbol.
2. 1. If the Set fixed number of repeating rows box is checked, you can specify the number of rows you want to display using the Row count setting.
   2. If the Set fixed number of repeating rows box is unchecked, Bubble will load as many rows as there are entries in the list of the data source.

### Managing columns

To select a column, click its column handle (A, B, etc). From there, you can adjust the column’s properties:

* Page visibility
* Responsive behavior
* Conditions

### Adding/removing columns

You can **add** columns in two different ways:

* Right-click any column and select Add column to left/right.
* Hover your mouse over the separator between two columns, and you’ll see a floating + symbol. Clicking it will add a column on the right side.

<figure><img src="/files/N9lpWGdeK1RdNv6jyVsf" alt=""><figcaption><p>Hovering the mouse cursor over the line that separates two columns (marked in red) allows you to add a column between the two columns.</p></figcaption></figure>

You can also **remove** columns in two ways:

* Rick-click any column and select Delete.
* Hover any column handle and click the X symbol hovering over the table.

Note: You cannot delete the last column.

<figure><img src="/files/yhP5N1gxWGaV8VlymcjC" alt=""><figcaption><p>One way to delete a column is to click the X icon hovering above the column you want to remove.</p></figcaption></figure>

### Managing cells

Each cell has its own properties and can be assigned conditions. To select a cell, click on the cell; the property editor will display that cell’s settings.

## Working with elements

Like other Bubble container elements, table elements let you place elements in a parent-child relationship. That said, as we explored earlier, table elements are slightly different from the rest of Bubble’s containers in that they include pseudo-child containers for the rows, columns, and cells that you create.

### Navigating the pseudo-groups

The easiest way to navigate through the different cells in your table’s static and repeating rows is to click them directly. The pseudo-groups can also be explored using the element tree on the left-hand side of the editor. They are displayed in the hierarchy of parent and child containers, with the top parent being the table element itself. You will find all your static rows just below the table element, and your repeating rows will appear after that.

<figure><img src="/files/pNhKvPoYnxXAGMfyF0P2" alt=""><figcaption><p>When you set up a table, its pseudo-groups become visible and selectable in the element tree.</p></figcaption></figure>

Keep in mind that you can make any edits you want to the static rows, whereas with repeating rows, you can only edit the first one; the content within that row will be duplicated for all rows below.

## Responsive behavior

When working with responsive behavior for the table element, it helps to think of the parent element (the table itself) and each row and column as separate containers that can have their own responsive settings.

### Total width and height

The total width and height of the entire table container is set on the parent element (the table element itself). In turn, the width and height of the container control the maximum width and height of the table’s individual rows and columns, unless the table container is set to fit width/height to content, with no maximum value.

### Column width

The column width is set at an individual column level. Select the column by clicking its handle or selecting it in the element tree, and then make any needed changes in the property editor. The width of the column will be the same for all rows, including both static and repeating rows.

### Row height

The row height is set at an individual row level. For repeating rows, the height properties are set on the first (top) row.

### Container layout

Just like a regular group, each cell can have its own individual container layout (fixed, row, column, and align to parent) that controls the behavior of its child elements. For cells in static rows, you can control each individual cell, while cells in a repeating row are controlled by each individual cell in the first (top) row.

## Other ways to learn

<details>

<summary><mark style="color:blue;">Core reference:</mark> table element settings</summary>

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

[^4]: A *data source* is any source from which Bubble pulls data, such as a database search, option set or external API request.

    Article series: [Data](/help-guides/data)
