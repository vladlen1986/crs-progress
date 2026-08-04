# Horizontal list element (mobile)
> Source: https://manual.bubble.io/help-guides/design/elements/ios-and-android-app/containers/horizontal-list-element-mobile · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

A horizontal list is a container used to display a list of items in a scrollable, side-to-side layout. Like other list types on mobile, it works by repeating the same set of elements once for each item in the data source. Unlike vertical or short lists, horizontal lists scroll left and right, making them well suited for content that benefits from being browsed sideways.

## What horizontal lists do

Horizontal lists take a list of things and repeat their child elements once for each item, laying them out in a row that the user can scroll through. If you show a list of ten products, everything you add to the horizontal list is duplicated ten times, once per product, and arranged side by side.

Each of these repetitions is called an **item**. An item holds all the child elements and represents a single record from the list. Text elements can display data from that item, buttons can trigger actions on it, and containers can be styled to give each item its own look.

Horizontal lists work similarly to other lists on mobile: you set a *Type of content*, provide a *Data source*, and the elements inside can reference the data.

{% hint style="info" %}
Horizontal lists require a **list as their data source**, unlike most other containers, which work with a single item.
{% endhint %}

## When to use a horizontal list

Horizontal lists shine when the content works better as a sideways scroll than a vertical stack. Common uses include:

* **Category carousels** at the top of a screen, letting users tap between sections.
* **Featured content rows**, like recommended articles, videos, or products.
* **Media galleries**, such as scrollable image or video thumbnails.
* **Story previews**, similar to the horizontal story rows in social apps.
* **Chip or tag lists**, where users can scroll through options that don't fit on a single line.

Horizontal lists are also often used inside vertical lists, letting each row of a vertical layout contain its own sideways-scrolling collection.

## Placement rules

Horizontal lists can't be placed directly on a *list view*. They can only be used in:

* A non-list view.
* Inside another list on a list view, such as nested within a vertical list.

This means horizontal lists are typically added as one component within a larger layout, rather than being the primary structure of a view.

## Loading data into a horizontal list

To load data into the horizontal list, use a dynamic expression in its data source. The list loads as soon as the view opens, using an expression like `Do a search for Posts`.&#x20;

<figure><img src="/files/gUtcR039WvEpKY1OXSM7" alt="Setting the data source on a horizontal list."><figcaption><p>To load data into a horizontal list, use the <em>Type of content</em> and <em>Data source</em> properties.</p></figcaption></figure>

Horizontal lists can't be loaded through a workflow action, but you can use a conditional to change the data source based on specific circumstances.

## Referencing data in an item

Each item represents a different record in the list. Reference data inside an item using the `Current item` expression. If the *Type of content* is *Post*, you'd reference `Current item's Post's name` to show the product's name.

One text element inside the horizontal list then displays all the names in the list, one per item.

## Spacing between items

Horizontal lists include built-in properties for controlling the spacing between items:

* **List item gap spacing** turns spacing on or off.
* **Item gap (px)** sets the exact spacing in pixels.

These controls make it easy to keep items visually separated without adding extra margins or padding to individual items.

## Snapping

Snapping controls how the list settles when the user stops scrolling. Instead of free-scrolling and stopping wherever momentum runs out, a snapping list comes to rest at a defined point, either on an individual item or on a full page of content. Bubble reads your layout settings, including item size, padding, and gaps, and applies the correct native snapping behavior automatically.

For more info, see the core reference entry below.

**Core reference:** [The snapping property](/core-resources/bubble-elements/element-properties/native-mobile-element-properties/container-properties-mobile/horizontal-list-element-mobile)

## Styling horizontal lists

Horizontal lists can be styled like any other container. This controls the styling of the list itself, while individual elements inside each item can be styled independently.

You can style individual horizontal lists by adjusting their different properties, or by connecting them to predefined styles[^1] and/or [style variables](#user-content-fn-2)[^2].

### Performance considerations

Because horizontal lists load their items upfront, they're best suited to small or medium collections. A few things to keep in mind:

* **Long lists can slow down rendering.** For very long collections, limit the data source with search constraints or pagination.
* **Media-heavy items add up.** Loading many high-resolution images at once can affect performance and data usage. Consider using optimized image sizes.
* **Nested lists compound cost.** Each parent list runs its own query for the nested list, so nesting should be used deliberately.

### Frequently asked questions

<details>

<summary>How is a horizontal list different from a vertical list?</summary>

The main difference is the scroll direction. Horizontal lists scroll sideways, making them well suited to carousels, category rows, and media galleries. Vertical lists scroll top to bottom and are typically used for feeds and long collections.

</details>

<details>

<summary>Can I place a horizontal list directly on a list view?</summary>

No. Horizontal lists can only be placed on non-list views, or nested inside another list on a list view. For example, a horizontal list can sit inside an item of a vertical list.

</details>

<details>

<summary>How many items can a horizontal list display?</summary>

There's no strict limit, but horizontal lists load their items upfront, so they perform best with smaller collections. For long lists, apply constraints to the search or paginate the results.

</details>

<details>

<summary>How do I reference the item in an item?</summary>

Use the `Current item` expression. For example, if the *Type of content* is Post, `Current item's Post's title` references the title of the post in that specific item.

</details>

<details>

<summary>Can I make items tappable?</summary>

Yes. Add a workflow triggered by a tap on any element inside the item, or on the item itself. Inside the workflow, reference `Current item's Post` (or whatever type of content the list uses) to act on that specific item.

</details>

<details>

<summary>Can I nest a horizontal list inside another list?</summary>

Yes. Nesting a horizontal list inside a vertical list is a common pattern for building content-rich screens with themed rows. Just keep an eye on performance, since each parent item runs its own data query for the nested list.

Also be aware that the size of the smallest mobile screens can make interaction difficult if you have lists within lists.

</details>

<details>

<summary>Can I sort or filter items in a horizontal list?</summary>

Yes. When using `Do a search for` as the data source, you can add constraints and sorting rules directly in the search. You can also chain operators like `:sorted` by or `:filtered` to control the order and contents of the list.

</details>

<details>

<summary>Can I control the spacing between items?</summary>

Yes. Enable [List item gap spacing](#spacing-between-items) on the list and set the Item gap (px) to define the exact spacing between items.

</details>

<details>

<summary>Can I use swipe actions on horizontal list items?</summary>

No. Swipe actions are available on vertical and section lists only, since sideways scrolling in a horizontal list conflicts with the swipe gesture.

</details>

<details>

<summary>Are horizontal lists available in web apps?</summary>

No. Horizontal lists are mobile-only. On web, use [repeating groups](/help-guides/design/elements/web-app/containers/repeating-groups) with horizontal scrolling instead.

</details>

[^1]: Styles are reusable sets of visual properties, like colors, fonts, and borders, that can be applied to elements across your app. Updating a style automatically updates every element that uses it, keeping your design consistent.

    **Article:** [Styles](/help-guides/design/variables-and-styles/styles)

[^2]: Style variables let you save individual colors and fonts, and reference them anywhere in your app. Updating a variable updates every style and element that uses it, making it easy to change your app's look in one place.

    **Article:** [Style variables](/help-guides/design/variables-and-styles)
