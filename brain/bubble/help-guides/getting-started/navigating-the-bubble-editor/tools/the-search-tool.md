# The search tool
> Source: https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tools/the-search-tool · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="info" %}
This page explores using the *Search tool*, which lets you search for objects in the Bubble editor. Not to be confused with *Do a search for,* which is used to perform database searches in your app. You'll find more information about that feature in the article below:

Article: [Finding data](/help-guides/data/the-database/finding-data)
{% endhint %}

The search tool lets you search for a range of different objects in the Bubble editor, such as elements, data types, and actions.

{% embed url="<https://www.youtube.com/watch?v=ks6WkQ--ESY>" %}

## Accessing the search tool

The search tool is a part of Bubble's toolbar and is accessed by clicking the magnifier symbol.

<figure><img src="/files/iBlpAjFOYkE2lFgYMfkw" alt=""><figcaption></figcaption></figure>

## Search by type

By specifying the type of object you want to search for, Bubble offers filters specifically for that type.

For example, if you want to search for a specific type of *action*, you can select *Action type* in the *Search by* field. Bubble will then show you a list of the different action types available.

<figure><img src="/files/t23GkPWoqPcUuLK8hgAH" alt=""><figcaption><p>By setting the <em>Search by</em> to a specific type, Bubble offers filters that match that type.</p></figcaption></figure>

Clicking on any result in the search tool will take you directly to that part of the editor. In the example above, we're searching for an *action*, and clicking a result will take you directly to that action in the workflow tab.

## Contains text

The *Contains text* tool lets you search for text inside of the different types you are looking for. This option is fairly flexible, as it broadens the search to include text from sub-objects as well as the main object.

For instance, let's say you have a workflow that consists of an event and one action. The event is a button-click, and the action makes changes to a thing. We've saved the label *Save average score* on the action.

<figure><img src="/files/7FnZJRjdvnrYYhwui5tg" alt=""><figcaption></figcaption></figure>

In this example, we have:

1. Set the *Search by* field to *Event type*
2. Selected *An element is clicked* as the event type
3. Entered the string *average* in the *Contains text* field

As you can see, the search tool returns the event we where looking for, even though the event itself doesn't contain the string *average*. That string is saved on an action *inside* of the workflow. In this way, the search tool will not only return results from event names or descriptions but also delve into the actions within those workflows.

## Searches and performance

When you're working in a big app, the search tool can potentially have a lot of data to search through and can start to slow down. You will usually get a result a lot faster if you narrow down the search to the current page
