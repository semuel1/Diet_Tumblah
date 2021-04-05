// Required Modules
const express = require('express')
const rowdy = require('rowdy-logger')
const morgan = require('morgan')
require('dotenv').config()
require('./models')

// Variables
const app = express()
const PORT = process.env.PORT || 3001
const rowdyResults = rowdy.begin(app)

// Middleware
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.json({ msg: 'hello world! '})
})

// Listen!
app.listen(PORT, () => {
    rowdyResults.print()
    console.log(`Server listening on port ${PORT} 🌊`)
})