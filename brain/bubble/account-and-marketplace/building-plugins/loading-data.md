# Loading Data
> Source: https://manual.bubble.io/account-and-marketplace/building-plugins/loading-data · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

<details>

<summary>System hard limits</summary>

When creating plugins for Bubble, it's important to be mindful of the Bubble's hard system limits. These constraints for plugin development mirror those present in general Bubble development. The article below covers this subject:

Article: [Hard limits](/help-guides/maintaining-an-application/performance-and-scaling/hard-limits)

</details>

When accessing properties of type`Object`or`List of Objects`, it's possible to request data that hasn't yet been sent over from the Bubble web server to the user's web browser. For instance, if you have a list property called`my_list`, and you call`properties.my_list.get(0, 99)`, it will often be the case that the first 100 entries in the list haven't been fetched from the server before.

Experienced Javascript programmers will be familiar with loading data asynchronously via callback functions. Rather than take this approach, we try to handle data loading automatically behind the scenes. For the most part, you can write your code as if calls like`properties.my_list.get(0, 99)`return immediately, rather than asynchronously, even if behind the scenes we have to make a request to the server to fetch the answer.

What follows is a brief explanation of how we implement this behind the scenes. For the most part, this won't make a practical difference to you, but there are certain situations where it could lead to you seeing unexpected results if you don't understand what's actually going on.

When your code requests data that the web browser doesn't have, we do two things:

1. We immediately kick off an asynchronous request to the web server to load the data.
2. We throw a special error that terminates the execution of the function that you wrote, and informs the API that we are waiting on the data to continue.

Once the data is loaded, we then restart the execution of your function. This time, when we reach the line that requests the data, it will be available, and function execution can continue.

There are two practical consequences of this to you:

1. Functions that you expect to run once, such as an execution of an action, can actually run multiple times, as we incrementally load the data that the function requests. Similarly, the`update`function for an element will be re-run not only when one of the properties for that element changes, but when any data you request finishes loading, or subsequently changes.
2. `try...catch`statements that contain data load functions will catch the special errors we throw, which can cause this mechanism to fail to work properly.

To avoid either of these issues from causing bugs in your code, we recommend three best practices.

First, always load data at the beginning of your functions, prior to modifying any state external to the function. For instance, if you are writing an element that takes a list and renders it in the web browser, load the list items you are going to display, as well as any fields on those items, prior to modifying the DOM. We recommend this because if any of the data is not yet ready, your code won't start making changes until all the data is loaded. Conversely, if you write your function so that it loads the first few list items, displays them, then loads some more items, you might end up accidentally displaying the first few items multiple times.

Second, avoid adding asynchronous functions in your functions. For instance, do not run code inside a callback such as

```javascript
$(document).ready(function() {
    doSomething();
})
```

as this will break the dependency detection.

Third, either avoid wrapping code that calls data in a`try...catch`, or if you do need to wrap it, make sure you re-throw the special errors. You can detect these errors by checking the message property: it will be 'not ready'.

For example:

```javascript
try {
    var myData = properties.my_list.get(0, 99);
    doSomethingWith(myData);
} catch (err) {
    //Re-throw not-ready errors...
    if (err.message === 'not ready') {
       throw err;
    }
    //And handle other errors...
    myErorrHandlingLogic(err);
}
```
