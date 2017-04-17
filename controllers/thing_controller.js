let Device = require('../models/device')
let Product = require('../models/product')
let Customer = require('../models/customer')

let deviceController = {

  list: (req, res, next) => {
    Device.find({})
    .populate('productId')
    .populate('customerId')
    .exec(
     (err, output) => {
       if (err) next(err)
       res.render('device/', { devices: output })
     })
  },

  new: (req, res) => {
    Product.find({},
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
    let newDevice = new Device({
      deviceId: req.body.deviceId,
      imageUrl: req.body.imageUrl,
      productId: req.body.productId,
      customerId: req.body.customerId
    })

    newDevice.save((err, savedEntry) => {
      if (err) throw err
      res.redirect('/device')
    }
  )
  },

  show: (req, res) => {
    Device.findById(req.params.id)
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
    Product.find({},
      (err, output2) => {
        if (err) throw err

        let productList = output2

        Customer.find({})
        .populate('customerId')
        .exec(
          (err, output3) => {
            let customerList = output3

            if (err) throw err

            Device.findById(req.params.id)
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
    Device.findOneAndUpdate({
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
    Device.findByIdAndRemove(req.params.id, (err, output) => {
      if (err) throw err
      res.redirect('/device')
    })
  }

}

module.exports = deviceController
