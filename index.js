require('dotenv').config()

const express = require('express')
const cors = require('cors')

const db = require('./db/connection')
const router = require('./Router/routes')

const server = express()

server.use(cors())
server.use(express.json())

server.use(router)

const PORT = 4000 || process.env.PORT

server.listen((PORT),(req,res)=>{
    console.log("Server is running on Port " +PORT);
}) 

server.get('/',(req,res)=>{
    res.send('Get method')
})