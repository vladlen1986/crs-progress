# Challenges in migrating to postgres
> Source: https://forum.bubble.io/t/challenges-in-migrating-to-postgres/395293 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 4 posts · topic: migrations

## Original post (by @tech16)

Hi,

I am planning to replicate my db in bubble in postgres. Has anyone done this before?

What are the challenges you have faced?

What should I be aware of?

## Reply by @arslannawaz03 (0 likes)

Yes @tech16 , done this before  and here are the key things to know:

Getting data out of Bubble:

No direct SQL export exists. Use CSV export per data type or the Bubble Data API (paginated JSON). For large datasets, the API is more reliable. You’ll need to reconstruct foreign keys manually since Bubble’s internal IDs aren’t standard UUIDs.

Schema mapping gotchas:

- Bubble list fields need to become junction tables or JSONB columns in Postgres.

- Option Sets need to become lookup tables or Postgres ENUMs.

- File attachments live on Bubble’s CDN and don’t migrate with the data, handle separately.

- Bubble treats empty strings as `""` not `NULL` , normalise this in your schema.

- Always normalise timestamps to UTC; Bubble exports them inconsistently.

If running Bubble + Postgres side by side:

Dual-write via backend workflows works but gets messy fast. Plan a hard cutover date rather than running both indefinitely.

Connecting Postgres back to Bubble:

Bubble can’t query Postgres directly, you’ll need a REST API layer (Xano, Supabase, or custom). Every DB call becomes an API call, so expect added latency vs. native Bubble DB. Also, Bubble’s privacy rules won’t apply, you’ll need Postgres row-level security (RLS) instead.

Recommended stack: Supabase, managed Postgres, built-in REST API, plays well with Bubble’s API connector, and has good migration tooling.

Happy to go deeper on any part!

## Reply by @Zeroic (0 likes)

This is something that we’re doing these days for existing applications that are migrating off Bubble. A few points that might be helpful for you:

  

    

    [image]
    

      Supabase as Backend (https://forum.bubble.io/t/supabase-as-backend/386305/2) Need help
    
  
  
> 
    My team and I use Supabase across a few Bubble applications, where WU usage and performance (mostly due to groupings/joins, or a non-normalised DB) become a major issue. 
A few thoughts: 

No need to fetch data using the API connector (unless, ofc, it’s needed to be that way). If RLS is set up correctly, fetching client-side is simpler and cheaper (no WUs for data fetching). For this, I’ve built this plugin that uses their JS SDK 

Never fetch full tables - always paginate 
Use limit + offset …
  

Challenges-wise (just writing what comes to mind):

- Auth: Like any other platform, while migrating user auth, you’ll need to pick one: forced password reset at cutover, magic-link re-onboarding, or dual-write during a transition window.

- Option Sets: Rebuild them as enums, or denormalised text, depending on whether you need non-devs to add items later (what @arslannawaz03 said)

- Linked fields and list fields: Generally slows down things on older tables that were modelled loosely.

- Privacy rules → RLS: Every privacy rule has to be rewritten as a Row Level Security policy along with column privileges. Very imp.

- Unique IDs: If any external system, webhook, or integration references Bubble’s unique_id, preserve it as a column on the new table during migration. Retrofitting it later is painful.

- Files (as mentioned above ^).

## Reply by @letsbuildmyapp (0 likes)

I’ve done this migration. A few things to be aware of:

- Option Sets — these don’t migrate cleanly. You’ll need to recreate the relationships manually.

- List fields — Bubble’s native list fields behave differently in Postgres. Worth auditing all of them before you start.

- Privacy rules — double-check these after migration since data exposure bugs can creep in.

- Workflows that reference data types — some break silently after migration, so run through your critical workflows in the debugger after.

The biggest thing I’d say is: don’t migrate everything at once. Pick one data type, migrate it, test it thoroughly, then move on to the next.

What’s your main reason for migrating — performance, cost, or something else? That might change what to prioritize.

## Reply by @system (0 likes)

This topic was automatically closed after 70 days. New replies are no longer allowed.
