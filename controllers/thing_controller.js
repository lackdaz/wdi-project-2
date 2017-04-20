let Thing = require('../models/thing')
let User = require('../models/user')


let thing = {

  list: (req, res, next) => {
    Thing.find({owner: res.locals.currentUser._id})
      .populate('userId')
      .populate('owner')
      .exec(
        (err, output) => {
          if (err) next(err)
          res.render('things/', {
            things: output
          })
        })
  },

  new: (req, res) => {
    User.find({related: res.locals.currentUser._id},
      (err, output) => {
        if (err) throw err
        console.log(output)
        res.render('things/new', {
          layout: 'layout',
          users: output,
        })
      })
  },

  create: (req, res) => {
    console.log(req.body.userId)
    let newThing = new Thing({
      thingId: req.body.thingId,
      name: req.body.name,
      userId: req.body.userId,
      owner: req.body.owner
    })

    newThing.save((err, savedEntry) => {
      if (err) throw err
      res.redirect('/things')
    })
  },

  show: (req, res) => {
    console.log(req.params)
    Thing.findById(req.params.id)
      .populate('userId')
      .exec(
        (err, output) => {
          if (err) throw err

          res.render('things/show', {
            thing: output
          })

        })
  },

  edit: (req, res) => {
  console.log(req.params)
    Thing.findById(req.params.id)
      .populate('userId')
      .exec(
        (err, output) => {
          if (err) throw console.error(err);
          User.find({related: res.locals.currentUser._id}, (err, output2) => {
                if (err) throw console.error(err)
                res.render('things/edit', {
                  users : output2,
                  thing : output
                })
              }
        )
        }
      )
  },

  // this is a post request
    newUser: (req, res) => {
          res.render('things/newUser', {
        })

    },

  // this is a post request
    createUser: (req,res) => {
      console.log(req.body)
      if(!req.body.name || !req.body.cardUid ){
        req.flash('error', 'Missing some fields');
        res.redirect('/things/user/new')
      } else {
        var newUser = new User({
          cardUid: req.body.cardUid,
          name: req.body.name,
          related: req.body.related,
          email: req.body.email
        })
        newUser.save(function (err, data) {
          if (err) console.error(err)
          req.flash('success','Created new access user')
          res.redirect('/things/new')
        })
      }

    },

  update: (req, res) => {
    console.log(req.body)
    Thing.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      userId: req.body.userId
    }, (err, thing) => {
      if (err) throw err
      res.redirect('/things/')
    })
  },

  delete: (req, res) => {
    Thing.findByIdAndRemove(req.params.id, (err, output) => {
      if (err) throw err
      res.redirect('/things')
    })
  }

}

module.exports = thing
