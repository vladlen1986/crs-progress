# Bubble security
> Source: `buildprint guidelines get security/bubble` · Captured: 2026-07-17 (verbatim)

These guidelines summarize Bubble security practices and key concepts from the Bubble Security Course outline.
Use them to evaluate risk, configure secure defaults, and avoid common client-side exposure mistakes.

## Privacy rules

- Privacy rules are the only mechanism that restricts data from being read.
- Rules are server-side. If a rule blocks access, the data never leaves the server.
- Page access, element visibility, and conditionals are client-side and can be bypassed.
- Rules are additive: if multiple rules match, the user gets the union of permissions.
- The Everyone else rule should typically grant no access.
- Set privacy rules immediately when creating data types, not at the end of a project.
- Searches in workflows respect privacy rules; backend workflows can ignore them if configured.
- Test rules by impersonating multiple roles and by using a test page with unconstrained searches.

## What Bubble sends to the browser

- Assume all app structure is public: data type names, field names, relationships, and page names.
- Option sets are fully loaded client-side; do not store sensitive values there.
- App texts are client-side; do not store secrets in app texts.
- API Connector call structure is visible; only values marked as Private are protected.
- Backend workflow names and parameters are discoverable; only the server-side actions are hidden.
- The meta endpoint (/api/1.1/meta) exposes public data types and backend workflow endpoints.

## API Connector security

- Mark all sensitive parameters as Private (API keys, secrets, tokens).
- Prefer Private key in header authentication when possible.
- Never store secrets in option sets, app texts, custom states, URL params, or workflow names.
- Treat all user-provided parameters as untrusted; validate and authorize server-side.
- Avoid real data in initialization calls; remove test values before production.
- Use the least privilege principle: send only what the API actually needs.

## Element and page security

- Hiding elements is not security; Bubble loads all elements on page load.
- Protect sensitive workflows with Only when conditions on the workflow itself.
- Prefer server-side redirects for protected pages and test that they do not flash.
- Use defense in depth: privacy rules + workflow conditions + page access controls.

## Client vs server and workflow security

- Frontend workflows run on Bubble's servers, but inputs come from the client and can be manipulated.
- Client-side data includes: input values, custom states, URL params, group data sources.
- Server-side data includes: database queries and privacy rule enforcement.
- Do not trust client-provided identifiers; re-fetch and verify authorization server-side.
- Authentication (logged in) is not authorization (allowed to do this action).

## Backend workflows

- Public API workflows are a common attack surface; secure them carefully.
- None required is only for truly public flows (signup, password reset request).
- User and admin requires additional authorization checks inside the workflow.
- Admin only is preferred for sensitive operations and integrations.
- For internal-only workflows, disable Expose as public API workflow.
- For webhooks, use a secret key parameter and terminate if it does not match.

## Bubble Security Course (summary)

### Course outline summary

1. Shared Security Model - Who is responsible for what
2. Privacy Rules - The only thing that restricts data
3. Client Exposure - What Bubble sends to the browser
4. API Connector - Protecting API keys and calls
5. Element and Page Security - Why hiding is not securing
6. Client vs Server and Workflow Security - AuthN, AuthZ, input manipulation
7. Backend Workflows - API security and tokens
8. Security Dashboard - Testing and monitoring

### Module 1: The Shared Security Model

- Bubble is a PaaS with shared responsibility across AWS, Bubble, and you.
- AWS handles infrastructure, physical security, and networking.
- Bubble handles encryption, auth system, DDoS protection, uptime, backups, and compliance.
- You handle privacy rules, page access, API keys, roles, permissions, and testing.
- Security is about correct configuration, not just protection from attackers.

### Module 2: Privacy Rules

- Privacy rules are the only true protection for data reads.
- Rules grant access and are additive; Everyone else should be minimal.
- Configure rules when creating data types; do not postpone.
- Workflow searches respect rules; backend workflows can bypass if configured.
- Test as multiple roles and use the Security Dashboard and test pages.

### Module 3: What Bubble Exposes to the Client

- App structure is public; only data values can be protected by privacy rules.
- Option sets and app texts are always client-side and cannot be protected.
- API Connector structure is visible; private parameters protect values.
- Page names and backend workflow names are discoverable.

### Module 4: API Connector Security

- Mark secrets as Private and prefer Private key in header auth.
- Do not store keys in option sets, app texts, states, or URLs.
- Treat client inputs as untrusted; verify server-side.
- Use Action calls for sensitive operations when appropriate.

### Module 5: Element Visibility and Page Security

- Hidden elements are still loaded and can be surfaced by users.
- Put access checks on workflows, not just UI visibility.
- Use server-side redirects for protected pages and test them.

### Module 6: Client vs Server and Workflow Security

- Workflow actions are safe; workflow inputs are not.
- Client parameters can be manipulated; authorize based on server-side data.
- Always enforce authorization for the specific action and record.

### Module 7: Backend Workflow Security

- Authentication is not authorization; add checks for User and admin workflows.
- Use Admin only for sensitive operations and integrations.
- Disable public exposure for internal-only workflows.
- Add secret tokens for webhook endpoints and terminate on mismatch.

### Module 8: Security Dashboard

- Use it to identify potential issues, not as a guarantee.
- Run the Privacy Rules Checker before deploying.
- Combine automated findings with manual testing across roles.
