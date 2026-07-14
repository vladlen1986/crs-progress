# Database actions
> Source: https://manual.bubble.io/core-resources/bubble-workflows/bubble-actions/database-actions · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Copy a list of things

This action duplicates a list of things.

{% hint style="warning" %}
For performance and security reasons, the list is **limited to 100 entries**. If the list exceeds this limit, the action does nothing.
{% endhint %}

### Type of things

The type of thing to copy. This is needed to check type consistency with the list.

### List to copy

The list to copy. This value must:

* Return a list of things
  * To copy only one thing, you can use the [`:converted to list`](#user-content-fn-1)[^1] operator, so that Bubble returns a single entry as a list of one.
* Match the data type selected in [Type of things](#type-of-things)

***

## Create a new thing

This action creates a new entry in the database.

### Type

The type of thing to create. Select an existing type or define a new one by selecting *Create a new type* in the dropdown.

### Fields

The fields to set on the new thing. For each change:

* Click the plus symbol to pick a field
* Select the field to modify
* Assign a value

You can also click the *Add all fields* option to add all the existing fields on that data type.

***

## Delete a list of things

This action deletes multiple entries from the database at once. This value must:

* Return a list of things
* Match the data type set in [Type of things](#type-of-things-1)

### Type of things

The type of thing to delete.

### List to delete

The list of things to delete.

***

## Delete an uploaded file

This action deletes an uploaded file from your app's storage. Only files uploaded by your app can be deleted. If the file isn't found, the action does nothing.

Note that deleting a file doesn't update any things that reference that file's URL. If you want to clear the URL at the thing level, do that in an earlier workflow step before running this action.

{% hint style="warning" %}
This action permanently deletes the file. Deleted files can't be recovered.
{% endhint %}

### File URL

The URL of the file to delete. It should follow the format `https://s3.amazonaws.com/appforest_uf/...` or `https://domain.com/fileupload/...` for private files.

When referencing a field of type *Image* or *File*, Bubble will return that file's URL.

{% hint style="info" %}
If the current user is prohibited by privacy rules to read the file, they won't be able to delete it either.
{% endhint %}

***

## Delete thing

This action deletes a single entry from the database.

### To delete

The thing to delete.

***

## Download data as CSV

This action lets users download data as a CSV file. Users are prompted to choose a destination for the file. This action is available on paid Bubble plans.

### Type of data

The type of data to export.

### Data source

The list to export. It can be the result of a search or the content of a field that is a list of things. If the type is inconsistent, the expression will turn red and the action won't complete.

### File name

The name of the exported file.

### Date formatting

The date format to use in the file. Choose from *Excel friendly*, *Full (with time zone)*, and *Custom*.

### Custom date format

The custom date format to use. Only visible when *Date formatting* is set to *Custom*.

### Separator

The separator character to use in the CSV file.

### Include labels in first row

When checked, the first row of the CSV file includes column labels.

### Use field captions instead of IDs

By default, column headers use field IDs, which can't be changed. Check this box to use the captions defined in the *Data Types* section of the *Data* tab instead.

{% hint style="info" %}
*Include labels in first row* must be checked for labels to appear in the file.
{% endhint %}

### Wrap values in double quotes

When checked, all data values are wrapped in double quotes.

### Hidden columns

The fields to exclude from the CSV file.

***

## Make changes to a list of things

This action works like *Make changes to a thing* but applies the same changes to multiple entries at once. Define the list of things to modify, and each entry is updated as specified.

{% hint style="warning" %}
This action triggers the query and consumes workload immediately, regardless of whether the results are used in a later step or only partially used. Treat this as an advanced feature and use it with care.

We're working on a workflow local variable feature to better support this use case.
{% endhint %}

### Type of things

The type of thing to modify. This is needed to check type consistency with the list.

### List to change

The list to modify.

### Fields

The fields to modify on each thing returned by the list. For each change:

* Click the plus symbol to pick a field
* Select the field to modify
* Assign a value

You can also click the *Add all fields* option to add all the existing fields on that data type.

{% hint style="info" %}
**Data source:** The *Make changes to a list of things* opens up a new data source in field expressions: `This thing's [...]`.

\
**Example:**\
Use this data source to reference the specific thing currently being processed in the list. For example, to combine a user's first and last name into a single *Full name* field, you'd set up the dynamic expression as *`This user's First name This user's Last name`*.
{% endhint %}

***

## Make changes to thing

This action modifies an existing entry in the database.

### Thing to change

The thing to modify.

### Fields

The fields to modify on the specified thing. For each change:

* Click the plus symbol to pick a field
* Select the field to modify
* Assign a value

You can also click the *Add all fields* option to add all the existing fields on that data type.

***

## Set a thing's slug

This action updates the slug[^2] value of an existing thing.

### Thing to change

The thing to modify.

### Slug

The new slug value to assign to the thing. Slug values must be:

* Unique (no two things of the same data type can share the same slug)
  * If a non-unique slug is entered, Bubble will append an increasing number to it\
    (e.g. `thing`, `thing-1`, `thing-2`)
* URL encoded (Bubble will automatically URL encode any value that needs it).\
  (e.g. `My Article Name` -> `my-article-name`.
* Special characters will not save to the slug field, and will show up as blank. This means anything that isn't a lowercase letter, hyphen or number.

***

## Upload data as CSV

{% hint style="warning" %}
This action is available on paid Bubble plans and is subject to an upload limit based on your plan.
{% endhint %}

This action lets users upload a CSV file and add the entries to the database. Each column in the CSV should match a field on the selected data type.

<details>

<summary>Supported field types</summary>

Supported field types are

* text
* number
* date
* address
* yes/no
* To upload a list of things into a single field, format the values as a JSON array.
* The unique ID of a thing in your database (to link two things together, such as a `Task's Project`), where Task would be the thing you are uploading and Project would be the unique ID of the Project the task belongs to.

</details>

<details>

<summary>Limitations</summary>

* Importing users is not supported.
* Uploading an array of unique IDs referencing another data type isn't currently supported (such as `Project's Tasks`, where `Project` is the thing being imported and `Tasks` is a list of unique IDs for that Project.
* The upload data as CSV feature is subject to an upload limit based on your plan.

</details>

### Type of data

The type of data to upload.

### CSV file

The expression pointing to the file to upload. This can point directly to a URL, or to an [*Picture uploader*](/core-resources/bubble-elements/element-properties/web-element-properties/input-form-properties#picture-uploader) or [*File uploader*](/core-resources/bubble-elements/element-properties/web-element-properties/input-form-properties#file-uploader) element's value.

### Separator

The separator character used in the CSV file.

[^1]: The converted to list operator takes a single thing and converts it to a list that contains only that one record.\
    \
    Reference: [Converted to list](/core-resources/data/operations-and-comparisons#converted-to-list)

[^2]: A slug is a short, human-readable string used to identify a thing in a URL — for example, `my-article-title` instead of a long unique ID.
