const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')


//registration
exports.register = async (req, res) => {
    const { uname, phn, email, password } = req.body;
    console.log(uname, phn, email, password);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            return res.status(401).json("User Already exists..Please Login!")
        }
        else {
            const newUser = new users({
                uname: uname,
                phn: phn,
                email: email,
                password: password
            })

            await newUser.save()

            return res.status(200).json(newUser)
        }
    }
    catch (err) {
        return res.status(501).json(err)
    }
}

//login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, "superkey2023")

            return res.status(200).json({ existingUser, token })
        } else {
            return res.status(404).json("Invalid Email or Password.")
        }
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

//get all users
exports.allUsers = async (req, res) => {
    try {
        const userData = await users.find()
        console.log(userData);
        return res.status(200).json(userData)
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

//del user
exports.deluser = async(req,res)=>{
    const _id = req.params._id
    console.log(_id);

    try{
        const result = await users.deleteOne({_id})

        if(result.deletedCount == 0){
            return res.status(404).json('No User Found')
        }

        return res.status(200).json('User Deleted Successfull')
    }
    catch(err){
        return res.status(500).send(err)
    }
}
