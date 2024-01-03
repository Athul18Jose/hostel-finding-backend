const fbs = require('../Models/fbSchema')

//add feedbacks
exports. addfb = async(req,res)=>{
    const {fbname, fbemail, fbmsg} = req.body
    try{
        const newfb = new fbs({
            fbname,
            fbemail,
            fbmsg
        })

        await newfb.save()
       return res.status(200).json(newfb)
    }
    catch(err){
        return res.status(500).json(err)
    }
}

//get feedbacks
exports. getfb = async(req,res)=>{
    try{
        const allfb = await fbs.find()
        return res.status(200).json(allfb)
    }
    catch(err){
        return res.status(500).json(err)
    }
}

//delete feedback
exports.delfb = async(req,res)=>{
    const id= req.params.id;
console.log(id);
    try{
        const result = await fbs.deleteOne({_id:id})

        if(result.deletedCount == 0){
            return  res.status(404).json("No Feedback Found!")
        }
        
        return res.status(200).json('Feedback Deleted Successfull')
        
    }
    catch(err){
        return res.status(500).send(err)
    }
}
