const mongoose = require('mongoose')
const Schema = mongoose.Schema
const classSchema = new Schema({
    subjectID:{
        type:Schema.Types.ObjectId
    },
    teacherID: {
        type:Schema.Types.ObjectId
    },
    date:{
        type:Date
    },
    startTime: {
        type: Date
    },
    endTime: {
        type:Date
    },
    attendees : {
        type: [Schema.Types.ObjectId],
        default:[]
    }
})

const classModel = mongoose.model('Class',classSchema)
module.exports = classModel