# Custom states
> Source: https://manual.bubble.io/help-guides/data/temporary-data/custom-states · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers custom states, that are used to store temporary variables of different kinds

Custom states are variables that you can save on any element on the page, including the page itself. They let you store data temporarily that is reset when the page is reloaded. This is useful when you need your app to remember some information that you don't need to store permanently in the database.

{% hint style="danger" %}
While custom states are not visible to the users of your app directly, they are still not a secure way to store sensitive data. Keep in mind that any information you place in a custom state, including its default value, can be read by the user of that device.
{% endhint %}

Custom states have the following properties:

* They only hold data until the page is reloaded and its reset to its default value (empty by default)
* They are hidden[^1] from the user, but can be referenced in any dynamic expression where you need them
* They are stored client-side[^2], and as such as faster than reading and writing to the database
* They can hold any kind of data, both elemental types (text, numbers, dates, etc), Option set options and custom data types. They can also hold lists of values
* Each custom state is connected to an element, and you can create as many as you need on each element, including the page itself

You can store *any* kind of Bubble data in a custom state, ranging from simple text values to a data type like a specific user, a shopping cart or anything else that you'd like your app to "remember".

Using lists of values, you can also set up custom states to keep track of multiple pieces of data. For example, you can keep track of when a user selects things in a repeating group by adding those things to the custom state's list.

## Creating custom states

Any element can have a custom state attached to it, and it's up to you to decide which element is the most appropriate to store it on. You can create as many custom states as you need on each element.

There are two ways to define a custom state.

### The *Set state of an element* action

You can create it when you use the *Set custom state* action:

<figure><img src="/files/6mqYoum5B6fubTYHrfA2" alt=""><figcaption></figcaption></figure>

1. Add the *Set state of an element* action to a workflow
2. Pick the element (the index page in the example) and then pick *Create a new custom state*.

If you have any existing custom states on that element, they will show up above the option to create a new one.

### The element inspector

You can also create one or more new custom states by using the Element Inspector:

<figure><img src="/files/AYr6qjIdqLdj7QWSmma7" alt=""><figcaption><p>You can use the Element inspector both to create new custom states and to see the ones you've already created. In the example above we already have a custom state called <em>My state</em> of type text.</p></figcaption></figure>

Click *Add a new custom state* in the right-hand window to create a new one.

Similarly to fields, a custom state needs to have a defined data type. This will enable the Bubble Editor to display the relevant options when using an element's state's value. You can set the data type to any of Bubble's built in data types, Option sets and custom data types.

<figure><img src="/files/NVfpkMoaqjzjOC2Ty3GB" alt=""><figcaption><p>Setting a data type instructs Bubble to treat the custom state in a way relevant for that type</p></figcaption></figure>

## Locating, editing and deleting a custom state

You can also use the Element Inspector to find, edit and delete existing custom states on an element. Click the information icon as shown in the animation above.

The name of a custom state is automatically updated all over your app and can safely be changed. You can also change the type of data in a custom state or delete it altogether, but both of these can generate errors in the issue tracker if it leads to workflows or expressions no longer working.

## Assigning a value to a custom state

There are two different ways of assigning a value to a custom state:

1. You can set its default value in the Element Inspector\
   This only works for static values that you can type into the *Default value* field, such as text and numbers
2. You can assign a value to a custom state using the [*Set state of an element*](#user-content-fn-3)[^3] action.

<figure><img src="/files/Q5Ru8IDiSuLnZWTH3izq" alt=""><figcaption><p>You can use the <em>Set state of an element</em> action to assign a value to a state. In the example above the type of state is <em>text</em></p></figcaption></figure>

Any time you assign a value to a state, its last value is permanently overwritten.

{% hint style="info" %}
Custom states are not automatically updated when database records are deleted. This means that if you are storing a list of things in a custom state, and one or more of those things are deleted from the database, the list will still show the same item count. The fields on the deleted data types will show up empty.\
\
You can get around this by applying a filter in any expression that counts the items in a list, such as *My element's custom state list:filtered \[Creation Date is not empty]:count.*
{% endhint %}

## Other ways to learn

<details>

<summary>Video lessons</summary>

* [How to use option sets](https://youtu.be/ydqXrIgTekE)

</details>

[^1]: The way custom states are hidden is buy obfuscation and does not make it truly inaccessible by a user.\
    \
    Keep in mind that obfuscation is not security, and you should not place any value in a custom state that you are not comfortable sharing with your app's users.

[^2]: *Client-side* means on the user's device, as opposed to on Bubble's servers.\
    \
    In the context of Custom states it means that the states are held in the memory of the user's device, and is not sent to the server.

[^3]: The *Set state of an element* action is used to assign a value to a custom state. The value must be of the same type as specified in the custom state.\
    \
    Reference: [Set state of an element](/core-resources/actions/element#set-state-of-an-element)
