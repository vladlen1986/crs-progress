# Group focus
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/containers/group-focus · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers the group type Group Focus. This group will remain visible for as long as it is in focus, typically used for dropdown menus

{% embed url="<https://www.youtube.com/watch?v=l_SbovrRt2s>" %}

The Group Focus has two main characteristics:

* It will remain visible only for as long as it is in focus. *Focus* in this context means until you click anywhere else on the page.
* They are displayed relative to another element by a set number of pixels

These features gives it several typical use cases:

* Contextual menus
* Floating Action Buttons
* Dropdown Menus
* Tooltips

<figure><img src="/files/7UozR6jK7QBoGhtQinPV" alt=""><figcaption><p>Group Focus is useful for setting up dropdown menus</p></figcaption></figure>

In the example above you can see a typical use case for the group focus. The white rectangle with the shadow is the Group Focus, and we are using the *Animate an element* action when the icon is clicked to give it a smooth transition. As soon as a click happens outside of the Group Focus it's automatically hidden without any actions needed.

<figure><img src="/files/AxLL2PXRB5LY4wdtWi1x" alt=""><figcaption></figcaption></figure>

Taking a look in the Bubble editor, we can note a few things:

* The *Reference element* is set to the icon. This means that the Group Focus will be displayed relative to the icon.
* We have given it an offset of -150 pixels to push it to the left side of the icon. This is simply an aesthetic choice
* When the icon is clicked, the *Animate an element* action displays. Notice that no action is needed to hide it again.

<figure><img src="/files/RkQz0tl12blGjxHOrdp7" alt=""><figcaption><p>We chose the SlideDownIn animation to display the dropdown menu, and give it a slightly shorter duration than the default. Both of these options are also purely aesthetic.</p></figcaption></figure>

## Using Group Focus in Repeating Groups

[Repeating Groups](/help-guides/design/elements/web-app/containers/repeating-groups) behave a bit differently than other group types because the contain *multiple* [*cells*](#user-content-fn-1)[^1]. As a consequence, you can't directly reference an element inside of a Repeating Group cell, since Bubble can't know which cell you are trying to reference.

This creates a challenge when using the Group Focus, because it depends on being able to reference another element to know where to display it. There's a way to get around this however: if you place the Group Focus and the element it should reference inside of a [Reusable Element](#user-content-fn-2)[^2], and then place that Reusable Element inside of the Repeating Group, it will work.

This is useful in scenarios where you want to place a contextual menu in a Repeating Group.

<figure><img src="/files/mxtZ6MAAILWPP8s0ujdr" alt=""><figcaption></figcaption></figure>

In the example above, both the clickable icon *and* the Group Focus is contained within a Reusable Element. This Reusable Element is then duplicated for each cell of the Repeating Group. To make sure that we can apply actions to the dropdown menu that are relevant to the user in the current row, make sure to set the Reusable Element's *Type of content* to User:

<figure><img src="/files/4ztjDGrwgmj4akLibARU" alt=""><figcaption><p>This setting is set when you edit the Reusable Element and open the Property Editor for the Reusable Element itself.</p></figcaption></figure>

Then, when selecting the Reusable Element you have placed in the Repeating Group, you set the Data Source to the *Current Cell's User*:

<figure><img src="/files/Bptmn5YiO9OqPxqvi4xJ" alt=""><figcaption><p>By setting the Data Source of the Reusable Element to the content of the current cell, we are passing data from that specific cell into the Reusable Element, where you can bind it to actions in the dropdown menu.</p></figcaption></figure>

## Other ways to learn

<details>

<summary><mark style="color:blue;">Core reference:</mark> group focus settings</summary>

In the core reference section, you'll find all the settings associated with floating groups.

Reference: [Group focus](/core-resources/elements/containers#group-focus)

</details>

<details>

<summary><mark style="color:blue;">Video lessons</mark></summary>

* [How to use the Group focus element](https://www.youtube.com/watch?v=l_SbovrRt2s)

</details>

[^1]: A Repeating Group allows you to display a list of Things, such as a list of users. Each instance or "row" is referred to as a *cell*.

[^2]: A Reusable Element a user interface component that can be set up once and used multiple times throughout your app. A typical use case is to set up a navigation header that you want to show on multiple pages.\
    \
    By using a Reusable Element you can make changes to the design once, and have those changes automatically propagate to all instances of that element throughout your app.\
    \
    Reference: [Reusable Elements](/core-resources/elements/reusable-elements)\ <br>
