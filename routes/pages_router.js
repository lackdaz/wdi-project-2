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
.post(userController.dashboard)

router.route('/')
.get(function(req,res){
    res.render('homepage')
})
.post(function (req, res) {
  res.send('504')
})

router.use(isLoggedIn)

router.route('/logout')
.post(userController.logout)
.get(userController.logout)

/* Dashboard logic */
router.route('/dashboard')
.get(function(req,res){
    res.render('dashboard')
})
.post(function (req, res) {
  res.redirect('dashboard')
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
