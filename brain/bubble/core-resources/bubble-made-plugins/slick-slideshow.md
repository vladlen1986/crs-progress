# Slick Slideshow
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/slick-slideshow · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The Slick Slideshow Plugin creates an element that displays a rotating carousel slideshow of static or dynamic images with a slide or fade in/out effect.

## Slideshow

### Type of list

Define whether the slideshow should display images uploaded in the Bubble Editor or uploaded by users and saved in the application database. Choose from 'Upload each image' and 'Use a dynamic list'.

### List of static images

Click the Upload another image button to upload each image individually.

### Type of image

Enter the type of thing that contains the images to display in the slideshow.

### Data source

Define the list of things that will contain the images. It can either be the result of a search or content of a field that is a list of images.

### Run-mode rendering

This option defines how to handle dynamic images if their size does not exactly fit the slideshow dimensions. The two options are:

* **Stretch:** The image will be resized to cover the entire slideshow area.
* **Rescale:** The element will add horizontal and/or vertical margins so that the image stays within the boundaries of the slideshow but is not distorted.

### Image field

This data type field contains the image. It should be of type image. For example, if the type of list is 'Apartment,' the field will likely be 'Illustration.'

### Wipe the entire list when it changes

If a list has similar items only in different colors, the displayed list will not change to prevent interfering with the user's interactions with the element. Check this box to override this behavior and redraw the entire list when it changes.

### Animation style

Select the animation type. Choose from Slide and Fade.

### Animation speed

Enter the length of the animation in milliseconds.

### Autoplay

Check this box to start the animation automatically on page load.

### Speed

Enter the number of milliseconds between each transition.

### Pause on hover

Select this option to pause autoplay on hover.

### Show navigation dots

When checked, the element displays dots under the images that the user can click to switch between images.

### Navigation dots color

Select the color of the navigation dots.

### Show arrow buttons

When checked, the slideshow element will show two buttons on the right and left to go from one image to another.

### Arrow button color

Select the color of the arrow buttons.

## Setup

You can use the Slideshow element to display a dynamic list of images. These could be a product photo gallery on a product details page on a marketplace, or a selection of photos uploaded by the current user on their profile page.

In our example, we want to display all of the images associated with our "Example" data type. Our images are various dimensions, so we are going to choose "Rescale" to prevent our photos from being too distorted.

![](/files/-MZZK07jxmq7JOzogRm3)

In runmode, each screen will automatically adjust to match the image's dimensions.

![](/files/-MZZKyaIPQgAYGSYCDbY)

## FAQ

(Have a suggested FAQ to help other Bubblers? Please visit our [Support center](https://bubble.io/support) to get in touch with a member of our Support team!)
