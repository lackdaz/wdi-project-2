// MQTT Initialize
let Event = require('../models/event')
let Thing = require('../models/thing')
var mqtt = require('mqtt')

var client = mqtt.connect('mqtt://m10.cloudmqtt.com', {
  port: 11719,
  username: "oldvydio",
  password: "EjIAU6OfpIEn",
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
