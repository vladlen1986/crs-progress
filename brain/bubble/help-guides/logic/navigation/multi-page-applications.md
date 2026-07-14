# Multi-page applications
> Source: https://manual.bubble.io/help-guides/logic/navigation/multi-page-applications · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers navigation of multi-page applications

A multi-page application navigates the user between different pages in your app, as opposed to dynamically changing the content of the same page (which would be a single-page navigation system).

Loading multiple pages requires a page reload, which can mean a slower navigation for the user. On the other hand, it can help you keep your pages lightweight, meaning that each page can load faster and be less taxing on the user's device.

Keep in mind that selecting one method over the other does not have to be a black and white decision: most applications use a mix of single-page and multi-page navigation.

{% hint style="info" %}
Sometimes, you may need **dynamic pages** that load content and generate unique URLs accordingly. For instance, consider a "products" page and a "product" data type. By setting a page's content type to "product," Bubble enables dynamic content loading based on the URL's slug, such as the example below. You can read more about this method in our section on SEO.

```url
https/www.my-bubble-application/product/baseball-cap
```

Article section: [Dynamic pages](/help-guides/maintaining-an-application/seo/seo-page#dynamic-pages)

Article series: [SEO](/help-guides/maintaining-an-application/seo)
{% endhint %}

## Using actions

### Go to page

{% hint style="info" %}
This article covers the go to page action in brief. For the technical core reference listing all settings, you can check out the link below:

Reference: [Go to page](https://manual.bubble.io/help-guides/logic/navigation/pages/-MTujrgFLiHe7MfwSBOF#go-to-page-...)
{% endhint %}

To send a user to another page, you can use the *Go to page* action. This method sends the user to the page that you choose without having to construct a URL or set up a link. You simply choose the name of the page.

The name of the page used in this action is dynamic, meaning that should you ever change the name of the page, the action will automatically be updated to reflect the change. Should you delete the page, Bubble's issue tracker will notify you that the page in the action is missing so that you can update the action before the app is deployed.

<figure><img src="/files/IAo4Xi5NJxg5Pjoym4F4" alt=""><figcaption></figcaption></figure>

1. In the Destination field you set the page you want to send the user to. If you want to update the page thing or URL parameters on the current page, you can simply pick the same page as you are on – the page will not need to reload.
2. The *Data to send* field lets you specify a database record to load onto the page (known as the *page thing*)
3. The *Send more parameters to the page* setting lets you specify [URL parameters](#user-content-fn-1)[^1] to include on the page you are going to, or set those parameters on the current page

{% hint style="warning" %}
Note that the *Go to page* action needs to be the last action in a workflow, unless it has a *Only when* condition. If it has a condition that allows it to run, any later actions in the workflow may or may not have time to trigger before the user has left the page.
{% endhint %}

<details>

<summary>Understanding "<em>Replace the entry in the browser history</em>"</summary>

A browser's page history tracks and stores the web pages a user has visited, allowing them to navigate back and forth through previously viewed content. Whenever a user navigates away from a page, that page is saved in the history, and each tab maintains its own history tab.

In Bubble, you have the option to check *Replace the entry in the browser's history* when you use the *Go to page* action.

This means that when a user clicks the 'back' button, they won't see the replaced page, but instead navigate to whichever page in the history was before that. You can see it as moving on to the next page in a book and ripping out the one you just read.

</details>

### Open external link

{% hint style="warning" %}
The *Open external link* action will open the link in the current tab, replacing the page you are currently on. As such, later actions in the same workflow may not have time to run.
{% endhint %}

The *Open external link* can be used to go to an external URL or a URL in your own app. It's worth noting that for internal links it will usually be better to use the *Go to page* action, since it will automatically update if you change the name of a page, whereas the *Open external link* action may need to be manually updated.

<figure><img src="/files/D4zc6sEaPL28z57hHDfo" alt=""><figcaption></figcaption></figure>

The only setting that you need to provide for this workflow is the URL that you want to go to.

## Using links

### The link element

The link element lets you set up dynamic links in your app that can point to internal or external pages. Note that unlike the *Go to page* action, the link element will work like a standard html link, which means it will reload the page even if you are linking to the same page you are already on.

<figure><img src="/files/vCUWb2lYbeuNKSmyedZ6" alt=""><figcaption></figcaption></figure>

The link element has several customization settings:

1. The first is the label that will be displayed to the user
2. Secondly, you pick whether the link should point to an internal or external page
3. If you choose internal, you can pick the page from a dropdown. This field is dynamic, meaning that if you change the name of a page, the link element will automatically update. If you delete the page, the Bubble issue tracker will notify you that the page that's linked to is missing
4. If the page is set up to load a database thing on page load, you can specify this thing in the *Data to send* field. In this example we are searching for a product and returning the first item.
5. You can include one or more [URL parameters](#user-content-fn-1)[^1] by checking the *Send more parameters to the page* box and specifying the parameters below.

### Inserting a link in a text element

#### Using BBCode

Text elements use BBCode[^2] formatting, which means you can insert links directly into a text element by using the URL tag:

```bbcode
[url=https://www.bubble.io]Bubble homepage[/url]
```

The easiest way to create BBCode link tag is to use the *Rich text editor:*

<figure><img src="/files/UnWIIe0x6EVjWr7096iL" alt=""><figcaption><p>The Rich text editor is an easy way to format your text elements without knowing BBCode.</p></figcaption></figure>

From there, you select the *Link* button and provide the URL. Any text that you select before adding the link will be used as the label for that link:

<figure><img src="/files/mzVnxHsbGCTxnr67NB3c" alt=""><figcaption></figcaption></figure>

BBCode links will open in a new tab.

#### Automatically recognizing links and emails

Bubble also has a built-in link and email recognition feature. To instruct Bubble to automatically link to URLs and create mailto links to recognized emails, check the *Recognize links and emails* box in the text elements inspector.

[^1]: *URL parameters* are short snippets of information you can include in the page URL. They consist of a key and a value, and can contain data like text, numbers and database records.\
    \
    They are often used in single-page navigation apps.\
    \
    Article: [URL parameters](/help-guides/data/temporary-data/url-parameters)\
    Article: [Single-page navigation](/help-guides/logic/navigation/single-page-applications-spa)

[^2]: BBCode is lightweight markup language used to format text by using simple tags for features like bold, italics, and hyperlinks.
