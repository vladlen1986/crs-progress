# Data API endpoints
> Source: https://manual.bubble.io/core-resources/api/the-bubble-api/the-data-api/data-api-endpoints · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section describes how to identify the correct endpoints when using the Data API

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:red;">**advanced-level builders**</mark><mark style="color:green;">**.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (2)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

* Article series: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)
* Article: [Introduction to APIs](/help-guides/integrations/api/introduction-to-apis)\
  This article covers how APIs work in general, and explores the terminology used.
  {% endtab %}

{% tab title="Postman Collection" %}
Bubble offers a Postman[^2] collection. This collection is specifically designed to help developers understand and experiment with the various API functionalities available in Bubble.

External page: [Bubble Postman collection](https://www.postman.com/bubbleapi)
{% endtab %}
{% endtabs %}

You can find the API endpoint[^3] for your application in *Settings - API*.

## Data API Root URL

The root URL of your application is structured as follows:

```
https://appname.bubbleapps.io/api/1.1/obj/typename
```

or if you have registered a domain:

```
https://yourdomain.com/api/1.1/obj/typename
```

Where the following variables are replaced to construct the final endpoint:

<table><thead><tr><th width="174.33333333333331">Variable</th><th>Content</th><th>Comment</th></tr></thead><tbody><tr><td>appname:</td><td>the name of your application</td><td>If you have not registered a domain</td></tr><tr><td>yourdomain.com</td><td>The domain of your application</td><td>If you have registered a domain</td></tr><tr><td>typename</td><td>the name of the data type you are accessing</td><td>Use the data type name, but in lowercase and with spaces removed.</td></tr></tbody></table>

## App branches and Data API URL

The different branches of your app will have different URLs.

### Developer

Developer will have the ID of the selected branch you are working on included. The ID of the Main branch is always version-test, while custom branches have their own unique IDs.

The URL in *Settings - API* will show the root URL including the branch ID in the branch you are currently working.

```
https://appname.bubbleapps.io/version-test/api/1.1/obj/typename
```

or

```
https://yourdomain.com/version-test/api/1.1/obj/typename
```

### Live

```
https://yourdomain.com/api/1.1/obj/typename
```

or

```
https://appname.bubbleapps.io/api/1.1/obj/typename
```

## **The typename**

The typename in the URL represents the data type you want to interact with. We highly recommend that you give all your data types a unique name, especially if you are using the Data API. If two data types share the same name, the Data API will return the first one it finds.

The typename is converted to a URL friendly format by removing spaces and setting it to lowercase. For example:

**Data Type name:** Rental Unit

**Typename:** rentalunit

**Endpoint URL:** <https://appname.bubbleapps.io/api/1.1/obj/rentalunit>

{% hint style="info" %}
You can read more about the formatting of type names in [this article.](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-endpoints#the-data-type-url)
{% endhint %}

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: *Postman* is a third-party app for viewing and testing API calls.

    External page: [Postman](https://www.postman.com)

[^3]: An API endpoint is a specific URL or address where an API (Application Programming Interface) receives requests.\
    \
    Article series: [Introduction to APIs](/help-guides/integrations/api/introduction-to-apis)
