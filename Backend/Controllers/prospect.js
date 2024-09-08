const Prospect=require("../Models/Prospect");

//Create donor 
const createProspect=async (req,res)=>{
    try{
        const newProspect= Prospect(req.body);
        const prospect= await newProspect.save();
        res.status(200).json(prospect);
    }catch(err){
        res.status(500).json(err);
    }
};

//get all donors
const getAllProspects=async (req,res)=>{
    try {
        //latest donor comes on top with sort
        const prospects= await Prospect.find().sort({createdAt:-1});
        res.status(200).json(prospects);
    } catch (error) {
        res.status(500).json(error);
    }
};

//update donor
const updateProspect=async (req,res)=>{
    try {
        const updateProspect=await Prospect.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateProspect);
    } catch (error) {
        res.status(500).json(error);
    }
};

//get single donor
const getProspect=async (req,res)=>{
   try {
       const prospect= await Prospect.findById(req.params.id);
       res.status(200).json(prospect);
   } catch (error) {
       res.status(500).json(error);
   }
};


//delete donor
const deleteProspect=async (req,res)=>{
   try {
       await Prospect.findByIdAndDelete(req.params.id);
       res.status(200).json("Donor Successfully Deleted!!")
   } catch (error) {
       res.status(500).json(error);
   }
}



module.exports={deleteProspect,getAllProspects,getProspect,updateProspect,createProspect};