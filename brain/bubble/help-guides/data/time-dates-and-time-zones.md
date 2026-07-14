# Time, dates and time zones
> Source: https://manual.bubble.io/help-guides/data/time-dates-and-time-zones · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

## Times and dates in the online world

Time is a fundamental concept in app development, but working with time and dates in a global, online environment presents unique challenges. Computers do not inherently understand human time zones, local calendars, or daylight saving time—they store and process time in a consistent format that can be universally referenced across systems and locations.

To ensure consistency, applications store time in a standardized way that remains unaffected by local differences - we call this a timestamp. This approach allows an app to work seamlessly across multiple regions, enabling users from different time zones to interact with the same data without ambiguity. When a timestamp is saved, it is stored in a universal format and only adjusted for local time when displayed to the user. This ensures that the actual recorded time remains precise and unaffected by regional changes, such as daylight saving adjustments or location-based settings.

The challenge for app developers is ensuring that time remains both absolute and context-aware. While an event like "3:00 PM" might make sense to a user in a given region, a Bubble app must store that time in a way that ensures it is interpreted correctly for someone in another part of the world. Without a standardized storage format, two users in different time zones might see the same timestamp displayed differently, causing confusion or misalignment in time-sensitive applications.

### *Absolute* and *context-aware* time

Time being both absolute and context-aware becomes evident when working with calendar events. Imagine scheduling a meeting in a calendar app such as Google Calendar, Apple Calendar, or Outlook while in New York. If you set the event for 3:00 PM (Eastern Time), it will appear at that exact time in your calendar.

However, if you later travel to Los Angeles, your calendar app may prompt you to adjust event times based on the local time zone. If enabled, your 3:00 PM ET meeting will now display as 12:00 PM PT, aligning with the local time zone. The event itself has not changed—it still occurs at the same absolute moment in time—but its representation has been adjusted to match your new location.

This demonstrates how time is absolute in terms of its fixed moment globally, yet context-aware when viewed in different time zones. Calendar apps handle this automatically to ensure that scheduled events remain accurate for users regardless of where they are.

### Times and dates – quick facts:

* Bubble always saves a time and a date (as do most other computer systems).e. You [cannot save just one](#user-content-fn-1)[^1].
* Time is stored in Unix time, which represents the number of milliseconds since January 1, 1970, 00:00:00 UTC.
* When displaying time, Bubble automatically converts it to the user's local time zone unless a timezone override is applied.
* On the server, Bubble will default to UTC if the user’s time zone is unavailable and no specific timezone override is provided
* Some regions adjust their clocks for daylight saving time, which means their local time shifts between different UTC offsets during the year. For example, Eastern Time (ET) follows UTC-5 in the winter (EST) and UTC-4 in the summer (EDT). Because of this, the time difference between two locations may change depending on the season.
* Date-time inputs and pickers default to the user’s local time unless a timezone override is applied.

## Unix time explained

To solve the problem of consistent timekeeping, Bubble apps store time in Unix time—a widely adopted standard that represents time as the number of milliseconds that have elapsed since January 1, 1970, at 00:00:00 UTC (Coordinated Universal Time). This moment, known as the Unix epoch, serves as a universal reference point.

Unix time is advantageous because it is simple, linear, and free from time zone considerations. A given timestamp stored in Unix format will always refer to the same exact moment in time, regardless of where the user is located. This eliminates ambiguity and makes it easier for systems to compare, calculate, and manipulate dates and times.

For example, a timestamp stored as 1,700,000,000,000 represents the exact moment 1.7 trillion milliseconds after the Unix epoch. This format allows apps to store and process time efficiently, making it possible to sort events, perform time-based calculations, and ensure consistency across different devices and servers.

Bubble follows this standard, meaning that all times and dates stored in the database are saved in Unix time. However, when displaying time to users, Bubble automatically converts it based on the viewer’s time zone settings, ensuring that each user sees the correct local time representation.

Using this system also makes it easy for Bubble apps to communicate with other apps and systems, since both systems will be “speaking the same language”.

## Time zones

Time zones exist to align human activities with the natural daylight cycle in different parts of the world. Since the Earth is divided into regions that experience sunrise and sunset at different times, time zones ensure that people in one area don’t need to adjust their schedules based on global time standards.

Each time zone is defined by an offset from UTC, such as UTC-5 for Eastern Standard Time (EST) or UTC+1 for Central European Time (CET). Some regions also observe daylight saving time (DST), temporarily shifting their local time by one hour during specific months of the year.

From an app development perspective, time zones introduce complexity when working with global users. A timestamp recorded at "10:00 AM UTC" might be displayed as "2:00 AM" in Los Angeles, "5:00 AM" in New York, and "11:00 AM" in Paris. Since stored times remain in a universal format, conversion happens dynamically based on the user’s local settings.

Users typically expect applications to handle time in a way that makes sense for them. If someone books a meeting for "3:00 PM," they assume it applies to their local time. Meanwhile, an international collaborator might see that same event scheduled for "9:00 PM" in their own time zone. Without proper time zone management, users could experience inconsistencies, such as calendar appointments appearing at the wrong time or scheduled notifications being sent at unexpected hours.

Most modern applications automatically detect a user's time zone based on system settings and apply the appropriate offset when displaying times and dates. However, some scenarios require manual time zone overrides to maintain accuracy.

## Why it's sometimes necessary to override time zones

**Why it's sometimes necessary to override time zones**

While automatic time zone conversion ensures that users see times correctly based on their local settings, there are scenarios where overriding time zones becomes necessary. By default, Bubble displays datetimes in the time zone reported by the user's browser. This usually reflects the time zone they are actually in, and automatically updates if the user changes location and reloads the page.

Certain types of applications require fixed, standardized timekeeping that remains the same regardless of a user's location.

Examples include:

* **Flight and travel booking systems** – When booking a flight or travel (such as a bus trip or tourist experience), users will normally expect the time to be displayed and booked in the time zone in which the event takes place. For example, if you are in Oslo and booking a tourist experience on a given date and time in Tokyo, it will be most helpful if the datetime of the event is displayed in Tokyo time.
* **Event management and scheduling** – Conferences, webinars, and meetings often specify a fixed time zone so that all participants see a consistent event time, rather than a dynamically adjusted one. If the event is online, this expectation may change, as users will plan their schedule based on the time zone from which they will be logging in.
* **Work shift scheduling** – Global businesses may schedule employee shifts in the company’s headquarters time zone to maintain consistency across locations.

In Bubble, time zone overrides can be handled by explicitly setting a time zone when displaying time-based data. This prevents automatic conversion and ensures that all users see a unified time reference, regardless of their location.

## Overriding time zones

By default, Bubble automatically adjusts date and time values based on the user's time zone. However, in some cases, you may need to override this behavior and ensure that your app processes and displays time in a fixed time zone. This is useful for applications dealing with scheduling, financial transactions, or system logs, where maintaining a consistent reference time is essential.

Bubble provides timezone override controls, which allow you to specify the time zone that your app should use when handling date-time values. These settings can be enabled under Settings → General and provide control at different levels within your app.

### How timezone overrides work

When timezone override controls are enabled, you gain access to settings that allow you to define a specific time zone for:

* **Date-time inputs:** Controls how date-time pickers and input fields interpret and store date-time values. Instead of relying on the user's local time, you can set a fixed time zone so that all users input and view time consistently. This is useful for scheduling apps, where a meeting time should remain the same for all users regardless of their location.<br>
* **Page-level override:** Applies a fixed time zone to an entire page. Any date-time values processed on this page will follow the specified time zone rather than adapting to each user’s local time. This is particularly useful for dashboards, reporting tools, or applications where data must be displayed consistently across all users.<br>
* **Backend workflows:** Affects how date-time values are processed within a workflow but does not determine the time zone in which the workflow itself is scheduled. This means that if a backend workflow runs a date-time calculation, the override will apply to that calculation within the workflow. However, if the workflow schedules another workflow to run at a specific time, that scheduled time will still be set in the time zone of the original request. This distinction is important for automation-heavy applications where scheduled tasks and time-based logic need to remain consistent.\
  \
  If you don’t use the time zone override feature, an API workflow scheduled from a page will inherit the page’s time zone (i.e. the time zone reported by the browser).

### Using timezone overrides effectively

Since this is an advanced feature, it should only be used when necessary. In most cases, allowing Bubble to handle time zones automatically is sufficient. However, if your app requires strict time zone consistency, enabling these settings can help prevent discrepancies and ensure that all users interact with time-based data in a uniform way.

When applying a timezone override, consider:

* How your users expect to see and input time (e.g., should event start times be shown in local time or a fixed business time zone?)
* Whether overriding time zones could impact workflows, such as scheduled notifications or API calls that depend on accurate timing.
* Testing different scenarios to confirm that the override behaves as expected across various user locations,

### Overriding time zones in your browser using developer tools

When working with time-based data in web applications, it can be useful to test how your app behaves in different time zones. Most modern browsers allow you to override your system’s time zone without manually changing your computer’s settings. This is especially useful for testing scheduling features, event timestamps, and other time-sensitive functionality in your Bubble app.

However, not all browsers support direct time zone overrides. Below, we’ll cover which browsers allow this functionality and how you can enable it.

#### Chrome-based browsers (Chrome, Edge, Brave, Vivaldi, and others)

**Google Chrome, Microsoft Edge, Brave**, and **Vivaldi** all share the Chromium engine, meaning they offer the same developer tools for overriding time zones. To change the time zone in any of these browsers:

1. Open Developer Tools (F12 or Ctrl + Shift + I on Windows, Cmd + Option + I on Mac).
2. Navigate to the Console tab.
3. Click the three-dot menu in the Developer Tools panel and select More tools > Sensors.
4. Locate the Time zone override dropdown.
5. Select a predefined time zone or enter a custom time zone identifier (e.g., America/New\_York).
6. Reload the page to apply the setting.

Since these browsers are built on Chromium, the process is identical across all of them.

#### Browsers that do not support direct time zone overrides (Firefox and Safari)

**Firefox** and **Safari** do not have built-in options for overriding time zones via developer tools. This is primarily due to how these browsers handle security and privacy:

* **Firefox**: Enabling privacy.resistFingerprinting (via about:config) forces the browser to report all time zones as UTC to reduce tracking but does not allow selecting a specific time zone.
* **Safari**: The browser does not offer a direct override, as it relies on the system time zone settings. The only way to change the time zone in Safari is to modify the system clock manually.

For both Firefox and Safari, more advanced methods such as JavaScript overrides, browser extensions, or automation tools can be used to manipulate time zone settings, but these are beyond the scope of this guide.

## FAQ: Dates, time and time zones

### General time zone questions

#### Does Bubble store a time zone when you save a datetime?

Whenever you store a date and time in the Bubble database, you are not storing a time zone along with it. Instead, Bubble saves the value as Unix time, which represents the number of milliseconds since January 1, 1970, 00:00:00 UTC. Time zones are not stored as part of the value itself—they only affect how the stored Unix time is formatted and displayed based on the user's time zone settings.

However, this does not mean time zones can be ignored when handling date-time values. Consider the following example:

* A user in New York (UTC -5:00) saves the date and time January 31, 2050, at 1:00 PM (local time).
  * The offset from UTC is -5 hours (or -18,000 seconds).
  * The Unix time stored: **2,527,264,800,000 milliseconds.**<br>
* A user in Sydney (UTC +11:00) saves the same local date and time: January 31, 2050, at 1:00 PM (local time).
  * The offset from UTC is +11 hours (or +39,600 seconds).
  * The Unix time stored: **2,527,207,200,000 milliseconds.**

Although both users entered "January 31, 2050, at 1:00 PM," their actual stored Unix timestamps are different because Sydney is 16 hours ahead of New York. The difference between these two Unix time values is 57,600 seconds (16 hours), which correctly reflects the time zone difference.

#### Can I store just a date or just a time?

Since dates and times are stored in Unix time, they always represent an absolute moment in time, unaffected by location. In other words, dates and times are never stored in a traditional human-readable format—they are instead saved as a numeric value representing the number of milliseconds since January 1, 1970, 00:00:00 UTC.

This means that time zone differences not only affect the displayed time but can also impact the date itself. For example, when it is 11:00 PM on January 31st in New York (UTC -5:00), it is already 3:00 PM on February 1st in Sydney (UTC +11:00). Because time zones shift how a given moment is displayed, storing separate values for the day, month, year, hour, and minute would not be useful—such a system would fail to capture the universal, absolute nature of time.

That being said, you can choose how to display any date-time value in your app. Whether you show only the time, only the date, or a fully formatted timestamp, Bubble allows you to adjust the formatting to suit your needs while still keeping the stored value consistent across all time zones.

#### Workaround to store just a date or just a time

If your app needs to store only a date (without a specific time), a recommended approach is to store the value as midnight UTC (00:00 UTC) and format it to drop the hour information when displaying it. This ensures that no matter the user's time zone, the displayed date remains consistent.

Conversely, if your app needs to store only a time (without a specific date), you can pick a fixed reference date (such as January 1, 1970) and store the time portion of the value. When displaying the time, format it to ignore the date, ensuring it remains consistent across all time zones.

To see the format of a datetime, use the :formatted as operator. The datetime will be converted to text when using this operator, allowing you to control how it is displayed.

#### Is the time zone reported by the user's browser always correct?

Usually, but not always. The time zone reported by the user's browser is typically accurate, but it can be affected by several factors:

* **User settings:** The user may have manually set their system clock or time zone incorrectly.
* **VPNs or proxies:** If the user is using a VPN or proxy, their reported time zone may not match their actual location.
* **Device limitations:** Some older devices or systems may not update time zone information correctly.
* **Browser behavior:** Different browsers may handle time zone detection differently, and some privacy settings or extensions can interfere with accurate reporting.

For critical applications, it's best to allow users to manually select their time zone.

### Backend workflows and time zones

#### How can I make Bubble detect the request's time zone in an API Workflow using the Current User’s Timezone?

You can include a custom parameter called timezone\_string in an API request—whether it's made internally in Bubble or from an external system (such as a webhook)—to specify the time zone of the request. The value must match a valid time zone from the [IANA Time Zone Database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (also known as the TZ Database).

#### How can I specify a time zone when sending a date as a string to a backend workflow?

You can set a static time zone instead of relying on automatic detection of the user’s time zone. This allows you to define a consistent time zone for your app's operations.

When passing a date-time string for Bubble to parse, you can optionally specify a time zone. For example, instead of writing "12/23/21 12:05", you can include a time zone like "12/23/21 12:05 GMT+2" to ensure Bubble interprets it correctly in that time zone.<br>

[^1]: Even if you always store both, there are ways to reliably work around this. See the [workaround](#workaround) below.
