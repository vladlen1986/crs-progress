# How to create a list of things inside a parent thing
> Source: https://forum.bubble.io/t/how-to-create-a-list-of-things-inside-a-parent-thing/77964 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 9 posts · topic: migrations

## Original post (by @ch.kr.lee)

Probably a simple answer here. I’m creating a job board:

- I have a Thing called a Job

- Inside the Job I have fields like “Seniority” which are just “lists of texts”.

- Issue is, when I create a new Job entry, I have to type in “Senior”, or “Intermediate” each time.

- I feel like the right answer is to create another Thing called “Seniority” and then somehow use that as a type of field for the Job. But I’m not sure how that works and if that’s the right path.

- The goal would be to, everytime I create a Job, have a dropdown to choose 5 “seniority” options for that job.

Appreciate the help!

## Reply by @mikeloc (2 likes)

I would approach what you have described by adding a text field called type (or something like that) to the Job datatype. Then, add a dropdown to your form and configure the job types as static choices like so…

[image]
types592×513 14 KB

Then, when a new job is created, populate the type field with the value that is selected from the dropdown.

By the way,  you can also use the Dynamic choices option to populate your dropdown, and you could have an option set that includes all of the job types. Just another way to go with it.

Hope this helps.

Best…

Mike

## Reply by @tanqinta (1 likes)

@ch.kr.lee

I’ll recommend setting “Seniority” as a new thing which is “text”.

[image]

In that situation, when you are creating a new job entry, you can add this format to your form.

[image]

With the workflow being:

[image]

[image]

You should be able to add Seniority lvls to each Job at once then.

## Reply by @boston85719 (1 likes)

You could also look into the new feature of option sets and use those. The choices will appear faster than if using a data type thing, especially when the number of choices increases.

Check out this post by @romanmg from Coaching Bubble. It was helpful advice on how to make use of option sets.

  

    

    [image]
    Is it worth migrating to the new option sets feature? (http://forum.bubble.io/t/is-it-worth-migrating-to-the-new-option-sets-feature/77122/4) Database
  
  
> 
    @boston85719 Two things: 

You can create a field within a data type, where the field type IS an option set (choice) or list of option set (choices). Your option set will appear in the list of field types. Bubble doesn’t really distinguish between your option sets and other data types, but they’ll be there. 

You can create expressions that treat the option set as an object. In your example, you were able to do “This product’s category is category selected” where “category” referred to one of …

## Reply by @tanqinta (1 likes)

@ch.kr.lee

It is to prevent duplicates within the “List of Seniority” database as it is a list of things.

Because depending on how you structure your filtering system, you might end up having multiple entries of the “Job” appearing.

For example, if you accidentally registered Job A has having a 2 entries of Intermediate seniority, your filter might end up showing 2 Job A in the results depending on how your filter is done.

That’s my understanding of it, not sure if it is correct, can anyone else advice on it if my perspective is right?

## Reply by @ch.kr.lee (0 likes)

Definitely helps. I’m thinking of manually inputting jobs into the database myself though, so I’m not sure a dropdown on the front-end will help.

I’ll try it though and maybe just hide the dropdown somewhere.

Thanks!

Chris
