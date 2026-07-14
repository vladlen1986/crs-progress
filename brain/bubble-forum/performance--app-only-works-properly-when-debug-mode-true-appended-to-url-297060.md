# App only works properly when ?debug_mode=true appended to URL
> Source: https://forum.bubble.io/t/app-only-works-properly-when-debug-mode-true-appended-to-url/297060 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 4 posts · topic: performance

## Original post (by @sean18)

So I’m 99% certain that this is a bug but wanted to ask if anyone else has encountered it. Basically my application only runs properly when you append ?debug_mode=true in the URL.

I found this (http://forum.bubble.io/t/my-application-only-works-in-debug-mode-o-o/275279/9) thread which seems like a similar issue. But what does the debugger actually do that would change the behavior of the application though?  My understanding is that it’s purely an inspectional tool (not an interventional one) that shows what’s happening under the hood at each step.

At this point I’ve narrowed it down to a custom state on the page that’s failing to set properly via a workflow triggered on page load. Without debugger it doesn’t happen. With debugger on it does this properly.

If I understood better what the debugger is doing interventionally I could potentially make a workaround but the catch-22 here is that it’s not possible to debug anything because enabling the debugger makes it work properly.  Does debugger maybe bust Cloudflare’s cache in some way? Pierce through privacy rules? Cause workflows to execute in a different order? Change the behavior of how custom states preserve variables? It seems to be doing one of those things. Is there maybe a way for me to programmatically invoke whatever sorcery the debugger is doing so that the app behaves that way without it?

If anyone wants to see this reproduced I made this Loom vid for their support:          
            
          

or you can try yourself here:[image] (https://problemattic.app/version-4jmt/projects?ref=IYKMBN)
[image] (https://problemattic.app/version-4jmt/projects?ref=IYKMBN)

## Reply by @chris.williamson1996 (2 likes)

So I didn’t check your video as I’m not around a PC atm but typically when this happens you have actions running out of sync and it’s a timing thing.

Typically a way to fix it is move part of the action being skipped to a custom event or set states for “finished = yes/no” to run next step.

It’s rare these things happen and are quite annoying but there are ways around them.

Running debug and step by step will tend to slow down action execution and make them run in sync.

## Reply by @sean18 (2 likes)

@chris.williamson1996 & @nico.dicagno  literally while you were responding I figured out what I believe is the culprit and a workaround that I can confirm fixes it.

I have the clan set in a reusable element (the floating header) and it has its own workflow that handles the logic for doing the private labeling of the app.  The project filters are dependent on getting the “clan” custom state set in the header for executing its workflow to apply the appropriate filters for that clan.

So what I did was to put a custom state called “Header Loaded” in the reusable header element defaulting it to “no” and setting it to “yes” as the last step of its onload workflow.

Then in the projects page instead of triggering the workflow that handles the filter configuration logic on page load, I trigger it on the condition once FloatingHeader:HeaderLoaded=“yes”

That solved it and I agree with both of your assessments that likely what’s happening is the app parallelizes workflows in normal operation (perhaps for speed optimization) and the debugger somehow single-threads everything so it starts top to bottom and runs the workflows sequentially in the page.

There should likely be some kind of setting we can toggle for single-threaded vs. parallelized so at least the debugger isn’t altering the app behavior. Anyways I can confirm this workaround solves the issue and I’m all set now. I appreciate both of your help [image]

## Reply by @nico.dicagno (1 likes)

I know that its frustrating that debug_mode affects the behaviour of the app and its not a purely inspectional tool. In theory this is something that seems like a no-brainer; debug mode should not affect the functioning of the app. However adding debugging functionality to a page without affecting the rest of the page is not an easy feat for one main reason: it will slow down the app.

And this is probably what is going on here.

Your production app is encountering race conditions. Bubble workflows are asynchronous, they don’t necessarily trigger in order and there is absolutely no guarantee that they complete in order.

Debug mode is probably slowing down the app just enough so race conditions don’t cause problems.

Using custom worflows can be very helpful here, as custom workflows guarantee that all steps before it are completed, and all steps in the custom workflow are completed before the rest of the workflow runs.

Use ‘add a pause’ action to test whether its race conditions causing problems.

## Reply by @system (0 likes)

This topic was automatically closed after 14 days. New replies are no longer allowed.
