# Twitter
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/twitter · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Let users login with their Twitter accounts and fetch their latest tweets.

## **Signup/login with a social network**

This workflow step allows you to integrate a Twitter authentication event when registering a new user or logging in an existing user.

### **OAuth provider - Twitter**

Allows the Bubble editor to verify the correct social platform to login/signup the user.

## **Current user’s Twitter**

When adding dynamic data, this operator allows you to fetch and display content from a user’s connected Twitter account.

### User’s ID

The unique ID of a user’s Twitter profile

### User’s name

The full name listed on a user’s Twitter profile

### User’s handler

The user’s Twitter handle

### User’s location

The location listed on a user’s Twitter profile

### User’s description

The user’s Twitter bio

### User’s followers count

The total count of followers on a user’s profiles

### User’s picture

A user’s Twitter profile picture

### User’s banner

The banner image from a user’s Twitter profile

## **Setup**

### **Configuring your API**

Once you’ve installed the Twitter plugin, you’ll need to configure your API keys through the Twitter developer portal [here](https://developer.twitter.com/en/portal). Add your API key into the ‘consumer key’ field, and the secret key into the ‘consumer secret’ field.<br>

![](https://lh3.googleusercontent.com/TVOfR8yLlP_MJ3ScaaVctZOES7Ascf7hJybY09Pu445lG7yMzqI9Yf6Q_qbRWuUxgt2CjmD7gHXF4VKoZwgHyafyZ10El7UWwaWz1nKv0UmBiDCJiL70iHQK6o09U6BdBqysO3h3=s0)

After connecting your plugin, you’ll now need to enable the Twitter OAuth settings within your developer portal. To find this, head to the settings page of your application, then select to edit the authentication settings.

![](https://lh5.googleusercontent.com/0-sWxc-kL1Tv4RQ-oHAxU4LIIDUR-UFheX2hoNRZJnEDczFVOqPigpmN6qnqKzdnL17YeBV7Ys3xXZlNuQkjIpjdCwlzyT8QrYJzkQ1_puQ_lxIpmALqKcPOWIc_9TwHUVZfGeXN=s0)

When enabling this service, you’ll also need to provide a URL to a terms and policies page within your application.

Finally, you’ll then need to provide a callback URL. This is the page in your application that Twitter will redirect user’s to once their account has been verified.<br>

![](https://lh5.googleusercontent.com/WlS7ZwTZcWbWhL0jQ08KgLdw7TKyxfef1uPxCgCEqqlmuKapbfl2vyNtEJb3H-e7p6_7T93XAVYRUIIo1QeBXmwACIPdarElRXSgafQB81qeM-YuYEZoI7njnN_MO8Ex9gjxNBCg=s0)

### Registering a user with Twitter OAuth

After configuring your API and app settings, you can now use the ‘signup/login with social network’ step within a workflow. From the event dropdown menu, you’ll see an option to select the Twitter OAuth provider. This event can be added to an element like a login button.<br>

![](https://lh4.googleusercontent.com/WxBUfUWrc1y3MVmGbI84LvNRukCvWT0ZcxOT0YJcYcY8Z2nDTtdO0-MSS_bdo3N0nnbeH-YxYjZl1qEiHoCkVXMtQG6opDWwiu45qR4BLGryoCiiIPwdn6iYI0vFn4EcZKWJZXU4=s0)

After a user clicks this button, they’ll be redirected to a Twitter portal where they can verify their account, then be redirected back to the destination URL of your application.

Now, you can choose to display data from a user’s Twitter profile by selecting the ‘current user’s Twitter’ operator.

![](https://lh6.googleusercontent.com/zBYNW7uwhGhyVqJnpaJ4GVtpVi4Qq3vj0LdToWoyZoFwg3ZSi5ajWwfZPJHOLfGyZHmKkBgiOVdsjzTPxj_etM-maoZQ35KMOWUlu2gCnSaPG8BJQJbN_VSwtXwoakSgq6x7Nw8y=s0)

### Fetching a user’s Twitter timeline

After verifying a user’s Twitter account, it’s also possible to fetch a list of their previous tweets from their timeline.

When adding a repeating group, select the type of content to be a Tweet.

From here, select the data source to be the ‘current user’s Twitter timeline’ option.<br>

![](https://lh3.googleusercontent.com/ztXm34RSf7rX0AmfbMwut6P5DmvAB5HlybLYZBgWK82GTE5Qcv7Nf377hDm2X3Bt46WmPFxepDiFAqK1GmwWLtLeIRKW3ecCuTvOyi2wbPdnf-CeEZaWM9aVRyI0ydYScFSW4Rx5=s0)

Now, when adding a dynamic element within your repeating, select from the ‘current cell’s Tweet’ option.

![](https://lh6.googleusercontent.com/BtrMyMMXVpoq7EdZfh_cDPBFCv7sQhr9HKpJxgfON82N0UfP7NndN1FH3Td6oxX1LUzqEa23qT6mJkXLTSA4QmoO2CI3R8fZ8LZAjFr3Tc7gnKCZZloQkLCNA0VLBjD3xVCdJrpY=s0)

## FAQ

### How do you store a user’s Twitter profile information within your own database?

When signing a user up through Twitter OAuth, it’s possible to add an additional step to your workflow that makes changes to the current user’s account.

Within this workflow step, connect your user data fields with the ‘current user’s Twitter’ operator.<br>

![](https://lh4.googleusercontent.com/ux9El9BPCo39k_mJKV3y4LhfeMhqyzucH7Wu8PUtyqXUumwCitOOas6RLvaYzJiirpo6e6WvL9kxDVvaODsl7nTz_VZPLyZFnYLSfBgLes8EjRNLQ9NRXRd8HiKVHvIWZSvoGvMY=s0)
