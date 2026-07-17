<!-- source: The Ultimate Guide to Bubble Performance (Petter Amlie), Revision 3 — physical PDF pages 69-102 -->
<!-- How to build for performance — The Page (size, rendering lists, RG trap, CPU) -->

# How to build for

# performance

Structuring your app and database for top performance

Now for the interesting stuff: how to set up your app for performance. Let’s return to our chart of what slowdowns are caused by:

Every decision you make in the coming weeks of development will affect your app’s performance in some way, and they’ll all be connected to one of the boxes above. So let’s go through each one.

## The Page

### RAM usage and download size

The RAM is the working memory of your user’s device and is used by the device’s processor to temporarily store information. The reason you can switch quickly between apps and websites, is that all the content of the site or app is saved in the RAM for quick retrieval. The RAM is fast - very fast - but a finite resource. When all the space has been used, your operating system will start using the device’s hard drive to temporarily store information instead, and you’ll start noticing your system slowing down.

When you load a Bubble page, a range of different resources are downloaded from a server to your computer, and stored in the device’s RAM: ●The Bubble engine ●Images and other media files ●Fonts ●Icon packs ●Javascript libraries ●CSS ●Page design (elements on your page) ●Your app logic: conditions and workflows

The more you ask the browser to store in device memory, the more processing power is needed to render elements on the page. So even if you’re not spending all available memory, adding more information into the pile will make its wheels turn slower.

How small should a website be? What kind of app you’re building needs to be taken into consideration: for example, an e-commerce website that relies on SEO performance will need to be lightweight, whereas it may not be as important for a business app. Generally though, if the total download size of your page exceeds 6 megabytes, you’re on the heavier side. At around 8-10 megabytes, your SEO ranking will start to suffer and users will start to notice. Keep 2-4 megabytes as your goal, but know that there can be perfectly valid reasons to exceed that size.

### Downloads

The Bubble engine The Bubble engine is the codebase that your app is running on. This is Bubble’s secret sauce, and there’s not much you can do about its size. The good news is that it’s pretty lightweight, and that this asset is delivered through the Cloudflare CDN.

Images Update in the third revision: since the first release of this book, some things have changed in best practices for the use of images. I now recommend the WebP image

format, which is now widely supported by all the major browsers.

I’ve also received numerous questions regarding Bubble’s own compression tool. Bubble does compress images, but by using Photoshop’s own compression, TinyPng and converting to WebP, you can generally make images 6-10% smaller. This is not a major difference, but if SEO is important and/or you use multiple images, it’s still worth considering.

Images are also downloaded through Cloudflare. Four simple rules should guide your use of images:

●Don’t use them Simple enough. The most efficient use of images is to not use them. Obviously you want to use them sometimes, but keep it minimal. Using images in Repeating Groups for example, can quickly add several megabytes to the page size.

●Enable compression Whether you use Photoshop or something else, your export settings can dramatically affect how large the file ends up. I take all images through two steps: 1) Compress in Photoshop: most images can take about 40% compression before they start to look bad, depending on the image. Experiment a bit and

find the right balance between size and quality. 2) Next, run the image through www.tinypng.com. Despite the name, the service also handles JPG’s just fine, and can reduce the file size of your images considerably, without any loss of quality. TinyPNG can also convert to WebP in the same operation. The free version supports images up to 5 mb.

●Use the right format There’s no right and wrong when it comes to picking the file format of your images, as long as it’s supported by the major browsers. Generally, you have three options: WebP, JPG, PNG and SVG.

Using WebP is mostly recommended, for the following reasons:

○Compression efficiency: WebP typically has better compression than JPG, leading to smaller file sizes. ○ Lossless and lossy compression: WebP supports both lossless and lossy compression, offering flexibility based on image requirements. ○Transparency Support: WebP supports transparency, making it versatile for web design elements. JPG does not support transparency, but PNG does. ○Animation Support: WebP supports animated images

○Browser Compatibility: WebP is widely supported in modern browsers ○Quality at Lower File Sizes: WebP often delivers better image quality at smaller file sizes compared to JPG. ○Google's Recommendation: Google actively promotes WebP for web performance, suggesting its use for better results in tools like PageSpeed Insights.

SVG SVG is a vector format, which means you can’t use it for photos. The good thing about vector images is that they can be scaled to any size with no loss of quality. Use this for logos and illustrations: often you’ll find that the file size can be a lot smaller than a bitmap image, and you can use it in different sizes across your app without having to upload multiple copies.

Fonts Every font that you use in your app, even if only used in one place, needs to be downloaded and stored in memory, so keep it to a minimum. Preferably, use just one font. The file size for most fonts varies between 100 to 200 kb.

Icon packs Icon packs behave much like fonts: they’re not downloaded individually, letter by letter, but as a package containing all the icons. In other words, it makes sense to pick one icon collection and stick with it, rather than picking from different libraries.

Javascript libraries (plugins) A lot of Bubble plugins depend on a Javascript library, which is a fancy term for re-using code. For example, there are millions of image sliders on different websites, and each website builder didn’t code their own slider, but relied on the code that someone else already wrote. So, a library is simply a JavaScript file that adds some functionality to your website, ranging from calendars to image editing to chat windows to analytics. Each one has to be downloaded and stored in memory to work, adding slightly to the total download.

Here, we also touch upon another important metric to optimize app performance: the number of server requests that are made from a page. Libraries that add functionality to your page will not usually be stored on your Bubble server. In other words, the browser has to connect to a different server to download the file. The total number of requests that your app has to make to different servers not only affects your app’s performance, but can also degrade your SEO score. When using an external library, you’re at the mercy of a third-party: there’s of course no denying that it can sometimes add great value to your app, but as everything else it comes at a cost: keep it minimal.

CSS (styles) CSS in Bubble terms is called Styles. It dictates what your elements look like. Using Styles is to save the information once instead of repeating it, meaning for example that you only have to define what a certain type of button should look like once, and then re-use that style for every button in your app. This is not just a timesaver for you as a developer but also a performance trick: imagine placing fifty text elements on a page (easily done with a repeating group for example). Without styles, you would have to load the style setting for each of those elements - fifty times in total. With styles, you’ll load it just once, and then apply it to all of the fifty elements.

### Measuring the size of the page and all assets

Popular web browsers include tools that can provide you with detailed information about your page total download size, as well as the isolated size and download time of different assets on your page. Run the test in a fresh Private Window (Firefox) or Incognito Mode (Chrome) as ad blockers/other extensions and cached assets can skew your results.

●Firefox: At the time of writing, you’ll find download details under Tools -> Web Developer -> Network

●Chrome: Go to View - Developer -> Developer Tools and click the Network tab.

Let’s look at how the Network tab can help us identify some culprits in a random Bubble app. We’re going to use Chrome for this example:

For Chrome to record the network activity, the Developer Tools need to be open. Click the Network Tab.

To measure the download size, make sure to hold the mouse button over the reload and hold the mouse button to expose the menu. Select Emptycacheandhardtoreload, which tells Chrome to re-download all resources used on your page (as opposed to the files cached from earlier page visits).

Emptying the cache and applying a hard reload gives you the most precise result since it forces Chrome to re-download all assets.

Chrome will reveal a list of assets downloaded. Sorting by Size by clicking that tab is an easy way to find the biggest assets on the page. Just a quick glance at the network tab in this example reveals that we are downloading three separate icon packages

(FontAwesome, Material Icons and Feather Icons, marked in red) totalling about 141 kb - optimally we shouldn’t use more than one to reduce the page size and number of connections. You can also see several JavaScript libraries loaded here: Quill (Rich Text Editor), Moment (used to do calculations on datetimes).

The total download size of this page was 1.8 mb, meaning I could reduce its size by about 15% (220kb) simply by removing some icon packs and plugins (assuming they aren’t used of course). In the world of SEO, 220 kb is not a trivial number, and this was just from spending one minute in the Network tab.

Identifying searches The network tab can also be used to identify the total download size of a given Doa Searchfor, helping you measure how well-optimized your database structure is for efficient searching. It’s not unusual that the search itself on Bubble’s servers is performed quickly, but the size of the download still makes it seem slow. Bubble uses Elastic.io for searching, and it’s easily recognizable in the Networks tab as named either search or msearch. The easiest way to single them out in the networks tab is by using the Filter and simply typing search.

Using that method, we can quickly see searches that are bloated or that take longer to load:

Here we have four searches on a single page, totalling almost 400 kb and contributing 4,3 seconds to the page load time - pretty significant. If we delayed one or more of those searches to be performed later, we could speed up the initial page load.

This section is closely related to the guide on how to structure your database to make the search download size smaller. If you’d like to read that now, click here.

Don’t worry, there’s a link there too that will take you right back here.

Reading the waterfall chart To the rightmost side in the Networks tab you’ll find the Waterfall chart. This tool may feel a bit overwhelming to read at first, but it’s a very useful way to identify the biggest load speed culprits on your page.

Waterfall is such a perfect name for this chart, as it shows the order in which every request on your page was made, and how long it took for it to complete.

This again let’s you with a quick glance identify assets that slow your website down. Keep in mind that the waterfall chart will continue to record requests as you navigate the page, allowing you to find assets that are not fetched on page load.

How to identify different types So, I’ve told you that resources such as fonts, images and plugins can add to your page load time - but what do those resources look like? Let’s identify the usual suspects:

Images

Let’s start with the easiest one: images. You can single out image requests by clicking the Img filter at the top of the network pane.

Plugins

Plugins often rely on a third-party Javascript library that’s usually clearly named. Note that it may not carry the exact name of the plugin - but rather the library it uses. The simplest way to find them is to activate the JS filter (Javascript). Some plugins will also have an accompanying CSS file, so remember to take this asset too into account when you calculate the total size of a plugin. By Command/Control clicking a filter, you can add more than one, as illustrated below.

Among Javascript resources you’ll also find analytical tools if you have them installed tools like Tag Manager, Google Analytics and Hotjar. While analytics tools can be an incredibly important tool for your website, they do add to your total page size and load time - only keep it around if you’re actually using it.

If you’re unsure of what a specific file actually does, the easiest thing is to simply Google it: usually you’ll recognize a feature in your plugin when you find the accompanying JS library.

Fonts

It’s incredibly easy to add another font to your app without really being aware of it. Simply forgetting to apply a style to an element may mean it has a different font applied than everything else. Web fonts are saved in the compressed Web Open Font Format, carrying the suffix woff2 and can be filtered with the Font filter.

Icon libraries

Icon libraries are saved in the same format as fonts (woff2) and they're especially important to keep an eye on for two reasons: 1) they are usually the biggest font files on your page, and 2) they’re not served by Google Fonts (unlike regular fonts), but are stored on an external CDN, increasing the total number of requests.

The two icon libraries loaded on this page have the biggest download size and longest loading times.

### Single-page app versus multi-page app

One of the major decisions you will have to make in Bubble, is whether to build your application as a single-page-app, or as a multi-page app. The first thing I’d like to do

here is to pop that balloon: this is not a black-and-white question. As we’ve discussed earlier, the performance of your app is a featureamong many others, and as such, it should be optimized in a way that doesn’t blindly prioritize speed.

We have two things to consider here:

●Single-page apps can be incredibly quick to navigate ●At some point, they can become bloated and slow down the system

In other words, setting your app up as a single-page app can be one of the biggest performance boosting decisions you make, but including toomuch on one page can slow the system down. This is a client-side challenge: it relies on the internet connection and hardware of your users, which means what runs fine on a modern computer may not be running as smoothly on an older cell phone.

It all comes down to user behavior. Which features does the user need frequently, and which can you offload to another page?

You’ll find that other companies compromise to keep their main app page lightweight: the top features of the app are loaded on the main page for quick navigation, but features that are not needed as frequently require a page change. Typical features that are left out of the limelight are app settings, profile settings, help systems/documentation, password recovery, etc.

Take Google again: Gmail, Contacts, Calendar and all other parts of that ecosystem are all stored on separate pages, so that each one of them loads quickly. Features within each app on the other hand, like writing an email or adding an appointment, are available without reloading the page.

No matter which Google app you click from Gmail - even Contacts - it will open in a new window. This is not a design flaw, but how Google keeps Gmail loading quickly and running smoothly.

Www.booking.com, a page that relies heavily on page load speed as a part of their SEO strategy, keeps the app’s core features (like searching for hotels) within the same page, while less-accessed features and content such as their privacy policy and login form are stored on separate pages.

### Rendering lists

We’ve been over the fact that a long list can multiply the total number of elements on your page more than you realize when you’re building your app. Different fields on your data types can also contribute to how fast Bubble is able to render a list in a Repeating Group. There are a few different ways information is usually prepared for rendering:

Info saved directly on the list Thing This is the fastest way to display information from the database in the list. If you are showing a list of Users, showing their First name (saved on the data type) will generally be very quick.

Example: User ➞First name (1 step)

Info saved on a Sub-Thing Forcing Bubble to look up an additional Thing saved on the first Thing will add a slight delay to the process.

Example: User ➞Company ➞Company name (2 steps)

For every step you add, a bit more time is needed:

User ➞Company ➞Parent Company ➞Name (3 steps)

Processing on Sub-Things A slightly longer delay will be added whenever you ask Bubble to perform some sort of data processing on a Sub-Thing. For example, we might want to know how many Accounts a User is managing:

Example: User ➞Account list ➞:count (2 steps + count operator)

Conditions Conditions can add very little or quite a bit to your loading, depending on what the condition is and how many you have added. Keep in mind again that every condition you add will be multiplied by the number of rows in your list. If the conditions depend on database lookups or Searches, you’re giving Bubble a lot to do for each row.

Setting up fast lists Lists will load quickly if each row is set up as efficiently as possible. In some cases, optimizing your app to display lists quickly may mean setting up both separata Data Types (Search Data Types) with as few and light fields as possible, and to keep those Things updated “manually”. For example, you may want to save a User’snumberof Accounts as a number on the User instead of forcing Bubble to count them every time. You can keep this number up to date using on-page workflows or Back-end Triggers.

### The Repeating Group trap

Full load vs partial load One of the most common mistakes that I see in bloated apps is how a single Repeating Group can drastically increase the number of elements on your page. One of the reasons this mistake is so easy to make is the simple fact that while you’re working on your app, there’s usually not that much data in it. A repeating group may show a few rows and work just fine, but as your app is deployed to the real world and user’s start adding data to it, the Repeating Group suddenly grows into showing hundreds of rows or more. Using pagination is very common across most apps not just to keep the screen from cluttering, but because developers know that loading and displaying too much at the same time can lead to performance degradation.

Let’s take the following scenario: you’ve added one repeating group on your page showing a list of users. Within it there are three text elements: first name, last mail and email address. The first thing your client does after having the app handed over is to import all of his employees into the system: all three hundred of them.

How many elements are on your page now?

The three, innocent text elements you drew have suddenly multiplied into 900. Let’s take the example even further just to illustrate how this can quickly go off the rails: let’s

imagine that each of those users have a non-compressed profile picture of 1 MB that’s nicely displayed next to their name on each row. Their combined size is now 300 megabytes and the browser needs to download 300 separate files before it can show the list. And you’re wondering why things are slowing down!

The way to avoid it is of course in planning and compromises. Gmail is not going to render a list of all your 35.000 emails on the screen - just the most recent ones. In any other app you use, you’ll also see that lists are kept short by default, as developers know that a long list will put a higher strain on both the server and the client’s browser. Repeating Groups have a built-in pagination feature, and it’s there for a reason: planahead for how much data your app will be displaying in the future.

Hiding by default This brings us to another broader question: how much info should your app display by default? Hiding elements and lists when they are not immediately needed is not just best practice, but a necessity to keep your app nice and light. Going back to the example above: do we need to load all 300 users when the page is loaded? Do we need to load the profile picture of every user? Do we need to even see a list of users on every page load at all, or could you hide behind an action, such as the clicking of a tab or button:

A simple design choice like hiding a list by default can do a lot for both performance and capacity.

The loading of your page is one event out of many that your users will execute as he uses your app. Not all data needs to be fetched by that first event. Let your users tell you what data they need to see, rather than showing everything by default.

### Lazy loading

Much in the same way that you can hide lists and other “heavier” elements on your page until the user clicks them, lazyloading is a technique where instead of loading all page content on page load, you load only the parts that are required, and delay the loading of other assets until later. A typical case is to wait for the user to scroll down a page before loading content that is below the typical screen height, or to use continued loading as the user scrolls, like Facebook and Instagram. Lazy loading can be applied to both elements that take up bandwidth (such as images) and to fetching data (such as Bubble database searches).

### CPU usage

The CPU on your user’s device is responsible for processing everything happening in your app after the data has left the Bubble server; rendering the page correctly, making client-side calculations and filtering data.

Rendering the page All elements on your page are rendered to the screen: basically, the CPU of the user’s device is used by the web browser to calculate what every pixel on your screen should look like at any given time. Adding more complexity to the design means giving the processor more work to do. Think about it like a computer game. Better graphics and more special effects require more processing power. Some devices have the newest graphics cards, some are ten years old.

The total size of a page in the device’s memory is closely linked to its CPU usage. Scrolling a page with a lot of elements puts a higher strain on the processor than scrolling fewer elements. How complex you make your elements adds to this: transparency, drop shadows, gradients and animations all add to the total workload and can make your page seem unresponsive.

Again, take two things into consideration: what kind of device your users may be using (older computers and phones), and how the amount of data in your application increases the processing load. Rendering one single user profile photo is not too

demanding on your device, but rendering three hundred of them in a Repeating Group can slow it down.

Web design showcased on https://dribbble.com/ frequently features fancy animations, beautifully soft shadows and other effects, making commercial apps seem bland in comparison. But there’s a reason they go for a more simplistic approach: being lightweight and compatible with all devices trumps looking like a rockstar.

Leveraging client-side data processing Instead of seeing the user’s hardware as a limitation, let’s see it as a resource that you can use to speed up your page. Knowing what kind of computations happen server-side and what happens client-side let’s you assign tasks between them, and exploit the strengths of each one. Let’s go over a few key facts:

The server: ●Is incredibly powerful and can handle large amounts of data ●May be located far away, and the data needs to travel over a distance adding a delay to every query ●Has restrictions in place to make sure one app doesn’t use up all available capacity

The client device:

●Is not as powerful as the server: it can handle only a limited amount of data before slowing down ●Results are immediate, as the data never leaves the local device ●Has no restrictions: it will simply use all the processing power available until it finishes ●Has to rely on the server to get the data in the first place. It doesn’t permanently store anything.

So, as you can see, making calculations locally instead of passing them on to the server can speed up things a great deal, but it comes with limitations and is not easily scalable.

Let's look at a search in Bubble to determine what’s happening on the server and the device:

In this example, we’re looking for Users that belong to the same Company as the Current User, and we’re asking for that list to be sorted by the User’s Last name. Everything going on in this window is happening server-side: we tell the server that we’re looking for sorted data based on specific criteria, and the server returns the result to the user’s device.

Now let’s extend the Search a bit:

In this example, everything in the red brackets happens server-side, and everything in the blue brackets happens client-side: we receive a list of Users from the Bubble server, and then apply additional advanced filters to that list, and tell our text element to only show the first five entries. This means our entire list is still downloaded and stored in the device memory, but we’re only showing the first five.

(Note that the illustration above does not cover all scenarios. If you add a :count to the end of a search for example, the actual counting is happening server-side)

It’s common advice to never use client-side filtering, as it will slow down your app. This is only true to some extent. Depending on how you use it, client side filtering can be a lot faster than performing another server-side search, since the data never has to leave the local device. Done right, it’s lightning fast. Done wrong, it’s slow and insecure.

Client-side filtering is great for: ●Filtering lists of data containing no more than a few hundred items at most ●Simple filters: the more complexity you add, the slower it becomes ●Non-sensitive data

Avoid client-side filtering for: ●Large data sets ●Sensitive data: since the full list of data is sent to your browser before the filters are applied, the data is not secure ●Complex filtering: leave the heavy lifting to the server

As an experienced Bubbler, client-side filtering can be used to great effect to speed up your app’s performance, but if you’re just starting out, it’s best summed up with these three words: use with caution.

### Measuring page rendering

Everything that you add to a page will add to the total download size and RAM spending on your user’s device, as the browser needs to keep it stored in memory and render it correctly on the screen. It means that for every element and condition you add to your page canvas and every workflow and action you add in the workflow builder, your page becomes a little bit more heavy to handle.

The irony of working with performance from a rendering perspective is that even though it canslow down your page, it’s still fast enough to escape your eyes as it's happening.

This section is closely related to the guide on how your browser renders your page. If you'd like to repeat that before moving on, click here.

Don’t worry, there’s a link there too that will take you right back here.

Chrome Developer Tools have a truly great set of tools to measure your performance in various ways, including page rendering. Let’s have a look.

Paint flashing As we discussed in the section about how the browser renders your page, the process of rendering it as pixels on the screen is called painting. The browser attempts to avoid re-painting the whole screen and only render the parts that it needs to.

Paintflashing tells Chrome to show a brightly colored rectangle around any element that’s being painted or re-painted (rendered for the first time or re-rendered as something changes on the screen). As you load the page for the first time, you’ll see everything flash in green as the browser paints the whole screen. After that process is done, you’ll be able to identify changes as they are happening.

Since this text element has a Whenthistextishovered condition that changes its color, Chrome shows that it’s repainted as I hover it with the mouse.

Big layout changes and repaints can be taxing on your performance, which is one reason why Single Page Applications can slow your page down if they’re too massive. Here’s how to access it:

1. Open Chrome Developer Tools 2. When open, click Command+Option+P (Mac) or Control+Shift+P (PC) to open the Command menu.

3. Type in Rendering top open the Rendering drawer 4. Check the box that says Paintflashing 5. Reload your page and watch how each element flashes. As you hover, click and navigate around, you’ll see every paint clearly

Checking Layers As we’ve also explored, your app page consists of layers - this is how the browsers knows how the elements on your page should overlap. Chrome also has a built-in tool that lets you look at all the layers on your page and even rotate it to see it in a 3D

environment.

The Layers tab lets you rotate your page in 3D to see how layers are rendered.

Hovering a layer in the layer tab highlights the corresponding section of the page. An interesting feature of this tab is that you can click a specific layer to check its Memory estimate. A quick test on the page illustrated above shows that Bubble’s debugging bar

takes up about 450kb of system memory, whereas the main window that contains a Repeating Group with a list of Users takes up 9MB - a nice reminder of how Repeating Groups can greatly increase memory usage (although the 9 MB’s in this case is not too bad). To access it: 1. Open Chrome Developer Tools 2. When open, click Command+Option+P (Mac) or Control+Shift+P (PC) to open the Command menu. 3. Type in Layers and click the Panel:ShowLayers option

To navigate in 3D, click the rotate button.

Measuring the frame rate The frame rate tells you how many times per second your screen updates per second, measured in FPS (Frames Per Second). How many frames per second your screen is able to render depends on how complex the page is and the power of your User’s device. Optimally, on a modern device this value should hover somewhere around 60 FPS, and

any time you scroll or re-paint the page, it can slow down as the GPU and processor calculates how the pixels on the screen change. Variations in FPS as you scroll the page down to 30 FPS is perfectly normal, and the faster you scroll, the more the value will drop.

Measuring the frame rate is useful to check whether your page contains too much information for the GPU to handle efficiently. This is affected by the number of elements on the page, effects such as shadows, transparency and blurring and by media such as images and video.

The Frame Rate usually hovers around 60 FPS on a modern device. Chrome’s FPS monitor also shows how much of the GPU memory (not to be confused with RAM) the current page demands.
