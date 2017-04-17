var mongoose = require('mongoose')

// setting up schema
var thingSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Thing'
  },
  productId: [{type: mongoose.SChema.Types.ObjectId, ref:'Product'}],
  profileId: [{type: mongoose.SChema.Types.ObjectId, ref:'Profile'}],
})

// setting up models
var Thing = mongoose.model('Thing', thingSchema)

module.exports = Thing
