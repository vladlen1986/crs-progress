# Users on web and mobile
> Source: https://manual.bubble.io/help-guides/data/user-accounts/users-on-web-and-mobile · Captured: 2026-08-04 (verbatim from manual.bubble.io llms-full.txt)

Users on web and mobile are the same users. Bubble apps use a single database across both platforms, which means a user who signs up on the web can log in on mobile with the same credentials, and vice versa. There's no separate mobile user account, no linking step, and no data duplication to manage.

This has a few practical implications:

* **One account per user.** Whether a user first signs up on web or mobile, they end up in the same *User* data type in your database. Any workflow that references *Current User* works the same way across both platforms.
* **Shared privacy rules.** Privacy rules apply to users regardless of how they access the app. A rule that grants access based on the user's role, subscription status, or ownership behaves consistently on web and mobile.
* **Consistent workflows.** Signup, login, and password reset actions work the same way on both platforms. You can build these flows once and reuse them, or build platform-specific versions when the user experience calls for it.
* **Cross-platform sessions.** A user logged in on the web isn't automatically logged in on mobile, and vice versa. Sessions are handled per device, but the underlying account is the same.

## Signing up and logging in users

Signing up and logging in users works the same way across native mobile and web apps within the same project. You can use the same actions to sign up or log in a user, whether they're accessing your app through the web or through an app installed on their device.

## Using the *Signup/login with a web browser* action

This action, unique to native mobile apps, lets you use an existing page from your web app to sign up a new user or log in an existing one. Instead of building separate signup and login flows for your web and mobile apps, you can reuse the same web page for both, keeping the authentication experience consistent across platforms.

When this action runs, the user is directed to the specified web page, which opens in an in-app browser view. Once authentication completes, the user is returned to the mobile app and logged in. The flow supports email and password login, OAuth logins with providers like Google or Apple, and two-factor authentication.

This approach is useful when you already have a polished web-based signup or login flow and want to avoid duplicating that work in your mobile app. It also simplifies maintenance, since updates to the authentication page apply automatically to both platforms.

<figure><img src="/files/Z74IMB24hVwfQ47TJ1S6" alt=""><figcaption></figcaption></figure>
