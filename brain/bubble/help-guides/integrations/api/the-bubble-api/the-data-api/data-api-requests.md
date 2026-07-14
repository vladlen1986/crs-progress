# Data API requests
> Source: https://manual.bubble.io/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-requests · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers the different requests that you can make with the Data API.

{% hint style="info" %}
This section takes a long-form look at how you can set up different requests using the Data API.\
\
If you are familiar with API’s and want the short-form technical documentation, you can go to the [list of Data API requests](/core-resources/api/the-bubble-api/the-data-api/data-api-requests) in our reference section instead.
{% endhint %}

Bubble's Data API gives external systems such as other applications access to read, create, edit and delete records in your app’s database.

## Example application

{% hint style="info" %}
Bubble offers a Postman collection, a tool for viewing and testing API calls. This collection is specifically designed to help developers understand and experiment with the various API functionalities available in Bubble.

External page: [Bubble Postman collection](https://www.postman.com/bubbleapi)
{% endhint %}

Before we move into the different requests, we'll imagine an example application that we'll reference throughout this section:

Imagine we are building a platform that allows property owners to manage their rental units. To keep our examples very simple, we are just adding a few fields to a data type called Rental Unit:

<table data-header-hidden><thead><tr><th width="206"></th><th></th></tr></thead><tbody><tr><td><strong>Field name</strong></td><td><strong>Field type</strong></td></tr><tr><td>Unit name</td><td>text</td></tr><tr><td>Unit number</td><td>Number (integer)</td></tr><tr><td>Unit address</td><td>geographical address</td></tr></tbody></table>

You can set up the call from any system you prefer, but for these examples we’ll use a tool called [Postman](https://www.postman.com) to send the requests to our Bubble app.

<details>

<summary>What is Postman?</summary>

Postman is a tool that allows you to test and document APIs. It provides a user-friendly interface for sending HTTP requests and viewing the responses, and includes features such as saving and organizing requests, automated testing, and support for various authentication methods.\
\
We recommend using it to test both incoming and outgoing API requests in your Bubble applications. You can set up an account [here](https://identity.getpostman.com/signup).

</details>

## **Creating a thing**

{% hint style="info" %}
This is the in-depth manual entry for this Data API request. For the short-form technical reference, see [this entry](/core-resources/api/the-bubble-api/the-data-api/data-api-requests#create-a-thing).
{% endhint %}

The first thing we’ll do is to use the Data API to create a new rental unit. The process will look as follows:

* A POST request is sent from Postman to the rentalunit endpoint
  * Our Bubble app receives the request and processes it
  * A new rental unit is created
* Our Bubble app sends a response back to Postman to let us know that the request was successful

Let’s also quickly go over how the API is structured:

* The **URL** points to the **resource** we want to access
* The **HTTP method** we use is **POST** since we want to create something
* The **header** contains the **bearer token** that is used to **authenticate** us, as well as the format of our **body** (JSON)
* The **body** contains the **parameters** that we want to save in the rentalunit (unitname, unitumber and address)<br>

### Request

{% hint style="info" %}
If you are developing in a custom branch, keep in mind that the URL includes the ID of the branch. For the Main branch, it's always version-test.
{% endhint %}

In Postman, we’ll create a new request and name it ‘Create Rental Unit’. The name is just for you to organize your different requests. In the URL bar, we’ll enter the root URL combined with the typename:

`https://myapp.bubbleapps.io/version-test/api/1.1/obj/rentalunit`<br>

Next, we’ll need to add the parameters we want to include when we create the new rental unit:

| **Key**      | **Value**                            |
| ------------ | ------------------------------------ |
| Unit name    | Unit A                               |
| Unit number  | 3                                    |
| Unit address | 33 Nassau Avenue, Brooklyn, NY 11222 |

Note that the last field, the Unit address, needs to be a valid Google Maps address. For testing purposes you can use the address in the example or copy/paste one from Google Maps.

In Postman, our call should look like this:

<figure><img src="/files/M5F0kMXYuYWHWVV4sdkX" alt=""><figcaption><p>In this screenshot you can see the HTTP method (GET), the endpoint and the parameters we want to send.</p></figcaption></figure>

Now we are ready to test the request in Postman by clicking the Send button.<br>

If you are curious to see the API structure, this is what’s being sent to your app’s server:

**Header**

```http
Authorization: Bearer <token>
User-Agent: PostmanRuntime/7.30.0
Accept: */*
Cache-Control: no-cache
Postman-Token: <token>
Host: myapp.bubbleapps.io
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
```

**Body**

```json
Unit name: "Unit A"
Unit number: "3"
Unit address: "33 Nassau Avenue, Brooklyn, NY 11222"j
```

### Response

When a request has been processed by the Bubble server it will send a response back to the client with a success or error code, as well as any relevant information connected to the request. In the case of this request, two pieces of data are sent back to the client:<br>

* A status on the request (Success)
* The Unique ID of the rental unit we created

This too is sent in JSON format and looks like this:

```json
{
    "status": "success",
    "id": "1672236233855x229135430406542270"
}

```

## **Making changes to a thing**

{% hint style="info" %}
This is the in-depth manual entry for this Data API request. For the short-form technical reference, see [this entry](/core-resources/api/the-bubble-api/the-data-api/data-api-requests#make-changes-to-a-thing-by-id).
{% endhint %}

Now it’s time to make some changes to the rental unit we just created. As you may have guessed, there’s an important difference between these two calls: since we now want to make changes to a specific thing, we need to identify that thing in the request.

Luckily we have a unique ID from the response of our last POST request, so we can use that to find the correct unit and make changes to it. When we search for a database thing by its Unique ID field, it’s often called a lookup.

So let’s look at what kind of steps the process will be going through this time:

* A PATCH request is sent from Postman to the rentalunit endpoint including a unique ID
  * Our Bubble app receives the request
  * The server performs a lookup on the Unique ID
  * The changes are made to the rental unit
* Our Bubble app sends a response back to Postman to let us know that the request was successful

### Request

In Postman, change the [HTTP method](#user-content-fn-1)[^1] from POST to PATCH and then add the unique ID of the rentalunit we created earlier after the typename. The full URL should look something like this:

\
`https://myapp.bubbleapps.io/version-test/api/1.1/obj/rentalunit/`

Now navigate to the parameter section and make some additional changes. We can remove the Unit number and Unit address fields since we only want to change the name for now. That should leave you with just one parameter:<br>

| Key       | Value    |
| --------- | -------- |
| Unit name | New name |

In Postman, the request settings should look like this:

<figure><img src="/files/zs90JuLrDk19L6zkANPO" alt=""><figcaption><p>Note that we have changed the HTTP method to PATCH.</p></figcaption></figure>

Now let’s try that by clicking the SEND button.

### Response

With this kind of action, we don’t need any response except to know whether it was successful. After all, we already know which record we are making changes to, so there’s no need for the server to send the unique ID.

In this case your Bubble app will respond with a status code of 201 and an empty body.<br>

## **Bulk creating things**

{% hint style="info" %}
This is the in-depth manual entry for this Data API request. For the short-form technical reference, see [this entry](/core-resources/api/the-bubble-api/the-data-api/data-api-requests#bulk-create-things).
{% endhint %}

The requests we have set up so far have worked on single records; we have created one new thing and made changes to one thing.

In this scenario we are going to create several things in one request using the Data API’s bulk feature. This is a very powerful feature that allows you to create a list of things in your database very fast.

The bulk creation feature is the fastest way to create a list of things, but you should be mindful of your app’s capacity when bulk creating database records since it can consume a lot of server capacity.

There’s a hard limit of 1000 records when using the bulk create feature. Additionally, if the request takes more than 4 minutes to process it will time out and be canceled.

### Request

Since we are creating something we will still be using the POST [HTTP method](#user-content-fn-1)[^1]. We need to make a change to our endpoint to tell our Bubble app that we want to create multiple records. We’ll add the word bulk to the endpoint, making it look like this:<br>

`POST https://myapp.bubbleapps.io/api/1.1/obj/rentalunit/bulk`<br>

The next change we need to make is to tell Bubble that we’re formatting our parameters as text rather than JSON. To change this, go to the Body section and choose Raw as the format. Then check the dropdown all the way to the right and set it to Text. If you now go to Headers you should see the Content-type having changed to plain/text.

We’ll also need to change the formatting of the parameters we are sending. This time, we’ll use the full data type name (i.e. Rental unit instead of rentalunit) and we’ll use one line for each record that we want to create. Include all parameters that you need, and any fields left out will be empty in the created record (or their default value if they have one).

In the Body section, write out your fields in this structure:

```
{"Field1": Value, "Field2": “Value"}
{"Field1": Value, "Field2”: "Value"}
```

For our rental units, it should look like this:

```
{"Unit name": "New apartment", "Unit number": 5}
{"Unit name": "Old apartment", "Unit number": 6}
```

Note that strings need to be in quotation marks but numbers (integers) don’t.<br>

<figure><img src="/files/tGm9yWUz2wQxcSHn6bUe" alt=""><figcaption><p>Note that we have added <em>bulk</em> to the endpoint and changed the body type to RAW - TEXT.</p></figcaption></figure>

### Response

When using the bulk feature, Bubble will give you one line of response for each item that you have tried to create. For our example above, the response is as follows:

```
{"status":"success","id":"1672396136196x664154886510492300"}
{"status":"success","id":"1672396136197x330332849009372400"}
```

As you’ll recall, this is the same response as we got when creating a single rental unit, just with multiple lines. If we were to mess up one of our lines, we would get an error message for that particular line:

{% code overflow="wrap" %}

```
{"status":"error","message":"Could not parse as JSON: {\"Unit name\": \"New apartment, \"Unit number\": 5}"}
{"status":"success","id":"1672396782256x592646320029190300"}
```

{% endcode %}

In this example a quotation mark was left out after New apartment making it impossible for Bubble to parse it. As you can see, record number two, which was correctly formatted, was still created.

## **Searching for things**

{% hint style="info" %}
This is the in-depth manual entry for this Data API request. For the short-form technical reference, see [this entry](/core-resources/api/the-bubble-api/the-data-api/data-api-requests#get-a-list-of-things).
{% endhint %}

In this example we’ll be doing nearly the same things as the last one, but with a slight alteration: rather than performing a lookup (directly identifying the record by its Unique ID) we’ll perform a search (looking for one or more records that match our criteria).

When setting this up, it helps to think about how Do a search for is structured: we need to tell what data type we are searching for, and we need to add constraints to narrow the search down. The Data API works in exactly the same way.

### Request

First, let’s think about the [HTTP method](#user-content-fn-1)[^1]: as we want to find data rather than making changes to it, we’ll be using the GET method. Since we are still searching for rentalunits, we’ll use the same endpoint as in our last request, except we’ll remove the Unique ID.

Now, let’s set up our constraints. In the database we have six rental units numbered sequentially. We’ll use the unitnumber field to search for units that have a number higher than 3 and a name that contains Unit.

{% hint style="info" %}
You can find a list of all constraint types in our Data API reference.
{% endhint %}

In the params section we’ll add one parameter called constraints. We’ll then add our constraints with the following format:

{% code overflow="wrap" %}

```
[ { "key": "unitname", "constraint_type": "text contains", "value": "Unit" } ,{ "key": "unitnumber", "constraint_type": "greater than", "value": "3" }]
```

{% endcode %}

Let’s break down the logic of that snippet:

* There are two constraints, each wrapped in curly brackets
* Each constraint contains three data points:
  * **Key**: the name of the field we want to apply the constraint to (unitname)
  * **Constraint\_type**: the type of constraint we want to apply (text contains)
  * **Value**: the value we’re looking for (Unit)
* Each data point is separated by a comma and wrapped in quotation marks
* Each constraint is also separated by a comma, and the full parameter is wrapped in square brackets.<br>

Now let’s run it.<br>

### Response

Here’s what Bubble returns:

```json
{
    "response": {
        "cursor": 0,
        "results": [
            {
                "Modified Date": "2022-12-30T11:03:11.097Z",
                "Created Date": "2022-12-30T11:03:11.097Z",
                "Created By": "admin_user_securitybook_test",
                "Unit name": "Rental unit 4",
                "Unit number": 4,
                "_id": "1672398191097x872601726695236800"
            },
            {
                "Modified Date": "2022-12-30T11:03:11.098Z",
                "Created Date": "2022-12-30T11:03:11.098Z",
                "Created By": "admin_user_securitybook_test",
                "Unit name": "Rental unit 5",
                "Unit number": 5,
                "_id": "1672398191098x642899010515676700"
            },
            {
                "Modified Date": "2022-12-30T11:03:11.099Z",
                "Created Date": "2022-12-30T11:03:11.098Z",
                "Created By": "admin_user_securitybook_test",
                "Unit name": "Rental unit 6",
                "Unit number": 6,
                "_id": "1672398191098x774874860707789600"
            }
        ],
        "count": 3,
        "remaining": 0
    }
}
```

As you can see, JSON is an easy-to-read format. We can clearly recognize the data and their fields from our Bubble database. The count value shows the number of results in this response, and the remaining value shows how many records are left (Bubble will return 100 records by default, but you can also set the number you want returned with the pagination feature).

### **Pagination**

Pagination means to divide up the search results into "pages" – smaller, more manageable chunks of data. The Data API splits results into pages of 100 records by default, but you can set up pagination to work in the way you want by providing a few more parameters.

To set up pagination, we need two more parameters:

* Cursor: Where to start the list (similar to items from # in the Bubble editor)
* Limit: How many results you want back (similar to items to # in the Bubble editor)

You add this just like you did the constraint parameter in the last example. In Postman, go to the Params section and add two new rows of parameters: cursor and limit. Let’s say we want to get results from the 2nd record to the 5th, we provide a cursor value of 2 and a limit value of 3.

Bubble will respond with 3 items, starting from item #2. It will also provide the remaining value, which can be used as the cursor to fetch the next page of items.

### **Sorting**

Just like Do a search for, the Data API can also be set up to sort the results based on a parameter of your choice. To apply sorting, use the following two parameters:

* Sort\_field: the field you want to sort by
* Descending (true/false)

You can also apply one or more layers of sorting after the first one by using the additional\_sort\_fields and supplying an array of sort fields just like we did with constraints. For example, if we wanted to sort by the unitnumber and then the unitname, our parameter would look like this:

<table data-header-hidden><thead><tr><th width="215"></th><th></th></tr></thead><tbody><tr><td>additional_sort_fields</td><td>[ { "sort_field": "unitname", "descending": "false"}]</td></tr></tbody></table>

{% hint style="warning" %}
**Sorting with the Data API:** Sorting can only be applied to fields that contain *single values*. You cannot sort by fields that contain a *list of things* (e.g. a list of tags or related entries). This limitation mirrors how sorting works in Bubble’s `Do a search for` and ensures consistent behavior between the editor and API.
{% endhint %}

[^1]: The HTTP method specifies what kind of action we want the server to take when sending an API call.\
    \
    Article: [What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)

    Article section: [The HTTP method](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#http-method)
