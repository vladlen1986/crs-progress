# Option Sets and Database
> Source: https://forum.bubble.io/t/option-sets-and-database/139895 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 5 posts · topic: option-sets

## Original post (by @pennygum)

Hi there,

I am a Bubble Newbie and trying to learn!

I have an Option Set with colours, e.g Red, Yellow, Blue. I wish to display this Option Set with the Multi-Select Dropdown Plugin and then the selected options should be saved to a field called “Favourite Colours” in the User Data type.

Should the field called “Favourite Colours” in the database be a list of texts or a list of the option set colours?

I am asking as I cant get Bubble to make the changes to the current user. I am doing something wrong, as I get an error message: “Make changes to current user: value should be Option -Colours but right now it is a List of Option-Colourses”.

What am I doing wrong?

Appreciate any help.

## Reply by @pennygum (1 likes)

Thank you so much - “set list” solved my problem. You have saved me hours of head-scratching. Really appreciate the help! Thank you, thank you, thank you! [image]

## Reply by @adamhholmes (0 likes)

[image] pennygum:

> 

Should the field called “Favourite Colours” in the database be a list of texts or a list of the option set colours?

You can use either but it makes more sense, and will probably make things easier, if it’s a list of option set colours.

> 

I am asking as I cant get Bubble to make the changes to the current user. I am doing something wrong, as I get an error message: “Make changes to current user: value should be Option -Colours but right now it is a List of Option-Colourses”.

Without knowing more I can’t say for certain, but it sounds as though it’s one of two things…

Either your favourite colours field is not set as a list (so it’s expecting a single colour) - so make sure it is set as a list field.

If it definitely is set as a list field, then you’re probably trying to use the ‘Add’ operator in the change current user workflow, rather then the ‘add list’ operator.

‘Add’ can only be used to add a single item (such as from a normal dropdown menu),

To add a list, you need to use ‘Add List’ instead

## Reply by @pennygum (0 likes)

HI There.

Thank you that was really quick and helpful.

You are correct, it was an “Add List” problem. It works now for adding items.

How would I do the same thing for removing items from the list? Should I copy the workflow item and use the same principle with “remove list”?

Do I need a conditional so that Bubble knows when I am adding from the list and when I am removing from the list? What would the conditional be?

Thank you for your help.

## Reply by @adamhholmes (0 likes)

Yes, use ‘remove list’ to remove the selected list of colours from the user’s list of favourite colours.

So if you want the user to be able to select colours from the dropdown to be removed from their list, then you’ll need a separate workflow for that.

Alternatively, if you want the dropdown to display the user’s stored colours, and allow the user to add more, or remove them directly from the dropdown menu, then make sure the dropdown has a default value of the current user’s favourite colours - then use ‘set list’ instead of ‘add list’ or ‘remove list’.

That will set the users list to exactly what is selected in the dropdown.
