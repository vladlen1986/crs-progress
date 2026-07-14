# Workload notifications
> Source: https://manual.bubble.io/help-guides/workload/tracking-workload/monitoring-workload/workload-notifications · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Bubble gives you several ways to manage your app’s workload unit (WU) consumption including the logs page with charts, server logs, and notifications. Your app comes with two types of notifications for workload; notifications that are automatically sent, and notifications that you configure based on criteria you set.

Once you are notified, you can make any necessary changes, like pausing or updating workflows.

## Automatic notifications

Your app plan comes with a set amount of workload. If needed, you can also add a workload tier to your subscription to cover workload consumed above your app plan’s default threshold.

To help you manage your consumption, Bubble will let you know when your app:

* Has consumed **75%** of your app’s monthly WU allowance
* Has consumed **100%** of your app’s monthly WU allowance.

Bubble will automatically send you notifications about workload spikes when it detects that your app is consuming more workload than typical. Alerts go out when your app’s workload consumption meets any of the following conditions:

<table><thead><tr><th width="158">Period</th><th width="368">Threshold</th><th>Additional Criteria</th></tr></thead><tbody><tr><td>Last 24 hours</td><td><strong>2x</strong> the average of the last 7 days</td><td>Average > 30,000/day<br>(for larger apps)</td></tr><tr><td>Last 24 hours</td><td><strong>3x</strong> the average of the last 7 days</td><td>Average > 300/day</td></tr><tr><td>Last hour</td><td>Greater than <strong>3%</strong> of total monthly WU allowance</td><td></td></tr><tr><td>Last six hours</td><td>Greater than <strong>6%</strong> of total monthly WU allowance</td><td></td></tr><tr><td>Last 12 hours</td><td>Greater than <strong>10%</strong> of total monthly WU allowance</td><td></td></tr></tbody></table>

For the above, the WU allowance is the default amount included in the app plan, plus any additional workload tiers added to the app.

## Custom notifications

Bubble also gives you a way to customize workload notifications for your app. These can be used to set different criteria for a spike than Bubble’s default criteria, or can be for other purposes. For example, you may want to be alerted when half of your monthly WU has been consumed so you can make sure you’re tracking as estimated against your total for the month.

### Setting up a notification

You can set up an alert in two places:

* Directly from the Notifications tab in Settings
* On the Logs page

Choose an amount of WU (1,000, 10,000, 100,000, etc — the amount must be greater than 1,000) and a time period (hour, day, week or month) for the notification. All app admins will receive an email if the app reaches that threshold.

<figure><img src="/files/fJ8LQZncpAmbQ9Isy7k4" alt="" width="563"><figcaption></figcaption></figure>

### Managing alerts

Alerts can be turned off by toggling them off on the notifications tab on settings (there is not currently a way to delete a notification, but you can turn it off so it won’t send). Note that multiple notifications can be live at the same time.
