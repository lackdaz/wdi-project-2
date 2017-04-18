const mongoose = require('mongoose')

let deviceSchema = new mongoose.Schema({
  deviceId: String,
  imageUrl: {type: String, default:'/images/devices/pronto-device.jpg'},
  productId: [{type: mongoose.Schema.Types.ObjectId, ref:'Product'}],
  customerId: [{type: mongoose.Schema.Types.ObjectId, ref:'Customer'}]
})

let Device = mongoose.model('Device', deviceSchema)

module.exports = Device
