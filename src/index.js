require('dotenv').config()
const express = require('express')
const server = express()
const port = process.env.PORT
const userRoute = require('./routes/userRoute')

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use('/', userRoute)

server.listen(port)