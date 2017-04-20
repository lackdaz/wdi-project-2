// MQTT Initialize
let Event = require('../models/event')
let Thing = require('../models/thing')
let User = require('../models/user')

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

  index: (req, res) => {
      res.render('controls/', {
      })
  },

  open: (req, res) => {
    // Connect and keep listening to MQTT
    client.on('connect', function() {
      client.subscribe('outTopic')
    })

    // publish the message to open the door
    client.publish('onOff', '1', (err,output) => {
      req.flash('success', 'Door Unlocked!');
      res.redirect('/mqtt/control', {
      })
    })
  },

  openForX: (req, res) => {
    // Connect and keep listening to MQTT
    client.on('connect', function() {
      // client.subscribe('outTopic')
    })

    // publish the message to open the door
    client.publish('openForX',req.params.id, (err,output) => {
      req.flash('error', 'We are still currently working on this feature');
      res.redirect('', {
      })
    })
  },

  lock: (req, res) => {
    // Connect and keep listening to MQTT
    client.on('connect', function() {
      // client.subscribe('outTopic')
    })

    // publish the message to open the door
    client.publish('onOff', '0', (err,output) => {
      req.flash('success', 'Door Locked!');
      res.redirect('/mqtt/control', {
      })
    })
  },

  superlock: (req, res) => {
    // Connect and keep listening to MQTT
    client.on('connect', function() {
      // client.subscribe('outTopic')
    })

    // publish the message to open the door
    client.publish('bar', '1', (err,output) => {
      req.flash('success', 'Superlock Enabled!');
      res.redirect('/mqtt/control', {
      })
    })
  },


  listen: (req, res) => {
    // Connect and keep listening to MQTT

    var client = mqtt.connect('mqtt://m10.cloudmqtt.com', {
      port: 11719,
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8)
    })

    client.on('connect', function() {
      client.subscribe('outTopic')
    })
    //
    //   // listen to outTopic channel

    // client.publish('outTopic', 'Hello mqtt')
    client.on('message', function(topic, message) {
      var uid = message.toString()

      req.flash('success', 'Read card UID as: ' + uid)
      console.log(req.params.id)

      User.findById(req.params.id, (err, output) => {
        if (err) throw err
        client.end()
        console.log('Closed client!')
        console.log(output)
        output.Uid = uid
        req.flash('success', 'Updated with card UID');
        res.render('users/update', {
          user: output,
        })
      })
      // })
    })
  }

}
module.exports = mqttController
