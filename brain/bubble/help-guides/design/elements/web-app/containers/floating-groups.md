# Floating groups
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/containers/floating-groups · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers the group type Floating Group, which is used primarily for attaching a group to one of the sides of the screen, regardless of scrolling position

Floating Groups are a group type that can be set up to hover above other elements on the page and they can be attached to any side of the screen and stay there regardless of whether the user scrolls up and down.

Some typical use cases for floating groups include:

* Navigation menus: A floating menu bar that stays at the top of the screen while users scroll down the page.
* Social media icons: Floating icons that stay in a fixed position, usually in the corner of the screen, and provide quick access to social media profiles.
* Chatbots: A chat widget that pops up in a floating window, allowing users to communicate with a customer support agent or AI chatbot.
* Shopping carts: A floating cart that displays items a user has added to their shopping cart and allows them to checkout from anywhere on the site.
* Back-to-top buttons: A floating button that appears when a user scrolls down the page, allowing them to quickly return to the top of the page.

<figure><img src="/files/lie8GPQtiftoUKiMKBqL" alt=""><figcaption><p>A typical use case for Floating Groups is to set up a navigation header that sticks to the top of the screen. The example above is from Bubble's homepage – which is built using Bubble.</p></figcaption></figure>

## Sticking Floating Groups to the screen edge

Floating Groups can be set up to stay along the edge of the screen even if the user scrolls. It can follow the screen edge exactly or be place at a given distance using margins.

To set a Floating Group to stick to the edge, you need to pick a vertical and horizontal axis for the group to stay floating relevant to. You do this by opening up the [Property Editor](#user-content-fn-1)[^1] for the group and changing the following setting:

<figure><img src="/files/CHefi1VMQ0bS7GIOaat9" alt=""><figcaption><p>The two top settings in the Property Editor of the Floating Group allows you to have the group float relative to both the vertical and horizontal axis.</p></figcaption></figure>

### What is the z-index?

The z-index[^2] allows you to choose whether the Floating Group should float above or below the other elements, including the page itself.

{% hint style="warning" %}
Note that if you change the setting below to *Beneath the page*, the group will literally be beneath the page itself (and not just beneath the elements on the page).\
\
As a result, if the page has a background style, it may block the Floating Group from sight.
{% endhint %}

## Other ways to learn

<details>

<summary><mark style="color:blue;">Core reference:</mark> floating group settings</summary>

In the core reference section, you'll find all the settings associated with floating groups.

Reference: [Floating groups](/core-resources/elements/containers#floating-group)

</details>

<details>

<summary><mark style="color:blue;">Video lessons</mark></summary>

We have multiple video lessons on how to set up and use Floating groups:

* [How to use Floating Groups](https://www.youtube.com/watch?v=lvuovDbPsHg)
* [How to build a sidebar layout](https://www.youtube.com/watch?v=xPr2C-CcW_k)
* [How to build a responsive navigation bar](https://www.youtube.com/watch?v=3lUlmTZ_IQo)

</details>

[^1]: The Property Editor is the floating window that lets you edit the settings of a given element.\
    \
    You display the Property Editor either by double-clicking the element in the design tab or clicking it once in the Element Tree.

[^2]: The z-index is a term coming from the web design language called CSS.\
    \
    It's a numerical value that determines the order in which elements on the page should stack. In other words, if two elements are overlapping, which should be on top of the other.\
    \
    Bubble handles the z-index automatically as you design your page, but for the Floating Group type you can choose to set it to appear beneath all other elements.
