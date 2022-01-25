require('dotenv').config()
const express = require('express')
const server = express()
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRouter')

server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use('/', userRoute)
server.use('/auth', authRoute)

server.listen(process.env.PORT)