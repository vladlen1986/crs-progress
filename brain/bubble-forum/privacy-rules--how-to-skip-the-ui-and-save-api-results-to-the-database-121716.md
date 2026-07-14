# How to skip the UI and save API results to the database
> Source: https://forum.bubble.io/t/how-to-skip-the-ui-and-save-api-results-to-the-database/121716 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 11 posts · topic: privacy-rules

## Original post (by @mike.maberry)

APIs provide an excellent source of rich and useful data. Bubble makes consuming those APIs a breeze with its API connector (https://bubble.io/reference#Plugins.apiconnector2) plugin. Some elements of dealing with APIs can be tricky, especially around pagination and adding directly to the database without any UI elements.

Bubble provides a way to do both of these easily but only once you get your head around the concepts. This document will show you how to consume an API, page through the data, and insert it directly into the database.

An API that returns a significant amount of data will use paging. For example, this API return shows 92 results for the query and a limit of 50 rows spread over two pages.

> 

```
"totalDocs":92

```

“limit”:50

“page”:1

“totalPages”:2

“pagingCounter”:1

“hasPrevPage”:false

“hasNextPage”:true

“prevPage”:NULL

“nextPage”:2

}

The first problem you will need to solve is how to call the API, in this case, twice with a page number parameter to get all the data. The next problem is how you can insert the data into the database without having first to bring it into a repeating group, use state variables, and the like.

For this method of retrieving and storing API results to the database, your app will need to be a paid plan of personal or better. That will expose a new feature set call backend workflows.

[image]
backend_workflows796×443 21.2 KB

For the rest of this guide, we will use a production API configured in the connector plugin as an action that will return a variable amount of products based on the parameters passed. Ensure that you have created a database with fields and types that match the API’s data. The best practice is to name the fields to match those returned by the API

[image]
api-connector821×687 33.1 KB

Navigate to the backend workflow section of your application and create a new API endpoint.

[image]

In the property editor, give your new endpoint a name. Make sure that it is lower case and has no spaces. You will uncheck Expose as a public endpoint, check This endpoint can be run without authentication, and check to Ignore privacy rules .

[image]
endpoint-1-property-editor361×672 17.3 KB

*Note this is not secure and is out of this document’s scope to discuss your application’s security. Please refer to Bubble documentation on configuring application security.

From here, we need to create parameters to pass into the third party API.  Click on the Add a new parameter button. The first parameter to create is a number to “loop” through the API to get all the data. I chose to call mine iteration, and the backend workflow API will use it as a loop counter. It will make more sense later.

[image]
get-products-api532×852 26.5 KB

Here is my “get-products-from-API” workflow property editor.

The arrow shows the iteration parameter as a number.

Create the rest of the parameters to match your APIs needs. Just make sure that the parameters mapped when initializing the API in the connector matc
…[trimmed]

## Reply by @rmjjkj1 (1 likes)

@mike.maberry Thank you for your tutorial! I have been searching for this. I was able to follow it but then got stuck and wondered if you have any ideas. The Api’s have been initialized and are working but this is where I got stuck: it is wanting me to add “more” after "Result from step 1.’ What am I doing wrong? Also, “this” option is not available in the parameters. Any help is much appreciated! Thank you.

[image]
Screen Shot 2021-05-01 at 3.28.15 PM1204×172 9.49 KB

[image]
Screen Shot 2021-05-01 at 3.25.49 PM734×1732 102 KB

## Reply by @chris43 (1 likes)

Is there a best practice on how much data to bring into a bubble database vs. retrieving data (maybe more than once) through an API?  In the marketing automation app we are working on, there is data from transaction processing with Stripe that is useful for calculating the value of a customer and the costs to transact and acquire them.  I would think the granular level of detail Stripe can provide is unnecessary, but is there a definitive practice to determine what you collect and store and what you may call more than once?

## Reply by @agoo7714 (1 likes)

I’m having a similar issue, has anyone got a method of iterating through the API call pages without having to store the data in your database? I’m importing 3000 records per API call and It’s difficult to store these in the database without lagging the application

## Reply by @alpertasci (1 likes)

Hi, I am not pro but, may be it helps. If your json object returns one body, you may need to refer subcategory. It solved my problem.

[image]
image1686×585 50.6 KB

[image]
image561×576 34.4 KB
