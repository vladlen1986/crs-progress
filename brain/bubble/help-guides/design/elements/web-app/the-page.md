# The page
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/the-page · Captured: 2026-07-21 (verbatim from manual.bubble.io llms-full.txt)

The page is the blank canvas on which you design your web app's user interface.

{% hint style="info" icon="desktop" %}
The page is the element at the top of the hierarchy in a **web app**. For native mobile apps, see [the view](/help-guides/design/elements/ios-and-android-app/the-view).
{% endhint %}

At the core of everything related to design and user interface in Bubble is **the page**. It's the canvas where you place [input elements](#user-content-fn-1)[^1], text, images, icons, videos, and everything else your users need to interact with your app.

<figure><img src="/files/g7vknD4UEVoQUWqiNbZL" alt=""><figcaption><p>The page gives you a blank canvas on which to build your vision.</p></figcaption></figure>

## What is a page?

No matter what kind of app you're building, from a simple website to a complex eCommerce platform, the page is the starting point for all your design and development work. Think of the page as the base level in a page's hierarchy: every element you add sits inside it.

<details>

<summary>What is a page's hierarchy structure?</summary>

A Bubble page is composed of three types of components:

* **The page**\
  The page is the top-level component of a web page and organizes all the groups and elements placed on it.\
  **The page is the top container for all elements**<br>
  * **Groups**\
    Groups are containers used to hold other elements and control their layout. Think of them as boxes that can hold elements, and even other groups, to create a hierarchy. Groups can be styled or made invisible to the user. They play a major role in your page's design, since the way they're set up determines how the elements inside them behave.\
    **Groups are containers for elements and for sub-groups**<br>
  * **Elements**\
    Elements are the content your users see and interact with, such as buttons, links, images, icons, and input fields. They can be placed inside a group, or directly on the page.\
    **Elements are the things that users interact with on the page**

In a way, the hierarchy above is how your browser sees the page before rendering it on the screen. You can read more about the element hierarchy in the article below.

Article: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)

</details>

## Default pages

When you create a new Bubble web app, a few pages are included by default. These pages share a few traits:

* They're always present when your app is created.
* Their names can't be changed.
* They can't be deleted.

### index

The index page is the main page of your app (more on that [below](#the-index-page)).

### 404

The 404 page is where your users are taken if they type in an URL in the URL bar that includes your domain, but the page name they enter doesn't exist:

{% code overflow="wrap" %}

```
https://appname.bubbleapps.io/non-existing-page → https://appname.bubbleapps.io/404
```

{% endcode %}

The 404 is an [http error code](#user-content-fn-2)[^2] that is used to tell your browser that the page doesn't exists.

<figure><img src="/files/zlsllbd9jgBmk6UTw1i1" alt=""><figcaption><p>The 404 page can be edited freely just like any other page – but it can't be deleted.</p></figcaption></figure>

You can use this page to tell your users that the page couldn't be found and point them in another direction.

### reset\_pw

This is the page to which your users are directed if they need to reset their password. They will most likely follow a link in a reset password email to this page.

<figure><img src="/files/JNL36W1zV3p3SOOmthaj" alt=""><figcaption><p>The reset_pw page is a special page that lets your users reset their password safely. It's part of Bubble's core functionality and can't be removed or renamed.</p></figcaption></figure>

## The index page

The index page is the main page of your app. It's the first page that loads when someone enters your app's domain in the browser. It's also the only page that can be displayed without its name appearing in the URL.

For example, all of the following URLs take you to the index page, even without the page name included:

#### No custom domain

<table><thead><tr><th width="185">Version</th><th>URL</th></tr></thead><tbody><tr><td><strong>Development</strong></td><td>https://appname.bubbleapps.io/version-test</td></tr><tr><td><strong>Live</strong></td><td>https://appname.bubbleapps.io</td></tr></tbody></table>

#### Custom domain

<table><thead><tr><th width="185">Version</th><th>URL</th></tr></thead><tbody><tr><td><strong>Development</strong></td><td>https://www.mydomain.com/version-test</td></tr><tr><td><strong>Live</strong></td><td>https://www.mydomain.com</td></tr></tbody></table>

If your app has any custom branches[^3] set up in version control, the *version-test* part of the URL is replaced by the ID[^4] of the currently active branch.

### Setting an index page

When you create an app in Bubble, the index page is created automatically. You cannot name another page index, but you can replace it by using the *Make this page the new index* function. To change the index page:

{% stepper %}
{% step %}

### Open the page dropdown menu

Open the page navigator, click the three dots on the page you want to make the new index.
{% endstep %}

{% step %}

### Click *Make index*

Select *Make index* in the dropdown menu.
{% endstep %}
{% endstepper %}

You can also change the index page by right-clicking the page element in the design canvas and clicking *Make this page the new index.*

<figure><img src="/files/KOv9lX8GeEHdrsu9k0Lw" alt="Setting a page as the index page by selecting Make index in the page dropdown menu."><figcaption><p>Set a new index page by clicking the <em>Make index</em> option in the page dropdown.</p></figcaption></figure>

{% hint style="info" %}
The old index page will be named `old_index`*.*
{% endhint %}

<details>

<summary>Video lesson</summary>

Video: [How to set a new index page](https://youtu.be/UrWYCO1bdhM)

</details>

## The page URL

Every page you add is automatically assigned a unique URL that users can access, just like any other website. All page URLs follow the same pattern: the root URL of your app followed by the page name.

#### No custom domain

<table><thead><tr><th width="166">Version</th><th>URL</th></tr></thead><tbody><tr><td><strong>Development</strong></td><td>https://myapp.bubbleapps.io/version-test/<strong>page-name</strong></td></tr><tr><td><strong>Live</strong></td><td>https://myapp.bubbleapps.io/<strong>page-name</strong></td></tr></tbody></table>

#### Custom domain

If you have connected your app to a custom domain, the URL will look like this:

<table><thead><tr><th width="154">Version</th><th>URL</th></tr></thead><tbody><tr><td><strong>Development</strong></td><td>https://mydomain.com/version-test/<strong>page-name</strong></td></tr><tr><td><strong>Live</strong></td><td>https://mydomain.com/<strong>page-name</strong></td></tr></tbody></table>

{% hint style="info" %}
If your app has any custom branches[^5] set up in version control, the *version-test* part of the URL is replaced by the ID[^4] of the currently active branch.
{% endhint %}

## Creating a new page

To create a new page:

{% stepper %}
{% step %}

### Click the *New* button

Open the page navigator and click the *New* button.
{% endstep %}

{% step %}

### Click *Web page*

Select *Web page* in the dropdown menu.
{% endstep %}
{% endstepper %}

<figure><img src="/files/e92Ec4RZ35LakZKpCpHI" alt="Create new page dropdown menu"><figcaption><p>Create a new page using the <em>New</em> and <em>Web page</em> option.</p></figcaption></figure>

You will be asked to provide a name for the new page and whether you want to [clone an existing page](#cloning-a-page).

<figure><img src="/files/bnQSLHl1OBk5GK0mMUPl" alt="Create a new page and assign a name dialog."><figcaption><p>You can give your page any name you want, as long as it's URL-safe and unique within the app.</p></figcaption></figure>

### Naming your page

You can create as many pages as you need in your app, as long as they have unique names. Keep in mind when naming pages that they need to be URL-safe[^6]. Any non-URL-safe strings you provide will automatically be [URL encoded](#user-content-fn-7)[^7].

A good rule of thumb for page names is to use only the English letters a-z and numbers 0-9, and to replace spaces with dashes. When URL-encoding a page name, Bubble will:

* Change the text to lowercase.
* Replace spaces with `-`.
* Replace special characters with `_`.

## Cloning a page

Cloning a page creates an exact copy of it under a new name, including all elements and workflows. There are three ways to duplicate a page:

By selecting *New* → *Web page,* and populating the *Clone from* field in the new web page popup...

<figure><img src="/files/e92Ec4RZ35LakZKpCpHI" alt="Create new page dropdown menu"><figcaption><p>You can clone a page by using the <em>New web page</em> option and then selecting a page to clone.</p></figcaption></figure>

... by having the page you want to duplicate open in the editor and selecting *Edit - Duplicate this page...*

<figure><img src="/files/SqBR9MAr5fx8PgkOUPpT" alt="Cloning a page from the Edit menu using the Duplicate page option."><figcaption><p>You can also clone the page by selecting <em>Duplicate page</em> while having the page you want to clone open in the editor.</p></figcaption></figure>

... or by using the contextual dropdown menu and clicking *Duplicate*.

<figure><img src="/files/scwCYsG6GHgCkTbg6Ggk" alt="Duplicate page from the contextual dropdown menu."><figcaption><p>You can duplicate a page by clicking the contextual page menu and selecting <em>Duplicate.</em></p></figcaption></figure>

Regardless of the method you choose, you will be asked to provide a name for the clone and confirm which page to clone in the page dropdown marked below:

<figure><img src="/files/Pp5B4yWZRFC3Ujcuh6oA" alt="Giving the duplicated page a name."><figcaption><p>Give the duplicated page a name, and select which page to clone.</p></figcaption></figure>

## Page properties

Each page can have their own individual settings configured that affects how that page looks and behaves. Settings are available in the **Property Editor.**

There are two ways to access the page settings:

1. Left-click anywhere on the page itself (avoid clicking on another group or element).
2. Clicking on the page in the page's [element tree](#user-content-fn-8)[^8].

<figure><img src="/files/ZaYvG8w7xKIkq3HfEzTQ" alt="Selecting the page in the element tree."><figcaption><p>To select the page from the element tree, click it at the top of the tree.</p></figcaption></figure>

{% hint style="info" %}
For the full list of all page properties, see our [page properties](/core-resources/elements/page-element) article in the core reference.
{% endhint %}

When you select the page, Bubble automatically displays the element property editor on the right side of the screen:

<figure><img src="/files/2ZbhZ8ssFMu9PCVRNkW7" alt="Element property editor for the page element."><figcaption><p>Clicking anywhere on the page opens up the element property editor for the page.</p></figcaption></figure>

### Visual

The **Visual** tab lets you control the visual properties of the page, such as its content type, layout, size, style, background, and appearance.

### Interaction

The **Interaction** *tab* lets you control the page's interactive properties, such as workflows, transitions and meta tags.

### Conditional

The **Conditional** tab lets you change the page's properties when one or more conditions[^9] are true.

## Organizing your pages

Pages can be organized into folders in the Bubble editor to make them easier to find.

{% hint style="warning" %}
Organizing pages into folders makes it easier to find them in the editor, but it doesn't affect the page's URL or how users navigate to it in your app.
{% endhint %}

### Creating a page folder

To create a new page folder:

{% stepper %}
{% step %}

### Click the *New* button in the page navigator

Open the page navigator and click on the *New* button in the upper right corner.
{% endstep %}

{% step %}

### Name the folder

Click *Folder* in the dropdown menu and enter a name in the dialog that appears.
{% endstep %}
{% endstepper %}

<figure><img src="/files/ut9cPZsuRQiZY3UkNmAU" alt="Creating a new page folder."><figcaption><p>Create a new page folder by selecting <em>New</em> and then <em>Folder</em>.</p></figcaption></figure>

### Adding a page to a folder

To move a page into a folder:

{% stepper %}
{% step %}

### Open the page contextual menu

Open the page navigator, and click the contextual menu icon next to the page name.
{% endstep %}

{% step %}

### Click *Manage folder*

Click *Manage folder* and select the folder you want to page the page into.
{% endstep %}
{% endstepper %}

{% hint style="info" %}
You need to [create a folder](#creating-a-page-folder) before you try to move a page.
{% endhint %}

<figure><img src="/files/oR01C5uiya4fJsV315cA" alt="Move a page into a folder."><figcaption><p>Click the page's contextual menu and select <em>Manage folder</em> to move it into a folder.</p></figcaption></figure>

### Managing folders

You will find all the folders you've created at the bottom of the page navigator. Use the contextual menu to delete a folder.

<figure><img src="/files/purLlHSUc9rT2j0nEYUi" alt="Managing page folders in the page navigator."><figcaption><p>Open the page navigator, and you can manage folders at the bottom.</p></figcaption></figure>

<details>

<summary>Video lessons</summary>

Video: [How to organize your pages in folders](https://youtu.be/VriA0xZg7co)

</details>

## FAQ: Pages

<details>

<summary>Can I add page folders to my URL structure?</summary>

Bubble doesn't support page folders in your app's URLs. Every page follows the same URL structure described above, regardless of how it's organized in the editor.

</details>

<details>

<summary>Can I publish and unpublish pages?</summary>

All pages are public. Once a page is created, it's accessible in your app as soon as changes are deployed. If you'd like to keep the elements on a page without making the page available to users, you can convert its contents into a reusable element and store them there instead.

</details>

<details>

<summary>How do I navigate between pages?</summary>

To send a user to another page, use the [*Go to page*](/core-resources/bubble-workflows/bubble-actions/navigation-actions-in-web-apps#go-to-page) workflow action or the [link element](/core-resources/bubble-elements/element-properties/web-element-properties/visual-element-properties/link-element).

</details>

<details>

<summary>Can I restrict a page to logged-in users?</summary>

Yes. You can restrict access using a workflow that triggers on page load, checks whether the user is logged in, and redirects them to a login page if they aren't. Keep in mind that page-level redirects aren't fully secure on their own, since page assets are downloaded to the client before the redirect runs. Sensitive data should always be protected with privacy rules in the database.

</details>

<details>

<summary>What's the difference between a page and a reusable element?</summary>

A page is a standalone canvas that users can navigate to via a URL. A reusable element is a component you build once and use in multiple places, such as a header, footer, or shared form. Pages appear in the navigation and have their own URLs, while reusable elements are embedded inside pages or other reusable elements.

</details>

<details>

<summary>Can two pages share the same URL?</summary>

No. Every page in your app must have a unique name, and each name maps directly to a URL. If you want two pages to appear at the same URL, you'll need to combine them into one page and use conditions or dynamic groups to show different content based on the situation.

</details>

<details>

<summary>Can I use dynamic URLs, like `/product/[product-name]`?</summary>

Yes. Bubble supports dynamic URLs by giving the page a type of content and passing data to it. Use the *slug* field on a data type to show a URL-friendly name.

</details>

<details>

<summary>What happens if a user visits a page that doesn't exist?</summary>

Bubble automatically shows a 404 error page. You can customize the design of the 404 page in the same way as any other page in your app.

</details>

<details>

<summary>Can I make a page load faster?</summary>

Yes. A few things help: reduce the number of elements on the page, limit the amount of data loaded at page load, avoid heavy media files where possible, and use conditions to defer rendering of non-essential content. Bubble also caches assets automatically for repeat visits.

</details>

## Other ways to learn

<details>

<summary>Related articles</summary>

* Core reference: [*Go to page*](https://manual.bubble.io/help-guides/design/elements/web-app/pages/-MTujrgFLiHe7MfwSBOF#go-to-page-...)
* Core reference: [The link element](/core-resources/elements/visual-elements#link)
* Article section: [The link element](/help-guides/design/elements/web-app/visual-elements#link)
* Article series: [Navigation](/help-guides/logic/navigation)

</details>

<details>

<summary><mark style="color:blue;">Core reference:</mark> page element settings</summary>

Reference: [The page element](/core-resources/elements/page-element)

</details>

<details>

<summary><mark style="color:blue;">Video lessons</mark></summary>

* [How to use the page element](https://youtu.be/9MBzCjbJnNI)
* [How to set a new index page](https://youtu.be/UrWYCO1bdhM)
* [How to organize your pages in folders](https://youtu.be/VriA0xZg7co)

</details>

[^1]: **Input elements** are components that let users provide different types of data, such as text, numbers, and dates. This data can be saved to the database or used elsewhere in your app.

    With input elements, you can build anything from simple sign-in pages to intricate forms.

    **Article series:** [Input forms](/help-guides/design/elements/web-app/input-forms)

[^2]: **HTTP error codes** are messages the server sends to the user's browser when something goes wrong.

    A 404 error means the page couldn't be found on the server.<br>

    **Article section:** [What is the HTTP protocol?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-the-http-protocol)

[^3]: A branch is an independent iteration of your application that can be developed in isolation. You can see the creation of a branch as splitting your app into two copies, kind of like two cells dividing. The cells are genetically identical clones at first, but can keep evolving independently of each other.\
    \
    Article section: [Environments and branches](#environments-and-branches)

[^4]: For each custom *branch you create in your app,* Bubble generates a unique ID.\
    \
    Article: [Version control](/help-guides/maintaining-an-application/version-control)

[^5]: A branch is an independent iteration of your application that can be developed in isolation.

    You can see the creation of a branch as splitting your app into two copies, kind of like two cells dividing. The cells are genetically identical clones at first, but can keep evolving independently of each other.\
    \
    Article section: [Environments and branches](#environments-and-branches)

[^6]: **URL-safe** means the text is in a format a browser can read as part of a URL.

    Special characters like spaces, slashes, and ampersands can cause issues and should be avoided.

[^7]: **URL encoding** converts a string of text into a format the browser can read as part of a URL without errors.

    For page names, Bubble applies URL encoding automatically whenever it's needed.

[^8]: The element tree shows the hierarchy of all elements on the current page. You can use it to open the settings for any element, including the page itself.

    **Article:** [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)

[^9]: Conditions in Bubble are expressions that return either true or false, and use that result to change how an element looks or behaves.\
    \
    Article: [Conditions](/help-guides/logic/conditions)
