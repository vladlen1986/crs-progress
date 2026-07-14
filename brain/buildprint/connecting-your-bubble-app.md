# Connecting your Bubble app
> Source: https://docs.buildprint.ai/connecting-your-bubble-app-vaky4 · Captured: 2026-07-14 (verbatim .md)

Connect your Bubble app to Buildprint so Buildprint can sync your app, check permissions, and prepare the project for agents.

## Before you start

You will need:

- Access to the Bubble app you want to connect
- Permission to invite collaborators in Bubble
- Your Bubble app ID
- Access to either the app's SEO settings or API settings

Your Bubble app ID is usually the subdomain in your Bubble app URL. For example, if your app is at `https://myapp.bubbleapps.io`, the app ID is `myapp`.

If your app uses a custom domain, use the Bubble app ID instead of the custom domain.

## Add your app details

![Image](https://static.ferndesk.com/user-images/file_01KSAQ5B1K2WV28TJP46P1FAB4.jpg)

Start by telling Buildprint which Bubble app you want to connect.

1. Enter a name for the app.
2. Enter the Bubble App ID.
3. Choose whether the app is on a dedicated server.
4. Click **Continue**.

The app name is only for display inside Buildprint. The Bubble App ID is what Buildprint uses to find the correct Bubble app.

## Invite Buildprint

![Image](https://static.ferndesk.com/user-images/file_01KSAQ5K1P3JC31V8PH9VF0ZS4.jpg)

Next, add Buildprint as a collaborator in Bubble.

1. Open your app in Bubble.
2. Go to your app's collaborator settings.
3. Invite `connect@getbuildprints.com`.
4. Grant the required App, Data, Logs, and Versions access.
5. Return to Buildprint.
6. Click **Check again** or **Verify**.

When the connection is ready, Buildprint shows a confirmation message and lists the current access it found.

Review the access notice, then click **Continue**.

## Verify ownership

Buildprint needs to confirm that you own the Bubble app before setup can continue. You can verify ownership with a metatag or an Admin API token.

You only need to use one method.

### Option A: Use a metatag

![Image](https://static.ferndesk.com/user-images/file_01KSAQ5TQSP5H4MD6F70T9H0EP.jpg)

Use this option if you can edit your app's SEO header settings.

1. In Buildprint, select Metatag.
2. Copy the verification tag.
3. In Bubble, go to Settings -> SEO -> Script/meta tags in header.
4. Paste the tag into the header field for the test version, not live.
5. Return to Buildprint.
6. Click **Verify ownership**.

After ownership has been verified, you can remove the metatag from Bubble.

### Option B: Use an Admin API token

![Image](https://static.ferndesk.com/user-images/file_01KSAQ6PZFPFJ2Q5KN4XJTWNYX.jpg)

Use this option if you prefer to verify through Bubble's API settings.

1. In Buildprint, select Admin API token.
2. In Bubble, go to Settings -> API.
3. Create or find an Admin API token for this app.
4. Paste the token into Buildprint.
5. Click **Verify ownership**.

Buildprint only uses this token for verification. It is not stored.

## Enable observability

![Image](https://static.ferndesk.com/user-images/file_01KSAQ73GPDT4SHQFXTHP7GF2P.jpg)

Buildprint may offer advanced observability for logs and traces during setup.

If observability is available, follow the prompts to enable it. If capacity is limited, you can join the waitlist.

Choose one of these options:

- Click **Join waitlist** to save your place for advanced observability.
- Click **Skip** to finish setup without joining the waitlist.

You can continue setting up and using Buildprint either way.

## Troubleshooting

### Collaborator not found

Confirm the Bubble app ID is correct and that `connect@getbuildprints.com` was invited to the same Bubble app.

### Permission check fails

Grant the needed App, Data, Logs, or Versions access in Bubble, then check again in Buildprint.

### Plan check fails

Make sure the Bubble app supports app export.

### Metatag verification fails

Paste the tag into the test version header field in Bubble, then try verification again.

### Admin API token verification fails

Check that the token is current and belongs to the same Bubble app.
