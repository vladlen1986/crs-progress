# Data API requests
> Source: https://manual.bubble.io/core-resources/api/the-bubble-api/the-data-api/data-api-requests · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The different resources availabe in the Bubble Data API.

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

{% hint style="info" %}
This is the short-form reference entry for the different request types of the Bubble Data API. Each request uses an HTTP method. To learn more about what an HTTP method is from a more technical perspective, check out our guide on [How RESTful APIs work](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api) and [HTTP methods](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#http-method) specifically.\
\
We also have an in-depth guide on [the Data API](/help-guides/integrations/api/the-bubble-api/the-data-api) and on the different [Data API requests](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-requests).
{% endhint %}

## Retrieve record by ID

<mark style="color:blue;">`GET`</mark> `https://appname.bubbleapps.io/api/1.1/obj/typename/uid`

You can retrieve a thing by sending a GET request with the record’s Unique ID. Use the endpoint below, where the parts in bold are replaced with the relevant strings from your application:

#### Query Parameters

| Name                                 | Type   | Description                 |
| ------------------------------------ | ------ | --------------------------- |
| id<mark style="color:red;">\*</mark> | String | The unique ID of the record |

{% tabs %}
{% tab title="404: Not Found Record not found" %}
{% code overflow="wrap" %}

```json
{
    "statusCode": 404,
    "body": {
        "status": "MISSING_DATA",
        "message": "Missing object of type rentalunit: object with id 1671702337369x488321592367327900 does not exist"
    }
}
```

{% endcode %}
{% endtab %}

{% tab title="200: OK Success" %}

```json
{
    "response": {
        "_id": "1671702337369x488321592367327900",
        "Created By": "example@example.com",
        "Created Date": "2022-12-22T09:45:37.369Z",
        "Modified Date": "2022-12-22T09:45:37.417Z",
        "Unit name": "Unit A"
    }
}
```

{% endtab %}
{% endtabs %}

You can retrieve a thing by sending a GET request with the record’s Unique ID. Use the endpoint below, where the parts in bold are replaced with the relevant strings from your application:

### Errors and solutions

#### Possible solutions for error 404:

* Check that the data type is active in the Data API settings
* If this is the live environment of your app, check that the settings have been deployed
* Check that the full unique ID is included in the URL
* Check that there is an existing record with that unique ID in your application
* Check that you are using the URL of the right branch of your application

## Make changes to a Thing by ID

<mark style="color:purple;">`PATCH`</mark> `https://appname.bubbleapps.io/api/1.1/obj/typename/UID`

Save changes to the fields of a database record identified by its unique ID.

#### Request Body

| Name | Type    | Description                                               |
| ---- | ------- | --------------------------------------------------------- |
| key1 | varying | The field to change and new value. Must match field type. |

{% tabs %}
{% tab title="204: No Content Success" %}
No body
{% endtab %}

{% tab title="400: Bad Request Field(s) not found" %}

```json
{
    "statusCode": 400,
    "body": {
        "status": "ERROR",
        "message": "Unrecognized field: Fieldname"
    }
}
```

{% endtab %}

{% tab title="404: Not Found Record not found" %}
{% code overflow="wrap" %}

```javascript
{
    "statusCode": 404,
    "body": {
        "status": "MISSING_DATA",
        "message": "Missing object of type rentalunit: object with id 1671702337369x488321592367327900 does not exist"
    }
}
```

{% endcode %}
{% endtab %}

{% tab title="401: Unauthorized User is not authorized to make the change" %}

```json
{
    "error_class": "Unauthorized",
    "args": {
        "code": "1671711631737x692262587046790400"
    },
    "message": null,
    "translation": "You do not have permission to modify this object"
}
```

{% endtab %}
{% endtabs %}

You can make changes to a thing by sending a PATCH request with the record’s Unique ID.

The body of the request should be a JSON object with a list of keys and values to modify. The keys should match the names of the keys returned via a GET request, and the values need to be [correctly formatted](/core-resources/api/the-bubble-api/the-data-api/data-api-endpoints#the-typename).

### **Privacy Rules**

For this request to work, the [**Modify via API privacy settings**](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-privacy-rules) must be active on the relevant data type. The privacy rule will be checked both before the modification to confirm that the user has permission to modify this thing, and after the modification to confirm that the modification was valid. We do not permit a user to modify a thing in a way that would take away that user's ability to perform further modifications.

### Errors and solutions

**Possible solutions for error 400 (field(s) not found):**

* Check that the field name is correct and [correctly formatted](/core-resources/api/the-bubble-api/the-data-api/data-api-endpoints#the-typename)
* Check that there are no duplicate field name(s)

**Possible solutions for error 401 (not authorized):**

* Check that you are including the right credentials in the authentication, such as the [bearer token](/help-guides/integrations/api/the-bubble-api/authentication/how-to-authenticate#what-is-a-bearer-token)
* Check that the Modify via API box is checked in the relevant [Privacy Rules](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-privacy-rules) in your app

**Possible solutions for error 404 (record not found):**

* Check that the *Find this in searches* box is checked in the relevant [Privacy Rules](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-privacy-rules) in in your app
* Check that the data type is active in the Data API settings
* Check that the Create via API box is checked in the relevant privacy rules in your app
* If this is the live environment of your app, check that the settings have been deployed
* Check that the full unique ID is included in the URL
* Check that there is an existing record with that unique ID in your application
* Check that you are using the URL of the right branch of your application

## Replace a Thing by ID

<mark style="color:orange;">`PUT`</mark> `https://appname.bubbleapps.io/api/1.1/obj/typename/UID`

Overwrite all editable fields on a Thing by its unique ID

#### Request Body

| Name | Type    | Description                                                 |
| ---- | ------- | ----------------------------------------------------------- |
| key1 | varying | The field to change and new value. Must match field type.ld |

{% tabs %}
{% tab title="204: No Content Success" %}

```javascript
No body
```

{% endtab %}

{% tab title="400: Bad Request Field not found" %}

```json
{
    "statusCode": 400,
    "body": {
        "status": "ERROR",
        "message": "Unrecognized field: Fieldname"
    }
}
```

{% endtab %}

{% tab title="404: Not Found Record not found" %}
{% code overflow="wrap" %}

```json
{
    "statusCode": 404,
    "body": {
        "status": "MISSING_DATA",
        "message": "Missing object of type rentalunit: object with id 1671702337369x488321592367327900 does not exist"
    }
}
```

{% endcode %}
{% endtab %}

{% tab title="401: Unauthorized User is not authorized to make the change" %}

```javascript
{
    "error_class": "Unauthorized",
    "args": {
        "code": "1671711631737x692262587046790400"
    },
    "message": null,
    "translation": "You do not have permission to modify this object"
}
```

{% endtab %}
{% endtabs %}

You can make changes to a thing by sending a PUT request with the record’s Unique ID.

The body of the request should be a JSON object with a list of keys and values to modify. The keys should match the names of the keys returned via a GET request, and the values need to be [correctly formatted](/core-resources/api/the-bubble-api/the-data-api/data-api-endpoints#the-typename).

{% hint style="warning" %}
The PUT HTTP method will overwrite all editable fields on a record. Any field that is not given a new value will be left empty or reset to the default value they are given in the Data Type editor.\
\
To make changes to selected fields without overwriting other fields, use the [Make changes to a thing by ID](#make-changes-to-a-thing-by-id) request.
{% endhint %}

### **Non-editable fields**

The following fields cannot be changed:

* Unique ID (not replaced)
* Created date (not replaced)
* Modified date (automatically updated)<br>

### **Privacy Rules**

For this request to work, the *Modify via API* setting in the Thing's [Privacy Rule](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-privacy-rules) must be active. The privacy rule will be checked both before the modification to confirm that the user has permission to modify this thing, and after the modification to confirm that the modification was valid. We do not permit a user to modify a thing in a way that would take away that user's ability to perform further modifications.

### Errors and solutions

**Possible solutions for error 400 (field not found):**

* Check that there are no duplicate field name(s)
* Check that the field name is correct and correctly formatted

**Possible solutions for error 400 (field not found):**

* Check that the data type is active in the [Data API settings](/help-guides/integrations/api/the-bubble-api/the-data-api#activating-the-data-api)
* If this is the live branch of your app, check that the settings have been deployed
* Check that the full unique ID is included in the URL
* Check that there is an existing record with that unique ID in your application
* Check that you are using the URL of the right branch of your application
* Check that the *Create via API* box is checked in the relevant [Privacy Rules](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-privacy-rules) in your app

**Possible solutions for error 401 (not authorized):**

* Check that you are including the right credentials in the authentication, such as the [bearer token](/help-guides/integrations/api/the-bubble-api/authentication/how-to-authenticate#what-is-a-bearer-token)
* Check that the *Modify via API* box is checked in the relevant [Privacy Rules](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-privacy-rules) in your app

## Delete a Thing

<mark style="color:red;">`DELETE`</mark> `https://appname.bubbleapps.io/api/1.1/obj/typename/UID`

Delete a thing by sending a DELETE request with the record’s Unique ID.

{% tabs %}
{% tab title="404: Not Found Record not found" %}

```json
{
    "statusCode": 404,
    "body": {
        "status": "MISSING_DATA",
        "message": "Missing object of type rentalunit: object with id 1671702337369x488321592367327900 does not exist"
    }
}
```

{% endtab %}

{% tab title="401: Unauthorized User is not authorized to make the change" %}

```json
{
    "error_class": "Unauthorized",
    "args": {
        "code": "1671714622020x932812958293338700"
    },
    "message": null,
    "translation": "You do not have permission to delete this object"
}
```

{% endtab %}

{% tab title="204: No Content Success" %}
No body
{% endtab %}
{% endtabs %}

### **Privacy Rules**

For this request to work, the *Delete via API* setting must be active on the relevant data type's [Privacy Rules](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-privacy-rules).

### Errors and solutions

**Possible solutions to error 404 (record not found):**

* Check that the data type is active in the Data API settings
* If this is the live branch of your app, check that the settings have been deployed
* Check that the full unique ID is included in the URL
* Check that there is an existing record with that unique ID in your application
* Check that you are using the URL of the right branch of your application
* Check that the Delete via API box is checked in the relevant privacy rules in your app

**Possible solutions to error 401 (not authorized):**

* Check that you are including the right credentials in the authentication, such as the [bearer token](/help-guides/integrations/api/the-bubble-api/authentication/how-to-authenticate#what-is-a-bearer-token)
* Check that the *Delete via API* box is checked in the relevant [Privacy Rules](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-privacy-rules) in your app

## Create a Thing

<mark style="color:green;">`POST`</mark> `https://appname.bubbleapps.io/api/1.1/obj/typename`

The body of the request should be a JSON object containing the details you want to save on the new Thing. The keys should match the names of the keys returned via a GET request for that type of thing, and the values should be [correctly formatted](/core-resources/api/the-bubble-api/the-data-api/data-api-endpoints#the-typename).

#### Request Body

| Name | Type    | Description                                               |
| ---- | ------- | --------------------------------------------------------- |
| key1 | varying | The field to change and new value. Must match field type. |

{% tabs %}
{% tab title="201: Created Success" %}

```json
{
    "status": "success",
    "id": "1671702337369x488321592367327900"
}
```

{% endtab %}

{% tab title="401: Unauthorized User is not authorized to make the change" %}

```javascript
{
    "error_class": "Unauthorized",
    "args": {
        "code": "1671716913010x902588598612626300"
    },
    "message": null,
    "translation": "Permission denied: cannot create this object"
}
```

{% endtab %}
{% endtabs %}

The body of the request should be a JSON object containing the details you want to save on the new Thing. The keys should match the names of the keys returned via a GET request for that type of thing, and the values should be [correctly formatted](/core-resources/api/the-bubble-api/the-data-api/data-api-endpoints#the-typename).

### **Automatically created fields and default values:**

Bubble will automatically create the following fields and their value cannot be overridden:

* Unique ID
* Created date
* Modified date

All fields that have a default value set in the data type editor will be given that default value if another value is not provided in the request.

### **Creating users**

If you are creating a new user, there are two built-in special fields that are not present on other data types:

* Email (required)
* Password (optional)

{% hint style="info" %}
This method creates a User in the database, but does not return any authentication token for that User. If you are looking to create or log in as a User in order to authenticate them as an API client, you may be interested in the article below:\
\
Article: [Authenticating as a User with the Bubble API](/help-guides/integrations/api/the-bubble-api/authentication/as-a-user)
{% endhint %}

### **Privacy Rules**

For this request to work, the *Create via API* privacy setting must be active on the relevant data type. The privacy rule will be checked on the new data for the thing, and the creation attempt will be rejected if Bubble does not find a matching privacy rule that allows the creation to happen.

### Errors and solutions

**Possible solutions for error 401 (not authorized):**

* Check that the *Create via API* box is checked in the relevant [Privacy Rules](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-privacy-rules) in your app
* Check that you are including the right credentials in the authentication, such as the [bearer token](/help-guides/integrations/api/the-bubble-api/authentication/how-to-authenticate#what-is-a-bearer-token)

## Bulk create Things

<mark style="color:green;">`POST`</mark> `https://appname.bubbleapps.io/api/1.1/obj/typename/bulk`

The body of the request should be formatted as a text document with one new object to create per line. The objects should be in JSON format without any newlines. The keys and values should be the same as when creating a single Thing.

\
**Body:**

{"key1": “value”, "key2": “value”}

{"key1": “value”, "key2": “value”}

\
**Content-type:**

text/plain

{% tabs %}
{% tab title="200: OK Success" %}
{% code title="(See comment below)" %}

```
{"status":"success","id":"1671702337369x488321592367327900"}
{"status":"success","id":"1671702337369x488321592367327901"}
```

{% endcode %}
{% endtab %}

{% tab title="400: Bad Request Wrong Content-Type" %}
{% code overflow="wrap" %}

```json
{
    "statusCode": 400,
    "body": {
        "status": "ERROR",
        "message": "Expecting a newline-seperated list of JSON objects.  Make sure the Content-Type header is text/plain"
    }
}
```

{% endcode %}
{% endtab %}

{% tab title="400: Bad Request Could not parse as JSON" %}
{% code title="One per row" overflow="wrap" %}

```javascript
{"status":"error","message":"Could not parse as JSON: {\"Unit name\": \unit1}"}
```

{% endcode %}
{% endtab %}
{% endtabs %}

You can create a list of new things in a bulk operation by sending a POST request to the /typename/bulk endpoint. The body of the request should be formatted as a text document with one new object to create per line. The objects should be in JSON format without any newlines. The keys and values should be the same as when creating a single thing.

The keys should match the names of the keys returned via a GET request for that type of thing, and the values should be [correctly formatted](/core-resources/api/the-bubble-api/the-data-api/data-api-endpoints#the-typename).<br>

### **Limitations**

The maximum number of items that can be created via a single bulk request is currently 1,000. There is also a limit of 4 minutes for the request to complete; if it takes longer than 4 minutes, items that have not yet been created will be marked as errors in the response.

The creation speed and risk of timeout depends on the available capacity that your application has as well as the size of the items that you are creating.

{% hint style="warning" %}
**Caution**: Bulk creation can consume a lot of application capacity, so we recommend that if your app is being used in production and capacity is limited, that you test bulk creation in smaller chunks and work your way up.<br>
{% endhint %}

### **Privacy Rules**

Using this endpoint requires the *Create via API* permission. The [Privacy Rule](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-privacy-rules) will be checked on the new data for each new thing, and the creation attempt will be rejected if Bubble does not find a matching privacy rule that allows the creation to happen. If some things are rejected and some are accepted, the accepted items will be created.

### **Success**

The response body from this call is a text/plain document with one line per thing in the original request. Each line consists of a JSON object, with a 'status' field indicating whether or not the creation was successful. On success, the status will be 'success', and the object will contain an 'id' field with the id of the newly-created object.

### Errors and solutions

**Possible solutions to error 400 (wrong content-type):**

* Make sure that the Content-type in the Header is set to text/plain.

**Possible solutions to error 400 (Could not parse as JSON):**\
This error is returned on each row where the JSON could not be parsed.

* Make sure that the JSON is correctly formatted

{% hint style="info" %}
To check the formatting of JSON you can use a tool like JSON checker\
\
External link: <https://jsonchecker.com/>
{% endhint %}

\
**Server error or timeout error**

Under certain circumstances, like an overall system failure or the app being completely out of capacity, you may get a generic error response that does not have individual lines for each object.

**Possible solutions to server error or timeout error:**

If you get a generic error response, try the following:

* Check Bubble’s [status page](https://status.bubble.io/) for any server downtime
* Check your application’s capacity chart to see if you may have spent all your capacity
* Check the [Bubble forum](https://forum.bubble.io/) for any threads about similar problems
* Get in touch with [Bubble support](https://bubble.io/support#!)

## Get a list of Things

<mark style="color:blue;">`GET`</mark> `https://appname.bubbleapps.io/api/1.1/obj/typename`

Search for and retrieve a list of a given data type with or without constraints.

#### Query Parameters

| Name               | Type    | Description                                                                                               |
| ------------------ | ------- | --------------------------------------------------------------------------------------------------------- |
| key                | String  | The key to which you want to apply the constraint and                                                     |
| constraint type    | String  | The type of constraint to apply                                                                           |
| Value              | Varying | The value the constraint should compare to                                                                |
| cursor             | Number  | Start from item #                                                                                         |
| limit              | String  | Show item until #                                                                                         |
| sort\_field        | String  | The field you want to sort by                                                                             |
| exclude\_remaining | Boolean | <p>Don't count all remaining items<br><a data-footnote-ref href="#user-content-fn-3">What's this?</a></p> |

{% tabs %}
{% tab title="404: Not Found Constraint type is not compatible" %}

```json
{
    "statusCode": 404,
    "body": {
        "status": "NOT_FOUND",
        "message": "Constraint type not found contains for field unit_name_text and type rentalunit"
    }
}
```

{% endtab %}
{% endtabs %}

The constraints parameter should be an array of constraints that include the parameters above.

Add parameters directly in the URL as a query strings. It can be limit, cursor (Pagination), constraints (Search constraints), sort\_field, and descending (Sorting options).

**Constraint examples**

You can narrow down the list returned by the Data API to match specific constraints, just like with Do a search for in Bubble. The constraints parameter should be an array of constraints that include the following:

<table data-header-hidden><thead><tr><th width="224.33333333333331">Key</th><th>Value example</th></tr></thead><tbody><tr><td>Key</td><td>Value example</td></tr><tr><td>key</td><td>Unitname, unitnumber</td></tr><tr><td>constraint_type</td><td>equals, greater than</td></tr><tr><td>value</td><td>Unit A, 3</td></tr></tbody></table>

### **Constraint types**

<table><thead><tr><th width="243.33333333333331">Constraint Type</th><th width="332">Description</th><th>Field Types</th></tr></thead><tbody><tr><td>equals or not equal</td><td>Use to test strict equality</td><td>All field types</td></tr><tr><td>is_empty or is_not_empty</td><td>Use to test whether a thing's given field is empty or not</td><td>All field types</td></tr><tr><td>text contains or not text contains</td><td>Use to test whether a text field contains a string. <em>Text contains</em> will not respect partial words that are <a data-footnote-ref href="#user-content-fn-4">not of the same stem</a>.</td><td>Text fields only</td></tr><tr><td>greater than or less than</td><td>Use to compare a thing's field value relative to a given value</td><td>Text, number, and date fields</td></tr><tr><td>in or not in</td><td>Use to test whether a thing's field is in a list or not for all field types.</td><td>All field types</td></tr><tr><td>contains or not contains</td><td>Use to test whether a list field contains an entry or not for list fields only.</td><td>List fields only</td></tr><tr><td>empty or not empty</td><td>Use to test whether a list field is empty or not for list fields only.</td><td>List fields only</td></tr><tr><td>geographic_search</td><td>Use to test if the current thing is within a radius from a central address. To use this, the value sent with the constraint must have an address and a range.</td><td></td></tr></tbody></table>

### **Example**

In this example, we will send a request to search for a unit by the name ‘Unit A’ using the following two constraints:

| Key              | Value                  |
| ---------------- | ---------------------- |
| key              | unitname, unitnumber   |
| constraint\_type | contains, greater than |
| value            | Unit A, 3              |

The URL below represents the URL before URL-encoding:

{% code overflow="wrap" %}

```url
GET https://securitybook.bubbleapps.io/version-test/api/1.1/obj/rentalunit?constraints=[ { "key": "unitname", "constraint_type": "equals", "value": "Unit A" } ,{ "key": "unitnumber", "constraint_type": "greater than", "value": "3" }]
```

{% endcode %}

After applying URL encoding, the same URL should look like this:

{% code overflow="wrap" %}

```url
GET https://securitybook.bubbleapps.io/version-test/api/1.1/obj/rentalunit?constraints=[%20{%20%22key%22:%20%22unitname%22,%20%22constraint_type%22:%20%22equals%22,%20%22value%22:%20%22Unit%20A%22%20}%20,{%20%22key%22:%20%22unitnumber%22,%20%22constraint_type%22:%20%22greater%20than%22,%20%22value%22:%20%223%22%20}]

```

{% endcode %}

### **Pagination**

In the response, Bubble will supply two values to aid in pagination:

* **Cursor**: the rank of the first item in the list
* **Count**: the number of items in the current response
* **Remaining**: the number of records left

### **Sorting**

By default, GET requests are sorted by their creation date. The Bubble Data API supports the sort\_field and descending parameter.

* Sort\_field: the field you want to sort by
* Descending (true/false)

To define more than one sorting field, add an array additional\_sort\_fields, which should contain objects of the similar type as above, i.e., with sort\_field and descending.

### Errors and solutions

**Suggested solutions to error 404 (incompatible constraint type)**

* Check that the field type you are applying the constraint to and the constraint type are compatible
* Check that the constraint type is spelled correctly

### Limitations

* There is a limit of 50,000 items in any GET request, meaning that if a database contains 100,000 items and the cursor is set at 50,001 no results will be returned
* For the Enterprise plan the limit is 10,000,000 items

## Manual entries

You may find these entries from our manual useful to get a deeper understanding of how the Bubble API works:

{% content-ref url="/pages/Ec5Rmh0W3XxxVfukBzPY" %}
[What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)
{% endcontent-ref %}

{% content-ref url="/pages/qVQrCNasyAQigdo9Xbbb" %}
[How to authenticate](/help-guides/integrations/api/the-bubble-api/authentication/how-to-authenticate)
{% endcontent-ref %}

{% content-ref url="/pages/tQeEgNpeO5ovpJXctQGA" %}
[The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)
{% endcontent-ref %}

{% content-ref url="/pages/d3U16LFw7yw4LHqypMLr" %}
[Data API requests](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-requests)
{% endcontent-ref %}

<br>

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: *Postman* is a third-party app for viewing and testing API calls.

    External page: [Postman](https://www.postman.com)

[^3]: You can instruct Bubble to not count the remaining number of items. This is useful in cases where you have a very large volume of records and want to save the time and capacity needed to perform the count.

    The parameter value is passed as *true* or *false*.

[^4]: It takes the argument supplied, breaks it up into component words, removes any 'stop' words (common words like 'the' or 'a'), and looks for the resulting word(s).\
    \
    For example, searching for ‘cat hat’, ‘cat in hat’, ‘cat in the hat’, ‘the hat cat’, or ‘hat cat’ would return ‘the cat in the hat’. This does not respect partial words that are not of the same stem, so 'pepp' would not return 'peppers'.
