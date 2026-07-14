# Data Sources
> Source: https://manual.bubble.io/core-resources/data/data-sources · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark> to <mark style="color:orange;">**intermidiate level builders**</mark><mark style="color:green;">**.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (12)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

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

#### Securing the database

Database data is protected server-side by using privacy rules. These are conditions that are automatically applied every time a user tries to access a specific data type/field.

Article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)
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
  {% endtabs %}

Data sources are where you get your data from when building a [dynamic expression](#user-content-fn-2)[^2]. It is going to be the first section of the expression. Sources of data can be the current user, a search from the database, data from an external API, some page and browser information, etc.

## Current user

This represents the current user using the app. The user can either be logged in, in which case you have access to their email, etc., or logged out. If the user is logged out, you can still modify the user object, but once the user closes their browser, you will not be able to access the user's information.

### Signed up users

If a user has signed up to Bubble, a permanent entry is created in the database using this email and password. When a user opens your app in a new browser (without cookies) and enters their credentials through a login workflow, they will be logged in.

The value of `Current user is logged in` will return `yes`. If you modify the current user, this will be saved permanently on the database object, and if the user logs in on another device, he/she will have the changes applied to his account there as well.

One important consequence of this is that all users that can be found through searches in the database will be marked as 'logged in' on the server, as they are permanent accounts.

### Temporary users

As soon as a Bubble app is opened in a browser, a user session is created. If a user already logged in and hasn't cleared the cookies, the session will be using the same user as before, but in the case of a fresh session (without a logged-in user), a temporary user will be created. This user will be marked as 'not logged in' (in other words, 'Current user isn't logged in' will return yes).

The temporary user behaves like a signed-up user, in the sense that you can modify them, and it will be saved to the application database. If a user comes back using the same browser and hasn't cleared the cookies, any value that you have used to modify a field on the user will be the same. Bubble automatically clears temporary user data. After three days, such a user will be deleted, and when a user opens a session in the same browser, a new temporary user will be created, for three days.

When a user first visits an application, they will be seen as a temporary user. If they go through a sign-up workflow, the current temporary user will become a signed-up user and will be saved permanently in the database. This has some important consequences in terms of workflow design. Imagine you have a workflow that asks a user for their age before they sign up and saves it to the 'Current user'. If the user effectively signs up within three days, the permanent user that will be created then will have the same 'age'.

## Do a search for

{% embed url="<https://youtu.be/-2_3kuyOxkw>" %}
Our Academy quick tip on how to do a search for your data source
{% endembed %}

Use this to search for entries in the application database. Define what type of things to look for, which will either be User or a custom data type defined by you, and also specify a sorting order and constraints. The constraints can be on any field, such as name contains 'peter,' address is within 1 mile from the 'User's current position,' etc.

{% hint style="info" %}
Element data sources using *Do a search for* are synchronised with the database in real-time. This means that any changes happening in the database, even if made by another user, will be immediately visible in your app.

There's no need to manually update searches. The exception is if the initial search was fetched in a workflow.
{% endhint %}

## Perform a search using Algolia

Use this to search entries in your Algolia indices. Define the type you want to search across and what field to query, as well as the query itself

## Get an option

Get either a specific option from any option set, or a list of all options from that set.

## Arbitrary text

Use this to manually enter a static or dynamic string of text. The text entered will resolve to type `Text` and can be further modified with any of our text type operators.

## Arbitrary date/time

Use this to manually enter a date/time. Most human-readable formats can be parsed.

## Get data from an external API

This option fetches data from the outside world through one of Bubble's Plugins. For example, Google Places returns a list of places based on an address and a term, i.e., what you're looking for. Usually, an API call will require parameters. Define what they should be in the Slidable Palette. These parameters can be dynamic, using 'Insert dynamic data.'

The type of data this source returns depends on the plugin. It can be a list of places to display on a map or in a repeating group, a single entry to display in a group or text, etc.

## Parent group's thing / Current cell's thing

This is a way to refer to the `Parent element's value`. For example, when using a repeating group that displays a list of users, each cell will have a different user in it. The `Current cell's user` will represent that user. The type is the type of content of the container.

## Current cell's index

This allows access to the number of the current cell in a repeating group. The first cell will be 1, the second will be 2, etc. This is useful to display a rank or change the formatting of some elements based on the number.

## Current page thing

If you have set up a page to have a type of content, this source is a way to refer to it. For example, when building a rental marketplace, you will likely have a page with the details of each apartment. This page will have a type of content 'Apartment,' and then a link will open that page sending a given 'Apartment' to it. Refer to the '`Current page's apartment`' with this option. Then, you will have access to all the data that the apartment has, such as picture, address, etc.

## Element

This source is a way to refer to an element and access its states, like hovered, value, etc. For example, this is how to get an input's value.

## This element

This source is a shortcut to find the current element being editing. You then have access to its states.

## Result of previous step

When an action produces an output, subsequent steps in the same workflow can reference it as *Result of step X*. For example, after a *Create a new thing* action creates a new record, later steps can reference that record directly.

```
Event → Action (step 1) → Result of step 1
Button ("Save form") → Make changes to the current user → Result of Step 1' First name
```

In this example, the workflow starts with a button click, then saves changes to the current user in step 1. Step 2 uses *Result of step 1* to reference the same user and fetch their first name.

## Current Workflow thing

When using custom workflows, you may want a workflow to modify an object you sent to it. The Current Workflow thing is this object. Its type will be the type of the custom workflow being used.

## Thing now

Thing Now represents the new state of the data after a data change, used in the context of a data change trigger workflow. It's up to date with the latest state of the thing and can change over the course of the workflow.

## Thing before change

When the data changes, you may want to access the old state of the data throughout your data change trigger workflow. Thing Before Change is the data from before the data change.

## Get data from page URL

This source is a way to capture the value of a parameter in the URL of the current page or path. For example, the current page's URL is `yourdomain.com/yourpage?age=23` Set the source to get the 'age' parameter, and in Live mode, that will return 23. When specifying a parameter, it is case sensitive. We recommend using all lowercase and avoiding special characters, spaces, etc.

If you select path, you can retrieve `hello` in the URL `yourdomain.com/yourpage/hello`. Choose the type of data that this parameter should have, and then use this data as such in the Bubble Editor. If you choose a type of data that is a custom type or the type User, the value of the parameter in the URL should be the thing ID, not its [slug](/help-guides/logic/navigation/page-slugs). Caution: This is an advanced feature.

{% hint style="warning" %}
**Note**: Because URLs only allow some characters, special characters are encoded with a percent symbol preceding an identifier for that character. For example, spaces may become `"%20"` in the browser.

When using the Get data from page URL operator to extract a parameter with a space in it, we will return the parameter as it appears in the URL, not as it is normally written . For example, we we wanted to extract the value of "param" from the following URL:

`website.com/mypage?param=my%20parameter => my%20parameter`

However, when using the Get data from page URL operator to extract the path, we will return the path parsed as it is normally written, not as it appears in the browser. For example, if we wanted to extract the path from the following URL:

`http://website.com/mypage/this%20path => this path`
{% endhint %}

## Current option/thing

Some elements allow access to the current option. For example, when using a dropdown element with dynamic options, e.g., users, you want to define how to name the different options. Choose 'Current option's email' to have the dropdown menu show a list of the users' emails.

## API workflow parameters

These are the different parameters the API workflow has access to. When working on an API workflow, define parameters at the Event level with a value. Choose the relevant entry in the top section of the dropdown menu to access the value of the parameter.

## Calculate formula

{% hint style="warning" %}
**Note on inputs:** any inputs referenced in the *Calculate formula* properties will automatically change [content format](#user-content-fn-3)[^3] to *decimal.*
{% endhint %}

This data source opens up for some more sophisticated numerical calculations, like loan interests.

### Calculate loan payment

Calculate loan payment gives access to the following fields:

1. **Rate**: The annual interest rate of the loan.
2. **Nper**: The number of periods. This refers to the total number of payments to be made on the loan.
3. **Pv**: Present value. This refers to the principal amount of the loan—the total amount of money being borrowed.

This returns a [**number**](#user-content-fn-4)[^4].

### Coordinates to address

This formula converts graphic coordinates into a humanly-readable address (sometimes known as *reverse geocoding)*. It gives access to the following fields:

1. **Latitude**: Latitude specifies the *north-south position* of a point on the Earth's surface.
2. **Longitude**: The longitude specifies the east-west position of a point on the Earth's surface.

#### Coordinate format

Bubble uses the Google Maps API to convert coordinates to addresses. The coordinates have the following format:

* **Latitude**: Values are between -90.000000 and 90.000000. Negative values represent latitudes south of the Equator, while positive values represent latitudes north of the Equator.
* **Longitude**: Values range from -180.000000 to 180.000000. Negative values are longitudes west of the Prime Meridian, and positive values are east of the Prime Meridian.

This returns an [**address**](#user-content-fn-5)[^5].

### Generate random string

{% hint style="warning" %}
**Note**: strings generated with the *Generate random string* formula are not [cryptographically secure](#user-content-fn-6)[^6].
{% endhint %}

This data source generates a random string, with the length, and consisting of the type of characters, that you assign in its settings.

* **Use letters:** the string will randomly contain English letters from A-Z
* **Use non-capitalized letters:** the characters in the string will vary randomly between capital and non-capital letters
* **Use numbers:** the string will randomly contain numbers
* **Use special characters:** the string will randomly contain characters like @ and $

This returns a **text** string.

### Calculate sumproduct

In a sumproduct calculation, corresponding numbers from two lists are multiplied together, and the resulting products are then summed. For example, if List 1 is $$\[a,b,c]$$ and List 2 is $$\[x,y,z]$$, then the sumproduct is calculated as $$ax+by+cz$$.

You can spell out the formula like this:

$$
a 
1
​
 ×b 
1
​
 +a 
2
​
 ×b 
2
​
 +⋯+a 
n×bn
$$

For instance, let's assume a list *a* and *b*.

* a = 1,2,3,4,5
* b = 6,7,8,9,10

This would result in:

$$
1×6+2×7+3×8+4×9+5×10
$$

Calculating each term, we get:

$$
6,14,24,36,50
$$

Adding these together gives the sumproduct:

$$
6+14+24+36+50=130
$$

This operation is useful in various quantitative fields such as finance, statistics, and data analysis, where it can be used to perform weighted calculations and other similar tasks.

* **List 1:** expects a list of numbers
* **List 2**: expects a list of numbers

This returns a [**number**](#user-content-fn-4)[^4].

## Page data

This source allows access to the page information.

## **Website home URL**

This returns the home of the app. If the user is on `https://yourdomain.com/a_page`, it will return `https://yourdomain.com/`.

## **This URL**

This returns the exact URL of the current page.

{% hint style="info" %}
**Tip:** If you use this as a data source on your live app, use this on yourdomain.com rather than `yourdomain.com/version-live/` to prevent `/version-live/` from being included in this link.
{% endhint %}

## **Current language**

This returns the current language the app is using. This can be controlled in a few ways, by order of priority:\
– `lang` parameter: Set `&lang=english`, for instance, as a querystring in the URL.\
– A field on the current user: If you set a field in the Languages section in the Settings Tab and modify this field for the current user, this value will be the current language.\
– The app's primary language: Defined in the *Languages* section in the *Settings* tab.\
\
In each case, if the value returned is not one of the available options as shown in the dropdown menu in the Languages section in the Settings Tab, the next option will be used.

## **Current page name**

This returns the current page name. Use it in reusable elements, so that the element can have knowledge of the page it is used in.

## **Website admin email**

This returns the admin email of the app. Without a paid Bubble plan or domain, the email will be \[your-appname]<-no-reply@bubbleapps.io>. With a paid Bubble plan and domain, the email will be what is set in the Domain & Email section in the Settings Tab. Use this instead of hardcoding the email because it can change over time, such as signing up for a paid Bubble plan.

## **Current date/time**

This returns the current time on the user's computer. The type is date.

**Notes:**

* In Bubble, time/date data always includes both the time and the date. This means that the “Current date/time” data source returns the precise date and time at the moment it is executed.
* This data source captures the exact time at which it is called and does not update automatically. To get the current date and time again, you must call the data source anew.

## **Current geographic position**

This returns the current geographic position of the user, provided it is shared. The browser will prompt the user to do so. The type is geographic address.

{% hint style="warning" %}
Using `Current geographic position` relies on the user enabling geolocation in their browser. In many browsers, this is disabled by default. As such, you want to instruct the user to enable location data in their browser settings.
{% endhint %}

## **Link to Google maps**

This data source is used after a valid geographic address value, and returns a URL to Google maps, pointing to the specific address.

## **Current page width**

This returns the page width in pixels.

## **Current page scrolling position**

This returns the number of pixels between the top (0) and current page scroll position in pixels.

## **Page loaded above fold**

This returns no/false initially, and then true when every element is visible above the fold, i.e., visible given the height of the user's web browser and has finished loading any data needed to display it.

Use this to selectively cover things up until the entire page is ready to be displayed to avoid ugly loading artifacts.

{% hint style="warning" %}
Elements that are invisible on page load may not start loading until they are made visible, regardless of where on the page they are located.
{% endhint %}

## **Page loaded (entire)**

This returns `no` initially, and then true when every element is visible on the page and has finished loading any data needed to display it. Use this to selectively cover things up until the entire page is ready to be displayed to avoid ugly loading artifacts.

{% hint style="warning" %}
Elements that are invisible on page load may not start loading until they are made visible, regardless of where on the page they are located.
{% endhint %}

## **Is** Dev environment <a href="#isnt-live-version" id="isnt-live-version"></a>

This returns `yes` when the app is in any branch[^7] of the Development environment[^8].

## **Branch name** <a href="#app-version" id="app-version"></a>

This returns the current branch[^7] name. The Main branch is always called *version-test*.

## Application Text

When handling more than one language for the app, define Text IDs and use them in the Bubble Editor. Then, set the language in the Languages section in the Settings Tab.

## Incompatible type for inputs

If an input doesn't have the right type of data, you will not be able to choose it in the dropdown menu. For example, when you want to do a search on the creator of the thing you're searching and want the creator to equal the value of a dropdown menu that lists users.

If you haven't set the type of the dropdown element to user properly, you will not be able to select it. The way to select it is to change the type of element at the Dropdown element level.

## Current workflow error's

### code

The `current workflow error's code` data source becomes available when you use the *An unhandled error occurs* or *An element has an error running a workflow* events. The data source can be used to determine which error is being returned.

### message

The `current workflow error's message` data sources becomes available when you use the *An unhandled error occurs* or *An element has an error running a workflow* events. The data source can be used for purposes such as displaying the error on the screen or saving it in the database.

{% hint style="info" %}
You'll find a list of all workflow error codes, as well as their error message, in the *Settings - Language* tab. Here you can also change the message being displayed.
{% endhint %}

{% hint style="warning" %}
The *code* data source is static in all circumstances, as opposed to the *message*, which can be customized or change if the language in your app changes. Because of this, you should always use the *code* to identify errors.
{% endhint %}

## Use global expression

The *Use global expression* data source lets you access global expressions that you've set up in *Global – Global expressions*. Expressions are listed with the name you provide in the Global expressions section, and after selecting you can configure its parameters.

## Has granted location permission

Returns yes or no depending on the user’s permission status. See more in the core reference entry for [on-device resources](/core-resources/on-device-resources).

## In-app purchases

Bubble adds native data sources that expose subscription products and a user’s subscription state in a safe, high-level way. These data sources are designed to support common subscription UI and logic without requiring direct access to system tables.

Bubble exposes high-level data sources that surface a user’s subscription state safely and consistently.

### **All Subscription Groups**

Returns a list of all subscription groups defined for the app.

Use this when you want to:

* Build a pricing page that lists all subscription offerings
* Iterate through groups and display tiers/variants inside each group

### **Subscription Item**

Returns a single IAP object (Subscription Group, Subscription Tier, or Billing Variant). This is similar to selecting a single option in an Option Set.

Use this when you want to:

* Display details for a specific plan or billing option
* Pass a specific billing variant into a workflow action

### **Current user’s active subscriptions**

Returns a list of Subscription Purchases for the current user that are currently active.

This data source is backed by the Subscription Purchases system table and automatically filters to records where the subscription is active.

Returns

* A list of Subscription Purchase records

Common use cases

* Displaying all subscriptions a user currently has
* Building account or billing overview pages
* Debugging or inspecting subscription state

Notes

* This returns Subscription Purchases, not subscription groups or tiers
* For access control and UI gating, prefer the subscription operators described below

### **Current user’s subscription in…**

Returns the active Subscription Purchase for the current user within a specific Subscription Group.

Arguments

* Subscription Group (required)

Returns

* Returns the active subscription purchase for the given group, if one exists
* Returns empty if the user has no active subscription in that group
* By design, a user can only have one active subscription per subscription group

Common use cases

* Showing plan details for an active subscription within a specific group without having to dynamically filter the list

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: *Dynamic expressions* are like live formulas that let you find, aggregate and manipulate data.

    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^3]: The *content format* property of an input form specifies the type of format the input expects, such as text, numbers, decimals, etc.

[^4]: A number is numerical value in US standard format, meaning that the **period** **(.)** is used to separate the integer part from the fractional part of a number (e.g., 1234.56).

[^5]: An *address* is a humanly readable text string that's also compatible with Google Maps ands its API.

    For example, the White House's address is 1600 Pennsylvania Avenue NW, Washington, DC 20500, United States.

[^6]: Not being *cryptographically secure* means that the string can potentially be predicted or reproduced by someone else because it does not use sufficiently random algorithms that meet the standards necessary for secure encryption.

    As such, they are theoretically vulnerable, and should not be used for security-sensitive purposes.

[^7]: A branch is an independent iteration of your application that can be developed in isolation.

    You can see the creation of a branch as splitting your app into two copies, kind of like two cells dividing. The cells are genetically identical clones at first, but can keep evolving independently of each other.\
    \
    Article: [Version control](/help-guides/maintaining-an-application/version-control)

    Article section: [Environments and branches](#environments-and-branches)

    Reference: [Version control](/core-resources/bubbles-interface/version-control-deployment)

[^8]: All apps consist of two environments: Live and Development. Live is the one your users see live on the web, Development is the one where you edit your app before deploying.\
    \
    Article: [Version control](/help-guides/maintaining-an-application/version-control)
