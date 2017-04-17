var mongoose = require('mongoose')

// setting up schema
var eventSchema = new mongoose.Schema({
  uid: {
    type: String,
  },
  time: {
    type : Date,
    default : Date.now
  },
  // productId: [{type: mongoose.SChema.Types.ObjectId, ref:'Product'}],
  // profileId: [{type: mongoose.SChema.Types.ObjectId, ref:'Profile'}],
})

// setting up models
var Thing = mongoose.model('Event', eventSchema)

module.exports = Thing
