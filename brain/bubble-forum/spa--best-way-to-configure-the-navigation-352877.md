# Best way to configure the navigation
> Source: https://forum.bubble.io/t/best-way-to-configure-the-navigation/352877 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 7 posts · topic: spa

## Original post (by @CrypTechy)

Hi there!

When users connect to my web app, they end up in their user space that has a sidebar on the left with some menu items like “Dashboard” and “Portfolio”. The latter has a sub menu listing other items (Item A, Item B).

Currently, I’ve built different pages: a page for “Dashboard” and a page for “Portfolio”. Each items (Item A, Item B) in “Portfolio” has its own page as well. When users click on these menu items, a workflow brings them to the corresponding page. Ultimately, the only thing that changes between pages is the content beside the sidebar, the latter being on every page.

I was wondering if that’s the best way to configure the navigation… Maybe using custom states with groups showing and hiding as the user clicks on the menu items of the sidebar would be a better idea? I don’t know which system is the best/most efficient/most scalable.

Currently my sidebar is a reusable element that is placed on every page. However, if we use custom states with groups showing/hiding on the right side of the sidebar, then I would only need one page, and the sidebar does not need to be a reusable element. What do you think?

## Reply by @boston85719 (1 likes)

To learn about url parameters or paths you can search forum with keywords and should find a lot. If you include an @ and my handle you’ll find enough to have a solid understanding of how they work. Google or ChatGPT likely could spell out the general concepts well, then bubble manual to understand how to work with them in bubble.

## Reply by @boston85719 (0 likes)

[image] CrypTechy:

> 

I was wondering if that’s the best way to configure the navigation… Maybe using custom states with groups showing and hiding as the user clicks on the menu items of the sidebar would be a better idea? I don’t know which system is the best/most efficient/most scalable.

No to custom states as they do not provide potential functionality to have shareable links…use URL parameters or URL paths instead

## Reply by @CrypTechy (0 likes)

I’m not familiar with URL parameters and paths yet but I’ll have a look. As I understand, I should rather stick to pages?

## Reply by @bubblewithsandip (0 likes)

We have a concept of SPA(Single Page Application) in web development. If you use separate pages for each dashboard section then switching between these pages take some time ie. to fetch data, render the whole page etc which is often not a good User Experience(UX).

Instead you can use SPA here by dynamically hiding and showing group when we switch section. So contents for each section will exists in the same route ie. `/dashboard` but the content dynamically change, because this will not refresh the whole page it will lead to better user experience.

One issue with SPA is the URL is same for both section i.e `/dashboard`. To solve this we can add the currently selected section in URL params like for `dashboard` page URL will be `/dashboard?tab=dashboard` and for portfolio page URL will be `/dashboard?tab=portfolio`. To do this in bubble, you need to do “Go to page” action and in parameter you need to pass `tab` as a key and `portfolio` or `dashboard` as a value. Then in dashboard section you can add a condition - get data form Page then check what is the value for `tab` if it is `dashboard` then show the group. Same for portfolio div.
