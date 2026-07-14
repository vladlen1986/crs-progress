# Loading mobile views faster
> Source: https://forum.bubble.io/t/loading-mobile-views-faster/375028 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 5 posts · topic: spa

## Original post (by @harun_kaldi)

Hello bubblers, need your advice.

I work on an native mobile app that has many views containing lists that do a search for database calls.

For example: Feed, Notifications, Chats etc.

First time of tapping each view containing database search takes disturbing long time to load. On my Android device in BubbleGo around 6-7 seconds per view on each view change.

Instead, I would wish showing a loader at the beginning, and load all needed data at the launch so the app can use that consistent data that is loaded at the beginning.

Is there a way to load all data on the launch of app? Even if that costs more time on first launch in splash screen?

What’s your approach for faster page loads? How should I design database search lists for faster results?

I am open for any advice.

Thanks

Harun

## Reply by @reid4010 (1 likes)

The only way I can think of doing that at the moment is by treating the mobile app like a single page web app. Which would involve having one mobile view with many groups that have conditional visibility. That way on page load you could load all the data you need and then give the illusion the user is changing tab but in reality it is just hiding and showing the different groups. Im not sure if this would be a bad idea with the app stores or loading but that is one way.

The other way would be for bubble to create a Global state across the whole app so it could be accessed on every view. And then we could just load everything when the app is opened (which might take a little longer) but then there is no loading when opening a view for the first time.

I do like how at the moment when the data is loaded onto a view, if you leave that view and go back all the data is still there and it does not load again, so I’m actually happy enough with how it works but ideally a global state would be great.

## Reply by @senecadatabase (1 likes)

I have a Single Page App with about 20 some reusable elements as pages. A lot of those pages are also dynamic, which of course means the data in them can change a ton of times.

Use URL Parameters and you’ll solve the navigation problem. If a user clicks the back button, they’ll go to the previous page. I use all URL Parameters, which also makes it nice because it’s easier for users to share a page, etc.

Also, my apps load almost immediately…usually in under a second.

Added: After I hit post, I noticed you say you’re using the mobile editor. I have not used that yet. The method I gave is for the web app version. Maybe someone familiar with the mobile editor can verify if this works on their end.

## Reply by @harun_kaldi (0 likes)

Thanks for feedback! If I setup something like spa, then i have to show everything using custom states. But as far as I know, this wont create any navigation history. I can place a custom navigation bar at top for navigation. But if user uses back button at bottom of device, then it will quit the whole app no matter which page user views. But thanks anyway.

## Reply by @harun_kaldi (0 likes)

Thanks for advice. As you said, this works on web app. On mobile, there are views instead of pages. Changing views are the only option to add system navigation history as far as I know so far.

I wonder if there is a way manipulating system nav history except go to view or go to tab actions?

## Reply by @system (0 likes)

This topic was automatically closed 30 days after the last reply. New replies are no longer allowed.
