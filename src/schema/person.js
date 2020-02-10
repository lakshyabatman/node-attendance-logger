const Schema = require('mongoose').Schema
const mongoose = require('mongoose')
const person = new Schema({
    name:{
        type:String,
        unique:true
    },
    password: {
        type:String
    },
    subjects:{
        type: [Schema.Types.ObjectId],
        default:[]
    },
    category:{
        type:Number
    }

})

const personModel = mongoose.model("Person",person)

module.exports = personModel