# WU guardrails — Bubble workload-unit rules (VERBATIM EXTRACTION)

> **Do not edit rules here.** This file is a Task-1 extraction for the prompt engine:
> every rule below is copied **byte-for-byte** from its canonical source, cited above the
> quote. To change a rule, change the source, then re-extract. Injected verbatim into
> every bundle by `brain/engine/assemble.js`. Extraction date: 2026-07-18. Zero rules
> authored here. Sources are third-party expert guidance (Amlie, *Ultimate Guide to
> Bubble Performance*, mirrored in `brain/bubble-performance/`) — per
> `brain/bubble-performance/INDEX.md`, the official manual (`brain/bubble/`) wins on
> facts/limits where they conflict.

## 1. Server-side constraints (constraints beat filters)

Source: `brain/bubble-performance/04-building-the-database.md` §Setting up efficient searches:

> More constraints is better Bubble searches work by excluding records that do not match a certain condition. In other words, the more conditions you provide, the faster Bubble can rule out records and shorten down the list of potential candidates.

Source: `brain/bubble-performance/04-building-the-database.md` §Downloading and filtering:

> Downloading and filtering When you perform a search, all conditions you place on that search are applied on the server, andthen the information is sent to the browser. This means that conditions are safer (regardless of privacy rules) than filters, and you stop Bubble from downloading more information than it has to. As we saw in the earlier section, download size can quickly grow when we reach a high number of records.

*(The "andthen" run-on is in the source mirror; preserved byte-for-byte.)*

## 2. Load-once client filter (when client-side filtering is allowed)

Source: `brain/bubble-performance/03-building-the-page.md` §client-side filtering:

> It’s common advice to never use client-side filtering, as it will slow down your app. This is only true to some extent. Depending on how you use it, client side filtering can be a lot faster than performing another server-side search, since the data never has to leave the local device. Done right, it’s lightning fast. Done wrong, it’s slow and insecure.

> Client-side filtering is great for: ●Filtering lists of data containing no more than a few hundred items at most ●Simple filters: the more complexity you add, the slower it becomes ●Non-sensitive data

> Avoid client-side filtering for: ●Large data sets ●Sensitive data: since the full list of data is sent to your browser before the filters are applied, the data is not secure ●Complex filtering: leave the heavy lifting to the server

## 3. `:count` behavior (server-side; beware list-based counts)

*(Extraction note: there is no single canonical sentence "never `:count` a large set" —
the guidance is distributed across the three passages below. Flagged, not invented.)*

Source: `brain/bubble-performance/02-knowing-the-platform.md` §operator table:

> Do a Search for:count Server-side (returning number)

Source: `brain/bubble-performance/03-building-the-page.md`:

> (Note that the illustration above does not cover all scenarios. If you add a :count to the end of a search for example, the actual counting is happening server-side)

Source: `brain/bubble-performance/04-building-the-database.md` §Maintenance (lists vs searches):

> Maintenance A list will always contain the records you save on it, and will never automatically update their content. If the list needs an update, you will have to do that yourself through a workflow. The exception is deleted records, but keep in mind that they may sometimes simply leave an empty record in the list, leading to errors in :count results.

Source: `brain/bubble-performance/04-building-the-database.md` §lists:

> For a search of this size, the browser will at best become sluggish, and at worst it may crash the current tab. For this reason, lists are best suited for a low number of records and may not be your best choice when the number of entries exceeds 100.

## 4. Derived / denormalized fields

*(Extraction note: `brain/bubble-performance/` has no rule literally named "derived
fields" — the closest canonical, CRS-specific ruling is the locked decisions.md text
below, plus the as-built example. Flagged, not invented.)*

Source: `decisions.md` §2026-07-16 "User DT is a Pattern A exception" (Scope paragraph — the rule for every OTHER business DT):

> **Scope:** This exception is **User-specific.** It does NOT generalize to other
> business DTs — they still carry both fields and check both per Pattern A, because
> they need company-level scoping and denormalized company for search/WU, and their
> `property` may be null on legacy rows.

Source: `brain/database.md` §Report DT WU optimization (as-built example of the pattern):

> denormalized `gaming_date`+`fiscal_week`, `event_section`+`event_location`
