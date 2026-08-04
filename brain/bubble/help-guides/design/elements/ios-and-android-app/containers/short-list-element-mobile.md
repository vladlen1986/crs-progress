# Short list element (mobile)
> Source: https://manual.bubble.io/help-guides/design/elements/ios-and-android-app/containers/short-list-element-mobile · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="warning" %}
**Note on performance:** Short lists load the entire data source at once, rather than using lazy loading. This makes them ideal for shorter lists, while longer lists may impact performance.
{% endhint %}

A short list is a container used to display a fixed list of items in a native mobile app. Like a vertical list, it repeats its child elements once for each item in the data source, but it loads all its data at once rather than lazy-loading as the user scrolls. This makes it well suited to short, predictable collections that fit naturally within a view.

Short lists are the right choice for compact, focused lists that live alongside other content in a view.

## What short lists do

At the most basic level, a short list takes a list of things and repeats its child elements once for each item. If you show a list of five records, everything you add to the short list is duplicated five times, once per record.

Each of these repetitions is called an **item**. An item holds all the child elements and represents a single item from the list. Text elements can display data from that item, buttons can trigger actions on it, and containers can be styled to give each item its own look.

Short lists work similarly to regular groups: you set a *Type of content*, provide a *Data source*, and the elements inside can reference the data. The difference is that a regular group holds one item, while a short list holds many.

{% hint style="info" %}
Short lists require a **list as their data source**, unlike most other containers, which work with a single item.
{% endhint %}

## When to use a short list

Short lists are ideal for small, predictable collections that fit naturally within a view.

For larger lists or lists that grow unpredictably, use a [vertical list](/help-guides/design/elements/ios-and-android-app/the-view#view-types) instead. Vertical lists load data progressively as the user scrolls, which keeps performance smooth even with a lot  of items.

<table><thead><tr><th width="182.3046875">Feature</th><th>Short list</th><th>Vertical list</th></tr></thead><tbody><tr><td>Data loading</td><td>Loads all data at once</td><td>Lazy-loads as the user scrolls</td></tr><tr><td>Best for</td><td>Small to medium lists</td><td>Long or unpredictable lists</td></tr><tr><td>Multiple per view</td><td>Yes</td><td>Only one per view</td></tr><tr><td>Scroll behavior</td><td>Scrolls with the surrounding view</td><td>Scrolls independently within the view</td></tr></tbody></table>

The rule of thumb: if the list is short and predictable, a short list is often the better fit. If the list can grow long or is the main focus of the view, use a vertical list.

## Loading data into a short list

There are two main ways to load data into a short list:

### Set the data source directly

The list loads as soon as the view opens, using an expression like `Do a search for Posts`. This is useful when the data is known in advance.

<figure><img src="/files/GUy3oQHfrHfqpweo5hVR" alt="Setting the data source of a short list."><figcaption><p>Filling in the short list's <em>Type of content</em> and <em>Data source</em> loads the data immediately.</p></figcaption></figure>

### Push data with a workflow

Use the *Display list in a short list or selectable list* action to load a list in response to a user action. This is useful when the data depends on something the user does.

<figure><img src="/files/1w1HBlchJHHw6LpWq4Vz" alt="Pushing data to a short list using an action."><figcaption></figcaption></figure>

Both methods behave the same way once the list is loaded.

## Referencing data in an item

Because each item represents a different record in the list, referencing data inside an item uses the *Current item* expression. If the *Type of content* is *Post*, you'd reference `Current item's Post's title` to show the post's title.

<figure><img src="/files/6qlK61mZgBR3BuUjFuQ2" alt="Referencing the item in a short list."><figcaption><p>Using <code>Current item's Post's title</code>, you can display the title of each post in the list.</p></figcaption></figure>

One text element inside the short list displays all the names in the list, one per item.

## Styling short lists

Short lists can be styled like any other element. You can style individual short lists by adjusting their different properties, or by connecting them to predefined styles[^1] and/or [style variables](#user-content-fn-2)[^2].

<figure><img src="/files/bTX9OLDhLPwvzb3fbaUs" alt="The styling properties of a mobile floating group."><figcaption><p>You can style individual short lists by adjusting their different properties, or by connecting them to predefined styles and/or style variables.</p></figcaption></figure>

## Performance considerations

Because short lists load all data at once, they're best kept short. A few things to keep in mind:

* **Fewer than a dozen items is ideal.** Short lists shine when they display a small, predictable set of records.
* **Item complexity matters.** Items with many elements take longer to render, so keeping the item design simple helps performance.
* **Watch out for nested lists.** Placing a short list inside another list runs the data query for every parent item, which can compound quickly.

If the list starts to grow beyond what a short list can comfortably handle, [switch to a vertical](#when-to-use-a-short-list) list to take advantage of lazy loading.

## FAQ: Short lists

<details>

<summary>How is a short list different from a vertical list?</summary>

A short list loads all its data at once and is designed for small, fixed lists. A vertical list lazy-loads data as the user scrolls, making it better for larger collections. You can also have multiple short lists in a single view, but only one vertical list.

</details>

<details>

<summary>How many items can a short list display?</summary>

There's no strict limit, but short lists work best with small collections. If the list grows beyond a dozen or so items, or if the data comes from a search that can grow over time, use a vertical list instead.

</details>

<details>

<summary>Can I have multiple short lists in the same view?</summary>

Yes. This is one of the main advantages of a short list. You can stack multiple short lists in a single view.

</details>

<details>

<summary>Can I sort or filter items in a short list?</summary>

Yes. When using `Do a search for` as the data source, you can add constraints and sorting rules directly in the search. You can also chain operators like `:sorted` by or `:filtered` to control the order and contents of the list.

</details>

<details>

<summary>How do I reference the record in an item?</summary>

Use the `Current cell` expression. For example, if the Type of content is User, `Current cell's User's name` references the name of the user in that specific cell.

</details>

<details>

<summary>Can I make the cells tappable?</summary>

Yes. Add a workflow triggered by a tap on any element inside the cell, or on the cell's parent group. Inside the workflow, reference Current cell's User (or whatever type of content the list uses) to act on that specific item.

</details>

<details>

<summary>What happens if the list is empty?</summary>

The short list renders no cells and takes up no space. You can use conditions to show a placeholder message or graphic when the list is empty.

</details>

<details>

<summary>Can I display a list without loading it from the database?</summary>

Yes. The data source can be any expression that returns a list, such as a list stored in an option set, a list returned by an API call, or a list constructed with `:merged with`. You aren't limited to database searches.

</details>

<details>

<summary>How do I find the position of an item in the list?</summary>

Use `Current item's index` to reference the position of the item within the short list. Bubble uses 1-indexing, so the first cell is index 1.

</details>

<details>

<summary>Are short lists available in web apps?</summary>

No. Short lists are mobile-only. On web, use [repeating groups](/help-guides/design/elements/web-app/containers/repeating-groups) instead.

</details>

[^1]: Styles are reusable sets of visual properties, like colors, fonts, and borders, that can be applied to elements across your app. Updating a style automatically updates every element that uses it, keeping your design consistent.

    **Article:** [Styles](/help-guides/design/variables-and-styles/styles)

[^2]: Style variables let you save individual colors and fonts, and reference them anywhere in your app. Updating a variable updates every style and element that uses it, making it easy to change your app's look in one place.

    **Article:** [Style variables](/help-guides/design/variables-and-styles)
