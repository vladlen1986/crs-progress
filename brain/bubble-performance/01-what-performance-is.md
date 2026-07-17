<!-- source: The Ultimate Guide to Bubble Performance (Petter Amlie), Revision 3 — physical PDF pages 23-34 -->
<!-- What performance is (perceived vs actual, performance as a feature) -->

# What performance is

The difference between actual performance and user-perceived performance

## What is an app?

It may sound silly. Of course you know what an app is, or you wouldn’t be here trying to build one. But let’s still take a quick glance at it, as I find it’s often helpful to break things down to their simplest parts to understand them better.

Let’s first look at the word. App. Depending on whom you ask, most will agree that the word app is defined loosely enough to include both a calculator on your mobile and a billion-dollar CRM system. As long as it’s a piece of software that has a user interface, it’s an app. Simple.

The web browser has in many ways become a new kind of operating system. Where you used to install software on your computer to run, an increasing amount of these applications now exist 100% in your browser. There are many reasons for this: the fact that you can pick up your work on any device with an internet connection, that you can exploit the hardware of massive server parks where uptime and security is taken care of, and that your work increasingly is backed up for every single action you perform (like a Google Doc or indeed a Bubble app).

So what does an app do? Well, most ideas, from your homemade cake recipe catalogue system to the global social network with billions of users are really the same thing: a new way to manipulate and visualize information stored in a database. Facebook is just

a spreadsheet of User profiles saved in a server park somewhere, and every image, every like, every happy birthday-post, as social as they may feel to us, are all simply a way to visualize the server’s data in a way that we find appealing.

Other apps focus more on the processing of information to speed up tasks that would otherwise be cumbersome. The exchange of map coordinates, user reviews and secure payment tokens has made Uber one of the biggest commercial successes of our time. Uber doesn’t actually drive you anywhere, it simply searches its database for someone who can, provides basic communication and arranges a financial transaction. Storing, indexing and transferring the content of audio files has made Spotify a household name. It didn’t invent music, it just made it simpler to navigate by finding ways to make a database search efficient and visually pleasing.

These apps are so different, we forget they are all the same.

They all work on two layers. One layer is hidden and one is visible: one is complex to the point where a human brain cannot even begin to process it - the other working solely and intentionally to hide that fact. Ordering an Uber is a preposterously complex process of ongoing information exchange between devices all over and above the planet, but for you, it’s no more than a few clicks at the screen. Hello.Goodbye,Thanksfor theride.

Appsconsistoftwolayers.Yourjobistobreakthechainbetweenthem.

The fact that the complicated inner workings are invisible to you is not a bug, but the app’s main feature. Your job as a designer and developer is to break the chain between the two layers and make complicated stuff seem easy. More settings, more choice and more insight into how the process looks would make the app worse, not better.

So what does that tell us?

It tells us that in the stage show that is your app, you are the magician. You get to tell the user what to do and where to direct their attention. You get to prepare the stage, the machinery, the tools and equipment and train the beautiful assistant to do exactly what you want to avoid breaking the illusion. The user doesn’t need to know what’s going on backstage.

If you do your job right, they’ll believe it’s magic. If you reveal your trick, or complain how hard it is to do, you’re not helping your audience - you’re ruining their evening.

## What performance is

Performance can be separated into two parts: Actual performance, and user-perceived performance (often abbreviated to UPP). Actual performance is how well your app is optimized to complete a given process within a set amount of time. In most cases, the final processing time is not the result of one single factor, but the combined work time or delays that each step adds.

This fictitious example has a total processing time of 650 ms

In this simplified example we follow a process going through different steps. A user clicks a button, and 650 ms later, the result is visible on the screen. The steps marked with a red clock are delays that add no value to the process. They’re simply a necessary part of the process, some of them governed by the laws of nature more than anything else.

When the user clicks the button, the user’s web browser sends a query to the Bubble server. This little packet travels at near the speed of light through fiber optic cables across the country, continent or planet, depending on where you live and where the server is located. Bubble’s server receives the query and processes the request, and then has to send the information back through the same web of cables, before your device receives it and your CPU goes to work to render the changes on the screen. The important thing to note here is that while there is a total processing time of 650 ms, Bubble’s servers and software are only responsible for 200 of them.

An important mindset to take in as you prepare to optimize your app is that performance is a war of a thousand battles. There are few things you can do in isolation that will drastically change your performance, but a thousand right decisions can lead to significant improvements.

## How performance is perceived

### Perceived vs actual performance

User-perceived performance is the only performance that matters. Your users will bring their own expectations, and provide your app with input as they click, write and drag their way around it. In return, you give them an output that they can see, hear or feel. User-perceived performance is not the time, but the quality of the output that comes in response to a user’s input.

Whether your app is fine-tuned to process 100.000 database records in a second, or if it struggles to process a single one is irrelevant if your user can never tell the difference. If given a choice between an app that feels quick and responsive, but is inefficient under the hoodand one that breaks world records in data processing, but feelschoppy and slow, they would pick the first one every time.

User-perceived performance can be manipulated by all sorts of tricks to hide the fact that your app doesn’t operate at lightning speed, and many of them have nothing to do with performance at all. Loading screens, animations, asking for user input and other distractions are all perfectly valid ways to hide the fact that your app needs some time to finish a process, and it’s being done to you constantly without you being aware.

In the end, your job as a developer is to build a first layer that is optimized for quick loading, low memory usage and quick processing, and a second layer that offers an experience that your users enjoy regardless of the limitations of the hidden layer beneath.

### Developer-perceived performance (a.k.a. watching grass

### grow)

We can’t discuss the psychology of perceived performance without bringing your perspective as the developer into the conversation.

We can all agree that performance is an important set of metrics for your application, but as with all things in life, a bit of perspective makes sense. Watching and timing every click of a button and agonizing over a workflow that takes longer than you hoped can help you create a faster app, but it can also kick you down to OCD town where you waste months obsessing over something that your users will tolerate just fine (maybe not even notice).

Let's get two things out of the way first: a watched kettle will never boil, and your own app is always going to seem slow. Let’s say you click the Create user button in your app, and the seconds pass. You switch between watching the grass grow outside and staring at the screen while Bubble sets the user up for you. Hopeless.

But is it?

How long did it take to set up your Gmail account? Your LinkedIn profile? Your Apple ID? I bet you have no idea. You didn’t think about the five seconds it took, because it wasn’t your app. In most cases, your app likely performs on par with any other app. It’s just that you’re not obsessively timing those.

EvenGmailneedsafewmomentstoload

The insight that you can easily get lost staring at your own work also applies to making realistic comparisons: searching on Google is insanely fast, because Google has had the best engineers on the planet looking into that since 1998. It’s literally the only thing Google.com does. Twitter runs like clockwork for hundreds of millions of users

simultaneously because they’ve invested massive resources over many years making sure that it does. Try searching in another app, such as your CRM or some internal company software that you use, and you’ll see that they perform just like your app – average. Searching in databases is pretty slow. It can be solved with complex indexing, caching and algorithms, but to really specialize in a specific area like search probably requires more tech talent than you can afford.

### Performance is a feature

Your app consists of features. Some of them will be ready in time for the app’s first release, many will not. You’ve compromised, and you’re probably already looking forward to writing blog posts and tweets to your future loyal users describing the new features you just deployed.

Performanceisanotherfeature. There are lots of small improvements you can implement to fine-tune your page load. Some of them will take a bit of extra time, others a lot. Some are worth doing before the first launch, others aren’t, even if they’re worth doing later.

Developing efficiently means knowing when you’re becoming your own worst enemy – be mindful of your priorities, and keep in mind that the best product, after all, is the one that ships. This approach is also important to keep in mind when planning for the

workload metric: while saving WU is an approach that makes sense, it shouldn’t be your main focus: your users are your bread and butter. Keep them happy.

### Bubble plans

Are you investing in performance or capacity? Many curious users ask themselves if their app will perform better on a more expensive plan. This is a natural question: Bubble’s plans are described in vague terms, mentioning a numberofunitsthat doesn’t really tell you much about how it will affect your app. In Bubble’s defense, referencing their actual hardware is the only thing they can do, since every app is different and it’s impossible to predict how the hardware setup will predict your specific scenario.

We can still try to answer the most burning question though: will your app’s performance improve on a more expensive plan?

Somewhat. But not that much.

The simple, boring truth is: if you’re writing angry tweets that your app is slow on the Professional plan, you’re probably going to keep writing angry tweets when you see that it’s still slow on the Enterprise plan.

What you will get is capacity. You can handle more users, more recursive workflows without timing out and larger file imports. Will it not affect speed at all? Yes, it will. But it’s not going to turn a wooden cart into a Ferrari. Don’t make that investment unless you need it to handle a big user base or unavoidably perform consistently heavy server workloads, and keep in mind that the realistic difference is measured in milliseconds.

For a startup or most apps in general, that’s simply not worth the added hosting cost. A dedicated server is one thing you can do to speed up your app, not the thing.
