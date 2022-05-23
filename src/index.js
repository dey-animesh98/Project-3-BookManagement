const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const AWS = require('aws-sdk')
const app = express()
const port = 3000
const route = require('./Routers/routes');
const { AppConfig } = require('aws-sdk');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multer().any())

mongoose.connect("mongodb+srv://animesh-dey98:9I9JRLwql3bINqUX@cluster0.vhmqo.mongodb.net/group32Database", {
    useNewUrlParser: true
})

    .then(() => console.log("MongoDB is Connected."))
    .catch((err) => console.log(err.message))

app.use('/', route);


app.listen(process.env.PORT || port, function () {
    console.log("Express app is running on ", process.env.PORT || port)
})