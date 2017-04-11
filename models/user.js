var mongoose = require('mongoose')

// setting up schema
var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name cannot be empty'],
    unique: true,
    minlength: [3, 'User name too short']
  },
  synopsis: String,
  rating: Number
})

// setting up models
var User = mongoose.model('User', userSchema)

module.exports = User
