# Creating a list of parts with quanites in data type
> Source: https://forum.bubble.io/t/creating-a-list-of-parts-with-quanites-in-data-type/156238 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 13 posts · topic: performance

## Original post (by @david.joshua.foreman)

I’m working on an app where i’m going to build assembles that are made up of different parts.

So I have a data type material (all my parts) and a data type assemblies. In the assemblies data type I have a field for a list of material and a field for a list of quantities (numbers).

*As far as I have found you can’t do arrays in bubble.

That went pretty smoothly. I’m assuming the data is always input into the database in order so using the index value should associate the correct quantity with the correct material.

Now my issue i’m having is I’m trying to display this data in a detail view for the user to review and since there are multiple data types that i’m trying to display in a repeating group I’m not understanding how to correctly display the information.

I’ve attempted to search for the value, but I feel like I’m just searching in circles.

Basically I have two lists and I want the value of both lists at the same index.

I’ve included a few pictures if that helps. I’m going to take a break and maybe it will come to me when I come back, but appreciate any pointers anyone has.

[image]

[image]
assembly 2953×602 41.1 KB

[image]
assembly 1946×581 38 KB

## Reply by @robhblake (1 likes)

Hey @david.joshua.foreman

Interesting, I just replied to a very similar situation this morning. Here’s the link to my suggested database set-up for that (which was about recipes and ingredients but similar approach)

  

    

    [image]
    Best approach for handling paired values + help on displaying list of things in RG Need help
  
  
> 
    Hi there, 
I saw similar posts on the subject but somehow cannot work it out. 
I am creating product made of different ingredients / quantities e.g the “English Breakfast” product would be made of Bacon x3 and Eggs x2 (I know; frugal :)) 
I also need to be able to keep track of the quantity left for each ingredient (so that I can re-order if needed) so the inventory side of the app is quite important as well. 
Q1 
What is the best way to store those values? At the moment, I went where 2 list of …
  

Rob

## Reply by @codecompany (1 likes)

Mocked up something really quick. Prone to errors [image]
[image] (https://bubble.io/page?name=index&id=codecompany-assembly&tab=tabs-1)
[image] (https://bubble.io/page?name=index&id=codecompany-assembly&tab=tabs-1)

## Reply by @helpful-pixel (1 likes)

Although nesting repeating groups can solve complex issues seemingly like magic, be aware each nested item significantly slows down the page performance (at least in my experience).

This might be OK for seldom-used parts of your site (such as unusual/rarely-used admin functions and views), but generally in production I avoid nesting anything that is being pulled from the database.

## Reply by @david.joshua.foreman (0 likes)

Hey @robhblake thanks for the reply.

So reading through your post was somewhat helpful.

My main concern with this approach and maybe it shouldn’t be is the potential number of entries this could cause. Because if I understand correctly each different ‘Ingredient’ that is part of a recipe will have to be a completely different entry in the ‘Component’ type.

In my app I’m also going to have ‘Orders’ that will have lists of ‘Assemblies’ with quantities. So I’ll have to do the ‘Component’ data type again.

I understand your point about sorting two different lists might cause issues.

Trying to explore the different options that are available to handle data association.

## Reply by @david.joshua.foreman (0 likes)

Just a thought that I’m not even sure is possible. But could you combine the ‘Ingredient’ and ‘Quantity’ into a text (or other type). Then later extract the two later?

Though I don’t know has feasible this is especially since a custom type seems to be saved using the ‘Unique ID’ associated with it. So you would end up with a long text that is just a random list of letters/numbers.
