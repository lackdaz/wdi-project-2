const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')

// const todoController = require('../controllers/todo_controller')

router.route('/')
.get(function(req,res){
    res.redirect('/users')
})

router.route('/users')
.get(userController.index)
.post(userController.create)

router.route('/users')
.get(userController.new)

router.route('/users/new')
.get(userController.new)

// router.route('/:id')
// .get(todoController.listOne) // show => get specific todo
// .put(todoController.update) // update => update existing todo
// .delete(todoController.delete) // delete

// router.get('/new', todoController.new)
// router.get('/:id/edit', todoController.edit)


module.exports = router
