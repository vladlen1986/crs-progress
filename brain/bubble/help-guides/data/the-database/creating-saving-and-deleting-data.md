# Creating, saving and deleting data
> Source: https://manual.bubble.io/help-guides/data/the-database/creating-saving-and-deleting-data · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This article covers how to work with the data in your database by creating, changing and deleting things

Bubble comes with a range of different ways to work with the data in the database to:

* Create new things[^1]
* Make changes to existing things
* Deleting things

Manipulating data in the database is done in three different ways:

* You can set up [**workflows**](#user-content-fn-2)[^2] that trigger on specific events, such as the user clicking a *Save changes* button
* You can use [**auto-binding**](#user-content-fn-3)[^3] to save changes in the database every time the user provides some input to an [input field](#user-content-fn-4)[^4]
* You can edit data directly in the database using the [**database editor**](#user-content-fn-5)[^5]**.** This option is only available to users who have that access in the Bubble editor

## Workflows

A workflow is a collection of actions that run in sequence whenever an *event* happens. You can choose between many different types of events, such as a button click, an input field being updated or when a specific condition is true.

<figure><img src="/files/hSA6ohISkg2sxudIaUFe" alt=""><figcaption></figcaption></figure>

### Actions

There are few different actions that make changes to the database. You can click the links below to see the core reference entry for that action:

* [Create a new thing](https://manual.bubble.io/help-guides/data/the-database/pages/-MTujs88N9W-2FUmQGag#create-a-new-thing...): creates a new record of a specific data type and optionally saves information in the fields of that data type
* [Make changes to a thing](https://manual.bubble.io/help-guides/data/the-database/pages/-MTujs88N9W-2FUmQGag#make-changes-to-thing...): saves new information to a thing, replacing whatever was in the field before
  * [Make changes to a list of things](https://manual.bubble.io/help-guides/data/the-database/pages/-MTujs88N9W-2FUmQGag#make-changes-to-a-list-of-things...): same as above, but works on multiple things at once.
* [Make changes to the current user](/core-resources/actions/account#make-changes-to-current-user): the same as above, but works directly on the user that started the workflow
* [Delete a thing](https://manual.bubble.io/help-guides/data/the-database/pages/-MTujs88N9W-2FUmQGag#delete-thing...): deletes a thing from the database
  * [Delete a list of things](https://manual.bubble.io/help-guides/data/the-database/pages/-MTujs88N9W-2FUmQGag#delete-a-list-of-things...): same as above, but for multiple records
* [Copy a list of things](https://manual.bubble.io/help-guides/data/the-database/pages/-MTujs88N9W-2FUmQGag#delete-a-list-of-things...): creates an identical copy of a list of existing thing with a new unique ID and updated *Created date* and *Modified date* fields. You can copy up to 50 things in one operation.

By combining these actions in various ways, you can work with new and existing data in a flexible manner, and even include additional actions that are related or unrelated to the database.

### Example

Let's say you have set up a form that lets a user edit their own profile. In that case we would have some different input fields that let the user provide information. We could then have a button that triggers the workflow:

<figure><img src="/files/GOqtYH5xMz7y4HAfa4ZE" alt=""><figcaption><p>In this example, we have a list of input fields where the user can provide some information and then click the button element to save those changes. Click the image to see a bigger version.</p></figcaption></figure>

The setup above would mean that no changes are saved to the database until the user actually clicks the button.

{% hint style="warning" %}
Note that some information, like email and password, has to be changed using a different action from the *Make changes to thing.* Because of the sensitive nature of user credentials, it's necessary to handle them differently to ensure their security and protect user privacy.\
\
Article: [User accounts](/help-guides/data/user-accounts)
{% endhint %}

<figure><img src="/files/35pVl4tBLsEOBLFHZ4oc" alt=""><figcaption><p>Here we are combining the <em>An element is clicked</em> event to trigger the <em>Make changes to the current user</em> action. Together these two steps make up the workflow.</p></figcaption></figure>

Using workflows let you set up additional actions after the first one to perform other relevant tasks. For example, we could use the [*Alert* element](#user-content-fn-6)[^6] to display a message that the operation was successful:

<figure><img src="/files/xJAXyyFvAI1pnp9N6drY" alt=""><figcaption><p>In this example we're setting up an additional step to show a message to our users that the changes have been saved. Note that there needs to be an <em>Alert</em> element on the page for this action to become available.</p></figcaption></figure>

As we can see in this example, workflows are useful when you want the user to be able to decide *when* to save the changes, and if you need to chain more than one action in the workflow.

## Auto-binding

Auto-binding means to bind an input element to a specific field on a data type. When this is set up, Bubble will automatically save any changes made in that element to the database. This means that you don't need to set up any actions to make the changes.

Auto-binding is connected to a field, meaning that the data format of the input element and the data field must match: for example, a field containing a date must be connected to an input element that expects a date from the user.

Also, auto-binding will only work if the parent of the input element has a [data type loaded into it](#user-content-fn-7)[^7] and it cannot create new things: only write to things that already exists.

<figure><img src="/files/YefuT3NtxdWUz5yQAXYa" alt=""><figcaption><p>Auto-binding is set up in the element property inspector. By checking the <em>Enable auto-binding on parent element's thing</em> you can select what field to modify and optionally to show an alert each time the operation is succssful.</p></figcaption></figure>

In the example above we have set up a [text input element](#user-content-fn-8)[^8] that automatically saves the input to the field *Name* on the user. The user is [loaded into the parent](#user-content-fn-7)[^7], which either a [container element](#user-content-fn-9)[^9] or [the page](#user-content-fn-10)[^10] itself.

The data is saved whenever the element loses focus, meaning that the user has clicked or tabbed away from the input field. Bubble will display the loading bar for a brief time to show the user that the data is being saved.

{% hint style="warning" %}
**Note:** Auto-binding on an input will run immediately, rather than waiting for the "next step" when using the step-by-step feature in the debugger.
{% endhint %}

<details>

<summary>Video lessons</summary>

* [Instantly modify data with auto-binding](https://youtu.be/MamNYJmZjVY)

</details>

### Showing an alert on success

When auto-binding is active you can show an alert to notify the user that it was successful. To use this feature, you need to first place an alert element on the page. Checking the *Show an alert on success* lets you select which Alert element to use and what message to show.

<figure><img src="/files/7GiuhVHoWgopDEkrCSvP" alt=""><figcaption></figcaption></figure>

In the screenshot above you see we have created an alert element and checked the *Position the alert at the top* box to make sure it's displayed as a full-width bar at the top of the page.

<figure><img src="/files/xnJv8EvqsPljGSJGZC0q" alt=""><figcaption></figcaption></figure>

On the input that has auto-binding activated we pick the alert element we just created. We also created a custom alert message that coincides with the field that was changed.

## Comparing workflows and auto-binding

There are some key differences when choosing to work with workflows or auto-binding:

### UX

The first is simply how it affects the user experience. In some forms it makes sense to let users review their information and not save anything until they click a button. In other cases it's more efficient to save the information as soon as the field has been edited. It's up to you as the developer to decide what's best in each case.

### Security

Bubble handles security on actions and auto-bind a bit differently:

#### Workflows

Workflows are not affected by [privacy rules](#user-content-fn-11)[^11] and need to have their own conditional expressions set up to control who can do what. As an example, in the action below we have set up an expression that dictates that a user can only edit a profile if it's his own:

<figure><img src="/files/jgSNWKvDoiYMBCgdmx9b" alt=""><figcaption><p>The expression above will check that the user being edited is the current user. This ensure that users can only save changes to their own profile.</p></figcaption></figure>

#### Auto-binding

Auto-binding has a dedicated privacy rule which dictates under what circumstances changes to the field will be saved. The field will still be editable, but when it loses focus it will generate an [error message](#user-content-fn-12)[^12] if the privacy rules doesn't allow for the user to save changes via auto-binding.

<figure><img src="/files/exoSjlXXlNQc6JjTPjMa" alt=""><figcaption></figcaption></figure>

In the screenshot above we have set up a privacy rule that allows the *Name* field to be edited *if* the user being edited is the same as the current user. If someone else tries to edit this user with auto-binding, it will generate an error message.

### Performance

Workflows and auto-bind also has a slight difference in how they behave from a performance perspective:

* **Workflows** sends all the changes that need to be made in one big chunk to the server. This means you will have *fewer* slowdowns, but the one you have may be longer, depending on how much data is transferred
* **Auto-binding** sends the updated information to the server immediately when a field is edited. This means you will have more, but possibly shorter data transfers

There's no right or wrong answer to what the right approach is. Also, it's important to note that the difference can be very small, often negligible. While the difference *is* there, it's important to weigh the pros and cons in terms of the total user experience to decide what method is best.

## The database editor

Bubble also lets you edit data directly in the built-in database editor. This works both for the Development database and the Live database.

You access the database editor by going to the *Data – App data* tab and selecting the data type you want to edit. You can search for specific things and edit them by clicking the edit icon.

<figure><img src="/files/FbBiFNaZ460YL5pMNh9n" alt=""><figcaption><p>Clicking the pencil icon next to a thing lets you make changes to it.</p></figcaption></figure>

Editing directly in the database is useful when you need to make a quick update, but as a long-term solution we recommend setting up your own forms to edit data.

<details>

<summary>Video lessons</summary>

* [The data tab](https://youtu.be/z0L8vFsCwkk)

</details>

## FAQ

#### If I use auto-binding, can I still run additional actions when something is saved?

Yes. You can set up a workflow using the *An input's value has changed* event and place additional actions there. It's worth noting that the auto-bind operation may or may not have finished in time for the action to register the change. In other words, if any of the actions in that workflow rely on the data having been saved to the database, you may want to save it in a workflow instead of auto-binding. That way you can ensure that the process has completed by using the *Result of step X* data source.

#### Can I create new things with auto-bind?

Auto-bind only works on existing things, and cannot create new ones. If you try to write something in a container that has no data loaded, the operation will fail without showing any errors.

## Other ways to learn

<details>

<summary><mark style="color:blue;">Video lessons</mark></summary>

* [The data tab](https://youtu.be/z0L8vFsCwkk)
* [Instantly modify data with autobinding](https://youtu.be/MamNYJmZjVY)

</details>

[^1]: A *thing* is an individual record in the database, such as a specific *user*.

[^2]: A workflow is a chain of one or more *actions* that are executed by an *event.*\
    \
    For example, the user clicking a button can trigger actions that save some changes in the database, and then show a confirmation message.

[^3]: *Auto-binding* is a setting that you can set on an input field. Whenever the data in that field changes and the field loses focus, Bubble will automatically save the changes to a specific field in the database.\
    \
    For example, if a user is looking at a form where they can edit their user profile data, an auto-bind input field lets the user type in a new name, and it will be saved immediately.\
    \
    Optionally, you can show a confirmation message when this happens.

[^4]: An *input element* is any kind of element that accepts input from the user, such as text, numbers, dates and addresses.\
    \
    You can then use the information that the user provide. For example, you can save it to the database for permanent storage.\
    \
    Article: [Input forms](/help-guides/design/elements/web-app/input-forms)\
    Reference: [Input forms](/core-resources/elements/input-forms)

[^5]: The database editor lets you as an app developer make changes directly in the database without having to set up any forms or workflows.\
    \
    You'll find the database editor in the *Data* tab and going to *App data.*

[^6]: The *Alert element* lets you flash a message to your users for a brief period of time, and is useful to show notifications, warnings, welcome messages and other stuff that you don't need to stay on the page for long.

    Reference: [The alert element](/core-resources/elements/visual-elements#alert)\
    Video: [How to use the alert element](https://www.youtube.com/watch?v=Die7FRWEsbY\&embeds_euri=https%3A%2F%2Fcdn.iframe.ly%2F\&feature=emb_imp_woyt)

[^7]: Container elements such as group can have a database thing loaded into them. This way, each child element can reference that data to display data, auto-bind input elements and in workflows.\
    \
    Article: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)\
    Article section: [Loading data into containers](/help-guides/design/elements/web-app/containers#loading-data-into-containers)

[^8]: The *text input element* accepts text and numbers in different formats from the user.\
    \
    Article section: [Text input elements](/help-guides/design/elements/web-app/input-forms#text-and-numbers)

[^9]: Containers are used to contain elements and control how they behave on the page. The most common container element is the *group*.\
    \
    Article: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)\
    Article series: [Containers](/help-guides/design/elements/web-app/containers)

[^10]: The page is the top level of the element hierarchy and contains all other elements.\
    \
    Article: [The element hierarchy](/help-guides/design/elements/the-element-hierarchy)\
    Article: [The page](/help-guides/design/elements/web-app/the-page)

[^11]: Privacy Rules let you define database rules to prevent users from seeing or modifying data they should not have access to. They are applied on the server-side.\
    \
    Article: [Securing data with Privacy Rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

[^12]: The default error message is "Sorry, you do not have permission to modify this."\
    \
    You can modify this text string in your app's *Application texts and messages* in the *Settings - Language* tab by locating the string called NO\_PERMISSION.
