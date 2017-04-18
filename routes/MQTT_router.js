// MQTT Initialize
let Event = require('./models/event')


client.on('connect', function() {
  client.subscribe('outTopic')
  console.log('connected to MQTT!')
  // client.publish('outTopic', 'Hello mqtt')
})

client.on('message', function(topic, message) {
  // message is Buffer
  let newEvent = new Event({
    uid: message.toString()
  })
  newEvent.save(function(err, savedEntry) {
    if (err) throw console.error(err)
    console.log('saved new event!')
  })
})
