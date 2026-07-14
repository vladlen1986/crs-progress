# The page
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/the-page · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The page is the blank canvas on which you design your app's user interface.

At the core of everything related to design and user interface in Bubble is the **page.**

This is the canvas on which you place [input elements](#user-content-fn-1)[^1], text, images, icons, videos and everything else that your users need to make use of your app.

<figure><img src="/files/g7vknD4UEVoQUWqiNbZL" alt=""><figcaption><p>The page gives you a blank canvas on which to build your vision.</p></figcaption></figure>

## What is a page?

No matter what kind of application you want to build, from a simple website to a complex eCommerce platform, the page remains the starting point for all your design and development efforts. You can see the page itself as the lowest level in the hierarchy of a page's structure, where every element you add to it is contained within that page.

<details>

<summary>What is a page's hierarchy structure?</summary>

A Bubble page is composed of three types of components:

* The page\
  The page is the top-level component of a webpage and is responsible for organizing the groups and elements on the page.\
  **The page is the top container for all elements**<br>
* Groups:\
  Groups are used to group elements together and control their layout. They can be thought of as "boxes" that hold other elements. They can be styled or they can be invisible to the user and can contain Elements and even other Groups to create a hierarchy. Groups are a major part of your page's design as they determine how your other elements behave.\
  **Groups are containers for elements and for sub-groups**<br>
* Elements\
  Elements are the actual content that your users see and interact with to work with your app, such as buttons, links, images, icons and input fields.\
  **Elements are the things that users interact with on the page**

The way in which these components are organized and styled determines the overall layout and design. From a technical viewpoint they make up the page's hierarchy structure.

It helps to see it in a schematic form:\
\ <img src="/files/Emo25jup9urlf7TtebOQ" alt="" data-size="original">

In a way, the hierarchy above is how your browser "sees" the page before rendering the results on the screen.

You can read more about the element hierarchy in the article below:

Article: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)

</details>

## Default pages

When you create a new Bubble application, a few pages are included by default. These pages have a few traits in common:

* They are always present when your app is created
* You cannot change their names
* You cannot delete them

#### index

The index page is the main page of your app (more on that [below](#the-index-page)).

#### 404

The 404 page is where your users are taken if they type in an URL in the URL bar that includes your domain, but the page name they enter doesn't exist:

```
https://appname.bubbleapps.io/non-existing-page
```

The 404 is an [http error code](#user-content-fn-2)[^2] that is used to tell your browser that the page doesn't exists.

<figure><img src="/files/zlsllbd9jgBmk6UTw1i1" alt=""><figcaption><p>The 404 page can be edited freely just like any other page – but it can't be deleted.</p></figcaption></figure>

You can use this page to tell your users that the page couldn't be found and point them in another direction.

#### reset\_pw

This is the page to which your users are directed if they need to reset their password. They will most likely follow a link in a reset password email to this page.

<figure><img src="/files/JNL36W1zV3p3SOOmthaj" alt=""><figcaption><p>The reset_pw page is a special page that lets your users reset their password safely. It's part of Bubble's core functionality and can't be removed or renamed.</p></figcaption></figure>

## The index page

The index page is the main page of your application – the first page that will load when a user types in your app's domain in the browser's URL bar. It's also the only page that can be displayed *without* showing the page's name.

For example, the below URL's would take you to the index page even if you are not including the page's name in the URL:

#### No custom domain

<table><thead><tr><th width="185">Version</th><th>URL</th></tr></thead><tbody><tr><td><strong>Development</strong></td><td>https://appname.bubbleapps.io/version-test</td></tr><tr><td><strong>Live</strong></td><td>https://appname.bubbleapps.io</td></tr></tbody></table>

#### Custom domain

<table><thead><tr><th width="185">Version</th><th>URL</th></tr></thead><tbody><tr><td><strong>Development</strong></td><td>https://www.mydomain.com/version-test</td></tr><tr><td><strong>Live</strong></td><td>https://www.mydomain.com</td></tr></tbody></table>

If your app has any custom branches[^3] set up in version control, the *version-test* part of the URL is replaced by the ID[^4] of the currently active branch.

### Setting an index page

When you create an app in Bubble, the index page is created automatically. You cannot name another page index, but you can replace it by using the *Make this page the new index* function.

<figure><img src="/files/iO0QLeKWtkTwfze5eyRf" alt=""><figcaption></figcaption></figure>

The old index page will be named *old\_index.*

<details>

<summary>Video lesson</summary>

Video: [How to set a new index page](https://youtu.be/UrWYCO1bdhM)

</details>

### The page URL

Every page that you add automatically has a unique URL assigned that your users can access to visit that page, just like any other website. All pages follow the same URL pattern: by combining the root URL of your application with the name of the page:

#### No custom domain

<table><thead><tr><th width="166">Version</th><th>URL</th></tr></thead><tbody><tr><td><strong>Development</strong></td><td>https://myapp.bubbleapps.io/version-test/<strong>page-name</strong></td></tr><tr><td><strong>Live</strong></td><td>https://myapp.bubbleapps.io/<strong>page-name</strong></td></tr></tbody></table>

#### Custom domain

If you have connected your app to a custom domain, the URL will look like this:

<table><thead><tr><th width="154">Version</th><th>URL</th></tr></thead><tbody><tr><td><strong>Development</strong></td><td>https://mydomain.com/version-test/<strong>page-name</strong></td></tr><tr><td><strong>Live</strong></td><td>https://mydomain.com/<strong>page-name</strong></td></tr></tbody></table>

{% hint style="info" %}
If your app has any custom branches[^5] set up in version control, the *version-test* part of the URL is replaced by the ID[^4] of the currently active branch.
{% endhint %}

## Creating a new page

To create a new page, click the dropdown in the upper left corner of the Bubble editor, right next to the Bubble logo. In the dropdown, click *Add a new page...*

<figure><img src="/files/ETrjyYCtfFXDU2w8fNFm" alt=""><figcaption></figcaption></figure>

You will be asked to provide a name for the new page and whether you want to [clone an existing page](#cloning-a-page).

<figure><img src="/files/cqMbWKweMRJZDJp8EZhh" alt=""><figcaption><p>You can give your page any name you want, as long as it's URL safe and unique in this application.</p></figcaption></figure>

### Naming your pages

You can create as many pages in your app as long as they have unique names. Keep in mind when naming pages that they need to be [URL safe](#user-content-fn-6)[^6]. Any non-URL safe strings you provide will automatically be [URL encoded](#user-content-fn-7)[^7].

A simple rule of thumb for page names is to only use the english letters a-z and numbers 0-9 and replace spaces with dashes. During URL encoding, Bubble will:

* change the text to lowercase
* replace spaces with -
* replace special characters with \_

## Cloning a page

Cloning a page means to create an exact copy of that page under a new name. The entire page, including all elements and workflows will be copied.

There are two ways to duplicate a page:

By selecting *Add new page...*

<figure><img src="/files/ETrjyYCtfFXDU2w8fNFm" alt=""><figcaption><p>To clone a page, you can use the <em>Add new page...</em> menu item</p></figcaption></figure>

... or by having the page you want to duplicate open in the editor and selecting *Edit - Duplicate this page:*

<figure><img src="/files/5Oig167EOYvxNDfKdCq1" alt=""><figcaption><p>You can also clone the page by selecting <em>Duplicate this page</em> while having the page you want to clone open in the editor.</p></figcaption></figure>

Regardless of the method you choose, you will be asked to provide a name for the clone and confirm which page to clone in the page dropdown marked below:

<figure><img src="/files/FPg3WSfSlImaFyQ9Xgcq" alt=""><figcaption></figcaption></figure>

## Page properties

Each page can have their own individual settings configured that affects how that page looks and behaves. Settings are available in the **Property Editor.**

There are two ways to access the page settings:

1. Double-click with the left mouse button anywhere on the page itself (avoid clicking on another group or element
2. Clicking on the page in the page's [element tree](#user-content-fn-8)[^8]

<figure><img src="/files/N6JeXoD96fS1XJLdUXVc" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
For the full list of all the settings for the page, see our [page settings core reference.](/core-resources/elements/page-element)
{% endhint %}

The page's settings are available in the Property Editor, as illustrated below:

<figure><img src="/files/uSTCjB7chqgi8FRhJq33" alt=""><figcaption></figcaption></figure>

### Appearance

The *Appearance* tab lets you control the visual properties of the page, such as the background style and colors, as well as what kind of data the page should hold and its SEO metadata.

### Layout

The *Layout* tab lets you control the page's responsive properties, or how it's layout is structured and changes across different screen sizes. You can read more about layouts in our guide on [responsive design](/help-guides/design/responsive-design).

### Conditions

The *Conditions* tab lets you change the [Page title](#user-content-fn-9)[^9] and background styling if one or more certain conditions[^10] are true. You can read more about this in our article on [Conditions](/help-guides/logic/conditions).

## Organizing your pages

Pages can be organized into folders in the Bubble editor to make them easier to find.

{% hint style="warning" %}
Organizing pages into folders makes it easier to find the pages you need to open in the editor, but they do not affect the URL or navigation experience of the page in your app.
{% endhint %}

### Adding a page to a folder

To move a page into a specific folder, do the following:

* Open the Property Editor for the page by double-clicking anywhere on the page itself (not on another group or element)
* In the Property Editor, navigate to the *Appearance* tab and scroll to the bottom:\
  ![](/files/XI1JUM34XEcJtM65DPKk)
* Pick a folder, or create a new one. You can leave the dropdown blank to remove it from a folder.<br>

### Navigating your folders

You will find all the folders you create in the upper right corner of the page navigator (which is located in the top left corner of the Bubble editor).

<figure><img src="/files/nyykeTR3vhPK6nKOaE2c" alt=""><figcaption><p>Folders let you organize the pages in your app to make them easier to find. Folders do not affect the URL of the page in your Bubble app.</p></figcaption></figure>

<details>

<summary>Video lessons</summary>

Video: [How to organize your pages in folders](https://youtu.be/VriA0xZg7co)

</details>

## Frequently asked questions

#### Can I add page folders to my URL structure?

Bubble does not support page folders in your app's URL's. As such, all pages follow the same structure as [described above](#the-page-url).

#### Can I publish and un-publish pages?

All pages are public, meaning that as soon as you have created one, they can be accessed in your app. Keep in mind that changes need to be deployed before they are visible in your live app – this applies to pages too.

If you'd like to keep the elements on a page but not make the page available to your users, you can convert the contents of the page into a r[eusable element](#user-content-fn-11)[^11] and store them there.

#### How do I navigate between pages?

To send a user to another page, you can use the [*Go to page*](https://manual.bubble.io/help-guides/design/elements/web-app/pages/-MTujrgFLiHe7MfwSBOF#go-to-page-...) action or the [link](/help-guides/design/elements/web-app/visual-elements#link) element.

<details>

<summary>Related articles</summary>

* Core reference: [*Go to page*](https://manual.bubble.io/help-guides/design/elements/web-app/pages/-MTujrgFLiHe7MfwSBOF#go-to-page-...)
* Core reference: [The link element](/core-resources/elements/visual-elements#link)
* Article section: [The link element](/help-guides/design/elements/web-app/visual-elements#link)
* Article series: [Navigation](/help-guides/logic/navigation)

</details>

## Other ways to learn

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

[^1]: Input elements are components that allow the user to provide various types of data, such as text, numbers, and dates that can be stored in the database or used for other means.\
    \
    Using input elements, you can setup anything from simple sign-in pages to intricate forms.

[^2]: HTTP error codes are messages sent by by the Bubble server to the users browser to notify if something goes wrong.\
    \
    404 simply means that the page couldn't be found on the server.<br>

    Article section: [What is the HTTP protocol?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-the-http-protocol)

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

[^6]: URL safe means that the text needs to be in a format that a browser can read as part of a URL.\
    \
    Special characters (such as spaces, slashes, ampersands etc) may cause issues and should be avoided.

[^7]: URL encoding means to convert a string of text into a format that a browser can read as part of a URL without generating any errors.\
    \
    In the context of page names, Bubble automatically applies URL encoding to any page names that need it.

[^8]: The *element tree* is the part of the Bubble editor that shows the hierarchy of all the elements on any given page.\
    \
    You can use the element tree to open up the settings for any element including the page itself.

[^9]: The Page title is the title that is displayed in the browser bar when the page is open and often in the search results if someone finds your page in a search engine.\
    \
    Not to be confused with the *page name* which is the actual name of the page visible in the URL.

[^10]: Conditions in Bubble are expressions that can be set up to give a result that is either true or false, and use that result to change how an element looks.\
    \
    Article: [Conditions](/help-guides/logic/conditions)

[^11]: Reusable elements are a way to create groups of elements that can be used in more than one place.

    For example, if you have created a navigation toolbar, you may want that same toolbar to be visible on multiple pages, and only have to make changes to it once to update all of them.

    Article: [Reusable elements](/help-guides/design/elements/reusable-elements)
