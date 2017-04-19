var mongoose = require('mongoose')


var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/

// setting up schema
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, 'This email is already taken!'],
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
  },
  isAdmin: Boolean,
  cardUid: String
  }
)

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

// setting up static methods
userSchema.statics.findByEmail = function (givenEmail, next) {
  this.findOne({
    email: givenEmail
  }, function (err, foundUser) {
    if (err) return next(err)

    next(null, foundUser)
  })
}

userSchema.methods.validPassword = function (givenPassword) {
  var hashedpassword = this.password
  return bcrypt.compareSync(givenPassword, hashedpassword)
}

// setting up models
var User = mongoose.model('User', userSchema)

module.exports = User
