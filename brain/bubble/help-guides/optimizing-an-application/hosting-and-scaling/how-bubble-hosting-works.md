# How Bubble hosting works
> Source: https://manual.bubble.io/help-guides/optimizing-an-application/hosting-and-scaling/how-bubble-hosting-works · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

This section explores how Bubble hosting works and what kind of services you get with the hosting

## What hosting means

### Bubble's engine

Whenever you access the Bubble editor or load a page within your app, there is an active interaction between the device being used and the Bubble server. Here, the Bubble software, often referred to as Bubble's proprietary "engine," diligently operates, to keep the editor and the app running.

The Bubble engine connects a range of services with one goal in common: to make it possible for a single developer with no programming experience to design, develop, deploy and maintain a fully functioning web application.

Bubble's engine works predominantly to connect all the different services that Bubble offers to the user's device and maintain communication between them.

#### The two engines

You can see Bubble's engine as consisting of two modules: one on the server, and the other on the local device of the user. This is true both for you as a developer when you use the Bubble editor, and for users who visit your app.

<figure><img src="/files/4XKpQeTCK2jmhCqlGHB3" alt=""><figcaption></figcaption></figure>

The local engine consists of a collection of files that are downloaded to the browser when a page or the editor is loaded, and it establishes a connection with its twin engine on the server to operate.

### Database

Every app that you create comes with two ready-to-use databases (one for Development and one for Live). Bubble has automated most of the processes that usually require a dedicated person or team to operate, such as:

* **Database Setup**: Bubble automatically creates and configures the databases (Development and Live) when you start a new app. You don't need to worry about any setup or maintenance tasks.
* **Schema Management**: You can define your app's data structure visually. You don't have to write SQL queries or manage database schema manually as this is managed automatically.
* **Backups**: [Point-in-time backups](#user-content-fn-1)[^1] are created continuously for any change in the Development and Live database individually.
  * **Restoring backups:** You can also restore one or all data types to any point in time
* **Security**: We provide tools to manage the security aspects of the database, including automated encryption and managing user access with [privacy rules](#user-content-fn-2)[^2]. We use AWS RDS’s AES-256 encryption to encrypt data at rest. You can [see for yourself](https://www.ssllabs.com/ssltest/analyze.html?d=bubble.io\&latest) the encryption we use for data in transit.
* **Data Manipulation**: With Bubble's visual programming model, you can manipulate data (Create, Read, Update, Delete operations) without writing code. Bubble automates the process of generating the necessary commands to perform these operations on the database.
* **Uptime**: we continually scan for any downtime and have both automated processes and dedicated teams that ensure a [99.93 % uptime](#user-content-fn-3)[^3]
* [**Data API**](#user-content-fn-4)[^4]**:** a direct, secure API connection that gives controlled access to read and make changes to your database can be enabled with just a few clicks

The easy communication with the database is facilitated by the two engines constantly communicating.

<details>

<summary>Related articles</summary>

If you want to learn more about how the Bubble database works, we recommend you check out the *Data* section of the Bubble manual.

Article series: [Data](/help-guides/data)

Article: [The database](/help-guides/data/the-database)

</details>

### Backup

Bubble has completely automated the backup process, making sure that you can easily restore your app to an earlier point in time with just a few clicks:

* **App development**: every change you make to your app is logged so that you can not only *undo* changes, but you can create named save points or restore the app to an earlier point in time.
  * [**Version control**](#user-content-fn-5)[^5]: Bubble also lets you easily create different branches where you can work on separate parts of the app in isolation to make it easy to manage teamwork, feature development and hotfixes
* **Database:** the same point-in-time backups are automatically handled for both the Development and Live database individually

<details>

<summary>Related articles</summary>

Article: [Restoring backups](/help-guides/maintaining-an-application/database-maintenance/database-copy-and-backups)

</details>

### Server Logs

Every process performed by the Bubble engine is [logged and searchable](#user-content-fn-6)[^6], meaning you can track what operations have taken place and navigate to the exact workflow where the process took place. The logs also give you a full overview of the user and parameters associated with each action.

<details>

<summary>Related articles</summary>

* Article: [Server logs](/help-guides/maintaining-an-application/testing-an-application/using-server-logs)

</details>

### File storage

Uploading and using files is fully automated and secure, allowing you to work with files that can be kept private to each user. Files are hosted on the endpoint `cdn.bubble.io`.

<details>

<summary>Related articles</summary>

* Article: [The file and image uploader elements](/help-guides/design/elements/web-app/input-forms/file-uploads)
* Article: [Managing files](/help-guides/data/files)

</details>

### CDN

An essential feature of high-performing web applications is the implementation of a *Content Delivery Network*, or CDN. A CDN is a system that distributes copies of your data and content across a network of servers located around the globe, ensuring fast accessibility regardless of a user's geographical location. Each Bubble app is integrated with Cloudflare, a leading provider of web infrastructure services. This integration not only ensures rapid delivery of files worldwide but also bolsters your app's security against potential threats and cyberattacks.

<details>

<summary>Related articles</summary>

* [CDN (Cloudflare)](/help-guides/optimizing-an-application/hosting-and-scaling/cdn-cloudflare)

</details>

### API

Bubble's engine also offers an easy way to set up APIs:

* The [**Data API**](#user-content-fn-4)[^4] allows external apps to connect securely to your databases to read and make changes to it
* The [**Workflow API**](#user-content-fn-7)[^7] allows external apps to trigger workflows in your app.

<details>

<summary>Related articles</summary>

* Article series: [API](/help-guides/integrations/api)
  * Article series: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)
  * Article series: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)

</details>

## How Bubble hosts apps

Bubble's servers are hosted on Amazon Web Services (AWS), a leading cloud services platform known for its robust security and scalability. Bubble uses many of the services that AWS offers to run the editor and apps, which means they are regularly audited by independent third parties and continually tested and optimized as a result of being used by millions of other software systems outside of the Bubble sphere.

### AWS security

The security aspect is taken care of by AWS's comprehensive set of security tools and best practices. They have multiple layers of operational and physical security to ensure the integrity and safety of data. This includes features like keeping data centers safe from physical harm (such as natural disasters, power failures and overheating), data encryption, network firewalls, and secure access controls.

Amazon AWS is compliant with certifications such as SOC 2, CSA, ISO 27001, and more.

External page: [Amazon AWS Cloud security](https://aws.amazon.com/security/)

## FAQ: Hosting your app on Bubble

#### Can I move my app to a server of my choice?

Since Bubble operates on its proprietary engine, which is consistently maintained and updated, the migration of your app away from Bubble's hosting is not possible. However, Bubble does provide an alternative in the form of a dedicated server environment, enabling you to have a secluded and more adjustable server control as well as a static IP. You can read more about this in our article series on the [Enterprise plan](/help-guides/bubble-for-enterprise). We recommending getting in touch with our [Sales team](https://bubble.io/contact-sales) to discuss the possibility of setting up a dedicated environment.

#### Can I choose the geographical location of where my app is hosted?

Bubble's shared server environment is hosted in the US, and we don't currently offer the possibility of changing that location. Our [Enterprise plan](/help-guides/bubble-for-enterprise), on the other hand, lets you choose the AWS region where you want your app to be hosted. We recommending getting in touch with our [Sales team](https://bubble.io/contact-sales) to discuss the possibility of setting up a dedicated environment.

#### Can I get a static IP on Bubble?

Bubble's shared server environment doesn't currently offer the possibility of assigning a static IP address. Our [Enterprise plan](/help-guides/bubble-for-enterprise), on the other hand, lets you set this up. We recommending getting in touch with our [Sales team](https://bubble.io/contact-sales) to discuss the possibility of setting up a dedicated environment.

[^1]: *Point-in-time* backups means that Bubble saves a mirror image of your databases for every change that is made. This lets you restore a database (or a single data type) to an earlier point in time if something goes wrong.\
    \
    Article series: [Database maintenance](/help-guides/maintaining-an-application/database-maintenance)

    Article: [Restoring database backups](/help-guides/maintaining-an-application/database-maintenance/database-copy-and-backups)

[^2]: *Privacy rules* let you set up server-side rules that govern which users have access to what data.\
    \
    Article: [Privacy rules](/help-guides/data/the-database/protecting-data-with-privacy-rules)

[^3]: You can track Bubble's status, sign up for notifications and view uptime statistics on the link below.\
    \
    Page: [Bubble status](https://status.bubble.io/)

[^4]: The *Data API* can be enabled to allow third-party apps and systems to access your database to read and make changes. It includes secure authentication and access control.\
    \
    Article series: [API](/help-guides/integrations/api)

    Article: [The Data API](/help-guides/integrations/api/the-bubble-api/the-data-api)

[^5]: Bubble's *version control* system lets you divide the development of your project into independent parts, so that you and other editors with access to the project can iterate on one part of the app without impacting other parts.\
    \
    Article series: [Version control](/help-guides/maintaining-an-application/version-control)

[^6]: You can read more about the server logs feature in the article below.\
    \
    Article. [The server logs](/help-guides/maintaining-an-application/testing-an-application/using-server-logs)

[^7]: The *Workflow API* can be enabled to allow third-party apps and systems to trigger workflows in your app and to set up webhooks.\
    \
    Article: [The Workflow API](/help-guides/integrations/api/the-bubble-api/the-workflow-api)
