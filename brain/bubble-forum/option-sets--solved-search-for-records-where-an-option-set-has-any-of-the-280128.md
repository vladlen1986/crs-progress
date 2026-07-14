# [SOLVED] Search for records where an option set has any of these values
> Source: https://forum.bubble.io/t/solved-search-for-records-where-an-option-set-has-any-of-these-values/280128 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 3 posts · topic: option-sets

## Original post (by @dylanjhumphreys)

I have a field which is of type option set. the options are: org,dept,team

I want to match any record where the acl has ANY of the above options.

Example using pseudo SQL:

WHERE acl is in [ org, dept, team ]

I have tried creating a custom state of the appropriate type and ticked “list”, and then set that during page load to all the items in the option set.

Then in  “Do a Search for”:

acl is in page.acl

but I get no records returned.

I assume because its trying to find a record where acl is set to [ org, dept, team ], which it wont be, it will be ONE of those.

Any pointers?

## Reply by @dylanjhumphreys (1 likes)

Yeah its a single option, and you are correct, it does work. I was setting the custom state from another custom state. I found that if I “Do a Search for” it worked. Thanks for the pointer.

## Reply by @tylerboodman (0 likes)

Is your field a single option, or a list?

[image] dylanjhumphreys:

> 

Then in “Do a Search for”:

acl is in page.acl

This should work if the field is a single option. It would be checking if the thing’s option is in the list of options provided
