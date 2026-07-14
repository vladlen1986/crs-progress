# Data (things)
> Source: https://manual.bubble.io/core-resources/actions/data-things · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Things are unique records in your database that can be created, edited and deleted with actions.

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for <mark style="color:green;">**beginner-level builders**</mark>**.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (15)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

#### Data

* Article series: [Data](/help-guides/data)\
  This article series covers all the types of data you can manage in Bubble, including (but not limited to) data stored in the database.
  * Article series: [The database](/help-guides/data/the-database)\
    This article covers how Bubble's database works, and you [create, edit, delete](/help-guides/data/the-database/creating-saving-and-deleting-data), [search for](/help-guides/data/the-database/finding-data), [import/export](/help-guides/data/the-database/export-import-data) and [structure your data types](/help-guides/data/the-database/database-structure-by-app-type) and things.

***

#### Privacy rules

Privacy rules are constraints that you can apply to data types to ensure that no one has access to data they are not supposed to. Understanding privacy rules is paramount if your app stores any kind of sensitive information.

* Article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

***

**Workflows and logic**

* Article series: [Workflows](/help-guides/logic/workflows)
  * Article: [Events](/help-guides/logic/workflows/events)
  * Article: [Actions](/help-guides/logic/workflows/actions)

Workflows is a part of the *Logic* series in the user manual:

* Article series: [Logic](/help-guides/logic)
  * Article: [The frontend and backend](/help-guides/logic/the-frontend-and-backend)
  * Article: [Dynamic expressions](/help-guides/logic/dynamic-expressions)\
    Dynamic expressions are used both to set up conditions, and are highly useful in different actions that you may want to add to your workflows.
  * Article: [Conditions](/help-guides/logic/conditions)\
    Conditions are used to determine whether a workflow or action should run or not, by checking whether something is true.
  * Article series: [Navigation](/help-guides/logic/navigation)\
    Using workflows to let the user navigate between pages and page sections.

***

#### Debugging

All apps have the occasional bug, and our debugging tools help you squish them efficiently. The debugger helps you go through workflows step by step to see how they perform and the values they return.

Article series: [Debugging your application](/help-guides/getting-started/navigating-the-bubble-editor/tools/using-the-debugger)
{% endtab %}

{% tab title="Videos (5)" %}

#### The database

* Bubble Academy: [Creating the Data Structure](https://www.youtube.com/watch?v=2NO1ET1bMLM)
* Bubble Academy: [How to Create New Database Views](https://www.youtube.com/watch?v=yUB4r-BFzwo)

#### Workflows

* Bubble Academy: [The Workflow Tab: Bubble Introduction Series \[4/10\]](https://www.youtube.com/watch?v=jbzl8EaAk_g\&t=3s)
* Bubble Academy: [Understanding Workflow Execution Rules](https://www.youtube.com/watch?v=IbhCrciOKHM\&t=41s)
* Getting started with Bubble: [Workflows and logic: Getting started with Bubble](https://www.youtube.com/watch?v=e-vhoR48QdY)
  {% endtab %}
  {% endtabs %}

## Create a new thing...

This action creates a new entry in the application database, which we refer to as a Thing.

For the "Type" in this action's property editor, select an existing data type from the dropdown or define a new one by selecting 'Create a new type…' in this menu.

For example, you might select 'Event' from your list of data types. Once you do, and this action runs, a new 'Event' *thing* will be created into your application database.

When you click "Set another field," you can either choose from an existing field on that data type or create a new one. For example, if we already created a field for "Event name" in our Data Types tab, we can select this option and set it equal to an input's value. If we want to create a new field for "Start time," we can do so by selecting "Create a New Field" directly from the bottom of this dropdown.

Once you run this action, you can also see the matching changes in your Data tab, under Data Types and App Data.

### Type

Choose the type of thing to create. Define a new type by selecting 'Create a new type...' in this dropdown menu.

### Initial values

Click 'Add another field' to add a new field and specify a different value for that field. Select the field to modify, the operation, and the new value.

## Make changes to thing...

This action modifies an existing entry in the application database. For example, if a user updates their first name, use 'Make change action' to the 'Current user's first name.'

### Thing to change

Select which thing to modify.

### Create if the thing doesn't exist

By default, this action does nothing if the thing you are trying to change does not already exist. Click this box to change this behavior. In this case, the action will be equivalent to 'Create a new thing' and will use the changes as initial values.\
\
Important: If the thing being changed, e.g., the 'Current user's thing,' does not exist, the thing will be created, but it will not be associated with the current user.\
\
Warning: This option has been deprecated on Jul 18, 2017. Applications created after this date will not be able to access it (but it will still be applied in run mode). Instead, users can use a condition on the action and create the thing if it does not exist in an action prior to the Change Thing action. We recommend users using this option to follow the same pattern as they upgrade their apps.

### Changes

Add the modifications to apply to the thing currently being modified. Select the field to modify, the operation, and the new value. In addition to a simple action that assigns a value, other options are available, depending on the field type. If it is a list, choose from:

### **Add**

Adds an item to the existing list. The type of thing should be of the same type as the field. If the item is already in the list, it will not be added.

### **Remove**

Remove an item from the existing list. The type of thing should be of the same type as the field. If the item is not in the original list, nothing will happen.

### **Set list**

Replaces the existing list with a new one. The value must be a list of items of the same type.\
\
The *Set list* action can also combine multiple lists, including duplicate values. For example, given two lists of letters, `[A, B, C]` and `[A, B, C]`, setting the list results in `[A, B, C, A, B, C]`.

### **Add list**

Adds all items from a specified list to an existing list. If any of the items are already present, they aren’t added again, ensuring no duplicate items are created.

### **Remove list**

Removes all the entries of the list defined from the existing list. If some items are not in the list, they will not be removed.

### **Clear list**

Deletes the content of the field and replaces it with an empty list.

## Make changes to a list of things...

This action is equivalent to 'Make changes to a thing' but modifies more than one entry. Define a list of things to change, and each entry will be modified as described in the list of changes.

### Type of things

Select the type of thing to modify. This is needed to test the type consistency with the actual list.

### List to change

Define the list to modify. It can either be the result of a search or the content of a field that is a list of things. If the type is inconsistent, the expression will be red, and the action will not complete.

### Changes

List the modifications to apply to the things currently being modified. Select the field to modify, the operation, and the new value.

{% hint style="warning" %}
We are aware that some users employ the "Make changes to a list of things" action to pre-load lists for later workflow reference. Note that this action immediately triggers the query and consumes workload, regardless of whether the results are used in a later step or if only part of the results are used. Because of the potential workload implications, we advise treating this as an advanced feature and using it cautiously.\
\
We are working on implementing the concept of a ‘workflow local variable’ to address this use case.
{% endhint %}

## Delete thing...

Deletes a thing from the database.

### To delete

Select which thing to delete.

## Delete a list of things...

This action is similar to 'Delete thing' but deletes more than one entry.

### Type of things

Select the type of thing to delete. This is needed to test the type consistency with the actual list.

### List to delete

Define the list to delete. It can either be the result of a search or the content of a field that is a list of things. If the type is inconsistent, the expression will be red, and the action will not complete.

## Copy a list of things...

This action duplicates a list of things.

Important: For performance and security reasons, the number of things in the initial list is limited to 100 entries. If the length of the list exceeds this, the action will do nothing.

### Type of things

Select the type of thing to copy. This is needed to test the type consistency with the list.

### List to copy

Define the list to copy. It can either be the result of a search or the content of a field that is a list of things. If the type is inconsistent, the expression will be red, and the action will not complete.

## Set a Thing's slug...

This action modifies an existing thing's slug value.

### Thing to change

Select the thing to modify.

### Slug \[Beta]

Specify the new slug value you want the thing to take.

## Download data as CSV

This action enables users to download data as CSV. Use this to build your own admin page. End users are prompted to choose a destination for the file. This feature is available to users with a paid Bubble plan.

### Type of data

Choose the type of data to export.

### Data source

Define the list to export. It can either be the result of a search or the content of a field which is a list of things. If the type is inconsistent, the expression will be red, and the action will not complete.

### File name

Enter a file name.

### Date formatting

Select the date style to use. Choose from Excel friendly, Full (with time zone), and Custom.

### Custom date format

Enter the custom date style to use.

### Separator

Select the separator to use in the CSV file.

### Include labels in first row

When this box is checked, the first row of the CSV file will include labels for the data.

### Use field captions instead of IDs

By default, field IDs, which cannot be changed, are used as the column headers. Change this by checking this box. In this case, the captions defined in the Data Types section in the Data Tab will be used instead.

Note: 'Include labels in first row' must be selected to include the labels in the CSV file.

### Wrap values in double quotes

When this box is checked, quotes are put around the data values.

### Hidden columns

Select which fields should **not** be included in the CSV file.

## Upload data as CSV

This action enables users to upload a CSV file and add the items in the application database. Each column should match a field of the selected type. The fields should be of type text, number, date, address, yes/no, or the unique id of thing in your database (type will be the data type of that thing). Uploading lists of things into one field must be uploaded as a JSON array. Currently, this action does not support uploading an array of things of another data type into one field (i.e. array of unique ids).

Important: This feature is available to users with a paid Bubble plan. This action is limited to uploading a maximum number of items at a time depending on your plan.

### Type of data

Select the type of data to upload.

### CSV file

Define the expression that points to the file to upload. Typically, it will use a file uploader element.

### Separator

Select the separator to use in the CSV file.

## Delete an uploaded file

This action deletes an uploaded file in your application storage. Only files uploaded by your application will be deleted. If the file is not found, the action will not do anything. Note that similarly to deleting files from the application editor, deleting a file does not modify things that refer to this file to wipe the URL at the thing level. If you wish to do this, you should do this first in your workflow.

Warning: Use this feature with caution as it permanently deletes your file. **You will not be able to recover the deleted files**.

### File URL

URL of the file to delete. It should look like <https://s3.amazonaws.com/appforest\\_uf//>... or <https://domain.com/fileupload/>... for private files. Note that if the current user does not have permission to read the file, he will not be able to delete it.

## Other ways to learn

<details>

<summary>User manual articles</summary>

If you want to learn more about how the database ands its related actions work, you can check out the more in-depth user manual article series below:

User manual article series: [Data](/help-guides/data)

If you are new to app development, you may also be interested in learning more about how to structure your database. The two article series below give an introduction to database structuring, as well as a wide range of examples that cover different types of apps, written by expert Bubble developers:

User manual article series: [Database structure](/help-guides/getting-started/building-your-first-app/database-structure)\
User manual article series: [Examples of database structures for different types of apps](/help-guides/data/the-database/database-structure-by-app-type)

</details>

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.
