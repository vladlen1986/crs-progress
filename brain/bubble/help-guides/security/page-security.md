# Page security
> Source: https://manual.bubble.io/help-guides/security/page-security · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers security on pages, elements and workflows

As we explored in the section about [client-side and server-side operations](/help-guides/security/client-side-and-server-side), Bubble downloads data to and completes a number of processes directly on the user's device.

In principle, every piece of data that reaches the user's device is no longer secure. As long as you are only sending data that the user should have access to, this is not a vulnerability but the only way your app can work.

If you are new to Bubble or web development in general, it's not necessarily obvious what this entails, so in this article, we'll have a look at the precautions you should take to avoid sharing more data with your users than you intended.

> Think of the page as a **bank** and app's data types as a collection of **safety deposit boxes**. If a user gets access to the bank (page), the private information is still safely contained within the safety deposit boxes (database), and they are all locked (privacy rules).
>
> All the intruder sees is the lobby.

## Bubble's JavaScript/JSON files

Whenever a user loads a page in your app, their browser downloads a collection of JavaScript and JSON files. Some of them make up the "engine" that's common to all Bubble apps, while others contain code and data tailored to your specific app and the currently loaded page – everything that makes your app and page different from any other page of any other Bubble app.

These files contain code that allows your app to communicate with the Bubble server, and send and receive data and commands between the two computers (your user's device and the Bubble server).

These files are stored on the user’s device, and a tech-savvy user can open up the downloaded files and look at the code. This is not in itself a vulnerability, but it means you as a Bubble developer need to be mindful of what kind of data you place in that code.

As a no-code platform, Bubble automatically generates the code for your app, which can inadvertently introduce vulnerabilities if you're not cautious about the information you store in your pages.

### Option sets

Option sets are a useful way to store static data that you can reference anywhere in your app. Option sets are downloaded along with the rest of your app's code and is decrypted and stored as plaintext on your user's device. As such, you should never place any sensitive data in an Option set. This includes the name of the set itself, and its different options and attributes, as well as the data stored in them.

### App texts (translation strings)

The app text feature found in Settings - Languages is a useful way to translate static text strings so that your users can see your app in different languages. Bubble downloads the strings that are relevant for the current user’s language. These strings should not be considered secure: never store sensitive information in app texts in any language.

### Elements

Whenever you store static data in an element, you should assume that the data becomes part of your application's code. For example, let's say you place a text input element on the screen that has the Placeholder text "Name", that placeholder will be visible in the app's code.

Avoid placing any kind of sensitive information in your elements, even if they are hidden on page load.

### Page name

Bubble downloads the **name of all your pages** on each page load. In other words, even if a user is just loading one page, the code still contains the name of all other pages. Don't give your pages names that contain any sensitive data, and don't assume that a page that you are not linking to is secure – a user looking at the app's code can identify the names of each one.

You can also consider giving important, secure pages names that differ from the norm: for example, a page called admin or login may be targeted by bot networks simply because it shares such a widely used label. If you use a more uncommon name, you may avoid the wide net that's cast looking for standard names.

Bear in mind that while this adds a layer of obscurity, it shouldn't be seen as a standalone security measure. It will not *stop* an unwelcome visitor from finding the page, but may make it slightly more difficult.

### Workflows

Just like with elements, when static data is stored in workflows, it becomes a part of Bubble's codebase. Some data is sent to the user's device when a workflow's result is processed, and this information might become accessible on that device. This includes any data kept in an element's state during the workflow, as these element states reside on the client side.

Additionally, the IDs (but not the fields) of objects that the workflow altered are included. These IDs are necessary to ensure that the changes are immediately visible in the browser. While this data sharing is part of the regular function of the web app, it's something to be aware of as you manage what information is passed between the server and the client.

### Data types

The following information about all data types is also visible in the code:

* The **name** of each data type
* The **name of all the fields** saved on all data types
* The **default value** of those fields as specified in *Data - Data types*

The data that you store in these data types in the database are encrypted and secure while in storage.

### API Connector Calls

The API Connector allows you to set up different calls to be used in actions and as [data sources](#user-content-fn-1)[^1]. The following information will be visible in the app code:

* The **name** of each call
* The **key** and **value** of each parameter, *unless* they are set to private
* The **URL** of each call, *unless* you specify the URL in a parameter by using \[]

### Deleted fields, data types, option sets and option set attributes

When you delete one of the things specified in the header, they are not permanently deleted, but are kept around in case you want to undo the action. You can clean out this deleted info by using the *Optimize app* feature.

<figure><img src="/files/ixJMAK4S7LafRhGoXvzh" alt=""><figcaption><p>Using the <em>Optimize app</em> feature lets you completely remove deleted fields, data types, options sets and attributes.</p></figcaption></figure>

To access the *Optimize app* feature, go to *Settings - General* and click the *Optimize app* button.

### Conditions

Conditions can be processed directly on the client or needs to involve the server, depending on the [dynamic expression](#user-content-fn-2)[^2] that you use. If you use a condition on an important workflow event or action, it's more secure to set up a condition that involves the server; that way, the processing is done out of reach of the user.

To make sure a condition is processed server-side, you can involve anything having to do with the database or user authentication. For example, *Current user is logged in* and *Do a search for:count > 0* are both conditions that Bubble will query the server to process.

Additionally, if the condition is placed on a server-side action, both the condition and the action will be processed on the server. The exception is if the condition *can't* be processed on the server. For example, *Element X is visible* needs to be checked on the page, and can result in a more vulnerable condition.

#### Understanding server-side and client-side conditional scenarios

With the information above in mind, it’s important to recognize that client-side operations are inherently vulnerable to tampering, even if the conditions controlling them are processed server-side. This is because the client-side code resides entirely on the user’s device, making it accessible and modifiable.

For example, consider the visibility of elements on your page that are controlled by conditional logic. Even if the condition is evaluated on the server, the actual rendering and behavior of those elements are managed on the client side. A user with sufficient technical knowledge can inspect, modify, or override the client-side code to change the intended behavior. This could mean forcibly revealing hidden elements, altering styles, or bypassing restrictions that were assumed to be secure.

This vulnerability highlights a critical distinction: while server-side validation is crucial for securing data and server-side processes, client-side controls should never be relied upon as the sole line of defense. Instead, they should be seen as tools for enhancing user experience rather than enforcing security.

This is true for client-side actions too. For example, using the *Show/hide an element action* with a server-side condition makes sense from the perspective of user experience, but not security, since the element can be made visible by tampering with client-side code.

Conditions combined with client-side processes form a weakest link situation, where if any part of the operation is insecure, it should all be considered insecure:

| Condition             | Action or conditional layout |          |
| --------------------- | ---------------------------- | -------- |
| Server-side condition | Server-side action           | Secure   |
| Server-side condition | Client-side action           | Insecure |
| Client-side condition | Server-side action           | Insecure |
| Client-side condition | Client-side action           | Insecure |

You can read more about the difference between client-side and server-side in this article, and you will find a tables of the most common server-side and client side operations in this article.

## Redirects

Redirecting[^3] users from one page to another can be done in two ways:

* [**Client-side**](#user-content-fn-4)[^4] **redirects** occur directly in the user's browser. When a certain condition is met or an event occurs (like clicking a button) and the *Go to page* action runs, a script running in the user's browser will change the current URL, causing the browser to load a new page. This happens without any interaction with the server.
* [**Server-side**](#user-content-fn-5)[^5] **redirects**, occur when the server responds to a request from the browser by instructing it to load a different page. This too is done with the *Go to page* action, but only under the following conditions:<br>
  * It happens before the page has loaded
  * One of the events below triggers the redirect:
    * User is logged in
    * User is logged out
    * Page is loaded
  * The workflow contains only one action (*Go to page*)
  * The redirect does not [contain any dynamic data](#user-content-fn-6)[^6] (such as within the URL)

Server-side redirects are more secure than client-side redirects, since Bubble will redirect to the new page *before* any data from the first page is downloaded. A client-side redirect, on the other hand, will redirect after the page has loaded, using JavaScript executed in the browser.

It's important to keep in mind that while you should try to ensure server-side redirects for secure pages, all data and workflows on the page still need to be protected by [privacy rules](#user-content-fn-7)[^7] and conditions.

### Why redirects are obfuscation, and not security

We’ve touched earlier on the concept of obfuscation and security: obfuscation is the attempt to make it more *difficult* for an intruder to gain access by adding barriers or complexity, while security involves implementing concrete measures and protocols to *prevent* unauthorized access entirely.

Page redirects are considered a form of obfuscation because, even when you redirect users away from a page, the underlying code files for that page remain accessible. These files are cached and stored on the CloudFlare CDN, making them available to anyone who has the direct URL to the code file. While the URL is different from the page URL and includes random strings to obfuscate it, it is not entirely secure, and a determined intruder could potentially discover and access it. This means they could view the code file for a specific page in your app, regardless of server-side redirects.

The reason these files are served in this way, is that the DNS significantly improves the performance of your app. If these files required authentication or other security measures, it would affect the page load speed negatively.

This is why the security of your page remains so important:

* **Use** [**privacy rules**](#user-content-fn-7)[^7]**:** are the only fool-proof way to keep dynamic data safe. Even if someone gains access to your app’s code files, they cannot access the database’s contents. As discussed earlier, think of it like a bank: even if an intruder enters the building (your app), the safety deposit boxes (your database data) remain secure and protected by privacy rules.
* **Never include sensitive data in Bubble's code files:** this includes:
  * Elements properties and data sources
  * Events, conditions and actions
  * Option sets
  * Translated strings (app texts)

This doesn't mean that server-side redirects serve no purpose:

* They obfuscate the page code, making it more difficult to find
* They work faster than a client-side redirect, improving the user experience
* The spend less workload, since Bubble doesn't need to load the page

## Summary

In principle, everything that reaches your user's device is no longer encrypted and private, but is stored as plaintext on that device. While it may not be visible to most users, a tech-savvy user can open up the downloaded files and track the data coming and going through the network to see its content. This is why it's important to:

* Set up privacy rules for all data types and fields that are private
* Never store sensitive data like personal information and API keys in elements, events, actions or conditions
* Set up server-side redirects to guide users away from pages to which they shouldn't have access
* Treat the page as a bank: it may be closed, but if people manage to break in, all the valuables are still locked safely inside locked safety deposit boxes

[^1]: A *data source* is anywhere from which Bubble can pull data, such as the database or an external API or SQL database.

[^2]: Dynamic expressions are like "live" formulas that update in real-time based on user input, database updates and other changes in your app.

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^3]: A *page redirect* is a method used to send users from one web page to another automatically as opposed to as the result of a user action.

    Reference: [Go to page](https://manual.bubble.io/help-guides/security/pages/-MTujrgFLiHe7MfwSBOF#go-to-page-...)\
    Article series: [Navigation](/help-guides/logic/navigation)

[^4]: *Client-side* describes all process that happens on the *client*, i.e. the user's device (as opposed to on the Bubble server)\
    \
    Article: [Client-side and server-side](/help-guides/security/client-side-and-server-side)

[^5]: *Server-side* describes all process that happens on a *server* such as the Bubble server or an external API server (as opposed to on the user's device).\
    \
    Article: [Client-side and server-side](/help-guides/security/client-side-and-server-side)

[^6]: When the redirect requires any dynamic data (such as within the URL), it will occur client-side, even if all other conditions for a server-side redirect are met.

[^7]: *Privacy rules* are conditions that you set up on each data type in order to protect the data from being viewed and edited by unauthorized users.

    Article: [Protecting your data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)
