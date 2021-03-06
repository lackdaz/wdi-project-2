// express set up
var express = require('express')
var app = express()
var port = process.env.PORT || 5000
require('dotenv').config({
  silent: true
})
app.use(express.static('public'))

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
  res.locals.authenticated =  req.isAuthenticated()
  // res.locals.isAdmin = req.isAdmin()
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


var mqtt = require('mqtt')

// route for websocket
require('./controllers/MQTT_server')(mqtt)

/* ------------------
Routes start here
-------------------- */
// middleware


// route for forms
const pagesRouter = require('./routes/pages_router')
app.use('/', pagesRouter)

// route for web sockets
const mqttRouter = require('./routes/MQTT_router')
app.use('/mqtt', mqttRouter)

// app.use('/login', require('./controllers/auth'))

app.use(function(req, res) {
  res.render('404')
})

// start the server listening for connections by client sockets

app.listen(port, function() {
  console.log('app is running at ' + port)
})

// var server
// if (process.env.NODE_ENV === 'test') {
//   server = app.listen(process.env.PORT || 4000)
// } else {
//   server = app.listen(process.env.PORT || 3000)
// }
