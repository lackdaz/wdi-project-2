let Event = require('../models/event')

let eventController = {

  list: (req, res) => {
    Event.find({}, function(err,output){
      if (err) next(err)
      res.render('events/', {
        events: output
      })
    })
  },

  new: (req, res) => {

  },

  create: (req, res) => {
  },

  show: (req, res) => {

  },


  edit: (req, res) => {

  },

  update: (req, res) => {

  },

  delete: (req, res) => {
    event.findByIdAndRemove(req.params.id, (err, event) => {
      if (err) throw err
      res.redirect('/event')
    })
  }

}

module.exports = eventController
