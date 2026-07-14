# Popups
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/containers/popups · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers the container type Popup, which is a group that hovers above all other elements on the screen

{% embed url="<https://www.youtube.com/watch?v=YXxYeHlowWk>" %}

The *Popup* group type is a a group that is displayed above all other elements and is centered on the screen regardless of the scrolling position of the page. They can be set up to hide or blur the page below. As such, they are a useful way to bring an important message or forms to the user's attention immediately.

Typical use cases for popups include:

* Error messages and alerts
* Registration forms
* Contact/Feedback forms
* Newsletter Signup forms
* Promotional offers and discounts

<figure><img src="/files/YMuEnoQ1xIWxJ6IxTNlW" alt=""><figcaption><p>Popups can be used to bring attention to your users immediately. In this example we're encouraging users to complete their profile.</p></figcaption></figure>

## Showing and hiding popups

Popups are never visible by default and cannot be displayed using conditions. In this way they are a bit different from other groups.

Popups are displayed using one of two actions:

* You can use the *Show an element* action to show the popup. Bubble automatically applies a slight fade animation to the group when it's displayed and hidden
* Your second option is to use the *Animate an element* action to pick what kind of animation you want to use to display the popup

<figure><img src="/files/jIvMTFQpiKFdXtd6B8gU" alt=""><figcaption><p>Using the <em>Show an element</em> action the popup will automatically fade in.</p></figcaption></figure>

## Custom events for popups

A workflow consists of an *even* and a set of *actions*. The event is used to determine when the collection of actions should run.

<figure><img src="/files/hSA6ohISkg2sxudIaUFe" alt=""><figcaption></figcaption></figure>

Adding a popup to a page gives you two more events that you can use to trigger a workflow:

<figure><img src="/files/NWfqm4QjLURZrrittcIg" alt=""><figcaption><p>Popups give you access to two new events that trigger whenever the popup is opened or closed.</p></figcaption></figure>

* **A popup is closed** will trigger every time a specific popup is closed using the *Hide an element* or *Animate an element* actions
* **A popup is opened** will trigger every time a specific popup is closed using the *Show an element* or *Animate an element* actions

The events will trigger every time the popups is opened or closed (as opposed to just the first time). A typical scenario where an event like this is useful is to reset the content of the popup after it's closed.

## Popups and security

While popups can be set up to cover the content of the page with a specific color or a blur filter, it should not be considered a secure way to hide sensitive information. A popup can be hidden by a tech-savvy user, revealing the content below.

## Other ways to learn

<details>

<summary><mark style="color:blue;">Core reference:</mark> popup settings</summary>

In the core reference section, you'll find all the settings associated with popups.

Reference: [Popups](/core-resources/elements/containers#popup)

</details>

<details>

<summary><mark style="color:blue;">Video lessons</mark></summary>

* [How to use the popup element](https://www.youtube.com/watch?v=YXxYeHlowWk)
* [How to trigger workflows from popup events](https://www.youtube.com/watch?v=AhiJv3jYZEg)

</details>
