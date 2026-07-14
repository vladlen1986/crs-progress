# Tinder-like Element
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/tinder-like-element · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This plugin enables you to add a stack of pictures to your application, which your users can swipe through to like or dislike.

## Tinder Pile

This element shows a Tinder-like pile of pictures to users, and they will be able to swipe right or left. Run workflows when the users swipe in either direction.

### Type of content

Define which type of thing the pile should use as the source of pictures.

### Data source

Specify the list of things that will contain the pictures to display. It can be, for instance, 'User's profile pictures.'

### Image field

Select the field that contains the image for each thing. This can be 'Profile pictures,' for instance, and should be of type image.

### Show card title

When checked, each picture will have a title defined in the Picture caption field.

### Picture caption

Enter the expression for the caption of each picture. For example, it could be 'Current card's first name Current card's last name.'

### Card background color

Select the background color to be applied behind the pictures.

### Border width

Enter the border width in pixels to apply to each picture.

### Title color

Select the title's font color.

### Image when liked

Define the image to show on top of the picture when the user likes the picture, e.g., swipes right.

### Image when disliked

Define the image to show on top of the picture when the user did not like the picture, e.g., swipes left.

## A Tinder Pile's card is swiped left

This event is triggered when the user swipes left on a tinder pile. Refer to the current image just swiped using the expression 'This TinderPile's current slide.'

## A Tinder Pile's card is swiped right

This event is triggered when the user swipes right on a tinder pile. Refer to the current image just swiped using the expression 'This TinderPile's current slide.'

## Swipe a Tinder Pile left

This action forces a swipe left of a tinder pile.

## Swipe a Tinder Pile right

This action forces a swipe right of a tinder pile.

## Setup

You can customize your Tinder pile to choose which images you want to display, your caption, and the images your users see when they like or dislike an image. In this case, we are searching for our "Examples" data type and using the "Name" as a caption. We have uploaded our images for "Yes" and "No," respectively.

![](/files/-MZsLqB5N91lry33dAAN)

Once we preview the page, we will see the first of our images on the top of the pile. Note that the grey shadow will get bolder automatically based on the number of images in the pile. In our case, we only have 3 images in our pile, so the shadow is light.

![](/files/-MZsLmOJ5gIKxmjh5hf4)

## FAQ

{% hint style="info" %}
**Tip:** If the data source of a tinder pile changes, it will cause the data in the pile to refresh (just like a repeating group updating its contents).
{% endhint %}

### Android (Chrome)

The Tinder Pile element simply loads all elements at once. This can cause the element to glitch or crash when there are a lot of images used and the page is opened on an Android mobile device using the Chrome browser due to heavy GPU usage. Consider using a different plugin or fewer images in the mean time if the Tinder Pile element is accessible via mobile web.
