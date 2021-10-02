const mongoose = require('mongoose')

const { Schema , model } = mongoose

const LoggerSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    plImpact: {type: Number, required: false},
    source: {type: String, required: true},
    location: {type: String, required: true},
    reportingUnit: {type: String, required: false},
    preparer: {type: String, required: false},
    reviewer: {type: String, required: false},
    // amount: {type: String, required: false},
    // policy: {type: String, required: false},
    // reviewDate: {type: String, required: false},
    // comment: {type: String, required: false},

  })
  
  // "model()" will initialized the collection
  //            collection name
  const BuData1 = model('BuData1', LoggerSchema)
  
  module.exports = BuData1