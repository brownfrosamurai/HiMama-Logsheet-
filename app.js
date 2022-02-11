const path = require('path')

const express = require('express')
const dotenv = require('dotenv')
const passport = require('passport')
const morgan = require('morgan')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const xss = require('xss-clean')
const helmet = require('helmet')
const hpp = require('hpp')
const mongoSanitize = require('express-mongo-sanitize');
const { engine } = require('express-handlebars')

const connectDB = require('./config/db')
const { formatDate } = require('./utils/handlebars')

dotenv.config({ path: './config/config.env' })

// Passport config 
require('./config/passport')(passport)

// Connect to database 
connectDB()

// Initialize express application 
const app = express()

// Log request
app.use(morgan('combined'))

// Sanitize data
app.use(mongoSanitize());

// Set security headers
// app.use(helmet());

// Prevent cross site scripting (XSS attacks)
app.use(xss());

// Body paser 
app.use(express.urlencoded({ extended: false }))

app.use(express.json())

// Handlebars 
// Initialize view engine 
app.engine('handlebars', engine({ helpers: { formatDate }, defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Sessions 
app.use(session({
    secret: 'katana cut',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}))

// Set up Passport middleware 
app.use(passport.initialize())
app.use(passport.session())

// Set global variable 
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

// Set up static files 
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', './views');

// Routes 
app.use('/', require('./routes/index'))
app.use('/timelogs', require('./routes/timelogs'))
app.use('/auth', require('./routes/auth'))

app.get('/*', (req, res) => {
    res.render('errors/404')
})

module.exports = app