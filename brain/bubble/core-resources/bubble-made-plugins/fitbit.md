# Fitbit
> Source: https://manual.bubble.io/core-resources/bubble-made-plugins/fitbit · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Let users log in with their Fitbit accounts, fetch their workout data, and update their subscription status.

{% hint style="info" %}
This is the short-form, technical reference for the Fitbit plugin. For a more in-depth explanation of the plugin and how it works, see our User Manual article below:

Article: [The Fitbit plugin](/help-guides/data/user-accounts/authentication-plugins/fitbit-plugin)
{% endhint %}

## **Signup/login with a social network**

This workflow action allows you to integrate the Fitbit authentication event when registering a new user, or logging in an existing user.

### **OAuth provider**

Allows the Fitbit editor to verify the correct social platform to login/signup the user.

## **Invite Fitbit friend**

Send a friend request to another Fitbit user.

### InvitedUserEmail

The email address of a user’s Fitbit account that the current user would like to send an invite to.

## **Accept Fitbit friend invitation**

Accept a friend request from another Fitbit user.

### **FromUserID**

When choosing to accept a friend request, this is the ID of a Fitbit user's account that will be added to the current user’s friend list.

## **Add Fitbit subscription**

Start a Fitbit subscription.

### **SubscriptionID**

The unique characters to reference a user's Fitbit subscription.

## **Delete Fitbit subscription**

Remove a Fitbit subscription.

### **CollectionPath**

Collection of data to retrieve notifications. If the collection is not provided, the list will include all subscriptions for the user.

## **Current user’s Fitbit profile**

When adding dynamic data, this expression allows you to fetch and display the profile information from a user’s connected Fitbit account.

### **ID**

The unique ID of a user’s Fitbit account.

### **Avatar**

The profile photo from a user’s Fitbit account.

### **FullName**

The full name from a user’s connected Fitbit account.

### **Nickname**

The alternative name added to a user’s connected Fitbit account.

### **AboutMe**

The profile description from a user’s connected Fitbit account.

### **Age**

The age of a user saved within their Fitbit account.

### **Height**

The height of a user saved within their Fitbit account.

### **Weight**

The weight of a user saved within their Fitbit account.

### **DateOfBirth**

The birth date of a user saved within their Fitbit account.

### **MemberSince**

The date that a user initially created their Fitbit account.

## **Current user’s Fitbit daily activities**

Allows you to fetch the user’s workout data from a specific date.

### Activities

A list of all the recorded activities from a user’s account.

### Goals\_caloriesOut

Calorie burn goal represents either dynamic daily target from the premium trainer plan or manual calorie burn goal.

### Goals\_distance

The target distance traveled within a user’s Fitbit account for a specified date.

### Goals\_floors

The target amount of floors climbed within a user’s Fitbit account for a specified date.

### Goals\_steps

The target number of steps within a user’s Fitbit account for a specified date.

## **Current user’s Fitbit food log**

Allows you to fetch the user’s log food intake data from a specified date.

### Foods

The recorded foods a user consumed on a specified date.

### Summary\_calories

A summary of the total calories consumed by a user on a specified date.

### Summary\_carbs

A summary of the total carbs consumed by a user on a specified date.

### Summary\_fat

A summary of the total fat consumed by a user on a specified date.

### Summary\_fiber

A summary of the total fiber consumed by a user on a specified date.

### Summary\_protein

A summary of the total protein consumed by a user on a specified date.

### Summary\_sodium

A summary of the total sodium consumed by a user on a specified date.

### Summary\_water

A summary of the total water consumed by a user on a specified date.

## Current user’s Fitbit sleep log

Allows you to fetch the user’s logged sleep data from a specific date.

### TotalMinutesAsleep

A summary of the total minutes a user slept on a specified date.

### TotalSleepRecords

The total number of sleep records stored within a user’s Fitbit account.

### TotalTimeInBed

A summary of the total minutes a user spent in bed - both awake and asleep.

## Current user’s Fitbit heart rate log

Allows you to fetch the user’s heart rate data logged from a specific date.

### CaloriesOut

The total number of calories a user burnt on a specified date

### Max

The max heart rate recorded on a specified date.

### Min

The minimum heart rate recorded on a specified date.

### Minutes

The duration of each session where a heart rate was elevated.

### Name

The name given to a workout session where the user’s heart rate was elevated.

## Current user’s Fitbit lifetime activities

The total activity statistics from a user’s Fitbit account. This is an overview of all their historical key data points, as well as achievement values.

### Lifetime\_total\_caloriesOut

The total number of calories a user has burnt since the creation of their account.

### Lifetime\_total\_distance

The total distance traveled by a user since the creation of their account.

### Lifetime\_total\_floors

The total number of floors a user has climbed since the creation of their account.

### Lifetime\_total\_activeScore

The average active score given to a user’s account based on their lifetime activity.

## Current user’s Fitbit device

The Fitbit device model linked to the user’s account.

### ID

The device ID on a user’s linked Fitbit device.

### Battery

The current battery level of a user’s linked Fitbit device.

### DeviceVersion

The device model of a user’s linked Fitbit device.

### Type

The type of device linked to a user’s account e.g. fitness tracker, scales.

### LastSyncTime

The last recorded time that a user’s device was synced to their account.

## Current user’s Fitbit friends

A list of all the friends connected to a user’s Fitbit account.

### ID

The unique ID of a friend’s Fitbit account.

### Avatar

The profile photo of a friend’s Fitbit account.

### FullName

The full name listed on a friend’s Fitbit account.

### Nickname

The alternative name added to a friend’s Fitbit account.

### AboutMe

The profile description from a friend’s Fitbit account.

### Age

The age saved on a friend’s Fitbit account.

### Height

The height saved on a friend’s Fitbit account.

### Weight

The weight saved on a friend’s Fitbit account.

### DateOfBirth

The date of birth saved on a friend’s Fitbit account.

### MemberSince

The date that a user’s friend registered initially created their Fitbit account.

## Current user’s Fitbit friends invitations

A list of the current friend requests to a user’s Fitbit account.

### DateTime

The date and time that a friend request was sent.

### User

The user who has sent the current user a Fitbit friend invite.

## Current user’s Fitbit subscription

Allows you to fetch the user’s heart rate data logged from a specific date.

### CollectionType

The type of Fitbit subscription e.g. activities, body, sleep, etc

### OwnerID

The ID of the user who owns the subscription.

### OwnerType

The type of entity who owns the current subscription e.g. user

### SubscriberID

The ID of the subscriber that will receive the subscription notifications.

### SubscriptionID

This is the unique ID of the subscription created by the API client application.

## **Setup**

### Configuring your API

Once you’ve installed the Fitbit plugin, you’ll need to first create a [developer account](https://dev.fitbit.com/getting-started/) to secure access to an OAuth key.

After registering a developer account, you’ll then need to register a new app within the Fitbit [developer portal](https://dev.fitbit.com/apps).

Once the details of your app have been added, you’ll be provided with a client ID and secret key for your OAuth 2.0 integration.<br>

![](https://lh5.googleusercontent.com/kk4ASEA8Ugi7YhCLrppRmrYijvGdS5gsv6lAP0BjBBT4maZS1Yb-4Uaw9GC3SHPChyhSuSKr6ROUW70z_joiEYHsAnHyJxkTtcvqmJwsv3ni4MWkQ3ASx1cOW_hjerILjH_1AQAK=s0)

Now, you’ll need to copy both the client ID and client secret keys into their relevant fields within your plugin settings.

![](https://lh4.googleusercontent.com/ZgAEB-uDmlS8zByD1EAhQwFnxBUxLfxhvQp7EaUWU5lLNXqBVgm997AAhI674BV5zs0FJ2iktj76IqY3EmASKOdLQbHmdn6BfMxP2vbn1q0Q6j6CopADmNwQGdaXGrqvX0ffWn5g=s0)

Note: It’s also possible to enable a generic redirect URL within the Bubble plugin settings itself.

![](https://lh6.googleusercontent.com/XUowXG7lO9t_nQu1wjKbv3hUi0XG9kcqsNmpOP0Yw5Im1Ta2746mv0BjlHXXN6h8FbAPYCcgWEE_eKItHEs9FF-PFH87d-ZB2FJxf_y35dv1LSzaPYPRjVML5wSGyPGU1SDT7dav=s0)

### Logging a user in through Fitbit

After configuring your OAuth credentials, you can now use the ‘signup/login with social network’ step within a workflow. From the event dropdown menu, you’ll see an option to select the Fitbit OAuth provider. This event can be added to an element like a login button.<br>

![](https://lh6.googleusercontent.com/X1dpv1mF8RCU1D9KgLNjeSMa3EvoBXVK37hH-dOyAMqbqiPGjb7iwS_VkAXdQtpxgtbHhoxkqwJx-tzEZ1d7-aJcllURsSiosk-sZmL0M9eyASMJMTYI6veD4ioTGFPQMjtlOnOH=s0)

After a user clicks this button, they’ll be redirected to a Fitbit portal where they can verify their account, then be redirected back to the destination URL of your application.

Now, you can choose to display information from a user's Fitbit account by using the ‘current user’s Fitbit’ operator.<br>

![](https://lh3.googleusercontent.com/m_F9w1nN6a6_pVlQDujMJnFk5Pld7mgcSLXHMKE8fNpZuzrcr5W64xo_lb0BnkzroaF8zncvMxPU4E82_sxP3L4DqjEwRGTikSHVYCm__uHjlgvH17PpneLDtx39JFXundPmakyy=s0)

### Accepting a friend invitation

To display a list of a user’s Fitbit friend invitations, start by adding a repeating group element to the page. The type of content for this repeating group will need to be configured as ‘Fitbit Friend Invitation’.<br>

![](https://lh3.googleusercontent.com/yJdtuJGkE2s1-fjYD69yrPPMyjNtuAbiLld3nRFVplu1zA6gbc064jFhHy6KcQBb72Uq_U_WhZarXpxaVzxycbNAL2hiUpHTfoyneomMq-ZdE_ew_UYiDOI4Ruip-F5vrwfNmQdd=s0)

Now, you’ll also need to update the data source to display the ‘current user’s Fitbit friends invitations’.

![](https://lh6.googleusercontent.com/i98_jnpzr5M2y24l2KBjS72pNOwnj84jba2QvANEgXZWB9XcPJDOKiznHM6m3pzh3bc2pU2K7XVoaf6f71KPHpQRzOTCwtLa7oUATnE-uc1HBq-jxCPDNhAXL8JmV4m4vsv0AidD=s0)

Now, within the repeating group cell, you can display information from a user’s Fitbit profile who has sent a friend invitation.

![](https://lh3.googleusercontent.com/49sbun1F3dl76F5mfAk9K3ksgM2z5TWVHykWPgQuPoFiXWh3N-fszACbZhUYrehyZp_FH11VEdUdiXgcThJfeGhLAocFTEdcyeFVPnxxO5wnpKbrcgaFTkNiq6WMHMFv1aTquKWL=s0)

From here, when the accept button is clicked, you can create a workflow and choose from the ‘accept Fitbit friend invitation’ event.<br>

![](https://lh5.googleusercontent.com/q4WA32gpcqLH-Q6bSr7w44Tvv2frhOVUKHCYcEiZbCQiDUNY3rItm1cP1PLLiyhfvGs_7B09JBuaZW5k8-S28Fe8RMCZ5m9ra9XRsdde2mIbpd0-0VyXyq8qRMfWmdxHmBHsEqPw=s0)

When configuring this workflow event, you’ll need to set the FromUserID to be the ‘current cell’s Fitbit friend’s invitation’s User ID’.

![](https://lh4.googleusercontent.com/ED36EjgSx2PI-lu-AD_Wa-YigLCVb31z4bGOPMs7rL-gPJssUD4Qxj4rfYVBE21_9FHVXm32CuMyTaFQ6DlnQEYNClvzG804_nDlDRdEwTvdko4L-NTq84kJRVph72ytZ_aE-AvL=s0)

### Inviting a Fitbit friend

In order to allow the current user to send a Fitbit friend invitation, select the ‘invite Fitbit friend’ workflow event.<br>

![](https://lh3.googleusercontent.com/V8l1xwtkaWo2nABLS7N6P9Mkj0hlMJvemNPGrPFalXK-DUtrkuzOXGHCfGiN0S0uWz0bk8Fk7z7z_mg2pJjsFn9RpkwWMjFJLU2mrheSaA07EBGV6wJnydDxzdGlYGA1ebNwWR56=s0)

Within this workflow event, you’ll need to configure an email value associated with a user’s Fitbit account. This can be attained through an input form.<br>

![](https://lh6.googleusercontent.com/IzOghwqVC9XL8_5h0Sm2EbXzapX_EFSOzDm7BTZuRAaTkC1M8L8mpqw_RZjz5AcdeyCieJPVNnu7gENcFvR74KpjbMs4D7wig5hRUT7d3dgXy6ZVOUbWCMSrcCM8-ljXCJZVqseO=s0)

### Adding a Fitbit subscription

When adding a new Fitbit subscription, select the ‘add a Fitbit subscription’ event within your workflow editor.<br>

![](https://lh3.googleusercontent.com/dAC6Y5PItWcL_aEIOONqFzOuSTDZ3rdPy7eMYH6U-9xV2e7oRIufRpsG98vwIaqqzwDFiNgMnZZtrOCfoN3auuTHKqSkHF0xUu4Vy6Y-EFKFV84wOkK42numSaXrVu3RLNPPkzec=s0)

When adding a new subscriber, you’ll need to associate a SubscriptionID to the current user. This unique ID will be shared with Fitbit. As Fitbit states within their [API docs](https://dev.fitbit.com/build/reference/web-api/subscriptions/), this ID has a character limit of 50 characters.

Within a Bubble input, it’s possible to use the formula operator to generate a random character string.<br>

![](https://lh4.googleusercontent.com/OF0XDRL5nDirbCqPDQqdQ186osENWgTtbiuKXngM93P-V8G3lySGyyeTXm0s-QXKruPV0M5FJrRAe7qSxKobRrWzbzZmCFT-kcP8khAUYXYyXe_jQoeO4MpeXXcbapi97QQzigpL=s0)

Now, when configuring your subscription workflow event, it’s possible to use the value of this input field as the SubscriptionID.<br>

![](https://lh4.googleusercontent.com/d3Kgm7QLX8KbpRcLpy8WIuphZxoWUKhkpnzc1qU43clHwe5crSEJCoIxCcZ5hOmADKETCF6Ni9gugeyLcK_1zUiGwZPF4GVWebRhUPIAQJwakjApOS7JMZqROPwDn7NuBb3SjtDW=s0)

We’d also recommend storing this SubscriptionID as a field under your user data type. This will allow you to reference this unique ID if the user chooses to delete their subscription at a later date.<br>

![](https://lh4.googleusercontent.com/ly-S5HDCo_SxFRW55iomNSGjQPwxAoocmRvP8hIpUjhGyhMegtnIxsTZwUG4pqsoCE0M3PTuJBjjaGQJYuZXPpn_jC4dpW0w4jo4Nf6HjHXerZ4ZH0uVijtNnzuo8yFBS4qTByBH=s0)

### Deleting a Fitbit subscription

When deleting a user’s Fitbit subscription, select from the ‘delete a Fitbit subscription’ workflow event.<br>

![](https://lh6.googleusercontent.com/bAu791I5VldUHXN_Lvgfwu66afGSboFScuxFmp7YlYP8Nzlqfw9jm5JJmNtnafVtN8M1JW-eEOBJMa6xcKalo65gTeS6BDzbRvkXcG5B__1XGPQWWLfKCWtjxWqdP1K2Ixhuev7n=s0)

When configuring this workflow step, you’ll need to provide the subscription type that the user will be canceling.

Note: If the CollectionPath is not provided, subscriptions will be deleted from all collections.<br>

![](https://lh6.googleusercontent.com/U27XNWeWivGzNzPBArozQSiMMkEe19XGyDDDxGnN4fsYzNsNvThjIsnhm6mQbh8uQNvLueqXvHcPr8KF75zpI4rtEjWBG6TGmG-1NGBWCK1AO8SHXsrxnaV5B6-icmAylJ9e5FQJ=s0)

Next, you’ll need to verify what subscription ID you’ll be deleting. If you’ve stored the current user’s subscription ID within your database, you can reference this here.

![](https://lh6.googleusercontent.com/6iTARb8n1uitbtCuf6gPSgfgcp9iqzOG3cqHfHK8n3BsXxf44bY1Se9niUZFBkYxPgYULjCeyszKyO96bTjXBzQELvF4j39-Of12MpSaPt6WGhHWCdXU0qI_YZuhPkVujX6zZfLU=s0)

## **FAQ**

(Have a suggested FAQ to help other Bubblers? Please visit our [Support center](https://bubble.io/support) to get in touch with a member of our Support team!)
