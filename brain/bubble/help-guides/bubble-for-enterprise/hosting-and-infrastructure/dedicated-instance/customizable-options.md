# Customizable options
> Source: https://manual.bubble.io/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/customizable-options · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Direct database access

Because your database runs on an isolated instance, we can provide credentials for direct, read-only access. Your technical point of contact can authorize specific IP addresses to establish a direct SQL connection.

Alternatively, any user with account administrator permissions can set up the connection immediately by choosing *Make server adjustments* when starting a new chat with our chatbot on any page of the Bubble website.

To find your device’s IP address, search *“What is my IP address”* in any search engine. Keep in mind that your IP address may change over time, especially if you work from multiple locations. If you need to add or update addresses later, just share the new IPs with the TSM team and we’ll add them for you.

{% hint style="info" %}
Note: When you access the database, you may notice some data tables that you do not recognize. These are tables containing some backend data on your app - reach out to your technical point of contact if you’d like more details on what any of these mean!
{% endhint %}

## Custom Cloudflare Integration

On Dedicated, you have control over your own Cloudflare integration and can either use the built-in Bubble one by clicking the “Accelerate this domain with Cloudflare” checkbox, or set up your own. If you are concerned about the static IP address of your server being available to web scanners, a custom Cloudflare integration will obscure it and show a Cloudflare IP address instead.

## Protecting Sub-App Features

If you are using sub apps, we can block certain paths to prevent all changes from a parent app being pushed to a sub app. For example, style settings, page titles and descriptions, header meta tags, and plugin keys can all be protected. Reach out to your technical point of contact if you have any specific features you’d like to be protected, and we’ll let you know what can be included here.

## Backup Retention Setting

By default, all dedicated apps maintain 20 years worth of database point-in-time backups, meaning the database can be reverted to any point in your app’s history. These database backups can consume a great deal of your configuration’s database storage. Your point of contact can update this retention period to any custom setting between 20 years and 8 days on a per-app basis - most users choose between 30-90 days. Once this is updated, Bubble will begin deleting the data outside of the chosen timeframe, freeing up space for your other data.

## SQL Connector Limit

While apps on the main cluster limit the number of lines returned by a SQL call to 200, this limit is customizable on dedicated to be up to 10,000 items as that is the largest a list can be. API List Limit Similarly to data returned in the SQL connector, apps on the main cluster limit the lengths of lists sent by the Data API to 200 items. This can be also be increased to anything up to 10,000 for dedicated clusters.

## API List Limit

Similarly to data returned in the SQL connector, apps on the main cluster limit the lengths of lists sent by the Data API to 200 items. This can be also be increased to anything up to 10,000 for dedicated clusters.
