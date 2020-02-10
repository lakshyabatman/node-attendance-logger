const express = require('express')
const mongoose = require('mongoose')
const indexRoutes = require('./routes/index.routes')
const path = require('path')
const bodyParser = require('body-parser')
const url = bodyParser.urlencoded({extended:false})
mongoose.connect("mongodb://localhost/attendance",{useNewUrlParser:true,useUnifiedTopology:true})
const app = express()
app.use(url)
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,"public")))
app.set("views",path.join(__dirname,'views'))
app.set("view engine","ejs")



app.use(indexRoutes)
app.listen(3000,() => {
    console.log("Server running")
})