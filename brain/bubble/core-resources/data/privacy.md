# Privacy
> Source: https://manual.bubble.io/core-resources/data/privacy · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:orange;">**intermediate level builders**</mark><mark style="color:green;">**.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (13)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### Privacy rules

* Article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

***

**Data**

* Article series: [Data](/help-guides/data)
  * Article: [The database](/help-guides/data/the-database)\
    Understanding the Bubble database, and how to work with data.<br>
  * Article: [Files](/help-guides/data/files)\
    Uploading, downloading and securing files.<br>
  * Article series: [Static data](/help-guides/data/static-data)
    * [App texts](/help-guides/data/static-data/app-texts-translations)\
      Translating your app's static texts.
      * [Option sets](/help-guides/data/static-data/option-sets)<br>
  * Article series: [Temporary data](/help-guides/data/temporary-data)
    * Article: [Custom states](/help-guides/data/temporary-data/custom-states)\
      Saving data temporarily on a page or element.
      * Article: [URL parameters](/help-guides/data/temporary-data/url-parameters)\
        Saving and reading data from the browser's URL bar.

***

#### Dynamic expressions

When you work with data in Bubble, you'll often be relying on dynamic expression to load, aggregate and manipulate it in different ways. The article below explains how dynamic expressions work.

Article series: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

***

#### The Data tab

The *Data* tab in the Bubble editor is where you view and manage your app's data types and data, as well as other categories of data like files and option sets.

Article: [The data tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/data-tab)

***

#### The Bubble API and security

We also have an extensive article series on the **Bubble API**, which explores Bubble's API capabilities and security features in-depth:

Article series: [The Bubble API](/help-guides/integrations/api/the-bubble-api)
{% endtab %}

{% tab title="Videos (4)" %}

* Bubble Academy: [The Data Tab: Bubble Introduction Series \[7/10\]](https://www.youtube.com/watch?v=z0L8vFsCwkk)
* Bubble Academy: [How to Add a Data Type as a Custom Field | Bubble Quick Tip](https://www.youtube.com/watch?v=4txlG9nwr1E)
* Bubble Academy; [How to Instantly Modify Data With Autobinding | Bubble Quick Tip](https://www.youtube.com/watch?v=MamNYJmZjVY)
* Bubble Academy: [How to Name Your Data Types & Fields | Bubble Quick Tip](https://www.youtube.com/watch?v=XueeVCReuI8)
* Bubble Academy: [How to use the *Do a search for* expression](https://www.youtube.com/watch?v=-2_3kuyOxkw) (finding data in the database)
* Bubble Academy: [How to use search constraints](https://www.youtube.com/watch?v=gOjGDCJrXYI)
* Bubble Academy: [How to use *Ignore empty constraints*](https://youtu.be/6VEavvd4TG4)
  {% endtab %}

{% tab title="Books (1)" %}

* [The Ultimate Guide to Bubble Security](https://www.amliesolutions.com/books/the-ultimate-guide-to-bubble-security/) by Petter Amlie
  {% endtab %}
  {% endtabs %}

{% hint style="warning" %}
**Security note:** Although this section is categorized for intermediate-level builders, it's crucial to emphasize that privacy rules are the primary security measure for your app.

We highly recommend that all users understand how these rules work and never deploy an app containing sensitive data without implementing proper privacy rules.
{% endhint %}

This section of the [*Data* tab](#user-content-fn-2)[^2] provides security by allowing you to define rules to prevent users from seeing or modifying data they should not have access to. To do this, define rules for each of your custom types, if needed. When multiple rules apply, the user has access to an object if any one rule grants access to it.

<figure><img src="/files/r6mnv8BvqIbEFWs0KAfx" alt=""><figcaption></figcaption></figure>

### New rule

This button creates a new rule for the selected type. Name the type with an explicit name and define conditions and permissions. The condition defines which users this rule applies to, while the permissions define what they can do with the data if they meet the conditions.

### Name

Name the rule. Modify the name in this input.

### Delete

Clicking this icon deletes the rule. This action does not delete data. It only removes the rule for the selected type.

### When (condition)

Define the conditions that check whether a given user is part of the rule or not. Create a dynamic expression with the Composer, building it piece by piece. For example, if you define the condition for the type 'Event' as 'This event's creator is current user,' then only the user who created the thing of type 'event' will be part of that rule.

### Permissions

This defines what users in that current rule can do with the data.

### **Find this in searches**

Uncheck this box to prevent users who are in this rule to see the search results for this type.

### **View all fields**

Check this box for these users to be able to see all the fields of a thing of the current type, provided they meet the conditions. If you uncheck this box, you will be able to select which fields are viewable by users in this rule.

### Constrainable fields

Controls whether users in this rule can use a field as a search constraint.&#x20;

Whether this permission is visible and enforced depends on your app's [search privacy mode](/core-resources/application-settings/general#search-privacy-mode).

* In *Automatic* mode it applies to constraints that aren't defined on the app's pages, such as Data API searches.
* In *Strict* mode it applies to all constraints.
* In *Off* mode, all fields are required to be constrainable

### **View attached files**

If this box is unchecked, users will not be able to see the uploaded files attached to a thing of this type. For example, let's say you set up a workflow where users can create an 'Apartment,' and that apartment has pictures. Set up the picture uploader in a way that links the picture to the actual apartment in the database. Then, if you uncheck this box and if the condition is 'This apartment's creator isn't current user,' other users will not be able to see that picture, even if an image displays it or if a user has a link to the image file.

### **Allow auto-binding**

Bind the content of an input to a field of a thing. When the user modifies the content of the input, the thing gets updated automatically. See [Enable auto-binding on parent element's thing](https://manual.bubble.io/core-resources/data/pages/-MTpvq-NXMdec72uKH6T#Elements.GeneralInput.auto_binding) for input elements. You need to enable users to modify fields through a permission. Use 'Allow auto-binding.' Check this box to allow users to do this if they meet a condition. Once checked, choose from the different fields that can be modified through auto-binding.

### **Modify via API**

When the [Data API](#user-content-fn-3)[^3] is enabled for this type, this permission grants the user the right to modify any of the fields of this thing. For the modification to be allowed, the rule that governs this permission must be true both before and after the modification. This lets you restrict which fields may be modified. If you need more granular field restrictions, instead of granting this permission, use the Workflow API, which lets you control exactly what gets changed.

### **Delete via API**

When the [Data API](#user-content-fn-3)[^3] is enabled for this type, this permission grants the user the right to delete this thing via the API.

### **Create via API**

When the [Data API](#user-content-fn-3)[^3] is enabled for this type, this permission grants the user the right to create new things via the API. If the rule that grants this permission references fields on the thing, attempts to create a thing where the rule does not apply will be rejected.

### Note: Modifying data in the middle of a workflow

If you have an element that displays data only to certain users, that data could be briefly displayed to a user that does not have permissions if this user triggers a workflow that you as a developer have defined to modify that piece of private data and if the modification does not need to come from the server or a remote source such as an external API.

Fortunately, we have a feature for this use case. See [Scheduled Workflows](/help-guides/integrations/api/the-bubble-api/the-workflow-api/api-workflows/scheduling-api-workflows).

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: The *Data tab* is the part of the Bubble editor where you manage your app's data.

    Article: [The data tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/data-tab)

[^3]: The *Data API* can be enabled to give external apps and systems secure access to your app's database.

    Article series: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)
