# Blog Apps
> Source: https://manual.bubble.io/help-guides/data/the-database/database-structure-by-app-type/blog-apps · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

*By Jason K (Founder of*[ ](https://www.google.com/url?q=http://www.nocodeminute.com\&sa=D\&source=editors\&ust=1648861627990219\&usg=AOvVaw3AZRLxUK-hJ1591tn2JD4F)[*www.NoCodeMinute.com*](https://www.google.com/url?q=http://www.nocodeminute.com\&sa=D\&source=editors\&ust=1648861627990551\&usg=AOvVaw0ckcz5vI3MhmPLcI9hPveX)*)*

{% hint style="info" %}
*Various members of the Bubble ecosystem contributed these use case-oriented database guides. There's always more than one way to do something in Bubble, but the advice here can help you get started if you're new to Bubble!*
{% endhint %}

Many websites use a blog to promote their product, keep their users engaged and display updates about their business. If you are new to Bubble, and web developing in general, you might be struggling to put together the database for it. In this article, we will discuss a few different options to match your skill level and scale requirements. Building a blog with complexity might be more difficult than you might think. Let’s check out some options to help you on your no-code journey!

We will go over two options for your data structures for two different levels of how complex your blog will be - we will call them Basic and Scalable. You can choose which data structure you will want to follow according to your needs. There is always more than one way to do something. Here are just a few ideas.

## Data types recommended - Basic example <a href="#h.8gkrwvp3rqds" id="h.8gkrwvp3rqds"></a>

This example is for a basic blog that doesn’t go into much detail. This is not recommended at scale for large blogs but will be fine for a small blog if you are just starting out. Simple design and easy to set up. Great for beginners if you are trying to just set up your first blog.

As a site owner you will add your blog information into this main data type allowing for it to be displayed on a blog page.

### blogPost <a href="#h.g9w8fpacz6vd" id="h.g9w8fpacz6vd"></a>

This will be your main data type. This will hold the majority of your data and will normally be displayed in a repeating group on your page. Notice how we don’t pluralize the name here since each one (each “thing”) will be a singular blog post.

#### Suggested fields on this type

* title (text): This will be the title of your blog post.
* summary (text): This will be the summary of your article that will be displayed underneath the title
* byLine (text): The name of the person who wrote the article
* content (text): The content of your blog post; here we can use the Rich Text Editor plugin to add images and formatting, but even the resulting rich text can be stored as a “text” by Bubble
* visible (yes/no): This will allow you to turn posts on or off from being visible on your blog

#### Privacy rules for this data type

We will assume that you want the Blog to be public, so we will keep the data type and all its fields public. When creating the data type, make sure not to check the box to make it private. Similarly, after creating it, there will be no need to create privacy rules for it.

## Data types recommended - Scalable example

This example is for an intermediate blog where posts can have more detail and flexibility. As an example, this allows for each blog post to have a different structure to it instead of one standard structure. This should allow for better scaling. This is great for more experienced users if you are trying to just set up a more professional blog.

This data type allows you to break out the blog post and blog post content separately. The site owner will create a blog post and then add the blog content as a [repeating group](https://www.google.com/url?q=https://manual.bubble.io/core-resources/elements/containers%23repeating-group\&sa=D\&source=editors\&ust=1648861627993289\&usg=AOvVaw3pxBPBMIFlC-6Oq0iWZ3VU) within that blog post. This allows for different blog structures as your users view the different blog posts.

### blogPost <a href="#h.ve12sdax6a9w" id="h.ve12sdax6a9w"></a>

This will be your main data type. This will hold the majority of your data and will normally be displayed in a repeating group on your home page. Notice how we don’t pluralize the name here since each one will be a singular blog post.

#### Suggested fields on this type

* title (text): This will be the title of your blog post.
* summary (text): This will be the summary of your article that will be displayed underneath the title
* byLine (text): The name of the person who wrote the article
* blogContentList (list of blogContents): This is a list of your blogContent data type (see below)
* visible (yes/no): This will allow you to turn posts on and off from being visible on your page

#### Privacy rules for this data type

We will assume that you want the Blog to be fully public so we will keep the data type public, similarly to the Basic example.

### blogContent <a href="#h.uppdxua4vj7p" id="h.uppdxua4vj7p"></a>

This is your content for the blog post. It will hold the body and images of each post’s content. This allows for the flexibility of different structures in the blog content: this data type enables you to store each section of the post’s content as an individual blogContent, which then lets you display the different sections with different formatting. For example, perhaps you want one paragraph (which would be its own blogContent) to be formatted left-aligned, whereas you want the following paragraph (which would be another blogContent) to be formatted right-aligned for emphasis.

If you wanted to make your blog even more flexible, you could build on top of this data type to store additional fields like “order” to set the order in which different chunks of content appear on the page, or “expiration” to set a time before/after which that particular chunk of content should appear.

#### Suggested fields on this type

* parentBlogPost (blogPost): this is how each blogContent knows which blogPost it belongs to
* blogContentType (blogContentType): this is the option set that will help you distinguish which type of content this will be, an image, text of a certain styling, or something else (see below). Having this field allows you to customize how this chunk of blogContent shows up on the page - the page can display this thing differently depending on its blogContentType.
* text (text): this is where your body paragraphs will go. Each will be in its own blogContent
* image (image): this is where an image in your post can be stored

#### Privacy rules for this data type

We will assume that you want the Blog to be fully public so we will keep the data type public, similarly to the Basic example.

### blogLikes <a href="#h.dhtm2bvjj21h" id="h.dhtm2bvjj21h"></a>

This data type is if you want to have users ‘like’ a post. We could save the list of ‘like’ing users as a list on each blogPost, but this list might be very large eventually and would slow down your app at scale. Hence, we’re creating it as a different data type. ([Here](https://manual.bubble.io/help-guides/structuring-an-application/data-structure#connecting-types) is a lot more background on this choice.)

#### Suggested fields on this type

* parentBlogPost (blogPost): this stores which blogPost actually got the ‘like’
* creator (User): this is who liked the post (built in already)

#### Privacy rules for this data type

This could have privacy rules on it to not share exactly which user(s) liked a post publicly. In this case, we may want to rely on privacy rules on the User data type - we always recommend having privacy rules on User, given it likely stores sensitive information like email addresses. At minimum, one such privacy rule could be when ‘This user is current user’, they can see their own data but their own data should not be public to anyone else. You only need to be publicly allowed to search this data type to get the count.

## Option sets recommended

### blogContentType <a href="#h.gri81lvslx9n" id="h.gri81lvslx9n"></a>

* text
* imageSmall
* imageLarge
* textAlignLeft
* textAlignRight
* textAlignCentered

This option set, used in our Scalable example, gives you the ability to describe what a particular section of blogContent is. In this example, this flexibility then allows you to align different section of a blogPost differently, or display an image in a large vs small format. You could add other options in this set if you want even more different ways for a chunk of content to appear.

## Example uses in your app <a href="#h.jge3g9i9dho3" id="h.jge3g9i9dho3"></a>

* Do a Search for BlogPosts - This would help you display your main blogPosts on your home page when this query [powers](https://manual.bubble.io/core-resources/elements/containers#data-source-1) a repeating group. For a result in this list - each of which would be one cell of a repeating group - the user would likely be able to click on a link to be taken to that particular blogPost with all of its blogContent.
* Do a Search for BlogContent where parentBlogPost = Current Page’s blogPost - On a [page that’s showing a particular blogPost](https://manual.bubble.io/core-resources/elements/page-element), this query will pull up all the blogContents for that blogPost, which can then be displayed in a repeating group on the page. Since we are also saving the blogContent as a list on the blogPost, you can access it by saying Current page blogPost’s blogContentList as well.

## About the author: Jason K

These are just two options for building a blog on Bubble. Setting up an app’s database structure can be very tricky for new developers, so we hope this helps.

Need more help? Check us out at[ ](https://www.google.com/url?q=http://www.nocodeminute.com\&sa=D\&source=editors\&ust=1648861628000291\&usg=AOvVaw3o7voroPjYZaumynAL3t2b)[www.NoCodeMinute.com](https://www.nocodeminute.com/) for one-on-one coaching and the eLearning Hub where you can find more video tutorials, lots of free content, and a blog like the example above. 😊

![](/files/Z15anH1QAB3Gf5UYeemX)
