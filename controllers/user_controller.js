let User = require('../models/user')
var passport = require('../config/passport')


let usersController = {

  index: (req, res) => {
    User.find({}, (err, data) => {
      if (err) throw err
      res.render('homepage', { data })
    })
  },

  list: (req, res) => {
    User.find({related: res.locals.currentUser._id},
      (err,output) => {
      if (err) next(err)
      console.log(output)
      res.render('users/', {
        users: output
      })
    })
  },

// this is a get request
  new: (req, res) => {
    res.render('auth/signup', {  layout: 'portal'
      // flashView: '',
      // flashview2: ''
    }
    )
  },

  login: (req, res) => {
    // var myflash = req.flash('test')
    // console.log(myflash + '== my flash')
    res.render('auth/login', {  layout: 'portal'
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
        successFlash: 'Welcome Back'
      })
      return signupStrategy(req, res)
  },

  update: (req, res) => {
    console.log('body is'+req.body)
    if(!req.body.name || !req.body.email || !req.body.password || !req.body.password2){
      req.flash('error', 'Missing some fields');
      console.log('bad fields')
      return res.redirect('/settings/')
    }
    if(req.body.password!==req.body.password2){
      console.log(req.body.password)
      console.log(req.body.password2)
      req.flash('error', 'Passwords do not match');
      console.log('bad password')
      return res.redirect('/settings/')
    }
    console.log('hello')
    User.findById(req.params.id,(err, output) => {
      if (err) throw err
      output.name = req.body.name
      output.email = req.body.email
      output.password = req.body.password
      output.save((err, data) => {
        req.flash('success', 'Updated Settings');
        res.redirect('/settings')
      })
  })
  },

  settings: (req, res) => {
      User.findById(res.locals.currentUser, (err,output) => {
        if (err) throw err
        res.render('users/settings',{
          users: output
        })

      })
  },

  editChild: (req, res) => {
      User.findById(req.params.id, (err,output) => {
        if (err) throw err
        res.render('users/update',{
          user: output
        })

      })
  },

  updateChild: (req, res) => {
    console.log('body is'+req.body)
    if(!req.body.name || !req.body.email || !req.body.cardUid){
      req.flash('error', 'Missing some fields');
      return res.redirect('/users/'+req.params.id+'/edit')
    }
    console.log('hello')
    User.findById(req.params.id,(err, output) => {
      if (err) throw err
      output.name = req.body.name
      output.email = req.body.email
      output.cardUid = req.body.cardUid
      output.save((err, data) => {
        res.redirect('/things')
      })
  })
  },

  logout: (req, res) => {
    req.logout() // remove the session => req.user = undefined, req.isAuthenticated()= false
    req.flash('success','Successfully logged out')
    res.redirect('/')
  }


}


module.exports = usersController
