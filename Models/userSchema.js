const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    uname: {
        type: String,
        required: [true, 'Please provide a username'],
        min :[3]
    },
    phn:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique: true,
        required: true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new console.error("Enter a valid Email Id");
            }
        }
    },
    password:{
        type: String,
        required: [true,'Please provide a password'],

    }
})

const users = mongoose.model('users',userSchema)
module.exports = users