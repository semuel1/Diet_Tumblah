// Required Modules
require('dotenv').config()
const express = require('express')
const rowdy = require('rowdy-logger')
const morgan = require('morgan')
const cors = require('cors')
const googlePassport = require('./config/googlePpConfig')
require('./models')

// Variables
const app = express()
const PORT = process.env.PORT || 3001
const rowdyResults = rowdy.begin(app)

// Middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/client/build/'))
// Initialize passport
app.use(googlePassport.initialize())

// Controllers
app.use('/auth', require('./controllers/authController'))

// Routes
app.get('/', (req, res) => {
    res.json({ msg: 'Hello world!' })
})

// Listen!
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`Server listening on port ${PORT} 🌊`)
})