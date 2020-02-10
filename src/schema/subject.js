const Schema = require('mongoose').Schema
const mongoose = require('mongoose')
const subject = new Schema({
    name:{
        type:String,
        unique:true
    }
})

subjectModel = mongoose.model("Subject",subject)
module.exports = subjectModel