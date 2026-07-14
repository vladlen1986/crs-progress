# Optimizing Data Loading in a Single Page Application
> Source: https://forum.bubble.io/t/optimizing-data-loading-in-a-single-page-application/352720 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 2 posts · topic: workload-units

## Original post (by @yuehong)

I have developed a single-page application where each page contains a datatable that loads and displays data from a database. To reduce the use of workload units, I have added a condition to only run the “page is loaded” workflow when the page URL belongs to the datatable page, which will then load the datatable data.

[image]
image352×285 7.57 KB

While this approach ensures that the datatable data is only loaded when the page is visited, it results in slow data display. Removing the condition solves the slow loading issue but causes all datatable data to load when the application is first loaded, which is not efficient.

How can I better optimize my single-page application so that data is loaded only when the specific page is shown, without sacrificing performance?

## Reply by @bcart0v (0 likes)

I converted my multi-page app to a single page app and the way I went about this is, I changed all Tables / RG’s / List-Shifter logic to only load data when that element is visible.

So, if i have a table of Appointments, the condition is When ThisTable Is Visible, Do a Search For …

That way it’s only loading data for items that are currently visible. I don’t know if this is considered best practice, but it’s worked for me.

But if you’re only going to load data (and a lot of it) when something is finally visible, there will always be a delay if you are trying to load lots of data. Unless you do Pagination and only show so many at a time, there’s going to be a noticeable delay. But, when the data is loaded once, it doesn’t have to be loaded again, so the initial load time will be longer but after it will be quick.

## Reply by @system (0 likes)

This topic was automatically closed after 70 days. New replies are no longer allowed.
