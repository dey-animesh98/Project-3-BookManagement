const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
require('colors')
require('dotenv').config()

const app = express()
const route = require('./Routers/routes');
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(multer().any())
app.use('/', route);

mongoose.connect(process.env.CONNECT_MONGODB, { useNewUrlParser: true })

    .then(() => console.log("MongoDB is Connected ✔️".rainbow))
    .catch((err) => console.log(`${err.message}`.bgRed.white))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`.rainbow))