const Auth = require('./routes/auth_router')
app.use('/', Auth)

var Product = require('./models/product')
var Device = require('./models/device')
app.get('/', (req,res,next)=>{
  Device.find({}, (err, output) => {
    if (err)  next(err)
    res.render('index', { devices: output })
  })
})

const order = require('./routes/order_router')
app.use('/order', order)

const product = require('./routes/product_router')
app.use('/product', product)

const device = require('./routes/device_router')
app.use('/device', device)

const customer = require('./routes/customer_router')
app.use('/customer', customer)
