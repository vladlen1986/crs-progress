# [Community Project] - MCP Server for Bubble Apps - Available Now
> Source: https://forum.bubble.io/t/community-project-mcp-server-for-bubble-apps-available-now/377541 · Captured: 2026-07-14 · COMMUNITY THREAD (not official docs — verify against brain/bubble/ manual)
> 10 posts · topic: privacy-rules

## Original post (by @NoCodeROI_Agency)

Hi Bubble community!

I want to share a completed project that some of you might find useful. It’s an MCP (Model Context Protocol) server that enables AI assistants like Claude to interact with Bubble applications through the official Data API.
What this does

This tool allows you to have natural language conversations with AI about your Bubble app’s data structure and perform basic operations. It’s particularly useful for:

- App analysis: Quickly understanding data relationships in complex apps

- Documentation: Auto-generating data structure summaries

- Migration planning: When moving data to external databases

- Quick queries: Checking data without opening the editor

Important notes

- Uses official Bubble Data API only - no unofficial methods

- Respects all Bubble privacy rules and API rate limits

- Read-only mode recommended for safety

- Requires Data API subscription (Personal plan or higher)

- This is community software - please test thoroughly before production use

Example interactions

```
"List all data types in this app"
"Show me the fields in the User data type"
"How many records are in the Project table?"
"What workflows are available?"

```

Technical requirements

- Node.js installed locally

- Bubble app with Data API enabled

- Claude Desktop (free tier works)

- API token from your Bubble app

Why I built this

As an agency who frequently reviews Bubble apps for clients, we were spending a lot of time manually exploring data structures. This tool solves that problem by letting us ask questions in plain English instead of clicking through tabs. It’s been working well in our workflows and we thought others might benefit from it.
Code availability

The project is open source and available now on GitHub. I’ve made it public so the community can:

- Review the code for security

- Suggest improvements

- Contribute features

- Fork for their own needs

GitHub: 
 (https://youtu.be/Zplpp1WeZpE)

- 
- 
- 
- 
- 

- 
- 
- 
- 

- 
- 
- 
-

## Reply by @boston85719 (6 likes)

This is awesome. Deserve Community Champion Award on this one. It is not just free, but available to fork for our own use. This is great for agencies as they can have their own internal tool to promote themselves to assist their potential and existing clients with a quick scan tool. [image]

[image] nznvlogs:

> 

one of the time consuming aspects of Bubble IO is that building an interface can take a long time

Bubble just announced a second way to import to Bubble from Figma. I have not tried it out, but apparently it is great and was a better way to get that functionality than bubble fixing the original figma import feature.

[image] NoCodeROI_Agency:

> 

Hopefully we’ll hear more from the Bubble team about potential progress on official API capabilities for interface manipulation in the future!

Are there internal discussions on this being a real possibility? If so, that would undermine the whole Bubble value proposition of the ‘editor’ as giving away access to interface manipulation is just one tiny step toward the entire editor being an API that we can all then just build our own editor interfaces.

## Reply by @ZubairLK (2 likes)

Hey.

Just wanted to say thank-you very much for making this MCP server.

It helped us a lot in migrating a lot of data over from a bubble app to a coded app.

We connected Claude to this & supabase & that helped generate

I plan on making a youtube video about this as well. Hope that is ok.

Thanks

Zubair[image] (https://www.azkytech.com/) (https://www.azkytech.com/)

## Reply by @georgecollier (1 likes)

[image] NoCodeROI_Agency:

> 

Respects all Bubble privacy rules

How does it do this?

## Reply by @randomanon (1 likes)

[image] NoCodeROI_Agency:

> 

API token from your Bubble app

[image] NoCodeROI_Agency:

> 

Respects all Bubble privacy rules

[image]
Screenshot 2025-08-03 0500381059×618 72 KB

## Reply by @NoCodeROI_Agency (1 likes)

You’re absolutely right that UI/interface editing would be incredibly valuable. Currently, this tool is limited to what Bubble’s existing APIs support, which focuses on data operations rather than visual interface elements.

Hopefully we’ll hear more from the Bubble team about potential progress on official API capabilities for interface manipulation in the future! [image]

For now, I’m working within the current API framework, but I’d definitely be excited to expand into UI features if/when those capabilities become available.
