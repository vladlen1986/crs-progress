# Containers
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/containers · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers the container elements, used to group and control the behavior of other elements

{% hint style="info" %}
This section takes a long-form look at what containers are and how you can use them in different situations.\
\
To see the full list of settings available on container elements, you can check out our more concise [core reference entry on containers](/core-resources/elements/containers).
{% endhint %}

<figure><img src="/files/giLHZKHIX1Q5PwaPNapE" alt=""><figcaption><p>Containers can hold elements like the form in the example above. Here we're using a <a href="/pages/0InSA6TX3K40sT0u4F83"><em>group</em></a> element.</p></figcaption></figure>

All elements[^1] on your page are part of a hierarchy with the page as the top parent.

Containers are used to contain elements and control how they behave on the page. You can place elements inside of a container, making it the parent and the element(s) its children. The [element tree](#user-content-fn-2)[^2] will display the hierarchy of the parent-child relationship.

Bubble has six container types that behave in different ways. Knowing how the different types behave is the key to mastering design in Bubble, so we recommend spending some time getting to know their behavior.

Click on each container type for more information and a link to the full article:

<details>

<summary><mark style="color:blue;">Groups</mark> – placed directly on the page to build the page hierarchy</summary>

Groups are the most basic container type and can be placed directly on the page to build a hierarchy of parent-child relationships. They are used to contain elements, control responsive behavior, navigation and to hold data.

Article: [Groups](/help-guides/design/elements/web-app/containers/groups)

</details>

<details>

<summary><mark style="color:blue;">Repeating groups</mark> – used to display lists of things in a flexible design</summary>

Repeating groups are similar to groups, but will repeat its content once for each item in a list of things such as database records. Repeating groups are used to display lists such as (but not limited to) a list of users, a search result, product cards and photo masonry grids. A repeating group allows you to design lists in a flexible way, and the table element (below) lets you set up a more structured table with fixed row/column headers.\
\
Article: [Repeating Groups](/help-guides/design/elements/web-app/containers/repeating-groups)

</details>

<details>

<summary><mark style="color:blue;">Table element</mark> - used to display a list of things in neat rows and columns</summary>

Table elements are similar to repeating groups in that it shows a list of things, but unlike the repeating group container a table can have fixed row/column headers and is useful for setting up more strict table-like structures.

Article:[ The Table element](/help-guides/design/elements/web-app/containers/table-elements)

</details>

<details>

<summary><mark style="color:blue;">Popups</mark> – display a group above all other elements (i.e. a message or signup form)</summary>

The *Popup* group type is a a group that is displayed above all other elements and is centered on the screen regardless of the scrolling position of the page. They can be set up to hide or blur the page below. As such, they are a useful way to bring an important message or forms to the user's attention immediately.

Article: [Popups](/help-guides/design/elements/web-app/containers/popups)

</details>

<details>

<summary><mark style="color:blue;">Floating groups</mark> – hovers above page attached to a screen edge (i.e. navigation bar)</summary>

Floating Groups are a group type that can be set up to hover above other elements on the page and they can be attached to any side of the screen and stay there regardless of whether the user scrolls up and down.

Article: [Floating Groups](/help-guides/design/elements/web-app/containers/floating-groups)

</details>

<details>

<summary><mark style="color:blue;">Group focus</mark> – remains visible as long as it's in focus (i.e. dropdown menu)</summary>

The Group Focus has two main characteristics:

* It will remain visible only for as long as it is in focus. *Focus* in this context means until you click anywhere else on the page.
* They are displayed relative to another element by a set number of pixels

This makes the Group Focus very useful for things like dropdown menus, contextual menus and tooltips.

Article: [Group Focus](/help-guides/design/elements/web-app/containers/group-focus)

</details>

## Styling containers

Containers can be set to be invisible, but they can also have a background style, roundness, borders and shadows, just like other elements.

<figure><img src="/files/HnLIXBVtNQiXXzJzMhAX" alt=""><figcaption><p>Groups can be invisible, like on the left, or they can be styled. The right group has a white background color, rounded corners and a shadow.</p></figcaption></figure>

You access a group's styling settings by double-clicking it or by clicking on it in the element tree.

## Loading data into containers

Containers are not just visual elements; they can also be used to hold different kinds of data. For example, if you are working on a form that lets you edit a user (with input fields for name, phone number and address), you can set the containers data source to *User* and load the user data into the container.

The data loaded into the container is then made available to all of its child elements. This allows you to load specific data into parts of a page, such as in the example below where we are loading the data about a user into the container:

<figure><img src="/files/O74DbiaJnTbI9sZNATEx" alt=""><figcaption><p>You can load data into a group to easily reference it in other elements and workflows.</p></figcaption></figure>

### Referencing data in elements

In the example above, we have loaded the current user into the container, and it lets us easily reference the user in the [input elements](#user-content-fn-3)[^3] in the form:

<figure><img src="/files/CYmBttqQaLie77brhv3W" alt=""><figcaption><p>By loading data into a group we can reference that data in the group's child elements. In the example above we're loading the user's name into an input field.</p></figcaption></figure>

In the illustration above, the container is loading the current user, and we can use that information in the container's child elements. In the screenshot, we're looking at the settings for the input field. We're referencing the *Parent groups's User's name*.

### Referencing data in workflows

The same can be done with workflows[^4]. In the example below, we want the *Save changes* button to save the data from the input fields to the database. By referencing the parent group's user, we can save it easily:

<figure><img src="/files/9eUCB8Ihzwq8lW633MRk" alt=""><figcaption><p>If an element like a button is placed within a group that holds data, we can reference that data in workflows connected to that element. In the example above we're referencing the user loaded into the parent group of the button.</p></figcaption></figure>

{% hint style="info" %}
Referencing the parent group's data in a workflow requires that the event that triggers the workflow is connected to one of the container's child elements. For example, a Save button inside of the container could trigger a workflow that saves changes from the form.
{% endhint %}

Referencing data in elements and workflows can be done on all group types, including the cells[^5] of a [Repeating Group](#user-content-fn-6)[^6].

### Different ways of loading data

There are two different ways to load data into a container:

* You can set the *Data source* of the container to load data. In the example above we are loading the *Current user*, but you can also fetch it in other ways, such as performing a database search using *Do a search for.*<br>

<figure><img src="/files/EngPjAIjzuQwO3xuS10Y" alt=""><figcaption><p>Setting the <em>Type of content</em> to User and the <em>Data source</em> to Current user instructs Bubble to load the data about the current user into the container</p></figcaption></figure>

* You can use a workflow to push data to the container. This is useful when you want the loading of data to be the result of a user action.

  <figure><img src="/files/1VOSuCPgVUH67AV9K9b4" alt=""><figcaption><p>In this example we are using the <em>Display data in group/popup</em> action to search for a user and load its data into the group. We'll then be able to reference the loaded user in elements and workflows contained within the group.</p></figcaption></figure>

The first method will load the data as soon as the page is loaded, while the second will await a trigger to execute the workflow. You could also use the latter method to allow the user to select which user they want to edit.

## Resetting a container

You can reset a container to wipe the thing that is displayed in it. When you use a reset group action, the thing will be reverted to what was defined as the datasource. This is useful to note since reset doesn't mean *empty* – it means reset to its initial state.

<figure><img src="/files/DSpwWnFmt3icgrusg3BA" alt=""><figcaption></figcaption></figure>

Whenever you change the content of a container, it's effectively being reset and displaying the new thing. This means that all child elements (such as input fields containing text) will update their content to reflect the data being loaded into its parent container.

Note that whenever the content of a group changes, the group effectively is being reset and a new thing is being displayed in it.

## Groups and responsive settings

You can use groups to control the responsive behavior of the elements inside of it. For example, if you have three input fields that you want to never be more than 200 pixels wide, you can set the maximum width on the group that holds them. That way, the max width are applied to all of the elements and you don't need to apply it one by one.

{% hint style="info" %}
You can read more about responsive design in our Responsive design article series.\
\
Article series: [Responsive design](/help-guides/design/responsive-design)
{% endhint %}

Using groups to control responsive behavior is the key to efficiently set up a responsive design.

<figure><img src="/files/qEwwfuEXIqVSrVxJMPI4" alt=""><figcaption><p>In this example, we have set the max width of the group to be 480 pixels. This way, we also control the width of the elements inside of that group.</p></figcaption></figure>

[^1]: Elements is the umbrella term for all the things you can place on a Bubble page such as text, buttons, images and groups.\
    \
    Article: [Elements](/help-guides/design/elements)

[^2]: The *element tree* is the list of elements organized in a hierarchy that you can see on the left side of the Bubble design editor.\
    \
    Article: [The element tree](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/design-tab/the-element-tree)

[^3]: Input elements are elements that accept some sort of data from the user, such as a string of text or a number.\
    \
    Article: [Input forms](/help-guides/design/elements/web-app/input-forms)

[^4]: Workflows are the engine of your application – they are how you instruct Bubble to respond to what the user does, such as clicking a button, with a set of actions that can do anything from hiding/showing or animating things on the page to making changes in the database and make external API calls.

    A *workflow* is the combination of an *event* that triggers one or more *actions*.

    Article series: [Workflows](/help-guides/logic/workflows)

[^5]: In a Repeating Group, each record displayed in the list is known as a *cell.*

[^6]: A Repeating Group is a container type that lets you repeat the content of a group once for each record in a list of data.\
    \
    Article: [Repeating Groups](/help-guides/design/elements/web-app/containers/repeating-groups)

    Reference: [Repeating Groups](/core-resources/elements/containers#repeating-group)
