// express set up
var express = require('express')
var app = express()
var port = process.env.PORT || 5000
require('dotenv').config({ silent: true })


// mongoose setup
var dbURI = process.env.PROD_MONGODB || 'mongodb://localhost:27017/unit2'
var mongoose = require('mongoose')
mongoose.promise = global.Promise
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

// // setup the session
// // store the session into mongodb
// var session = require('express-session')
// var MongoStore = require('connect-mongo')(session)
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   store: new MongoStore({ url: process.env.MONGODB_URI })
// }))
//
// // setup the flash data
// var flash = require('connect-flash')
// app.use(flash())

// Initialising for flash
var session = require('express-session')
var MongoStore = require('connect-mongo')(session) // connect-mongo need session
var flash = require('connect-flash')
var cookieParser = require('cookie-parser')
var passport = require('passport')

app.use(cookieParser(process.env.SESSION_SECRET))
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 3600000 },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true
  })
}))

// passport comes after session
// initialise passport into your application
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

app.use(flash())

// setup the ejs template
app.set('view engine', 'ejs')

// setup the method override
var methodOverride = require('method-override')
app.use(methodOverride('_method'))

// require the ejs layouts
var expressLayout = require('express-ejs-layouts')
app.use(expressLayout)

/* ------------------
Routes start here
-------------------- */

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
