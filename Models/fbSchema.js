const mongoose = require('mongoose')

const fbSchema = new mongoose.Schema({
    fbname:{
        type:String,
        required:true
    },
    fbemail :{
        type: String,
        required: true
    },
    fbmsg :{
        type: String,
        required:true
    }
})

const fbs = mongoose.model('fbs',fbSchema)
module.exports = fbs