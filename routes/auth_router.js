var passport = require('passport')
var express = require('express')
var Router = express.Router()


function isLoggedIn (req, res, next) {
 if (!req.isAuthenticated()) return next()

 req.flash('flash', {
   type: 'danger',
   message: 'You have logged in'
 })
 res.redirect('/')
}


Router.get('/signup',isLoggedIn, function (req, res) {
  // res.send('signup')
  res.render('auth/signup',{
    flash: req.flash('flash')[0]
  })
})

Router.get('/login', isLoggedIn, function (req, res) {
  // res.send('login')
  res.render('auth/login',{flash: req.flash('flash')[0]})
})

Router.post('/signup',isLoggedIn, function (req, res) {
// res.send('post signup')
if(!req.body.email || !req.body.password ){
  req.flash('flash',{
    type: 'danger',
    message: 'Please fill in the fields'
  })
  res.redirect('/signup')
  }

  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  })

  return signupStrategy(req, res)
})


Router.post('/login',isLoggedIn, function (req, res) {
  if(!req.body.email || !req.body.password ){
    req.flash('flash',{
      type: 'danger',
      message: 'Please fill in the fields'
    })
    res.redirect('/login')
    }

  var loginStrategy = passport.authenticate('local-login', {
    successRedirect: '/order',
    failureRedirect: '/login',
    failureFlash: true
  })

  return loginStrategy(req, res)
})


Router.get('/logout', function (req, res) {
  req.logout() // remove the session => req.user = undefined, req.isAuthenticated()= false
  req.flash('flash',{
    type: 'success',
    message: 'Logout successful'
  })
  res.redirect('/login')
})

module.exports = Router
