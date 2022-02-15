const path = require('path')

const express = require('express')
const dotenv = require('dotenv')
const passport = require('passport')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')
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

app.use(function(req, res, next) {
    if (process.env.NODE_ENV === "production") {
        const reqType = req.headers["x-forwarded-proto"];
        // if not https redirect to https unless logging in using OAuth
        if (reqType !== "https") {
            req.url.indexOf("auth/google") !== -1
              ? next()
              : res.redirect("https://" + req.headers.host + req.url);
        } 
    } else {
        next();
    }
});

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