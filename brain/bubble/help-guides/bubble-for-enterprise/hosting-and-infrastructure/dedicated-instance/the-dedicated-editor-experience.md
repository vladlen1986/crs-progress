# The Dedicated editor experience
> Source: https://manual.bubble.io/help-guides/bubble-for-enterprise/hosting-and-infrastructure/dedicated-instance/the-dedicated-editor-experience · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

When you log into an app on your dedicated server, there are some new features and changes specific to keeping track of your new dedicated instance.

## New editor URL

The Enterprise app editor will be hosted on a subdomain (dXX.bubble.is). The first time you'll visit this URL, you'll be prompted to login with your Bubble credentials or SSO. When you click to edit or app from bubble.io/home, you’ll be taken directly to the correct subdomain.

You can continue to manage your organization's account, provision members, update payment information, emails, and other settings through the bubble.io platform, just as you did prior to the upgrade.

{% hint style="warning" %}
**Note:** App modification date (for sorting apps in your home page) is either stored on the app object or in a Meta Thing. Since the app object cannot be read from a dedicated cluster, and the Meta thing is not updated when edits are made to a dedicated app, the app modification date is not reliably stored.
{% endhint %}

## Dedicated Manager

When you first log in to your dedicated app, click the blue icon at the top of your page and click “Upgrade.” This makes sure your app is running on the most recent Bubble software.

What this is for: Every time we push new code, your Dedicated Manager will become out of date. On a dedicated server, it’s your responsibility to keep your Enterprise app up to date on software updates and Bubble Version. A good rule of thumb is to check this and update every morning to access any Bubble engine updates from the day prior. Any release made to the main cluster from 9 AM - 6 PM ET will be available in the Dedicated Manager the next day after 9AM ET. If a release goes out at 11 AM on Tuesday, it'll be available for dedicated apps at 9 AM on Wednesday.

We recommend updating to the newest version at least once a week.

<figure><img src="/files/yC4NIEaM3MfHJuA1AROq" alt="" width="375"><figcaption></figcaption></figure>

**Note**: This is different from your Bubble Version, which you’ll recognize from the main cluster. That can still be updated from *Settings - Versions*, and should also be updated when new versions are available to get access to new features.

## The Logs Tab

Instead of the workload unit charts in the “Logs” tab of an app on the main cluster, Enterprise apps on dedicated servers have charts which reflect the usage of your server’s resources across all apps on the server.

### Dedicated Usage Summary

At the top of the page, you can see which Enterprise apps on your server used what percentage of the overall usage in the past 6 hours. If you only have one app, this will always be 100%, but if you have more apps it'll show this breakdown:

<figure><img src="/files/mz1FUqIaeGavWtWpZXEu" alt=""><figcaption></figcaption></figure>

Below that breakdown are the 5 main graphs showing how your dedicated server is performing. These will be identical when viewed from any app on your server. You can set the time frame to be displayed across all of the charts using the textboxes at the top of the screen to be anything up to a year ago.

### Max server CPU usage (%)

This chart shows how much of your Enterprise app CPUs are in use at any given time. It's represented as a percentage of the total amount available, so if the line is very high this means that a lot of the available CPUs are in use. When this graph hits above 70%, you may find that things such as scheduled workflows aren't running as expected. If you are consistently or frequently above 70% (your line would show in the red-boxed area in the image below), we recommend upgrading the number of App CPUs you have so that your box can support the work you are doing.

<figure><img src="/files/tTq3b8qXWQRTUmjJBjGk" alt=""><figcaption></figcaption></figure>

### Free cache memory (megabytes)

This chart shows you the amount of available cache memory in megabytes. A helpful benchmark for this chart is 1,000MB. If you are regularly running below this amount of free cache (your line would be in the red-boxed area in the image below), you may start to see some unexpected behaviors. Increasing the total amount of cache memory you have can mitigate this. Because the cache is where user sessions are stored, the most user facing behavior you’ll see when you are low on cache memory is that users will be logged out of their sessions, or will have to log back into your Enterprise app even when they have selected a ‘stay logged in’ option.

<figure><img src="/files/bqJYSFqZ7sFVR0ROUDMB" alt=""><figcaption></figcaption></figure>

### Max database CPU usage (%)

This chart shows the percentage of your database CPU usage. As with app CPU usage, it's best for average usage to be under 70% to ensure database operations have room to run without overtaxing your server, though you won't experience any concrete throttling if your usage spikes above this level.

<figure><img src="/files/5Ar5yrTlYpFnC9HMiMlb" alt=""><figcaption></figcaption></figure>

### Free database storage (gigabytes)

This chart shows the amount of free database storage on your server in gigabytes. We recommend maintaining at least 50GB of free database storage to make sure you are not in danger of maxing out your storage and to have room to scale.

<figure><img src="/files/mLlh3pfh3TDN3x8friTb" alt=""><figcaption></figcaption></figure>

### Free server memory (megabytes)

This chart shows the amount of memory available on your server. You will see this drop if your app is doing anything that requires your server to hold onto a lot of information at once; a few examples would be if you are running a lot of workflows at once or doing many large API calls in a short period of time. If this drops below 800MB, your server will have to restart, which means both your live apps and any app editors will be inaccessible for about 30 seconds. If you are seeing this happen consistently, there's either a specific workflow that needs to be optimized, or your general usage is high enough that you need to upgrade your number of app CPUs to handle the amount of usage.

<figure><img src="/files/NaFptNEtlYThuCNkAu6F" alt=""><figcaption></figcaption></figure>
