//Dependencies
const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const methodOverride = require('method-override')

//Setup Mongoose Database
const mongoose = require('mongoose')
const BuData1 = require('./models/data')  
const mongoURI = process.env.MONGODB_URI
const db = mongoose.connection
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, () => {
    console.log('the connection with mongod is established');
  })

db.on('error', (err) => console.log(err.message + ' is mongod not running?'))
db.on('connected', () => console.log('mongo connected: ', mongoURI))
db.on('disconnected', () => console.log('mongo disconnected'))
//Middlewares
// this will parse the data and create the "req.body object"
app.use(express.urlencoded({ extended: true }))
// This will allow us to make DELETE and PUT requests
app.use(methodOverride('_method'))
app.use(express.static('public'))

//Controllers

const indexController = require('./controllers/index')
app.use('/index', indexController)


//Listeners
app.listen(PORT, () => {
    console.log(`Server is connected on PORT: ${PORT}`)
})



