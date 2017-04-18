let User = require('../models/user')

let usersController = {
  index: (req, res) => {
    User.find({}, (err, data) => {
      if (err) throw err
      res.render('homepage', { data })
    })
  },

// this is a get request
  new: (req, res) => {
    res.render('auth/signup')
  },

  login: (req, res) => {
    res.render('auth/login')
  },

// this is a post request
  create: (req,res) => {
    console.log(req.body)
    let newUser = new User({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    })
    newUser.save(function (err, output) {
      if (err) throw err
      console.log('redirecting to login page')
      res.redirect('/login')
    })
  }
}


module.exports = usersController
