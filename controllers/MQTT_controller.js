// MQTT Initialize
let Event = require('../models/event')
let Thing = require('../models/thing')
var mqtt = require('mqtt')
require('dotenv').config({
  silent: true
})

var client = mqtt.connect('mqtt://m10.cloudmqtt.com', {
  port: 11719,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8)
})


let mqttController = {

  open: (req, res) => {

},
  accessPrivileges: (req, res) => {
    // listen to next message and save it with privileges
    client.on('message', function(topic, message) {
      // message is Buffer
      let newEvent = new Event({
        uid: message.toString()
      })
      // client.end()
      newEvent.save(function(err, savedEntry) {
        if (err) throw console.error(err)
        console.log('saved new event!')
      })
    })
}
}
module.exports = mqttController
