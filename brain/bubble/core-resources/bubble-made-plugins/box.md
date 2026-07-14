# Box
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/box · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This plugin lets you upload files and images directly to your Box storage, rather than the default Bubble storage included with your plan.

## File or Picture Uploader

These built-in Bubble elements allow your users to upload files and images to your application. Once you install the Box plugin, you can modify its “Storage service” property.

### Storage service

In the Uploader’s Property Editor, select “Box” to save the uploaded file to that storage service. When you drop a file into one of these elements, it will automatically upload to Box, but you should treat the upload as if it’s uploading to Bubble and still create a Thing so you can reference the data.

## Setup

Note about "Enterprise ID"s: If you have an individual account you will follow the same steps as an enterprise account. Everyone automatically obtains an enterprise ID if they log in as a developer.

*(Special thanks to user @jarrad, who originally posted these instructions on the* [*forum*](https://forum.bubble.io/t/box-plugin-instructions/13310)*)*

1\) Go to [developer.box.com](http://developer.box.com/) and login with your Box account to enable yourself as a developer

2\) Once in your developers console click “Create new app”

3\) Choose Enterprise Integration

4\) Choose 0Auth 2.0 with JWT (Server Authentication)

5\) Give your app a name, click create then click “view your app”

6\) Scroll down to add your public key. At this point you will be asked to setup 2 step authentication if you have not already done so

7\) Open the Bubble editor and go to Settings > API, click "Download public JSON web key"

8\) Copy the entire contents of the text file into the public key field in the Box console

9\) You will now see a short public key id – copy and paste that into public key id in the box plugin's settings in the Bubble editor

![](https://forum.bubble.io/uploads/default/original/2X/7/79bc7bbe5ad595960443cdb9ed2b952449da0fbd.PNG)

10\) Set your “Application Scopes” & “Advanced Features” in the Configuration tab as desired, ensuring both "Advanced Features" settings are turned on. Note: If you change any of these settings later, you must follow step 16 to reauthorize the app for the changes to take effect.

![](https://forum.bubble.io/uploads/default/original/2X/8/87251093a8407e176dd894adbd0e2a55c8e86d0e.PNG)

11\) Now scroll up and copy the Client ID – paste it into BOTH Client ID & API key sections of the Box plugin settings in Bubble

12\) Copy the client secret – paste it into the client secret section of the Box plugin settings

13\) Now in the Box interface, click “General” on the left hand side, find and copy the User ID & Enterprise ID – paste them into the User ID & Enterprise ID sections of the Box plugin settings in Bubble

14\) In the Box interface, at the top right, click the account dropdown (seen as a head icon) > “Admin console”

15\) Now on the top right of your browser click the gear icon > Business settings

16\) Click the tab “Apps” > Custom Apps > Authorize the new app

17\) Enter the Client ID – the same as the API key you put in the Box plugin settings. Then click next to authorize.

## FAQ

### **Where will my Box uploads go?**

Uploads will go to your main account, inside a folder that you set for the Uploader.

### **What happens if I delete a Bubble thing?**

Deleting a thing will remove it from Bubble as a data record, so it’s gone as far as the app is concerned. The file will remain in your Box account.

### **How can I control privacy settings for Box files?**

You can control the privacy settings on the Bubble-side in Data → Privacy on the Box File data type.

{% hint style="warning" %}
**Note:** While privacy rules set on a Box File will work for preventing the upload from appearing in searches, the privacy rule will not prevent a user from accessing the file link if they were to obtain it.\
\
For example, if there is a repeating group of Box File links on a page and a privacy rule for when "Current user is logged in", a logged out user would not be able to see that list of links. However, a logged out user would be able to access a protected link if it was shared with them somehow.
{% endhint %}

<br>
