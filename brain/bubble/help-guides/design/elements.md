# Elements
> Source: https://manual.bubble.io/help-guides/design/elements · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers elements – the building blocks that make up your application's user interface

{% hint style="info" %}
This is the long-form article on Bubble's different elements. If you want the short-form technical reference that details all the different element properties, you'll find that in the link below.

Reference: [Elements](/core-resources/elements)
{% endhint %}

Every part of your app's user interface consists of *elements* that are organized in a hierarchy. Each element comes with a set of *style* properties and *responsive* properties. Together, the hierarchy, style properties and responsive properties make up the instructions to the browser that helps it render the page correctly.

Think about it: not only does the browser need to know what elements there are and how they should look, but also how they should behave on different screen sizes and as elements are displayed, hidden and animated on the page.

<details>

<summary>What is the element hierarchy?</summary>

All elements that you add to your page become part of a hierarchy that controls the structure and design of the page.

The page itself is the parent of every other element on the page, and you can group your elements into containers to keep building more parent-child relationships. This forms the basis of how your browser renders the page correctly.

Article: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)

</details>

## Using elements to build a user interface

<figure><img src="/files/4ZzMPmpMOZMDihRFqOPs" alt=""><figcaption><p>Combining different elements like input fields and buttons is how you design your app and give your users different ways to interact with it.</p></figcaption></figure>

Whether you want to create an elaborate presentation page with images and animations or a simple signup form, it's all done by combining different elements in a way that your users find useful and visually appealing.

Bubble offers a lot of different elements serving different purposes.

<figure><img src="/files/8xGeiWxs4tJAwW9UIfHR" alt=""><figcaption><p>A page like this signup form is done by combining different elements like text, input fields, links and buttons to set up an interface that users understand and find useful.</p></figcaption></figure>

In this section we'll cover the different categories of elements that you can place on the page

{% hint style="info" %}
Plugins can also sometimes add new elements that you can place on the page, adding functionality ranging from very simple to very advanced.

Check out out [plugin store](https://bubble.io/plugins) for information and inspiration.
{% endhint %}

Elements cover a wide range of different things you can place on the page and they are split into three different categories:

## Visual elements

Visual elements are the elements that you place on the page primarily for aesthetic purposes or to display information. They do not accept [data input](#user-content-fn-1)[^1], but they do accept clicks and some of them – such as buttons – are usually connected with workflows[^2].

<figure><img src="/files/6cIvv6znSo3L5KBlevIl" alt=""><figcaption><p>Visual elements let you design your page to display information and accept clicks. All the elements in this example are visual elements: text, an image and a button respectively.</p></figcaption></figure>

Examples include:

* buttons
* images
* text
* icons
* videos
* maps
* links
* shapes

Article: [Visual elements](/help-guides/design/elements/web-app/visual-elements)

## Containers

Groups are elements that contain other elements. A group serves two purposes:

* It gathers other elements (including other groups) inside one container. All the elements belong to the same level of the [page hierarchy](#user-content-fn-3)[^3] and follow along if the group is moved or deleted.
* A group can also be used to hold data relevant to the elements inside of it. For example, one group may contain an *Edit user* form with different elements to edit the user's details such as name and phone number.In that case, the group's data type would be user, allowing all elements inside to reference that user.

<figure><img src="/files/giLHZKHIX1Q5PwaPNapE" alt=""><figcaption><p>Groups can be used both to organize elements like the form above, and to hold the data that you want to work with, such as a user. The group is highlighted with a dashed border in the example.</p></figcaption></figure>

Bubble offers several different group types that serve different purposes:

<table><thead><tr><th width="174">Container type</th><th>Purpose</th></tr></thead><tbody><tr><td><a href="/pages/0InSA6TX3K40sT0u4F83">Group</a></td><td>Hold elements and data anywhere on the page</td></tr><tr><td><a href="/pages/F2Z6HIq5lrrnkRUAKQbg">Repeating group</a></td><td>Show a list of things in a flexible design such as cards, lists, and a masonry grid</td></tr><tr><td><a href="/pages/xNR63E81QtKAbMSiK90O">Table element</a></td><td>Show a list of things in rows/columns with headers</td></tr><tr><td><a href="/pages/vSeYGneOPOJmfX4xfS1u">Popup</a></td><td>Display elements on top of everything else, such as a warning message</td></tr><tr><td><a href="/pages/1fNX5lhkwMiZUxo4mHsI">Floating group</a></td><td>Hover elements above other elements and stick them to one of the screen edges, like a top navigation bar that stays put</td></tr><tr><td><a href="/pages/uDrZfAW9NewNRUhmyEfB">Group focus</a></td><td>Display a group that disappears as soon as you click anywhere else, such as a dropdown menu</td></tr></tbody></table>

Read more about these properties in the full article on containers:

Article series: [Containers](/help-guides/design/elements/web-app/containers)

## Input forms

Input forms are elements that allow your users to provide data to your application, such as:

<table><thead><tr><th width="209">Element</th><th>Purpose</th></tr></thead><tbody><tr><td><a href="/pages/9usn2lynDsMjIzGqjm6r#text">Text input</a></td><td>Names, comments, other short info</td></tr><tr><td><a href="/pages/9usn2lynDsMjIzGqjm6r">Multiline text</a></td><td>Descriptions and other longer text. Allows line breaks.</td></tr><tr><td><a href="/pages/uNmsNaHIMteorQ6PaDIa">Checkbox</a></td><td>Check to hold a yes/no value, such as accepting terms and conditions</td></tr><tr><td><a href="/pages/9usn2lynDsMjIzGqjm6r">Rich text</a></td><td>Formatted text, like blog posts and product descriptions</td></tr><tr><td><a href="/pages/uNmsNaHIMteorQ6PaDIa">Dropdowns</a></td><td>Pick an option from a dropdown list, either static or from the database</td></tr><tr><td><a href="/pages/uNmsNaHIMteorQ6PaDIa">Search box</a></td><td>Search-as-you-type in the database</td></tr><tr><td><a href="/pages/uNmsNaHIMteorQ6PaDIa#radio-button">Radio buttons</a></td><td>Select one option out of multiple</td></tr><tr><td><a href="/pages/uNmsNaHIMteorQ6PaDIa#slider-input">Slider input</a></td><td>Pick a numerical value with a visual, draggable slider</td></tr><tr><td><a href="/pages/yU4rI57C4wpL8CQuejLA">Date/time picker</a></td><td>Dates like birthdays, deadlines, etc</td></tr><tr><td><a href="/pages/yF6fIrsbNIvkMzWEmd8K#image-uploader">Picture uploader</a></td><td>Upload and preview images like profile pics</td></tr><tr><td><a href="/pages/yF6fIrsbNIvkMzWEmd8K#file-uploader">File uploader</a></td><td>Upload other types of files</td></tr></tbody></table>

Read more about each element in the dedicated input forms article:

Article series: [Input forms](/help-guides/design/elements/web-app/input-forms)

## Element behavior

Elements can be set to behave in different ways depending on specific circumstances or actions that your users take. There are two ways in which elements can become interactive:

### Conditions

**Conditions** allow you to set rules for each element that changes how the element looks depending on whether the rule [returns a yes or a no](#user-content-fn-4)[^4]. All aspects of element styling can be manipulated with these rules, and this opens up powerful ways to communicate with your users, ranging from subtle nudges to hiding and showing entire sections of the page.

{% hint style="info" %}
If you want to learn more about how to use conditions, check out our dedicated article on the subject:

Article: [Conditions](/help-guides/logic/conditions)
{% endhint %}

To see how this can be used in different scenarios, let's go over some examples:

* A condition could be set up on a button to check whether a form is properly filled or not, and style the button to be greyed out and unclickable if it isn't
* A condition could be set up on a group to check whether the current user is logged in. If not, the group is invisible.
* A condition on a group could be set up to check a parameter in the browser's URL. If the parameter is present, the group is visible.

### Workflows

{% hint style="info" %}
If you want to learn more about how to build workflows, check out our dedicated article on the subject:\
\
Article: [Building workflows](/help-guides/logic/workflows)
{% endhint %}

The second way to make elements on your page interactive is to connect them to **workflows.** A workflow is the umbrella term for an **event** (such as a button click) that leads to one or more **actions** (such as writing something to the database).

<figure><img src="/files/hSA6ohISkg2sxudIaUFe" alt=""><figcaption><p>A workflow consists of an event and a chain of actions. The event is often triggered by an element on a age such as a button.</p></figcaption></figure>

Using actions is how you get your app to perform specific tasks, such as:

* Creating, editing or deleting something in the database
* Logging users in and out
* Showing, hiding and animating stuff on the screen
* Navigating to a different page or external link

This is not the full list by any means, but as you can see there are many different actions you can run as a user clicks and types their way around your app.

A workflow can consist of multiple actions chained together. For example, after saving something in the database, you may want to display a confirmation message to your users.

<figure><img src="/files/FOOrsjsaDjUnb0MlLAjY" alt=""><figcaption><p>You can chain multiple actions together after a button click. In the example above we're saving some changes on the user and then showing a success message.</p></figcaption></figure>

## Naming elements

You can edit the name of your element in the top of its Property Editor. Select the existing name and start typing. Conventions for naming your elements is entirely up to you. For example, you could simplify each element name and write what it does next to it, such as “btn submit," or you could capitalize the first word all together or use underscores. Whichever convention you pick, make sure to use it throughout your app. The consistency will help you locate your elements and debug your design as your app grows.

<details>

<summary>Video lesson</summary>

* [Quick tip: Naming your elements](https://youtu.be/TTHxOghuBjU)

</details>

{% hint style="info" %}
Always use singular names for your data types, such as *Product* instead of *Products.* Bubble has a built-in functionality for word inflection. This means that a singular noun will automatically be recognized and displayed in the appropriate plural form of the word when referring to multiple instances of that noun.\
\
In other words, Product will shows as Products whenever it makes sense.
{% endhint %}

By default, Bubble names new elements by its type. If we add a button, Bubble will name it "Button A" if there are no other buttons on the page, or "Button B" if there is a button already. If you change the contents of that element to include text, Bubble will take that text and change the name of the element for you. For example, if we change this button's text to "Submit," the name will update to "Button Submit." You might have several "Submit" buttons throughout your application, so it's a good practice to name your elements as you go along so that you can keep track of each.

## Finding elements

If your page has many elements, you may find it difficult to find elements to edit them. Here are a few ways you can find them easily.

### The element picker

Use the Element picker in the toolbar. All the page elements are listed alphabetically; you can start typing a name and you'll see the different elements.\
\
When you hover an entry in the dropdown you will see a thumbnail to confirm this is the right element, and clicking on it will show it and select it. To make the best use of this, you should take the habit of naming your elements carefully.

<figure><img src="/files/rbCDB7OxLFCRtMTw1YN0" alt=""><figcaption><p>The element picker is the fastest way to search for and select an element.</p></figcaption></figure>

### Using mouse clicks

When two elements overlap, clicking on them by pressing CMD (MacOS) Ctrl (Windows) will select each element one-by-one, even if one is completely under another.

Using this, you can select the element under all the others, without modifying your page layout.

### Using the X-Ray feature

Clicking on the 'X-Ray' icon will make elements semi-transparent, which is handy combined with the CMD+click (MacOS) Ctrl+click (Windows) operation above.

### Using the element tree

The [Element Tree](#user-content-fn-5)[^5] gives you a clear hierarchic view of all the elements on your page and is an easy way to select (and even move) the elements that you need to.

### The App Search Tool

The App Search tool can be used for more advanced search parameters and searching across pages. It's found in the upper right corner of the Bubble editor.

<figure><img src="/files/KwDFk6LdRHTE1PWaeYE5" alt=""><figcaption><p>The App Search tool lets you search for specific element types and the text they contaon – even across pages.</p></figcaption></figure>

You can read more about the search tool in the article below.

Article: [The search tool](/help-guides/getting-started/navigating-the-bubble-editor/tools/the-search-tool)

<details>

<summary>Video lesson</summary>

* [How to find anything using the app search tool](https://youtu.be/ks6WkQ--ESY)

</details>

## Locking elements

If you find yourself moving some elements that should never be moved, you can add some protection in the Editor by checking the box *Lock this element (not draggable in editor)*.

<figure><img src="/files/covxj9dNVtlf3lEqyrKh" alt=""><figcaption></figcaption></figure>

This is purely for editing purposes, and can be handy when working on complex pages.

## Using the Inspector to find Element connections

An element can be connected to other parts of your app in many different ways: they can hold custom states, belong to a parent container, be used in a workflow or be referenced in an expression or condition somewhere.

To keep track of how elements are connected to different things you can use the Element inspector. This shows you element connections categorized by:

* [Custom states](#user-content-fn-6)[^6]
  * Create, edit and delete custom states on the element
* Events[^7]
* Actions[^8]
* Other elements

To reveal the Element Inspector, click on the information icon in the title bar of the property editor.

![The Inspector gives you a useful look at different types of connections to the element you are looking at.](https://gblobscdn.gitbook.com/assets%2F-M5sbzwG7CljeZdkntrL%2F-M5smrJkMfjcu6xQRWw4%2F-M5smu57kdySNibvmg3P%2Finspector.gif?alt=media)

## Element security

Even though Bubble is a no-code platform, the final application consists of code so that a browser knows how it should look and function. The elements that you place on the page become a part of this code, which is downloaded to the device of every user who loads the page.

This means that a tech-savvy user can open up the code file and have a look at the elements. From a security perspective, this means that you should never place any sensitive information in an element. Even if it's not visible in your app, it can still be revealed in the code.

Places where you should keep this in mind are in the element name, text content and default values.

{% hint style="warning" %}
A good rule of thumb for element security is to assume that all information you add to a page, whether in elements or workflows, can be viewed by a user in the code. As such, you should avoid placing sensitive information on the page.
{% endhint %}

## Other ways to learn

<details>

<summary>Video lessons</summary>

* [Searching for elements](https://youtu.be/7N5MNPdAOmA)
* [How to swap element positions](https://www.youtube.com/watch?v=04dDc9VaW2Y)

</details>

[^1]: Data input in this context means elements that allow the user to provide some sort of data such as text, numbers, dates and uploads.

[^2]: *Workflows* is where you tell Bubble to perform one or more actions, such as making changes in the database, hide and show things on the screen and navigation.\
    \
    This is what you would connect to a button in order for something to happen when you click it.\
    \
    Article: [Building workflows](/help-guides/logic/workflows)

[^3]: Pages that you set up in Bubble are structured like a hierarchy where the page is the bottom level and all the containers and groups placed on it make up different levels.\
    \
    Article: [The page](/help-guides/design/elements/web-app/the-page)

[^4]: With conditions, you can set up an expression to check whether something is true or not.

    \
    For example, you can instruct Bubble to check whether the current user is logged in or not. If the user *is* logged in, the condition is true and returns a *yes.*

[^5]: The *element tree* is the list of elements organized in a hierarchy that you can see on the left side of the Bubble design editor.

    \
    Article: [The element tree](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab/the-element-tree)

[^6]: Custom states are variables that can be defined and used within a page, reusable element, or workflow to store information that can be referenced or updated throughout the application.

    \
    Custom states are reset when the page is refreshed, meaning that they are not intended to store data in permanent way.

    \
    Article: [Custom States](broken://pages/-MTk7oXWNllHSl-oVg_5)

[^7]: An *event* is the part of a workflow that *triggers* it. For example, you can start running a workflow whenever a button is clicked. In that case the button click is the event.\
    \
    In the context of the Property inspector, it will show Events connected to the relevant element. For example, an event that register a button click would be present in the Property inspector of that button.

[^8]: An *action* is a command that's executed as part of a workflow. They can be used to perform a wide range of tasks, such as creating or modifying data, displaying an alert or popup or navigating to a new page.\
    \
    In the context of the Property inspector, it will show any action that is connected to the relevant element somehow. For example, if you have an *animate* action on a text element, that action will show up in the Property inspector of that element.\
    \
    Article: [Workflows](broken://pages/-MTg7yxfYGtVIgVqqLOT)
