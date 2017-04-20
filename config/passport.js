var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user')

// set the authenticated user data into session
passport.serializeUser(function (user, done) {
  done(null, user.id)
})

/*
 * Passport "deserializes" objects by taking the user's serialization (id)
 * and looking it up in the database
 */
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

// passport middleware strategy
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, givenEmail, givenPassword, done) {
  User.findOne({email: givenEmail}, function (err, foundUser) {
  // inside the callback, if there's a user with the  email
  // call next() middleware with No arguments + update the flash data
    if (foundUser) {
    // return function(err,theNewUser, flashData)
      return done(null, false,
        req.flash('error','Access Denied'))

    } else {
    // if not found= new user
    // save user to the db , password is hashed, as per normal
    // call next() middleware without error arguments  console.log(req.body)
      var newUser = new User({
        email: givenEmail,
        name: req.body.name,
        password: givenPassword
      })
      newUser.save(function (err, data) {
        return  done(null, data)
      })
    }
  })
}))

passport.use('local-login', new LocalStrategy({
  usernameField: 'email', // follow the form field ,'email'
  passwordField: 'password', // follow the form field ,'passport'
  passReqToCallback: true
}, function (req, email, givenPassword, next) {
  User.findOne({email: email}, function (err, foundUser) {
    if (err) return next(err)
    // no user foundUser
    if (!foundUser) {
      return next(err, false,
      req.flash('error', 'No user found')
    )
    }

// if can find the email, check password
    if (!foundUser.validPassword(givenPassword)) {
      return next(null, false,
      req.flash('error','Access Denied'))
    }

    return next(null, foundUser)
  })
}))

passport.use('local-update', new LocalStrategy({
  usernameField: 'email', // follow the form field ,'email'
  passwordField: 'password', // follow the form field ,'passport'

  passReqToCallback: true
}, function (req, email, givenPassword, next) {
  User.findOne({email: email}, function (err, foundUser) {
    if (err) return next(err)
    // no user foundUser
    if (!foundUser) {
      return next(err, false,
      req.flash('error', 'No user found')
    )
    }

// if can find the email, check password
    if (!foundUser.validPassword(givenPassword)) {
      return next(null, false,
      req.flash('error','Access Denied'))
    }

    return next(null, foundUser)
  })
}))

module.exports = passport
