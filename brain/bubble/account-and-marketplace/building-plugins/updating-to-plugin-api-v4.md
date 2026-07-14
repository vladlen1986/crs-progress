# Updating to Plugin API v4
> Source: https://manual.bubble.io/account-and-marketplace/building-plugins/updating-to-plugin-api-v4 · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This documentation covers how to update your server-side actions to be compatible with plugin API v4, which runs on Node 18.

Node 18 removes support for the Fibers extension, which allowed the existing version of the server-side actions API to expose functions that returned results directly, rather than as Promises. Consequently, some API functions will change in a non-backwards-compatible way.

{% hint style="warning" %}
If your plugin uses any server-side actions from the versions 3 and below, you will have to manually update your plugin to be compatible with the updated version.
{% endhint %}

This document explains in detail what the plugin API looks like and how to update plugins on the plugin API versions 3 and below to work with the updated plugin API. In most cases, the necessary changes will be straightforward.

<details>

<summary>What's the difference between the Fibers extension and Promises?</summary>

Fibers and Promises have two different approaches to handling asynchronous operations.

**The Fibers extension (old)** lets you write asynchronous code in a more synchronous-looking way. By using Fibers, you can pause and resume the execution of your code at certain points, effectively making it appear as if the asynchronous tasks are running synchronously. This can make the code easier to read and understand, as it resembles typical synchronous code flow.

**Promises (new)**, on the other hand, are a native JavaScript feature for managing asynchronous operations. They represent the eventual completion (or failure) of an asynchronous operation and its resulting value. Promises provide a more standardized approach to handling asynchronous tasks, allowing you to chain operations, handle errors, and improve the overall structure of your code.

</details>

## Changes

| Function Name                  | Old API                 | New API                          |
| ------------------------------ | ----------------------- | -------------------------------- |
| context.request                | context.request         | context.v3.request               |
| context.async                  | context.async           | context.v3.async                 |
| .get method on Bubble Things   | .get method             | .get method (returns promise)    |
| .get method on Bubble Lists    | .get method             | .get method (returns promise)    |
| .length method on Bubble Lists | .length method          | .length method (returns promise) |
| get\_object\_from\_id          | get\_object\_from\_id   | context.getThingById             |
| get\_objects\_from\_ids        | get\_objects\_from\_ids | context.getThingsById            |

These functions now return a promise for their original return value (see[ JavaScript documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) on promises). If you have a server-side action that uses any of these functions in your plugin, the action will break when you update. See below for a guide on how to fix this.

## Step-by-step guide

* Prepend async to any top-level function that calls context.request, and await just before context.request. Change context.request to context.v3.request.
  * Also, consider switching over to using node-fetch, which has a more modern, standardized API.
* Prepend async to any top-level function that calls context.async, and await just before context.async. Change context.async to context.v3.async.
  * Also, consider switching over to using util.promisify, which is a more modern syntax.
* Prepend async to any top-level function that calls the .get method on Bubble Things and await just before .get.
* Prepend async to any top-level function that calls the .get method on Bubble Lists and await just before .get.
* Prepend async to any top-level function that calls the .length method on Bubble Lists and await just before .length.
* Finally, switch your Bubble Plugin API Version to 4 in the “Dependencies” dropdown of the “Shared” tab

## Examples

Here are a few examples of how to update the run\_server function of your plugin’s server-side actions.

### context.request: Versions 3 and below **plugin API**

```javascript
function(properties, context) {
    // Send a request to the cat API synchronously
    const response = context.request({
        url: 'https://api.thecatapi.com/v1/images/search',
        json: true
    })
const cat_image = response.body[0].url
    return { cat_image }
}
```

### context.request: Updated plugin API

```javascript
async function(properties, context) {
    // Send a request to the cat API asynchronously, with promises
    const response = await context.v3.request({
        url: 'https://api.thecatapi.com/v1/images/search',
        json: true
    })
const cat_image = response.body[0].url
    return { cat_image }
}

function(properties, context) {
  let list_length = properties.my_list.length()
  return { list_length }
}
```

### .length(): Current plugin API

```javascript
function(properties, context) {
  let list_length = properties.my_list.length()
  return { list_length }
}
```

### .length(): Updated plugin API

```javascript
async function(properties, context) {
  let list_length = await properties.my_list.length()
  return { list_length }
}
```

### Using node-fetch instead of context.request

Here’s an example of how to update your code using context.request to use node-fetch, based on the same starting point as the earlier context.request example.

```javascript
async function(properties, context) {
    // Use the node-fetch module to make an HTTP request
    const response = await fetch('https://api.thecatapi.com/v1/images/search')
    const body = await response.json()
    const cat_image = body[0].url
    return { cat_image }
}
```

### Using promises instead of context.async

In the **old** version of the API, plugin authors frequently had to use context.async to interoperate with modern, Promise-using JS libraries. For instance, to use the weathered npm package to fetch a list of real-time weather warnings, you might write code like this:

```javascript
function(properties, context) {
    const { Client } = require('weathered')
const client = new Client()
    const region = properties.region || 'NY'
    
    const alerts = context.async((cb) => {
        client.getAlerts(true, { region })
            .then((result) => cb(null, result))
         .catch((error) => cb(error))
    })
    
    const weather_alerts = alerts.features.map(f => f.properties.description)
    return { weather_alerts }
}
```

In the **new** API, which is Promise-based already, you don’t need to jump through this hoop; you can await the result of the call directly.

```javascript
async function(properties, context) {
    const { Client } = require('weathered')
const client = new Client()
    const region = properties.region || 'NY'
    
    const alerts = await client.getAlerts(true, { region })
   
    const weather_alerts = alerts.features.map(f => f.properties.description)
    return { weather_alerts }
}
```

### Using utils.promisify instead of context.async

But if the code you’re trying to wait for with context.async is callback-based rather than promise-based, you'll still need some sort of wrapper.

Here’s a (somewhat contrived) example of using the callback-based fs.stat API from Node to inspect the filesystem of the lambda your action is running on:

```javascript
function(properties, context) {
    const fs = require('node:fs')
    const { inspect } = require('node:util')
    
const stats = context.async((cb) => {
        fs.stat('/', cb)
    })
    return { stats: inspect(stats) }
}
```

Instead of using context.async, you could also wrap fs.stat with node’s built in promisify utility to make it return a promise, then await that promise:

```javascript
async function(properties, context) {
    const fs = require('node:fs')
    const { inspect, promisify } = require('node:util')
    
    const stats = await promisify(fs.stat)('/')
    return { stats: inspect(stats) }
}
```

## Change log

Here are the changes that we will make to the plugin API:

* context.request is being deprecated (this means that we plan to eventually stop supporting it), moved to context.v3.request, and will now return a promise. We recommend that plugin authors use the globally-available node-fetch instead.
* context.async is also being deprecated, moved to context.v3.async, and will now return a promise. We recommend that plugin authors use promisify from Node’s built-in util module instead.
* The .get method available on Bubble Things now returns a promise.
* The .get method available on Bubble Lists now returns a promise.
* The .length method available on Bubble Lists now returns a promise.
* We are adding a utility method on Bubble Things
  * getAll(): returns a promise for an object with all fields of the Thing
* We are adding a new field on Bubble Things:
  * id: the Thing’s ID
* Lists now also implement the AsyncIterable interface, so you can use for (await ... of ...) loop syntax to loop over the list.
* the single\_api and list\_api fields are still present, but no longer encouraged (we will also remove official documentation for these fields). In their place are two new context methods: isBubbleThing and isBubbleList.
* We are adding official support for two previously usable, but undocumented functions: getThingById and getThingsById. We added these functions to the context object to be more consistent with the rest of API. These functions also now return promises.

See below for more detail.

<pre class="language-javascript"><code class="lang-javascript">export type Primitive = string | number | boolean |  Date | null | undefined

/** Any value that can be passed as a property to an action or stored in the DB. */
export type BubbleValue = Primitive | Primitive[] | BubbleThing | BubbleList

/** Fields present on any Bubble data type. */
export interface ThingFields {
    // These fields are guaranteed to be present on any database Thing.
    'Slug'?: string
    'Created Date': Date
    'Modified Date': Date

    // Other fields might also be present, depending on the data type.
    [_: string]: BubbleValue
}

/** Additional fields present on the User data type. */
export interface UserFields extends ThingFields {
    'email': string
    'logged_in': boolean
}

/**
 * An object representing a single Thing from the Bubble app's database.
 */
export interface BubbleThing {
    /** Returns the names of the fields on the Thing. */
    listProperties(): string[]

    // CHANGED - now returns a promise
    /** Returns the value stored in a particular field of this Thing. */
    get(propertyName: string): Promise&#x3C;BubbleValue>

    // NEW
    /** Returns an object with all the thing's fields and their values. */
    getAll(): Promise&#x3C;Record&#x3C;string, BubbleValue>>

    // NEW
    /** Field that contains the unique ID of this Thing. */
<strong>    readonly id: string
</strong>
    // for historical interest - maybe de-document these
    single_api: true
    list_api: false
}

/**
 * An object representing a list of Things from the Bubble app's database.
 * 
 * As lists may be quite large, the data contained in the list isn't all
 * loaded up front. Therefore, methods for accessing data within the list
 * are generally asynchronous.
 */
export interface BubbleList {
    // CHANGED - now returns a promise
    /** The number of items in this BubbleList. */
    length(): Promise&#x3C;number>

    // CHANGED - now returns a promise
    /** Fetch a portion of a BubbleList as an array. */
    get(start: number, length: number): Promise&#x3C;BubbleThing[]>

    // NEW
    /** Allows you to use a BubbleList with the `for (await x of list)` syntax */
    [Symbol.asyncIterator](): AsyncIterator&#x3C;BubbleThing>

    // for historical interest - maybe de-document these
    single_api: false
    list_api: true
}

/** An object containing utility functions available to server-side actions. */
export interface Context {
    /** The current user who initiated the workflow that's running this action. */
    currentUser: BubbleThing

    /** The timezone the workflow is running in. */
    userTimezone: string

    /** An object containing any keys set for this plugin in the app. */
    keys: Record&#x3C;string, string>

    // NEW
    /** Check if a JS value is a BubbleThing object. */
    isBubbleThing(x: unknown): boolean

    // NEW
    /** Check if a JS value is a BubbleList object. */
    isBubbleList(x: unknown): boolean

    // NEW - was secret global before
    /** Fetch a BubbleThing object for a given unique ID. */
    getThingById(id: string): Promise&#x3C;BubbleThing | null>

    // NEW - was secret global before
    /**
     * Fetch the corresponding BubbleThing objects for each ID in an array.
     * Results will be returned in the same order as requested, with `null`
     * in place of any IDs with no corresponding Thing.
     */
    getThingsById(ids: string[]): Promise&#x3C;Array&#x3C;BubbleThing | null>>

    // NEW/CHANGED - these used to be top-level properties of the context
    v3: ContextDeprecatedV3
}

/** Context functions that are no longer recommended, but are provided for backwards compatibility. */
export interface ContextDeprecatedV3 {
    // CHANGED - now returns a promise
    /**
     * See documentation for the `request` library.
     * 
     * @deprecated We recommend you use node-fetch instead.
     */
    request(...args: unknown[]): Promise&#x3C;unknown>

    // CHANGED - now returns a promise
    /**
     * Takes a node-style asynchronous function which expects to be passed a callback,
     * and turns it into a promise.
     * 
     * @deprecated We recommend you use node's built-in `util.promisify`.
     */
    'async': &#x3C;T>(fn: (callback: (err: unknown, res?: T) => void) => void) => Promise&#x3C;T>
}

declare global {
    /** Exposes node-fetch to plugins. */
    function fetch(...args: unknown[]): Promise&#x3C;unknown>
}
</code></pre>
