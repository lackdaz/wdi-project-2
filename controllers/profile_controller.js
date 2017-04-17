let Product = require('../models/product')

let productController = {

  list: (req, res) => {
    Product.find({}, (err, output) => {
      if (err) throw err
      res.render('product/index', { products: output })
    })
  },

  new: (req, res) => {
    // res.send('new')
    res.render('product/new')
  },

  create: (req, res) => {
    // let deviceId = req.params.id
    // console.log(deviceId);
    // res.send(deviceId)

    let newProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl
    })
    newProduct.save(function (err, savedEntry) {
      if (err) throw err
        res.redirect('/product')
    })

  },

  show: (req, res) => {
    Product.findById(req.params.id, (err, output) => {
      if (err) throw err
      res.render('product/show', { product: output })
    })
  },


  edit: (req, res) => {
    Product.findById(req.params.id, (err, output) => {
      if (err) throw err
      res.render('product/edit', { product: output })
    })
  },

  update: (req, res) => {
    Product.findOneAndUpdate({
      _id: req.params.id
    }, {
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl
      //john
    }, (err, product) => {
      if (err) throw err
      res.redirect('/product/' + product.id)
    })
  },

  delete: (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, product) => {
      if (err) throw err
      res.redirect('/product')
    })
  }

}

module.exports = productController
