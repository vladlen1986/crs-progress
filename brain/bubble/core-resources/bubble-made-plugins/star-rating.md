# Star Rating
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/star-rating · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

The Bootstrap Star Rating Input Plugin creates a Star Rating input element. Users can click a star to assign a value to a thing. This is similar to the Yelp stars.

## Star Rating

### Min value

{% hint style="warning" %}
**Note:** When you set a minimum, this does not add “always filled in” stars. The stars show the width of the underlying slider. If the scale does not divide evenly across the number of stars, these steps might start overflowing. While this allows for some more complex setups, like starting with negative values, we recommend a minimum of 0 for most cases.
{% endhint %}

Enter the minimum value the stars can have.

### Max value

Enter the maximum value the stars can have.

### Step

This number represents how much one increment should modify the star's input value.

### Star size

Select a size for the stars. Choose from Xs, Sm, Md, Lg, and Xl.

### Initial content

This field defines what the initial value should be before the user modifies it. If the content is dynamic, the expression should be of type number.

### Stars color

Select the color for the stars not selected. For example, in a rating of 4/5, the fifth star will be this color.

### Rating color

Select the color for the stars selected. For example, in a rating of 4/5, the first four stars will be this color.

## Setup

This plugin can let your users rate a product or service, as well as display that product or service's average rating. For example, let's say we add a Star Rating input, then start a workflow to create a new rating when its value is changed.

![](/files/-MZsINcfsdjGQzqgOsoo)

We'll save the Star Rating's value to a field of type number. This is how our users can add their own ratings. Next, we can add a second Star Rating input for the averages.

![](/files/-MZsILGpNGYob5Wmm5pq)

This time we will set an initial content for the input, or the amount of stars we want to display on page load. In this case, we will get the average of all the ratings so far.

![](/files/-MZsIJ3SNkOgqbO0f4aE)

Now when we preview the page, we can leave our own review in the first input and watch as it affects the average in the second.

## FAQ

(Have a suggested FAQ to help other Bubblers? Please visit our [Support center](https://bubble.io/support) to get in touch with a member of our Support team!)
