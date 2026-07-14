# Protecting data with privacy rules
> Source: https://manual.bubble.io/help-guides/data/the-database/protecting-data-with-privacy-rules · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how to use privacy rules to protect private data

{% hint style="info" %}
This section takes a long-form look at what privacy rules are.\
\
To see the more concise and technical documentation you can check out our [core reference entry](/core-resources/data/privacy).
{% endhint %}

{% hint style="danger" %}
Privacy rules are an essential part of your app's security. Any database data that is private or sensitive needs to be protected with Privacy Rules to be considered secure.

Always stay on top of your app's privacy rules to let your users safely entrust their data to your app.
{% endhint %}

Privacy rules are conditions that you set up on each data type in order to protect the data from being viewed and edited by unauthorized users.

## What are privacy rules?

All the data that you store in the database is hosted on a server. Privacy rules are rules that instruct the server to only send data to the browser or write to the database if certain conditions are met.

For example, we could allow our Products to only be viewable by people who are logged in. The privacy rule in humanly readable terms would be:

```
Only return the data if the current user is logged in
```

The logic in this case would be that we *ask* the server for some information by using a data source such as *Do a search for* and an operator like *Name* to show a Product name. If the privacy rule above is active, Bubble will *only* return the data if the query came from a user that is logged in.

The reason this is so essential to app security is that it's stopped on the *server-side*, and the data remains in an encrypted state in the database instead of being sent to the browser where it could be viewed.

<figure><img src="/files/PU801MpGFyrziwCgYvgx" alt=""><figcaption></figcaption></figure>

As illustrated above, the privacy rules make up a sort of firewall for your data – every request to the database goes through a process of [authentication and authorization](#user-content-fn-1)[^1] before it's completed or rejected.

### Client-side data

Before we explore privacy rules, it's important to understand that all data that reaches your user's device is by definition no longer secure. As a developer, you need to be aware that the as long as the data has been downloaded to the user's device – even if it's not displayed anywhere in your app – the user of that device can access it by looking at the data traffic being sent to and from the Bubble server.

This is fairly technical subject – suffice it to say that the only way data remains truly inaccessible is ensure it is not sent from the server in the first place. And privacy rules are the way to do that.

It's also important to stress that in most cases, we *want* the data to reach the device. If not, we wouldn't be able to work with data at all. The important task is to ensure that only the intended information is sent and no unauthorized data.

In an eCommerce store we would likely find data in the database that has different security requirements:

* All **Products** should be viewable by anyone (if not, no one will be able to buy anything)
* All **Shopping carts** should only be viewable by the user who created it (to keep the user's purchase history private)

The Products are known as *public data* and the Shopping cart is *private data.*

## How privacy rules work

{% hint style="info" %}
**Bubble API:** Using the Bubble API introduces some new settings in the privacy rule tab. You can read more about those special settings in the article below.

Article:[ Data API privacy rules](/help-guides/integrations/api/the-bubble-api/the-data-api/data-api-privacy-rules)

Article: [Workflow API privacy rules](/help-guides/integrations/api/the-bubble-api/the-workflow-api/workflow-api-privacy-rules)
{% endhint %}

Bubble features a privacy rule editor that lets you control the privacy settings on all your data types in one central place. You access this by going to the *Data* tab and then clicking *Privacy*.

Privacy rules protect your data types in the following ways:

* You can stop specific fields from being **viewed**
* You can stop specific fields from being used as **search constraints**
* You can stop the data type from being **found with&#x20;*****Do a search for***
* You can stop users from viewing **uploaded files**
* You can stop users from making changes with **auto-binding**

{% hint style="danger" %}
**Caution:** Privacy rules do not update automatically on the page if the privacy rules impacting a user change while the user is on that page.

For example, if a user has a page open where they can see a Thing, then they click a button on that page that changes which privacy rules apply to them such that they can no longer see that Thing, this new privacy rule outcome will *not* reflect on the page until the page is refreshed.
{% endhint %}

{% hint style="info" %}
Managing the security of **private files** requires configuring specific settings within both the privacy rules and the element responsible for uploading the file.

You can learn more about this in our dedicated guide below:

* Article: [Files](/help-guides/data/files)
* Article section: [Uploading private files](/help-guides/data/files#uploading-private-files)
  {% endhint %}

Privacy rules are built using two pieces of information:

* What are the attributes of the database thing
* What are the attributes of the current user

By combining the attributes of these two, we can flexibly set up rules that determine **who** the user is and **what** the user is trying to access. Let's look at another rule written out as a sentence to illustrate:

```
Only return the data if the thing's Creator is the current user
```

Here we are involving both the *thing* in question and the *current user*. If the current user and the creator of the thing is the same, then Bubble will return the data. If they are not, the data stays securely on the server.

{% hint style="info" %}
**Client-side filtering:** Privacy rules are applied on the server. Once data reaches the client, those rules no longer apply, since the data is already on the user's device. Any client-side operations like filtering, sorting, or counting work on the data that's already been returned and don't trigger additional privacy checks.

You can read more about the difference between client-side and server-side in [this article](/help-guides/security/client-side-and-server-side).
{% endhint %}

### Privacy rule settings

Each privacy rule consists of different settings, and the easiest way to understand how they work is to simply read them from left to right like you would an English sentence:

<figure><img src="/files/lBCaalCQwylLGzFIoLzQ" alt=""><figcaption></figcaption></figure>

The sentence above says

1. "*When the current user is logged in, they can..."*
2. *... find this thing in searches,*
3. *view files attached to this thing,*
4. view the following fields,
5. constrain searches by the following fields,
6. use auto-bind on the following fields.

The settings and their labels are meant to be taken literally. For example, *View all fields* means **View** all fields – it does not stop making *changes* to the field in a workflow. Likewise, *Find this in searches* applies to *Do a search for* specifically – but the record can still be fetched in other ways.

We recommend playing around with the settings and viewing the results on a page to learn how they affect what users can see and do.

#### Multi-level data references and searches

There's is an important limitation to be aware of when conditions reference related data [*more than one level deep*](#user-content-fn-2)[^2].

Privacy rules can evaluate fields that belong directly to the data type, but they can't traverse multiple layers of relationships to grant [search access](#user-content-fn-3)[^3]. If a rule uses a chained reference, such as accessing a field on a related thing and then another field beyond that, Bubble can't use that rule to grant search access.

<figure><img src="/files/mSYqzUXeCkGgaWpKcob4" alt=""><figcaption></figcaption></figure>

To avoid this limitation, structure your data so that the fields required for privacy checks only need to access one level in its expression:

<figure><img src="/files/MBYOQ1Y9wNdza3G2Rd80" alt=""><figcaption></figcaption></figure>

In the example above, instead of checking the Cart's Creator's X, we're checking the Current User, reducing the levels from 2 to 1.

### Privacy rules and workflows

Do privacy rules affect your app's workflows? The answer is *yes and no*.

* *View all fields* does not stop you from *Making changes to a thing* and updating that field in a workflow. However, it *can* stop you from correctly checking a condition if the current user is unable to view the field on which the condition is based
* *Do a search for* does not stop you from making changes to a thing, but it can stop you from getting the search results that you want in a workflow. In other words, if you are using the *Do a search for* data source in a workflow, the search will only return the data that the current user has access to.
* *Allow auto-binding* stops the user from making changes through auto-bound elements – but it does not stop them from making those same changes in a workflow.

There are two important lessons we can take in:

* You need to view the workflow as being *run by the current user* – the same restrictions will apply to the workflow as in any other scenario in your app
* To protect workflows from performing tasks you don't want it to, you'll need to use *conditional expressions* in the *Only when* field on the workflow or specific action

#### Can I override privacy rules in a workflow?

Sometimes you'll have a need to override privacy rules when a user takes a specific action. For example:

1. User 1 does not have permission to search for any other users
2. When User 1 runs a specific action, you may need to perform a search for all other users to make a change

In other words, you need to override the privacy rule that stops User 1 from searching for other users. This is done by using an API Workflow and checking *Ignore privacy rules when running the workflow.*

This lets you run workflows that perform an important task with full access to data, without compromising your security by opening up the access for the current user. The operation is performed purely server-side, meaning that your users cannot see it or even know that it's running.

<figure><img src="/files/1PnP0GGVdCI9U8lS6IMc" alt=""><figcaption></figcaption></figure>

## Search privacy modes

Search privacy modes control which fields a user can *filter on* when they search.

#### Why constraints need their own protection

When you set up a *Do a search for*, you can narrow the results using *constraints*. A constraint is a filter, such as `Salary > 100,000` or `Status is "approved"`.

A user can learn something about a field without ever viewing it. Imagine a *Salary* field that's protected by a privacy rule. The user can't see the number, but if they're allowed to search with the constraint `Salary > 100,000`, the records that come back tell them who earns more than that. The field's value doesn't directly appear on screen, but can be inferred through the records that the search returns.

Search privacy modes are how you close that gap.

{% hint style="warning" icon="lock" %}
**Note on the slug field:** Slug fields are designed to be public and searchable, and constraints can't be disabled on them. Slugs should never contain sensitive information.
{% endhint %}

#### The three modes

You set the search privacy mode in *Settings – General*. The setting applies to the application branch you're working in.

<table><thead><tr><th width="109.79681396484375">Mode</th><th>Explanation</th><th>Recommendation</th></tr></thead><tbody><tr><td><strong>Off</strong></td><td>Constraints are not restricted. Any field on any data type can be used in a search constraint. </td><td>This mode is <strong>not</strong> recommended for apps that perform searches on sensitive data.</td></tr><tr><td><strong>Automatic</strong></td><td>A user can search using the constraints that are already defined on your app's pages and workflows. If a constraint isn't defined anywhere in your app's pages or workflows, Bubble blocks it unless you've granted permission for that field.</td><td>This mode provides a balance between security and convenience. Existing apps will not break. If your app performs searches on sensitive data, we recommend using <em>Strict mode</em>.</td></tr><tr><td><strong>Strict</strong></td><td>Every constraint needs explicit permission. A field can only be used in a search constraint if its privacy rule allows it. </td><td>For apps performing searches on sensitive data, <strong>we recommend using this mode</strong>. This mode gives you precise control.</td></tr></tbody></table>

### How automatic mode decides what to allow

Automatic mode protects your data without breaking the searches your app already relies on. To do that, it looks at where each search comes from.

When a search runs, Bubble checks whether the constraint and its operator match one that's defined on one of your app's pages and/or workflows. If it finds a match, it allows the constraint. If it doesn't find a match, the constraint is only allowed when you've granted permission for that field.

Searches made through the Data API always need explicit permission. They run outside the context of your pages, so Bubble has no page-defined search to match them against.

### Which mode should I choose?

As long as your app handles any kind of private data, we recommend using Strict mode. This means no field can be used as a search constraint unless you've explicitly allowed it, which removes the search inference risk across every field at once.

Strict mode takes a little more setup. You'll need to allow constraints on the fields your searches depend on, and we recommend using the [search tool](/help-guides/getting-started/navigating-the-bubble-editor/tools/the-search-tool) and the *Uses constraint field* operator to find instances where specific fields are used as constraints. The payoff is that your search permissions become predictable: a field is constrainable only when you say so, with no behind-the-scenes matching.

Automatic mode is a strong default while you get there. It protects undefined constraints, including Data API searches, without breaking the searches already built into your pages.

Off mode gives no constraint protection, so we only recommend it for apps that hold no private data.

#### Allowing a field in constraints

This setting controls which fields a user can use as a search constraint.

* **Enabled:** the field can be used as a search constraint.
* **Disabled:** the field can't be used as a search constraint.

{% hint style="warning" %}
Allowing a constraint on a field that users can't view can expose the field's values through search inference. The Security Dashboard flags this combination for sensitive fields so you can confirm it's intentional.
{% endhint %}

<details>

<summary>Checklist: <strong>Transitioning to strict mode</strong></summary>

Use this checklist to identify and resolve any searches that may break when strict mode is enabled.<br>

* [ ] **Find all fields where&#x20;*****Constraint*****&#x20;is unchecked.** Go through each data type's privacy rules and note every field where *Constraint* is disabled.
* [ ] **Check each field with the app search tool.** Use the *Uses constraint field* filter to find any expressions in your app that use the field as a constraint.
* [ ] **If the search returns no results, leave the field as-is.** No expressions depend on it, so the current setting is safe.
* [ ] **If the search returns results, choose one of the following:**
  * Enable *Constraint* on the relevant privacy rule, if you want to keep the field constrainable for users matching that rule.
  * Refactor the affected expression to use a different field as the constraint.
  * Refactor your data schema so a less sensitive field can be used in place of the original constraint.

</details>

## Privacy rule examples

### Example 1: Shopping cart

We have a custom data type called Shopping Cart. This type should only be found in searches and viewable by the person who created it. But wait: if no one else can see the order, how are we to deliver the product?

Someone else needs to be able to see it, but it must be restricted. We'll set up a custom field on each user called *Admin* (yes/no), which grants access to see anyone's cart. On the cart, we can use the already existing and automatically populated *Created by* field.

The User should look like this:

<figure><img src="/files/UqDX80iUA0U0gf810y3r" alt=""><figcaption><p>We set up a simple yes/no field to separate admin users from regular users. Note that we have set the default value to <em>no</em> to make sure that new users are <em>not</em> an admin by default.</p></figcaption></figure>

This setup requires that we set up three privacy rules:

1. The first gives access to search for and view fields on the cart *if* you are the one who created it
2. The second gives access to search for and view fields on the cart *if* your admin field is set to *yes*
3. The third is the automatically generated *Everyone else* rule: this states that everyone else should have *no access*

<figure><img src="/files/qGe37qcUoe0PfWbrCV43" alt=""><figcaption></figcaption></figure>

Pay especially close attention to the *bottom* rule. This is the one that determines what happens to *everyone else*. We've unchecked all the boxes in this example, making sure that *only* admins and cart owners get access.

A good way to think about privacy rules is that they're additive: every rule a user matches contributes its permissions, and those permissions stack up. The user ends up with the combined access of all matching rules, not the strictest one.

> With privacy rules, you don't *prohibit access,* you **grant it.**

Following that logic, our two top rules are *granting* access to the cart 1) if you are the cart's creator, or 2) if you are an admin, as specificed by the *Admin* yes/no field.

### Example 2: Sharing tasks

In this example, we'll look into how properties on the data type to which the privacy rules are applied can further grant access under certain circumstances.

Let's imagine we have a task management app, where access to tasks follow two simple rules:

1. The creator of the task has full access to their tasks
2. The creator can invite other users into a specific task, granting them access

In that case, we need some way to determine whether a user has been invited to a specific task. Keep in mind, we want to add that permission only to certain tasks, not all of them.

We can solve this by adding a new custom field on the Task data type that contains a list of all Users who have been invited to it. The database structure can look like this:

<figure><img src="/files/qaoE7HBHlWlll2u72Jfa" alt=""><figcaption></figcaption></figure>

Whenever we want to give someone access to the Task, we add their name to the list using workflow:

<figure><img src="/files/jr1Dsg36uRBJiu1juaQh" alt=""><figcaption></figcaption></figure>

Since the *Invited users* field is set to be a **list**, Bubble lets us use the *add* function that will add that single user to the list of Invited Users (if we wanted to add a list of users we would use the *add list* function).

Now, to set up our privacy rule, we will again need three rules:

1. The first states that if the current user is the [Creator of the task](#user-content-fn-4)[^4], you should have access
2. The second states that if the current user is in the list of invited users, you should have access
3. The third (*everyone else*) states that no one else should have access

In the privacy rule editor it will look like this:

<figure><img src="/files/Lo4Cshc1giwssWCl5HSL" alt=""><figcaption></figcaption></figure>

Again we can see that the two rules **grant** access under special circumstances, while the bottom does **not** grant the permission to everyone else.

## Ending notes

Privacy rules are the most important safeguard you have to protect your user's data, and we strongly encourage that you get to know them well and make a habit of setting up data to be secure from day one. Privacy Rules act on the server-side, making it impossible for data to be stolen, tampered with or accidentally leaked, since the information never leaves the server.

Bubble offers a robust set of security features for you to take advantage of. As the developer, it's up to you to use them correctly to keep your users' private data private.

## Other ways to learn

<details>

<summary>Video lessons</summary>

* [Setting up privacy rules](https://youtu.be/1-meIeBUXPY)

</details>

<details>

<summary>Books</summary>

[The Ultimate Guide to Bubble Security](https://www.amliesolutions.com/the-ultimate-guide-to-bubble-security/) by Petter Amlie

</details>

[^1]: *Authentication* is the process of determining *who* a user is.\
    \
    \&#xNAN;*Authorization* is the process of determining *what* that user has access to.

[^2]: In this context, a *level* refers to accessing a field on a related thing, and then accessing another field beyond that.

    For example, in the expression *This Blog posts’s Creator’s Admin is yes*, *Creator* is the first level of reference, and *Admin* is one level deeper than Creator.

[^3]: The *Find this in searches* property that applies to the data source *Do a search for* in your app.

[^4]: The Creator task is a built-in field that's automatically populated. It can't be changed.\
    \
    If you want to be able to set a dynamic owner (for example to transfer ownership from one user to another), you may want to set up an additional field that you can manipulate directly.
