# Reusable Elements
> Source: https://manual.bubble.io/help-guides/design/elements/reusable-elements · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers reusable elements: elements that can be using in multiple places in your app

Reusable elements are a way to create groups of elements that can be used in more than one place.

For example, if you have created a navigation toolbar, you may want that same toolbar to be visible on multiple pages, and only have to make changes to it once to update all of them.

<figure><img src="/files/DV4ToNrpFt6WxWZhIoR7" alt=""><figcaption><p>The navigation toolbar on www.bubble.io (marked in red) is a typical use case for reusable elements. This toolbar and all its buttons and workflows can be re-used in as many places as you need.</p></figcaption></figure>

Reusable elements contain elements, workflows[^1] and [custom states](#user-content-fn-2)[^2] and each instance of the reusable element behaves in isolation: in other words, what happens in one reusable element has no effect on other copies of the same reusable element, even if they're on the same page.

### Examples of reusable elements

Reusable elements can be used for any collection of elements/workflows that you want to re-use across your app. To further illustrate what reusable elements are often used for, let's look at a few examples:

1. **Navigation Bar**: This is usually placed at the top of every page and provides links to the main sections of your app.
2. **Footer**: Like the navigation bar, a footer is a consistent element placed at the bottom of each page, containing information such as copyright notices, contact details, and additional links.
3. **Login/Signup Form**: forms reused across different pages for user authentication.
4. **Search Bar**: If your app includes a search function, you may want that feature to be present on multiple pages.
5. **Buttons**: Call to action (CTA) buttons like "Sign Up", "Buy Now", or "Learn More" can be standardized and used throughout your application.
6. **Sidebar Menu**: a sidebar menu may be present on multiple pages for navigation.
7. **Pop-up Modals**: Reusable pop-up windows for things like confirmation messages or user prompts.
8. **Contact Forms**: Standardized forms for user inquiries.
9. **Data Cards**: Card lists showing stuff like user profiles, eCommerce products and tourist destinations
10. **Error Messages**: Standardized error messages can be used across different scenarios and pages.

### Why use reusable elements?

There are many reasons as to why you would want to use them:

#### Speeding up development and maintenance

Any change that you make to a reusable element is instantly visible across all instances of it. Instead of making changes in a lot of different places across your app, you can centralize the management of key features into one element.

#### Maintaining consistency

By using reusable elements for designs that are used frequently, like forms, pop-ups, and footers, you give your app a consistent look and cut down on the work you have to do to maintain it.

#### Isolating work in the Bubble editor

If a page has lots of elements and workflows, putting some parts in reusable elements can make it easier to focus. This way, there are fewer things to keep track of on the screen at the same time.

#### Performance

Reusable elements keep your app lightweight and performant, since its content only needs to be loaded once.

#### Reusing workflows

Reusable elements can also be used to store workflows that you use in multiple places across your app. In fact, a reusable element doesn't have to contain any visible elements – you can use it to simply [trigger workflows](#user-content-fn-3)[^3].

## Reusable element types

Reusable elements can be created as one of the following container types:

* **Group:** used to contain other elements
* **Popup:** used to contain other elements and hover centered above all other content on the page
* **Floating group**: used to contain other elements and hover near an edge of the screen (such as a navigation toolbar)

{% hint style="info" %}
Each of these types behave in the same way that their container element counterparts do. You can read more about the different types in our article series on containers.

Article series: [Containers](/help-guides/design/elements/web-app/containers)
{% endhint %}

## Creating reusable elements <a href="#creating-and-using-reusable-elements" id="creating-and-using-reusable-elements"></a>

There are multiple ways to create new reusable elements:

### The page menu

To create a new blank reusable element:

1. Open the page navigation menu in the upper left corner of the Bubble editor
2. Scroll to the *Reusable elements* section
3. Click *Add a new reusable element*

<figure><img src="/files/Is5YBMCCfWZhQ69g3Mk6" alt=""><figcaption></figcaption></figure>

### The element tree

You can also create a blank reusable element using the [element tree](#user-content-fn-4)[^4]:

1. Navigate to the *Design* tab of the Bubble editor
2. In the element tree, scroll down to the *Reusable elements* section
3. Click *New reusable*

<figure><img src="/files/KNODr4rnjjnkMWAjVSvM" alt=""><figcaption></figcaption></figure>

### Converting existing element(s)

You can also convert one or more elements on a page into a reusable element:

* If you select a container element, a new reusable element will be created, containing the child elements inside of the original container
* If you select one or more elements, a new reusable element will be created containing those elements
* The original elements on the page will not be deleted or replaced with the newly created reusable element
* Any workflows associated with the selected elements will be copied into the new reusable element, but may break if they lose access to original references

To convert existing containers or elements into a reusable, do the following:

1. Select one or more elements on the page
2. Right-click the mouse on one of the selected elements or click the *Edit* menu at the top of the screen
3. Select *Convert to a reusable element*

A new reusable element will be created and you will be taken to that element in the editor.

{% embed url="<https://youtu.be/3GEH_hCaAWk>" %}
Our Academy course includes how to convert groups into reusable elements
{% endembed %}

## Passing data to and from a reusable element

In many cases you'll need to pass data to and from a reusable element. There are a few different ways to do this:

### Using the data source

When a reusable element has a *Type of content* set and it's been placed on the page, you can set a data source for it. For example, if the reusable element has a data type called *Product* as its type of content, you can set any product in your database as the data source on the page where the reusable element is placed.

This method works **one** direction: passing data from the parent to the reusable element.

### The Display data action

The *Display data* action can be used to send any kind of data to the reusable element, as long as it matches the *Type of content* set on that element. For example, if you have a form to edit someone's user profile, you can send the relevant user data to the reusable element using the display data action.

This method works **both** directions: passing data from the parent to the reusable element or vice versa.

### Custom states

You can also pass data from the parent page to a reusable element using the *Set state of an element* action:

1. Set up the relevant custom state with the correct data type on the reusable element. The custom state needs to be create on the parent reusable element, not any of its children
2. Use the *Set state of an element* action to populate the custom state with data

This method works in **both** directions: passing data from the parent to the reusable element or vice versa.

### URL parameters

[URL parameters](#user-content-fn-5)[^5] do not pass data directly into a reusable element per sé, but since they can be read and manipulated by both the page and any reusable element within that page, they can be a useful way to share information between the two.

This method works in **both** directions: passing data from the parent to the reusable element or vice versa.

### Reusable element properties

Reusable elements also come with customizable properties that can be set up to share dynamic data between it and other elements such as the parent page.

<figure><img src="/files/xJi80pfpgXACqC9qZ19l" alt=""><figcaption></figcaption></figure>

Properties can be populated by a default value assigned on the reusable element itself or from the parent. Any new property that you add will be assigned a field on each instance of that reusable element placed on a page, and they can be individually assigned data.

The data populated in the fields are prioritized in order of 1) data assigned from the parent, and 2) default data, meaning that the data from the parent element takes priority.

Unlike custom states (that require an action to be assigned a value), reusable element properties let you use dynamic data. Unlike the *Type of content* field that all resuable elements have, you can set up as many different properties as you need, each with individual data types.

#### Reusable element property types

You set select one of three types for any new property.

* **Dynamic value** lets you assign any [basic data type](#user-content-fn-6)[^6] or [custom data type](#user-content-fn-7)[^7] that you can then populate using a dynamic expression, such as a database search, an option set or something else. This is useful for passing different types of data dynamically to and from the reusable element.
* **Color picker** lets you assign a [hex color code](#user-content-fn-8)[^8] or a saved [color variable](#user-content-fn-9)[^9]. This is useful for dynamically passing a color value to the reusable element. You can then use that color to communicate something to your users, such as a different background, button or text color.
* **Checkbox** is a simple way to pass a [yes/no value](#user-content-fn-10)[^10] to or from the reusable.

This method works in **both** directions: passing data from the parent to the reusable element or vice versa.

#### Reusable element property descriptions

{% hint style="info" %}
This feature is only available in the new property editor.
{% endhint %}

You can add a description to each property you set up on a reusable element, to make it easier to differentiate multiple properties, or remember what a specific property is for.

<figure><img src="/files/6SmrKztXzaC9AiaFCwMr" alt=""><figcaption></figcaption></figure>

#### Passing data both ways

Let's revisit the point that reusable element properties can pass data not only *to* a reusable element, but *from* the element to the parent. This value can then be read by any element on the parent, allowing you to pass dynamic data to other elements on that page without having to use actions.

The fact that you can keep dynamic values updated automatically between a reusable element and its parent opens up for scenarios where you can use the reusable element to store different variables that you use elsewhere on the page and manage from one place.

## Adding an existing reusable element to a page

To add an existing reusable element to a page, navigate to the *Reusable elements* section of the [element tree](#user-content-fn-4)[^4], click the element that you want to add, and then click on the area where you want to add it to a page.

<figure><img src="/files/ze6mVxbkBoEZIl1nCn13" alt=""><figcaption><p>Every reusable element you create will be added to the <em>Reusable element</em> section of the element tree.</p></figcaption></figure>

## Modifying dimensions

Reusable elements' dimensions are defined when you edit the element itself. However, these elements are responsive (except if you make them fixed width), and if you need to resize them in the destination page you can do so, and the content will adjust as defined with the responsive settings of the inner elements.

## Other ways to learn

<details>

<summary>Video lessons</summary>

* [Converting elements to reusable elements](https://www.youtube.com/watch?v=3GEH_hCaAWk)
* [How to build a responsive navigation bar](https://www.youtube.com/watch?v=3lUlmTZ_IQo)

</details>

[^1]: The collection of an *event* and a set of *actions* in Bubble is called a *workflow.*\
    \
    The event represents a trigger (such as a button click), and the actions represent what should happen upon triggering (such as saving a thing in the database).\
    \
    Article: [Workflows](/help-guides/logic/workflows)

[^2]: *Custom states* are variables that you can save on any element on the page, including the page itself. They let you store data temporarily that is reset when the page is reloaded.\
    \
    Article: [Custom states](/help-guides/data/temporary-data/custom-states)

[^3]: To trigger a workflow from a reusable element you use the *Trigger a custom event from a reusable element* action.\
    \
    Reference: [Trigger a custom event from a reusable element](/core-resources/actions/custom#trigger-a-custom-event-from-a-reusable-element)

[^4]: The *element tree* displays all the elements on the current page organized into parent-child relationships.

    Article: [The element tree](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab/the-element-tree)

    Article series: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)

[^5]: A *URL parameter* is a piece of information that you place in the browser's URL. They follow a key-value-pair\[^11] structure and can hold many different types of data.\
    \
    Article: [URL parameters](/help-guides/data/temporary-data/url-parameters)

[^6]: These are Bubble's built-in types such as text, numbers, dates, yes/no, etc.

[^7]: These are the data types that you have created for your app specifically, be it products, articles or something else. They can be given any name and assigned any number of fields.

    Article: [The database](/help-guides/data/the-database)

[^8]: A *hex color code* is a six-digit alphanumeric code that represent colors.

    Each hex color code begins with a hash sign (#) followed by six characters divided into three pairs, each representing the intensity of red, green, and blue in the color.\
    \
    For example, #000000 represents no color intensity in any of the red, green, or blue channels, resulting in the color black.

[^9]: Color variables let you save a palette of colors that you can apply throughout your Bubble app and maintain from one place.

    Article: [Color variables](/help-guides/design/variables-and-styles/color-variables)

[^10]: Yes/no is one of Bubble's basic data types, and simply represents a true or false statement.\
    \
    If you have a traditional coding background, this is similar to a boolean.
