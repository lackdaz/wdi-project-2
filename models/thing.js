const mongoose = require('mongoose')

let thingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thingId: {
    type: String
  },
  userId: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}]
  ,
  owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'}
  }
)

let Thing = mongoose.model('Thing', thingSchema)

module.exports = Thing
