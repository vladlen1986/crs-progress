# Data is not showing on the webpage
> Source: https://forum.bubble.io/t/data-is-not-showing-on-the-webpage/360730 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 3 posts · topic: privacy-rules

## Original post (by @itua)

Hi Everyone

I’m having issues with my webpage and Im guessing it’s something to do with the database.

I have a data type Listing and another called User.  User is a field in Listing linked to the User data type (image 1)

When I try to show fields from Listing’s Users i.e Date of Birth, it does not show on the webpage.

Does anyone know how to solve this?

Many thanks

[image]
image12516×820 178 KB

[image]
image2872×994 76.5 KB

[image]
image3409×192 3.26 KB

## Reply by @itua (1 likes)

Solved this myself, Instead of using the User field, I used “Creator” instead

## Reply by @AndyMountHood (0 likes)

I’m glad you solved it. I haven’t had to resort to using the Creator field yet. The Creator field is automatically filled when the db record is created, while a User field would have to be intentionally filled in an earlier workflow. Another common issue devs face is if their privacy rules prevent the viewing of some or all fields. Maybe you set a privacy rule on the User field but not the Creator field. Another possibility is you could have set the User field incorrectly (for example, setting it to This User instead of Current User)–although, depending on your use case, they could be the same thing.

Devs disagree with one another about whether it’s best practice to use the Creator field or add a User field and use that instead.
