# Single-page applications (SPA)
> Source: https://manual.bubble.io/help-guides/logic/navigation/single-page-applications-spa · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers navigation of single-page applications

A single-page application dynamically updates and displays content within a single page, without requiring page reloads. This is done by simultaneously hiding and showing containers on the page so that the content of one replaces the other.

Single-page applications can be very quick to navigate and use, since you don't need to keep reloading the page. This also means that any data that you have loaded onto the page (such as a *Do a search for)* will remain in memory on that page until it's reloaded so that you don't need to load the same content repeatedly.

If you build a very complex single-page app with hundreds or even thousands of elements and workflows, this can start slowing down the page, especially on page load. So while your app can be faster to navigate after page load, the initial loading can be a bit longer, since the page contains more code.

There's no black and white answer for when to choose what, but many developers choose to go with combination of a single-page app and a multi-page app where they place all the app's most-used features on one SPA page, and move the lesser used features to other pages. This way, the daily use of the app will be snappy, and you avoid a long page load time.

Keep in mind what your app is for: users of a tool like a project management or HR app may not mind that the initial page load time is a bit longer, while your users may be less forgiving if it's an eCommerce app or blog.

## The structure of SPAs

A single-page application relies on *containers* to update their content, and the *group* container in particular. While the containers can be hidden and displayed using actions, they are more commonly set up to have *conditions* that determine whether the group is showing or not.

<figure><img src="/files/sUTqyGR4XcVGLClgRoo8" alt=""><figcaption></figcaption></figure>

The example above uses URL parameters to determine whether the group called *Form 1* is visible or not (we'll return to that method later in the article).

The logical structure for most SPAs is that whenever the group is hidden, another group takes its place: Bubble switches their position instantly, and the user is unaware of the actual structure of the page; all they see is elements that instantly hide and show depending on the user's actions.

{% hint style="info" %}
To understand how containers replace each other by collapsing their own height and width, we recommend getting to know how the responsive engine works. If you are new to this, you may be interested in checking out the article below:

Article: [Responsive design](/help-guides/design/responsive-design)
{% endhint %}

## Setting up the page

In a single-page application, the best way to set up your groups is to place them directly on top of each other. That way, when one group goes invisible and another takes its place, the switch seems instant to the user, and the page maintains a height relative to its visible elements.

<figure><img src="/files/UnJAGg56lKiJLg0LhAio" alt=""><figcaption><p>In this example, we have two groups placed on top of each other. When one his hidden, it collapses its height and the other group takes its place. To the user, the switch is instant.</p></figcaption></figure>

For this to work, we need to ensure that some key settings on the elements are set up:

<figure><img src="/files/Jakc7X0Iix3AJCKrZBPj" alt=""><figcaption></figcaption></figure>

1. First, navigate to the Layout tab
2. Make sure that the *Collapse when hidden* box is checked. This instructs Bubble to reduce the height of the group to 0 pixels, so that the group below can take its place
3. Leave the *Animate the collapse operation* unchecked. If the change is animated, the switch will not be instant.

Note also that *This element is visible on page load* is unchecked. This means that the group will be invisible by default, and we'll set up a condition to make it *visible.*

## Using conditions

{% hint style="info" %}
On pages that consist of a many groups, using conditions can be easier to keep track of. However, on pages that only have a few elements hiding and showing, actions can be quicker to set up.
{% endhint %}

Most apps will use of two options for navigation: custom states or URL parameters. Both are perfectly good solutions that come with their own pros and cons:

[**Custom states**](#user-content-fn-1)[^1] are variables that you can save temporarily on an element and reference in a condition to show and hide elements. They are invisible to the user, meaning that your users will only see the result, as opposed to URL parameters where they will see a change in the URL. A custom state needs to either have a default value on page load, or be set using an action.

[**URL parameters**](#user-content-fn-2)[^2] add a parameter to the URL of the page, and you can reference this parameter in a conditional expression. The user can see that the URL changes and use the browser's back button as if they were visiting a new page. Users can also use the URL (such as sharing the URL or bookmarking it) to visit the same section of your SPA's later, whereas a custom state must be set by an action in your app.

There is no best practice for which method to choose, but we recommend getting to know each of them. If you want your users to be able to use the browser's back button (which is an expected behavior in Android apps) for example, you'll find it easier to set up using URL parameters. If you *don't* want your users to be able to go back in that way, or you don't want them to be able to manipulate the URL parameters, you are better off going with custom states.

### Custom states

{% hint style="info" %}
If this is your first time setting up a custom state, you may find our dedicated article useful:

Article: [Custom states](/help-guides/data/temporary-data/custom-states)\
Reference: [The set state of an element action](/core-resources/actions/element#set-state-of-an-element)
{% endhint %}

Custom states need to contain a default from page load or be set by an action. They are connected to an element of your choice. In this example we'll save the custom state on the page itself: *index*.

#### Setting a default value

To set a default value, follow the steps below:

<figure><img src="/files/biybxPGuDMMj4gY5lpz3" alt=""><figcaption></figcaption></figure>

1. First, open the element inspector of the page.
2. Then, click the small ⓘ symbol in the top bar of the inspector
3. If you don't have the custom state set up, click *Add a new custom state*, and give it a name[^3]. In the type dropdown, we'll leave it as *text*.
4. In the [*Default value*](#user-content-fn-4)[^4] field we'll set the string *form1*.

#### Setting the value with an action

Whenever you need to change the value of a custom state you use the [*Set state of an element*](#user-content-fn-5)[^5] action:

<figure><img src="/files/57yrmRr2G3c93gltJRqC" alt=""><figcaption></figcaption></figure>

1. First, add the *Set state of an element* action to a workflow of your chocie
2. Then, we'll chose which element the custom state is saved on. In this example, we placed it on the page, so we'll choose *index*
3. If you have already created the custom state in the last step, you can choose it here. If not, you can select *Create a new custom state*, set its type to *text* and give it the name *nav*.
4. In the value field, Bubble will ask for a *text* since this is the type we set for that custom state. You can then type in the value. In this example, we are assuming that the custom state had the default value of *form1* that we set in the previous steps, and we'll set it to *form2* so that this action switches visibility between the two groups.

#### Reading the data in the URL parameter

To set up the condition on the group element, we'll need to use a dynamic expression to check its value.

<figure><img src="/files/7ZedklHRQDsoPhs48ePE" alt=""><figcaption></figcaption></figure>

First, select the group element that you want to show with this condition. Double-click it to open up the element inspector.

**When:** this is the condition that instructs Bubble *when* to style the element. We saved the custom state on the *index* element (the page), so search or click on *index* as the data source of the expression. With index selected you will see the *nav* custom state available as an operator.

**Properties:** In the *Select a property to change when true* dropdown, we selected *This element is visible*. Note that the box is *checked –* this is because we set the group to be invisible by default, so we need the condition to make it visible.

You'll need to set up the condition on each group element that you want to show/hide, and provide a different value to each of them, such as *form2* and *form3.*

### URL parameters

<details>

<summary>Related articles</summary>

If this is your first time setting up URL parameters, you may find our dedicated article useful:

Article: [URL parameters](/help-guides/data/temporary-data/url-parameters)\
Reference: [The Get data from page URL data source](/core-resources/data/data-sources#get-data-from-page-url)

</details>

Let's look at how this would look if you set it up using URL parameters. URL parameters are pieces of data that you can place in the URL of the browser, consisting of a *key* and a *value*.

#### Setting the URL parameter

You can set a URL parameter by having it present in the URL when the page is loaded (by following a link for example) or by using the *Go to page* action. In this example, we'll do the latter:

<figure><img src="/files/YQDuSJ6RjSMSExAagnSh" alt=""><figcaption></figcaption></figure>

1. First, we'll add the [Go to page](#user-content-fn-6)[^6] action to a workflow. The event of the workflow can be whatever you need, such as a button or text being clicked.
2. We are setting the *Destination* to be the same as the page we are already on: the *index* page.
3. If you have multiple URL parameters and you want the existing parameters to remain in the URL, you can check *Send current page paramerets*. In the case of this example we only have one, so we'll keep this unchecked.
4. Check the box *Send more parameters to the page*. This is how you set one or more URL parameters. Click the *Add another parameter* button to create a new row. You will be asked for a *key* and a *value*. We'll set the key to *nav* and the value to *form1*. The string you provide in key and value do not affect how the URL parameter works, but keep in mind it will be visible to your users in the browser's URL bar.

{% hint style="info" %}
To ensure compatibility with all browsers, we recommend giving the key and value fields values that are [URL encoded](#user-content-fn-7)[^7]: lowercase strings with no special characters or spaces.
{% endhint %}

#### Reading the data in the URL parameter

To read the URL parameter we just set, we'll set up a dynamic expression in the *Conditional* tab of the first group. Let's return to the screenshot from earlier and go over how it works:

<figure><img src="/files/sUTqyGR4XcVGLClgRoo8" alt=""><figcaption></figcaption></figure>

**When:** this is the condition that instructs Bubble *when* to style the element. We are using the *Get data from URL* data source, and the name (key) of the URL parameter is *nav*. You can use whichever name you want – just keep in mind that your users will see it in the URL bar.

**Properties:** In the *Select a property to change when true* dropdown, we selected *This element is visible*. Note that the box is *checked –* this is because we set the group to be invisible by default, so we need the condition to make it visible.

To summarize then logic, let's look at the condition as a humanly readable sentence:

{% code overflow="wrap" %}

```
When the URL parameter called nav contains the text form1, make this element visible.
```

{% endcode %}

To make this logic work on your other groups, simply set up the same condition on them, but change the *value* of the URL parameter, such as *nav=form2* and *nav=form3.*

## Using actions

You can also show and hide elements using actions. The result to the user will be the same, so we are simply using a different method to reach the same goal.

{% hint style="info" %}
On pages that consist of a few groups, using actions can be quicker to set up. However, on pages that have a lot of elements hiding and showing, conditions can be easier to keep track of.
{% endhint %}

#### Using the show/hide an element actions

To instruct Bubble to show or hide an element we have two actions to choose from [*Show an element*](#user-content-fn-8)[^8] and [*Hide an element*](#user-content-fn-9)[^9]. Note that these are separate actions and not the same one:

<figure><img src="/files/wxAZo6eNnQI9I68kRGao" alt=""><figcaption></figcaption></figure>

1. First, add the *Show an element* action to a workflow of your choice
2. Then, select the element that you want to show. In this case we want to show the group called *Form 1.*

#### Using the toggle an element action

If you want the same action to toggle the visibility of the element, you can use the [*Toggle an element*](#user-content-fn-10)[^10] action. This will do exactly the same as the show/hide an element actions, except you only need one action:

<figure><img src="/files/fsb9xoaZd8b5C02PObGE" alt=""><figcaption></figcaption></figure>

1. First, add the Toggle an element action to a workflow of your choice
2. Then, select the element to toggle. In this case we want to toggle the group called *Form 1*.

## Other ways to learn

<details>

<summary>Video lessons</summary>

* [How to use the toggle action to show/hide elements](https://www.youtube.com/watch?v=gDqAc9hj6Mc)

</details>

[^1]: Custom states are variables that you can save on any element on the page, including the page itself. They let you store data temporarily that is reset when the page is reloaded.

    This is useful when you need your app to remember some information that you don't need to store permanently in the database.

    Article: [Custom states](/help-guides/data/temporary-data/custom-states)

[^2]: A URL parameter is a piece of information that you place in the browser's URL. They follow a key-value-pair\[^11] structure and can hold many different types of data.

    Article: [URL parameters](/help-guides/data/temporary-data/url-parameters)

[^3]: The name and value of a custom state is not visible to your app's users, but can still be revealed in your app's source code, which is downloaded to the user's device when the page loads.

    As such, be mindful of the name and value you provide: never store any sensitive information in either field.

[^4]: The default value of a custom state will be set on page load.

    Note that whenever you clear the value of a custom state in an action, it will return to this default value, rather than be cleared.

[^5]: The *Set state of an element* action sets a value to one or more custom states on a given element.\
    \
    Article: [Custom states](/help-guides/data/temporary-data/custom-states)

    Reference: [The Set state of an element action](/core-resources/actions/element#set-state-of-an-element)

[^6]: The *Go to page* action serves two purposes: it can take the user from one page to another (just like a link), or it can make changes to the current page by loading a new page thing or making changes to URL parameters. In the case of the latter, the page will not reload, but instantly apply the changes.

    Reference: [Go to page](https://manual.bubble.io/help-guides/logic/navigation/pages/-MTujrgFLiHe7MfwSBOF#go-to-page-...)

[^7]: URL encoding means to convert special characters and spaces in a URL into a standardized format, using percent signs followed by two hexadecimal digits. This is to ensure that the URL will be compatible with all browsers.\
    \
    Bubble has a built-in operator for URL encoding a string.\
    \
    Reference: [Format as: URL encoded](https://manual.bubble.io/help-guides/logic/navigation/pages/-MTpydODwo34mk5NucJy#formatted-as-...)

[^8]: The *Show an element* action will instantly show any element on the page.

    Reference: [Show an element](/core-resources/actions/element#show-an-element)

[^9]: The *Hide an element* action will instantly show any element on the page.

    Reference: [Hide an element](/core-resources/actions/element#hide-an-element)

[^10]: The *Toggle an element* action will set an element's visibility to the opposite of its current value: if it's visible, it will become invisible, and vice versa.

    Reference: [Toggle an element](/core-resources/actions/element#toggle-an-element)
