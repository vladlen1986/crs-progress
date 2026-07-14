# Feed on a Social Media and post's privacy
> Source: https://forum.bubble.io/t/feed-on-a-social-media-and-posts-privacy/256223 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 3 posts · topic: privacy-rules

## Original post (by @ceabiven)

Hi everyone ! Hope you guys are all right [image] The explanation is a bit long but the issue is very interesting ! Tell me what you think !

I am blocked on the main feed of a social media I’m building on BB. I’m displaying all the posts in a repeating group. Except if the Post’s privacy is “friends only” and the current user is not in the list of friends of the Post’s creator :

[image]

So first I only did a condition “If current User’s list-friends doesn’t contain current Post’s creator and Post’s privacy is Friends” then “This element is not visible”. Easy.

However in order to have a more performant app specially when the feed page is loading, I’ve added a limited number of Posts which are charging at first.

[image]

Like the pic above except that instead of “10” I add a Custom State : “:item until CS”. And every time the user click on the group “Display More”, I’m adding +20 at the Custom State.

The main issue is that sometimes there are 20 Posts with the privacy “Friends only” and none of them can be visible for the Current User. Indeed, he or she is not inside their friends list ! So you click on “Display More” but nothing happened.

I have two questions that might solve the issue in 2 different ways :

- 

I put Privacy Rules to the data type “Post” in order to block the access if you are not inside the friends list of the Post’s creator. Is there a way to know inside a “Do a search” inside a reapeating group that the element is not reachable ? I’ve tried “Creator is not empty” but it doesn’t work.

- 

The 2nd way is to add more items each time we click on “Display More”. The main issue is that I have to know how many Post are hidden in order to really diplay +20 item. I’ve tried with “Intersect with” but it does not help. How would you do it ?

There is also a 3rd way : addind a distribution list data field (List of Users) to each Post. If you are inside the distribution list you can see the post … But I don’t like this option because it’s really heavy in terms of performance.

Maybe you have also others advices ?

Anyway, thanks in advance and have a good day !

Cheers,

Charles.

## Reply by @ceabiven (0 likes)

To be honest I prefer the solution with the privacy rules, it’d be perfect if you can simply check if the Post is reachable ! You add a condition inside the Repeating Group : “post <> not reachable” [image] But I don’t know how to do that

## Reply by @ceabiven (0 likes)

“Privacy Rules are your friend”

I found the solution. I needed to create a feed in my app and I wanted to display the Post by privacy. So if it is a public post, anyone can see it. If it’s a friend privacy post, only the users in the Friends list of the Post’s Creator can see it.

The other important thing is I wanted my app to be performant. So I needed to constraint the Search for to only display the first 10 Posts.

Originally I put a condition inside the main group of a repeating group : If the privacy of the post is Friend and the Current User is not in the friend list → The post is not visible. It works find until you want to display only the first 10 items.

As a Bubblers you want to give 10 Post view for your user but because some are hidden by the condition, It shows randomly numbers of Post depending of how many Post are hidden for the user. I am not confortable with english so here is a little draw :

[image]

[image]
image664×592 8.13 KB

So if you want to really display 10 Posts, you should use the privacy rules instead of the conditions.

Inside the Data Type “Post”, in the privacy rules, you put a condition : If Post’s privacy is Friends and Current User is a Friend → He can see all field. And by default : if the user is logged in, he can see nothing :

[image]
image1092×178 7.72 KB

So thanks to that if you do a “Search for Post :items until 10”, you really have 10 items and not ramdomly numbers. And everytime you click “Display more” you have the number you want.

[image]
image534×540 5.1 KB

Hope it helps the ones creating Feed with privacy constraints [image]
