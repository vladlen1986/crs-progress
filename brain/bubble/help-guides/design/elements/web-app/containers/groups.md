# Groups
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/containers/groups · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers Groups, that can be used to contain elements and data and control the responsive behavior of child elements

Groups are the most basic container type. It can be placed anywhere on the page, including inside of another container.

{% embed url="<https://www.youtube.com/watch?v=HWmgmzIQRfg>" %}

It can be used to organize other elements, for aesthetic purposes (by styling it) and to pass data.

<figure><img src="/files/giLHZKHIX1Q5PwaPNapE" alt=""><figcaption><p>Groups can hold elements like the form in the example above.</p></figcaption></figure>

## Using groups for navigation

Groups can be displayed and hidden based on different conditions and user actions. By hiding and showing groups that contain other elements you can let your users navigate your app without having to go to another page.

When a group is hidden, you can set it to collapse its height and width to give room for other groups to be displayed. To the user, the switch is instant – the content on the page simply seems to change without any delay or flickering.

<figure><img src="/files/8XwCjAUuciKrG3sIbr7E" alt=""><figcaption><p>In the example above, we are toggling the visibility of Group A and Group B.</p></figcaption></figure>

In the animation above we are toggling the visibility of Group A and Group B. The result is that one replaces the other as the blue group collapses its height. This is how you build [single-page applications](#user-content-fn-1)[^1] (often abbreviated to SPA) where users can visit different sections of the page while never having to reload.

There are two ways to hide and show groups: conditions and actions.

### Using conditions

The first way is to place conditions[^2] on the group that looks for specific criteria to be true. A common way to control user navigation is to use conditions together with [URL parameters](#user-content-fn-3)[^3].

<figure><img src="/files/9m6QlEgQr3w5e3BkHFIY" alt=""><figcaption></figcaption></figure>

In the condition above we are checking the URL for a parameter called *navigation.* If the value of the parameter is *edit user* the element is visible.

### Using actions

{% embed url="<https://www.youtube.com/watch?v=gDqAc9hj6Mc>" %}

The second way to hide and show groups is to use actions. You can choose to instantly show/hide the group by using the *Toggle an element* action, or you can apply an animation using the *Animate an element* action.

<figure><img src="/files/rsHlKvpXxlEKgCLNemRG" alt=""><figcaption><p>The <em>Toggle an element</em> action toggles the visibility of an element.</p></figcaption></figure>

## Other ways to learn

<details>

<summary><mark style="color:blue;">Core reference:</mark> group settings</summary>

In the core reference section, you'll find all the settings associated with groups.

Reference: [Groups](/core-resources/elements/containers#group)

</details>

[^1]: A single-page application is an app that is set up to let users navigate to different sections without having to reload the page.

    This is done by hiding and showing elements based on the user's action, instead of setting up sections on different pages.

[^2]: Conditions are expressions that you can set up on an element that return a true or false value.\
    \
    You can then use the result of the condition to apply styling to the element, including hiding/showing it.

[^3]: A URL parameter is a piece of data that you place in the URL of the current page. URL parameter consist of a *key* and a *value* where the key is the name of the parameter and the value is whatever data you place in it.\
    \
    URL parameters are placed after the page URL and is separated from the URL with a question mark (?). If there's more than one URL parameter, they are separated with an ampersand (&).<br>

    In the example below, the parameter is displayed in bold:\
    \
    [www.mydomain/pag\&#x65;\*\*?name=bubble](http://www.mydomain/pag\&#x65;**?name=bubble)\*\*
