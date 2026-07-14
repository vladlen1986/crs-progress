# Camera/photo library
> Source: https://manual.bubble.io/help-guides/logic/device-resources/camera-photo-library · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

In this section, we’ll explore how you can integrate your app with a mobile device’s camera and/or photo library. Bubble supports taking pictures in real time, or select existing images from the library of the user's device.

{% hint style="info" %}
**On-device permissions:** When your app needs to access the device’s camera or photo library, the device may ask users for permission to grant access. Bubble handles these permission requests automatically, so you don’t need to worry about managing them manually.

You can customize the text shown in these permission prompts in the *Settings – Language* tab of the Bubble editor.

Article: [App texts (translating your app)](/help-guides/data/static-data/app-texts-translations)
{% endhint %}

## Camera access <a href="#camera-access" id="camera-access"></a>

To access the camera, you can set up an event, like a button or icon click, and then add the "Open camera" action to the workflow. Bubble will manage the connection with the device's hardware, seamlessly displaying the camera app to the user.If you want to protect the captured photo with privacy rules, be sure to check the *Make this file private* box.

<figure><img src="/files/RiKDH617jVbm5ibMyHp7" alt=""><figcaption></figcaption></figure>

#### **Save to camera library**

To instruct the device to save a copy of the image to the camera library, check the *Save to camera library* box.

#### **Making the file private**

To make the uploaded file private[^1] (i.e. protected by privacy rules), check the *Make this file private* box and select the data type to which the file should be attached.

### **Saving the result**

The file will be uploaded in the same way that an uploaded file would, and you can store or use the URL of that file in a subsequent action by using the *Result of step X* data source.

<figure><img src="/files/mh1iMuAcADMlM887SxMD" alt=""><figcaption><p>By referencing <em>Step 1</em> in the workflow, we can access the file that was just uploaded from the device. In the example above we're setting the profile picture of the current user by referencing the URL of the newly uploaded file.</p></figcaption></figure>

## Camera library access <a href="#camera-library-access" id="camera-library-access"></a>

To access the camera library, you can set up an event, such as a button or icon click, and then add the *Open camera library* action to the workflow. Bubble will handle the interaction with the device, displaying the built-in photo library to the user.

The file will be uploaded similarly to any other uploaded file.

#### Uploading multiple images

You can choose to upload a single image, or a list of images by using the *Type* dropdown in the action's settings:

* **Single photo:** uploads one file and returns a single URL.
* **Multiple photos:** uploads multiple files and returns a list of URLs.

#### **Making the file private**

To make the uploaded file private[^1] (i.e. protected by privacy rules), check the *Make this file private* box and select the data type to which the file should be attached.

<figure><img src="/files/BzVMQbVH6vdfcP4yGebH" alt=""><figcaption></figcaption></figure>

### **Saving the result**

To save the result from a file uploaded from the camera library, please see the instructions [above](#saving-the-result).

[^1]: You can read more about file privacy in the article below:\
    \
    Article: [Files](https://manual.bubble.io/help-guides/data/file) | [Uploading private files](https://manual.bubble.io/help-guides/data/files#uploading-private-files)
