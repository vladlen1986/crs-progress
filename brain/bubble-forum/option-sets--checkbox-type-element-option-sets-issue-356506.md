# Checkbox-type Element + Option Sets issue
> Source: https://forum.bubble.io/t/checkbox-type-element-option-sets-issue/356506 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 3 posts · topic: option-sets

## Original post (by @richard.neb1)

Hi,

here is my seemingly simple goal:

When a (not yet registered) user clicks a group element (containing an icon+text),

- the user field Goals OS (referencing an option set) should be updated (either adding or removing the goal)

- the element should change its style (either selected or not).

However it only adds and/ or removes the option set maximum one time. Its quite irregular but add and then remove works a maximum of one time, sometimes not even that.

I can not pinpoint why this is happening.

Now this is what I have:

[image]
image766×306 28.2 KB

[image]
image766×306 28.1 KB

What I tried:

- Cookies are enabled.

- Logged in vs. logged out users.

- Privacy rules disabled for users.

- Triple checked the conditions.

- Tried the same workflows except using a “changed checkbox” event (works).

Any idea what else I could do?

## Reply by @ahmed.elkaffas (0 likes)

Not yet registered user means that “Current user” value is empty.

However, assuming that you tested with already logged in users, then if the 1st condition is true then “Sleep” will be added and thus it might be removed again in the 2nd condition.

I would suggest that you put the condition on the “Element Event” itself which is “Button Test Button is clicked” so you end up with 2 “Button Test Button is clicked” events as follows:

- one with the 1st condition (Current User’s Goals OS doesn’t containt Sleep)

- one with the 2nd condition (Current User’s Goals OS contains Sleep)
