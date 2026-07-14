# SEO / metatags
> Source: https://manual.bubble.io/core-resources/application-settings/seo-metatags · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:orange;">intermediate-level builders</mark><mark style="color:green;">**.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (1)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### SEO

* Article series: [SEO](/help-guides/maintaining-an-application/seo)\
  This article covers both an introduction to what [Search Engine Optimization (SEO)](#user-content-fn-2)[^2] is and how you set it up in your app.
  {% endtab %}
  {% endtabs %}

## Facebook & Twitter

### Facebook & Twitter Title

This is the title that Facebook and Twitter display when a user shares a link to the app on these social networks.

### Facebook & Twitter Site name

This is how Facebook and Twitter name the site when a user shares it on these networks.

### Facebook & Twitter Description

This is the description that Facebook and Twitter display below the title when a user shares a link to the app on these social networks.

### Thumbnail used for links

This image is the thumbnail that Facebook displays when a user shares a link to the app. Since Facebook caches this information, you may have to trigger a refresh. Do this in the link 'Test/refresh data,' which is located below the image uploader.

## SEO settings

### Expose the type of tags for text elements

Check this box to customize text elements so that they have h1, h2, and h3 tags. Select the tag for each text element by editing the text's style.

{% hint style="warning" %}
**Caution:** We recommend not including too many h1 headers on a single page. Most major search engines prefer pages that have a clear, user-friendly hierarchy of headers.
{% endhint %}

### Enable canonical url

Check this box to enable a Bubble-defined canonical url tag. A canonical url tag redirects users and search engines to your primary domain in order to prioritize its ranking in search results by avoiding duplicate urls.

If you set up a custom domain for your app, this will also hide the built-in Bubble domain, in favor of the canonical custom domain.

### Customize robots.txt (advanced)

By default, Bubble exposes a file that makes sure search engine crawl bots do not index the pages of the test version of the page. Check this box to customize this file, robots.txt.

{% hint style="danger" %}
**Warning:** This is for SEO experts only. Know what you are doing before editing this file because it can impact your site's indexing.
{% endhint %}

### Expose a sitemap file

Check this box to select pages to add to the sitemap. When checked, the page names display, allowing you to select the specific pages to include. If the page contains dynamic content (i.e. pages that have a specific type of content), then we will also include those dynamic pages in the sitemap. We automatically filter URL's for you based on Privacy Roles. To make sure an individual URL doesn’t show up in the sitemap, make sure that a non-logged-in user (e.g. Google’s crawler) doesn’t have "Find in Searches" permissions. We currently restrict sitemaps to contain at most 50,000 URLs per page, as per the sitemap specifications. If you exceed this limit, we will include the first 50,000 URLs in our sitemap.

See [Bubble's SEO tools](https://manual.bubble.io/help-guides/customizing-an-application/seo#robots-txt-file-and-sitemap)

{% hint style="warning" %}
Note that a savvy outsider can see the list of all pages that exist in an app, even if a page isn't listed in the sitemap and even if there's a workflow on that page that redirects away visitors upon page load. In other words, you cannot hide the fact that a page *exists*, but you can of course protect what shows up on a page if somebody visits that page.
{% endhint %}

## Advanced settings

### Script/meta tags in header

Some services require code to be pasted in the header of the page's HTML. Paste the code here. This is an advanced feature.

{% hint style="warning" %}
**Note:** The only valid header tags are \<script>, \<meta>, and \<link>. Any invalid header code will end up in the body due to automatic repair logic in most modern browsers.

Whenever the HTML for your page is parsed by a browser like Google Chrome, it will detect any invalid HTML tag used in the headers, assume that this was a mistake, that the closing \</head> tag was missing, and add that code to the body automatically with an opening tag.
{% endhint %}

### Script in the body

Some services require code to be pasted in the body of the page's HTML. Paste the code here.

{% hint style="danger" %}
**Warning:** Be careful with what you add here as improper code added here can break your app.
{% endhint %}

## 301 Redirections

301 Redirections point previous URLs to new ones. Use this when migrating from another platform. For the redirection to work, these URLs must point to pages that do not exist in the app.

{% hint style="warning" %}
**Caution:** This is an advanced feature.
{% endhint %}

## Hosting files in the root directory

Some services require you to upload some files in the root directory of your site, usually to prove ownership. You can upload some files and define the filename that will represent them. Since filenames will be used to generate a URL, they cannot contain spaces or non-alphanumeric characters. Files will be accessible at `yourdomain.com/version-test/filename` or `yourdomain.com/filename`. Note that you should deploy to live to expose the files without `/version-test/`.

{% hint style="warning" %}
**Caution:** This is an advanced feature.
{% endhint %}

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: *Search Engine Optimization (SEO)* is the practice of optimizing the content and technical setup of your app for search engine visibility.

    SEO is applicable only to pages that are public, as opposed to pages that require users to be logged in.
