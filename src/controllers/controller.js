const bcrypt = require('bcrypt')
const personModel = require('../schema/person')
const subjectModel = require('../schema/subject')
const classModel = require('../schema/class')
const jwt = require('jsonwebtoken')
 
const hashpassword = async (pass) => {
    let hash = await bcrypt.genSalt(10);
    let password = await bcrypt.hash(pass,hash)
    return password;
}
const ValidateToken = async(req,res,next) => {
    const {auth} = req.headers
    try {
        var decoded = await jwt.verify(auth,"test")
        const person = await personModel.findById(decoded.id)
        if (person) {
            req.person = person
            next()
        }else {
            res.status(200).json({
                message:"Failed"
            })
        }
    }catch {
        res.status(200).json({
            message:"Failed to verify, please login again"
        })
    }
}
const signup = async (req,res) => {
    const psd = await hashpassword(req.body.password)
    try {
        const person = await personModel.create({
            name:req.body.name,
            password:psd,
            category:parseInt(req.body.category)
        })
        const payload = {
            id:person._id
        }
        const token = jwt.sign(payload,"test")
        res.json({
            auth:token,
            category:person.category
        })
    }catch (e) {
        console.log(e)
        res.status(200).json({
            message:"Failed"
        })
    }
   
}

const login = async (req,res) => {
    const {name,password} = req.body
    var person = await personModel.findOne({name:name})
    if(person) {
        var res2 = await bcrypt.compare(password,person.password)
        if(res2==false) return res.status(200).json({message:"Failed"})
        const payload = {
            id:person._id
        }
        const token = jwt.sign(payload,"test")
        res.json({
            auth:token,
            category:person.category
        })
    }else {
        res.status(200).json({
            "message":"Failed"
        })
    }
}


const viewAttendance = async (req,res) => {
    if(req.person.category===1 || req.person.category===undefined) return res.status(200).json({message:"Only students can access this route."})

    try {
        const subj =await subjectModel.findOne({name:req.body.subject})
        if(subj) {
            const classes = await classModel.find({subjectID:subj._id})
            output = []
            classes.forEach(async Class =>{
                tmp = {
                    date:Class.date,
                    startTime:Class.startTime,
                    endTime:Class.endTime
                }
                if(Class.attendees.indexOf(req.person._id)!= -1){
                    tmp.attended = true
                }else {
                    tmp.attended = false
                }
                output.push(tmp)
            })
            res.json({
                classes:output,
                subjectName:subj.name
            })
        }
    }catch {
        res.status(200).json({
            message:"Failed"
        })
    }
}

const viewClasses = async (req,res) => {
    if(req.person.category===0 || req.person.category===undefined) return res.status(200).json({message:"Only teachers can access this route"})
    try {
        const subject = await subjectModel.findOne({name:req.body.subject})
        const classes =await classModel.find({subjectID:subject._id})
        output =[]
        classes.forEach(Class => {
            tmp = {
                date:Class.date,
                startTime:Class.startTime,
                endTime:Class.endTime,
                numberOfStudents: Class.attendees.length
            }
            output.push(tmp)
        })
        res.json({
            classes:output
        })
    }catch {
        res.status(200).json({
            message:"Failed"
        })
    }
}

const markAttendance = async(req,res) => {
    if(req.person.category===0 || req.person.category===undefined) return res.status(200).json({message:"Only teachers can access this route"})
    try {
        const subject = await subjectModel.findOne({name:req.body.subject})
        const Class = await classModel.create({
            subjectID: subject._id,
            teacherID:req.person._id,
            attendees: req.body.attendees,
            startTime:req.body.startTime,
            endTime:req.body.endTime
        })
        res.json({
            message:"Success"
        })
    }catch {
        res.status(200).json({
            message:"Failed"
        })
    }
}

// Helper functions
const getStudents = async(req,res) => {
    const students= await personModel.find({category:0})
    output =[]
    students.forEach(student => {
        tmp = {
            studentID : student._id,
            name:student.name
        }
        output.push(tmp)
    })
    res.json({
        students:output
    })
}
const getSubjects = async (req,res) => {
    const Subjects = await subjectModel.find()
    res.json({
        Subjects
    })
}

const addSubjects = async (req,res) => {
    try {
        const Subject = await subjectModel.findOne({name:req.body.subject})
        if(req.person.subjects.indexOf(Subject._id)=== -1) {
            req.person.subjects.push(Subject._id)
        }
        await req.person.save()
        res.json({message:'ADDED'})
    }catch {
        res.status(200).json({message:"Failed"})
    }
   
}
module.exports = {
    signup,
    login,
    viewAttendance,
    viewClasses,
    markAttendance,
    getStudents,
    getSubjects,
    ValidateToken,
    addSubjects
}