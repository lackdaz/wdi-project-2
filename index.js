// express set up
var express = require('express')
var app = express()
var port = process.env.PORT || 5000
require('dotenv').config({
  silent: true
})


// mongoose setup
var dbURI = process.env.PROD_MONGODB || 'mongodb://localhost:27017/unit2'
var mongoose = require('mongoose')
mongoose.promise = global.Promise
mongoose.connect(dbURI)

// check if our connection is okay
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
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

// setup the session
// store the session into mongodb
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 3600000
  },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: dbURI,
    autoReconnect: true
  })
}))


// passport comes after session
// initialise passport into your application
var passport = require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

// Initialising for flash
var flash = require('connect-flash')
app.use(flash())
app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// setup the method override
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

// setup the ejs template
app.set('view engine', 'ejs')

// require the ejs layouts
var expressLayout = require('express-ejs-layouts')
app.use(expressLayout)

// MQTT Initialize
let Event = require('./models/event')
var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://m10.cloudmqtt.com', {
  port: 11719,
  username: "oldvydio",
  password: "EjIAU6OfpIEn",
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8)
})

client.on('connect', function() {
  client.subscribe('outTopic')
  // client.publish('outTopic', 'Hello mqtt')
})

client.on('message', function(topic, message) {
  // message is Buffer
  let newEvent = new Event({
    uid: message.toString()
  })
  newEvent.save(function(err, savedEntry) {
    if (err) throw console.error(err)
    console.log('saved new event!')
  })
})


/* ------------------
Routes start here
-------------------- */
// middleware

app.use(express.static('public'))

// route for forms
const pagesRouter = require('./routes/pages_router')
app.use('/', pagesRouter)

// app.use('/login', require('./controllers/auth'))

app.use(function(req, res) {
  res.send('error found')
})

app.listen(port, function() {
  console.log('app is running at ' + port)
})

// var server
// if (process.env.NODE_ENV === 'test') {
//   server = app.listen(process.env.PORT || 4000)
// } else {
//   server = app.listen(process.env.PORT || 3000)
// }
