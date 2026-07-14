# SEO: Page
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/seo/seo-page · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers the SEO settings for the page and how they can affect your rankings

From an SEO perspective, the pages in your app consist of three important data areas:

* **The URL**, or the *web address* your page tells both your users and search engines what the page is about.
* **Metadata** is data "about" the page: its title, description and social media images.
* **Content** is the actual information on your page – the design, text, images and videos that both your users and search engines see

Let's explore each of these areas.

## The URL

{% hint style="info" %}
The URL is a part of the HTTP protocol – a big part of how the internet works. If you want to learn more about the technical side of how the HTTP protocol works, you can check out the article section below:

Article section: [The HTTP protocol](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-the-http-protocol) (advanced)
{% endhint %}

The URL is the humanly readable "address" of the page. It's used by search engines to isolate content: for example, one page in your app may be about *sports shoes* and another about *horses:* they would both have a unique URL and can show up differently in search results.

URLs serve a function both for search engines and your users; they are the humanly readable way to access the page, and as such should be clear and understandable.

For example, compare the URLs below:

```
❌ https://www.my-bubble-application.com/mcakos/najsdnf
```

```
✅ https://www.my-bubble-application.com/product/runnning-shoes
```

The first one is not easy to decipher, but the last one gives an easily understandable indication of what the page is about.

#### Can I set up page folders?

Bubble doesn't use page folders in the traditional sense, but instead relies on *dynamic pages*. These are pages where the content is dynamically generated from database data, and it can be used to set up unique pages for each database thing. Read more about this in the section below.

### Dynamic pages

Every page lets you set a *type of content.* This tells Bubble what kind of data you want to load onto the page and it's how you set up dynamic pages with unique URLs.

Let's say that you have an eCommerce store. On a page called *products* you want to dynamically show different products from your database. The data type is called *Product*.

<figure><img src="/files/aQWrHSXyXi1yTV034BXt" alt=""><figcaption></figcaption></figure>

In the example above, we've set the *Type of content* to the *Product* data type. This means Bubble is ready to accept a Product thing that we'll pass through the URL. There are two ways in which Bubble will recognize a page thing in the URL:

* The thing's [unique ID](#user-content-fn-1)[^1]
* The thing's slug[^2]

The unique ID is automatically created whenever a database thing is created, and as such, that field is never empty. The *slug* on the other hand, can be left empty and can be added or modified as needed. Let's say we have a *Baseball cap* product in our database – we could give that the slug *baseball-cap* to give that product its own unique URL:

```
https/www.my-bubble-application/product/baseball-cap
```

This is a nice, humanly readable URL that makes it clear to your users what the page is all about. But search engines see this in the same way: while you only have one page (product), search engines considers the *slug* a page on its own. Using the slug, you can set up just one page, but potentially hundreds, thousands or even millions of unique URLs that each contain unique content.

For example, if your eCommerce was selling sports goods, every product in your inventory would get its own unique URL and could be found in search engines. Instead of searching for your *app,* new customers would find your site by searching for things like baseball caps and golf equipment.

#### What happens if the slug is empty?

If you leave the slug field empty, Bubble defaults to using the things Unique ID instead.

<figure><img src="/files/K4JTsloqqfEqGatulDa7" alt=""><figcaption></figcaption></figure>

Selecting a value the *Backup field for URL* will instruct Bubble to use another field as a backup in case the slug field is empty (in this case the name) – but there's a caveat: since the URL needs to be unique (and the name field does not), Bubble will append the unique ID to a web-friendly version of the name. The result might look something like this:

{% code overflow="wrap" %}

```
https://my-bubble-application.com/product/product-1-1676895473036x923438355480530400
```

{% endcode %}

So if you want readable, SEO-friendly URLs, we recommend making sure the slug field is never empty.

#### Changing URLs

Also keep in mind that URLs that keep changing will need to be re-indexed by search engines, and they might consider it new – or even duplicate – content, which hurts your ranking. It's best to employ a strategy where you keep your URLs as consistent as possible:

* Once set, don't change the slug field on a database thing
* Don't change the names of your pages

Keep in mind that these are not absolute rules, but rather guidelines to incorporate within your overall SEO strategy. Sometimes, changes are needed, and that's fine.

{% hint style="info" %}
If you decide to change the URL of a page (page name or thing's slug), you can inform search engines that the content has moved by using a [301 redirection](#user-content-fn-3)[^3].

Article section: [301 redirects](/help-guides/maintaining-an-application/seo/seo-app#301-redirects)
{% endhint %}

## Metadata

Metadata is a data *about* the page. It's not necessarily visible on the page itself, but is part of the page's code and helps search engines understand what the page is about. Information contained within a page's metadata is also often visible in the preview that search engines provide of a given page in the result.

You can think of metadata then serving two purposes:

* One is to "convince" the search engine that your page is a relevant result for a given search by including relevant keywords
* The second is to make potential visitors want to *click* your page instead of another page in those same search results

So while you should have the search engine robots in mind when setting up your metadata, you should also keep in mind that in the end, your potential readers are human beings that will also judge the quality of your page in terms of its title, description and structure.

<figure><img src="/files/2ubPheegng5bdokOWyd5" alt=""><figcaption><p>Here's how the title and description Bubble's main page looks in the desktop and mobile version of a Google search.</p></figcaption></figure>

Optimally, all your pages should have unique metadata, so that search engines and users understand the difference between them and they don't end up competing with each other.

Metadata is a wide field of different ways you can standardize data to communicate to search engines what your page is about, but the most common fields consist of the following:

### Page Title

The page title is short representation of your page's content. It's often displayed prominently in search engine results and it's visible to your user's in the browser tab. When crafting a page title, ensure it is descriptive, relevant, and includes your target keywords. Google may use this field, the SEO title below or craft its own title to represent the content in a given search.

If you have experience working with HTML, this field defines the page title as illustrated with the code below:

```html
 <title>Your Page Title</title>
```

### Title (for SEO / FB)

The *Title (for SEO / FB)* defines the OpenGraph title. If you have experience working with OpenGraph, this represents the fields below:

```html
<meta property="og:title" content="Your Page Title" />
```

This is essentially an optimized version of your page title, specifically tailored for search engines and social media sharing. It is often the first line of text that appears in search engine results and should be engaging and relevant to your content. To maximize its effectiveness, keep it under 60 characters and incorporate the primary keywords for this page.

Search engines may use this field, the page title above or craft its own title to represent the content in a given search.

### Description (for SEO / FB)

The *Description (for SEO / FB)* defines the OpenGraph description. If you have experience working with OpenGraph, this represents the fields below:

```html
<meta property="og:description" content="A brief description of your page content." />
```

This is an optimized summary of your page, designed for search engines and social media sharing. It typically appears beneath the title in search engine results or as a preview when the page is shared on platforms like Facebook or X. To make it effective, keep it concise (under 160 characters) and ensure it clearly conveys the core message of the page.

Search engines may use this field, extract a description from the page content, or generate their own.

### Social Media Image

The social media image is the visual representation of your content when it's shared on social platforms like Facebook and X. Select an image that accurately represents your content and is visually appealing and keep in mind that posts that include an image will take up more space on a social media wall, which can lead to a higher click-through rate.

### Example (OpenGraph)

The metadata that you add in the *Title (for SEO / FB)* and *Description (for SEO / FB)* are used by social media and other sharing platforms to generate a preview of the content that is shared. How exactly it ends up looking can vary between platforms and is subject to change.

The example below shows how a social media post of Bubble's homepage would look on Facebook:

<figure><img src="/files/kqwgVzdXiHmt8rx2uymq" alt="" width="483"><figcaption></figcaption></figure>

From top to bottom in this example, we are seeing:

* The social media image (blue background, text and logo in one image)
* The domain (bubble.io)
* The OpenGraph title (as defined in *Title (for SEO / FB)* field)
* *The OpenGraph description (as defined in Description (for SEO / FB)* field)

### Page HTML Header and HTML elements

The page HTML header can contain various tags and information that help search engines understand and index your content.

These tags include:

* additional meta tags
* structured data
* canonical tags
* language tags

Using the HTML header for SEO purposes is among the more advanced strategies and is outside the scope of this guide, but there are many tutorials and Youtube videos available that go in-depth on this topic.

#### Metadata in the page body

Some metadata (such as Schema.org[^4] Microdata and JSON-LD[^5] (JavaScript Object Notation for Linked Data) can also be placed in the body of your page, which gives access to a broader set of data sources. You can do this by placing an [HTML element](#user-content-fn-6)[^6] on the page. This is getting into fairly advanced SEO territory, and is outside the scope of this article.

### Metadata settings in Bubble

First, keep in mind that there are separate *app* settings and *page* settings. The metadata we discuss in this article relates to the page, and can be different on every page in your app. They can also contain dynamic content, as we'll explore later in the article.

### Accessing a page's metadata

Since the metadata we want to work with is stored in a *page* basis, we first need to navigate to the page that we want to work with in the Bubble editor. Use the page navigator to open the page.

The settings are found in the [element inspector](#user-content-fn-7)[^7] of the page itself. You can access this by double-clicking the page in the editor, or clicking the name of the page at the top of the [element tree](#user-content-fn-8)[^8] (such as *page index*).

<figure><img src="/files/orysSFHr2AercL0RtGTl" alt=""><figcaption><p>All the metadata for the page can be edited on the</p></figcaption></figure>

Each of the fields can be filled with static content, or you can populate it with dynamic content from the data on the page.

### Populating metadata with dynamic content

The metadata fields accept dynamic content from the following data sources:

* [Current User](#user-content-fn-9)[^9]
* [Current page thing](#user-content-fn-10)[^10]
* [Do a search for](#user-content-fn-11)[^11]
* [Get an option](#user-content-fn-12)[^12]
* [Arbitrary text](#user-content-fn-13)[^13]
* [Get data from page URL](#user-content-fn-14)[^14]
* [App text](#user-content-fn-15)[^15]
* [Arbitrary date/time](#user-content-fn-16)[^16]

In addition, it accepts static text values so that you can give any page the title and description you want without referencing any data sources.

## Content

As we explored in our Introduction to SEO, the *content* of your page remains one of the most important parts of your SEO. Generally, the rule of thumb is as simple as it is challenging: the content should be high-quality.

While it's outside of the scope of this guide to try to determine *what* quality content is, there are still guidelines that can help you gain a higher ranking.

### Design

The design of the page matters from a SEO perspective too: while search engines may not care whether your app looks *good* per se, it cares that it's accessible:

* Organize your app with a logical structure and provide clear, easy-to-use navigation menus
* Ensure good contrast between page elements like text and background to improve readability. For instance, dark grey text on a light grey background may be challenging for visually impaired users
* Size and distribute elements in a way that makes it easy for all users to interact with them. For example two buttons that are too small or placed too closely together can make navigation difficult
* Add *alt text* to your images: this not only tells search engines what the images are, but it helps visually impaired users understand your content and shows a text if the image doesn't load
* Use descriptive link texts: search engines look at the label of a link when they try to understand what the link is about. Instead of just using the name of the page you are linking to, you can use the opportunity to describe it from another angle. For example, a page with the title *SEO tutorial* could have a link that says *Learn SEO basics.*

### Text

The easiest way for a search engine to understand the content of the page is to scan its text for keywords.

* Write for people, not for bots
* Use keywords in a natural way: keywords are the corner stone of your content; it's basically *what* the user wants to find. You should use keywords in your text content repeatedly, but not in an exaggerated way (known as keyword stuffing). Make the text useful and enjoyable, and make sure to mention keywords where it makes sense.
* Use headers: Headers (such as `<h1>`, `<h2>`, etc) is how search engines understand your pages structure. Split your text into sections and use a clear and structured hierarchy. You can enable tags for text elements by going to *Settings - SEO / metatags* and checking *Expose the type of tags for text elements*.
* Link pages together: when relevant, [place links within your text](#user-content-fn-17)[^17] to other pages in your app or even to external pages.

### Media

Mix media on your pages where possible. Use a mix of text, images and video to make it as useful a page for your users as possible. Keep in mind that some types of media can increase the download size of your page.

### Page load

Search engines also consider two more factors when evaluating your content:

* Total page download size: A lightweight page can achieve better rankings, as it is considered more user-friendly, particularly for mobile devices. The things that typically add to its total size is large images, fonts, external Javascript files (sometimes added by plugins). In essence, the less stuff you add to a page, the lighter it is.
* Total page load time: The time it takes from the page is opened until the content is finished rendering on the screen is also an important factor in your ranking. Avoid placing heavy, complex searches and workflows on page load, and reduce the page's total size to optimize it for fast loading.

Bubble has a base loading time on all pages that we are continually working to optimize.

[^1]: Each database thing in Bubble has a *unique ID*. This is a 32-character unique string of text and numbers that identifies each thing.\
    \
    Unique IDs are automatically generated and cannot be changed.

[^2]: The *slug* is a built-in field on all data types that consists of a text string. This can be used to set up a is a humanly readable and unique text identifier for each specific thing.\
    \
    This in turn is used to instruct Bubble to load a thing onto a page by using the slug. In the context of our example in this article, a specific product could have the slug *baseball-cap*, making its full URL *https/[www.my-bubble-application/product/baseball-cap](http://www.my-bubble-application/product/baseball-cap)*.

    Article: [Using the page slug](/help-guides/logic/navigation/page-slugs)

    Video: [How to Setup Page Slugs](https://www.youtube.com/watch?v=jWrIV4YR5Oo)

[^3]: In the HTTP protocol, a permanent redirect is represented by the status code *301 Moved Permanently.*

    This code informs browsers and search engines that the requested resource has been permanently moved to a new location, and all future requests should be directed to the new URL

    Article section: [301 redirections](/help-guides/maintaining-an-application/seo/seo-app#301-redirects)\
    Article section: [The HTTP protocol](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-the-http-protocol)

[^4]: Schema.org is a collaborative, community that creates, maintains, and promotes schemas for structured data on the Internet. It's used by search engines and in many other types of technology.\
    \
    External page: [Schema.org](https://schema.org/)

[^5]: *JavaScript Object Notation for Linked Data* is a method for embedding structured data within the page.

    It's often used in combination with Schema.org vocabulary to describe various types of entities, such as people, events, organizations, and products.

[^6]: The HTML element lets you place custom code such as HTML, CSS and JavsScript directly on the page.

[^7]: The *element inspector* is the floating window that becomes visible any time you are editing an element such as the page, an input form or a button.

    This is where you change the settings of that element, such as the SEO metadata in the context of this article.

    Reference: [Element inspector](/core-resources/bubbles-interface/design-tab#element-inspector)

[^8]: The *element tree* is the tree-structured overview of all the elements on a given page. It's visible on the left-hand side of the screen in the Design tab.

    Clicking any element in the tree will select that element and

[^9]: The *Current user* data source returns the data associated with the user currently using the app.\
    \
    Article: [User accounts](/help-guides/data/user-accounts)\
    Reference: [Current user (data source)](/core-resources/data/data-sources#current-user)

[^10]: The *Current page thing* reflects the database thing that is loaded onto the page. It's set using the *Type of content* field on the page element inspector.

[^11]: *Do a search for* is a data source that lets you search your app's database using constraints.\
    \
    Article: [Finding data](/help-guides/data/the-database/finding-data)

    Reference: [Do a search for (data source)](/core-resources/data/data-sources#do-a-search-for)

[^12]: *Get an Option* is a data source that pulls from the Option sets you have created in your app.

    Article: [Option sets](/help-guides/data/static-data/option-sets)\
    Reference: [Get an option](/core-resources/data/data-sources#get-an-option)

[^13]: *Arbitrary text* is a data source that lets you manually enter a static or dynamic string of text.

    Reference: [Arbitrary text](/core-resources/data/data-sources#arbitrary-text)

[^14]: *Get data from page URL* is a data source that pulls data from URL parameters.

    Article: [URL parameters](/help-guides/data/temporary-data/url-parameters)

    Reference: [URL parameters (data source)](/core-resources/data/data-sources#get-data-from-page-url)

[^15]: App texts, short for *Application texts and messages* is a sort of database for text strings that you can use around your app. It can be used for a single language, but Bubble also lets you translate all the strings into different languages to offer your users a multilingual app.\
    \
    Article: [App texts](/help-guides/data/static-data/app-texts-translations)\
    Reference: [App text (data source)](/core-resources/data/data-sources#application-text)

[^16]: Arbitrary date/time is a data source that lets you translate a date in a string of text into a properly formatted date.

    Reference: [Arbitrary date/time (data source)](/core-resources/data/data-sources#arbitrary-date-time)

[^17]: There are a few different ways to set up links in Bubble. The article below looks at the different ways to create both static and dynamic links:\
    \
    Article section: [Using links](/help-guides/logic/navigation/multi-page-applications#using-links)
