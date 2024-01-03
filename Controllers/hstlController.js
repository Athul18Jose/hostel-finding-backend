const hstls = require('../Models/hstlSchema')

//add hstls
exports.addHstl = async (req, res) => {
   const { owner, phn, hstlname, minRent, category, desc, address,
      If, Iwf, IIf, IIwf, IVf, IVwf, Vf, Vwf, img1, img2, img3, img4, img5 } = req.body

   try {
      const newHstl = new hstls({
         owner, phn, hstlname, minRent, category, desc, address,
         If, Iwf, IIf, IIwf, IVf, IVwf, Vf, Vwf, img1, img2, img3, img4, img5
      })

      await newHstl.save()
      return res.status(200).json(newHstl)
   } catch (err) {
      return res.status(500).json("Error addHStl " + err)
   }
}

//get all hstls
exports.getAllHstls = async(req,res)=>{
   try{
      const allHstl = await hstls.find()
      return res.status(200).json(allHstl)
   }catch(err){
      return res.status(500).json(err)
   }
}

//get one hstl details
exports.getOneHstl = async(req,res)=>{
   const _id = req.params.id;
   console.log(_id);
   try{
      const oneHstl = await hstls.findOne({_id})
      if(!oneHstl){
         return res.status(404).json("No HSTL found")
      }
      else{
         return res.status(200).json(oneHstl)
      }
   }
   catch(err){
      return res.status(500).json("Cannot get the hstl details")
   }
}

//get hstls by address
exports.getHstlsByAddress = async(req,res)=>{
   const address = req.params.address;
   try{
      const hstlsByAddress = await hstls.find({ address: { $regex: new RegExp(address, 'i') } }).limit(4);

      if(hstlsByAddress.length === 0){
         return res.status(404).json("No HSTL found with the given address");
      } else {
         return res.status(200).json(hstlsByAddress);
      }
   } catch(err){
      return res.status(500).json("Error fetching HSTL details by address: " + err);
   }
}

//get hstls by category and address
exports.getHstlsCatandAdd = async(req,res)=>{
   const {category, address} = req.params;

   try{
      let query ={
         address:{ $regex : new RegExp(address,'i')}
      }

      if(category !== 'all'){
         query.category = category
      }

      const result = await hstls.find(query)
      return res.status(200).json(result)
   }catch(err){
      return res.status(500).json("Server error while getting data from DB "+err);
   }
}

//edit hstls
exports.editHstl = async(req,res)=>{
   const _id =req.params._id
   console.log(_id);

   const { owner, phn, hstlname, minRent, category, desc, address,
      If, Iwf, IIf, IIwf, IVf, IVwf, Vf, Vwf, img1, img2, img3, img4, img5 } = req.body

      const existingHstl = await hstls.findOne({_id})
      if(!existingHstl){
         return res.status(404).json("Hostel not found with the ID")
      }
      else{
         existingHstl.owner = owner;
         existingHstl.phn=phn;
         existingHstl.hstlname=hstlname;
         existingHstl.minRent=minRent;
         existingHstl.category=category;
         existingHstl.desc=desc;
         existingHstl.address=address;
         existingHstl.If = If;
         existingHstl.Iwf = Iwf;
         existingHstl.IIf = IIf;
         existingHstl.IIwf = IIwf;
         existingHstl.IVf = IVf;
         existingHstl.IVwf = IVwf;
         existingHstl.Vf = Vf;
         existingHstl.Vwf = Vwf;
         existingHstl.img1 = img1;
         existingHstl.img2 = img2 ;
         existingHstl.img3 = img3;
         existingHstl.img4 = img4;
         existingHstl.img5 = img5;

         await existingHstl.save()

         return res.status(200).json(existingHstl)
      }

}

//delete hstls
exports.delHstl = async(req,res)=>{
   const _id = req.params._id;
   console.log(_id);
   try{
      const del = await hstls.deleteOne({_id})
      if(del.deletedCount == 0){
         return res.status(404).json("No data with that id")
      }
      return res.status(200).json("Hostel Deleted")
   }catch(err){
      return res.status(500).json("Error in deleting Hostel "+err)
   }
}