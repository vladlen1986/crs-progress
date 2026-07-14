# Selection controls
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/input-forms/selection-controls · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers selection control elements, that lets you set up input elements with predefined options

Selection control elements are input elements that let your users make a choice from a preselected set of options. This ranges from a simple *yes/no* answer to picking one or more records from the database or other data sources.

## Checkbox

{% embed url="<https://www.youtube.com/watch?v=HnJPoIAXgRc>" %}

The Checkbox element is the most basic selection control element which simply returns a yes or a no depending on whether the box is checked or not.

<figure><img src="/files/gaDPRK7UsSYXwu0Xubx6" alt=""><figcaption></figcaption></figure>

<details>

<summary><mark style="color:blue;">Video lessons</mark></summary>

* [How to use the checkbox input element](https://www.youtube.com/watch?v=HnJPoIAXgRc)

</details>

## Radio button

{% embed url="<https://www.youtube.com/watch?v=jqj5LnkjWNs>" %}

The Radio button element is similar to the checkbox, but allows you to add more than one option. You can set up a static list of text options (in the example below we have used the texts Option 1, Option 2 and Option 3) or you can fetch a list of Things from the database and display one of their fields as the label.

<figure><img src="/files/7Iq3FHQ0zZlOeHhRk342" alt=""><figcaption></figcaption></figure>

<details>

<summary><mark style="color:blue;">Video lessons</mark></summary>

* [How to use the radio button input element](https://www.youtube.com/watch?v=jqj5LnkjWNs)

</details>

## Dropdown

{% embed url="<https://www.youtube.com/watch?v=5jdnZtSBbjA>" %}

The Dropdown element, similarly to the Radio button element lets you give your users one choice out of a selection of texts or from the database.

<figure><img src="/files/KhGnhBlB1hE9zPivCITA" alt=""><figcaption></figcaption></figure>

<details>

<summary><mark style="color:blue;">Video lessons</mark></summary>

* [How to use the dropdown input element](https://www.youtube.com/watch?v=jqj5LnkjWNs)

</details>

## Searchbox element

{% embed url="<https://www.youtube.com/watch?v=TYlb77ObEyg>" %}

The search box element lets you set up a flexible text search for database records. The element looks like a regular [input field](/help-guides/design/elements/web-app/input-forms/text-and-numbers#input-elements) but quickly and dynamically returns search results as the user types.

<figure><img src="/files/9QOlKfqS9MxJQYpF4rBJ" alt=""><figcaption></figcaption></figure>

{% hint style="warning" %}
**Note:** Each time you type or change a character in the search box element, it triggers a fresh [database query](#user-content-fn-1)[^1]. While this ensures a rapid search response, it's worth remembering that each query consumes some workload[^2]. To learn more about workload management, refer to our article series linked below.\
\
Article series: [Pricing and workload](/account-and-marketplace/account-and-billing/pricing-plans)
{% endhint %}

<details>

<summary><mark style="color:blue;">Video lessons</mark></summary>

* [How to use the searchbox element](https://www.youtube.com/watch?v=TYlb77ObEyg)
* [How to use the *Do a search for* data source](https://www.youtube.com/watch?v=-2_3kuyOxkw)
* [How to use search constraints](https://www.youtube.com/watch?v=gOjGDCJrXYI)

</details>

## Slider input

{% embed url="<https://www.youtube.com/watch?v=4GxuhmKij_4>" %}

The Slider input element lets your users select a numerical value out of a range. You can set a minimum and a maximum value and the value of each step.

<figure><img src="/files/IaFPpJa4QRXVcHDEs77b" alt=""><figcaption></figcaption></figure>

<details>

<summary><mark style="color:blue;">Video lessons</mark></summary>

* [How to use the slider input element](https://www.youtube.com/watch?v=4GxuhmKij_4)

</details>

## Multiselect dropdown

The Multiselect dropdown element lets your users select multiple choices from a list of texts or records from the database. They choose the item from a dropdown list or search for them by typing.

<figure><img src="/files/VvfayREIs7ayPtui7bR1" alt=""><figcaption></figcaption></figure>

The element returns a list of whichever type of data you specify.

{% hint style="info" %}
The Multiselect dropdown element is a plugin. It's made by Bubble but it needs to be installed in your app before you can use it.\
\
Search for Multiselect dropdown in the plugin store to install it.
{% endhint %}

<details>

<summary><mark style="color:blue;">Video lessons</mark></summary>

* [How to use the *Do a search for* data source](https://www.youtube.com/watch?v=-2_3kuyOxkw)
* [How to use search constraints](https://www.youtube.com/watch?v=gOjGDCJrXYI)

</details>

[^1]: A *database query* means that Bubble communicates with the server to either transmit or retrieve data, such as saving something or finding something using *Do a search for*.\
    \
    Article series: [The database](/help-guides/data/the-database)\
    Article: [Finding data](/help-guides/data/the-database/finding-data)\
    Reference: [Do a search for](/core-resources/data/data-sources#do-a-search-for)

[^2]: *Workload* is a measure of the work that Bubble does in order to power your application. Each time your app is tasked with processing an action – such as loading a page and [querying your database](#user-content-fn-3)\[^3] – it contributes to your monthly workload consumption.\
    \
    Article series: [Pricing and workload](/account-and-marketplace/account-and-billing/pricing-plans)
