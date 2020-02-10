const route = require('express').Router()
const controller = require('../controllers/controller')
const jwt = require('jsonwebtoken')

const personModel = require('../schema/person')
// Signup, root and login routes
route.get("/",(req,res) => {
    res.redirect("login.html")
})


route.post("/signup",controller.signup)
route.post("/login",controller.login)

// Will be adding jwt middleware


route.use(controller.ValidateToken)


route.post("/viewSubjects",async (req,res) => res.json({ subjects:req.person.subjects}))


// Only for students
route.post("/viewAttendance",controller.viewAttendance)

// Only for teachers

route.post("/viewClasses",controller.viewClasses)

route.post("/markAttendance",controller.markAttendance)

// Helper routes

route.get("/getStudents",controller.getStudents)
route.get("/getSubjects",controller.getSubjects)
route.post("/addSubjects",controller.addSubjects)
module.exports = route