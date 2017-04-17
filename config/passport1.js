var LocalStrategy = require('passport-local').Strategy
// var FacebookStrategy = require('passport-facebook').Strategy

const User = require('../models/user')

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email', // follow the form field ,'email'
    passwordField: 'password', // follow the form field ,'passport'
    passReqToCallback: true
  }, function (req, email, givenPassword, next) {
    User.findOne({'local.email': email}, function (err, foundUser) {
      if (err) return next(err)
      // no user foundUser
      if (!foundUser) {
        return next(err, false,
        req.flash('flash', {
          type: 'danger',
          message: 'No user found'
        })
      )
      }

// if can find the email, check password
      if (!foundUser.validPassword(givenPassword)) {
        return next(null, false,
        req.flash('flash', {
          type: 'danger',
          message: 'Access Denied'
        }))
      }
      return next(err, foundUser)
    })
  }))

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email', // follow the form field ,'email'
    passwordField: 'password', // follow the form field ,'passport'
    passReqToCallback: true
  }, function (req, email, password, done) {
    User.findOne({'local.email': email}, function (err, foundUser) {
      // inside the callback, if there's a user with the  email
      // call next() middleware with No arguments + update the flash data
      if (foundUser) {
        console.log('the same user ')
        // return function(err,theNewUser, flashData)
        return done(null, false,
          req.flash('flash', {
            type: 'danger',
            message: 'This email is already used'
          }))
      } else {
        // if not found= new user
        // save user to the db , password is hashed, as per normal
        // call next() middleware without error arguments
        let newUser = new User({
          local: {
            email: email,
            password: User.encrypt(password)
          }
        })
        newUser.save(function (err, output) {
          return done(null, output, req.flash('flash', {
            type: 'success',
            message: 'successly created user' + newUser.local.email
          }))
        })
      }
    })
  }))


}
