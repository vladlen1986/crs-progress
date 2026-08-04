# File upload input elements (web)
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/input-forms/file-uploads · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

This section covers elements that lets your users upload files and images

File upload elements let your users upload any kind of file to the Bubble server. Bubble has two different elements for uploading files: one for general file uploads and one specifically for images.

<details>

<summary>File storage and the database</summary>

In the Bubble Data Type editor you can add two types of file upload fields:

* file
* image

When you upload a file to Bubble, the file itself isn't stored in the database. The process happens in two steps: Bubble uploads the file to an AWS server, then saves the URL of that file in the database.

This means that file and image fields in your database hold only a short URL pointing to the file, not the file itself. From a performance standpoint, the database stays lightweight, and the file is only downloaded when it's actually needed.

</details>

<details>

<summary>Deleting uploaded files</summary>

The database doesn't hold files, only their URLs. Clearing the URL from a record doesn't delete the file itself.

To delete the file from the server, use the *Delete an uploaded file* action in a workflow. Keep in mind you need the file's URL to run this action, so delete the file before clearing the URL from the database.\
\
Video tutorial: [Deleting uploaded files](https://www.youtube.com/watch?v=-z6b2UH_JAw)

</details>

{% hint style="warning" %}
Uploaded files are public by default, meaning that anyone with the URL can access it. If you want your files to be securely private, you need to check the *Make this file private* on the uploader element and set up your privacy rules correctly. This applies both to images and other files.\
\
You can read more about these settings in the core reference articles below:

Reference: [Uploading files to be private](/core-resources/elements/input-forms#make-this-file-private)\
Reference: [Protecting uploaded files with Privacy Rules](/core-resources/data/privacy#view-attached-files)\
Video tutorial: [Setting up Privacy Rules](https://www.youtube.com/watch?v=1-meIeBUXPY)
{% endhint %}

## File uploader

{% embed url="<https://www.youtube.com/watch?v=2wQo0Nve4Zs>" %}

The File uploader element is used for uploading non-image files. It also supports uploading image file types, but the Image uploader element offers some additional features for that.

<figure><img src="/files/A2v5OCqPQvQkxHJpkDAh" alt="File uploader element."><figcaption><p>The File uploader element will show the filename after the user has selected a file to upload.</p></figcaption></figure>

You can set a maximum size for the uploaded file. The File uploader element introduces a new action that lets you cancel an ongoing upload.

## Picture uploader

{% embed url="<https://www.youtube.com/watch?v=ZXjhQkM5qV0>" %}

The Image uploader element is used for uploading images and will give you a preview of the image after the upload. If you have set an image as its initial content it will also show that image, making it useful for images that are sometimes updated, like profile pics.

<figure><img src="/files/ONIc7U6iYUQHJwwUiK0x" alt="Image uploader element in an app. Formatted to be circular."><figcaption><p>The Image uploader element will show the image after it has been uploaded. In the example above we have styled the element to be circular.</p></figcaption></figure>

## Multi-FileUploader (with drop area)

The Multi-FileUploader is similar to the regular file Uploader, but with two key differences:

* It allows uploading multiple files
* It allows you to set up a drop area where your users can drag-and-drop files

<figure><img src="/files/0KiXfVsw2rMN2qZF3Hnb" alt="Dragging files into a multi-file uploader element."><figcaption></figcaption></figure>

It allows you to set a maximum number of files to upload and an initial list of files to display upon page load.

{% hint style="info" %}
The Multi-FileUploader element is a plugin. It's made by Bubble but it needs to be installed in your app before you can use it.\
\
Search for Multi-FileUploader in the plugin store to install it.
{% endhint %}
