const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log("Database connected successfully")
}).catch((err)=>{
    console.log("Database connection failed "+err);
}) 