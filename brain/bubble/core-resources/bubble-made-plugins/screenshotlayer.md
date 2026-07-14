# Screenshotlayer
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/screenshotlayer · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This plugin allows you to take a screenshot of a page within your Bubble application.

## Get data from external API

By adding this call in a workflow or dynamic field, it allows you to generate a screenshot of a page within your Bubble application.

### API provider

The external API that you’ll call. Select the Screenshotlayer - Get screenshot option.

### (param). url

The url of the application page you’d like to capture a screenshot of.

### (param). width

The width of the generated screenshot image.

### (param). force

Set to "1" if you want to force the API to capture a fresh screenshot.

### (param). placeholder

Add a URL containing a custom placeholder image or set to "1" to use default placeholder. The placeholder image will act as a template for a starting screenshot.

### (param). viewport

The section of a screen’s viewport that will be captured.

### (param). delay

The delay from the screenshot event trigger and the time of the actual screenshot capture.

## Setup

After installing the Screenshotlayer plugin, you’ll be required to add your own API keys to begin capturing images. You can request your own API key on the Screenshotlayer developer portal [here](https://screenshotlayer.com). Once you’ve created an account, you can generate an API key.

Now, copy the API key value into both the ‘API key’ & ‘API key’ - dev field of your Bubble plugin.<br>

![](https://lh3.googleusercontent.com/MKVWVSf_pKC0IulKx1wUPdkP25G_paZEuWNdyT5Xrkk3ysEqcWuujI2FKItoPf7Uqg15Zdg1P_jXPA2r36fp5Ue6EUGlsp9OXf9CQfmyoWYeg0pW1ZQfmOIN0zzurq7z-qGAU_gC=s0)

After configuring your API keys, you’ll now need to create an image data field within your database to store a screenshot.

Now, within a workflow, you can reference the external API service to update the image field within your database with a screenshot.

From the API provider dropdown menu, select the ‘ScreenshotLayer - Get screenshot’ option.<br>

![](https://lh6.googleusercontent.com/Sx6SGDs9VJDkDXwbpiRwkapI_FK3sspKBcLccL6FdqFNlcR5yxJy3jPcPzijU10fwxeostM0wttnqnUQ5Z4LQgdU0N6qYOtXNsXIkc7dl6Wpp5tKKr_VMR4NOiJdQcAlWOP9pB0P=s0)

From here, you’ll then need to update the (param.)url field to identify what page of your application you’d like to capture a screenshot of. If you’d like to capture the current page, insert dynamic data of this url.

At this point, you can also update additional parameters of the screenshot, including the dimensions and delay.<br>

![](https://lh3.googleusercontent.com/BotYa2qyeDjPOgL5cQ-AAczeETJMx4h1xls8PMyK3sSCXo8gxuxHjI0CKJPPW_S23WpBH3yQJdYqSWkzY8ZplYy5FyEFNkNChSwfmhltoIaAiXF00aBo798E83wYZ7rghews80Ir=s0)

Additionally, it’s also possible to specify what file type or format you’d like to store the screenshot in using the more operator.<br>

![](https://lh6.googleusercontent.com/qea5ty-mLZxCHj2JJk_HkcumwEKby1xrxaOZd_nnvWzXIy3yDOdCLO0DTIPW1NBRz1Pvgn9Xn13wQEnl5roOP81sfEHGctiF66XMgHqizNwdJMQlyQp4OAC76taeGkBcAtZmeBwZ=s0)

## FAQ

(Have a suggested FAQ to help other Bubblers? Please visit our [Support center](https://bubble.io/support) to get in touch with a member of our Support team.!)<br>
