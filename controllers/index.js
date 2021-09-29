const express = require('express')

const router = express.Router()

const multer = require('multer')
const fileStorageEngine = multer.diskStorage({
  //destination for files
  destination: (req, file, callback) => {
    callback(null, './public/xls')
  },
  //add extension to name
  filename: (request,file,callback) => {
  callback(null, Date.now() + file.originalname)
  }

})
const upload = multer({storage: fileStorageEngine})



// making an instance of express router
const BuData1 = require('../models/data')  

router.get('/', (req,res) => {
    BuData1.find({}, (error, spreadsheet) => {
        res.render('index.ejs', {
            data:spreadsheet
        })
    })
    })
    
router.get('/new', (req,res) => {
        res.render('new.ejs')
    })
    
router.get('/:id/edit', (req,res) => {
            BuData1.findById(req.params.id, (error, record) => {
                res.render('edit.ejs', {
                    data:record
                })
            })
       
    })
    
router.get('/:id', (req,res) => {
        BuData1.findById(req.params.id, (error, record) => {
            res.render('show.ejs', {
                data:record
            })
        })
        })
    
router.post('/', upload.single('excel'), (req,res) => {
        BuData1.create(req.body, (error, newSpreadsheet) =>{
    if(error) {
        console.log(error)
    } else {
        console.log(newSpreadsheet)
        res.redirect('/index')
    }
    
        })
    })
    
router.delete('/:id', (req, res) => {
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
    
router.put('/:id', (req, res) => {
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
    
module.exports = router
    