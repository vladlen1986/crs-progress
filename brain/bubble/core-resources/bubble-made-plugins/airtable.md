# Airtable
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/airtable · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The Airtable Plugin can be used to pull data from Airtable into Bubble, as well as update Airtable records from Bubble workflows. The ideal use case for this plugin is to supplement your Bubble application with Airtable data, or vice versa.

{% hint style="warning" %}
While it's possible to use Airtable as your sole database with Bubble, we don't recommend that approach. The built-in Bubble database will generally be more performant (since it doesn't require API calls to be sent via Bubble's server), and it lets you control privacy using [Privacy Rules](#user-content-fn-1)[^1].
{% endhint %}

## Create a new Record

Add new records to your Table. To use this action, check the box to “Create & Modify” this Table in the Plugins tab.

### Type

Enter the type of record to create. This will match the name of the Table where you want to add the record.

## Delete a Record

Remove existing records from your Table. To use this action, check the box to “Delete” from this Table in the Plugins tab.

### Type

Enter the type of record to delete. This will match the name of the Table where you want to remove the record.

### Record

The existing record to delete. For example, if you are displaying a list of records from Airtable in a repeating group, this could be the current cell’s thing.

## Modify a Record

### Type

Enter the type of record to modify. This will match the name of the Table where the record exists.

### Record

The existing record to modify. For example, if you are displaying a list of records from Airtable in a repeating group, this could be the current cell’s thing.

## Setup

{% hint style="info" %}
In the first half of 2023, Airtable announced that they would be phasing out support for API Keys and moving everyone to use Personal Access Tokens instead by February 2024. The Airtable plugin already supports Personal Access Tokens and we’ve updated the UI on the plugin to reflect the right terminology.

External link: [Airtable announcement post](https://support.airtable.com/docs/airtable-api-key-deprecation-notice)
{% endhint %}

### Install & configure

Install the Airtable Plugin in the Plugins tab of the editor. Click “Add another Account” and fill out your Account Label and Personal Access Token.

![](/files/-MRtawR_DuWitsBNZAAq)

The Account Label can be a label of your choosing.

### Create a token

To create a Personal Access Token, log into your Airtable account, navigate to <https://airtable.com/create/tokens> and click *Create token*.

{% hint style="warning" %}
Note that the scopes[`schema.bases:read`](https://airtable.com/developers/web/api/scopes#schema-bases-read)`and`[`data.records:read`](https://airtable.com/developers/web/api/scopes#data-records-read) are required for the plugin to work correctly.
{% endhint %}

Set up the scope[^2] and access[^3] settings, give the token a name[^4] and again click *Create token*.

The token will be created and displayed once *–* keep the token securely stored. We recommend using an encrypted password manager to store tokens.

![The token will only be displayed once – keep it securely stored somewhere.](/files/IRABYGIc9SGEKwRfFJZa)

### Add the token to the plugin

After you have created the token, you can add it to the plugin settings. Copy the string and paste it into the *Personal Access Token* field in the plugin settings:

<figure><img src="/files/yduMVCP5mMPiJ3tUjFzl" alt=""><figcaption></figcaption></figure>

### Add tables

{% hint style="warning" %}
When you are configuring a table, you must also add the appropriate scopes and access to the relevant Personal Access Token through the[ Airtable console](https://airtable.com/create/tokens/patJPtiVBdzThXayZ).
{% endhint %}

Start adding your Tables! Click “Add another Table”, then configure your Table information by first selecting a Base, then selecting a Table from the dropdowns.

You can also optionally specify a View - this will impact the order in which your data returns from Airtable. For example, if you wish to see your records in the same order as they appear in your Table’s Grid view, specify this when you save your Table.

![](https://gblobscdn.gitbook.com/assets%2F-M5sbzwG7CljeZdkntrL%2F-M9PZ8W9h84nSM9YYpz_%2F-M9PZGoLBM57wX3uYfvz%2FScreen%20Shot%202020-06-09%20at%201.29.08%20PM.png?alt=media\&token=7e5b04c2-54b1-4e93-8cf3-ff73467d3362)

After you’ve saved your Table, you’ll see a popup where you can see your schema, make necessary changes, and specify which Tables your linked records refer to.

### Use Airtable as a data source & workflow action

Once set up, the app will be able to read and write to the connected Airtable base(s). For example, in a dynamic statement, you can use "Get data from an external API" to select the Airtable base as the API provider. Upon doing so, you can even add search constraints.

You will also be able to write changes back to Airtable, via workflow actions that will show up in the "Plugins" section of the action selector.

## FAQ

### What are these special field types for the field dropdowns in the schema popup?

The field type dropdowns in the initialization popup have four special data types unique to Airtable: Attachment, Collaborator, Barcode, and Link to Record(s). This is for ease of use, to make it easier for you to map your Airtable columns to Bubble types. In practice, Attachment fields can be used like a list of images or files. Barcodes can be used like text. Since Collaborators and Links are native to Airtable, these fields must be pulled directly from Airtable when using a Table as data or creating/modifying records.

### Why can’t I filter on all of my fields?

The filtering mechanism is done in the request we send to Airtable, so we have done as much as we can using the current API.

### Why can’t I create or modify all of my fields?

Some fields in Airtable are generated by other fields, such as Rollups or Counts. Therefore, these cannot be altered or created via API calls.

### Why aren’t all of my tables showing up in Airtable actions or when I search data from an external API?

Make sure your permissions are set accordingly. To use a Table in the Create and Modify actions, you must give it Create & Modify permissions. The same stands for the Delete action.

### How do I create or modify special Airtable fields, such as attachments, linked records, collaborators, and barcodes?

You can use files or images in Bubble to create or modify Attachment fields in Airtable, and you can use text to create or modify barcodes. For linked records and collaborators, you must pull this directly from Airtable. For example, if you want to create a new record with a collaborator field, you would have to have that collaborator on another record already and pull from that.

### What type of fields can I send to Airtable?

Currently you can only send **text** and **numbers** over to Airtable. All other types, like the Date field\*,\* will cause an error as it is not yet supported.

### What happens if I rename my table in Airtable?

If you rename a table that you have previously connected, this can cause existing references to fail until Bubble knows the updated name. You can resolve this by going into your Plugins tab, finding the particular instance whose table name you want to update, and clicking the Base dropdown as if you would select a different base but selecting the same base again. You should now see the new table name.

[^1]: Privacy Rules are conditions that you set up on each data type in order to protect the data from being viewed and edited by unauthorized users.\
    \
    Article: [Protecting data with Privacy Rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

[^2]: The *scope* controls what actions a token can perform. For example, you can set up a token to only be able to *read* data, or to both read and write.\
    \
    External link: <https://airtable.com/developers/web/api/scopes>

[^3]: Personal access tokens are used to authenticate requests to Airtable's API.\
    \
    External link: <https://airtable.com/developers/web/guides/personal-access-tokens>

[^4]: The token’s name will be visible in record revision history.
