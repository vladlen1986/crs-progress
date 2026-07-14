# The database editor
> Source: https://manual.bubble.io/help-guides/data/the-database/managing-data · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers Bubble's built-in database editor that lets you manage all the data in your app from one central place

Bubble comes with a built-in database editor. The App Data section in the Data Tab shows the application database, i.e., the actual data that you or your users have entered. It also has a few key tools to help you manage your data.

Note that Live and Development have different databases.

## Database views

The App Data tab is structured around the concept of database views, that are listed on the left side of the screen. A database view is a combination of three things:

1. The fields that are shown in the view (the columns in the table).
2. A sorting order.
3. Some optional search constraints to filter out some entries.

By default, Bubble adds a view for each data type that is defined in your application. They will show all entries (things) for each type, sorted by creation date.

When you click on the pen icon on the right of the list, you can modify the view. If it's a default view, a new view will be created and will be modified. You can then add/remove constraints. When a view is selected, the table will update and show things that meet the constraints (if any).

## Run as

When you are debugging your app, it can be useful to run your application as a specific user and see exactly what the user experience is for that user. When looking at the *User* data type in the database editor, each row has a *run as* link. Clicking this button will open a new tab and you'll see how the app looks and functions as if you were this user.

Note that until you log out, you'll be using the app as this user, so make sure you do not make changes that should not be done.

## New view

Clicking this button displays a popup that creates a new database view, which defines the fields that are seen on the right side of the screen. Constraints can be added to create a smaller list. By default, each type has a view that shows most fields with no constraints. The number of views is unlimited, and these views are shared between the Live and Development versions. It is recommended to use new views to build your own admin panel.

<details>

<summary>Video lessons</summary>

* [How to create new database views](https://youtu.be/yUB4r-BFzwo)

</details>

## Primary fields

Clicking this button opens a popup where you define which field is best to describe a thing in the table. For example, a user may be represented by their email, an apartment, an address, etc. This is for display purposes only within the App Data tab.

If you were to generate a CSV from a view in App Data with primary fields, you would see that chosen field in the appropriate column. This does not apply to workflow actions such as "Download data as CSV."

Ideally, you'll want to pick a field that uniquely represents a thing. For the user type, the email is a great choice, but for other types it depends on your data. As a last resort, the unique ID is always a safe choice as it is unique to the thing.

## Search

Enter something into the input box, and the things in the current view that contain the entered text or unique ID are listed. Use this for a quick search of the app data.

Note: When searching in App Data, some common words called “stop words” will be ignored based on your application’s default language.

{% hint style="info" %}
Search does not cover any fields which are linked data types (not even their primary fields). For example, if you have **Projects**, each with a field for the data type **Company**, and a particular **Project** is tied to Acme Corp, searching **Projects** for Acme will not return that result (unless "Acme" is in one of its other, non-data type fields).
{% endhint %}

## New entry

Clicking this button displays a popup where you create a new database entry. Choose the type of thing and enter information into the predefined fields. This is equivalent to using a 'Create a new thing' action in a workflow.

Note that the data editor currently does not allow modifying a list of things. If you need to modify such fields, building a data admin page in your app is a better option.

## Importing data

Clicking the *Upload* button displays a popup where you upload a comma-separated CSV file of data. The type of data and relevant fields should be defined in the app before importing the file. This feature is available to users with a paid Bubble plan.

Select the type of data and file to upload. Map the columns from the file to the fields of the data type and then validate and upload the data. This feature was recently improved and is now in a Beta testing phase.

Important: The first row of your CSV file must be a header row containing the names of the fields for the data. Here's [a sample file](https://s3.amazonaws.com/appforest_uf/f1454094816983x291920213727280500/normalfile.csv) for reference.

Data should be valid to be uploaded (a yes/no field should only have yes/no values). Bubble validates all data prior to any upload, if one row is failing, nothing will get created and uploaded to the database. Note that if you are uploading repeatedly large amounts of data, we recommend working with the [Bubble API](/help-guides/integrations/api/the-bubble-api) and use some scripts to create data, as it's a more scalable approach.

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

### Validate data

Clicking this button does a quick analysis of the data to be uploaded, to make sure the first couple of rows are valid.

### Upload data

Clicking this button uploads the data. First, it uploads the file to our servers. Then, it processes the upload in the background using your server capacity. While this happens, you are free to close the webpage and come back. An email will be sent on completion, or if there is an error while uploading.

Note: Only one upload or modify can occur at a time for a given application.

## Modify

You can bulk-modify data via a CSV upload. To do so, you should have a file with a column containing the unique ID of the things you want to modify, and enter the values that should be modified in subsequent columns.

## Export

This button generates a CSV file with the data of the current view. The file is exported to the Download folder of your browser. This file can be edited. Because the app owner performs this operation, no privacy rules apply, and all fields chosen in the current view are exported. This feature is available to users with a paid Bubble plan.

At this stage, the CSV file generation is done on the client; if you are exporting a large amount of data, we recommend using the Bubble GET API to read your database content with a script.

{% hint style="info" %}
**Tip:** Make sure your Scheduler is not paused before you export a CSV.
{% endhint %}

## Switch to live/dev database

Clicking this displays the Version dropdown menu to switch between the Development and Live versions of the app. Remember that each version has a separate database.

## Cleaning data

It’s important to keep your database clean from time to time, especially as you scale. Here are some tips on how you can easily and efficiently keep your database in good shape!

If you’re no longer using a data type, you can delete the data type in the Data types section in the Data Tab of your app. Click on the trash icon next to the data type. This will delete all database things of that data type throughout your database. Please note you cannot recover the data after it’s deleted.

If you’d like to delete individual database things, you can navigate to the relevant database view in the App Data section in the Data Tab of your app. If you’d like to filter the things you’d like to delete, you can create a new database view with the “New view” button and add constraints to filter the data. You can either individually click on database things one-by-one to delete, or you can use the checkmark at the top of the first row to select all database things in the view and bulk delete. Additionally, you can run a [bulk action](https://manual.bubble.io/help-guides/maintaining-an-application/bulk-operations) that calls an API workflow to delete database things iteratively.

## Other ways to learn

<details>

<summary>Video lessons</summary>

* [How to create new database views](https://youtu.be/yUB4r-BFzwo)

</details>
