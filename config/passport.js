var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user')

// set the authenticated user data into session
passport.serializeUser(function(user, done) {
  done(null, user.id)
})

/*
 * Passport "deserializes" objects by taking the user's serialization (id)
 * and looking it up in the database
 */
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user)
  })
})

// passport middleware strategy
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, givenEmail, givenPassword, next) {
  User.findOne({'local.email': email}, function (err, foundUser) {
  // inside the callback, if there's a user with the  email
  // call next() middleware with No arguments + update the flash data
  if (foundUser) {
    console.log('the same user ')
    // return function(err,theNewUser, flashData)
    return done(null, false,
      req.flash('flash', {
        type: 'error',
        message: 'This email is already used'
      }))
  } else {
    // if not found= new user
    // save user to the db , password is hashed, as per normal
    // call next() middleware without error arguments  console.log(req.body)
    var newUser = new User({
      email: givenEmail,
      name: req.body.name,
      password: givenPassword
    })

    newUser.save(function(err, data) {
      if (err) {
        req.flash('error', 'Registration failed')
        return next(err)
      }

      next(null, data)
    })
  }
})
}))

module.exports = passport
