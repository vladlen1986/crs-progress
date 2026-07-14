# Dates and time
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/input-forms/dates-and-time · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers elements that accepts dates and time as user input

Date and time elements allow your users to specify a date, a time or both in different ways. Whether you want to save a user's birthday, filter search results or accept bookings in a specific time zone, Bubble offers multiple tools to set it up in a user-friendly way.

{% hint style="info" %}
Designing a UX that handles dates and time opens up for a wide range of different scenarios. While Bubble's built-in tools provide a variety of features, there are also a lot of plugins that offer even more customization.\
\
Check out our [plugin store](https://bubble.io/plugins) to learn more.
{% endhint %}

<details>

<summary>How Bubble handles timestamps and time zones</summary>

WorWorking with dates and times, especially across time zones, can be complex. Bubble automatically handles time zone calculations, including adjustments for Daylight Saving Time (DST).

To learn more about how this works and how to override time zones when needed, check out the article below:

**Article:** [Time, dates and time zones](/help-guides/data/time-dates-and-time-zones)

</details>

## Date/time picker

{% embed url="<https://www.youtube.com/watch?v=Vhk1qcqL4Z8>" %}

The date/time picker lets your users pick a date and a time from a visual calendar. It can also be set up to only pick a date, in which case the field to the right in the animation below will be hidden.

<figure><img src="/files/EefTSgKvF5wXpBeCrE6M" alt=""><figcaption><p>The date/time picker gives your users a visual interface to pick a date or both.</p></figcaption></figure>

If you set up the element to only ask for a date, the date will be saved at 12 am (00:00) on the chosen date in the [current user's time zone](#user-content-fn-1)[^1]. If you have selected a different time zone in the [Property Editor](#user-content-fn-2)[^2], the date will be saved at 12 am (00:00) in that time zone.

You can set a minimum and maximum date as well as a minimum and maximum time of day, and you can set the interval for the time picker (which is 30 minutes by default).

**Field type returned:** date

<details>

<summary><mark style="color:blue;">Video lessons</mark></summary>

* [How to use the date/time picker input element](https://www.youtube.com/watch?v=Vhk1qcqL4Z8)

</details>

## Input element

The input element is mainly used for text input, but can be set up to expect a date instead. In this case the user will not see a calendar or time picker, but will instead be able to type the date directly. Note that the input element supports dates but not time. It can be set up to format the date in:

* US format (mm/dd/yyyy)
* European format (dd/mm/yyyy)

<figure><img src="/files/EWZcrPENMU6p6PQif6PP" alt=""><figcaption></figcaption></figure>

**Field type returned:** date

[^1]: All computers have a time zone setting, and this is passed on to the internet browser. Bubble in turn uses this information to determine what time zone the user is in, so as to correctly show the current date/time.\
    \
    Bubble uses this time zone by default, but it can be overriden in many elements and operators.

[^2]: The Property Editor is the floating window that lets you edit the settings of a given element.\
    \
    You display the Property Editor either by double-clicking the element in the design tab or clicking it once in the Element Tree.
