# The Bubble API
> Source: https://manual.bubble.io/help-guides/integrations/api/the-bubble-api · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers the different ways in which Bubble can set up API endpoints to allow other applications to read and edit your database, as well as execute workflows.

<details>

<summary>Help us improve this article</summary>

This article is part of a significant update to the Bubble manual and your feedback is critical to our efforts to continuously enhance our written documentation.\
\
We would greatly appreciate if you could take a moment to let us know your thoughts on the quality of it. Thank you for your support!\
\
[Give feedback on this article](https://docs.google.com/forms/d/e/1FAIpQLSfe7eaYVxkqTa_nn3QE6VObCxWB1hgh6sHUQGQ0Eit8JlAS7g/viewform?usp=pp_url\&entry.619913899=https://manual.bubble.io/help-guides/apis-connect-to-other-apps/the-bubble-api\&entry.80834677=The+Bubble+API)

</details>

The last section covered how APIs, and [RESTful APIs](#user-content-fn-1)[^1] in particular, work from a technical perspective. Ins this section we'll have a closer look at how APIs work in Bubble.

{% hint style="info" %}
This is the in-depth manual article series on Bubble’s API. If you want the shorter, technical reference, check out the Bubble API Reference entry:

Reference: [The Bubble API](/core-resources/api/the-bubble-api)
{% endhint %}

Bubble is designed to make it easy to connect to both other Bubble applications and external APIs in a highly flexible, secure and compatible way. Most of the highly technical stuff like setting up your app to be able to receive incoming API requests happens automatically by the click of a few buttons and offers the same functionality and security as a more resource-demanding traditionally coded application.

Because Bubble adheres to widely used web standards your application can connect to almost any other system.<br>

## What is the Bubble API?

The Bubble API is used whenever you want to accept **incoming API requests**.

<figure><img src="/files/TuoeQt5SijIhIEYGX1yM" alt=""><figcaption><p>The Bubble API handles incoming requests – calls that are made <em>from</em> an external application <em>to</em> your Bubble app.</p></figcaption></figure>

Incoming requests happen when an external system, such as another application, initiates a connection with your Bubble application. In that case, your app needs to be ready to accept that request and know what to do with it.

Incoming requests to Bubble can do one of two things:

* Search for, Read, create, modify or delete data in your database: this is handled by the **Data API.**
* Run a workflow in your app: this is handled by the **Workflow API.**

<details>

<summary>Authentication</summary>

Whenever a client[^2] attempts to connect your app's server[^3], you can require them to authenticate themselves. **Authentication** is the process of identifying **who** a client is in order to determine what they have access to your your application.\
\
This article explains the three different ways a client can authenticate.\
\
Article: [Authentication](/help-guides/integrations/api/the-bubble-api/authentication)

</details>

<details>

<summary>Webhooks</summary>

Calls that are made to your app as a response to a specific event (such as a successful or failed payment) are often called **webhooks**.\
\
Article section: [Webhooks](/help-guides/integrations/api/introduction-to-apis#webhooks) (with examples)

</details>

<details>

<summary>The Data API</summary>

The Data API can give external applications access to your app's database to read, create, edit and delete records.\
\
This article explains how to set up the Data API and how to send requests to your app.\
\
Article: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)\
Reference: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)

</details>

<details>

<summary>The Workflow API</summary>

The Workflow API lets you set up API workflows that can be triggered from outside of your own application without visiting any page.\
\
This article explains how to activate the Workflow API, how to create API workflows and finally how to access those workflows from an external system.\
\
Article: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)\
Reference: [The Workflow API](/core-resources/api/the-bubble-api/the-workflow-api)

</details>

## The Bubble API and Privacy Rules

We’ll explore how [Privacy Rules](#user-content-fn-4)[^4] affect both the Data API and API Workflows in each section.

This means that you can set up Privacy Rules that govern the access level of not only all API clients, but individual API clients since each of them can authenticate as an existing User.

Privacy Rules determine what kind of access a user that matches specific criteria has to each data type in your app. You can view any external system (client) that tries to access your app’s API as simply another user: this is true not only in a metaphorical sense but in a real one. Bubble treats it like a user that can be logged in or not, and in certain scenarios you can even save data to it just like any other user profile.

<figure><img src="/files/PU801MpGFyrziwCgYvgx" alt=""><figcaption><p>Privacy Rules serve as a secure filter to stop unauthorized access to your app's database.</p></figcaption></figure>

Both the Data API and API Workflows respect your app’s Privacy Rules. This is why setting them up correctly is an essential part of constructing your API.

## Swagger Specification

### What is the Swagger specification?

Whenever you activate the Bubble API, it means that you want external systems to reach your application with different kind of queries. Swagger is essentially a way for your API to automatically describe itself so that other systems can understand how it's structured and what queries are available.

> In essence, if your API is a restaurant, then the Swagger file is the menu.

For example, to successfully connect to your app, an external app or its developer may have "questions" like:

* How to authenticate with your app
* What kind of calls are available?
* What kind of parameters are there?
* What does the response look like?

The Swagger specification speaks a language that answers questions like this in a way that both humans and computers can understand. Bubble uses the JSON format to generate a Swagger file.

You can read more about the Swagger Specification standard [here](http://swagger.io/specification/).

### How do I create the Swagger file?

The Swagger file is generated automatically by Bubble and is dynamic in the way that it will update according to your app's settings. The Swagger file is disabled by default when the Bubble API is enabled, but you can choose to enable it under *Settings - API*.

<figure><img src="/files/uuRnHljsGqBhYnbQACvA" alt=""><figcaption></figcaption></figure>

### How do I find my app's Swagger file?

An URL is automatically generated whenever the file is available:

`https://appname.bubbleapps.io/api/1.1/meta/swagger.json`\
\
or if you are connected to a domain:\
\
`https://yourdomain.com/api/1.1/meta/swagger.json`

### Additional resources

<details>

<summary>Frequently asked questions about Swagger</summary>

#### Isn't it risky to expose all that information about my API?

To answer that question, it's first important to emphasize that *hiding* information about your apps's API does not mean it's secure: obfuscation is not security. So while the Swagger file will expose your endpoints, a determined hacker would be able to reconstruct them anyway. Security is done using authorization and Privacy Rules, not by trying to hide information about the API.

#### Can I make changes to the Swagger API documentation?

Yes and no: you can't make direct edits to the file, but the file will instantly reflect any relevant changes that you make to your app's settings and structure. You don't need to keep track of these changes yourself.

#### Are there separate files for the development and live version of my app?

Yes, there are separate URLs and files for the two different versions. Remember to point the external application to the correct file. Also, keep in mind that changes you make in your app's development version are not reflected in the live Swagger file until the app is deployed.

You can read more about the Swagger Specification standard [here](http://swagger.io/specification/).

</details>

<details>

<summary>What does the Swagger file look like?</summary>

The Swagger file is dynamic in the way that it will look different based on how your application is set up. The example below can give you an idea of the basic structure. In this example, both the Data API and the Workflow API are activated:

```json
{
    "swagger": "2.0",
    "info": {
        "title": "my-bubble-application",
        "version": "1.0.0",
        "contact": {
            "email": "my-bubble-application-no-reply@bubbleapps.io"
        }
    },
    "host": "my-bubble-application.bubbleapps.io",
    "basePath": "/version-test/api/1.1",
    "schemes": [
        "https"
    ],
    "consumes": [
        "application/json"
    ],
    "paths": {
        "/obj/thing/{UniqueID}": {
            "get": {
                "description": "Retrieve a thing of type thing by unique ID",
                "tags": [
                    "Data"
                ],
                "parameters": [
                    {
                        "name": "UniqueID",
                        "in": "path",
                        "description": "Unique ID of the thing to retrieve",
                        "type": "string",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Retrieved thing",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "response": {
                                    "$ref": "#/definitions/thing"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Database retrieval failure",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "status": {
                                    "type": "string",
                                    "description": "Error code"
                                },
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Permission denied",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Not found",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Wrong method",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "429": {
                        "description": "Too many requests",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal bug. Please file a bug report at bubble.io/support/report with the request that triggers this bug",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "code": {
                                    "type": "string",
                                    "description": "Error code"
                                },
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "503": {
                        "description": "Service Unavailable",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    }
                }
            },
            "patch": {
                "description": "Modifies a thing of type thing by unique ID",
                "tags": [
                    "Data"
                ],
                "parameters": [
                    {
                        "name": "UniqueID",
                        "in": "path",
                        "description": "Unique ID of the thing to modify",
                        "type": "string",
                        "required": true
                    },
                    {
                        "name": "thing request body",
                        "in": "body",
                        "description": "Body of the PATCH request",
                        "schema": {
                            "$ref": "#/definitions/thingBody"
                        }
                    }
                ],
                "responses": {
                    "204": {
                        "description": "Modified thing"
                    },
                    "400": {
                        "description": "Database retrieval failure",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "status": {
                                    "type": "string",
                                    "description": "Error code"
                                },
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Permission denied",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Not found",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Wrong method",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "429": {
                        "description": "Too many requests",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal bug. Please file a bug report at bubble.io/support/report with the request that triggers this bug",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "code": {
                                    "type": "string",
                                    "description": "Error code"
                                },
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "503": {
                        "description": "Service Unavailable",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    }
                }
            },
            "put": {
                "description": "Replaces a thing of type thing by unique ID",
                "tags": [
                    "Data"
                ],
                "parameters": [
                    {
                        "name": "UniqueID",
                        "in": "path",
                        "description": "Unique ID of the thing to replace",
                        "type": "string",
                        "required": true
                    },
                    {
                        "name": "thing request body",
                        "in": "body",
                        "description": "Body of the PUT request",
                        "schema": {
                            "$ref": "#/definitions/thingBody"
                        }
                    }
                ],
                "responses": {
                    "204": {
                        "description": "Replaced thing"
                    },
                    "400": {
                        "description": "Database retrieval failure",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "status": {
                                    "type": "string",
                                    "description": "Error code"
                                },
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Permission denied",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Not found",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Wrong method",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "429": {
                        "description": "Too many requests",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal bug. Please file a bug report at bubble.io/support/report with the request that triggers this bug",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "code": {
                                    "type": "string",
                                    "description": "Error code"
                                },
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "503": {
                        "description": "Service Unavailable",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    }
                }
            },
            "delete": {
                "description": "Deletes a thing of type thing by unique ID",
                "tags": [
                    "Data"
                ],
                "parameters": [
                    {
                        "name": "UniqueID",
                        "in": "path",
                        "description": "Unique ID of the thing to delete",
                        "type": "string",
                        "required": true
                    }
                ],
                "responses": {
                    "204": {
                        "description": "Replaced thing"
                    },
                    "400": {
                        "description": "Database retrieval failure",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "status": {
                                    "type": "string",
                                    "description": "Error code"
                                },
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Permission denied",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Not found",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Wrong method",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "429": {
                        "description": "Too many requests",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal bug. Please file a bug report at bubble.io/support/report with the request that triggers this bug",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "code": {
                                    "type": "string",
                                    "description": "Error code"
                                },
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "503": {
                        "description": "Service Unavailable",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/obj/thing": {
            "get": {
                "description": "Retrieve a list of things of type thing with some optional search constraints. Retrieves 100 items at most at once.",
                "tags": [
                    "Data"
                ],
                "parameters": [
                    {
                        "name": "limit",
                        "in": "query",
                        "description": "Number of items to fetch (maximum is 100)",
                        "type": "integer",
                        "format": "int32",
                        "default": 50
                    },
                    {
                        "name": "cursor",
                        "in": "query",
                        "description": "Position to start from in the list",
                        "type": "integer",
                        "format": "int32",
                        "default": 0
                    },
                    {
                        "name": "sort_field",
                        "in": "query",
                        "description": "Field to sort the list on",
                        "type": "string"
                    },
                    {
                        "name": "descending",
                        "in": "query",
                        "description": "Sorting type: descending or ascending",
                        "type": "boolean"
                    },
                    {
                        "name": "constraints",
                        "in": "query",
                        "description": "Search constraints, stringified array as described [here](https://manual.bubble.io/core-resources/api/data-api#search-constraints)",
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Retrieved list of things",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "response": {
                                    "type": "object",
                                    "properties": {
                                        "results": {
                                            "type": "array",
                                            "items": {
                                                "$ref": "#/definitions/thing"
                                            }
                                        },
                                        "cursor": {
                                            "type": "number",
                                            "format": "float",
                                            "description": "Rank of the first item in the list"
                                        },
                                        "count": {
                                            "type": "number",
                                            "format": "float",
                                            "description": "Number of items in the current response. It is the minimum between the actual length of the list and the sent limit (or 100 if you did not specify a limit)."
                                        },
                                        "remaining": {
                                            "type": "number",
                                            "format": "float",
                                            "description": "Number of remaining items after the current response. Useful to fetch more items."
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Database retrieval failure",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "status": {
                                    "type": "string",
                                    "description": "Error code"
                                },
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Permission denied",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Not found",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Wrong method",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "429": {
                        "description": "Too many requests",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal bug. Please file a bug report at bubble.io/support/report with the request that triggers this bug",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "code": {
                                    "type": "string",
                                    "description": "Error code"
                                },
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "503": {
                        "description": "Service Unavailable",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "description": "Create a new thing of type thing",
                "tags": [
                    "Data"
                ],
                "parameters": [
                    {
                        "name": "thing request body",
                        "in": "body",
                        "description": "Body of the POST request",
                        "schema": {
                            "$ref": "#/definitions/thingBody"
                        }
                    }
                ],
                "responses": {
                    "201": {
                        "description": "Created one thing of type thing",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "status": {
                                    "type": "string",
                                    "description": "Success status of the operation"
                                },
                                "id": {
                                    "type": "string",
                                    "description": "Unique id of the newly created object"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Database retrieval failure",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "status": {
                                    "type": "string",
                                    "description": "Error code"
                                },
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Permission denied",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Not found",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Wrong method",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "429": {
                        "description": "Too many requests",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal bug. Please file a bug report at bubble.io/support/report with the request that triggers this bug",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "code": {
                                    "type": "string",
                                    "description": "Error code"
                                },
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    },
                    "503": {
                        "description": "Service Unavailable",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "message": {
                                    "type": "string",
                                    "description": "Error message for the operation"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "thing": {
            "type": "object",
            "properties": {
                "Score": {
                    "type": "number",
                    "format": "float",
                    "description": "'Score' field of the current Thing"
                },
                "Created Date": {
                    "type": "string",
                    "format": "date-time",
                    "description": "'Created Date' field of the current Thing"
                },
                "Modified Date": {
                    "type": "string",
                    "format": "date-time",
                    "description": "'Modified Date' field of the current Thing"
                },
                "Created By": {
                    "type": "string",
                    "description": "'Created By' field of the current Thing ('user' represented by a unique ID)"
                },
                "_id": {
                    "type": "string",
                    "description": "'unique ID' field of the current Thing"
                },
                "Slug": {
                    "type": "string",
                    "description": "'Slug' field of the current Thing"
                }
            }
        },
        "thingBody": {
            "type": "object",
            "properties": {
                "Score": {
                    "type": "number",
                    "format": "float",
                    "description": "'Score' field of the current Thing"
                }
            }
        }
    },
    "tags": [
        {
            "name": "Workflow",
            "description": "Use this to trigger a workflow"
        },
        {
            "name": "Data",
            "description": "Use this to fetch, modify and delete data"
        }
    ],
    "securityDefinitions": {
        "api_token": {
            "type": "apiKey",
            "name": "api_token",
            "in": "query"
        }
    },
    "security": [
        {
            "api_token": []
        }
    ]
}
```

</details>

[^1]: REST, or Representational State Transfer, is not actually a protocol, but more of a set of guidelines that define how a client and server should interact with each other.\
    \
    Article: [What is a RESTful API?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api)

[^2]: The client is the one who initiates an API request, as opposed to the server who is the one to receive the request.

[^3]: The server is the one who receives an API request, as opposed to the client who is the one to send the request.

[^4]: Privacy Rules are the settings that you apply to each Data Type in your database to control who has access to read and make changes to that data.
