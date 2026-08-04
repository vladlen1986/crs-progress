# The view element (mobile)
> Source: https://manual.bubble.io/help-guides/design/elements/ios-and-android-app/the-view · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" icon="mobile-button" %}
The page is the element at the top of the hierarchy in a **mobile app**. For web apps, see [the page](/help-guides/design/elements/web-app/the-page).
{% endhint %}

A view is the top-level element in a native mobile app, serving the same role that a page does in a web app. Every mobile screen your users interact with is a view, and everything else on the screen sits inside it.

<figure><img src="/files/bfZAK55NuuCQCdBY08SL" alt="The view canvas of the mobile app editor."><figcaption><p>The view is the top-level element in a native mobile app.</p></figcaption></figure>

If pages are canvases in a web app, views are the canvases of a mobile app.

## What a view is

A view is a full-screen container that holds all the elements that make up a screen in your app. Instead of loading separate URLs like a web app does, a mobile app moves between views within a single app shell.

This has a few important implications:

* **No URLs.** Views don't have their own web addresses. Users navigate between views through your app's UI, not by typing a URL or clicking a link.
* **Instant transitions.** Because there's no page reload, moving between views is fast.
* **Preserved state.** Data loaded into one view can be preserved as users move between views, depending on the navigation pattern.

Typically, each view represents a distinct screen. A social app might have views for a home feed, a profile, a settings page, and a compose screen, each designed and configured independently.

### Lists

Mobile views differ from web pages in that they can hold regular content (elements placed on the view) or fullscreen lists. Instead of building lists with elements, you can set the view's type to vertical list or section list.

You can read more about this [below](#view-types).

## Views vs. pages

Views serve the same purpose as pages, but with a few key differences. The main distinction is that you don't choose between them: views are for mobile apps, and pages are for web apps. Beyond that, there are some functional differences worth being aware of:

<table><thead><tr><th width="173.24609375">Aspect</th><th>Page (web)</th><th>View (mobile)</th></tr></thead><tbody><tr><td><strong>Access</strong></td><td>URL-based, accessible directly by typing the address</td><td>Reached through navigation inside the app</td></tr><tr><td><strong>Transitions</strong></td><td>Full-page reloads</td><td>Instant, native transitions</td></tr><tr><td><strong>Availability</strong></td><td>Anyone with the link can attempt to visit</td><td>Only accessible through the app itself</td></tr><tr><td><strong>SEO and indexing</strong></td><td>Can be indexed by search engines</td><td>Not indexable, since views aren't URLs</td></tr></tbody></table>

{% hint style="warning" %}
**Version control and branches:** We recommend avoiding adding a mobile app directly to the Main branch unless you plan to work in a sub-branch created after the mobile app has been added to Main.

Adding a mobile app to both Main and an existing branch can lead to conflicts. As long as you create a branch after adding the mobile app to Main, or add the mobile app in a branch and then merge it into Main, the setup should work as expected.

**Article series:** [Version control](/help-guides/maintaining-an-application/version-control)
{% endhint %}

## Managing views

Mobile views are managed through the pages dropdown at the top of the editor. From here, you can create new views, open existing ones, or delete views you no longer need.&#x20;

<figure><img src="/files/Plj44RrQ3yoT0iQhphE1" alt=""><figcaption></figcaption></figure>

{% hint style="warning" %}
Note on branches: Avoid adding a mobile app directly to the Main branch unless you plan to work in a sub-branch created after the mobile app has been added to Main. Adding a mobile app to both Main and an existing branch may lead to conflicts. As long as you create a branch after adding the mobile app to Main, or add the mobile app in a branch and then merge it with Main, the setup should work as expected.
{% endhint %}

## View types

Views come in four types, each suited to a different layout style. The view type determines how the view handles scrolling, content layout, and how users interact with the content inside.

### Scrollable

The most common view type. In a scrollable view, users can scroll vertically to see all of its content, similar to a standard web page. This is the right choice for most views, especially those with forms, mixed content, or anything that might extend beyond the height of the screen.

Scrollable views are flexible and work well for the majority of screens in an app, from settings pages to detail views.

### Non-scrollable

A non-scrollable view keeps its content fixed to the size of the device screen. Nothing scrolls, and everything the user sees is contained within the visible area.

This type is useful for:

* **Splash screens** shown while the app loads.
* **Full-screen images or videos** where the media should fill the entire display.
* **Maps** where the map itself provides its own navigation and doesn't need the surrounding view to scroll.
* **Focused single-purpose screens**, such as an onboarding step with just a headline and a call-to-action.

Non-scrollable views work best when the content is intentionally limited to what fits on the screen at once.

### Vertical list

A vertical list turns the view into a scrollable list, similar to a repeating group on web. The list repeats a set of elements for each item in the data source, creating a familiar mobile list interface.

Vertical list views are ideal for:

* **Social feeds**, where each post is a repeating item.
* **Contact lists** or **message inboxes**.
* **Search results**.
* **Any long, scrolling collection of similar items**.

Because vertical lists lazy-load their items, they perform well even with large collections.

### Section list

A section list works like a vertical list but groups items into sections based on a shared property. Each section has a header, and items are organized under the header they belong to.

Section list views work well for:

* **Contacts grouped alphabetically**, with headers like *A*, *B*, *C*, and so on.
* **Tasks grouped by category or status**.

The section list handles the grouping and header rendering automatically, so you only need to configure the data source and choose the grouping property.

## View appearance settings

Several appearance settings control how the view integrates with the device and the app shell.

### **Show top app bar**

Toggles the app bar at the top of the view. The app bar holds a title and navigation controls.

<figure><img src="/files/BBUTwNOUwvtEn8ig3Q0i" alt="The top app bar at the top of the view."><figcaption><p>The top app bar.</p></figcaption></figure>

### **Safe area**

Toggles the safe area on the view. When enabled, device-specific padding keeps content clear of hardware features like notches, home indicators, and rounded corners.&#x20;

<figure><img src="/files/hVS0p2a4dyLV3wHQdNwe" alt="The top and bottom safe area on the view canvas."><figcaption><p>The safe area helps you avoid elements being cut off or overlapped by device features.</p></figcaption></figure>

Disabling the safe area allows content to extend across the entire screen, which is useful for immersive views like maps or full-screen media.

{% hint style="info" %}
The top safe area will remain visible on the canvas if a **top app bar** is added to the view, and the bottom safe area will be visible if a **tab bar** is present. However, even with the safe area setting toggled off, it will still impact content near the side safe areas, even though those areas don’t appear on the canvas.
{% endhint %}

### **Show status bar**

Toggles the device's status bar, which displays time, battery level, and network status.&#x20;

<figure><img src="/files/nLq7Q4PX0MZMCuBC8hmK" alt=""><figcaption></figcaption></figure>

Disabling it creates a more immersive view, though it also hides information users may expect to see.

### **Show tab bar**

Toggles the tab bar at the bottom of the view. This option is checked and locked when *Include as tab item* is enabled, since a view that acts as a tab item must display the tab bar.

<figure><img src="/files/Aa17NAVOz1GBpsGcqP1U" alt="The tab bar."><figcaption></figcaption></figure>

### **Include as tab item**

Adds the current view to the tab bar as a tab item. The tab item defaults to the view's name and a star icon, both of which can be customized.

## Custom properties

Views can hold data through custom properties, similar to how a reusable element passes data between its definition and its instances. Custom properties let a view accept data when it's opened, so its content can adapt to whatever the user is doing at the time.

<figure><img src="/files/pTVXu624xMvMgZt2lGZK" alt="Editing a custom property on a view element."><figcaption><p>Custom properties can hold any kind of data. In this example, we have a custom property called <em>Blog post</em>, which holds the data type <em>Post</em>.</p></figcaption></figure>

For example, a *Post detail* view might have a *Blog post* property that receives the specific post the user tapped in a list. Once the property is set, elements inside the view can reference it in dynamic expressions.

#### What custom properties can hold

A custom property can hold any type of value your app works with, including:

* **Dynamic values**, such as a specific record from a data type (like a `Post`, `User`, or `Order`), or a basic value like text, number, or date.
* **Colors**, either as a hex code or a saved color variable.
* **Yes/no values**, useful for toggling states or driving conditions.

Each property can be marked as a list to hold multiple values of the same type, or set as optional if a value isn't always required.

#### Setting up a property

Properties are configured through the property editor for the view itself. Each property has:

* **A name**, used to reference it in expressions.
* **A type**, defining what kind of value it accepts.
* **An optional description**, useful for keeping the purpose of the property clear when you or a collaborator returns to it later. See more [here](#describing-a-property).

Properties can also have a default value or be left empty until data is passed in.

#### Setting a property's value

There are two ways to give a property a value:

* **When navigating to the view.** The *Go to view* workflow action lets you pass values into each of the view's properties. This is the most common pattern: the user taps something, and the destination view opens with the relevant data already loaded.
* **From within the view.** The *Set current view's property* action assigns or updates a property while the view is active. This is useful for tracking state that changes as the user interacts with the view, such as which tab is currently selected or whether a section is expanded.

#### Describing a property

You can add a description to each property using the *Description* field. Descriptions don't affect how the property behaves; they're a convenience for you and your team, giving the property a bit of context so its purpose stays clear when someone opens the view later.

Descriptions are especially useful for properties whose names aren't fully self-explanatory, or for views with several properties that serve different roles.

#### Referencing a property

Once a property is defined, elements and workflows inside the view can reference it using `Current view's [property name]`. This works the same way as referencing a reusable element's properties from within the element.

## Navigation between views

Navigating between views is different from navigating between pages on the web. Views are more tightly integrated with your app, and both the method and settings used to move between them affect how the navigation flow behaves.

There are two ways to navigate between views in Bubble:

### Tab navigation

Tab navigation is powered by the tab bar, a persistent navigation panel at the bottom of the screen. Each tab item references a single view, so tapping a tab takes the user directly to that view without needing a workflow.

<figure><img src="/files/NXkqG32vsfvntEZtcDhN" alt="The tab bar in a mobile app."><figcaption><p>The tab bar allows you to set up a persistent navigation panel without needing workflows.</p></figcaption></figure>

The tab bar is a global component, similar to a reusable element on web. There's only one tab bar in your app, but it can appear across multiple views, and changes made to it anywhere apply everywhere.

Tab items can be added to the tab bar in two ways:

* **Designating a view as a tab item.** Enable *Include as tab item* on a view. This adds a tab item that references the current view.
* **Adding a tab item from the tab bar.** From the tab bar's property editor, add a new tab item and either link it to an existing view or create a new one.

A tab item can only reference one view, and a view can only be linked to one tab item.

You can customize each tab item's label, icon, icon size, colors, and active/inactive states through its property editor. Conditions can also be used to hide a tab item based on criteria like the user's login status.

### Using the go to view action

Similar to *Go to page* in a web app, but no URL loads and no page refreshes. The new view opens either as a [stack or as a modal](#stack-and-modal-navigation).

<figure><img src="/files/rXqRDWfg8cjUR53jr7Vh" alt="The go to view action with stack navigation type."><figcaption><p>Using the <em>Go to view</em> action, you can select the view to navigate to, and whether to use stack or modal navigation.</p></figcaption></figure>

#### **Stack and modal navigation**

The *Go to view* action supports two navigation styles:

* **Stack navigation.** The new view is placed on top of the current one, adding a layer to the stack. The user can return to the previous view using the back button or a swipe gesture. The previous view remains active in memory, with its content preserved. Stack navigation is what powers common flows like tapping a list item to see its details, then returning to the list.&#x20;
* **Modal.** The new view is presented as a full-screen sheet over the current view. Modals are typically dismissed by swiping down or tapping a close button, and are well suited to focused, temporary tasks such as composing a message.

#### Stack navigation example

In Spotify, tapping a playlist from the *Home* tab pushes a new view onto the *Home* tab's navigation stack. Tapping the back arrow returns you to the *Home* view. If you switch to the *Your Library* tab and open the same playlist there, it opens within that tab's stack instead, keeping each tab's navigation history independent.

<figure><img src="/files/xMBm2J84J2Ky14tOhTlS" alt="Example of Spotify using stack navigation."><figcaption><p>Tapping a playlist in Spotify pushes a view to the <em>Home</em> tab's navigation stack. Tapping back returns you to the <em>Home</em> view.</p></figcaption></figure>

#### **Resetting the navigation stack**

The *Go to view* action includes an option to reset the navigation stack. This clears the navigation history, so the user can't return to the previous view. It's useful for flows like completing a login, where returning to the login screen after signing in doesn't make sense.

Resetting the stack removes previous views from memory, so any data stored on those views (like form content) is no longer accessible.

### FAQ: Views

<details>

<summary>What's the difference between a view and a page?</summary>

A page belongs to a web app and is accessed via a URL. A view belongs to a native mobile app and is reached through in-app navigation. Both serve as top-level containers for their respective platforms, but they behave differently.

</details>

<details>

<summary>Do views have URLs?</summary>

No. Views live inside the mobile app and aren't accessible through a URL. Navigation between views happens through [workflows](#using-the-go-to-view-action) or [tab taps](#tab-navigation) within the app itself.

</details>

<details>

<summary>How do I navigate between views?</summary>

There are two ways: tap an item in the [tab bar](#tab-navigation), or use the [*Go to view* workflow action](#using-the-go-to-view-action). *Go to view* supports [stack navigation, modal presentation](#stack-and-modal-navigation), and [resetting the navigation stack](#resetting-the-navigation-stack).

</details>

<details>

<summary>Can I pass data to a view when navigating to it?</summary>

Yes. Define [custom properties](#custom-properties) on the view, then pass values into those properties when using [*Go to view*](#using-the-go-to-view-action). The view's child elements can then reference the properties in dynamic expressions.

</details>

<details>

<summary>What's the difference between stack navigation and a modal?</summary>

[Stack](#stack-and-modal-navigation) navigation adds the new view on top of a stack, keeping the previous view active behind it. A [modal](#stack-and-modal-navigation) presents the new view as a temporary sheet, usually for focused tasks. Both are triggered through the [*Go to view*](#using-the-go-to-view-action) action.

</details>

<details>

<summary>Can I have more than one tab item link to the same view?</summary>

No. A tab item references exactly one view, and a view can only be linked to one tab item.

</details>

<details>

<summary>Can I hide a tab item based on a condition?</summary>

Yes. Add a condition[^1] to the tab item and use it to set *This element is visible* to no when the condition is true. This is useful for tab items that should only appear to certain users, such as admins or logged-in users.

</details>

<details>

<summary>Can I hide the status bar on a specific view?</summary>

Yes. Turn off [*Show status bar*](#show-status-bar) in the view's properties. The status bar stays hidden while that view is active.

</details>

<details>

<summary>Can I hide the tab bar on a specific view?</summary>

Yes. Turn off [*Show tab bar*](#show-tab-bar) in the view's properties. Note that if *Include as tab item* is enabled, the tab bar is required and can't be hidden on that view.

</details>

<details>

<summary>What happens if I reset the navigation stack?</summary>

The navigation history is cleared, and the user can't return to previous views.&#x20;

</details>

<details>

<summary>Can views be indexed by search engines?</summary>

No. Views live inside the mobile app and don't have URLs, so they can't be indexed. Content that needs to be discoverable through search should also be published as web pages.

</details>

<details>

<summary>Can I change a view's type after building it?</summary>

Yes, but switching between view types can temporarily remove existing content from the view. Switching back restores it. Test carefully if the view already contains significant work.

</details>

[^1]: A conditional lets you change how an element looks or behaves when specific criteria are met.\
    \
    **Article:** [Conditions](/help-guides/logic/conditions)
