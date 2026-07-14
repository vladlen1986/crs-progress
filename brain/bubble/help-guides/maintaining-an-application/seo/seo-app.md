# SEO: App
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/seo/seo-app · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers the app-wide SEO features that Bubble offers

The technical side of SEO starts on the app level. Search engines look at your site as a collection of pages under an umbrella: *your* [*domain*](#user-content-fn-1)[^1]. The settings that you set on the app level are less about the identity of your app (with the exception of social media sharing, which we'll cover further down), and more about providing **instructions** to the search engines, such as:

* Which pages to crawl[^2] and not to crawl
* URLs that have been moved and should be redirected to another URL ([301 redirect](#user-content-fn-3)[^3])
* To read a [sitemap file](#user-content-fn-4)[^4]

Some parts of your app's SEO settings can be fairly technical, but if you are not sure if you need them right now, then you most likely don't. We will still cover the basics of each part here.

Your app's SEO settings are found under *Settings - SEO/Meta tags:*

<figure><img src="/files/LNYCibjc0hXd1anukjaq" alt=""><figcaption></figcaption></figure>

## Sharing in social media (OpenGraph)

The first part of your app's SEO settings are the OpenGraph details. This lets you set an identity for your app that social media sites such as LinkedIn, X and Facebook will use when a link to your app is shared. OpenGraph metadata can also affect how your page ranks and is displayed in search engines.

<figure><img src="/files/N2cyOiYjce4aHlYIv4cY" alt=""><figcaption></figcaption></figure>

In the example below from LinkedIn, you can see how as soon as a link is typed into a post, LinkedIn fetches the metadata.

<figure><img src="/files/ruOphul7aRHEZNu9YfTV" alt=""><figcaption></figcaption></figure>

This helps you convey a consistent brand identity across both social media and search.

## SEO settings

### Setting up headers (\<h1>, \<h2>, \<h3>)

The structure of your page plays a role in determining its ranking. A well-structured page involves organizing your text content into distinct sections, each separated by headers at various levels (such as "`<h1>` and "`<h2>`").

By default, the setting to add a tag to a text element is not available, but you can enable it by checking *Expose the type of tags for text elements*.

### Canonical URLs

Imagine you have a well-researched article in your app, and for some reason, it exists in two different places with slightly different URLs. This situation can create confusion for search engines, as they struggle to determine which version should be displayed in search results.

Canonical URLs are the solution to this problem. They act as a signal to search engines, specifying which version of a webpage should be considered the "primary" or "preferred" one. By using a canonical URL, you help search engines avoid indexing multiple versions of the same content, thereby improving your website's search ranking and overall visibility.

The setting *Point URLs to primary domain for better SEO* enables a Bubble-defined canonical url tag.

### Robots.txt

Sometimes, you will want to instruct search engines to *not* crawl specific pages in your app. For example, if your app has a front-facing index page with other pages like *about* and *privacypolicy* you will want those indexed, but you may not want to index backend or admin pages.

Robots.txt (see [example](https://bubble.io/robots.txt)) is a small file that Bubble automatically places in the root directory of your app. It contains instructions to search engine crawlers, specifying which parts of the app they are allowed to access and which parts they should avoid.

By default the development version of your app isn't indexed.

{% hint style="warning" %}
Keep in mind that robots.txt is a *request* to search engines to avoid crawling certain pages. While most search engines will respect this, it doesn't actually *stop* them from crawling. So this is considered an SEO setting – not a security setting.
{% endhint %}

#### How do I instruct search engines to hide a page?

Let's say that you want to hide the two pages *dashboard* and *admin* from crawlers. You use the *Disallow* command in robots.txt along with the page name to do so:

```
User-agent: *
Disallow: /dashboard
Disallow: /admin
```

### Sitemaps

Web crawlers work by following links. If they discover your app's domain and its front page, and this page links to a page called *about*, then the crawler will also index that page.

But what if a page *isn't* linked to? Or if a page contains dynamic content (such as [www.myapp.com/products/running-shoes](http://www.myapp.com/products/running-shoes)) – you may link to the product page, but not to every product in your inventory – which is probably the part you want to index.

{% hint style="info" %}
Keep in mind that for pages with dynamic content, each thing counts as its own separate page, even if they are all loaded on the same page.
{% endhint %}

Sitemaps are like blueprints for your app that help search engines navigate and understand your app's structure more efficiently. They are essentially XML files that list all the pages within your app even if they are not linked to. Bubble can automatically generate a sitemap for all your pages, and for dynamic pages we will include the things in your database that matches the data type specified on the page.

You can select which pages you want to include in the sitemap. When you check the *Expose a sitemap file* box, a list of your pages is displayed. Check each page that you want to include.

### Custom header and body content

All the script and meta tags placed in the header will be inserted between the `<head>` tags on every page of your app, while the scripts added to the body field will be positioned between the `<body>` tags across all pages.

<figure><img src="/files/qDBVrNuREVKiGthUv8oY" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
Adding data to this field will add it to all pages – you can also add it to pages one-by-one in the [settings for each page](/help-guides/maintaining-an-application/seo/seo-page).
{% endhint %}

## 301 redirects

A 301 redirect is a permanent redirection method that helps maintain SEO performance when a page moves to a new location. It simply says:

* The page used to be *here*
* ... and now it's *here*
* ... and it's *permanent* (301)

Bubble offers an easy way to add a *before* and *after* URL. The URLs should be the *full* URL (including the protocol such as https):

```
❌ www.bubble.io/page
```

```
✅ https://www.bubble.io/page
```

#### SEO ramifications of 301 redirects

From an SEO perspective, this is important for a few reasons:

* It helps the search engine find the new page when the old one is missing
* It tells the search engine that the content on the new page is not duplicated – it has simply moved
* It ensures that any referral traffic still reaches the right content

#### When are 301 redirects useful?

301 redirects is useful in any case where you need to instruct search engines that a page has moved.

* Whenever you rename a page
* Whenever you change the slug of a thing you are using as dynamic page content
* If you are moving from a non-Bubble framework and your URL structure or domain changes

### Using wildcards in 301 redirects

Wildcards in 301 redirects allow you to dynamically match parts of a URL and redirect them to a new URL structure. This functionality is especially useful when dealing with groups of URLs that follow a consistent pattern, reducing the need to create individual redirects for each URL.

Wildcards are represented by an asterisk (\*), which acts as a placeholder for dynamic content in the URL. These placeholders can then be referenced in the destination URL to preserve or reorder the dynamic parts of the original URL.

For example:

**From:** `https://www.example.com/page1/*`

**To:** `https://www.example.com/page2`

A request to <https://www.example.com/page1/_anything>\_ will redirect to <https://www.example.com/page2>.

Wildcards can also represent multiple dynamic parts in the URL, which can be carried over to the destination using placeholders like %1, %2, etc., corresponding to the order of the wildcard matches.

#### How to use wildcards in 301 redirects

To enable and use wildcards in 301 redirects, follow these steps:

**Enable Wildcards**

* Check the box labeled *Allow wildcards in redirects for more dynamic urls* in your redirect settings.
* Note: Exact matches for 301 redirects will work regardless of whether this checkbox is enabled.

**Set up the redirect rule**

* Replace dynamic parts of the source URL with \* to indicate wildcards. For example:
* `https://www.test.com/page1/*` -> `https://www.test.com/page2`

**Use placeholders to preserve data**

Wildcard matches can be preserved in the destination URL by referencing them using %1, %2, etc.:

* %1 corresponds to the first \* in the source URL.
* %2 corresponds to the second \*, and so on.

For example:

`https://www.test.com/page1/*/*` -> `https://www.test.com/page2/%1/%2`

**Ensure accuracy in the structure**

While wildcards allow dynamic matching, the slashes (/) in the source and destination URLs must remain accurate and consistent.

For example:

`https://www.test.com/page1/*/*` -> `https://www.test.com/page2/%2/%1`

**Query string behavior**

URL parameters (the query string) are automatically copied over to the destination URL, regardless of the wildcard setup.

For example:

A request to `https://www.test.com/page1/abc?user=123` will redirect to `https://www.test.com/page2/abc?user=123`.

### Hosting files in root directory

Bubble lets you upload files to the root directory. There are many use cases for this, but from an SEO perspective the most common use is to upload a custom sitemap .xml file.

## SEO audit criteria

Chrome features an integrated SEO audit tool (found in Inspector > Audits). This tool highlights criteria that may impact your search results.

Below is an overview of each criterion and how Bubble apps fare:

| Audit criteria                        |                                                                                                              |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Mobile-friendly                       | Use the responsive engine and set up pages that follow mobile best practices                                 |
| \<meta name="viewport"> tag           | Bubble handles this automatically                                                                            |
| Title                                 | Set up titles on all pages and remember dynamic content                                                      |
| Meta description                      | Set up descriptions on all pages and remember dynamic content                                                |
| HTTP status code                      | Bubble handles this automatically                                                                            |
| Links have descriptive text           | Set up all your links with descriptive texts                                                                 |
| Page isn’t blocked from indexing      | Bubble handles this automatically                                                                            |
| "robots.txt is valid                  | Bubble handles this automatically, but you can also [customize it](#robots.txt)                              |
| Image elements have \[alt] attributes | Add alt tags to all images in the property editor of each image                                              |
| Document has a valid hreflang         | Bubble handles this automatically                                                                            |
| Document has a valid rel=canonical    | Bubble handles this automatically, but you can also set up [301 redirects](#301-redirects)                   |
| Document uses legible font sizes      | Font sizes less than 12px are too small to be legible. Use it sparingly (60% of text above bigger than 12px) |
| Document avoids plugins               | This does not apply to Bubble (*plugins* here does not refer to Bubble plugins)                              |

[^1]: Your domain is the root part of your URL, such as [www.bubble.io.\\](http://www.bubble.io.\\)
    \
    All other content in your app is considered a part of that domain.

[^2]: *Crawling* is the process when a search engine scans your site to add it to its index.

[^3]: A 301 redirect is a method used to permanently redirect one URL to another.

    In non-technical terms, it's like forwarding your mail to a new address when you move to a new house.

[^4]: A sitemap file is a document that provides a roadmap of your app's content. It helps search engines understand its structure, making it easier for them to find and index its pages.

    In simple terms, a sitemap file is like a table of contents for a website.
