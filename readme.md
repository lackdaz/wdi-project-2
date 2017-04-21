# Thingies
https://thingies.herokuapp.com/

Where RFID Access Control meets the Internet-of-Things
[Explore the possibilities](https://thingies.herokuapp.com/)

## Description
***Thingies*** is a platform that aspires to enable an ever-growing range of Internet-of-Things implementations notwithstanding RFID. The project started off with a mission to allow users to start with their first home automation projects and still leave room for customized options - that's why your feedback is very important!

The debut prototype, *Sentinel*, offers a glimpse into the potential of ***Thingies*** as an open-source home automation platform. It integrates RFID user access with a MongoDB + Node.js server authentication - a first for the ESP8266!

### DO NOT POST ANY PERSONAL DATA! I cannot guarantee the safety of your personal data. No email verification is needed.

## Getting Started
If you are new to electronics, I would recommend [WiFi-RFID-Reader](http://www.instructables.com/id/WiFi-RFID-Reader/).
### Prerequisites
1. Wemos D1 mini ()

### Installing
You have to install the Arduino IDE 1.6.4. or 1.6.5.

Arduino > Preferences > "Additional Boards Manager URLs:" and add: http://arduino.esp8266.com/package_esp8266com_index.json
Arduino > Tools > Board > Boards Manager > type in ESP8266 and install the board
download MFRC522 module (see Libraries) and copy folder to Arduino library path
Libraries
RFID library by Miguel Balboa

wiring the MFRC522 to ESP8266 (ESP-12)

RST     = GPIO15
SDA(SS) = GPIO2
MOSI    = GPIO13
MISO    = GPIO12
SCK     = GPIO14
GND     = GND
3.3V    = 3.3V

| MFRC-522| WEMOS PIN       |
| --------|:---------------:|
| RST     | D8              |
| SDA(SS) | D4              |
| MOSI    | D7              |
| MISO    | D8              |
| SCK     | D5              |
| GND     | GND             |
| 3.3V    | 3.3V            |

------

## Deployment
### Hosting
This project was deployed with [Heroku](https://www.heroku.com) for app hositing, and [CloudMQTT](https://www.cloudmqtt.com/) for the websocket server. However, you can choose your own server host.

To use Heroku, go to https://www.heroku.com, create an account, and follow the instructions to deploy your own project.

### Database
I used [Mlabs](https://mlab.com/) for the database hosting.

## Built with
------
* CSS
* MongoDB
* Node.js
* express
* c++ (for Arduino IDE)
* Bootstrap

------
## Development
* DAY 1 - Planned ERD, set up a [trello](https://trello.com/b/TT6JUJA7/wdi-projects)
* DAY 2 = Started on login + Authentication - spent a lot of time here!
* Day 3 = Learn MQTT, rigged up a simple connection
* Day 4 = Successfully executed flash, user authentication and models
* Day 5 = Finished CRUD, routes in one day!
* Day 6 = Debugging, CSS and documentation (barely made it)

### Background
I wanted to start a project featuring home automation - something I'm very passionate about as the proud inventor of a self-sensing deodoriser and a passive IR evening/dark light system. I have always wanted to not only use but understand the websockets that make the I in my IoT work! My inspiration was some user-controlled [Iot lights](http://adityatannu.com/blog/post/2016/01/24/ESP8266-Websockets-demo-using-NeoPixels.html) and some of my previous work in RFID readers and tags. Essentially, I wanted to implementation a project that would authenticate with a webserver (with encryption!), allow for guess access, and also provide some forms of data analytics in the form of a dashboard.

Some of the features from the project were not planned from the get-go, e.g. card UID extraction and was the product of experimentation. I cannot think of something node.js can't accomplish!

### Objective
* To achieve server-client authentication and use of websockets for event handling

## ERD
![ScreenShot](https://github.com/lackdaz/wdi-project-2/blob/master/uploads/ERD.jpeg)


## Models, Routes, Controllers
Sentinel
![Thingies Sentinel] (photo link here "Sentinel")

| mqttController | eventController | thingController | userController |
| ------ |:------:| ------:| ------: |
| index: | -- | -- | index: |
| open: | list: | list: | list: |
| openForX: | new: | new: | new: |
| lock: | -- | -- | login: |
| superlock: | create: | create: | create: |
| listen: | -- | -- | dashboard: |
| listenNoUser: | show: | show: | -- |
| -- | edit: | edit: | -- |
| -- | -- | createUser: | -- |
| -- | update: | update: | update: |
| -- | delete: | delete: | -- |
| -- | -- | -- | settings: |
| -- | -- | -- | editChild: |
| -- | -- | -- | updateChild: |
| -- | -- | -- | logout: |

#### Models
| Model #1: User       | Model #2: Thing | Model #3: Event |
| -------------------- |:----------------|:----------------:
| name                 | name            | uid             |
| email                | thingId         | time            |
| password             | userId          | isEntry         |
| isAdmin              | owner           |                 |
| cardUid              |                 |                 |
| related              |                 |                 |


### Obstacles
* Understanding websockets! Enigmatic but fascinating stuff!
* Deploying a user-study in a full-stack application within a week - I 'pivoted' my ideas 3 times

### Points of Interest
* The helper function to extract the cardUid

#### Performance
* There are definitely a lot of security issues - that I do not yet know how to fix yet, and I'm not too certain about how the application is robust enough to handle multiple access requests.

#### Design
![ScreenShot](https://github.com/lackdaz/wdi-project-2/blob/master/uploads/Design.jpeg)

More wireframing and previous models/plans can be found: [here](https://github.com/lackdaz/wdi-project-2/tree/master/uploads)

### Future
* User profiles! I kept the model for future development of saving 'user preferences' to achieve more 'ambient' forms of UX. Essentially, I predict that manual applications like RFID card-reading would be replaced by remote authentication - like beacons, chip implants, blockchain - so hopefully this runs along the same grain
* Smart lights are the natural next step, the original intention of the project was to achieve [this](http://adityatannu.com/blog/post/2016/01/24/ESP8266-Websockets-demo-using-NeoPixels.html), but with more user-friendly documentation
* This requires better encryption, more security features to be ever considered for public-access use. As of writing, I cannot guarantee the safety of any personal data
------

## Credit
This is a live project; all code contributions are welcome.

### Author
* Seth Loh Wei Chen, GA Web Dev Student and Exploring Maker

### Acknowledgements
* [Cleavan](https://www.linkedin.com/in/cleavan/) for the food, patience and user testing, and running my 3D prints for me!
* [Han Sheng](https://github.com/hsquek) for the timely advice, and observant eye at helping me to debug my code
* [John](https://github.com/johnacs) for the help in MQTT, CSS tricks and inspiration for this project
* [Xavier](https://github.com/random-9) for the bootstrap and logo hacks
* [Yi Sheng](https://github.com/yisheng90) for the useful guidance
* [Sharona](https://github.com/sharona1610) for the ERD advice
* [Raymond](https://github.com/ijmeister) for the massive amount of patience and debugging help!
* [Kenneth](https://github.com/DarkArtistry) for the few lines of code and helper functions that got me off in the right direction.

### Resources

* [Bootstrap Dashboard](https://startbootstrap.com/template-overviews/sb-admin/)
* [Landing Page Theme](https://www.bootstrapzero.com/bootstrap-template/small-apps-themefisher)

### Image credits:
* [Icons](http://fontawesome.io/3.2.1/icons/)
* [Logo](https://www.logomaker.com/)
* [Logo](http://www.cnx-software.com/wp-content/uploads/2016/02/Wemos_D1_mini.jpg)
