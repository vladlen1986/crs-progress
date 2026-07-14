# Transitioning to Bubble from...
> Source: https://manual.bubble.io/help-guides/getting-started/transitioning-to-bubble-from · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

Many come to Bubble from traditional development backgrounds such as [JavaScript](/help-guides/getting-started/transitioning-to-bubble-from/javascript), [HTML/CSS](/help-guides/getting-started/transitioning-to-bubble-from/html-and-css), and [SQL](/help-guides/getting-started/transitioning-to-bubble-from/sql). These, and other languages, are standards that have evolved over decades and are supported by all major browsers. Making the transition to Bubble can feel a bit different, given that Bubble has a consistently visual approach to design, interactivity, and data management.

So, how come all major browsers also support Bubble so well?

The answer lies in the fact that Bubble uses the same tried and tested methods to render pages, enable user interaction, and read, create, and manipulate data. Bubble is built on top of these foundational web technologies, ensuring compatibility and leveraging the strengths of traditional development practices. The app that Bubble delivers to the web browser is a combination of HTML/CSS, JavaScript, and a database built on PostgreSQL.

This ensures that Bubble can host secure, highly compatible, and efficient applications without straying from its original vision: to empower anyone to build and launch fully functional web applications without writing any code. To make this vision a reality, Bubble doesn’t simply offer the “absence of code” but instead sets up your app as a central hub that addresses a range of technological challenges from one place:

* Designing pages
* Setting up and running workflows
* Managing databases
* Communicating with external apps and systems through APIs
* Managing user authentication securely
* Scaling from one, to a hundred, to millions of users

While it’s technically true that Bubble “generates” code for you, this doesn’t mean you can export this code and run it somewhere else. The ease and speed with which apps are built rely on the engine of the Bubble server, which is specifically designed to host millions of apps and help users build and scale those apps efficiently and securely. The two sides (client-side[^1] and server-side[^2]) are in constant communication, and this integrated approach ensures that Bubble provides a seamless experience, combining powerful development tools with robust hosting infrastructure. While you are certainly welcome to understand how the underlying infrastructure works, its hidden complexity is one of Bubble’s main benefits for non-technical users.

However, this holistic approach can lead traditional coders to approach Bubble expecting the intricacy and methodologies they are accustomed to. With many processes automated and simplified, traditional coding practices and terminology may not always apply.

This article series will explore the transition from traditional coding to Bubble, and how common methods and terms/phrases change as you make this shift.

<details>

<summary>JavaScript (and other similar languages)</summary>

This article explores common methods and terms used in JavaScript and how you can use Bubble’s tools to achieve similar outcomes. Those coming from languages similar to JavaScript, such as Python, Ruby, and PHP, will likely find this article useful as well.

Article: [Transitioning from JavaScript to Bubble](/help-guides/getting-started/transitioning-to-bubble-from/javascript)

</details>

<details>

<summary>HTML/CSS</summary>

Bubble's design engine is entirely visual, relying on a drag-and-drop interface to control the look of the page and its elements, its responsive properties, and its styling. While the underlying logic has much in common with HTML and CSS, this article will explore how Bubble achieves this without requiring any code.

Article: [Transitioning from HTML/CSS to Bubble](/help-guides/getting-started/transitioning-to-bubble-from/html-and-css)

</details>

<details>

<summary>SQL</summary>

Bubble hosts and manages your app’s databases automatically, simplifying both the methodology and terminology of building relational databases. In this article, we’ll explore how creating a database in Bubble differs from traditional SQL methods.

Article: [Transitioning from SQL to Bubble](/help-guides/getting-started/transitioning-to-bubble-from/sql)

</details>

[^1]: *Client-side* in this context means the user's device.

[^2]: *Server-side* in this context means the Bubble server.
