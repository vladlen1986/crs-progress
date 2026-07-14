# Exporting data
> Source: https://manual.bubble.io/help-guides/data/the-database/export-import-data/exporting-data · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

{% hint style="warning" %}
**Export delays:** The data export feature operates on the same scheduler[^1] that handles [API workflows](#user-content-fn-2)[^2]. As a result, if there is a high volume of scheduled tasks, the export feature may have to wait for its turn in the queue, causing delays.
{% endhint %}

You can export data from the database to one of the file formats below:

* CSV[^3]
* JSON[^4]
* [Newline-Delimited JSON (NDJSON)](#user-content-fn-5)[^5]

## How to export data

To start the export process, first navigate to *Data - App data*.

<figure><img src="/files/AI6BLMdYIQGzHXbReD5K" alt=""><figcaption></figcaption></figure>

1. Select the data type you want to export.
2. Set up the *View* to reflect the list that you want to export.
3. Click the *Export* button (see screenshot above).
4. In the popup, select the format that you want to export to.
5. Bubble will send you an email when the export is done, with a link to download the file.

{% hint style="info" %}
**Known issue:** When exporting a datatype with a date interval field, the field is exported as descriptive text, although it is stored as a numerical value in milliseconds in the database. For example, the value 172,800,000 milliseconds (48 hours) would be displayed in the database editor and exported as "2 days".\
\
When importing date intervals, Bubble still expects a numerical value in milliseconds.
{% endhint %}

## Other ways to learn

<details>

<summary>Articles</summary>

* Article section: [What is the JSON format?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-the-json-format)

</details>

[^1]: In the *Logs* tab of your application editor, you can access the scheduler to view all upcoming scheduled workflows.

    Article: [API workflow scheduler](/help-guides/maintaining-an-application/scheduler)

[^2]: *API workflows* are server-side workflows that you can schedule/trigger in your application and/or expose to be triggered from an external application or system through an API request.

    Article series: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)

[^3]: CSV (Comma-Separated Values) is a simple file format used to store tabular data, often managed in a spreadsheet app like MS Excel or Google Sheets.\
    \
    Each line in the file corresponds to a row of data, with individual values separated by commas.

[^4]: JSON (JavaScript Object Notation) is a lightweight data format used for storing and transporting data. It is easy for humans to read and write, and for machines to parse and generate.\
    \
    Article section: [What is the JSON format?](/help-guides/integrations/api/introduction-to-apis/what-is-a-restful-api#what-is-the-json-format)

[^5]: Newline-Delimited JSON (NDJSON) is a format for structuring JSON data where each line is a separate, valid JSON object, separated by newline characters.
