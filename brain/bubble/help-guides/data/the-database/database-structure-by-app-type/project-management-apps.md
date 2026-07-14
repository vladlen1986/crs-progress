# Project Management Apps
> Source: https://manual.bubble.io/help-guides/data/the-database/database-structure-by-app-type/project-management-apps · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

*By Airdev, creators of the Canvas building framework*

{% hint style="info" %}
*Various members of the Bubble ecosystem contributed these use case-oriented database guides. There's always more than one way to do something in Bubble, but the advice here can help you get started if you're new to Bubble!*
{% endhint %}

Project management applications help teams coordinate their efforts to get more done together. The classic setup involves breaking projects into individual tasks, each of which has an owner and deadline. Team members can update and track task statuses as they work toward completing everything on time. More complex setups can involve goals, milestones, subtasks, and other more sophisticated structures. The category has proven to be a natural fit for a web application, since multiple team members need to access and update the same information. Popular examples include Asana, Monday, JIRA, Trello, Wrike, and ClickUp.

Though the content below focuses on the data structure that supports the application under the hood, the user experience for a project management app is generally meant to be less linear (e.g., like an ecommerce website) and more free-flowing as users toggle between projects and tasks to collaborate and get things done. The app may include some of the following pages:

* A homepage and supporting marketing pages to entice and inform potential users
* A login page where users can enter credentials to access their portal
* A personal dashboard, where users can manage their profile, teams, and get an overview of the tasks they are assigned (i.e., their to-do list)
* A team workspace, where users can manage a team’s settings, members, and projects
* A project board, where users can manage the tasks under a project (usually as a list, board, or table)
* An account settings page, where users can update their credentials and technical settings
* An admin dashboard, where app owners can access key metrics, users, and other key data objects to manage their platform

## Data types recommended <a href="#h.8gkrwvp3rqds" id="h.8gkrwvp3rqds"></a>

The primary data object in a project management tool is the Task, which is something that needs to be done by someone (i.e., a User) by a deadline. In order to help Users find, organize, and complete tasks on time, project management tools typically organize them into distinct Projects, each of which has a set of Tasks. Projects can also exist within Teams, each of which has a set of member Users and Projects. Thus each User can see their own Teams, the Projects within them, and the Tasks within those.

### User <a href="#h.m4tvd4srqrfj" id="h.m4tvd4srqrfj"></a>

An individual team member who can login to access their projects and tasks.

#### Suggested fields on this type

* Email (text): the email address the user signs up with
* Name (text): alternatively, you can separate first and last into two fields, and have a third representing full name
* Profile picture (image): a nice mugshot to be displayed with their profile
* Role (Role, an option set): role within the application (member, admin)
* Teams (list of Teams): a list of teams the user is a part of (i.e., who’s projects they can access)

#### Suggested privacy rules on this type

* Users on the same team can access one another’s info
* Admins can access any user’s info
* Everyone else can’t find or access any user info (since each team is a closed system)

### Team <a href="#h.4yzr9inemsxf" id="h.4yzr9inemsxf"></a>

A group of individual users who work together on a set of projects and tasks.

#### Suggested fields on this type

* Name (text): each team can have a name (e.g., Dunder Mifflin)
* Owner (User): the team member who can edit the team, add/remove team members (this might start with the team’s creator, but the distinction could be transferred to someone else)
* \[Members (list of Users)]: this is optional since each User has a list of teams they are a part of – sometimes it’s helpful to [link both ways](https://manual.bubble.io/help-guides/structuring-an-application/data-structure#connecting-types) to simplify search expressions in the app, as long as you keep both directions in sync (try a database trigger for that)
* \[Projects (list of Projects)]: another optional linkage, since each project has a team

#### Suggested privacy rules on this type

* Users can access teams they belong to
* Admins can access any team’s info
* Everyone else can’t find or access any team info (since each team is a closed system)

### Project <a href="#h.lmrl4548gc40" id="h.lmrl4548gc40"></a>

A single initiative (represented by a collection of tasks) to be completed by a team.

#### Suggested fields on this type

* Name (text): each project can have a name (e.g., Public Launch)
* Team (Team): the team that is working on the project
* Owner (User): this might be helpful for tracking (i.e., where do Michael Scott’s projects stand?)
* \[Tasks (list of Tasks)]: this is an optional linkage, since each task has a project
* \[Completed tasks (number)]: sometimes it’s helpful to pre-calculate a count of tasks for the project to make it easier to download project data and display metrics without lots of search expressions
* \[Total tasks (number)]: see explanation above – completed / total allow you to calculate percent completed

#### Suggested privacy rules on this type

* Users can access projects within teams they are a part of
* Admins can access any project’s info
* Everyone else can’t find or access any project info (since each team is a closed system)

### Task <a href="#h.r830msjb20w4" id="h.r830msjb20w4"></a>

A single action item within a project, assigned to someone from the team, with a deadline and status that can be tracked to completion.

#### Suggested fields on this type

* Title (text): the high-level name of the task (e.g., “Purchase party hats”)
* Description (text): a long-form description of the work to be done
* Attachments (list of files): any images or files relevant to the task
* Assignee (User): the team member responsible for the task
* Deadline (date): when the task is due
* Status (Status, an option set): the current stage in the process the task is in
* Project (Project): the initiative the task is a part of
* \[Team (Team)]: this is an optional linkage because the task’s project will be associated with a team, but sometimes it’s easier to create the direct link to make privacy rules easier
* Watchers (list of Users): any team members who want to be notified of changes to the task (e.g., the assignee’s manager)
* Tags (list of Tags, an option set): any labels the task fits into (makes filtering tasks easier)

#### Suggested privacy rules on this type

* Users can access tasks within teams they are a part of
* Admins can access any task’s info
* Everyone else can’t find or access any task info (since each team is a closed system)

## Option sets recommended <a href="#h.krr8nsqafyt" id="h.krr8nsqafyt"></a>

### Role (users) <a href="#h.bg3ynyl2vbxo" id="h.bg3ynyl2vbxo"></a>

* Member
* Admin

Having an option set for high-level application roles is useful for any application. In this case, it helps to separate standard users from administrators. This will affect what data the user has access to, and whether they work within their team workspace or an admin dashboard. Note: this is different than team-based roles or project-based roles. In this MVP setup, we’ve assumed each has a single owner, but you could use a separate option set to define roles at those levels.

### Status (tasks) <a href="#h.k8yzmuof2eq" id="h.k8yzmuof2eq"></a>

* New
* To do
* Doing
* Done

Assuming you want to use the same set of task statuses across the application, it will be easiest to use an option set. This makes it easier to adjust the list later without disrupting existing data. Note: if you want to allow for custom statuses by team or project, you would move these to a data object so they can be edited on the fly from within the app.

### Tag (tasks) <a href="#h.pdwk2emdn898" id="h.pdwk2emdn898"></a>

* Urgent
* Bug
* Feature
* etc.

Assuming you want to set the tags that tasks can be labeled with across the application, it will be easiest to use an option set. Note: if you want to allow for custom tags by team or project, you would move these to a data object, for the same reason as for statuses above.

## Example uses in your app <a href="#h.jge3g9i9dho3" id="h.jge3g9i9dho3"></a>

* On the personal dashboard, searches may include:
* My tasks: Search for Tasks where Assignee = Current User and Status <> Done, Sorted by Due Date (ascending). This will start with overdue tasks (i.e., with due dates in the past) and proceed to nearest upcoming tasks.
* My teams: With the data structure above, this can be done directly as Current User’s Teams (using the list field). Alternatively, it can be done as Search for Teams where Members includes Current User (this condition isn’t strictly needed since privacy rules will only allow a user to see their own teams, but it can be helpful anyway).
* On the team dashboard, searches may include:
* Projects: This can be done directly as This Page’s Team’s Projects (using the list field). Alternatively, it can be done as Search for Projects where Team = This Page’s Team.
* Members: This can be done directly as This Page’s Team’s Members (using the list field). Alternatively, it can be done as Search for Users where Teams includes This Page’s Team.
* A selected Project’s tasks: This can be done directly as Parent group’s Project’s Tasks (using the list field). Note: “Parent group” assumes you’re showing the list within a group that has a data type = Project, which you change the value of when a user selects a project. If you are using a board/Kanban view, you may have a repeating group of lanes/statuses, where the data type is the Status option set and each cell has a search for tasks with that status.

## Additional notes <a href="#h.ptfy1mlmwmwy" id="h.ptfy1mlmwmwy"></a>

Project management software can get very feature-rich in order to satisfy the needs of the broadest range of teams and projects. In addition to the basic structure above, below are a few common features you may want to include in your database structure:

* The ability for users to post comments within a task to collaborate
* Custom fields on a task, either at the team or project level
* A history of updates for a task (e.g., status changes, edits to name/description, reassignment, deadline shifts)
* Custom statuses / tags for each team or project (as described above)
* Subtasks (i.e., the ability for tasks to be nested under one another)

Project management tools are sometimes white-labeled, so each team can have their own copy on their domain. Bubble supports this through their “sub-app” feature. If you take this approach, you can create the app assuming just one team, and create a copy for each team.

## About the author: Airdev <a href="#h.6nxku2d514zc" id="h.6nxku2d514zc"></a>

Airdev ([airdev.co](https://www.airdev.co/)) is the original and largest Bubble development agency, and creators of Canvas ([build.airdev.co/canvas](https://build.airdev.co/canvas)), the #1 Bubble template and building framework.

Headquartered in San Francisco, we have spent the past 7 years developing a unique process for bringing ideas to life using Bubble. This includes:

* A globally distributed network of the best Bubblers in the world
* A building framework (Canvas) that provides best-in-class design and functionality to every app at 10x the speed
* A custom process facilitated by our Bubble-built project management tool

We have served hundreds of clients ranging from sole non-technical entrepreneurs to funded fast-growing startups to Fortune 50 enterprises. Our mission is to eliminate the technical barriers to bringing great ideas to life, and to provide great no-code careers to a new breed of product builders (see our [Partners program](https://www.airdev.co/partners)).
