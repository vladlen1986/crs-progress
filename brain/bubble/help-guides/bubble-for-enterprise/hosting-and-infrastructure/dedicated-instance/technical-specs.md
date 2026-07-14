# Technical specs
> Source: https://manual.bubble.io/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/technical-specs · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Enterprise app CPUs

This is a representation of the amount of resources your apps and their editors have to run. Things like users accessing your site or developers making changes in the editor contribute to the usage of the App CPUs. As you scale how much you are trying to do, how many apps you have, or how many live users you have, this is one of the key things to scale to make sure everything can run as expected.

You can track this usage in the [*Max server CPU usage (%) chart*](/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/the-dedicated-editor-experience#max-server-cpu-usage).

## Database CPUs

Similar to Enterprise app CPUs, database CPUs are the resources that you have to run your databases. Any database-related actions such as “make a new thing” contribute to your database CPU usage. If your app requires data manipulation, your database CPUs will need to scale as the general usage of your Enterprise app scales.

You can track this in the [*Max database CPU usage (%) chart*](/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/the-dedicated-editor-experience#max-server-cpu-usage).

## Database Storage

This is the size of your database, which stores all data across all Enterprise app on your server. This includes: any data types you have and all the information associated with them, copies of your data throughout time to allow for point-in-time recovery, changes that have been made to your apps to allow you to undo, previous deploys and save points, and any scheduled workflows. You can track this in the [*Free database storage (gigabytes)* chart](/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/the-dedicated-editor-experience#free-database-storage-gigabytes).

## Cache memory

Cache Memory Cache is the temporary data storage used for holding information like user session data.

You can track it in the [Free cache memory (megabytes) chart](/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/the-dedicated-editor-experience#free-cache-memory-megabytes).

## File Storage

Each Enterprise app automatically has 1TB (1000GB) of file storage. Additional terabytes of storage can be added per app. You can keep track of your file storage in the [*Logs tab*](/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/the-dedicated-editor-experience#the-logs-tab).

## High Availability

Enterprise app CPUs can be switched from normal to “high availability”. This effectively doubles the number of app CPUs as well as provides additional protection against downtime and increases scalability by having multiple instances on a load balancer. We also offer High Availability for your Database. If you’re interested in learning more about how this can impact your app, reach out to your technical point of contact.

## Static IP Address

Running on a dedicated server means that you'll have a single, static [IP address](#user-content-fn-1)[^1] for all your Enterprise app. You can use this to set up a custom Cloudflare integration, add your app to “allow” lists wherever needed, and to connect to some additional third-party services. Your server’s IP address is displayed in the Domain/Email tab of the Settings page on any of your apps:

<figure><img src="/files/W00fySnmUW8FLA0WMxJt" alt=""><figcaption></figcaption></figure>

## Automatic Notification Emails

We’ll alert you when your app hits certain thresholds that mean you’re getting close to your instance’s limits. You’ll be able to reply to any of these warning emails to ask your dedicated point of contact for input or to adjust your hardware configuration.

### Free database storage space

This alert lets you know when you have less than 50GB of storage left on your box. Your point of contact will be able to take a closer look at your usage and provide insight into what is taking up space.

{% hint style="info" %}
**Database backups and data storage:** One frequent cause of unnecessary data storage is database backups. You can clear these out manually by wiping your database change history in the App Data section of the Data tab in the editor, and have your point of contact adjust your backup settings to better suit your needs.
{% endhint %}

### CPU usage

This alert notifies you if you average application CPU usage has been over 70% during x periods of 30 minutes in the last day. Once you hit the 70% mark, you may start seeing that workflows aren't running as you expect them to or when you expect them to, and you'll see pages are running slower than usual. This is because hitting that level of usage will trigger some optimizations on our backend to try to prevent any server downtime.

{% hint style="warning" %}
If your server's CPU usage is above **70%**, there’s a chance that the server memory will drop below 1,000 MB free, which will crash your server and cause about 30 seconds of downtime as it restarts.
{% endhint %}

If you receive this notification, it’s a good idea to review your logs and usage to see if there are any workflows that are running when not intended, or if you’re seeing an unusual usage pattern from your users. The TSM team can also help investigate the cause, optimize inefficient workflows, and let you know when you may need to increase your configuration.

[^1]: An *IP address* is a unique string of numbers separated by periods or colons that identifies each computer on a network like the internet.\
    \
    It works like a home address, allowing devices to locate and communicate with each other.
