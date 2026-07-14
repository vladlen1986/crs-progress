# Is it worth migrating to the new option sets feature?
> Source: https://forum.bubble.io/t/is-it-worth-migrating-to-the-new-option-sets-feature/77122 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 9 posts · topic: migrations

## Original post (by @dom1)

Hi everyone,

I’m trying to figure out whether it’s worth restructuring my database to fully embrace the new option sets feature that was recently released.

The upsides seems to be some performance gains and generally neater.

The main downside i can see is just time. If you have a complex app and previously maintained option sets as lots of data types, it’s not a small amount of work to restructure everything.

Keen to hear how others have tackled this. If you have restructured, was it ok?  Was it worth it, performance wise, other wise? If you haven’t how come?

Thanks in advance

Dom

## Reply by @romanmg (6 likes)

@boston85719 Two things:

- 

You can create a field within a data type, where the field type IS an option set (choice) or list of option set (choices). Your option set will appear in the list of field types. Bubble doesn’t really distinguish between your option sets and other data types, but they’ll be there.

- 

You can create expressions that treat the option set as an object. In your example, you were able to do “This product’s category is category selected” where “category” referred to one of your Category data types, right? You can still do that with option sets…

For example, say you have an option set called “Product Categories” with options for:

- Fitness

- Games

- Art

- Music

- Misc.

And, in your Product data type, you’d need a field  - let’s call it “Type” - with its field type set to this “Product Category” option set.

If you have a dropdown for the user to filter products by category, set it up to display the option set choices and the expression in a repeating group data source could be:

Search for Products, where Type = Dropdown’s value. Just like you would with the data types!

Or a condition in the RG cells:

When “Current cell’s product’s Type is Music” > change icon to a musical note (or something)

^^ although, in that case, I’d actually create a custom attribute under the Option set for image to upload different icons per choice and then dynamically display “This product’s type’s icon” in an image element [image]

Hopefully that shows you how to achieve the same structure as you did previously with data types. But, if I misunderstood you, please let me know!

Cheers,

Gaby

Coaching No Code Apps

Join our Facebook group  (https://www.facebook.com/groups/1165236046981865/) for insider access to no-code development

Get professional development services  (https://coachingnocodeapps.com/services)

Enroll in expert-led courses and products (https://coachingnocodeapps.com/resources)

## Reply by @boston85719 (2 likes)

I thought about it, tested briefly and decided against it.

Yes, seems like speed benefits may exist, but the major drawback for me, is usually my options (not option sets) I created in the database were used to set relations to other datatypes or conditionals. The options sets seemed to lack an ability to relate to other tables easily.

For example, options from my database for product category such as “shirts” is easy enough to display in an option sets used for dropdown selection, however, relating this for sort or filter of search results for me was not as useful as when I could have “this products category is category selected” where my category is the options from the database (a datatype itself) which is a data field in the product data type.

I say, ‘to each his own’, on this one. Sounds to me like you already had your answer before posting, which is, it’s not worth it.

## Reply by @dom1 (1 likes)

Thanks @boston85719. Agree the lack of ability to relate to other data types seems like a drawback.

I spoke to @romanmg (via email) and she was very positive about it and had converted a few of her apps over. Agreed it was a tedious process but worth it for the long term.

If anyone else has any thoughts please do share.

Thanks

## Reply by @boston85719 (1 likes)

@romanmg thanks for the explanation of how to get that set up. I am going to try and implement it as I have some filter options that I am not happy with the loading speed of and if I can get the option sets to relate to products etc. they will be a great help.

Cheers

## Reply by @it1 (0 likes)

@romanmg Honestly I am just eagerly waiting to see this in one of your video’s …  I have found options to be useful for future projects but ones I have already deployed work and are not broken.

Anything I could call a drawback is the fact you cannot edit or update a field in the option set unless it is in the editor, but that’s just the way I trying to use it not really a bubble issue.
