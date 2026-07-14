# Using Algolia
> Source: https://manual.bubble.io/help-guides/data/the-database/using-algolia · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how to use the third-party search provider Algolia with Bubble

Bubble has an integration with [Algolia](https://www.algolia.com/), a third-party search-as-a-service provider. Bubble apps using this integration have their data sent to Algolia for indexing, and use Algolia as a data source to power elements like repeating groups and searchboxes.

## Benefits of Algolia

What are the benefits of using Algolia? A noticeable one for your users is speed - Algolia searches are fast, and noticeably faster than Bubble native searches at scale. A second one is customizability - Algolia allows you to tweak the search algorithm, among other parameters as well.

Note that unlike a plugin which must be installed, this integration is built natively into the editor, much like Bubble’s integrations with Google Maps and Google Geocode.

## **Who should consider this** <a href="#who-should-consider-this" id="who-should-consider-this"></a>

Bubble does have native search capabilities, but Algolia provides a more performant and customizable search experience at scale. Users of this integration will also need their own Algolia plan (though Algolia also offers a free tier). In other words, Algolia is more suitable for Bubble apps at a large scale that rely on search as an important part of their user experience; thus, this feature is only available for Bubble apps on the Professional plan and above.

## Setup <a href="#setup" id="setup"></a>

To start off, you must have your own Algolia account and copy your Algolia keys into your app’s Settings. When creating an Algolia account, you **do not** have to create indices yourself. Instead, right after signing up, you should visit the "API Keys" section of the dashboard. You will see a screen like this:

![](https://s3.amazonaws.com/appforest_uf/f1585840673248x789535177939069300/algolia_keys.png)

In your Bubble app, in Settings > General in the "General services API Keys" section, there is a checkbox for "Enable searching with Algolia" (if you do not see this checkbox, your app does not have this feature, chances are because it is not in the right tier). Once you check the box, you will see input fields for the application ID and two keys from the Algolia dashboard. Once you've copied and pasted those values in, the Bubble app will confirm that it thinks the keys are of the correct format (note the green text below):

![](https://s3.amazonaws.com/appforest_uf/f1585840814678x830973864721420500/algolia_settings.png)

The other parts of the Algolia feature mentioned below will not appear until valid keys and an application ID have been supplied in Settings.

## I**ndexing** <a href="#indexing" id="indexing"></a>

After keys have been added, in the Privacy tab for every data type, you’ll see the option to index that type with Algolia.

![](https://s3.amazonaws.com/appforest_uf/f1585840930894x345364301566459140/algolia_privacy_tab.png)

If a data type is indexed to Algolia, Bubble will send **all public fields** to Algolia, i.e. the fields that are visible via search in the “Everyone else (default permissions)” Privacy rule. Bubble will automatically create the necessary indexes in Algolia for you - **you should not rename those indexes**.

In addition, make sure that the data type being indexed has **"Find this in searches"** under the "Everyone else" permission checked.

After you toggle a data type to be indexed by Algolia (checkbox on the right), you will probably want to trigger an indexing of all the things of that type. You can do so in the modal accessed at the top of the Privacy page for any indexed type.

![](https://s3.amazonaws.com/appforest_uf/f1585840975838x691412509932716700/algolia_indexing_modal.png)

You can choose to trigger a full indexing of all indexed types or just one type, and you can choose to do this for your Development database ("test"), Live database, or both. Note that doing a full indexing could take noticeable capacity over a period of time (depending on how many things there are), so the recommendation is to trigger a full indexing once after adjusting all your data types’ settings, and to do it at non-peak hours. Behind-the-scenes, the full indexing runs the same process as a large CSV data export, so you can actually see the status of these tasks in App Data > Export.

When things of an indexed data type are changed, added, or deleted, Bubble will automatically try to update the corresponding Algolia index for you. This should be generally reliable, but in the event that you find Algolia “out of sync” with your Bubble database, you can always trigger a full re-indexing in the same way as above.

During set-up, after you run the first indexing, we recommend you check the Algolia portal to make sure that you're seeing the records you expect in the newly created indices.

## S**earching** <a href="#searching" id="searching"></a>

Once you’ve activated Algolia for your app, you will see a new data source, “Search with Algolia”. For example, this can be the data source for a repeating group, or the “Choices style” for a searchbox. The Algolia data source also lets you choose to query over a specific field, or all fields of a data type.

You cannot change the sort order of an Algolia result in Bubble because that is controlled in Algolia. After all, we are relying on their search expertise, manifested in their algorithm! You are able to customize the Algolia search algorithm for a particular index via the Algolia dashboard. For example, you can change the weights of different fields in the search algorithm. Note: one limitation of the current integration is that you should not set two fields as “equal weight” in the Algolia interface.

{% hint style="info" %}
Note that the default setting in Algolia is to return 20 entries in the first 'page' of the search. At this time there's no way for your Bubble app to access other pages of results, but you can change the number of results in the first page by going to the Algolia portal > the appropriate index > Configuration > Pagination.
{% endhint %}

## Known limitations <a href="#known-limitations" id="known-limitations"></a>

This is the v1 of the Algolia feature. It has these known limitations:

* This only supports **text** and **number** fields. For all other field types (including fields which are other custom data types), Bubble will make a "best effort" attempt to send those fields to Algolia, but it will likely not be sensible. To restate explicitly, the Algolia integration is not meant for other fields like dates, geographic addresses, ranges, Users, or fields that are other custom data types.
* This only supports **public data fields**, so it is not good in situations where data privacy is very important, e.g. when you want to prevent one user from seeing another user's data. For example, it is good if you have a short-term rental marketplace app where all users can see any rental on the app. It is not good for an e-commerce experience where you have many vendors and you want to build a search for only one vendor's products.
* Algolia has limits on the size of certain fields. If Bubble detects that a given Thing has a field that is too long (text fields are the most likely culprit), it will automatically clip them for you so that it can be sent to Algolia. This can be disabled in Settings, but should only be done so by advanced users who are accounting for this in Algolia's settings.
* In Algolia's settings, you may see an option to rank two fields as "equal weight" - please **do not** do this, as it will break the Bubble integration.
* Bubble will automatically create the indices in Algolia - please **do not** change the names of these indices, though you are free to adjust other settings as desired.
