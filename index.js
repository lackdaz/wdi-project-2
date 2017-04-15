// express set up
var express = require('express')
var app = express()
var port = process.env.PORT || 5000

// mongoose setup
var dbURI = process.env.PROD_MONGODB || 'mongodb://localhost:27017/mymdb'
var mongoose = require('mongoose')
mongoose.connect(dbURI)

// check if our connection is okay
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
  console.log('really really connected')
})
mongoose.promise = global.Promise

// setup body parser
var bodyParser = require('body-parser')

// transform form data to req.body
app.use(bodyParser.urlencoded({
  extended: true
}))

// transform json data to req.body
app.use(bodyParser.json())

// setup the ejs template
app.set('view engine', 'ejs')

// setup the method override
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

// require the ejs layouts
var expressLayout = require('express-ejs-layouts')
app.use(expressLayout)

// route for forms
const pagesRouter = require('./routes/pages_router')
app.use('/', pagesRouter)

// app.use('/login', require('./controllers/auth'))

// middleware
app.use(express.static('public'))

app.use(function (req, res) {
  res.send('error found')
})

app.listen(port, function () {
  console.log('app is running at ' + port)
})

// var server
// if (process.env.NODE_ENV === 'test') {
//   server = app.listen(process.env.PORT || 4000)
// } else {
//   server = app.listen(process.env.PORT || 3000)
// }
