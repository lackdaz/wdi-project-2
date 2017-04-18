// MQTT Initialize
let Event = require('../models/event')
var mqtt = require('mqtt')

var client = mqtt.connect('mqtt://m10.cloudmqtt.com', {
  port: 11719,
  username: "oldvydio",
  password: "EjIAU6OfpIEn",
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8)
})

module.exports = function (mqtt) {

// Connect and keep listening to MQTT
client.on('connect', function() {

// listen to outTopic channel
  client.subscribe('outTopic')
  console.log('connected to MQTT!')

  // client.publish('outTopic', 'Hello mqtt')
})


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
