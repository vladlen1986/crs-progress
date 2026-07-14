# Temporary data
> Source: https://manual.bubble.io/help-guides/data/temporary-data · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers temporary data, which is different types of variables that you can use to store data temporarily.

Sometimes, you may need to store information temporarily within your application. These temporary values act as variables and are not stored permanently in the database—they exist only as long as they are needed.

Bubble provides two types of temporary data, each with distinct properties:

## Custom states

Custom states act as temporary variables that can be stored on any element in your app, including the page itself. They can hold various types of data, including text, numbers, dates, [static data](/help-guides/data/static-data) from an [option set](/help-guides/data/static-data/option-sets), or [dynamic data from your database](/help-guides/data/the-database).

When setting up a custom state, you define its data type and specify whether it should store a single value or a list of values. Custom states can be updated through workflows, and in some cases, they can be assigned a default value. There is no limit to the number of custom states you can create.

Since custom states are temporary, they reset when the page is reloaded.

{% content-ref url="/pages/EFbhWvI7KdITWtMamUHI" %}
[Custom states](/help-guides/data/temporary-data/custom-states)
{% endcontent-ref %}

## URL parameters

URL parameters are text-based values that can be added to your app's URL to store and pass information. They allow you to specify the type of data being stored, and since they are part of the URL, they remain visible and accessible when sharing or reloading the page.

Parameters follow a [**key-value pair**](#user-content-fn-1)[^1] structure, where each parameter consists of a name (key) and its associated value. They are appended to the main URL using a question mark (`?`), and multiple parameters are separated by an ampersand (`&`).

```url
https://www.mydomain.com/page?parameter1=value1&parameter2=value2
```

In the example above , everything after the ? makes up the URL parameters. URL parameters are great for navigation, since they let your users use the browser's *back* button to go back one step.

{% content-ref url="/pages/45paecU4jIMLUMYn1R51" %}
[URL parameters](/help-guides/data/temporary-data/url-parameters)
{% endcontent-ref %}

## The difference between Custom states and URL parameters

| Custom states                                                                           | URL parameters                                                                                                                            |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| ... are reset when the page is reloaded                                                 | ... are not reset on page reload, but may disappear if you modify the URL with a workflow or the user deletes it from the URL             |
| ... are "invisible" to the user (but not encrypted or meant to hold any sensitive data) | ... are visible to the user in the browser's URL bar                                                                                      |
| ... can hold a list of values                                                           | ... one parameter can only hold a single value                                                                                            |
| ... can have a default value at page load (depending on the type of data)               | ... has to be set by a workflow from the same or another page, or be set by the user                                                      |
| ... cannot be changed by a user unless you set up workflows for it                      | ... can be edited by the user at will by making changes to the URL or using navigation gestures like clicking the browser's *back* button |

[^1]: A key value pair is a way of storing data. It consists of a *key* and a *value*.\
    \
    In the context of URL parameters, the *key* is the name of the parameter, and the *value* is the value. For example:\
    \
    ?name=john\&age=56

    In this example, the *keys* are *name* and *age*, and the values are *john* and *56*
