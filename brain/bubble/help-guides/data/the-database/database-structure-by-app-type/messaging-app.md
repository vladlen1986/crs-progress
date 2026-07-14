# Messaging App
> Source: https://manual.bubble.io/help-guides/data/the-database/database-structure-by-app-type/messaging-app · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

*by Rémi Fossembas from Apeable an official Bubble coach*

{% hint style="info" %}
*Various members of the Bubble ecosystem contributed these use case-oriented database guides. There's always more than one way to do something in Bubble, but the advice here can help you get started if you're new to Bubble!*
{% endhint %}

Instant messaging apps include ones like Messenger, Whatsapp or Slack. This is a chat application that enables users to instant message and connect with each other. Users send text messages, images, videos, links or files to each other, and other users can reply and react with emojis.

This guide’s data structure and logic can be used:

* as a stand-alone app whose purpose is to connect people with each other. By pushing it to a new target population, you will be able to take a slice of the communication market
* or as an additional feature of your app. This module will ease communication between your users and make your app more fun

These suggested data types and option sets should help you build common functionality for messaging apps in a way that keeps things scalable. Preview this messaging app’s data structure by following this link: [Messaging app](https://bubble-appmessage.bubbleapps.io/version-test/messaging_app)

## Data types recommended <a href="#h.8gkrwvp3rqds" id="h.8gkrwvp3rqds"></a>

To connect with each other, users (USER) will create channels (CHAT-CHANNEL) with one another (or with groups). When a user presses the “Send” button a new message (CHAT-MESSAGE) is created to store the value of this message, which can be text, images, who has seen it, etc. Someone in the channel may want to react to this message by selecting an emoji which will create a (CHAT-REACTION) stored as a list into the message’s record.

\
We’ll also cover the feature allowing you to create a list of your favorite contact users (CONTACT).

### CHAT-MESSAGE <a href="#h.w9wi4proi6jw" id="h.w9wi4proi6jw"></a>

CHAT-MESSAGE is where the visual information of a message is stored in the database. It belongs to a CHAT-CHANNEL so that you can perform a “Do a search for” all messages in a channel to find all of a specific thread. This data is protected by the field VISIBLE BY that allows only users in this list to search, view files and view fields of this message. Everyone else has no access to it.

#### Suggested fields on this type

* Type (type, an option set): this field is used for identifying what kind of message content it is, also so that we can control how the message is rendered visually. For instance if the message type is “image” you won’t show the text element of the message.

![](/files/Blk6DuOqdY7eoa4jLVbi)

* Value-text (text): this is the content of the message when this message has Type = text. For instance this field will be empty when your message Type = image, but if Type = text it could be “Hello John”. You could also set Type = link to use BBcode, a special way of storing text that allows for rich text content like links or formatting, for example, “Look at this nice car: \[url=<https://tesla.com/]Tesla.com\\[/url]”>.
* Value-image (image): this is the content of the message if this message’s Type is image (or link with a preview).
* Value-file (file): this is the content of the message if this message’s Type is file. The value of this field can be displayed as a link in the text element of the message.
* CHAT-CHANNEL (CHAT-CHANNEL, another data type): is the reference of the thread this message belongs to.

![](/files/0UXBVSdZVdnPHR9hoTkb) ![](/files/vpE0lL3NpFj1esxGRaMf)

* VISIBLE BY (list of USERS): is set for privacy purposes: only users of this list can view this message. Every time a message is created, set this list of users to all users that belong to this chat channel. When a user is added to the channel, add this user to all previous messages.
* OWNER (USER): is often the Current User but that field allows you to create messages on behalf of someone else. It can be useful if you need automated messages sent by a bot for instance.
* SEEN BY (list of USERS): is set to Current User when the message is created, then users are added when they have read the message.

This allows for helpful features like displaying the number of unread messages a user has: Perform a “Do a search for” CHAT-MESSAGE: count, with Constraints:

* CHAT-CHANNEL = XXX
* SEEN BY doesn’t contain Current User
* VISIBLE BY contains Current User (not needed if previous Privacy Rules is set properly)

![](/files/NsqgIask5gAxwYCvW0an) ![](/files/X1NExwOhnb4NmftjM1Kz)

* CHAT-REACTIONS (list of CHAT-REACTIONS): allows users to react to a specific message with Emojis or Likes.

![](/files/eDxfvAhmGIsxfeCfscZA) ![](/files/OpgAIWrE66Znh0fJBA2y)

* CHAT-REPLY (CHAT-MESSAGE): stores the reference of a message that this one was a reply to. In the case where a user wants to reply to a message, you need to store that relationship somewhere. Let's say the original message is A and the reply is B, then save in message B's CHAT-REPLY the message A's value.

![](/files/lNSy06HRugc2K9OaV5wT) ![](/files/ApG8vaP4CaHIJhWG4Nrb)

#### Privacy rules for this data type

* Make this data type private by default: uncheck all the boxes under “Everyone else (default permissions)”
* Create a rule:
* When: This CHAT-MESSAGE’s VISIBLE BY contains Current USER, they can “View all fields”, “Find this in searches” and “View attached files”

### CHAT-CHANNEL <a href="#h.6ty78c2ynl3u" id="h.6ty78c2ynl3u"></a>

This Data Type is the primary way to keep messages organized by threads.

#### Suggested fields on this type

* Name (text): especially useful if threads are organized into channels with a list of Users.
* PARTICIPANTS (list of USERS): is set for privacy purposes: only users of this list can view this channel. Add users to this list so they can see the thread and participate in the conversation.

![](/files/7eArlspB1IdGwuHmkiEa) ![](/files/rjOdyWAa4oaMBRR2TMIN)

* ARCHIVED BY (list of USERS): allows each PARTICIPANT of the channel to archive a thread but can still unarchive the thread if desired. This data type isn't mandatory for the messaging system to work, but it's an option that allows each user to mute threads and no longer receive notifications.

#### Privacy rules for this data type

* Make this data type private by default: uncheck all boxes under “Everyone else (default permissions)”
* Create a rule:
* When: This CHAT-CHANNEL’s PARTICIPANTS contains Current USER, they can “View all fields”, “Find this in searches”, and “View attached fields”

### CHAT-REACTION <a href="#h.mtzpmp3yvvsd" id="h.mtzpmp3yvvsd"></a>

This Data Type allows users to react to a message with some Emojis. This is a separate Data Type instead of a field on CHAT-MESSAGE because multiple users might react to the message, each with a different reaction (emoji). Because we need to store at least two pieces of information about each reaction (the person reacting and their emoji), we can’t store it simply as one field on CHAT-MESSAGE and instead have to use a new Data Type.

#### Suggested fields on this type

* OWNER (USER): is the creator of this reaction
* CHAT-MESSAGE (CHAT-MESSAGE): the message that the reaction belongs to
* Emoji (Emoji, an option set): this will have choices like 👍 👎 😂 💙

#### Privacy rules for this data type

* Since this data type alone will not contain information that is too sensitive (since the CHAT-MESSAGE’s contents are not stored with each reaction, just a pointer to the relevant message), we could just leave this visible to everyone

### CONTACT <a href="#h.1wjkbpgg3oe1" id="h.1wjkbpgg3oe1"></a>

This Data Type allows users to have a list of contacts.

#### Suggested fields on this type

* OWNER (USER): is the creator of the contact list.
* CONTACT (USER): is the user added to this list.

#### Privacy rules for this data type

* Make this data type private by default: uncheck all boxes under “Everyone else (default permissions)”
* Create a rule:
* When: This CONTACT’s OWNER is Current USER, they can “View all fields”, “Find this in searches”, and “View attached fields”

### USER <a href="#h.9dza5rizw2gu" id="h.9dza5rizw2gu"></a>

Standard built-in Bubble app User.

#### Suggested fields on this type

* First name (text)
* Last name (text)
* Profile picture (image)
* Email (built-in field)

#### Privacy rules for this data type

* Make this data type private by default: uncheck all boxes under “Everyone else (default permissions)”
* Create a rule:
* When: Current User is logged in, they should be able to view “First name”, “Last name” and “Profile picture” fields if you want all users to be able to see each others’ information. “Find this in searches” should also be checked if you want users to be able to find each other, such as by name.

## Option sets recommended <a href="#h.krr8nsqafyt" id="h.krr8nsqafyt"></a>

### Type (of CHAT-MESSAGE) <a href="#h.z8zuvd6h0oy6" id="h.z8zuvd6h0oy6"></a>

* text
* image
* link
* file
* video

This option set is used for saving what format a message is. This helps when it comes time to build what the page looks like, and you want to render different formats of messages differently. For instance if a message Type is “image” you won’t show a text element of the message.

### Emoji <a href="#h.n3g1y243ouw7" id="h.n3g1y243ouw7"></a>

* 👍
* Text: \&#128077
* 👎
* Text: \&#128078
* 😂
* Text: \&#128514
* 💙
* Text: \&#10084

You can of course add as many emojis you want. You can display them in a text element using the option set’s Display or in a HTML element using the text’s value.

If you want to allow your users to create their own list of reactions, you would use a new Data Type instead of an option set.

## Example uses in your app <a href="#h.jge3g9i9dho3" id="h.jge3g9i9dho3"></a>

* Display the list of channels the Current User belongs to: You actually don't need to apply a constraint filter when doing a search with the current user because the privacy rules already ensure that a user can only see channels they are a member of.

![](/files/FiVbOiGQZwkZMq2afnIe)

* Display the list of messages of a specific Channel. In the screenshot below, the value of the CHAT-CHANNEL is given by the Parent group that this Repeating Group is in.

![](/files/D7TunemkBwKZ1T5URnG5)

* Display the list of reactions to a specific Message. In this case, the value of the CHAT-MESSAGE is given by the Parent group that this group is in.

![](/files/eYSLUoPizxMlqs4LkTKM)

## Additional notes <a href="#h.8zfpl9lbgo9s" id="h.8zfpl9lbgo9s"></a>

You might want to allow your users to bookmark some specific messages, like you can on Slack or on Bubble forum, so they can easily access a list of bookmarked messages at any time without having to go through all the threads to find them.

To do so, follow similar logic to how we set up CONTACT, namely a new data type for storing just this information:

* OWNER: (USER) is the creator of the bookmarked message.
* MESSAGE: (CHAT-MESSAGE) is the bookmarked message the owner wants to add to his list.

## About the author: Rémi Fossembas <a href="#h.56fc4fdvwt7b" id="h.56fc4fdvwt7b"></a>

Rémi is from [Apeable](https://www.google.com/url?q=https://apeable.co/\&sa=D\&source=editors\&ust=1649034621764923\&usg=AOvVaw1HLl9Q_vfrfMSIAX4ysWoD) and is an [official Bubble coach](https://www.google.com/url?q=https://bubble.io/coaching?coach%3Dremi\&sa=D\&source=editors\&ust=1649034621765209\&usg=AOvVaw0quSfR4_oRJ4oyIm6W88id)
