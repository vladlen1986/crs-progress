# Introduction to SEO
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/seo/introduction-to-seo · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This page gives a general overview of what SEO is and some tips on how to plan your SEO efforts

## How important is SEO for my app?

Bubble is a flexible platform that lets you build a wide range of different applications. As such, each application's need for search engine optimization can vary greatly: for some it can be a crucial source of revenue, while for others it is irrelevant.

In the first part of this article we'll go over three different categories of apps to help you determine whether SEO is relevant for your project.

### Closed apps

If your app is designed to be used primarily by a closed group of users, such as a project management tool for your team or an inventory management system for your warehouse, you may not need to focus on SEO at all.

Since your users are already aware of your web app and will likely access it through a direct link or bookmark, you don't need to worry about attracting new users through search engines. In some cases, you may even take active steps to hide the app from search engines.

### Public apps

if your app is designed to be used by a wider audience, such as a social media platform or a marketplace, SEO should be a top priority. When users search for keywords related to your web app on search engines like Google and Bing, you want your web app to appear at the top of the search results. If this describes your app, keep reading this article series to see how to work with Bubble's SEO tools.

### Mixed apps

A common solution is the mixed app, where some parts are closed (such as a project management dashboard), and others are public (such as the front page that recruits new users to the software). In this case, SEO can also be an important part of your marketing strategy, but one or more your app's pages will still be hidden to search engines (which usually means they require users to be logged in to access them).

## SEO basics

in essence, SEO is a way to make sure that your website is visible and accessible to the people who are looking for it. Imagine yourself performing a search in one of the major search engines: in most cases you will find what you're looking for among the first few results. SEO is the effort to try to be one of those pages.

### How search works

#### Personalized and contextualized searches

Search algorithms have become incredibly complex since they were first invented. One of the major things to grasp with most modern search engines is that a page's position in the search ranking is not static or even the same for all users.

**Personalized** means that the search engine may build a profile of your search habits and preferences and tailor the results accordingly. The degree to which a search is personalized depends on factors such as whether the user is logged in to their account with the search provider, their profile settings and their cookie settings.

**Contextualized** means that they may also take into account different kinds of *current* data about you, such as the device you are using, the operating system, the geographical location of your IP address, and other pieces of information. Again, this depends on the user profile, browser- and cookie settings of the user performing the search.

The reason these two points are important to keep in mind, is that they suggest a key fact in SEO: top rankings are statistical probabilities, not static positions. In other words, your SEO efforts are a mission to increase the *likelihood* of being the number one result, not a linear race to a top position where everyone will see you. That's why searching for your own pages does not necessarily give you any meaningful indication as to how the page is doing: Google might simply deduce that you have a high interest in it and increase its ranking for you alone, since they likely have a history of you interacting with it in the past.

> Top rankings are statistical probabilities, not static positions.

This is why tools like [Google Search Console](https://search.google.com/search-console/welcome) are useful and important, since they can give you an indication as to where the traffic to your pages comes from across potentially thousands of users, normalizing statistical outliers.

#### Title and description

In addition to personalizing the order of search results, search engines like Google are increasingly using their own algorithms to determine the most appropriate title and description for each search result. While Bubble provides dedicated fields for elements such as the page title and OpenGraph[^1] title, search engines may choose to pull a title and description from any of these fields or even generate their own based on the content of the page. This can include text from the page itself, such as headers or body content.

However, this doesn’t mean that these fields aren’t important—on the contrary, they provide valuable context for search engines. It simply means that the exact title or description you “suggest” may not always appear verbatim in search results.

#### Content and keywords

{% hint style="info" %}
Google has released an excellent guide on **how to create high-quality, people-first content**. If your app depends on organic traffic, we strongly recommend reviewing this guide:

External page: Google:[ Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
{% endhint %}

Search is based on *keywords* or search terms. What this means is that any user who searches for something will provide a search term like "How to make pancakes", and the search engine will go through its index looking for pages that are relevant to that term.

In the early days of search engines, they simply looked for a match: "How to make pancakes" would match "How to make pancakes", and the page named "Top 10 pancake recipes" would suffer. Today, search engines are smart enough to process queries linguistically and rephrase the question, take synonyms into account and understand the *value* of the content on the pages it crawls through.

> It used to be important to simply stuff your page with keywords, but now search engines are looking for quality content which gives users what they're looking for.

This doesn't mean you should disregard keywords – they are still the bread and butter of a good SEO strategy – but you should write your content for humans to enjoy, not for bots to index.

## General SEO advice

Now, let's look at some general advice on how to optimize your app and pages for SEO. Keep in mind that SEO is a wide field that's constantly evolving, so in this article we will only be able to cover the basics: still, adhering to these rules of thumb will set you off to a good start on your SEO journey:

1. **First and foremost, focus on creating quality content**\
   Search engine algorithms are constantly evolving, but one thing that remains consistent is the importance of valuable, informative content. Write articles, make videos, and create other content that is interesting and engaging to your target audience.
2. **Use keywords strategically**\
   When choosing them, make sure they are relevant to your content and that you use them in a natural way. Overusing keywords, also known as keyword stuffing, can hurt your rankings.
3. **Make sure your app is mobile-friendly**\
   Make sure that your app is easy to navigate on mobile devices. Google even favors mobile-friendly websites in their rankings. This even includes details like font size, contrast and download size. We recommend getting to know the [responsive engine](#user-content-fn-2)[^2] to build pages that work on all screen sizes
4. **Use meta descriptions and title tags**\
   Meta descriptions and title tags are snippets of text that may appear in search results. They should accurately describe the content of the page and entice people to click through to your app. You edit meta description and title tags in your [page's SEO settings](/help-guides/maintaining-an-application/seo/seo-page).
5. **Build high-quality backlinks**\
   Backlinks are links from other websites that point to your website. Google views backlinks as a sign of authority and relevance. However, not all backlinks are created equal. It’s important to focus on building quality backlinks from reputable websites in your industry.
6. **Monitor your app's analytics**\
   Tools like Google Analytics can give you valuable insight into how people are finding and using your website. Google Analytics can be implemented using our dedicated [plugin](https://bubble.io/plugins) or by adding a tag in your page header, and there are many other useful tools that can collect and aggregate data in different ways.
7. **Make your app easy to navigate**\
   Web crawlers do two things: they crawl content, and they follow links. Make sure to link pages to each other when it makes sense, and link to your most important content from your index page – search engines consider those links important. They also use the labels of your links to understand the content it leads to. You can read more about different ways of setting up links in our [navigation guide](/help-guides/logic/navigation).

Remember, SEO is a long-term game. It takes time to see results, so don't get discouraged if you don't see immediate improvements. The advice above is not a complete roadmap to SEO results, but keeping these points in mind while you develop your app can help you make informed decisions about your pages

## OpenGraph

### What is OpenGraph?

OpenGraph is a set of rules created by Facebook (now Meta) that helps you control how your web pages look when shared on social media.

<figure><img src="/files/kqwgVzdXiHmt8rx2uymq" alt="" width="483"><figcaption><p>OpenGraph lets you define the data that is displayed when the page is shared on social media. This example is from Facebook.</p></figcaption></figure>

By using specific [meta tags](#user-content-fn-3)[^3] in the HTML of a page, developers can control how their content is presented when shared on social media platforms. This includes specifying the title, description, image (and sometimes more), ensuring that the content appears as intended when shared across various social networks.

### Who Developed OpenGraph?

OpenGraph was developed by Facebook (now Meta) in 2010. The protocol was designed to enhance the user experience on social media platforms by enabling richer and more engaging content previews. Since its introduction, OpenGraph has become a standard in web development for controlling how web pages are represented on social networks.

### How Does OpenGraph Affect SEO?

OpenGraph metadata can play an important role in SEO by influencing how your page appears in search engine results and on social media. Key OpenGraph tags, such as og:title and og:description, can directly affect the title and description displayed in search engine results pages (SERPs).

These tags help search engines understand the content of your page, improving its visibility and relevance.

### What do OpenGraph tags look like?

OpenGraph tags are written in HTML code in the header section of your page. Bubble automatically generates the title, description and image tags and includes it in the HTML code of the page.

The code looks like this:

{% code overflow="wrap" %}

```html
<meta property="og:title" content="A page title" />
<meta property="og:description" content="A brief description of your page." />
<meta property="og:image" content="https://www.yourwebsite.com/image.jpg" />
```

{% endcode %}

### How do I use OpenGraph in Bubble

Integrating OpenGraph metadata allows you to optimize how your pages are presented when shared on social media, and can have an effect on how the page is presented in the results of a search page (such as Google).

OpenGraph fields are set in one of two ways (often both):

#### Page level

Metadata included on the page element should contain information about that specific page. If this field is left empty, the app level metadata will be used instead.

Article: [SEO: Page](/help-guides/maintaining-an-application/seo/seo-page)

#### App level

App-level metadata will be applied whenever the metadata for a specific page is left blank. In other words, if metadata fields are filled at the page level, they will override the app-level metadata for that page.

Article: [SEO: App](/help-guides/maintaining-an-application/seo/seo-app)

[^1]: OpenGraph is a protocol that allows web pages to become rich objects in social media by defining how content (like titles, descriptions, and images) is displayed when shared on platforms like Facebook or X. It helps ensure that links appear with relevant, attractive previews.

[^2]: Bubble's *responsive engine* is how you build pages that adapt to the resolution of the monitor and browser of the user.

    Setting up simple rules for sizing, spacing, margins and other settings, you can build complete interfaces that work on all screens.\
    \
    Article series: [Responsive design](/help-guides/design/responsive-design)

[^3]: Meta tags are snippets of text in the HTML of a web page that provide information to search engines and browsers about the page's content.
