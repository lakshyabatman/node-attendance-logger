const express = require('express')
const mongoose = require('mongoose')
const indexRoutes = require('./routes/index.routes')
const path = require('path')
const bodyParser = require('body-parser')
const url = bodyParser.urlencoded({extended:false})
mongoose.connect(process.env.mongURL,{useNewUrlParser:true})
const app = express()
app.use(url)
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,"public")))
app.set("views",path.join(__dirname,'views'))
app.set("view engine","ejs")


var PORT = process.env.PORT || 3000
app.use(indexRoutes)
var server_host = process.env.YOUR_HOST || '0.0.0.0';

app.listen(PORT,() => {
    console.log("Server running!")
})