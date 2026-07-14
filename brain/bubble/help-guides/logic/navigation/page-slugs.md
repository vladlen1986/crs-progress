# Page slugs
> Source: https://manual.bubble.io/help-guides/logic/navigation/page-slugs · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The *slug* is a built-in field that you assign to any thing (entry) in your database to act as its URL. Up until slugs, URLs in Bubble apps would always point to that things unique ID.

{% embed url="<https://youtu.be/jWrIV4YR5Oo>" %}
Our Academy tutorial on how to set up page slugs
{% endembed %}

## Slugs in URLs

Without a slug, this is what a page's URL would look like when a thing is sent to the page:

![](/files/-MF7b86a_OTWv5Zm6x8S)

With a slug value, the 'Scone' thing becomes this:

![](/files/-MF7bUgiCgRVK_Vnl6x7)

With slugs, anything can have its own custom URL making them shorter, more searchable and more memorable.

{% hint style="warning" %}
**Note:** If your app's index page has a Thing assigned to it, that page's URL will be ... .com/index/\[slug]. It cannot be ... .com/\[slug] because that would interfere with knowing whether the URL points to the index page with a Thing or points to a different page.
{% endhint %}

## Setting a thing's slug

You can set a thing's slug value when creating a new database entry, or modifying an existing one, which can be done from the *Data* tab or in a workflow. Note that slugs can only include lowercase letters, numbers, or hyphens, and must be less than 250 characters.

### From the data tab

![](/files/-MF7cngED1fmaqDRtNIE)

![](/files/-MF7du6eFhwsrbJdAz-U)

### From workflows

Under the Data actions category of actions, you will find "**Set a thing's slug**" which will let you dynamically set the slug to whatever you like for any given thing.

![](/files/-MF7dkQ27971gfdx-ZCl)

Note that you cannot change the slug value through "**Make changes to thing**" and while it may be similar in concept, you set it in different action called "**Set a thing's slug**".

![](/files/-MF7ftArFlnPodgq-GXt)

With this action, you can dynamically set the slug for any given Thing. In the above image we would be setting the slug for a Product found inside a repeating group.

Once a thing's slug is set, then the URL when navigating to a page with that thing will look like the example above.

## Slug order

There is a hierarchy to which Bubble will now set your URL.

1. Page slugs
2. Backup Fields for URL (Formerly Fields Readable as URL)
3. Unique ID

If a slug is set, that is what Bubble will use. If a slug is not set, Bubble will look to see if your page has any Backup fields (formerly known as Fields Readable for URLs). If your page has no backup fields, then it will default to its unique id.

## Slug duplication

You **can** have things share the **same slug value** if they are of **different** data types. However, you **cannot** have two things of the same data type with the **same slug value.** If you try, it will append slug-1, slug-2, slug-3, and so on and so forth.

![](/files/-MFBBm1A6qzSDvQCwrg_)

## Slug conditionals

With slugs we also have access to two conditionals that you can use in your elements and workflows for finer control.

**Can Have The slug Value -** This operation tests if the argument is a valid slug value for the Thing. A valid slug value is both unique and correctly formatted with only lowercase letters, digits, and hyphens.

**Cannot Have The slug Value -** This operation tests if the argument is an invalid slug value for the Thing. An invalid slug value is anything that isn’t made up of only lowercase letters, digits, and hyphens or that is not unique.

These conditionals are perfect for when you need to compare the Slugs to something already existing, for example, with User Profiles, you can use these to check if a user name is or isn't already taken.

![](/files/-MF7nJ2pwQ7ki43Ixexf)

## Slugs and Privacy Rules

If you are setting the slug for a data type that has a defined privacy rule, confirm that you have checked the "slug" field under the default permissions for "View all fields." This will let everyone see the slug value that you have set in the page's URL. If this isn't checked and the user does not meet the condition for a privacy rule that allows viewing the Slug field, they will see the unique ID in the URL instead.

![](/files/-MFk6PQQtEElCH-nHKUr)

{% hint style="info" %}
**Tip:** If your slug's field is hidden by your Privacy rules (such as "Everyone else cannot see Slug"), your application may allow for duplicate slugs to be added, since it would not be able to locate the original usage of the slug.
{% endhint %}

## Rules when using slugs

1. **Reminder**: Special characters will not save to your slug field when entered directly on the Data tab and will show up as blank. (*Anything that isn't a lowercase letter, hyphen or number)*.
2. Slugs can update in real-time, meaning if you update the slug on a page that uses the slug, the URL will automatically change.
3. The maximum slug length is 250 characters.
4. Slugs support all languages. If you notice any language that isn't supported or being incorrectly processed, please visit our [Support center](https://bubble.io/support) to get in touch with a member of our Support team.

{% hint style="info" %}
When a slug that contains special characters is set through a workflow, these characters will remain in the slug, display in the URL, and work correctly.
{% endhint %}
