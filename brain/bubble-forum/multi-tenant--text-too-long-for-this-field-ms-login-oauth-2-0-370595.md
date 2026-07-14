# Text too long for this field (MS Login - oAuth 2.0)
> Source: https://forum.bubble.io/t/text-too-long-for-this-field-ms-login-oauth-2-0/370595 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 22 posts · topic: multi-tenant

## Original post (by @apitterman)

I’m having an error when a ms user is admin to azure ad directory and try to login via ms in my bubble app.  But if the ms user is not admin then there is no problem with the ms login. Btw I use API connector OAuth2 User-Agent-Flow

## Reply by @lindsay_knowcode (2 likes)

haha [image] @kelly1

@klobassimon is the colleague I was mentioning. He is an expert guy.

## Reply by @FabianEngel (2 likes)

I found the following workaround which works for us as it is not impacted by the 2,700 character limit of bubble’s OAuth2 User Agent Flow:[image] (https://www.youtube.com/watch?v=wabF3NAgWnA)

## Reply by @klobassimon (1 likes)

I am experiencing the same issue - and it has just recently started to occur.

## Reply by @apitterman (1 likes)

When an Azure AD admin account authenticates, it often pulls additional claims—especially if the account is assigned to multiple groups or roles—resulting in a larger token or user profile response. Because Bubble may automatically save or parse this response, a “text too long” error can appear for admin accounts but not for “normal” user accounts.

I’m not sure if this is entirely correct—it’s just a thought.
