# Best Practice Privacy Structure for Multi-Tenant SAAS
> Source: https://forum.bubble.io/t/best-practice-privacy-structure-for-multi-tenant-saas/67757 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 17 posts · topic: multi-tenant

## Original post (by @zachwhitt)

I’m need a little help here for some best practices setting up a multi-tenant style app with data needing to be segregated by Company, each Company having multiple Users and datas.

Background

- My app is currently set up using the Sub Apps structure

- My company is using the application, another company has just begun, and a third is (hopefully!) starting soon

- I’m finding out that cost is a major downside to the sub apps model, so I want to move this to a multi-tenant model with all Companies sharing a single set of databases.

Assumptions

- Every tenant is tied to a unique Company record

- Every piece of data has a single Company ID

- Every User has a Company and every Privacy Role is set up to limit data access to Current User is logged in and DATATYPE’s Company is Current User’s Company

Questions

- 

Is my third assumption above sufficient to limit access?

- 

does the privacy model need to be “duplicated” in every Search and workflow in the application?

- For instance: if a tenant wants to view all of their Records, does the Search need a Company is Current User’s Company constraint OR does the privacy role already established handle this need?

- Is this the correct way to set up privacy roles for a SAAS application at all? Or is there a best-practice I’m missing?

Thanks!

## Reply by @tony2 (7 likes)

Has anyone found a good template or tutorial on setting up this type of system in Bubble?

## Reply by @StevenM (3 likes)

Hi @zachwhitt

You are on the right track, but I would also use an “account” qualifier linked to the user and the company. So create a new table call it Account and for each new account generate an account number or create one manually, add in this account table the company (you can link to your exist company table if you have one) and any other details you need about the account add in the account table. I also would add list of administrators if you have any.

When anyone logs in they must belong to the account and then instead of using company use account in the query.

Use privacy settings but you need to get used to adding “account” to all your data queries.

We have a very large app and lots private data and works very well.

You can keep company as a data qualifier too but you may find this becomes restrictive.

You would also need to link the account table with you user table so create a new field in the user table and add the Account. So when you create the user also add the account number for the company. You may find you need to add account number to other tables by linking to the account table as I described the user table above.

## Reply by @eli (2 likes)

Hi @StevenM,

I’m finishing up a multi tenant app that has grown enormously complicated. Company A being able to see some of Company B’s data but none of Company B’s data that belongs to Company C. All while Company B maintains the ability to restrict what Company A can see and whether Company C can see anything at all.

Anyway, I’ve structured everything around the Company data type also being the Account data type so I’m obviously super interested in this statement:

[image] StevenM:

> 

You can keep company as a data qualifier too but you may find this becomes restrictive.

Can you expound on that a bit more? Why is having a separate Account data type in addition to a Company data type less restrictive?

Thanks for your thoughts.

Eli

## Reply by @gnelson (2 likes)

I’m still not understanding the difference between account and company. Wouldn’t both be query parameters?

## Reply by @zachwhitt (2 likes)

Interesting! @jagdish_bajaj

I’ve essentially moved everything in my app to Searches vs Lists based on a few concerns over lists speed. This is one area where I think we seriously need better documentation from Bubble. How does each query method actually work? When should one be used vs another? How is speed impacted?
