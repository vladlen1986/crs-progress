# Best way to dynamically set a yes/no?
> Source: https://forum.bubble.io/t/best-way-to-dynamically-set-a-yes-no/191482 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 3 posts · topic: option-sets

## Original post (by @cliffwoodjames)

I have a static form I have created. In this form, I will create a Rank. This rank can be “adminAssignable?” this is a yes/no.

When I make the Rank I just want to be able to say “adminAssignable = xyz’s Value” but this is proving difficult. Right now the only way I can do it is with a big list of workflows and conditions, especially because “adminAssignable” is not the only yes/no value.

Just as an example:

Create Rank… adminAssignable = “yes”, hrAssignable = “no” only when dropdown adminAssignable’s value is yes and hrAssignable’s value is no, I have to repeat this for all possibilities…

What is the best way to set a yes/no?

## Reply by @adamhholmes (0 likes)

Maybe I’m misunderstanding the problem…

But why can’t you just use the dropdown values to set the yes/no fields directly, instead of using conditionals on the workflow actions?

i.e.

> 

adminAssignable = dropdown adminAssignable’s value is yes

(that’s assuming your dropdown’s are using static text as their choices).

Another option is to set up an option set for yes/no (with one option for yes, and one for no), with a yes/no attribute set for each one accordingly.

Then it’s even simpler - just set the dropdown type to yes/no and the choice source to the option set’s each item’s yes/no.

Then all you need to do when creating a new Rank is `adminAssignable = dropdown adminAssignable's value` and `hrAssignable = dropdown hrAssignable's value`

As an alternative, you might want to reconsider using dropdowns for this entirely, and simply use checkboxes.
