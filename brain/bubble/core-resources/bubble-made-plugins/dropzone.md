# Dropzone
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/dropzone · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This plugin adds an uploader that you can use to upload multiple files at the same time.

## Multi-File Uploader

The Multi-File Uploader - Dropzone creates an element that allows users to upload more than one file at a time. The returned value will be a list of files.

{% hint style="warning" %}
**Note:** At this time, "Multi-File Uploader's Value" will not work as the value for a list of attachments when using the [Send Email](/core-resources/actions/email#send-email) action. If you need to send these multiple uploaded files as an email attachment, consider referencing them after they are uploaded.
{% endhint %}

### Message to display

Enter what the list should say when empty.

### Initial files to display

This property contains the list of files the input should have before the user interacts with it. It should be a list of files.

### Maximum number of files

This property defines the maximum number the list can contain.

### Make this file private

By default, uploaded files are visible to anyone who has the link to the file. To provide an additional layer of security to files uploaded through this element, select this option. You will be prompted to select a thing to permanently attach the file to. That item can then be used to restrict access to the file via privacy rules.

Note: when uploading to Box, set privacy rules in the Data > Privacy tab.

### Attach this file to

This option is only visible if 'Make this file private' is selected. Private files uploaded with this element are permanently attached to a thing, which is used to determine who has access to view the file. Only users who have the 'View attached files' permission for that thing can view the file. Go to the Privacy section to create privacy rules that grant this permission. If the value of 'Attach this file to' is empty or the thing does not exist, the file will be visible to anyone who has the link, which is the same as if 'Make this file private' was not selected.

### Storage service

By default, uploaded files are stored by Bubble using Amazon's S3 file hosting service. You can optionally select a third-party storage service instead by adding that service as a plugin. Currently we support one third-party service, [Box](/core-resources/bubble-made-plugins/box). (Note: when uploading to Box, set privacy rules in the Data > Privacy tab.)

### Folder path

Enter the destination in your Box to upload the file. The destination is a forward-slash (/) separated list of folder names, such as 'My Folder/My Subfolder.' Bubble will automatically create folders if they do not already exist, and dynamic data can be used to build the folder path.

## Setup

Add the mutli-file uploader to your page from the “Input forms” section of the Elements tree. Customize the message to display along with the maximum number of files.

![](https://lh4.googleusercontent.com/aQfSRLWGbYFa2R03fb_a7dI3N0v5OVfeOLvB7Syye0Q8eW_POtV46Eqc9q0XLHfRCD2u9QMl98MA9GzPN_a8nv-DGnzYYVG0uivP2_sUBaS9XOFeOpRu8xOywlWhosIDlFy8ajLb)

To save the uploads to your database, create a new workflow for when this multifile uploader’s value is changed (the an input’s value is changed event) create a new thing.

![](/files/-MdmIfBpj7Qpl0X959VD)

The multifile uploader’s value is a list of files, so it’s important to ensure that the field we set this equal to is a list and not a single file.

## FAQ

### **Can I save files uploaded to a multifile uploader individually?**

![](https://lh6.googleusercontent.com/JquSsv9NieBufi8wcEkIKE2uqJmVMJBG7ZJ7EK77eRCr4hZ9tiamnOSAgLMSJrAaicdLtYTGGq21YjmnUXnelmE9kmo7QgL8bDzV-NCyy-GIzh-aQmmLW3Jxnyh39KRaQVVOP-UL)

If you would like to save the files individually, you will need to break up the multifile uploader’s value into individual files, using the “:item #” operator. This is fairly doable when you have a small maximum number of files for this uploader; otherwise, it may be easier to use separate file uploaders.
