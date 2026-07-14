# Bubble as a backend
> Source: https://manual.bubble.io/help-guides/data/the-database/database-structure-by-app-type/bubble-as-a-backend · Captured: 2026-07-14 (verbatim from manual.bubble.io llms-full.txt)

*By Robert Brooks, Founder & CEO, MVP.dev*

{% hint style="info" %}
*Various members of the Bubble ecosystem contributed these use case-oriented database guides. There's always more than one way to do something in Bubble, but the advice here can help you get started if you're new to Bubble!*
{% endhint %}

In this guide, Bubble.io will be used as a backend service with an Arduino board to capture sensor data for a pump in a remote area. The module will monitor the pump and receive alerts if the pump fails or if the sensor data indicates a problem, and send the data back via satellite communication. The data captured by the Arduino board will be saved in Bubble.io using REST API calls, as well as storing configuration data. The module can also be used to remotely control the pump, turning it on or off as needed.

Bubble is great in these sorts of backend as a service scenarios for quick proof of concept builds, or even production ready solutions. Create the data types and making them available via API is extremely quick and easy

## Data types recommended <a href="#h.30j0zll" id="h.30j0zll"></a>

The Bubble backend solution will be storing configuration information, pump status data, as well as time series data for the historical record of each pump. Data types will be Users, Pumps, Configurations, Alerts, and Pump History

### Users <a href="#h.1fob9te" id="h.1fob9te"></a>

The users data type stores information about the users that have access to the Bubble platform to make configuration changes, turn the pumps on and off, monitor alerts, and view historical data.

#### Suggested fields on this type

* Email - text
* First Name - text
* Last Name – text
* Role – Roles: Option set that defines the access level the user has to in the database and app; this will be used for the privacy rules of many other data types
* And any other fields that might be relevant for platform users

#### Privacy rules for this data type

* Users can:
* View all fields except the following:
* Slug
* Created Date
* Modified Date
* Find this in searches
* View attached files
* Users with the Admin role can view all fields for all users, as well as find in searches, and view attached files

### Pumps

A pump is the unit being controlled in the field to monitor pumps, send commands, and capture alerts.

#### Suggested fields on this type

* Name – text
* Location – text: lat/long coordinates of the pump; alternatively, this could be stores as a geographic address if that’s granular enough for our use case
* Status - text
* Active – yes/no

#### Privacy rules for this data type

* Users with the Pump Tech and Pump Admin roles can:
* View all fields except the following:
* Created Date
* Modified Date
* Find this in searches
* View attached files

### Configurations <a href="#h.3znysh7" id="h.3znysh7"></a>

Configuration settings for each pump. Though this could be included in the Pumps data type, we’re using a separate data type so that a group of pumps can have the same configurations and for learning purposes.

#### Suggested fields on this type

* Name – text
* Pumps – List of Pumps: A list of pumps to which these configurations apply
* Schedule – date range: time the pump will turn on and off
* PercentOpen – number: number from 0-100 to determine how much the pump may be throttled
* Threshold – number: fault tolerance before an alert is triggered
* Active – yes/no

#### Privacy rules for this data type

* Users with the Pump Tech and Pump Admin roles can:
* View all fields except the following:
* Created Date
* Modified Date
* Find this in searches
* View attached files

### Alerts

Info about alerts triggered by a pump are stored here.

#### Suggested fields on this type

* Pump – Pumps: The pump that generated the alert
* Description – text
* Alert Type: Alert Types: Option set for the type of alert triggered
* Severity: number: A range of 1 – 5 that is sent by the Arduino controller that measures the severity of the alert

#### Privacy rules for this data type

* Users with the Pump Tech and Pump Admin roles can:
* View all fields except the following:
* Created Date
* Modified Date
* Find this in searches
* View attached files

### Pump History

Pumps are polled hourly and the information is stored here for future reference.

#### Suggested fields on this type

* Pump – Pumps: The pump this record belongs to
* Title – text
* Description - text: This stores whatever information you want to log each hour

#### Privacy rules for this data type

* Users with the Pump Tech and Pump Admin roles can:
* View all fields except the following:
* Created Date
* Modified Date
* Find this in searches
* View attached files

## Option sets recommended <a href="#h.2et92p0" id="h.2et92p0"></a>

### Roles <a href="#h.tyjcwt" id="h.tyjcwt"></a>

* Pump Tech
* Pump Admin
* Administrator

Sets the access level the user has to the platform

### Alert Types

* Pump On
* Pump Off
* Pump Failure
* Pump Warning

List of alerts the pumps can generate

## Additional notes <a href="#h.3dy6vkm" id="h.3dy6vkm"></a>

There are unlimited scenarios and use cases for using Bubble as a backend. From API Management, to BLE RFID data storage, to unmonitored task execution, the possibilities are only limited by your imagination.

## About MVP.dev <a href="#h.1t3h5sf" id="h.1t3h5sf"></a>

At [MVP.dev](#h.1t3h5sf), we help business owners harness the power of no-code technology to bring their vision to life in weeks through a high-touch proven process.

Rather than holding your tech hostage through a drawn-out and mysterious process, we’re passionate about partnering and collaborating with you every step of the way — from idea to design to development to delivery.

We lean on your vision and our experience to create a truly unforgettable experience and product.
