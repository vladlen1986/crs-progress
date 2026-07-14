# Building Actions
> Source: https://manual.bubble.io/account-and-marketplace/building-plugins/building-actions · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

<details>

<summary>System hard limits</summary>

When creating plugins for Bubble, it's important to be mindful of the Bubble's hard system limits. These constraints for plugin development mirror those present in general Bubble development. The article below covers this subject:

Article: [Hard limits](/help-guides/maintaining-an-application/performance-and-scaling/hard-limits)

</details>

Building actions is quite similar to building elements. You add them to your plugin and test them in a similar manner, using a test app.

## Action types

Two types of actions can be built: they can be client-side or server-side.

1. Client-side actions are useful for page interactions, or send some data to analytics, convert a credit card into a token using a library, etc.
2. Server-side actions can be used to make custom calls to external services, run a matching algorithm, compute an advanced computation, etc. These actions can return some data that can be used in subsequent actions.

## Action definition

Similarly to elements, you have to define the different fields, and then use these values in your code in the `properties` object. Please refer to the [previous section](/account-and-marketplace/building-plugins/building-elements) for the different options you have access to when adding fields to an element or action.

The core of the action is the function that gets executed when a workflow hits this action. This function will be called with the `properties` and the `context` object. You can see the contextual documentation in the editor for the different objects.

Note that similarly to element functions, you should take into account that your code may be run more than once to fetch data, it is therefore recommended to always load data at the beginning of your functions, prior to modifying any state external to the function. See the next [section](/account-and-marketplace/building-plugins/loading-data) for more information.

Here is for instance how an action that sends data to Facebook Pixel looks like.

![](/files/-M5sc6Up5alrKv6HX8TR)

## Using node modules in a server side action

Functionality of server side actions can be extended by the use of node modules. To do so, select "This action uses node modules", and paste in your package.json into the box that appears below. Modules may also be listed by hand; only the "dependencies" section is used. Require your modules inside your function as you would in any other situation.

![](/files/-M5smvlKmL4odD4EcnpJ)

When your list of modules has been added or updated, Bubble will need to build a deployment package, which will be used to run your action. This process may take up to a few minutes, and can be started by clicking the link that will appear below the box.

## Notes and limitations

### File sizes

#### File inputs

Server-side plugin actions encode files using base64, which increases file size by approximately 1.25x, so try to avoid passing files that are larger than 5MBs through server-side plugin actions. File URLs are a good alternative to use instead of file inputs.

#### API call response size

There's a hard limit of 50 MB for responses to an outgoing API call made with a plugin (this includes the API Connector). Exceeding the limit will generate an error in the logs: "response too large".

### Option sets

Option sets cannot be retrieved via server-side actions. Client-side, option sets will be represented as { listProperties, get } objects (where listProperties lists all the fields on the option, and get('field') gets the value of 'field' on that option set.
