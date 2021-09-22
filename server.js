//Dependencies
const express = require('express')
const app = express()
const PORT = 3000
const methodOverride = require('method-override')


//Setup Mongoose Database
const mongoose = require('mongoose')
const BuData1 = require('./models/data')  
const mongoURI = 'mongodb://localhost:27017/logger'
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
app.get('/index', (req,res) => {
BuData1.find({}, (error, spreadsheet) => {
    res.render('index.ejs', {
        data:spreadsheet
    })
})
})

app.get('/index/new', (req,res) => {
    res.render('new.ejs')
})

app.get('/index/:id/edit', (req,res) => {
        BuData1.findById(req.params.id, (error, record) => {
            res.render('edit.ejs', {
                data:record
            })
        })
   
})

app.get('/index/:id', (req,res) => {
    BuData1.findById(req.params.id, (error, record) => {
        res.render('show.ejs', {
            data:record
        })
    })
    })

app.post('/index', (req,res) => {
    BuData1.create(req.body, (error, newSpreadsheet) =>{
if(error) {
    console.log(error)
} else {
    console.log(newSpreadsheet)
    res.redirect('/index')
}

    })
})

app.delete('/index/:id', (req, res) => {
    BuData1.findByIdAndDelete(req.params.id, (error, deletedSpreadsheet) => {
      // findByIdAndDelete will delete a document with a given id
      if (error) {
        console.log(error)
        res.send(error)
      } else {
       // redirect to the index page if the delete successful
       res.redirect('/index')
      }
    })
  })

app.put('/index/:id', (req, res) => {
    BuData1.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {
            new: true,
          },
        (error, updateRecord) => {
      // findByIdAndDelete will delete a document with a given id
      if (error) {
        console.log(error)
        res.send(error)
      } else {
       // redirect to the index page if the delete successful
       res.redirect('/index')
      }
    })
  })


//Listeners
app.listen(PORT, () => {
    console.log(`Server is connected on PORT: ${PORT}`)
})


