# Bulk operations
> Source: https://manual.bubble.io/help-guides/maintaining-an-application/database-maintenance/bulk-operations · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers the bulk operations, which lets you run API workflows on a list of things directly from the Bubble database editor

<details>

<summary>Bulk operations terminology</summary>

In this article, we will refer in bulk operations in two different ways:

* **Bulk operation** refers to any bulk operation performed by your app, using the methods described below.
* **Bulk operation feature** refers specifically to using the feature in the Bubble database editor.

For other terminology, please see the Bubble glossary:

Article: [Bubble glossary](/the-glossary)

</details>

{% hint style="info" %}
This article focuses on performing bulk operations by using the bulk operation feature in the Bubble database editor. If you're looking for ways to perform bulk operations in your app, we have links to relevant methods at the [bottom of the article](#bulk-operations-in-your-app).
{% endhint %}

## What are bulk operations?

In the context of the Bubble database, bulk operations are any kind of process that you apply to multiple things simultaneously or sequentially. While the *Make changes to a list of things* action is technically a bulk operation, we generally mean working on longer lists (100+ things) and sometimes more advanced processing.

Bulk operations can mean doing stuff like:

* Making changes to specific fields in a list of things
* Deleting a long list of things
* Creating a list of new things

## The bulk operation feature

{% hint style="danger" %}
**Note on emails:** the bulk operation feature cannot be used to mass send emails.
{% endhint %}

{% hint style="warning" %}
**Note:** Bulk operations are performed server-side, but the bulk operations feature relies on client-side actions that depend on your browser window staying open and active.

In other words, you need to **keep the popup open** for them to continue until the process is done.
{% endhint %}

The bulk operation feature is an in-editor operation that you can run directly from the database editor. Technically, this does the same as scheduling an API workflow, where you select an API workflow to run, and it will process the currently viewed list of things, or the things you have selected.

* The bulk feature **only supports one parameter**: the list of things you want to make changes to
* You don't need to add any events in your app (such as a button click) – it can be **executed from the Bubble editor**
* Since this is an extension of the Schedule API workflow on a list function, the processing will be done **in parallell**, as opposed to in sequence

## Using the bulk operations feature

### Building the API workflow <a href="#defining-an-api-endpoint" id="defining-an-api-endpoint"></a>

Before you can perform bulk workflows on your data, you need to build the API workflows that you are going to call.

{% hint style="info" %}
If you are not familiar with Bubble's Workflow API and how to set up API workflows, we recommend you first get to know how they work. The first link below gives an introductory guide to the Workflow API in general, and the second shows you how to set up API workflows that can be used with bulk operations.

Article: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)\
Article [API Workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows)
{% endhint %}

### Valid bulk operations feature parameters

To be valid for scheduling by the Bulk operation feature, API workflows must have a few properties in place:

**A thing parameter:** the workflow must include a parameter that requires a 'thing' of the same data type as the one you intend to perform the bulk operation on:

<figure><img src="/files/VlDh9OTpi6cJFF2oW1C8" alt=""><figcaption><p>The API Workflow must have a parameter that lets you specify a thing to run the workflow on. In the example above we're instructing Bubble to request a thing of the type <em>Product</em>.</p></figcaption></figure>

**Only set up one parameter:** when a bulk operation is called, Bubble will only fill one parameter: the thing it's currently scheduling the operation on. In other words, do not set up any other parameters.

**The thing cannot be a list:** bulk operations are scheduled one-by-one on a list of things. In other words, the parameter that asks for which thing to perform the operation on should ask for a *single* think, not a list/array.

**It does not need to be exposed as a public API Workflow:** while it will still work if you expose it, it's better to uncheck the [*Expose as a public API Workflow*](#user-content-fn-1)[^1] checkbox to make sure that it cannot be triggered from outside of your app.

### Adding actions to the API workflow

Now we have an API Workflow that accepts a single parameter: the thing that we want to run the operation on. In our example we set that thing to a custom data type called *Product*, so let's make a change to that thing. We have a [yes/no field](#user-content-fn-2)[^2] on the product called *Published* that we want to set to yes.

In our API Workflow, this is a very simple [*Make changes to a thing*](#user-content-fn-3)[^3] operation:

<figure><img src="/files/t4kVqtgXHnQ54Z9Y1MPc" alt=""><figcaption></figcaption></figure>

1. First, we add the *Make changes to a thing* action to the API Workflow
2. Then, we choose *product* as the thing we want to change. This is the parameter we set up earlier.
3. Finally, we set the *Published* field on the product to yes

## Running the bulk operation feature

Now that we have the workflow we want to run the bulk operation on, let's see how we trigger it to run.

<figure><img src="/files/JC2E4Y0m2xPUlYTyczS8" alt=""><figcaption></figcaption></figure>

1. First, we select the data type that we want to run the bulk operation feature on. In this case, we want to work with *Products*
2. Next, select the Products that you want to run the bulk operation feature on. *Trucker cap* and *Baseball cap* are ready to be published, but *Product 1* still needs some work, so let's just check to two top ones.
3. Then, we click the *Bulk* button, where we'll select with API Workflow to run on the selected things.

{% hint style="info" %}
The bulk operation feature typically make changes to a list of records. If you make a mistake when running the bulk operation feature, you can restore the data type to what it looked like before the operation by using the [*Copy and restore database*](#user-content-fn-4)[^4] feature.
{% endhint %}

We also recommend testing your API workflow in the [Development environment](#user-content-fn-5)[^5] before making changes to Live[^6].

<figure><img src="/files/QJYxwt2XKbP2fdFP9UtC" alt=""><figcaption><p>Click the image to enlarge.</p></figcaption></figure>

1. In the first dropdown, we choose what list to run the operation on. You can choose to run it on the entire current view, or the selected entries – in our case we specifically selected two entries, to let's go with that
2. In the second dropdown you will find the list of compatible API Workflows. If the Workflow does not accept the same data type as a parameter, it will not be selectable
3. The text next to point three confirms that the workflow will in this case be run on 2 entries, which is what we selected
4. Finally, we can click *Run workflow* and the operation will start. Since we are only making a small change on two entries, it should finish very quickly.

Looking again at the data in our database, we can see that the two data types we selected now have their *Published* field set to *yes*.

<figure><img src="/files/pYnGYyuY9W9Vsz3SoAcG" alt=""><figcaption><p>Click the image to enlarge.</p></figcaption></figure>

## Combining the bulk operations feature with views

*Views* let you filter the data displayed in the database editor by specific constraints, just like the *Do a search for* data source. Since bulk operations feature lets you run the operation on all records in the current view, you can combine these features to flexibly run bulk operations on things that match specific criteria, instead of manually selecting the things in the list.

To set up a new view, click the *New view* button or the pencil icon next to the data type you want to run an operation on.

## Cases

### Case 1: Using the Bulk feature in the database editor to change a list of users

In the first case, we'll make a fairly simple change to a list of Users. We're going to assume that you already have a collection of users in your app, and you want to introduce *roles* for these users, such as *admin* and *regular user*. Furthermore, we'll assume that all registered users thus far will be *regular users*, meaning that we can apply the change to all users in the database.

The roles are saved in an [option set](#user-content-fn-7)[^7] called *Roles.*

What we would to do is:

1. Search for all users without any constraints
2. Specify the role we want those users to be assigned
3. Save that value in the *Role* field (option set) saved on the User data type.

This is an operation we can run directly from the Bubble database editor using the *Bulk feature*.

* Since we want to apply it to all users, we don't need to set up any constraints. We can apply the bulk operation to *all* Users in the database.
* We only need to send one parameter (the list of Users), and can specify the *Role* option set to apply to those users in the API workflow itself, since it's the same for everyone

We'll assume you have already set up the fields and option set needed. First, let's have a look at what that API workflow needs to look like:

<figure><img src="/files/C9W8sKwbuwntKq8Z07n6" alt="" width="375"><figcaption><p>Click to enlarge the image.</p></figcaption></figure>

Let's go over the two points:

1. We've given the API workflow a fitting name, and made sure it's not exposed publicly, since we don't want to trigger this workflow from an external system
2. We've set up a parameter called *user*, and set the type to *User*

Note that point two is *not* a list. This is because the *Schedule API workflow on a list* action handles items individually. In other words, one workflow runs *per* item in the list – it doesn't make changes to the entire list in one operation (even if the workflows are executed in parallell).

Let's check out the action that makes changes to the User:

<figure><img src="/files/Rf1ECUK28prWxnsK6RPB" alt="" width="563"><figcaption></figcaption></figure>

Since all users will have the same role, we specify the value directly as a static value in the user. The data source is set to the option set *Roles*, and the value *Regular user.*

And we're done! Let's see how we would run that from the Bubble editor:

<figure><img src="/files/0UEaj2kf2p1JASVCcKiC" alt="" width="563"><figcaption></figcaption></figure>

As you can see, the Role field on all Users is empty as of now. Click the *Bulk* button in the top-right corner to start the process. This brings up the window below:

<figure><img src="/files/VFONHgBPtSsU2DSM6NdG" alt="" width="563"><figcaption><p>Click the image to enlarge.</p></figcaption></figure>

1. First, we pick the workflow that we created earlier. This is listed as a valid choice for two reasons:
   * The API workflows has only one parameter: User.
   * We are currently looking at the list of Users in the database.
2. Then, click *Run workflow*.

In this example, we had only five things to change, and the operation will normally finish in less than a couple of seconds.

### Case 2: Adding a discount to a list of Products from your app

Let's say that you are running an eCommerce store, and you have a list of a custom data type called Products that your customers can buy. We also have a list of You make the decision to discount products from a specific vendor by 25%, and you store that discount in a field on each product called *Discount.* Each Product already has a field called *Price,* that reflects the regular price of the product.

What we would need to do in that case, is:

1. Search for all Products from that Vendor
2. Specify a discount to add
3. Save that value in the *Discount* field on each of the Products found in step 1

We are going to use *Schedule API workflow on a list* to make the changes. In this example, we can't use the *Bulk* feature in the Bubble editor, for two reasons:

* We need to search for the correct Vendor in the database\
  (database views cannot specify a database thing as a filter)
* We need to send multiple parameters (the Product to change and the discount value)\
  (The Bulk feature only supports one parameter – the thing to change)

Instead of using the bulk feature, we'll set up a very simple form that accepts two parameters, as well as a button that starts the operation:

<figure><img src="/files/vLz9EC5LOsAxhZIJ4Xp3" alt=""><figcaption></figcaption></figure>

With that form set up, we can choose a Vendor from the database, specify a discount, and then click the button to start the *Schedule API workflow on a list* process. As we explored earlier, shortly after the button has been clicked (Bubble's loading bar will show), the operation starts on the Bubble server, meaning that you can close the browser tab and the operation will continue to run until it's finished. The time it takes to schedule the workflow can vary somewhat depending on the length of the list.

For the next step, we're going to set up the scheduling action when the button is pressed. Right-click the button and select *Start/Edit Workflow* in the dropdown menu or click ⌘ + K / Ctrl + K to create the event[^8] in the [workflow editor](#user-content-fn-9)[^9].

<figure><img src="/files/krHROBgZSSRXYMNqZu0b" alt="" width="563"><figcaption><p>Click the image to enlarge.</p></figcaption></figure>

Let's go over the screenshot point-by-point:

1. First, we search for the Products we want to process
2. We specify the *Vendor* selected in the dropdown as a constraint
3. The scheduled date we want to process the list: [*Current date/time*](#user-content-fn-10)[^10] makes sure we run it immediately.
4. This field specifies *what* we want to make changes to. In our case, we want to make changes to each product in the list. By setting the data source as *This product*, we specify that the changes should be applied to the individual Product currently being processed by this specific API workflow.
5. Finally, we use the *Input discount field's value* as the data source for the discount to apply

This kind of workflow can be used both in one-off scenarios, or as a standard feature in your app. As we've seen, it's quick to set up and will reliably finish even on long lists of things.

## Bulk operations in your app

If you need to set up and perform bulk operations in your app, as opposed to in the Bubble editor, there are three common methods outlined below that are used for this purpose:

<details>

<summary><mark style="color:blue;">Schedule API workflow on a list</mark> – used to schedule bulk operations in your app</summary>

The *Schedule API workflow on a list* action is a way to run an API workflow on a list of things. This means that you can apply an action to a thing in isolation. For example, if you have a list of users, you can use this action to update each user's profile, send emails, or perform other tasks for each user on the list, all in a single operation. It's a powerful tool for batch processing, allowing you to execute workflows efficiently and simultaneously on multiple data entries.

* The fastest and most workload-friendly[^11] way to do bulk operations
* The quickest and simplest way to set up in the Bubble editor
* Runs workflows in parallell
* Stable and reliable
* Can be executed directly from the Bubble editor using the *Bulk* feature
* Runs in the back-end[^12], meaning that it doesn't matter if the user closes their browser tab

Article: [Scheduling API workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/scheduling-api-workflows)\
Reference: [Schedule API workflow on a list](/core-resources/actions/custom#schedule-api-workflow-on-a-list)

</details>

<details>

<summary><mark style="color:blue;">Recursive API workflows</mark> - used to process a list of things server-side and in sequence</summary>

[Recursive API workflows](#user-content-fn-13)[^13] are not technically a Bubble feature, but an alternative method for processing lists of things. Instead of scheduling all the workflows in one action (Schedule API workflow on a list), a recursive schedules only one API workflow, and an action *inside* of that workflow re-schedules that same workflow again. This makes the operation different in a few ways:

* Somewhat slower and less WU-friendly
* Runs in sequence, rather than parallell
* Can use data from a previous cycle in the new cycle
* You can control the timing of each cycle dynamically
* Can [time out](#user-content-fn-14)[^14] if the operation places too high a demand on the server

For most scenarios, *Schedule API workflow on a list* is your most performant and reliable method, but for added flexibility in terms of dynamic parameters, or if for any reason you need the actions to be executed sequentially, you can use recursive workflows.

Article: [Recursive API workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/recursive-api-workflows)

</details>

<details>

<summary><mark style="color:blue;">Make changes to a list of things</mark> - used to do near-instant changes to a short list of things</summary>

This is an action that can be triggered both in the front-end and back-end. It makes changes to multiple things at once, but does not process the things one-by-one. Make changes to a list of things is good for making simple changes to a maximum of a few hundred things. For longer lists, or where you require more dynamic options in what to change, one of the above methods is recommended.

* Works on shorter lists
* Very quick to set up
* May add some visible loading time to the app if the list is long

There are also actions for copying a list of things and deleting a list of things. These two should only be used for shorter list.

Reference: [Make changes to a list of things](https://manual.bubble.io/help-guides/maintaining-an-application/database-maintenance/pages/-MTujs88N9W-2FUmQGag#make-changes-to-a-list-of-things...) | [Delete a list of things](https://manual.bubble.io/help-guides/maintaining-an-application/database-maintenance/pages/-MTujs88N9W-2FUmQGag#copy-a-list-of-things...) | [Copy a list of things](https://manual.bubble.io/help-guides/maintaining-an-application/database-maintenance/pages/-MTujs88N9W-2FUmQGag#copy-a-list-of-things...)

</details>

[^1]: *Expose as a public API Workflow* means that you are opening up that workflow to be triggered by an external application through an API request. If you plan to use an API Workflow only internally in your app, keep this box unchecked.

    Article: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)

[^2]: On each data type you set up custom fields that can contain different kinds of data. A *yes/no* field is a field that simply contains a *yes* or a *no.* This is also known as a boolean.

    Article: [Data types and fields](/help-guides/data/the-database/data-types-and-fields)

[^3]: The *Make changes to a thing* action lets you save changes to one or more fields on a specific thing (database record).\
    \
    Reference: [Make changes to a thing](https://manual.bubble.io/help-guides/maintaining-an-application/database-maintenance/pages/-MTujs88N9W-2FUmQGag#make-changes-to-thing...)

[^4]: The *Copy and restore database* feature lets you copy the content of your database across the Development and Live environment, as well as restore the Development or Live database to a previous state.

    Article: [Database Copy and Backups](/help-guides/maintaining-an-application/database-maintenance/database-copy-and-backups)

[^5]: The Development environment is the fully functioning version of your app that you (and your team) can work in together to see exactly what the finished app will look live. It's completely independent from the Live environment that your users see, both in terms of the app itself and its database.

    Article series: [Version control](/help-guides/maintaining-an-application/version-control)\
    Article series: [Testing and debugging](/help-guides/maintaining-an-application/testing-an-application)

[^6]: The *Live environment* refers to the deployed app that your end-users see, as opposed to the Development environment, which is for testing and debugging. The two environmens are completely separate, both in terms of the app itself, and the database.

    Article series: [Version control](/help-guides/maintaining-an-application/version-control)\
    Article series: [Testing and debugging](/help-guides/maintaining-an-application/testing-an-application)

[^7]: *Option sets* let you set up different types of static options in a database-like structure, but without using the database. This is useful to store information like days of the week, marital status, colors, states, countries and other data that you want to load quickly and that's rarely updated.

    Article: [Option sets](/help-guides/data/static-data/option-sets)

[^8]: The *event* is the part of a workflow that triggers it, such as a button click.

    Article series: [Workflows](/help-guides/logic/workflows)

[^9]: The *workflow editor* is where you set up what happens when an event occurs, such as a button click or the changing of the value of an input.

    Article: [The workflow tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/workflow-tab)

[^10]: The *current date/time* is a data source that returns the current date and time of the current user.

    Reference: [Current date/time](/core-resources/data/data-sources#current-date-time)

[^11]: *Workload* is a metric that tracks the work the server has to do to power your app. Each pricing plan includes an allocation of workload. Should your lead to increased activity and exceed this allocation, there are flexible options for accommodating this growth without disrupting service.\
    \
    Article series: [Pricing and workload](/account-and-marketplace/account-and-billing/pricing-plans)

[^12]: The *back-end* means that the operation runs on Bubble's server, as opposed to on the user's device.

    Article: [The front-end and the back-end](/help-guides/logic/the-frontend-and-backend)

[^13]: A *recursive workflow* is a method to run an API workflow sequentially. For a guide on how to set it up, see the article below:

    Article: [Recursive API workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/recursive-api-workflows)

[^14]: An operation *timing out* means that the server is given too much work to do all at once. In this context, it can happen if the workflows are resource-demanding and too closely scheduled, leading to an overload.
