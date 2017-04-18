const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')

// const todoController = require('../controllers/todo_controller')

/* Authentication start here */
router.route('/signup')
.get(userController.new)
.post(userController.create)

router.route('/login')
.get(userController.login)

/* Authentication gateway logic */
router.route('/')
.get(function(req,res){
    res.render('homepage')
})

.post(function (req, res) {
// res.send('post signup')
console.log(res.body)
if(!req.body.email || !req.body.password ){
  req.flash('flash',{
    type: 'error',
    message: 'Please fill in the fields'
  })
  res.redirect('/signup')
  }

  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: 'Invalid username and/or password',
    successFlash: 'You have logged in'
  })

  return signupStrategy(req, res)
})


function isAdmin (req, res, next) {
  if (req.user.isAdmin === true) return next()
  console.log("failed authentication")

  req.flash('flash', {
    type: 'error',
    message: 'You have to log in'
  })
  res.send('Error! You do not have access privileges')
}


function isLoggedIn (req, res, next) {
 if (req.isAuthenticated()) return next()
 console.log("failed authentication")

 req.flash('flash', {
   type: 'error',
   message: 'You have to log in'
 })
 res.redirect('/')
}



//
// router.route('/users')
// .get(userController.index)
// .post(userController.create)
//
// router.route('/users')
// .get(userController.new)
//
// router.route('/users/new')
// .get(userController.new)


// router.route('/:id')
// .get(todoController.listOne) // show => get specific todo
// .put(todoController.update) // update => update existing todo
// .delete(todoController.delete) // delete

// router.get('/new', todoController.new)
// router.get('/:id/edit', todoController.edit)


module.exports = router
