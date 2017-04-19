// MQTT Initialize
let Event = require('../models/event')
var mqtt = require('mqtt')
var Thing = require('../models/thing')
require('dotenv').config({
  silent: true
})

var client = mqtt.connect('mqtt://m10.cloudmqtt.com', {
  port: 11719,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
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
  var sortedMessage = message.toString()
  console.log('message is' + sortedMessage)
  Thing.find({},'userId').populate('userId').exec((err,output) => {
    if (err) throw console.error(err);
    var access = false
    // console.log(output)
    for (var i = 0; i < output.length; i++) {
      for (var j = 0; j < output[i].userId.length; j++) {
        // console.log(output[i].userId[j].cardUid)
        if (output[i].userId[j].cardUid === sortedMessage) {
          access = true
          // and open the door
          client.publish('onOff', '1')
          break
      }


      }
    }
    console.log(access)
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
