// MQTT Initialize
let Event = require('../models/event')
let Thing = require('../models/thing')
let User = require('../models/user')

var mqtt = require('mqtt')
require('dotenv').config({
  silent: true
})

let mqttController = {

  open: (req, res) => {

  },

  listen: (req, res) => {
    console.log('i am in the controller')
    // Connect and keep listening to MQTT

    var client = mqtt.connect('mqtt://m10.cloudmqtt.com', {
      port: 11719,
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8)
    })

    client.on('connect', function () {
      console.log('Im here!')
      client.subscribe('outTopic')
        console.log('connected to right topic!')
    })
    //
    //   // listen to outTopic channel

      // client.publish('outTopic', 'Hello mqtt')
    client.on('message', function (topic, message) {
      var uid = message.toString()
      console.log('Got a message')

      req.flash('success', 'Read card UID as: ' + uid)
      console.log(req.params.id)

      User.findById(req.params.id, (err, output) => {
        if (err) throw err
        client.end()
        console.log('Closed client!')
        console.log(output)
        output.Uid = uid

        res.render('users/update', {
          user: output,
        })
      })
      // })
    })
    console.log('Waiting!')
  }

}
module.exports = mqttController
