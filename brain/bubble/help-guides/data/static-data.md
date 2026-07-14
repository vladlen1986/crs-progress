# Static data
> Source: https://manual.bubble.io/help-guides/data/static-data · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers different ways of saving static data in Bubble

*Static* *data* in Bubble is defined as data that:

* Requires your app to be re-deployed to update
* Cannot be changed by your application's users (unlike dynamic and temporary data)

Static data is typically used to store any kind of structured information that doesn't change frequently, such as:

* Text strings used around the app
* Lists of static choices such as countries, colors and other options
* It can also be useful to save app data like the brand name, legal name, contact information and other pieces of information that you want to to be able to change from one place if necessary

Bubble stores static data in three different ways:

* The data that you **store directly on elements and in workflows**, such as the text on a button or list of texts for a dropdown
* **Application texts**, used to display strings like headers, labels and short texts with the option to offer translated versions
* **Option sets** used to store different kinds of data in a database-like manner

What all three have in common is that they become part of your application's source code. This means that:

* They load very fast, since they are downloaded on page load and don't need to be loaded from the database
* They are cached on the user's device until a new version is deployed, meaning the don't need to be downloaded on each page load
* They are all unencrypted and should never contain any sensitive information

Continue reading these sub-articles to learn more about application texts and Option Sets:

{% content-ref url="/pages/WCqBL3yEOKkJRXMlhwQ8" %}
[App texts (translations)](/help-guides/data/static-data/app-texts-translations)
{% endcontent-ref %}

{% content-ref url="/pages/eVKeEEFlp5dyNfK6hHk6" %}
[Option sets](/help-guides/data/static-data/option-sets)
{% endcontent-ref %}
