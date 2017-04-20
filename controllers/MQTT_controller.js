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

  listen: (req, res) => {
    console.log('i am in the controller')
    // Connect and keep listening to MQTT
    // client.on('connect', function() {
    //   console.log('Im here!')
    //
    //   // listen to outTopic channel
    //   client.subscribe('outTopic')
    //   console.log('connected to MQTT!')

      // client.publish('outTopic', 'Hello mqtt')
      client.on('message', function(topic, message) {
        var uid = message.toString()
        console.log('Got a message')

        req.flash('success', 'Read card UID as: ' + uid);

        console.log('Sent flash!')

        User.findById(req.params.id, (err, output) => {
          if (err) throw err
          client.end()
          console.log('Closed client!')

          res.render('users/update', {
            user: output,
            uid: uid
          })

        })
      // })
    })
    console.log('Waiting!')

  },

}
module.exports = mqttController
