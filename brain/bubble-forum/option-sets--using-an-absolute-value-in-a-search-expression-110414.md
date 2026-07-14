# Using an absolute value in a search expression
> Source: https://forum.bubble.io/t/using-an-absolute-value-in-a-search-expression/110414 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 2 posts · topic: option-sets

## Original post (by @flora)

Briefly, my app has a data type Base_design, within which has a list of Items. In the Item data type, each item has an Item_type.

Eg, a particular bathroom has floor tiles (item type wall/floor covering), taps (item type taps/showers) etc.

I have a page that displays a repeating group of all items in a base design that works fine. However, I want to edit this so that items of different types are shown in different repeating groups (reason being that I want the wall/floor item types to have much larger images than others. Taps smaller than sinks etc.

I’ve got to the point where I just need to add a constraint for the repeating group but there seems to be no way to just type in “wall/floor” as item type - it’s insisting that I use an expression rather than an absolute value. Is there a syntax I must use - I’ve tried some variations of brackets and quotes but no luck so far.

See screenshot of where I’m up to with the expression,

Many thanks!!

Screenshot 2020-09-08 at 08.48.29|639x499

## Reply by @flora (0 likes)

Ahh think I’ve solved this with Option Sets! [image]
