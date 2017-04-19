// MQTT Initialize
let Event = require('../models/event')
var mqtt = require('mqtt')
var Thing = require('../models/thing')

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

  Thing.find({}).populate('userId').exec((err,output) => {
    if (err) throw console.error(err);
    if (output[0].cardUid.includes(message.toString())) {
      var access = true
      // and open the door
      client.publish('outTopic', '1')
    }
    else access = false
    
    let newEvent = new Event({
      uid: message.toString(),
      isEntry: access
    })
    // client.end()
    newEvent.save(function(err, savedEntry) {
      if (err) throw console.error(err)
      console.log('saved new event!')
    })
  })


})

}
