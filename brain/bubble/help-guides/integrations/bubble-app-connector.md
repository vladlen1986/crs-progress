# Bubble App Connector
> Source: https://manual.bubble.io/help-guides/integrations/bubble-app-connector · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers the Bubble App Connector plugin, used to connect two Bubble applications to each other

{% hint style="info" %}
This is the in-depth manual article series on Bubble’s App Connector plugin. If you want the shorter, technical reference, check out the Reference entry:

Reference: [The Bubble App Connector plugin](/core-resources/bubble-made-plugins/bubble-app-connector)
{% endhint %}

<figure><img src="/files/f205DrA6sVX5vP4uMDSY" alt=""><figcaption><p>The Bubble App Connector plugin lets you access the database and API Workflows of a second Bubble app</p></figcaption></figure>

Bubble can connect to most other apps by using the [API Connector](#user-content-fn-1)[^1] and/or the [SQL Connector](#user-content-fn-2)[^2]. Sometimes you may want to connect to another Bubble application, and we have made that option simple to set up using the plugin *Bubble App Connector plugin.*

The plugin does three things:

* It lets you [**authenticate**](#user-content-fn-3)[^3] with the second Bubble application by using an API key or OAuth authentication.
* It connects to the [**Bubble Data API**](#user-content-fn-4)[^4]
* It connects to the [**Bubble Workflow API**](#user-content-fn-5)[^5]

While this could be done with the API Connector plugin, the Bubble App Connector simplifies the process and gives you a visual representation of the second app's data types and workflows.

{% hint style="info" %}
Throughout this article, we will refer to the app that initiates the connection as the **first app** and the app that you want to connect to as the **second app**.
{% endhint %}

<figure><img src="/files/LB1lJMO7fWClUI6AWyYE" alt=""><figcaption></figcaption></figure>

In the example above, we have connected to a second Bubble application using an API key.

1. Public-workflow is an API Workflow set up in that application (Workflow API)
2. *Task* is a data type set up in that application (Data API)

As you can see, we can get simple access to both data and API workflows using a dropdown.

## Setting up the plugin

### Installing the plugin

The Bubble App Connector is not a built-in feature but an optional plugin that needs to be installed through the plugin store. To install it, search for "App Connector" and install the plugin in the **first app** as illustrated below:

<figure><img src="/files/ZIXbVbyjp4HtNB89l2TI" alt=""><figcaption><p>Make sure that the plugin you select has the <em>By Bubble</em> stamp in the lower right corner of the plugin entry.</p></figcaption></figure>

Click install to install it in your app.

{% hint style="info" %}
When integrating two apps using the App Connector plugin, it's only necessary to install the plugin in the app that initiates the connection. The app being connected to doesn't require the plugin to be installed.
{% endhint %}

### Preparing the second application

You need to ensure some settings are properly configured in the **second app***.* The settings depend on what kind of data and/or actions you want to share. First, navigate the Bubble editor in the second app to *Settings - API*.

#### Sharing API workflows

If you want to initiate API Workflows in the second app from the first app, you need to enable the *Workflow API* by checking *Enable Workflow API and backend workflows.*

<figure><img src="/files/JxCu3FHh7z9wbHxYn3um" alt=""><figcaption></figcaption></figure>

All the workflows that you want to trigger in the second application need to have *Expose as a public API workflow* enabled.

<figure><img src="/files/KwpK2flgzQseNg4khSbt" alt=""><figcaption></figcaption></figure>

#### Sharing data

To share data from the second application, you need to enable the *Data API* by checking *Enable Data API* and then enabling the data types that you want to share.

<figure><img src="/files/EX5JcjBVFbRQmkBWUEOW" alt=""><figcaption></figcaption></figure>

Each of the data types you enable in the Data API will become available in the dropdown in the Bubble App Connector plugin.

#### Creating the API key

To get full admin access to the second application, we will set up an API key. This method gives you unrestricted access to the workflows and data in the second application.

<figure><img src="/files/5TZZzfIPo7XH9sr96E4W" alt=""><figcaption></figcaption></figure>

In *Settings - API* under the the *API Tokens* header, click the *Generate a new API token* button. You will be provided a randomly generated 32-character string that serves as the API key. You can provide a label for the token to keep track of where it's used. The label is only for your internal use and does not affect the connection in any way.

### Setting up the connection

Now that we have installed the plugin and set up the second application to expose workflows and/or data, we can set up the connection and check that it works.

<figure><img src="/files/drEE4xArj13V0gaNVV4n" alt=""><figcaption></figcaption></figure>

Let's look at each of the fields and what they mean:

1. **App domain**: this is the name of the second Bubble app, as visible when you preview the app:\
   `https://`**`appname`**`.bubbleapps.io`
2. **App name:** This is the name of the application: this field will be automatically filled after you enter the domain in step 1.
3. **Match versions:** Enable this option if you want the development environment of the first app to interact with the development environment of the second app. We recommend keeping this checked unless you have a specific reason not to.
4. **Private key**: This is the API that we [generated in the second application](#creating-the-api-key).

After going through these four steps, Bubble will present you with the exposed workflows and data types. In the example below, we have an API workflow called *Public-workflow* and a data type called *Task*.

#### Action vs data

Next to the workflow or data type, there's a dropdown that lets you select between setting up the call as a *data source* or an *action*. This determines where in the first app you will be able to refer to it.

In the example below, it makes sense that the API workflow is set up as an *action*, meaning we can call it as an action in the workflow editor. The *Task* is set up as *Data* (data source) since we want to use to download Task data. In this case, the Tasks will be available by using the *Get data from an external API* data source in an expression.

<figure><img src="/files/4dhA5pSE6gYWOVLJ1juM" alt=""><figcaption></figcaption></figure>

## Using the plugin

### Calling an *action*

Let's dig a bit deeper into how you can use the API workflow from the second application in an *action*. Using it as an action means that we can add it as a part of a workflow along with actions relates to the first app.

<figure><img src="/files/rYUc5hzAORRSapTb9wYg" alt=""><figcaption></figcaption></figure>

After the plugin and connection has been set up, you will find all queries set up as *actions* under *Plugins*:

1. Add a new action to a workflow
2. Click the *Plugins* submenu
3. Find the relevant action in the list that Bubble automatically generates. The label uses the following formatting:\
   Run \[app name] \[action name]

This way you can keep track of actions from more than one application if necessary.

### Querying data

To query data from the second application, we'll use the *Get data from an external API* data source. Let's say we want to list the tasks from the second application in the first application. We'll set up a [Repeating Group](#user-content-fn-6)[^6] and set up the expression as follows:

<figure><img src="/files/5LZVho7VN5l4gsQcWs6Q" alt=""><figcaption></figcaption></figure>

1. As the *type of content* we select the *Second Bubble app Task*. The formatting Bubble will use here is:\
   `[App name] [Data type]`
2. As the data source, select *Get data from an external API*
3. The data source will open up the window on the left. In *API provider* you will see your data sources listed in the format:\
   `Get [App name][Data type]`
4. In the three fields, you can select the sorting, cursor and number of items to return:\
   **Sort by**: lets you pick a field on the data type to sort by, and whether to sort ascendingly/descendingly.\
   **Cursor**: lets you set the item from which to start sending data, similar to *Item from #* in Bubble\
   **Number of items to return:** lets you specify how many things to return.

[^1]: The *API Connector* is used to make outgoing connections to external applications and use it as a data source or trigger actions.

    Article: [The API Connector](/help-guides/integrations/api/the-api-connector)

[^2]: The SQL Database Connector plugin lets you connect with external SQL databases.\
    \
    Article: [The SQL Database Connector](/help-guides/integrations/sql-database-connector)

[^3]: *Authentication* is the process of identifying *who* a client\[^7] is in order to determine what resources\[^8] they have access to your your application.

[^4]: The *Data API* is Bubble’s automated way of providing external systems access to your app’s database. It allows one-click creation of a RESTful\[^9] interface to some or all of your application's data.

    Article: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)

[^5]: The *Workflow API* is the part of Bubble's [built-in API](#user-content-fn-10)\[^10] that lets you set up workflows that can be triggered from an external application or system by sending an API request or by scheduling an API workflow in your app.

    Article: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)

[^6]: The *Repeating Group* is a container type used to show a list of things such as records from the database by repeating the content of the group one time for each entry.

    Article: [Repeating Groups](/help-guides/design/elements/web-app/containers/repeating-groups)
