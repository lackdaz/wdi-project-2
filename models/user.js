var mongoose = require('mongoose')


var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

// setting up schema
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: emailRegex
  },
  name: {
    type: String,
    required: true,
    minlength: [3, 'Name must be between 3 and 99 characters'],
    maxlength: [99, 'Name must be between 3 and 99 characters']
  },
  password: {
    type: String
    // required: true,
    // minlength: [8, 'Name must be between 3 and 99 characters'],
    // maxlength: [99, 'Name must be between 3 and 99 characters']
  }
})

// Password encryption
var bcrypt = require('bcrypt')

// do something before we create new user
userSchema.pre('save', function (next) {
  var user = this

  if (!user.isModified('password')) return next();

  console.log('about to save user', this)
  // hash the password
  var hash = bcrypt.hashSync(user.password, 10)

  console.log('original password', user.password)
  console.log('hashed password', hash)

  // Override the cleartext password with the hashed one
  user.password = hash
  next()
})

// setting up models
var User = mongoose.model('User', userSchema)

module.exports = User
