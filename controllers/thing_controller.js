let Thing = require('../models/thing')
let User = require('../models/user')


let thing = {

    list: (req, res, next) => {
      Thing.find({})
        .populate('userId')
        .exec(
          (err, output) => {
            if (err) next(err)
            res.render('things/', {
              things: output
            })
          })
    },

    new: (req, res) => {
      User.find({},
          (err, output) => {
            if (err) throw err
            console.log(output)
            res.render('things/new', {
              users: output
            })
          })
        },

        create: (req, res) => {
          console.log(req.body.userId)
          let newThing = new Thing({
            thingId: req.body.thingId,
            name: req.body.name,
            userId: req.body.userId
          })

          newThing.save((err, savedEntry) => {
            if (err) throw err
            res.redirect('/things')
          })
        },

        show: (req, res) => {
          // Thing.findById(req.params.id)
          // .populate('userId')
          // .exec(
          //   (err, output) => {
          //     if (err) throw err
          //
          //     res.send(output)
          //
          //   })
        },

        edit: (req, res) => {
          Thing.find({},
            (err, output2) => {
              if (err) throw err

              let productList = output2

              // Thing.findById(req.params.id)
              // .populate('productId')
              // .exec(

              res.render('things/edit', {
                things: output,
                // products: productList,
                // customers: customerList


              })
            })
        },

        update: (req, res) => {
          Thing.findOneAndUpdate({
            _id: req.params.id
          }, {
            thingId: req.body.thingId,
            // imageUrl: req.body.imageUrl,
            // productId: req.body.productId,
            // customerId: req.body.customerId
          }, (err, thing) => {
            if (err) throw err
            res.redirect('/things/' + thing.id)
          })
        },

        delete: (req, res) => {
          Thing.findByIdAndRemove(req.params.id, (err, output) => {
            if (err) throw err
            res.redirect('/thing')
          })
        }

    }

    module.exports = thing
