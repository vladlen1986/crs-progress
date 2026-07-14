# Social Network Apps
> Source: https://manual.bubble.io/help-guides/data/the-database/database-structure-by-app-type/social-network-apps · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

*By Daniel Abebe, co-founder of HuggyStudio*

{% hint style="info" %}
*Various members of the Bubble ecosystem contributed these use case-oriented database guides. There's always more than one way to do something in Bubble, but the advice here can help you get started if you're new to Bubble!*
{% endhint %}

Social Networks serve the main purpose of connecting people or businesses together. Most of the time, they are built to scale and have a business model focused on ad revenues. Their form and target audience can vary greatly. Famous examples include Facebook, Instagram, TikTok, Linkedin.

In this guide, we take you through the creation of the data structure for a social network like LinkedIn called “NoCodeLinkedin”. Good to know: NoCodeLinkedin is a real use case built on Bubble.io that you can check out here: <https://nocodelinkedin.com/>.

If you are not familiar with LinkedIn, here is a quick introduction into our use case with an overview of the basic functionality:

* LinkedIn is the world’s largest professional network. LinkedIn helps professionals find talent, job opportunities, stay in touch with their contacts and extend their network.
* Basic functionality includes:
* Sign up / Log in
* Edit profile (Name, Bio, Headline, Experience)
* Connection requests (Send, accept, ignore)
* Create a new post
* React to a post (Like, Celebrate, Support, …)
* Comment on a post
* Private chats
* Notifications

## Data types recommended <a href="#h.8gkrwvp3rqds" id="h.8gkrwvp3rqds"></a>

After signing up, users will edit their profile and start sending connection requests. Later on, users will create posts and will scroll through the latest activity of his/her network. Last but not least, the user will also react and comment on other users’ posts. The data structure we are creating needs to take all of these actions into account.

### User (default) <a href="#h.6fu02v3hv8op" id="h.6fu02v3hv8op"></a>

The Data Type “User” is by default already available on any Bubble app. It helps you handle user authentication. As a rule of thumb, if someone needs to signup/login to your platform, this person is considered to be a User. In our case, all NoCodeLinkedin profiles are actual Users.

#### Suggested fields on this type

* email (text) - this is a built-in field, i.e. it’s already there for you
* Modified date (date) - also a built-in field
* Created date (date) - also a built-in field
* Slug (text) - also a built-in field; see [this article](https://www.google.com/url?q=https://manual.bubble.io/help-guides/structuring-an-application/page-slugs%23:~:text%3DThe%2520%2522Slug%2522%2520is%2520a%2520new,to%2520that%2520things%2520unique%2520ID.\&sa=D\&source=editors\&ust=1649795523448470\&usg=AOvVaw0fU8OioMCoPT50VRlX1agp) on using Page Slugs
* First name (text)
* Last name (text)
* Profile picture (image)
* Headline (text)
* Bio (text)
* Experiences (list of experiences): Working experience of the user; see [this article](https://www.google.com/url?q=https://manual.bubble.io/help-guides/structuring-an-application/data-structure%23connecting-types\&sa=D\&source=editors\&ust=1649795523449699\&usg=AOvVaw3rhcp9Gc_QsX18V0QPE2PE) on linking data types
* Invitations (list of invitations): Connection requests received
* Chats (list of chats): Actual chats that this specific user has with other users
* Notifications (list of notifications): Notifications received about relevant activities

#### Privacy rules for this data type

* This User is Current User
* View all fields (checked)
* Find this in search (checked)
* View attached files (checked)
* Allow auto-binding (unchecked)
* Everyone else
* View all fields (unchecked)
* First name (checked)
* Last name (checked)
* Profile picture (checked)
* Headline (checked)
* Bio (checked)
* Experiences (checked)
* Find this in search (checked)
* Allow auto-binding (unchecked)

### Experience <a href="#h.u05k61echub3" id="h.u05k61echub3"></a>

The Data Type “Experience” is used to store working experience on a user profile; each record is a separate past work experience for a given user.

#### Suggested fields on this type

* Creator (User, built-in)
* Modified date (date, built-in)
* Created date (date, built-in)
* Slug (text, built-in)
* Company (text): In the real LinkedIn, this would be another Data Type that holds all information about the company
* Company Logo (image)
* Current position? (yes/no): When this is true, the job experience will need no end date
* Job title (text)
* Description (text)
* Location (geographic address)
* Start date (date)
* End date (date)

#### Privacy rules for this data type

* No privacy rules → All Working Experiences are visible to all users when looking at a profile. If you want to be restrictive, you could add a Privacy Rules to make it only visible to Logged in Users.

### Post <a href="#h.urkeec9yu2z6" id="h.urkeec9yu2z6"></a>

The data type Post holds all the information about a user post. Note, a user can add an image to a post.

#### Suggested fields on this type

* Creator (User, built-in)
* Modified date (date, built-in)
* Created date (date, built-in)
* Slug (text, built-in)
* Text (text)
* Image (image)
* Comments (list of Comments): Comments made under this specific post
* Reactions (list of Reactions): Reactions on this specific post
* Activities (list of Activities): This is a combined list of all comments and reactions made on this specific post
* Tagged users (list of User): Users that are tagged on this post

#### Privacy rules for this data type

* No privacy rules → All Posts are visible to all users. They don’t necessarily show on the user's feed but they should be accessible to all.

### Comment <a href="#h.vjfi8qavyev7" id="h.vjfi8qavyev7"></a>

The data type “Comment” holds all the information about a user comment.

#### Suggested fields on this type

* Creator (User, built-in)
* Modified date (date, built-in)
* Created date (date, built-in)
* Slug (text, built-in)
* Text (text)
* Post (post): We link this Comment back to the Post to avoid orphaned comments (a comment saved in the database with no link to a post).
* Likes (list of Users): We can show the number of Likes by simply showing the count of Users in this list.

#### Privacy rules for this data type

* No privacy rules → All Comments are visible to all users when looking at a Post (likes, comments, …)

### Activity <a href="#h.9nwemt7baxvt" id="h.9nwemt7baxvt"></a>

The data type “Activity” holds all the information about a post reaction (incl. comment).

#### Suggested fields on this type

* Creator (User, built-in)
* Modified date (date, built-in)
* Created date (date, built-in)
* Slug (text, built-in)
* Activity Type (Activity Option Set): There are different types of “Activity Type” that we can pick from in our Option Sets.
* Post (post): We link this Activity back to the Post to avoid orphaned Activities (an Activity saved in the database with no link to a post).
* Reaction Type (Reaction Option Set): There are different types of “Reaction Type” that we can pick from in our Option Sets.
* Comment (Comment): If this activity was a comment, we will link back to the comment. If not, this field will be empty.

#### Privacy rules for this data type

* No privacy rules → All Activities are visible to all users when looking at a Post (likes, comments, …)

### Notification <a href="#h.czvv3avblnky" id="h.czvv3avblnky"></a>

The data type “Notification” is necessary to better organize notifications and offer a better User Experience on the platform.

#### Suggested fields on this type

* Creator (User, built-in)
* Modified date (date, built-in)
* Created date (date, built-in)
* Slug (text, built-in)
* Receiver (User)
* Activity (Activity): We link back to the activity to enrich the Notification message and give more context to the receiver. With that link back to an Activity, we can also go back to the Post on which that activity took place. Linking back to this activity creates several possible call-to-actions.
* Read? (yes/no): We store this value to know if the Receiver has unread notifications or whether he/she is up to date.

#### Privacy rules for this data type

* This Notification’s Receiver is Current User
* View all fields (checked)
* Find this in search (checked)
* View attached files (unchecked)
* Allow auto-binding (unchecked)
* This Notification’s Creator is Current User → The sender should see if an invitation is already pending
* View all fields (checked)
* Find this in search (checked)
* View attached files (unchecked)
* Allow auto-binding (unchecked)
* Everyone else
* No permission

### Chat <a href="#h.sbw5s3wtqrdb" id="h.sbw5s3wtqrdb"></a>

The Data Type “Chat” is used to store messages between users so that we can easily display a relevant discussion as a thread of messages.

#### Suggested fields on this type

* Creator (User, built-in)
* Modified date (date, built-in)
* Created date (date, built-in)
* Slug (text, built-in)
* Users (list of Users)
* Messages (list of Messages)

#### Privacy rules for this data type

* This Chat’s Users contains Current User
* View all fields (checked)
* Find this in search (checked)
* View attached files (checked)
* Allow auto-binding (unchecked)
* Everyone else
* No permission

### Message <a href="#h.4wcfy887s3yj" id="h.4wcfy887s3yj"></a>

The Data Type “Message” is used to store text messages sent between users. A message doesn’t need to hold information about the message receiver as it is saved in a chat that holds that information already.

#### Suggested fields on this type

* Creator (User, built-in)
* Modified date (date, built-in)
* Created date (date, built-in)
* Slug (text, built-in)
* Text (text)
* Chat (chat): We link this Message back to the Chat to avoid orphaned Messages (a Message saved in the database with no link to a Chat).
* Viewed? (yes/no): We store this value to know if the receiver has unread messages or whether he/she is up to date.

#### Privacy rules for this data type

* This Message’s Chat’s Users contains Current User
* View all fields (checked)
* Find this in search (checked)
* View attached files (checked)
* Allow auto-binding (unchecked)
* Everyone else
* No permission

### Invitation <a href="#h.5n6qmhea7aec" id="h.5n6qmhea7aec"></a>

The Data Type “Invitation” is used to store connection requests. This data type makes it possible to confirm a connection request before connecting two users together.

#### Suggested fields on this type

* Creator (User, built-in)
* Modified date (date, built-in)
* Created date (date, built-in)
* Slug (text, built-in)
* Receiver (User)
* Note (text): A user can send a note with the connection request.
* Status (Invite Status Option Set): This status is “pending” by default as all connection requests need to be approved. The user can then accept or ignore the request, which will change this status.

#### Privacy rules for this data type

* This Invitation’s creator is Current User OR This Invitation’s Receiver is Current User
* View all fields (checked)
* Find this in search (checked)
* View attached files (unchecked)
* Allow auto-binding (unchecked)
* Everyone else
* No permission

## Option sets recommended <a href="#h.krr8nsqafyt" id="h.krr8nsqafyt"></a>

#### Activity Type <a href="#h.mfz2duo6xll7" id="h.mfz2duo6xll7"></a>

* Posted
* Commented
* Reacted

#### Reaction Type <a href="#h.vsoyuju7ukrx" id="h.vsoyuju7ukrx"></a>

* Like
* Celebrate
* Support
* Love
* Insightful
* Curious

#### Invite Status <a href="#h.pelnf0ary5zk" id="h.pelnf0ary5zk"></a>

* Pending
* Accepted
* Ignored

## Additional notes <a href="#h.8zfpl9lbgo9s" id="h.8zfpl9lbgo9s"></a>

When naming your options sets, data types and fields, we recommend using simple terms you will remember over time. Also, avoid repetition in your names as it will make it difficult to work efficiently when building your workflows. Finally, keep in mind that working with data is an ongoing process. Start small, adjust when necessary and improve as your product grows in terms of users and/or complexity.

## About HuggyStudio <a href="#h.5ksov1duconc" id="h.5ksov1duconc"></a>

We believe entrepreneurship is about positive change, not code. HuggyStudio helps entrepreneurs and intrapreneurs validate their ideas. We specialize in building new product ideas into functional MVP through our [no-code education platform](https://www.huggystudio.com/) and our [no-code agency](https://www.huggystudio.com/no-code-agency).<br>

<br>
