# Applicant Tracking System (ATS) Apps
> Source: https://manual.bubble.io/help-guides/data/the-database/database-structure-by-app-type/applicant-tracking-system-ats-apps · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

*By Tinkso*

{% hint style="info" %}
*Various members of the Bubble ecosystem contributed these use case-oriented database guides. There's always more than one way to do something in Bubble, but the advice here can help you get started if you're new to Bubble!*
{% endhint %}

You’ll build an app that helps recruiters manage candidates & track the various steps in the hiring process in a scalable way. An Applicant Tracking System (ATS) includes job postings that can also be publicly available and shareable with potential candidates. Depending on your type of ATS, we will build a foundation that will allow you to create more complex features on top of it. Most ATSs have a built-in notification and communication system that allows recruiters and whole teams to manage large numbers of candidates.

Popular ATS examples are: Jobvite, SmartRecruiters or Workable.

While we’ll focus on data architecture, this type of app is usually made of these elements:

* Forms allowing you to create a new job posting and candidate profiles
* Display and filter a list of applications as well as candidates
* Application detail page containing job details and funnel around current candidates that applied to that position

## Data types recommended <a href="#h.8gkrwvp3rqds" id="h.8gkrwvp3rqds"></a>

Users - who we can think of as recruiters - will be creating Talents (a person who is a candidate for a job) and Job postings. We will automatically create an Application when Users associate a Talent to a Job. Users are grouped into Companies. Each Company can have one or more users and many Talents and Job postings. Note that a Talent can only belong to one Company - if the same real-life person applies to two separate companies, each Company would have its own Talent record for that candidate.

The Application data type allows us to track multiple Talents throughout all the stages of the hiring process. This structure enables you to assign a Talent to multiple Job postings without the need to copy unnecessary data.

### Company <a href="#h.327bye5z0rn0" id="h.327bye5z0rn0"></a>

The Company data type keeps all Talents, Users and Applications neatly organized in a way that Users from one Company cannot see other Companies and all the data they create. All Talent, Applications and Jobs will be grouped per Company. This will allow us to create an application that can be used by multiple unrelated companies.

#### Suggested fields on this type

* name - text
* logo - image
* phone - text

#### Privacy rules for this data type

Current User’s Company is this Company: this user can see all information connected to that Company. This allows a user to see the information about their own Company, but no other Company (the default rule should not show anything).

### Talent <a href="#h.zdme0zd3z2lh" id="h.zdme0zd3z2lh"></a>

A Talent is a profile of a given candidate for a given company. It contains all the necessary details about the applicant.

#### Suggested fields on this type

* firstName - text
* lastName - text
* fullName - text
* contactEmail - email
* phoneNumber - text
* aboutMe - text
* CV - file
* Tags - list of texts
* Notes - text: additional information from the recruiter about the candidate.
* TalentStatus - option set: when first creating talent we can default to Available. If this talent will be hired, we can update it to Hired status. This field will allow us to manage Talents which have applied to multiple Job positions, and filter that data appropriately.
* Company - data type: Company to which the Talent belongs. In our system, one Talent cannot apply to more than one Company; if the same real-life person applies to more than one Company, they would need separate Talent records for the sake of keeping the data between Companies separate

#### Privacy rules for this data type

Company data type on the Talent will allow us to create a Privacy Rule: When this Talent’s Company is Current User Company. All of the Talent information should only be accessible to Users to which this privacy rule applies.

### Job <a href="#h.hcjog4r23y75" id="h.hcjog4r23y75"></a>

Job is a job position to which a candidate applies. It contains all necessary information for the recruiter and candidate if the Job position information is made public.

#### Suggested fields on this type

* Position - text
* Description - number
* Notes - text: information that should stay confidential, for recruiters only.
* JobStatus - option set: job status will allow us to filter data and manage all the Jobs within the ATS.
* Hired - Application: only one candidate can be hired per position, and when that happens we will update this field with the right Application.
* Company - data type: Company to which the Job posting belongs.
* Optional: Hired Talent - talent data type: you can also store hired talent on the Job to enable database searches like Display list of Jobs connected to this Talent.

#### Privacy rules for this data type

If your ATS creates job postings which are publicly accessible, you might not want to disclose some information e.g. the Hired field, to non-logged in Users or Users from a different company. You can set the privacy rules as follows:

* When this Job JobStaus is Open: following information is visible on the Job postings page:
* Position
* Description
* When Job’s Company is Current User Company: this user can see all information connected to that Job.

### Application <a href="#h.nsjb5csx95ex" id="h.nsjb5csx95ex"></a>

Application combines some information about a Job and a Talent into one data type. It will allow us to track multiple candidates through a recruiting funnel.

#### Suggested fields on this type

* Job - data type: an application can only exist if it's linked to a Job. Job details page will display all the applications connected to that Job.
* ApplicationStatus - option set: this will allow us to create a candidate pipeline and track all the applications through the recruitment stages. It can also be used to trigger different logic such as ‘Notify the candidate’ or ‘Change the Status of the Application’s Job to Hired.
* Talent - data type: talent that should be considered in this Job’s pipeline.
* Company - data type: for privacy reasons, we need to store to which Company this applications belongs.
* interviewDate - data: can be used to send notifications to a User and Talent.
* Notes - text: additional information from the recruiter about the candidate.
* Rating - number: multiple categories for rating can be created. A simple field that will allow the User to rate the candidate from 1-5 and later filter the applicants for that position to better match possible hires.

#### Privacy rules for this data type

When Job’s Company is Current User Company: this user can see all information connected to that Job.

### User <a href="#h.gyavu5ns4rom" id="h.gyavu5ns4rom"></a>

Built-in Bubble app field. Application user. It’s the recruiter that manages job applications within the app.

#### Suggested fields on this type

* firstName - text
* lastName - text
* fullName - text
* Email - text
* userType - option set: you can manage permissions within the app based on the userType (e.g. admin recruiter vs basic recruiter)
* Company - data type: company to which this User belongs

#### Privacy rules for this data type

* When this User is Current User - see all fields.
* When this User type is Admin Recruiter and This User’s Company is Current User Company - see all fields.

## Option sets recommended <a href="#h.krr8nsqafyt" id="h.krr8nsqafyt"></a>

All of the option sets listed below create flexibility in managing the Talent, Job and Applications within the app. You can easily add new options to create an even better experience for the end-user and allow them to manage the process more granularly.

### Job Status <a href="#h.94gwdtfrmpr" id="h.94gwdtfrmpr"></a>

* Open
* Matching
* Hired
* Closed

Job status will allow us to manage a large number of jobs and filter results in searches.

### Application Status <a href="#h.sa316atfhoib" id="h.sa316atfhoib"></a>

* Applied
* Interview
* Rejected
* Hired

Application status will help us track the current state of recruitment for specific positions.

### Talent Status <a href="#h.atxkotfepyic" id="h.atxkotfepyic"></a>

* Available
* Hired
* Not-available

Talent status will help us manage available talent within our application.

## Example uses in your app <a href="#h.jge3g9i9dho3" id="h.jge3g9i9dho3"></a>

The main search of the app is based on the Application data type which has information from other data types.

You can set up it up the following way:

* Remember to set the [‘Ignore empty constraints’ ](https://manual.bubble.io/core-resources/data/search#ignore-empty-constraints)on the search.
* You can sort either by InterviewDate or Creation Date field.
* The layout of the repeating group will depend on your app’s design. We recommend going either with extended vertical scrolling or introducing pagination for a better User Experience.

![](/files/aOoijaXDmTURjvKMJc7c)

## About Tinkso <a href="#h.37ci9znk065g" id="h.37ci9znk065g"></a>

Tinkso ([tinkso.com](https://tinkso.com/)) is a pioneer and leader in professional no-code and low-code product development. Our unique approach allows our clients to run successful businesses, raise millions in funding and scale professionally. Our suite of tools consists of [openBuild Framework](https://openbase-template.bubbleapps.io/), [openBuild UI Builder](https://www.openbuild.io/?tab=Navigation%201) and a range of other tools, turns makers, freelancers and businesses in professional Bubble app builders.
