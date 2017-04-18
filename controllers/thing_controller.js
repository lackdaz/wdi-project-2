let Thing = require('../models/thing')
let User = require('../models/user')
let User = require('../models/user')


let thing = {

  list: (req, res, next) => {
    Thing.find({})
    .populate('productId')
    .populate('customerId')
    .exec(
     (err, output) => {
       if (err) next(err)
       res.render('things/', { things: output })
     })
  },

  new: (req, res) => {
    Thing.find({},
      (err, output2) => {
        if (err) throw err

        let productList = output2

        Customer.find({})
        .populate('customerId')
        .exec(
          (err, output) => {
            if (err) throw err
            res.render('device/new', {
              products: productList,
              customers: output

            })
          })
      })
  },

  create: (req, res) => {
    let newThing = new Thing({
      deviceId: req.body.deviceId,
      imageUrl: req.body.imageUrl,
      productId: req.body.productId,
      customerId: req.body.customerId
    })

    newThing.save((err, savedEntry) => {
      if (err) throw err
      res.redirect('/device')
    }
  )
  },

  show: (req, res) => {
    Thing.findById(req.params.id)
    .populate('productId')
    .populate('customerId')
    .exec(
      (err, output) => {
        if (err) throw err

        res.render('device/show', {
              // product: product,
          device: output

        })
      })
  },

  edit: (req, res) => {
    Thing.find({},
      (err, output2) => {
        if (err) throw err

        let productList = output2

        Customer.find({})
        .populate('customerId')
        .exec(
          (err, output3) => {
            let customerList = output3

            if (err) throw err

            Thing.findById(req.params.id)
            .populate('productId')
            .populate('customerId')
            .exec(
              (err, output) => {
                if (err) throw err

                res.render('device/edit', {
                  device: output,
                  products: productList,
                  customers: customerList

                })
              })
          })
      })
  },

  update: (req, res) => {
    Thing.findOneAndUpdate({
      _id: req.params.id
    }, {
      deviceId: req.body.deviceId,
      imageUrl: req.body.imageUrl,
      productId: req.body.productId,
      customerId: req.body.customerId
    }, (err, device) => {
      if (err) throw err
      res.redirect('/device/' + device.id)
    })
  },

  delete: (req, res) => {
    Thing.findByIdAndRemove(req.params.id, (err, output) => {
      if (err) throw err
      res.redirect('/device')
    })
  }

}

module.exports = deviceController
