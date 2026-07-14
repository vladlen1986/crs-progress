# LinkedIn
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/linkedin · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Let users log in with their LinkedIn accounts and fetch their profile details.

## Signup/login with a social network

This workflow step allows you to integrate a LinkedIn authentication event when registering a new user, or logging in an existing user.

### OAuth provider - LinkedIn

Allows the Bubble editor to verify the correct social platform to login/signup the user.

## Current user’s LinkedIn

When adding dynamic data, this operator allows you to fetch and display content from a user’s connected LinkedIn account.

### User’s ID

The unique ID of a users LinkedIn profile.

### User’s first name

The first name of a user per their LinkedIn account.

### User’s last name

The last name of a user per their LinkedIn account.

### User’s profile picture

A user’s LinkedIn profile picture.

## Setup

### Configuring your API

Once you’ve installed the LinkedIn plugin, you’ll need to configure your API keys through the LinkedIn [developer portal](https://www.linkedin.com/developers). You can find your API keys under the ‘auth’ tab in your developer account.<br>

![](https://lh5.googleusercontent.com/spR7fkaYUPs5sbbb9fJnqGHFV3xBJdZ-IsdUn3AEPSMmWvYUnw6i53o7cfqz-yBp48W-xxVLeD0EQN7DVLU3hNV3CXciCqdkHKEwZ2JpdhpLyBK6RMeIzr_XBh-7phK8pEKpSwtV=s0)

Add both your client ID and client secret key into the corresponding fields of your LinkedIn plugin.<br>

![](https://lh4.googleusercontent.com/PfY3EHZIde-NZM2-h2gruxAGl2USREHfmDCDNt80iPCIrov1m6sU9xguHxCJ93ob-cipibjt4sfj3cYHMib4_sZWgy5sHF0d6eE2Kuq_F5cKGWHdHcjPi5c_oXvZo0h4LRg4tv_s=s0)

After connecting your plugin, you’ll now need to add a redirect URL under the ‘OAuth 2.0 settings’ in your LinkedIn developer portal. This URL should be the same page in your app where the user originally selected to connect an account. Once a user has authenticated their account through LinkedIn, this is the page they’ll be redirected to.<br>

![](https://lh3.googleusercontent.com/crgRfeqW913v1Ly0dGkE-tV9kcGW0EgjuVLqOqcOEeXWCTSLuv3KlByaypVMk3FzglSAUdCVaOsREySpipJoW20dWnbzvhwSEfuxd0KlZ475asLIOLfROp70aR11jHiwShgX3vPW=s0)

### Registering a user with LinkedIn OAuth

After configuring your API and app settings, you can now use the ‘signup/login with social network’ step within a workflow. From the event dropdown menu, you’ll see an option to select the LinkedIn OAuth provider. This event can be added to an element like a login button.<br>

![](https://lh5.googleusercontent.com/rXd4lzST2NclgZWVxvKxbxaVqP19p1YOVbX4OueP1SYRMoZMYilk_cpQewjKN_ZkskPNO5Wr-Z7Bqcg9tYqhCLxkJWnpDSj9CsT8myyls0xgoZaHsyfZuRf6i_Fc7LrBqnNi6UUm=s0)

After a user clicks this button, they’ll be redirected to a LinkedIn portal where they can verify their account, then be redirected back to the destination URL of your application.

Now, you can choose to display data from a user’s LinkedIn profile by selecting the ‘current user’s LinkedIn’ operator.<br>

![](https://lh5.googleusercontent.com/bRNyThl3w4f6S5Sx7YJJGjBGAK7kNvVNtcz7sDVd1hJG8wUch4TqWFUOOgUK1jIqNX9QqjToLCPN0sGc6xjRDnQ2oJf5O6mrWxKHnRyHRNj6eg2ZHygk-AZVLUtlnzGPYJvU9F9X=s0)

## FAQ

### How do you store a user’s LinkedIn profile information within your own database?

When signing a user up through LinkedIn OAuth, it’s possible to add an additional step to your workflow that makes changes to the current user account.

Within this workflow step, connect your database fields with the ‘current user’s LinkedIn’s’ operator.<br>

![](https://lh6.googleusercontent.com/GzCmAFsXx9tnQZOtXoPewLJN6BbUsA95rvHeoZiv6HZSrogkRBl-rITQj3R4As31rFXfcTjttynoC6T0-i-qsK8OPlvp3Jy9UAfL8GQOfuOE0qHXJSyKA9uMywHNVcF1Ch5HedMN=s0)

{% hint style="warning" %}
**Note:** If a user is to revoke access between your app and their LinkedIn account, the link to each connected data field can break. It can be considered best practice to pull this data in dynamically rather than save it to your database.
{% endhint %}
