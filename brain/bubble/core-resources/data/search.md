# Search
> Source: https://manual.bubble.io/core-resources/data/search · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark> to <mark style="color:orange;">**intermidiate level builders**</mark><mark style="color:green;">**.**</mark>

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (12)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### Finding data

* Article: [Finding data](/help-guides/data/the-database/finding-data)

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

These are the search options and operators to use when performing searches by using the `Do a search for` [data source](#user-content-fn-2)[^2].

### Ignore empty constraints

{% embed url="<https://youtu.be/6VEavvd4TG4>" %}
Our Academy quick tip on how to ignore empty constraints
{% endembed %}

* If this checkbox **is checked**, constraints using values evaluating to null will be ignored. In other words, if a constraint evaluates to null, all items will be returned.
* If this box **is not checked**, the search will only return items whose field's value is actually null. Note that this does not apply to the Advanced filter.

### Type

Select the [type of things](#user-content-fn-3)[^3] you looking for.

### Constraints

{% embed url="<https://youtu.be/gOjGDCJrXYI>" %}
Watch our Academy quick tip on how to use search constraints
{% endembed %}

Enter the different constraints[^4] to apply to this search.

{% hint style="info" %}
Text matching in the database is limited to the first 256 characters for indexing purposes. If you need to match text longer than 256 characters in a search, consider appending a "[filtered:](/core-resources/data/operations-and-comparisons#filtered)" with an advanced constraint, saying "\<this object>'s \<data field> = \<search criteria>". The reason you have to do an advanced filter is that it forces the expression to load all the items out of the database and do the full string match, rather than just the first 256 characters.
{% endhint %}

### Sorting field

Choose the field to sort the list. See also: [Additional sorting fields](#adding-additional-sorting-rules).

{% hint style="warning" %}
**Note:** Re-sorting a repeating group will immediately change all "current cell" values in any display elements that were dynamically derived from the current cell. Specifically, if you have a popup that opened to display "Current Cell's Thing's Info", this information is linked to the cell's index; the Thing will change when the repeating group is resorted. If there are visible elements that rely on "current cell's thing" as a data source, these will be updated once the group is re-sorted. This can result in changes in elements such as popups, group focus, or reusable elements that conditionally display information about the current cell.
{% endhint %}

### **Change which field......**

{% embed url="<https://youtu.be/n4yBRxHAPgk>" %}
Watch our Academy quick tip to learn how to sort a list
{% endembed %}

Select this option if you want the sorting field to be dynamic. When selected, another field will display and allow you to define the field. It can be dynamic and should match the name of an existing field. If it does not match, the application will show an error.

### **Random sorting**

Choose this option to randomize the order results. The random value is unique for each user and page load.

#### Dynamic data and random sorting

Once a random order is generated, it stays the same for the duration of the page session. It will only change if the page is refreshed or if the underlying data is modified, which triggers the search (and its sorting) to run again.

**Example 1:**

* A search for colors (random sorting) returns: red, yellow, green
* A field on “red” is updated (*Make changes to* action)
* Re-running the search may produce a new order, e.g. yellow, green, red

**Example 2:**

* A search for colors (random sorting) returns: red, yellow, green
* A new “blue” thing is created (*Create a new thing* action)
* Re-running the search may produce a new order, e.g. red, blue, green, yellow

This principle applies to all sorting types: results remain stable as long as the underlying data does not change. Any update or addition causes the search to re-execute and the ordering to be recalculated.

### Unsorted

Choose this option to return results without applying any sort order. This can improve performance, especially in larger databases when using the *text contains* operator.

This is available in the editor database custom views, but not yet rolled out to all the run-mode operators.

### Dynamic field name

If you want the search to be sorted according to a field chosen by the user, define an expression to define which field the search should use. For instance, the expression you design here should evaluate to 'Created Date' or some other fields you have defined in your type (it should match the displayed name of the field).

### Distance from

When sorting on a location field, results will be sorted by distance relative to a point. This field defines which point. Current position, an address, etc.

### Descending

Choose 'yes' to sort in descending order or 'no' to sort in ascending order. This option can be dynamic and defines an expression that returns a yes/no, e.g., a checkbox element.

### Adding additional sorting rules

When you need more than one sorting rule, click this button and select a field and a descending/ascending order for that field. The rules will be applied in the order listed.

### Any field

Performs a search across all the fields of the application database for a given type. For example, search for all entries with John as a first OR last name.

### Advanced

Performs more advanced searches. For example, to find all apartments whose creators have an email hosted by yahoo.com, use 'This apartment's creator's email:extract domain is 'yahoo.com.' This operation happens after the search or list is retrieved from the server and is not as efficient as using constraints on a search.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: A *data source* is any source from which Bubble can fetch data, such as a database search, the current user, the current date/time and an external API service.

    Reference: [List of data sources](/core-resources/data/data-sources)\
    Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)

[^3]: *Type* in this context means the type of database data you want to search for, such as *user* or any custom data type you have created.

    Article series: [The database](/help-guides/data/the-database)

[^4]: *Constraints* allow you to narrow down a search based on specific criteria. For example, if you have a field "name" on the user data type, you can search for all users whose name matches Jill/Joe.

    Article: [Finding data](/help-guides/data/the-database/finding-data)
