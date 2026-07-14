# Files
> Source: https://manual.bubble.io/help-guides/data/files · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers how Bubble handles uploaded files and images and

Bubble provides built-in tools for uploading and storing files and images, both within the editor and in your app.

File management can be a highly important aspect of your application, depending on your specific needs. Some apps require publicly accessible files, such as a photo-sharing platform or a marketplace displaying product images. Others need strict security measures to protect sensitive data, such as confidential documents, personal files, or employee records.

Many applications fall somewhere in between, managing a mix of public and private files. Some files may even change their visibility based on specific conditions—for example, a photo that only becomes visible if a privacy setting is marked as `public = yes`.

This article explores how to upload, display, download, and delete files in Bubble while ensuring proper security through privacy rules.

{% hint style="info" %}
**A note on plugins:** Some plugins offer ways of uploading and managing files that may differ from Bubble's built-in features and how they are described here. If you use a plugin to upload and/or manage files, we recommend getting to to know the documentation for the plugin and any third-parties used for file storage, conversion and other external services.\
\
The instructions in this article for maintaining file privacy pertain specifically to Bubble's native file management features.
{% endhint %}

## How uploaded files are handled

The Bubble database has two field types that support files: *file* and *image*.

<figure><img src="/files/Zoq3d12nVV9xZZomTeMb" alt=""><figcaption><p>The <em>image</em> and <em>file</em> fields hold the URLs of uploaded images and other files.</p></figcaption></figure>

Let's first look at how the mechanics of those features work:

The field in the database does not contain the actual file, but only a URL *pointing* to that file on another server. In other words, the *file* and *image* field types only contain a short string of text: the file's URL.

When you or one of your users upload a file using one of Bubble's built-in tools, it goes through the following steps:

* The file is uploaded to a file storage server
* That server returns a URL to reach that file
* That URL can be saved to the database using a workflow

This logic comes with a few important points to note:

* The size of your file (while important when the file is downloaded) does not affect the size of your database – it only contains the URL as text
* When you delete the content of that field, you are only deleting the URL – not the file
* Files are spread across Bubble's CDN[^1], ensuring a fast download

## Managing files in the Bubble editor

### Uploading

Files uploaded through the Bubble editor are not protected by [privacy rules](#user-content-fn-2)[^2]. You should only upload files that are meant to be **public**.

Files can be uploaded directly in the Bubble editor in two ways:

#### File manager

By navigating to *Data - File manager* you can see and search for all files that have been uploaded. To upload a file, click the *Upload* button in the upper right corner, marked in red in the screenshot below:

<figure><img src="/files/sqAfUMAM23cw2uAhgEce" alt=""><figcaption><p>The file manager lets you update files. Click to enlarge.</p></figcaption></figure>

{% hint style="info" %}
The file manager differs between files that were uploaded in Development and Live. Click the link in the upper right corner to switch between the two.
{% endhint %}

#### The database manager

When you edit a database thing that has a *file* or *image* field, you can upload a file directly to that field. The file will be uploaded and the URL will be linked to the database thing.

### Deleting files

Deleting files in the Bubble editor is done by going to *Data - File manager*. Select the files you want to delete with the checkbox in the list, and then click the *Delete* button in the upper right corner. Keep in mind that Development and Live are separate.

Also note that if you edit a database thing in the database editor and remove the file from it by clicking the *Clear* link, this only removes the URL saved on that thing – it does not delete the file.

<figure><img src="/files/FtUz8dvuYOa1lA6mP0vb" alt=""><figcaption><p>Removing an image from the database using the <em>Clear</em> link does not delete the file, it only removes the URL from the database</p></figcaption></figure>

## Managing files in your app

### Uploading

To allow users to upload files, you can choose between two Bubble-native elements:

* File uploader
* Image uploader

The elements both upload files and store their URLs in the database, but each offers a few key differences in their settings:

* **The image uploader**
  * Offers a preview of the image
  * Accepts image formats
  * If an image is larger than 800 x 600 pixels, you can check a box to resize the image to these dimensions
* **The file uploader**
  * Will show the filename and allow the user to download the file with a click
  * Accepts all file types
  * Lets you set a maximum file size in megabytes

If empty, both elements will open the standard operating system file selector.

{% hint style="info" %}
When a file is uploaded by a user, it's immediately uploaded to the file storage server. This means that as soon as a file is uploaded, it technically has a live URL that can be viewed by anyone with the URL, even if you haven't saved the URL in the database yet.

To keep files private, see how to use privacy rules with files below.
{% endhint %}

### Saving the URL in the database

After the file has been uploaded in one of the elements, it's value will return the URL of the image. You then need to use a workflow to save the URL in a field on the relevant data type.

<figure><img src="/files/BwaCTq82fjIq8uNzMH02" alt=""><figcaption><p>After uploading the file, you need to save the URL to a field on the user.</p></figcaption></figure>

### Uploading private files

Private files are linked to a specific database record and inherit the privacy rules associated with that data type. For example, if a user uploads a profile photo to their user record, the image file will be protected according to the privacy rules set for the User data type.

To ensure a file remains private, a few additional settings must be configured:

#### Element settings

To set a file to be private, you need to first change some settings on the uploader element:

<figure><img src="/files/6zlJGu1kT5YrZoTUEVeX" alt=""><figcaption></figcaption></figure>

1. First, check the box *Make this file private*
2. A dynamic field will become visible where you can specify what database thing you want to attach the file to. In this example we have set the *current user.*

These two steps will ensure that the file is uploaded as a non-public file. We then need to check the Privacy Rules on the User data type to control who has access to it.

#### Privacy rules

In the beginning of this article we covered that a file upload essentially consists of two parts: the file itself and its URL. This becomes useful and important when we set up the privacy rules.

There are two settings that affect the privacy of a file:

* The field in which the file is saved (visible when *View all fields* is unchecked)\
  \
  This setting hides the field in which the URL is saved: in other words, a user without access will not be able to see the URL, but if they were to get the URL somewhere else (for example shared by another user who has access) they would be able to access the file through the URL.<br>
* *View attached files*\
  \
  This setting makes the file itself unavailable to all users who are not authorized to see it. Even if they had the URL, trying to view the file would result in an error message.

It's important to note that the *first* setting alone is not considered a secure way to store a file. Since it's publicly available, anyone could view it if they had the URL, which means the data is *obfuscated* but not secure.

Only by securing the *second* setting (*view attached files*) can you know for sure that no unauthorized users will be able to access it.

### Deleting files

If you simply clear a file or image field in a data type, only the file’s URL is removed from the database—the file itself remains stored and accessible. To permanently delete the file, free up storage space, and ensure it is no longer available online, you need to configure a specific deletion action:

<figure><img src="/files/wqTyTzfR4xfIDihfGbJp" alt=""><figcaption></figcaption></figure>

The *Delete an uploaded file* action removes a specified file using its URL. In the example above, this action is used to delete a user's profile picture by referencing the `Current User's Profile Image`, which is of type *image*.

To ensure the database no longer references the deleted file, you should also inclu*de a Make changes to a thing* action. This step clears the file or image field, ensuring it returns an empty value after deletion.

## Other ways to learn

<details>

<summary>Video lessons</summary>

* [How to use the file uploader element](https://youtu.be/2wQo0Nve4Zs)
* [How to delete files attached to things](https://youtu.be/-z6b2UH_JAw)

</details>

<details>

<summary>Related articles</summary>

* [The file and image uploader elements](/help-guides/design/elements/web-app/input-forms/file-uploads)

</details>

[^1]: The CDN (Content Delivery Network) makes files load faster by storing them on servers in multiple geographic locations around the globe.\
    \
    When a user requests a file, the CDN automatically serves the file from the server that is closest to the user's location, reducing the distance that the file needs to travel and shortening the loading time.

[^2]: *Privacy rules* are conditions that you set up on each data type in order to protect the data from being viewed and edited by unauthorized users.

    Article: [Protecting data with privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)
