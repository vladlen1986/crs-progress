# Privacy & Login order of operation
> Source: https://forum.bubble.io/t/privacy-login-order-of-operation/217198 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 3 posts · topic: privacy-rules

## Original post (by @jgellis)

Q. When do privacy rules become valid during login? Please read on…

Data Model

User (Organization is a field in the User thing, and reference is valid)

Organization → Exp. Date (expiry date of account, data type Date)

Use Case

1. Custom login form. Uses “Login the User” in workflow using inputs from login form.

Login successful (conditional “Current user is logged in verifies this”)

2. Next workflow element >> conditional  "Current User’s → Organization’s Exp.Date  >  Current Date. (Fails see below behaviour).

Privacy Rule

(A) Current User’s → Organization is This Organization (Exp. Date allowed - checked)

(B) All other users: Exp. Date now allowed

Behaviour

#2 fails since Organization’s Exp.Date is empty not returned

Note 1.: only during initial login workflow)

Note2.: Fields that are defined in Privacy rules under Everyone else are returned

BUT

If F5-refresh (user still logged in) #2 passes and Privacy rule allows Exp.Date to be returned.

If Privacy rule change to "All other users: Exp.Date allowed (checked) – #2 passes.

Conclusion

Privacy rule (A) is not being evaluated when “Log in user” first executed even though the user is logged in? Note: A very complex app with a moderate number of workflow elments (should not effect this??)

Anyone have a solution?

John

## Reply by @GH5T (0 likes)

[image] jgellis:

> 

- Next workflow element >> conditional "Current User’s → Organization’s Exp.Date > Current Date. (Fails see below behaviour).

Just find a way to get the users current unique ID, then "Do a Search For: Users (unique id = “some unique id”).

That will get you your field. If they are allowed to get that field via privacy.

Now, another way would be to do this via backend workflow, so then you will only return what is necessary. No privacy rules necessary (how I do most of my operations, as all my important data is always fully private and can only be called via API).

## Reply by @jgellis (0 likes)

Hi, thank you very much for the reply. I did try the method you offered however it did not solve the problem.

BUT it did give me some insight. What I found is: The user logs in on page A, then navigates to page B. If the user logs out on page B and then gets imeadiately redirected back to page A without the browser session being terminated the Privacy does not work and the field is not retured. But, if the user logs out on page A or the session is terminated (browser closed) - the workflow always works. So it seems the issue is with the session variable being stored by the broswer must be page dependant, which is not normal behaviour.

Monitoring session variables the variable parameters contain the ‘unique id’ of the user while logged in, and change to a psuedo random string when logged out. They are not destroyed - possibliy because I have “keep logged in” checked. I did not test the result if this is not checked. Since the session variable is secure I could not look inside, or at least I do not have the time to do a deep dive memory hack to view the hex and reverse engineer the content. So I admit this is a theory and not a fact.

To simply get around this I moved all the log-out workflow back to page A. So the user chooses to log out on B but the application loads page A then performs the log out. This solved the issue and now the Privacy rule involved works 100% of the time.

I hope Bubble is monitoring this post since I suspect they may be intrested in this behaviour and may be able to offer more insight. For us, the problem is solved and we are moving on.

Thank you again for your reply, it was very kind of you to help.

John

FYI: I am the potientially the worlds worst speller, so if there are spelling mistakes sorry. I don’t have time to spell check this. [image]

## Reply by @system (0 likes)

This topic was automatically closed after 14 days. New replies are no longer allowed.
