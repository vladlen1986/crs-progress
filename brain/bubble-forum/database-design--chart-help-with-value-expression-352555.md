# Chart - Help with Value Expression
> Source: https://forum.bubble.io/t/chart-help-with-value-expression/352555 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 3 posts · topic: database-design

## Original post (by @Kampong)

Thankful for any help.

My database has 10 Vehicles. Each Vehicle row is described by a Date and a Price.

I try to chart with Bubble Charts plug-in. But receives an error message that says: a value expression should be number but right now it is a list of numbers?

My setup is in pics below. Appreciate any help or guidance.

[image]
image686×303 12.2 KB

[image]
image935×269 4.66 KB

[image]
image363×449 11.6 KB

## Reply by @if.started (0 likes)

The error occurs because the Value Expression expects a single number, but your setup provides a list of numbers.
Two Solutions:

- 

Quick Fix: Change the Value Expression to:

```
Current's Vehicle's Price:first item

```

This extracts a single value to plot on the chart.

- 

Best Practice: Update your database structure to ensure the “Price” field is a single value (not a list). This avoids confusion and ensures the chart works seamlessly.

Let me know if you need further help adjusting the setup!

About Us:

We’re If-dev, a Bubble agency here to solve complex issues and optimize your app workflows. Connect with us:

[image] support@if-dev.io | [image] LinkedIn (https://www.linkedin.com/in/mbseo/) | [image] if-dev.io (https://if-dev.io)

Your success is our success, and we’d love to collaborate with you to make your vision a reality.

## Reply by @Kampong (0 likes)

Thank you so much.

I changed it to a text (and not a list) and it works now.
