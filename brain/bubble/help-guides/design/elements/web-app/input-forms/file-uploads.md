# File uploads
> Source: https://manual.bubble.io/help-guides/design/elements/web-app/input-forms/file-uploads · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section covers elements that lets your users upload files and images

File upload elements let your users upload any kind of file to the Bubble server. Bubble has two different elements for uploading files: one for general file uploads and one specifically for images.

<details>

<summary>File storage and the database</summary>

In the Bubble Data Type editor you can add two types of file upload fields:

* file
* image

When you upload a file to the Bubble database, the database doesn't actually store the file itself. The process is actually two-fold: first, Bubble uploads the file to the AWS[^1] server and then it saves the URL to the file in the database.

In other words, both the *file* and *image* fields in the database only contain a URL *pointing* to a file, and not the file itself. From a performance perspective, this means that your database only holds a short text value (the file's URL), and the file is not downloaded until it's needed.

</details>

<details>

<summary>Deleting uploaded files</summary>

As we explored in the infobox above about [File storage and the database](#file-storage-and-the-database), the database doesn't actually store the file – only the URL to the file.

As a consequence, if you delete the content of the *image* field in the database, it will remove the URL, but the file itself is not deleted.

To actually delete the file from the server, you need to use the *Delete an uploaded file* action in a workflow. Keep in mind that you need the URL of the file to delete; as such you should delete the file *before* you clear the URL from the database.\
\
Video tutorial: [Deleting uploaded files](https://www.youtube.com/watch?v=-z6b2UH_JAw)

</details>

{% hint style="warning" %}
Uploaded files are public by default, meaning that anyone with the URL can access it. If you want your files to be securely private, you need to check the *Make this file private* on the uploader element and set up your Privacy Rules correctly. This applies both to images and other files.\
\
You can read more about these settings in the core reference articles below:

Reference: [Uploading files to be private](/core-resources/elements/input-forms#make-this-file-private)\
Reference: [Protecting uploaded files with Privacy Rules](/core-resources/data/privacy#view-attached-files)\
Video tutorial: [Setting up Privacy Rules](https://www.youtube.com/watch?v=1-meIeBUXPY)
{% endhint %}

## File uploader

{% embed url="<https://www.youtube.com/watch?v=2wQo0Nve4Zs>" %}

The File uploader element is used for uploading non-image files. It also supports uploading image file types, but the Image uploader element offers some additional features for that.

<figure><img src="/files/A2v5OCqPQvQkxHJpkDAh" alt=""><figcaption><p>The File uploader element will show the filename after the user has selected a file to upload.</p></figcaption></figure>

You can set a maximum size for the uploaded file. The File uploader element introduces a new action that lets you cancel an ongoing upload.

## Image uploader

{% embed url="<https://www.youtube.com/watch?v=ZXjhQkM5qV0>" %}

The Image uploader element is used for uploading images and will give you a preview of the image after the upload. If you have set an image as its initial content it will also show that image, making it useful for images that are sometimes updated, like profile pics.

<figure><img src="/files/ONIc7U6iYUQHJwwUiK0x" alt=""><figcaption><p>The Image uploader element will show the image after it has been uploaded. In the example above we have styled the element to be circular.</p></figcaption></figure>

## Multi-FileUploader (with drop area)

The Multi-FileUploader is similar to the regular file Uploader, but with two key differences:

* It allows uploading multiple files
* It allows you to set up a drop area where your users can drag-and-drop files

<figure><img src="/files/0KiXfVsw2rMN2qZF3Hnb" alt=""><figcaption></figcaption></figure>

It allows you to set a maximum number of files to upload and an initial list of files to display upon page load.

{% hint style="info" %}
The Multi-FileUploader element is a plugin. It's made by Bubble but it needs to be installed in your app before you can use it.\
\
Search for Multi-FileUploader in the plugin store to install it.
{% endhint %}

[^1]: AWS, or Amazon Web Services, is a cloud service platform that offers hosting of databases, files and a lots of other technical resources.

    Bubble uses AWS for its database and for file uploads.\
    \
    External link: [Amazon AWS](https://aws.amazon.com/)
