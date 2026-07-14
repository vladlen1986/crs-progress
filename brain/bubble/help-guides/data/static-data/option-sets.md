# Option sets
> Source: https://manual.bubble.io/help-guides/data/static-data/option-sets · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers option sets, used to store a static list of options in a database-like structure

Option sets let you set up different types of static options in a database-like structure, but without using the database. This is useful to store information like days of the week, marital status, colors, states, countries and other data that you want to load quickly and that's rarely updated.

<figure><img src="/files/rOt9UDr2selE7Fof74iK" alt=""><figcaption><p>Option sets can be used to store static options and use them around your app. In this example we have saved a list of colors as options in a set</p></figcaption></figure>

Option sets become a [part of your application's source code](#user-content-fn-1)[^1] meaning that they are downloaded as part of the JavaScript file that makes up your application. As such, they don't require a database lookup and are cached[^2] on the user's device until you deploy a new version of your app, making them fast-loading and lightweight.

This also means that option sets cannot be added, edited or deleted by your users and require you to re-deploy your application before options become available in Live.

{% hint style="danger" %}
Option sets, unlike the database, are not encrypted and become a part of your application's source code. **Option sets should never contain any sensitive information.**
{% endhint %}

## How option sets are structured

An option set, as the name suggest, is a set containing *options*. To each set you can add a list of *attributes* that are similar to the fields on a data type. Attributes can be set to be one of the following types:

* text
* number
* date
* date interval
* yes / no
* file
* image
* geographic address
* \[other Option sets]

To summarize, each option set consists of a collection of options that share the same attributes of one of the types above.

Just like data types, option sets can be linked. For example, you could set up two option sets called *State* and *City* and create an attribute on the *City* that links to the State option set.

<figure><img src="/files/527QvIIHIZKZSkagpsvD" alt=""><figcaption></figcaption></figure>

In the example above, you see the option sets on the left-hand side (1) and the attributes on that option set on the right-hand side (2). The *Display* attribute is a built-in text field that identifies each option in the set.

{% hint style="warning" %}
Bubble doesn't require the value in the *Display* attribute to be unique, but it can still be a good idea to make sure that they are in case you need to filter the options by their Display value later. If you have duplicate values you may not get the results you want.
{% endhint %}

## Creating option sets

To create a new option set, first access the option set tab by going to *Data - Option sets.* The list on the left-hand side will be empty and showing only the *New Option set* box. To create a new set, provide a name and click *Create*.

<figure><img src="/files/s2n5QMo7UKTl1aD8u87o" alt=""><figcaption><p>In the <em>New option set</em> field, type in a name and click <em>Create</em>.</p></figcaption></figure>

After creating the new option set (such as *State*), you can set up attributes on that set: in many cases you can use the built-in *Display* attribute to store the main identifier of each option. In this case this would be the name of the state, such as Massachusetts. You can create as many attributes on it as you need. For example, you could add a second text attribute containing the state code (MA).

### Adding options

After an option set has been created and you have added the attributes you need to it, you can start adding the options. In an option set like *City*, the options would be the different cities you want to list, such as *Boston* and *Washington.*

<figure><img src="/files/yGibZX41DgKSR8g9wm6x" alt=""><figcaption></figcaption></figure>

To create a new option, pick the option set you want to add it to, and type in a name in the *New option* field, then click Create. The name you provide will be stored in the *Display* field on that option.

### Editing attributes

To edit the attributes on an option set, click the *Edit attributes* link next to the option set in the list. This is not visible until you have created at least one option. In the example above we can assign the City we have created to a *State –* see [below](#linking-option-sets) on how to link the tw&#x6F;*.*

<figure><img src="/files/bqDg7YmtS3oVfNItwxVB" alt=""><figcaption><p>To modify the attributes of an option, click the <em>Modify attributes</em> link in the lists of options.</p></figcaption></figure>

### Linking option sets

You can link option sets just like data types, by setting up the attribute on one or both of them to reflect the other. If we create an option set called *City*, we can link that city to the State option set:

<figure><img src="/files/lq0dHG446wjJDwb5xt59" alt=""><figcaption></figcaption></figure>

In the example above, we are linking the two by:

1. Clicking the *Create attribute* button on the *City* option set
2. Picking the *State* option set from the list of available types

Just like with data types, the attribute can also be set to be a *list,* but this won't be necessary in the example with State and City.

When the two are linked you can use it to filter a list of option sets (such as showing all Cities in the State of Massachusetts) or to display information in a page element, such as a text element showing *Boston - Massachusetts.*

## Using option sets

Unlike Data types, you don't *search* for option sets: they are all loaded on page load and you can reference them in elements and workflows as needed.

### As a data source on an element

In the example below, we are using option sets to display a list of Cities in a [dropdown element](#user-content-fn-3)[^3].

<figure><img src="/files/mZSglcycuYehNpbxM38K" alt=""><figcaption></figcaption></figure>

1. We've set up a dropdown with the placeholder[^4] *Pick a city*
2. In the choices style we pick *Dynamic choices,* which lets you define the [data source](#user-content-fn-5)[^5]
3. In *Type of choices* we select the option set *Cities*
4. In the *Choices source* we define what list we want to display. Note the difference between data types and option sets: we don't search for the options, we simply pick the *All Cities* to instruct Bubble to load all of them.\
   \
   If you want to filter the results, you can apply the :*filtered* operator after the data source, such as *All Cities:filtered.* In that filter you place constraints such as filtering the Cities by their State attribute.
5. In the *Option caption* setting we set which attribute to use as the option's caption in the dropdown. In our example we have saved the name of the City in the *Display* attribute. We could also extend it to show the City *and* State by expanding the expression:\
   ![](/files/zya4zWOSU1P1vGUVdt6T)\
   \
   The example above would make each City be displaye with their State in the dropdown, such as *Boston - Massachusetts.*

### In an expression

You can also use an option set as a data source in an expression and then filter or manipulate the result using operators.

<figure><img src="/files/me1sfwhimLs54IZVbHFa" alt=""><figcaption></figcaption></figure>

In the screenshot above we are setting up a conditional expression on the dropdown element. To reference an option set, you can:

1. Select it from the list of options that appear at the top of the dropdown. Bubble knows that the Option set is *City* since we are referring to the *value* of the dropdown (which is set to be a City)
2. You can use the *Get an option* data source to access all option sets and use operators to find the right value

## Option sets versus data types

Option sets and data types both let you store structured information in your app, but they serve very different purposes. Choosing the right one comes down to whether the information is static and known in advance, or dynamic and tied to user actions. The two storage options also have a different security profile.

### Security

Option sets and data types are stored and accessed in fundamentally different ways, which has direct implications for security. Choosing the right one for a given piece of information is as much a security decision as it is a structural one.

#### Option sets are part of your app's source code

Option sets are included in the JavaScript files Bubble sends to the client when your app loads. This means every option set, including all of its options and their attributes, is visible in your app's source code. Anyone who inspects the page in their browser's developer tools can see the full list.

This is by design. Option sets are meant for static, non-sensitive information that the app needs available instantly, such as categories, statuses, or fixed configuration values. The trade-off for that performance is visibility.

For this reason, option sets should never be used to store:

* API keys, tokens, or other credentials
* Internal business logic that shouldn't be exposed
* Information about features you don't want users to discover
* Any value that needs to be hidden from the client

#### Data types are stored in an encrypted database on the server

Data types are stored in the database, which lives on the server. The client only receives data type records when it explicitly requests them, and only the fields it's allowed to see. This makes data types the right choice for anything sensitive, dynamic, or tied to specific users.

The key security mechanism for data types is privacy rules. Privacy rules let you control who can see which records and which fields, evaluated on the server before any data is sent to the client. With privacy rules in place, sensitive fields can be hidden entirely from users who shouldn't have access, even if the rest of the record is visible.

### Option set/data type comparison table

<table><thead><tr><th width="229.10546875">Feature</th><th>Option set</th><th>Data type</th></tr></thead><tbody><tr><td>How is the data stored?</td><td>In your app's source code</td><td>In the database, server-side and encrypted</td></tr><tr><td>How is data created?</td><td>Defined in the editor at build time</td><td>Created at run time or in Bubble's database editor</td></tr><tr><td>When is it loaded?</td><td>Whenever any page loads</td><td>Only when requested</td></tr><tr><td>When is it updated</td><td>On first page load after app has been deployed</td><td>Instantly</td></tr><tr><td>Who can modify the data?</td><td>The app developer</td><td>Users/workflows, and the app developer</td></tr><tr><td>Performance</td><td>Loaded instantly with the app</td><td>Fetched from the database when needed</td></tr><tr><td>Privacy rules</td><td>Not supported</td><td>Supported</td></tr><tr><td>Suitable for sensitive data</td><td>No, since values are visible in the source code</td><td>Yes, when protected by privacy rules</td></tr><tr><td>Editable in run mode</td><td>No</td><td>Yes</td></tr><tr><td>Typical examples</td><td>Categories, statuses, country lists, fixed configuration values</td><td>Users, orders, blog posts, messages</td></tr></tbody></table>

#### When to use what

**Use an option set when:**

* The values are known in advance and won't change based on user actions.
* The list is relatively short and stable, such as a set of statuses or categories.
* You want the values available instantly throughout your app without a database lookup.
* You don't need privacy rules to control who can see the values.

**Use a data type when:**

* The data is created, updated, or deleted by users or workflows.
* The number of records can grow over time.
* You need privacy rules to control access.
* The data is tied to specific users or other database records through relationships.

In practice, most apps use both. Option sets handle the fixed structure of the app, while data types hold the dynamic content that users interact with.

## Option set FAQ

<details>

<summary>What is an option set?</summary>

An option set is a static list of predefined values stored in your app's source code. Option sets are used for information that doesn't change based on user actions, such as categories, statuses, country lists, or fixed configuration values.

</details>

<details>

<summary>How is an option set different from a data type?</summary>

Option sets are static and stored in your app's source code, while data types are dynamic and stored in the database. Option sets are defined at build time and don't change based on user actions, whereas data types can be created, updated, and deleted by users and workflows.

Read more about the difference between the two [here](#option-sets-versus-data-types).

</details>

<details>

<summary>Can option sets be modified at run time?</summary>

No. Option sets are part of your app's structure and can only be modified in the editor. If you need values that can change based on user actions, use a data type instead.

</details>

<details>

<summary>Are option sets visible to users?</summary>

Yes. Option sets are included in your app's source code and visible to anyone who inspects the page in their browser's developer tools. This includes all option set data, not just names and attributes. Don't use option sets to store sensitive information.

</details>

<details>

<summary>Can I add custom attributes to options?</summary>

Yes. Each option set can have its own attributes, similar to fields on a data type. Attributes can be text, numbers, dates, yes/no values, or references to other option sets. They're useful for storing related information alongside each option, such as a display label or a color code.

</details>

<details>

<summary>How many options can an option set have?</summary>

Option sets are designed for small, static lists. There's no strict limit, but very large option sets can slow down your app's load time, since the entire set is included in the source code. If you find yourself with a long or growing list, consider using a data type instead.

</details>

<details>

<summary>Can I apply privacy rules to an option set?</summary>

No. Privacy rules only apply to data types. If you need to control who can see certain values, store them in a data type and use privacy rules to restrict access.

</details>

<details>

<summary>When should I use an option set instead of a data type?</summary>

Use an option set when the values are known in advance, won't change at run time, and don't need privacy controls. Use a data type when the values are dynamic, tied to users, or need access restrictions. Most apps use both, with option sets for fixed structure and data types for user-generated content.

See more details in the [section above](#option-sets-versus-data-types).

</details>

<details>

<summary>Can I convert an option set to a data type or vice versa?</summary>

There's no built-in conversion tool. If you need to switch, you'll need to recreate the structure manually in the other format and update any references in your app.

</details>

<details>

<summary>Can option sets reference each other?</summary>

Yes. An attribute on one option set can reference another option set. This is useful when one set of options is related to another, such as a list of regions tied to a list of countries.

See more [here](#linking-option-sets).

</details>

<details>

<summary>How do I display options to users?</summary>

Options can be displayed in dropdowns, radio buttons, and other input elements by setting the data source to *Get an option*. You can also reference specific options directly in dynamic expressions throughout your app.

</details>

<details>

<summary>Are option sets shared across pages?</summary>

Yes. Option sets are defined at the app level, not the page level, so they're available throughout your app once created.

Note that every option set is downloaded on every page, even if they are not used on that page.

</details>

<details>

<summary>Can I apply search constraints to option sets?</summary>

Technically, loading an option set will always return all values (unlike *Do a search for,* where the result can vary based on search constraints and privacy rules). However, you can apply filters to the search by adding the `:filtered` operator to the option set data source in a dynamic expression.

</details>

<details>

<summary>I have made changes to an option set. Why can't I see the changes in the live app?</summary>

If you can't see the changes you've made, please check the following:

* Changes in option sets are visible as follows:
  * **Development**: After the page is refreshed
  * **Live**: after the app has been deployed and page has been refreshed
* Check that the *Saving* indicator next to the edit menu is showing *Saved* to confirm that the change has been synced to the Bubble server. If not, please check your internet connection.

</details>

<details>

<summary>Does Bubble only download the option sets that are used on a page?</summary>

All option sets are downloaded on all pages (or the cached file is used if the file has already been downloaded to the User's device). This means two things:

* Avoid storing lots of data in an option set (such as a high number of long texts), as that can slow down the page load and general performance of your app.
* Never store sensitive information in option sets, as they are visible in your app's source code regardless of whether they are used on the page.

</details>

<details>

<summary>How do I search for option sets?</summary>

You don't search for option sets in the same way as data types, since they are already downloaded the user's device and not part of the database. You can list and filter option set options or reference one option directly without having to search for it.

You can read more about that [here](#using-option-sets).

</details>

<details>

<summary>Can an option set reference a database thing?</summary>

No, an option set cannot reference a database thing directly, since an option set is static data and database records are dynamic. You can store the unique ID of a thing in an option set, but it comes with a few risks:

* Any database record can be deleted, breaking the link.
* The thing can have a different unique ID in your live and development database, which can break the link when you deploy your app.
* Exposing a thing's unique ID isn't a security vulnerability on its own, but it's generally not recommended, especially for things that contain sensitive data. A visible unique ID combined with misconfigured privacy rules can open the door to vulnerabilities that would otherwise be harder to reach.

</details>

## Other ways to learn

<details>

<summary><mark style="color:blue;">Core reference</mark></summary>

* [Get an option](/core-resources/data/data-sources#get-an-option) (loading an option set)

</details>

<details>

<summary><mark style="color:blue;">Video lessons</mark></summary>

* [How to use option sets](https://www.youtube.com/watch?v=7FwLBBQzinM)

</details>

[^1]: While Bubble is a no-code platform, your app consists of code that Bubble generates for you.

    These files are downloaded to the user's device when they load the page.<br>

    \
    In the case of Option sets they are stored as JSON in a file called dynamic.js.

[^2]: Cached means that the downloaded file is stored on the user's device the first time it's downloaded.\
    \
    This means the page will load faster after its initial load, since the cached files don't need to be downloaded again.

    Whenever you deploy changes, the file is re-downloaded to ensure it's up-to-date.

[^3]: A dropdown element is used to display a list of options whenever a user clicks the element.\
    \
    Article: [Input forms](/help-guides/design/elements/web-app/input-forms#selection-controls)\
    Reference: [Input forms: Dropdowns](/core-resources/elements/input-forms#dropdown)

[^4]: The placeholder on an element is the text displayed when the element is empty. It will be hidden as soon as the element contains a value.

[^5]: A *data source* in Bubble is any source from which Bubble pulls data, such as the database or an external API.\
    \
    In this context, the data source is the Option set.
