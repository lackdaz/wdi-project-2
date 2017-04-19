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

}
}
module.exports = mqttController
