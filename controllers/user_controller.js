let User = require('../models/user')

let usersController = {
  index: (req, res) => {
    User.find({}, (err, data) => {
      if (err) throw err
      res.render('homepage', { data })
    })
  },

  new: (req, res) => {
    res.render('users/signup')
  },

  create: (req,res) => {
    console.log(req.body)
    let newUser = new User({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    })
    newUser.save(function (err, output) {
      if (err) throw err
      res.redirect('/todo')
    })
  }
}

// router.route('/register')
// .get(function(req, res) {
// })

// .post(function(req, res) {
//   // create using User method
//   var newUser = new User({
//     email: req.body.email,
//     name: req.body.name,
//     password: req.body.password
//   })
//   newUser.save(function(err,data){
//     if (err) return res.redirect('/register')
//     res.redirect('/')
//   })
// });


module.exports = usersController
