# Elements
> Source: https://manual.bubble.io/help-guides/design/elements · Captured: 2026-07-21 (verbatim from manual.bubble.io llms-full.txt)

This section covers elements – the building blocks that make up your application's user interface

{% hint style="info" %}
This is the long-form article on Bubble's different elements. If you want the short-form technical reference that details all the different element properties, you'll find that in the link below.

**Core reference:** [Elements](/core-resources/bubble-elements)
{% endhint %}

## What is an element?

An element is any individual piece of your app's user interface. Buttons, images, input fields, containers, icons, and maps are all examples of elements. Together, they make up everything a user sees and interacts with on the screen.

<figure><img src="/files/fBbxL9kiI3cOD9Ri9tSd" alt=""><figcaption><p>Combining elements like input fields and buttons is how you design your app and give users different ways to interact with it.</p></figcaption></figure>

Every part of your app's user interface is made up of elements organized in a hierarchy. Each element has a set of style and responsive properties that control how it looks and behaves. Together, the hierarchy and these properties give the browser everything it needs to render the page correctly.

<figure><img src="/files/jFeXSu7VG9ZhHXzXW2RD" alt="The element tree and element palette"><figcaption><p>The <strong>element tree</strong> shows all the elements on the current page or view in a hierarchy, and the <strong>element palette</strong> lets you add new elements to the page or view.</p></figcaption></figure>

Bubble lets you control every layer of this: which elements exist, how they look, how they behave across different screen sizes, and how they respond as elements are shown, hidden, or animated on the page.

<details>

<summary>What is the element hierarchy?</summary>

Every element you add becomes part of a hierarchy that shapes both its structure and design. In web apps, the page is the parent of every other element on it. In mobile apps, the view serves the same role.

Within that parent, you can group elements into containers to create additional parent-child relationships. This hierarchy is what the browser or mobile app uses to render the layout correctly.

Container elements can hold data, style, and layout properties that their child elements inherit or reference. This makes hierarchy an important tool for keeping your design consistent and your data flowing predictably.

**Article:** [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)

</details>

### Web and mobile elements

Bubble supports both web apps and native mobile apps, and elements work slightly differently on each.

* **Web apps** run in a browser. They're built around pages, with elements arranged in a hierarchy on each page. Web elements are designed for the browser environment and include familiar building blocks like text, buttons, images, repeating groups, popups, and floating groups.
* **Native mobile apps** run as installed apps on iOS and Android devices. Instead of pages, they're built around views, which serve the same role but exist within a single app shell rather than being loaded as separate URLs. Mobile elements are designed for how mobile operating systems handle layout and interaction, and include native components.

Some elements are only available on one platform.

### Using AI to build with elements

Bubble's AI Agent can design pages from scratch with a simple prompt. Describe what you need in your preferred language, and the Agent gathers context from your app and presents a plan for what it will build, ready for you to approve.

<figure><img src="/files/5RXJNMrpmZdF3ys0BGO5" alt="Bubble&#x27;s AI agent presenting a plan for building a signup and login page."><figcaption><p>Bubble's AI Agent will present you with a plan that you can approve before you start building.</p></figcaption></figure>

Shortly after you approve the plan, your new page is ready, with elements and workflows connected and set up to use. From there, you can refine the design directly in the editor or by prompting the Agent for adjustments.

<figure><img src="/files/jrPROxySMp4GZqH2bcKR" alt="Login and signup page built by the Bubble AI Agent."><figcaption><p>Shortly after you approve the plan, the Agent has built the login and signup page.</p></figcaption></figure>

The Agent can also add, modify, or reconfigure individual elements on an existing page, making it a useful partner throughout the design process, not just at the start.

***

## Types of elements

Bubble offers many different elements, split into a few categories based on their purpose. Plugins can also add new elements, ranging from simple utilities to complex integrations.

### **Visual elements**

<figure><img src="/files/6cIvv6znSo3L5KBlevIl" alt="Visual elements combined to show a hero section on a website."><figcaption><p>Visual elements let you design your page to display information and accept clicks. Every element in this example is a visual element: a text element, an image, and a button.</p></figcaption></figure>

Visual elements are placed on the page for aesthetic purposes or to display information. They don't accept data input, though they can accept clicks and are often connected to workflows.

**Article:** [Visual elements](/help-guides/design/elements/web-app/visual-elements) | [Mobile-specific visual elements](/help-guides/design/elements/ios-and-android-app/visual-native-app-elements)

<table><thead><tr><th width="160.66796875">Platform</th><th width="176.30859375">Element</th><th>Purpose</th></tr></thead><tbody><tr><td>Web/Mobile</td><td><a href="/pages/c57rZiHFpEl3aHUPdhqr#text">Text</a></td><td>Displays static or dynamic text.</td></tr><tr><td>Web/Mobile</td><td><a href="/pages/c57rZiHFpEl3aHUPdhqr#button">Button</a></td><td>A clickable element that triggers a workflow when pressed.</td></tr><tr><td>Web/Mobile</td><td><a href="/pages/c57rZiHFpEl3aHUPdhqr#icon">Icon</a></td><td>Displays a small graphic symbol, often used for actions or visual cues.</td></tr><tr><td>Web</td><td><a href="/pages/c57rZiHFpEl3aHUPdhqr#link">Link</a></td><td>A clickable element that navigates to another page or external URL.</td></tr><tr><td>Web/Mobile</td><td><a href="/pages/c57rZiHFpEl3aHUPdhqr#image">Image</a></td><td>Displays a static or dynamic image.</td></tr><tr><td>Web/Mobile</td><td><a href="/pages/c57rZiHFpEl3aHUPdhqr#shape">Shape</a></td><td>Displays a rectangle.</td></tr><tr><td>Web</td><td><a href="/pages/c57rZiHFpEl3aHUPdhqr#alert">Alert</a></td><td>Displays a temporary message to the user, typically for feedback or notifications.</td></tr><tr><td>Web</td><td><a href="/pages/c57rZiHFpEl3aHUPdhqr#video">Video</a></td><td>Embeds a video player, supporting YouTube and Vimeo.</td></tr><tr><td>Web</td><td><a href="/pages/c57rZiHFpEl3aHUPdhqr#html">HTML</a></td><td>Renders custom HTML directly on the page.</td></tr><tr><td>Web/Mobile</td><td><a href="/pages/c57rZiHFpEl3aHUPdhqr#map">Map</a></td><td>Displays an interactive map with optional markers.</td></tr><tr><td>Web</td><td><a href="/pages/c57rZiHFpEl3aHUPdhqr#built-on-bubble">Built on Bubble</a></td><td>A small badge that links to Bubble's homepage.</td></tr></tbody></table>

### **Containers**

<figure><img src="/files/giLHZKHIX1Q5PwaPNapE" alt="Input form inside a container."><figcaption><p>Groups can be used both to organize elements like the form above, and to hold the data that you want to work with, such as a user. The group is highlighted with a dashed border in the example.</p></figcaption></figure>

Containers hold other elements. They serve two main purposes:

* They **group other elements** (including other containers) into a single unit. All elements inside belong to the same level of the page hierarchy and move or delete together with the container.
* They can also **hold data** relevant to the elements inside. For example, a group with a *User* type of content can pass that user's data down to inputs and text elements inside it.
* Containers can hold **a single thing** (like a specific user) or a **list of things** (like a list of users), specified in the *Holds data* column in the table below.

Bubble offers several container types, each suited to different layouts and behaviors.

**Article:** [Containers](/help-guides/design/elements/web-app/containers) | [Mobile-specific containers](/help-guides/design/elements/ios-and-android-app/containers)

<table><thead><tr><th width="119.41796875">Platform</th><th width="174">Container type</th><th width="150.15625">Holds data</th><th>Purpose</th></tr></thead><tbody><tr><td>Web/mobile</td><td><a href="/pages/0InSA6TX3K40sT0u4F83">Group</a></td><td>Single thing</td><td>Hold elements and data anywhere on the page</td></tr><tr><td>Web</td><td><a href="/pages/F2Z6HIq5lrrnkRUAKQbg">Repeating group</a></td><td>List</td><td>Show a list of things in a flexible design such as cards, lists, and a masonry grid</td></tr><tr><td>Web</td><td><a href="/pages/xNR63E81QtKAbMSiK90O">Table element</a></td><td>List</td><td>Show a list of things in rows/columns with headers</td></tr><tr><td>Web</td><td><a href="/pages/vSeYGneOPOJmfX4xfS1u">Popup</a></td><td>Single thing</td><td>Display elements on top of everything else, such as a warning message</td></tr><tr><td>Web/mobile</td><td><a href="/pages/1fNX5lhkwMiZUxo4mHsI">Floating group</a></td><td>Single thing</td><td>Hover elements above other elements and stick them to one of the screen edges, like a top navigation bar that stays put</td></tr><tr><td>Web</td><td><a href="/pages/uDrZfAW9NewNRUhmyEfB">Group focus</a></td><td>Single thing</td><td>Display a group that disappears as soon as you click anywhere else, such as a dropdown menu</td></tr><tr><td>Mobile</td><td><a href="/pages/X2g2WXxpMVRkgRZjrAJR#short-list">Short list</a></td><td>List</td><td>A container for displaying a fixed set of data items. Loads all items immediately, making it best for shorter lists.</td></tr><tr><td>Mobile</td><td><a href="/pages/X2g2WXxpMVRkgRZjrAJR#horizontal-list">Horizontal list</a></td><td>List</td><td>Displays a horizontally scrolling list of items.</td></tr><tr><td>Mobile</td><td><a href="/pages/X2g2WXxpMVRkgRZjrAJR#sheets">Sheet</a></td><td>Single thing</td><td>A native overlay that slides up from the bottom of the screen</td></tr></tbody></table>

### Input forms

<figure><img src="/files/giLHZKHIX1Q5PwaPNapE" alt="Input form inside a container."><figcaption><p>Input elements are used to collect information from users, such as text, dates, emails, and file uploads.</p></figcaption></figure>

Input forms are elements that allow your users to provide data to your application.

**Article:** [Input forms](/help-guides/design/elements/web-app/input-forms) | [Mobile-specific input forms](/help-guides/design/elements/ios-and-android-app/input-forms)

<table><thead><tr><th width="125.16796875">Platform</th><th width="209">Element</th><th>Purpose</th></tr></thead><tbody><tr><td>Web/mobile</td><td><a href="/pages/9usn2lynDsMjIzGqjm6r#text">Text input</a></td><td>Names, comments, other short info.</td></tr><tr><td>Web/mobile</td><td><a href="/pages/9usn2lynDsMjIzGqjm6r">Multiline text</a></td><td>Descriptions and other longer text. Allows line breaks. No text formatting.</td></tr><tr><td>Web/mobile</td><td><a href="/pages/uNmsNaHIMteorQ6PaDIa">Checkbox</a></td><td>Check to hold a yes/no value, such as accepting terms and conditions.</td></tr><tr><td>Web</td><td><a href="/pages/uNmsNaHIMteorQ6PaDIa">Dropdowns</a></td><td>Pick an option from a dropdown list, either static or from the database.</td></tr><tr><td>Web</td><td><a href="/pages/uNmsNaHIMteorQ6PaDIa">Search box</a></td><td>Search-as-you-type in the database.</td></tr><tr><td>Web</td><td><a href="/pages/uNmsNaHIMteorQ6PaDIa#radio-button">Radio buttons</a></td><td>Select one option out of multiple.</td></tr><tr><td>Web</td><td><a href="/pages/uNmsNaHIMteorQ6PaDIa#slider-input">Slider input</a></td><td>Pick a numerical value with a visual, draggable slider.</td></tr><tr><td>Web/mobile</td><td><a href="/pages/yU4rI57C4wpL8CQuejLA">Date/time picker</a></td><td>Select a date and optionally a time.</td></tr><tr><td>Web</td><td><a href="/pages/yF6fIrsbNIvkMzWEmd8K#image-uploader">Picture uploader</a></td><td>Upload and preview images like profile pictures.</td></tr><tr><td>Web</td><td><a href="/pages/yF6fIrsbNIvkMzWEmd8K#file-uploader">File uploader</a></td><td>Upload other types of files.</td></tr><tr><td>Mobile</td><td><a href="/pages/kc2HeG4yI6rEmy95HTvO#selectable-lists">Selectable list</a></td><td>Select one or more items from a set list.</td></tr></tbody></table>

### **Reusable elements**

Reusable elements let you build a component once and use it across your app. When you update the reusable element's definition, every instance updates too, which makes them useful for headers, footers, or any component that appears in multiple places.

**Article:** [Resuable elements](/help-guides/design/elements/reusable-elements)

***

## How elements behave

Elements can be set to behave in different ways depending on the situation or the user's actions. There are two main ways to make them interactive: conditions and workflows. Custom states can be used to temporarily store information.

### Conditions

Conditions let you set rules that change how an element looks or behaves based on whether a rule evaluates as yes or no. Nearly every visual property can be adjusted this way, which opens up a lot of possibilities, from subtle style changes to hiding and showing entire sections of the page.

Some examples:

* A condition on a button that greys it out when a required form field is empty.
* A condition on a group that hides it when the current user isn't logged in.
* A condition on a group that shows it only when a specific URL parameter is present.

**Article:** [Conditions](/help-guides/logic/conditions)

### Workflows

Workflows connect events (like a button click) to actions (like saving data, sending an email, or navigating to another page). Any element can be the trigger for a workflow, and workflows can chain multiple actions together to build complex behavior.

Some common uses include:

* Creating, editing, or deleting records in the database
* Logging users in and out
* Showing, hiding, or animating elements
* Navigating between pages or to external links

**Article:** [Workflows](/help-guides/logic/workflows)

### Custom states

Custom states let you store temporary information on an element, such as the current tab in a set or whether a section is expanded. States can be read and updated by workflows and referenced in conditions, giving you flexible control over how the element behaves without touching the database.

**Article:** [Custom states](/help-guides/data/temporary-data/custom-states)

***

## Working with elements

Once you know how elements are structured and how they behave, you can work on placing, styling, and configuring them in the editor.

### Adding elements

The element palette on the left side of the screen lets you add new elements to the current page, view, or reusable element. To add a new element, click its type in the palette and draw it directly on the page or view. You can also drag an element straight from the palette onto the canvas.

You can use the *Search assets*&#x20;

<figure><img src="/files/AIaM6nex0ZGeKld9NEre" alt="Element palette"><figcaption><p>To add new elements to the canvas, use the element palette on the left side of the editor.</p></figcaption></figure>

### The element property editor

Selecting any element opens the element property editor on the right side of the workspace. This is where you configure the element's name, data source, layout, style, conditions, and behavior. Every element has its own set of properties, based on its type.

If you select multiple elements, some properties can be edited in bulk.

<figure><img src="/files/yXcw6kx4PEyiQ20oit3M" alt=""><figcaption><p>The element property inspector lets you configure each element's properties individually.</p></figcaption></figure>

### Naming elements

You can edit an element's name at the top of the property editor. Naming conventions are up to you: some developers use prefixes like `btn_submit`, others use plain descriptions like `Submit button`. Whatever style you choose, keeping it consistent across your app makes elements easier to find and debug as your app grows.

<figure><img src="/files/L1RXzYVg5Arr6jVmDtuf" alt=""><figcaption><p>You can give each element a name by clicking its label in the top of the property editor.</p></figcaption></figure>

By default, Bubble generates a name based on the element's type and content. Renaming as you build helps avoid confusion later, especially when you have several similar elements on the same page.

### Finding and rearranging elements

Larger pages can have many elements. A few tools make them easier to navigate:

#### The element picker

The element picker in the toolbar lists every element on the page. Start typing to filter, and hover to see a thumbnail before selecting.

<figure><img src="/files/dM693UPgLSMWzURwuy1j" alt=""><figcaption><p>The element picker lets you quickly select an element by name.</p></figcaption></figure>

#### The element tree

The element tree gives you a hierarchical view of every element and is useful for both selecting and rearranging them by dragging and dropping them to a new position in the hierarchy. Use the search bar at the top of the element tree to filter elements by name.

<figure><img src="/files/5QAXAv4s6rBYfBtUEZik" alt="Searching for elements in the element tree."><figcaption><p>You can quickly find elements by typing part of their name in the element tree's filter bar.</p></figcaption></figure>

#### X-ray view

X-ray view makes elements semi-transparent in the editor, allowing you to see elements that overlap.

<figure><img src="/files/orALcTz4F6eqG6Amnwvy" alt=""><figcaption></figcaption></figure>

#### App search tool

The app search tool lets you search across pages and workflows for element names, expressions, and more.

<figure><img src="/files/uKKw9v5YcMWXws2gR4Jl" alt=""><figcaption><p>The app search tool in the upper right half of the toolbar lets you search for elements and many other things across your app.</p></figcaption></figure>

**Article:** [The search tool](/help-guides/getting-started/navigating-the-bubble-editor/tools/the-search-tool)

### Inspecting elements

In the element property editor, you can click the contextual dropdown and select *Inspect* to see other parts of your app that are connected to the element.

<figure><img src="/files/C0L8zfdsKTyMTeR9hPUI" alt="Inspect element tool"><figcaption><p>In this example, we're using the <em>Inspect</em> tool to see workflows connected to a specific button.</p></figcaption></figure>

***

## Styles and variables

Rather than styling each element individually, you can define reusable styles and variables that keep your design consistent across the app.

* **Styles** bundle multiple property values together and can be applied to elements of the same type.
* **Font and color variables** let you save fonts and colors that you can reference throughout your app. Updating a variable updates everywhere it's used.

This system makes it much easier to keep a consistent look and to make design changes at scale.

**Article series:** [Styles and variables](/help-guides/design/variables-and-styles)

***

## Element security

Even though Bubble is a no-code platform, your app is ultimately delivered as code that runs in the user's browser. The elements you place on the page become part of that code, which means their names, static text, and default values are visible to anyone who inspects the page.

{% hint style="info" icon="lock" %}
A good rule of thumb is to assume that anything you add to an element can be seen by a curious user. Avoid placing sensitive information anywhere on the page, including in element properties, workflows, custom states, and option sets. For data that needs to be protected, use privacy rules in the database instead.
{% endhint %}

**Article:** [Client-side and server-side](/help-guides/security/client-side-and-server-side)

## Other ways to learn

<details>

<summary>Video lessons</summary>

* [Searching for elements](https://youtu.be/7N5MNPdAOmA)
* [How to swap element positions](https://www.youtube.com/watch?v=04dDc9VaW2Y)

</details>
