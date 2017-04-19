let User = require('../models/user')
var passport = require('../config/passport')


let usersController = {
  index: (req, res) => {
    User.find({}, (err, data) => {
      if (err) throw err
      res.render('homepage', { data })
    })
  },

// this is a get request
  new: (req, res) => {
    res.render('auth/signup', {
      // flashView: '',
      // flashview2: ''
    }
    )
  },

  login: (req, res) => {
    // var myflash = req.flash('test')
    // console.log(myflash + '== my flash')
    res.render('auth/login', {
      // flashView : myflash,
      // flashview2 : req.flash('test2')
    })
  },

// this is a post request
  create: (req,res) => {
    // req.flash('test','bad login')
    // req.flash('test2','wrong password')
    // res.redirect('/login')
    if(!req.body.email || !req.body.password ){
      req.flash('error', 'Missing some fields');
      res.redirect('/signup')
    } else {

      var signupStrategy = passport.authenticate('local-signup', {
        successRedirect: '/login',
        failureRedirect: '/signup',
        failureFlash: 'Invalid username and/or password',
        successFlash: 'Account created'
      })

      return signupStrategy(req, res)
    }

  },



  // this is a post request to go into the dashboard
  dashboard: (req,res) => {
    // res.send('post signup')
    // console.log('about to flash' + res.body)
    if(!req.body.email || !req.body.password ){
      req.flash('error', 'Missing some fields');
      res.redirect('/login')
      }
      var signupStrategy = passport.authenticate('local-login', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: 'Invalid username and/or password',
        successFlash: 'You have logged in'
      })
      return signupStrategy(req, res)
  },

  logout: (req, res) => {
    req.logout() // remove the session => req.user = undefined, req.isAuthenticated()= false
    req.flash('success','Successfully logged out')
    res.redirect('/login')
  }


}


module.exports = usersController
