# Roles & Permissions — User Manual

> **Who this is for:** anyone using the Roles & Permissions page in CRS to manage what people in their casino can do.
> **What it covers:** what roles and permissions are, how to create and manage them, and why some things may be locked for you.
> **Last updated:** 2026-06-07

---

## What this page is for

Every person who uses CRS is given a **role** — like "Surveillance Operator" or "Shift Manager." A role is simply a bundle of **permissions** — the specific things that person is allowed to do (view reports, create reports, close a fiscal week, and so on).

The Roles & Permissions page is where you:
- Create new roles
- Choose exactly what each role can do
- Rename or delete roles you no longer need

Instead of setting permissions for each person one by one, you set them once on a role, and everyone with that role gets those permissions automatically.

---

## The three levels of access

Not everyone can do everything on this page. There are three levels:

**1. Owner (Super Admin)**
The app owner. Has full control over everything, including the most sensitive settings. There is only ever one owner, and this role can't be given to anyone else.

**2. Administrator**
Can manage roles for their own casino — create roles, rename them, and turn most permissions on or off. Some especially sensitive permissions are reserved for the owner and will appear locked.

**3. Everyone else**
Uses the app with whatever their role allows. If someone doesn't have permission to view this page, they'll see an "Access Restricted" screen instead.

You'll only see and manage roles belonging to **your own casino** — never another casino's.

---

## The page at a glance

- **Left side — the role list.** All the roles in your casino. Click one to see and edit its details. The "+ New Role" button is here.
- **Right side — role details.** The selected role's name, and below it, all its permissions grouped by area (Reporting, Tasks, and so on).
- On a phone, the role list becomes a **dropdown at the top** — pick a role there, and its details appear below.

Some roles show a small **lock icon** and the word "system." These are built-in roles that can't be renamed or deleted (though the owner can still adjust them).

---

## How to do common tasks

### Create a new role
1. Click **+ New Role**.
2. Give it a name (e.g. "Night Shift Supervisor").
3. Turn on the permissions it should have (see below).
4. Click **Save Changes**.

### Change what a role can do
1. Click the role in the list (or pick it from the dropdown on mobile).
2. In the permissions area, check or uncheck permissions. Use the group headers to expand each area.
3. Use **All** or **None** on a group to quickly turn everything in that group on or off.
4. Click **Save Changes**. (Nothing is saved until you do — you can **Discard** to undo unsaved changes.)

### Rename a role
1. Select the role.
2. Edit the **Role name** field.
3. Click **Save Changes**.
(System/default roles can't be renamed unless you're the owner.)

### Delete a role
1. Select the role.
2. Click **Delete Role** and confirm.
3. Anyone who had that role is automatically moved to your casino's default role, so no one is left without access.
(System roles and the owner role can't be deleted.)

---

## Understanding permissions

Permissions are grouped by area. The main groups:

- **Reporting** — everything to do with surveillance reports: creating, viewing, editing, submitting, verifying, closing, and viewing reports at different stages.
- **Tasks** — creating and managing tasks and task comments.
- **Menu Items** — which sections of the app's menu a person can see.
- **Admin / Core** — managing roles and users (these are powerful — see "Locked permissions" below).
- **Customer** — viewing customer information.
- **Employee** — editing employee records.
- **General** — closing a fiscal week, and viewing "What's New" updates.

Each permission's name tells you what it does, in the form **Area – Action (Scope)**. For example:
- *Report – Create* → can create reports.
- *Report – Edit (Own)* → can edit reports they created.
- *Report – Edit (Created by Others)* → can edit reports made by other people.
- *Report – View (Submitted Status)* → can see reports that are in "Submitted" status.

"Own" means only their own items; "Created by Others" means other people's items. Give the wider scopes only to senior roles.

---

## Locked permissions (why some checkboxes won't budge)

Some permissions control the security of the whole system — like the ability to manage roles and permissions themselves. These are **reserved for the owner**.

If you're an administrator (not the owner), these permissions will appear with a **lock icon**:
- You can **see** whether the role currently has them.
- You **can't change** them.
- If you try to change one and save, you'll get an "Access Denied" message — this is intentional. Ask the owner if a role genuinely needs one of these.

This protects the system: it means no administrator can give themselves or others control over the permission system without the owner's involvement.

---

## "Access Restricted" — what it means

If you open this page and see a full-screen **Access Restricted** message instead of the role list, it means your role doesn't include permission to view Roles & Permissions. This is normal if you're not an administrator. Contact your administrator or the owner if you believe you need access.

---

## Tips

- **Changes aren't live until you click Save.** Make all your edits, then save once. Use Discard to throw away unsaved changes.
- **Use roles, not exceptions.** If several people need the same access, give them the same role rather than creating one-off roles for each person.
- **Be careful with wide-scope permissions** (anything marked "Created by Others," "Delete," or "All"). Give them only to senior roles.
- **Deleting a role is safe for people** — anyone affected is moved to the default role automatically — but it can't be undone, so be sure.

---

*Questions about a specific permission or how to set up a role for your team? Contact your CRS administrator.*
