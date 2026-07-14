# Data tab
> Source: https://manual.bubble.io/core-resources/bubbles-interface/data-tab · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% tabs %}
{% tab title="Experience level" %}
This core reference entry is suited for **beginner-level builders.**

[Learn more about experience levels.](#user-content-fn-1)[^1]
{% endtab %}

{% tab title="In-depth articles (5)" %}
To learn about this topic more in-depth, we recommend reading the suggested articles below:

**The data tab**\
In this article we cover the different tools available in the data tab.

Article: [The data tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/data-tab)

**Data**\
In this article series, we cover how to work with different types of data in Bubble:

Article series: [Data](/help-guides/data)

**Preview your app as a user**

In this section about how to [preview your app](#user-content-fn-2)[^2], we cover how to run it as a specific user in your database, using the *Run as* feature.

Article section: [Run your app as a specific user](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app#run-as-a-specific-user)

#### Files

In this user manual article, we cover how to work with upladed files in Bubble. The second article covers elements[^3] that allow your users to upload files and images.

Article: [Files](/help-guides/data/files)\
Article: [File and image upload elements](/help-guides/design/elements/web-app/input-forms/file-uploads)
{% endtab %}

{% tab title="Videos (1)" %}
Bubble Academy: [The Data tab: Bubble Introduction Series](https://www.youtube.com/watch?v=z0L8vFsCwkk)
{% endtab %}
{% endtabs %}

The Data Tab manages the data that users create when using the app. It is where you configure and see the data within your app's database. It consists of a number of sub-tabs.

## Data types

This section is where you define the data types that your app has - the kinds of things that you want to store data about in your database. The list of existing data types is listed on the left, along with a place to create a new data type.

When a data type is selected, its fields are shown on the right side, along with the ability to create a new field on that data type.

{% hint style="warning" %}
Note that the structure of an app's data types is visible in your app's [JavaScript code files](#user-content-fn-4)[^4]. This includes:

* data type names
* field names
* default values

Don't include any sensitive information in these fields. You can read more about how to maintain your app's security and privacy in the user manual article series below:

User manual article series: [Security](/help-guides/security)
{% endhint %}

### Make this data type private

When creating a new data type, you have the option to make it private or public. If the data type is made private, it will be created with a privacy rule that allows only a thing's creator to view all fields, find the thing in searches and view attached files, with the "Everybody else" permission set to nothing allowed.

If instead the data type is created as public, things of the type will be visible by everyone.

User manual article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

## Privacy

This sub-tab is where you define rules around which users can see different kinds of data, or under which situations a user can see the data. Privacy rules are very important for the data privacy of your app! By default, new data types are generally visible to all end-users, so it's important to set privacy rules before you begin handling real end-user data.

User manual article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

## App data

This section shows you the data in your app's database. You view the data by data type, and you can create custom views of a data type to show a specific set of fields as columns, a filtered subset of data, sorted data, etc.

Note that the development and live versions of your app have separate databases, so you need to switch between them in the upper right in order to see the respective data. You can also create, modify or delete specific things (rows) in the database, or do bulk upload, export or modify actions.

User manual article: [The data tab](/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/data-tab)\
User manual article: [Data](/help-guides/data)

#### Data sorting and performance

Custom database views can use an **Unsorted** option in their sorting settings. This disables sorting entirely and can significantly improve performance when working with large tables in the editor.

Unsorted views do not follow a consistent sort order but are useful when filtering down to narrow result sets. In many cases, these searches perform faster than their sorted counterparts.

To use this option, create a new custom view and select **Unsorted** under sorting. Existing views and the default view (which sorts by descending Created Date) are not affected.

### Run as

When looking at the user table, clicking the button 'Run as' runs the app as if you were that user, which makes debugging particular cases much easier.

Warning: Until you logout, you are using the app as this user, so do not make modifications.

User manual article section: [Run your app as a specific user](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app#run-as-a-specific-user)

### New view

Clicking this button displays a popup that creates a new database view, which defines the fields that are seen on the right side of the screen. Constraints can be added to create a smaller list. By default, each type has a view that shows most fields with no constraints. The number of views is unlimited, and these views are shared between the Live and Development versions.

### Duplicate views

Click the "Copy" icon next to the name of an existing database view to create another view just like it. You can then modify and add additional constraints to the duplicate.

### Search

Enter something into the input box, and the things in the current view that contain the entered text are listed. Use this for a quick search of the app data.

### New entry

Clicking this button displays a popup where you create a new database entry. Choose the type of thing and enter information into the predefined fields. This is equivalent to using a 'Create a new thing' action in a workflow.

{% hint style="warning" %}
**Note:** If you are uploading a file directly in App Data when creating or modifying an entry, there is a maximum file size of 50 MB. You can use the file uploader element instead to upload files up to 5 GB, although most browsers have an unofficial limit of 2 GB. Bigger uploads than this may be unreliable.
{% endhint %}

### Upload

Clicking this button displays a popup where you upload a comma-separated CSV file of data. The type of data and relevant fields should be defined in the app before importing the file. This feature is available to users with a paid Bubble plan.\
\
Select the type of data and file to upload. Map the columns from the file to the fields of the data type and then validate and upload the data.

Important: The first row of your CSV file must be a header row containing the names of the fields for the data. Here's [a sample file](https://s3.amazonaws.com/appforest_uf/f1454094816983x291920213727280500/normalfile.csv) for reference.

### Modify

You can bulk-modify data via a CSV upload. To do so, you should have a file with a column containing the unique ID of the things you want to modify, and enter the values that should be modified in subsequent columns.

### Export

{% hint style="info" %}
This feature is available to users with a paid Bubble plan.
{% endhint %}

This button generates a CSV file with the data of the current view. The file is exported to the Download folder of your browser. This file can be edited. Because the app owner performs this operation, no privacy rules apply, and all fields chosen in the current view are exported.

When the operation is done, an email is sent to the user who initiated the operation.

### Bulk Action

Clicking this button displays a popup that runs an API workflow on the entries in the current view. This is useful when you want to modify a list of things in the database. Select the API workflow you want to run. The workflow takes only a thing as a parameter.

Warning: This operation permanently modifies the data. If processing many entries, this may take some time.

### Switch to Live/Switch to Dev.

Clicking this displays the Version dropdown menu to switch between the Development and Live versions of the app. Remember that each version has a separate database.

### Copy and restore database

Clicking this button opens a popup to overwrite the Live version of the data with the Development version, and vice and versa. Use this to test the app with real data or migrate the Development version data to the Live mode.\
\
For users with a paid Bubble plan, the application database can be restored to an earlier point in time. The restore functionality is designed to recover from mistakes that corrupt or delete big chunks of data. It restores the complete state of the database, including all the users' account information, a list of images, scheduled workflow runs, etc.

Warning: Any data created after the restored version will be deleted. This option should be used only in catastrophic situations where it is better to revert to a previous database than to work with the current database. Restore operations are reversible. Simply perform another restore to the point in time right before the first restore.

#### Wiping the database change history

You can delete the database change history of each individual database (Development/Live) by using the *wipe database change history* feature in the *Copy and restore database* popup.

{% hint style="danger" %}
Erasing the change history is **irreversible** and **permanently deletes the database backups**. Exercise caution when using this feature. Unless you fully understand the consequences and have a clear reason to use it, we advice you to not go through with it.

You can read more about what this does, and its advantages and drawbacks in the user manual article below:

Article: [Wiping the database change history](/help-guides/maintaining-an-application/database-maintenance/wiping-change-history)
{% endhint %}

User manual article: [Restoring backups](/help-guides/maintaining-an-application/database-maintenance/database-copy-and-backups)

### Primary fields

Clicking this button opens a popup where you define the primary field for each of the data types. This determines the way the data is displayed and how the CSV files are generated. For example, a user may be represented by his email, an apartment, an address, etc. This is for display purposes only.

### Refresh data

Refresh to view recent changes to your data, especially as the result of a backend workflow or database trigger event.

### Load 50 more items

Click here to display an additional 50 rows in this database view.

## Upload data as a CSV

<details>

<summary>Related articles</summary>

* Article: [Importing data](/help-guides/data/the-database/export-import-data/importing-data-csv)
* Article: [Exporting data](/help-guides/data/the-database/export-import-data/exporting-data)

</details>

This popup uploads existing data from a CSV file. CSV is a standard way to represent rows and columns of data in a text format. Microsoft Excel, for example, generates these files. This feature is available to users with a paid Bubble plan.

{% hint style="info" %}
Note: This feature is now in public Beta and some limitations may exist.

For example, there is a minor inconsistency in formatting between how Bubble exports a list`"x , y , z"`and the list format it requires on import`"[x , y , z]"`.
{% endhint %}

### Type of data

Select which type of data to upload. The type of data and relevant fields should be defined in the app before importing the file.

### Data delimiter

Commas are typically used to delimit entries, but different delimiters are possible. Tab or pipe delimiters are useful when working with text that includes commas. Choose the delimiter in the application creating the CSV file.

### Pick a file to upload

Select a CSV file to upload.

### Map fields

This very important step is where you map the columns of data to the fields in the application database.

### Custom field

Select a data type field in the dropdown menu for each column of data. These fields should be defined in the data type before the upload.

### Composite field

If the field you're matching the column with is a custom type, then specify which field of the subtype should be used to match the text entry. For example, let's say you're uploading a list of apartments, and one of the fields is an owner. If the owner is represented by a last name in the CSV file, choose 'Last name' as the composite field. The entries should exist in the database before you upload the file. If two entries in the Bubble application database match the same value, an error will be returned.

### List delimiter

This is the delimiter to use when a field is a list of things. It should be different from the main delimiter. For example, if ';' is used as the delimiter, the data should be in this form: 12;54;32;67.

Note: When importing data for type list, optionally enclose the list in '\[' and ']', and then separate the individual items with the delimiter. For example, "\[kitchen; bedroom; bathroom]", or "kitchen; bedroom; bathroom".

### Overwrite data when the field value is empty

When unchecked, empty entries in your CSV for a field will be ignored. When checked, instead they will explicitly overwrite the existing value with an empty value. In both cases, unmapped fields are ignored and will not be overwritten.

### Validate data

Clicking this button does a quick analysis of the data to be uploaded, to make sure the first couple of rows are valid.

### Upload data

Clicking this button uploads the data. First, it uploads the file to our servers. Then, it processes the upload in the background using your server capacity. While this happens, you are free to close the webpage and come back. An email will be sent on completion, or if there is an error while uploading.

Note: Only one upload or modify can occur at a time for a given application.

## Option sets

<details>

<summary>Related articles</summary>

* Article: [Option sets](/help-guides/data/static-data/option-sets)\
  What option sets are, and how they work.

</details>

Option sets are lists of a given set of options that are defined by you for use throughout your app. Examples would include things like a pre-defined list of statuses that tasks can go through, a list of all countries in the world, types of user privilege levels, etc. Unlike data, the options in an option set cannot be added to, deleted or modified by an end-user - they are defined as part of the app. This sub-tab is where you manage your option sets: which sets exist, the specific options in a set, and any additional attributes you've created on a set.

User manual article: [Option sets](/help-guides/data/static-data/option-sets)

## File manager

<details>

<summary>Related articles</summary>

* Article: [Files](/help-guides/data/files)\
  How to upload and manage files in Bubble.

</details>

The File Manager section in the Data Tab shows the files or images that you or your users have uploaded in either the development or live version of your application. These are stored separately from the defined data types or option sets, and you can manage them here.

{% hint style="info" %}
**Note:** Apps on free plans do not have the ability to upload `.html` file types. If you need to upload an `.html file` type for your app's use case, consider upgrading to a Paid plan.
{% endhint %}

### File name

The name of this file when it was uploaded to your application. Enter a name to search for a specific file.

### Only private files

If this box is checked, only files attached to a data type, and therefore controlled by that type's privacy rules, will appear in your list of files.

### File type

Limit the displayed files based on type, for example, show only jpegs, pngs, or PDFs.

### Sort by

Choose whether to sort by file size or created date, and check the "Descending" box to largest to smallest files, or most to least recent.

### Search

Click this button to apply your search constraints for file name, private files, file type, and sort by field.

### Size

The size of the uploaded file in bytes.

### Type

The format of the uploaded file, such as csv, css, jpeg, png, pdf, or ttf.

### Uploaded date

The time at which the file was uploaded.

### User ID

The unique ID of the user who uploaded the file.

### Attached to

For private files, the unique ID of the thing this file is attached to.

### View

Click this link to preview the uploaded file. When you click this from the File Manager, you have admin access and will also be able to view private files.

[^1]: In the Bubble docs, experience levels are categorized into beginner, intermediate, and advanced.

    To assist with learning, especially for more complex topics, we'll recommend prerequisite reading where it could be beneficial.

[^2]: Every chance that you make in your app can be instantly previewed so that you can see how your app looks to your users.

    User manual article: [Previewing your app](/help-guides/getting-started/navigating-the-bubble-editor/previewing-your-app)

[^3]: *Elements* are the objects that you place on a page to design your app, such as text, images, buttons, icons, maps and calendar&#x73;*.*

    User manual article series: [Elements](/help-guides/design/elements)<br>

    Reference: [Elements](/core-resources/elements)

[^4]: Even though Bubble apps are built without code, the final result is a collection of HTML, CSS and JavasScript files that browsers can recognize and run. These files can contain information about your app in plaintext.

    User manual article series: [Security](/help-guides/security)
