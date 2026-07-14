# Creating API workflows
> Source: https://manual.bubble.io/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/creating-api-workflows · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how to create and setup an API Workflow.

{% embed url="<https://www.youtube.com/watch?v=zoPCX34Y8Io>" %}
Our webinar gives an introduction to how API workflows work
{% endembed %}

Creating an API Workflow works in the same way as creating regular workflows in on a page. After [activating the Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api#activating-the-workflow-api) and [accessing the backend editor](/help-guides/integrations/api/the-bubble-api/the-workflow-api#accessing-the-backend-workflow-editor) you click *Click here to add a backend workflow* and choose *New API workflow.*

<figure><img src="/files/UDJj40Q0uZmiK3WojkNv" alt=""><figcaption><p>Click <em>New API Workflow</em> to create.</p></figcaption></figure>

## The endpoint

For each API workflow that you create and expose a unique endpoint is created, consisting of your app's Worfklow API root URL and the name that you give the workflow.

The root URL is made visible in the Bubble editor as soon as you [activate the Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api#activating-the-workflow-api) as illustrated below:

<figure><img src="/files/JxCu3FHh7z9wbHxYn3um" alt=""><figcaption><p>Activating the Workflow API in Bubble's API Settings. exposes the root URL of your API workflows.</p></figcaption></figure>

### Naming your workflows

The complete API Workflow endpoint is constructed by combining the root URL with the name. As a consequence, the name of the API needs to be in a URL-friendly format:

* each API Workflow needs to have a **unique name**
* use **lowercase letters**
* **remove spaces and special characters** (replacing them with dashes or underscores)
* remove any trailing or leading **white space**
* don't make the name **too long**

For example, instead of naming a workflow Create New User, you would name it create-new-user.

### Constructing the endpoint

Having activated the Workflow API and given our workflow a name, we can now construct the complete endpoint:

{% code overflow="wrap" %}

```url
https://my-bubble-application.bubbleapps.io/version-test/api/1.1/wf/create-new-user
```

{% endcode %}

## Labelling your workflows

While the name of the workflow needs to be URL friendly, you are still free to provide a more humanly readable label for it. The API Workflow will automatically inherit its label from the name, but you can change this label as you see fit to make it easier to read and search for.

<figure><img src="/files/c7aUrfeYq3k9eHeAjnBK" alt=""><figcaption><p>Giving your API Workflow a different label makes it easier to work with and search for.</p></figcaption></figure>

## Exposing the workflow externally

Having created and named our Workflow, we need to make sure that it is exposed outside of your application, or the endpoint will simply return an error.

<figure><img src="/files/KwpK2flgzQseNg4khSbt" alt=""><figcaption><p>To be reachable from outside of your own app, this box needs to be checked.</p></figcaption></figure>

Check the *Expose as public API workflow* box to give external applications access to the endpoint.

{% hint style="warning" %}
Only expose API Workflows that you intend to trigger from an external system. If you will only use the workflow as part of your own app's internal processes, keep the box unchecked.
{% endhint %}

## Authentication

Just like the Data API, API Workflows require that the client authenticates themselves before the workflow will trigger.

\
API Workflows can be accessible to anyone, anyone who authenticates, or only admin api tokens. Update which option you want in the Authentication dropdown. Keep in mind that Privacy Rules can still limit the functionality of the API Workflow.<br>

New Property Editor (Beta):

<figure><img src="/files/oa5PMl9fnxxNf2pGWjPi" alt=""><figcaption></figcaption></figure>

Property Editor:

<figure><img src="/files/nZY3Kf28MpfVO4OSNcky" alt=""><figcaption></figcaption></figure>

CurreTo set up an API Workflow to be accessible by anyone, check the *This workflow can be run without authentication* checkbox. Keep in mind that Privacy Rules can still limit the functionality of the API Workflow.

{% hint style="warning" %}
Be cautious when opening up API Workflows to be accessible without authentication as this will allow anyone to trigger the workflow at any time.
{% endhint %}

## Defining the HTTP method

The [HTTP method](#user-content-fn-1)[^1] determines what kind of action the client instructs the server to perform. By default, API Workflows use the POST HTTP method, but some external systems require the ability to use the GET method for webhooks[^2]. To switch between the two, click the *Trigger workflow with* dropdown.

If you select to trigger the API Workflow with a GET request, the parameter definition will default to *Manual Definition*, and the field will be hidden. You can still define key-value pairs as normal.

If you are using API workflows via the App Connector, these workflows will automatically be triggered by the proper HTTP request defined in “Trigger workflow with” dropdown.

When you switch between GET and POST, the definitions and parameters you’ve defined will be preserved. The contents for *Detect request data* will be saved if you decide to switch between the different options of *Parameter Definition*. The Bubble issue checker will ensure the data is correctly formatted

## Defining parameters

In many cases an API Workflow will need some parameters to run. Let's say for example that you the workflow is set up to create a new User in your app, you will need to include key information like email and perhaps a first and last name. Using parameters you can send this information to the workflow from outside of Bubble.

You have two ways to define parameters:

* define the structure yourself
* automatically detect the structure of the received data

The first option is better for an API workflow you define and when you control how the request is made (for instance when you use scheduled workflows, or build a custom client), while the second option is useful when using the API workflow's endpoint as a response to a webhook.

### Manual definition

Adding a parameter goes through three steps:

1. Give the parameter a name
2. Pick the type of data you will receive
3. Specify whether the parameter is optional or not

Both the type of data and optionality are important settings: Bubble will validate the data when a request is made and if a parameter is sent with the wrong formatting or a non-optional parameter is missing, Bubble will return an error.

<figure><img src="/files/vgysDwuD20wXjTObFe8C" alt=""><figcaption></figcaption></figure>

In the example above we have include three parameters of type text to create a User:

1. Email (required)
2. First name (required)
3. Last name (required)
4. Nickname (optional)

### Automatic detection

Bubble can also automatically detect the parameters that are sent by an external service (webhook). It does this by "listening" for the incoming request and checking the parameters that are sent in the call – that way it can identify each one and attempt to determine what kind of data type it is.

To do this, you need to make a small amendment in the endpoint URL to let Bubble know that this is an initialization call.

<figure><img src="/files/IvCJYR9r6KAtgfNgAFjv" alt=""><figcaption><p>Bubble can automatically detect the parameters in your call by using the <em>Detect data</em> feature.</p></figcaption></figure>

To automatically detect data, do the following:

1. In the API Workflow inspector window, set *Parameter definition* to *Detect request data*
2. Click *Detect data*
3. Bubble will reveal the initialization URL
4. Send the request from the external system

#### Initialization URL

Bubble will show you the URL you need to send the request to, but you can also construct this by yourself:

`https://appname.bubbleapps.io/version-test/api/1.1/wf/endpoint/initialize`

or

`https://yourdomain.com/version-test/api/1.1/wf/endpoint/initialize`

The request should be made to the test version of your app, as it's the version you're modifying. You never need to send an initialization to the live version, as any changes you make to the parameters need to be deployed.

## Overriding timezones

{% hint style="info" %}
Overriding timezones in the backend requires that you activate the advanced setting *Enable timezone override controls* in your app's general settings.

Reference: [Application settings: Advanced](/core-resources/application-settings/general#advanced-options)
{% endhint %}

API workflows allow you to override the time zone of the request by setting an alternative timezone with a static or dynamic choice. This helps you standardize the way in which your app parses and stores data. For example:

* if you parse **1/1/2000 from Eastern Time** and keep the default setting, Bubble will save that date as **1/1/2000 12:00 AM Eastern Time**
* If you instead override the client timezone with Pacific Time, selecting 1/1/2000 will save **1/1/2000 12:00 AM Pacific Time**

This type of timezone standardization is useful in different scenarios:

* Where an external API request includes a timestamp, but not a timezone: you can set a static or dynamic timezone when that call is received to ensure its properly parsed
* Apps that deal with scheduling where the timezone of the scheduled appointment needs to remain constant: for example, if a user books a conference in London from Tokyo, your app can ensure that the timezone used is indeed London and not Tokyo.

## Returning data from the API Workflow

Sometimes you'll want your app to return data after a workflow has been triggered. In most cases, to respond with data from your database you will want to use the [Data API](#user-content-fn-3)[^3], but sometimes you need more control over what data you send back, such as:

* verifying that a workflow completed successfully
* returning data that depends on the workflow
* combining data/fields from multiple data types

To return data you can use the *Return data from API* action:

<figure><img src="/files/Yyvk4u0PEsuaKM1LZ0B1" alt=""><figcaption></figcaption></figure>

In the example above, we have a database Thing where we save a *score*. Let's imagine that we want to return the average score of all *Things* in the database. We can use the *Return data from API* feature to perform a search and return the updated average that depends on Step 1.

[^1]: The HTTP method is the part of an HTTP request that instructs the server what kind of operation you want to perform. The most sidely used methods are GET, POST, PUT, and DELETE.\
    \
    HTTP methods are sometimes called HTTP verbs.\
    \
    Article: [What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)\
    Article section: [The HTTP protocol](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-the-http-protocol)\
    Article section: [HTTP methods](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#http-method)<br>

[^2]: A webhook is a way for an app to provide other applications with real-time information.\
    \
    It lets an app to push data to your Bubble app immediately rather than waiting for the other app to request it.\
    \
    A webhook needs an URL to send the request to, and this is created by setting up an API Workflow.

[^3]: The Data API is the part of Bubble's built-in API that you can use to give external applications access to read and make changes to your app's database.\
    \
    Article: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)
