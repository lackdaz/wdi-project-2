// express set up
var express = require('express')
var app = express()
var port = process.env.PORT || 5000

// mongoose setup
var dbURI = 'mongodb://admin:admin@ds157740.mlab.com:57740/mymdb'
var mongoose = require('mongoose')
mongoose.connect(dbURI)

// check if the connection is okay
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('really, really connected')
});
=======
var port = process.env.PORT || 4000

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

// setup body parser
var bodyParser = require('body-parser')

// transform form data to req.body
app.use(bodyParser.urlencoded({
  extended: true
}))

// transform json data to req.body
app.use(bodyParser.json())

app.get('/',function (req,res){
  res.send('homepage')
})

app.get('/', function (req, res) {
  res.render('')
})

// setup the ejs template
app.set('view engine', 'ejs')

// setup the method override
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

// require the movies_controller
var moviesController = require('./controllers/movies_controller')
app.use(moviesController)

app.use(function (req, res) {
  res.send('error found')
})

app.listen(port, function () {
  console.log('app is running at ' + port)
})
