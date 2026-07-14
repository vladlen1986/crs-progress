# Importing data (CSV)
> Source: https://manual.bubble.io/help-guides/data/the-database/export-import-data/importing-data-csv · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Bubble has a built-in feature to upload CSV files and import its data to the database. In this article, we'll cover how to perform this operation, as well as how to format the CSV file correctly to prepare it for uploading.

<details>

<summary>Template file</summary>

To speed up your import and make sure you have the correct formatting, you can download the template file below. You will need access to an app like Microsoft Excel, Google Sheets or Apple Numbers to open and edit it.

The first row of each column must be changed to match the field you want to import. For more information about formatting, see the [chart](#formatting-the-file) below.

File: [Bubble CSV import template](https://7061a23464c269152da77797cd07e457.cdn.bubble.io/f1702562561499x243890079131354530/import.csv?_gl=1*919bpe*_gcl_au*Mzc0NjczODcyLjE3MDA2NzI2ODA.*_ga*MTIwNTgxOTU5MS4xNzAwNjcyNjc5*_ga_BFPVR2DEE2*MTcwMjU1NDI4Mi4xOC4xLjE3MDI1NjI1ODIuMzUuMC4w)

</details>

{% hint style="info" %}
This article explores the built-in CSV tool in the Bubble editor. If you are looking for how to allow your users to upload a CSV file in your app, see the core reference section below:

Reference: [Upload data as CSV](/core-resources/actions/data-things#upload-data-as-csv)
{% endhint %}

{% hint style="warning" %}
**Import delays:** The CSV import feature operates on the same scheduler[^1] that handles [API workflows](#user-content-fn-2)[^2]. As a result, if there is a high volume of scheduled tasks, the uploader may remain at 0% until it reaches its turn in the queue.
{% endhint %}

## How to import a CSV file

### Formatting the file

The file needs to be of type CSV (comma-separated values), which you can export from apps like Microsoft Excel, Google Sheets and Apple Numbers.

To ensure Bubble accurately interprets the data in your file, it's important to format it correctly. Most fields follow standard formatting conventions, though certain complex types, such as date ranges and intervals, may require specific formatting to be recognized properly. The first row of your CSV file must be a header row containing the names of the fields for the data.

<table><thead><tr><th width="131.33333333333331">Field type</th><th>Example</th><th>Note</th></tr></thead><tbody><tr><td>date</td><td>Jan 1, 2030 9:00 AM</td><td></td></tr><tr><td>date interval</td><td>86400000</td><td>Milliseconds (i.e. 86400000 is 24 hours)</td></tr><tr><td>date range</td><td>[Jan 1, 2030 9:00 am, Jan 1, 2030 10:00 am]</td><td>Comma-separated dates. The first must be before the second. Note the brackets.</td></tr><tr><td>file</td><td>//7061a23464c269152da77797cd07e457.cdn.bubble.io/f1702555059736x137960774747504450/Bubble%20logo.svg</td><td>The URL to the file</td></tr><tr><td>geographic address</td><td>20 W 34th St., New York, NY 10118, USA</td><td>The address as formatted in Google Maps</td></tr><tr><td>image</td><td>//7061a23464c269152da77797cd07e457.cdn.bubble.io/f1702555059736x137960774747504450/Bubble%20logo.svg</td><td>The URL to the image</td></tr><tr><td>number</td><td>123456</td><td></td></tr><tr><td>text</td><td>Lorem ipsum</td><td></td></tr><tr><td>yes / no</td><td>yes</td><td>yes or no (don't use true/false)</td></tr><tr><td>custom data type</td><td>1702555073152x152492144645599780</td><td>Unique ID of the thing you are linking to</td></tr></tbody></table>

Note that in the file you want to import, the rows and columns are transposed.

{% hint style="warning" %}
**Metadata** contained in the following fields is automatically created and updated by Bubble and is not possible to import from a CSV:

* Unique ID
* Creator
* Modified Date
* Created Date
* Slug

If these fields are included, they will be automatically set to *ignore this column*.
{% endhint %}

### Accessing the import feature

The CSV import feature is found in the *Data - App data* section of the Bubble editor. After navigating there, click the *Upload* button.

<figure><img src="/files/vCSNAE2FXKk3BBxm5I6H" alt=""><figcaption><p>Click the <em>Upload</em> button in the database editor to start the import process. Remember to first select the correct data type in the left-hand list.</p></figcaption></figure>

### The import popup

{% hint style="warning" %}
To successfully import the file, you need to keep the popup open until the file has **uploaded.** When the second progress bar (*Processing file)* is visible and starting to fill, you can close the popup and keep working in your app.
{% endhint %}

The import popup will be displayed, where you can set the correct settings for the import:

<figure><img src="/files/VmREGFaxeKDAdMEDkYOh" alt=""><figcaption></figcaption></figure>

1. First, **select the data type** that you want to import. Note that we have named the data type CSV in the example.
2. **Pick the data delimiter**. This is the character that separates the data, so that Bubble understands its rows and columns. The comma is the most widely used, but the delimiter can be one of the following:
   * ,
   * ;
   * tab
   * |
3. **Select the file to upload** from your device (opens system file browser)
4. **Map fields**: Bubble will attempt to match the columns in the file with the correct field on the selected data type. In the example, we have named the fields according to their type of data.
5. **Choose delimiters on fields**: some fields, such as date ranges, need a valid delimiter. This is normally a comma, but the characters listed in point 2 are all valid.
6. **Validate the data**: the next step is to instruct Bubble to check the data in the file against the fields you have mapped. If successful, you will get a success message. If there are any errors, they will be listed after you click the *Validate data* button.

## FAQ: CSV import

#### Can you upload more than one data type at a time?

You can only upload one data type at a time.

#### Can I create new fields on the data type based on columns in the file?

No, all fields must be created and have matching names before they are uploaded.

[^1]: In the *Logs* tab of your application editor, you can access the scheduler to view all upcoming scheduled workflows.

    Article: [API workflow scheduler](/help-guides/maintaining-an-application/scheduler)

[^2]: *API workflows* are server-side workflows that you can schedule/trigger in your application and/or expose to be triggered from an external application or system through an API request.

    Article series: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)
