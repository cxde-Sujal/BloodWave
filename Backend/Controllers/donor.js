const Donor=require("../Models/Donor");

//Create donor 
const createDonor=async (req,res)=>{
    try{
        const newDonor= Donor(req.body);
        const donor= await newDonor.save();
        res.status(200).json(donor);
    }catch(err){
        res.status(500).json(err);
    }
};

//get all donors
const getAllDonors=async (req,res)=>{
    try {
        //latest donor comes on top with sort
        const donors= await Donor.find().sort({createdAt:-1});
        res.status(200).json(donors);
    } catch (error) {
        res.status(500).json(error);
    }
};

//update donor
const updateDonor=async (req,res)=>{
    try {
        const updateDonor=await Donor.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateDonor);
    } catch (error) {
        res.status(500).json(error);
    }
};

//get single donor
const getDonor=async (req,res)=>{
   try {
       const donor= await Donor.findOne(req.params.id);
       res.status(200).json(donor);
   } catch (error) {
       res.status(500).json(error);
   }
};


//delete donor
const deleteDonor=async (req,res)=>{
   try {
       await Donor.findByIdAndDelete(req.params.id);
       res.status(200).json("Donor Successfully Deleted!!")
   } catch (error) {
       res.status(500).json(error);
   }
}

//stats
const getDonorStats=async (req,res)=>{
    try {
        const stats=await Donor.aggregate([
            {
                $group:{
                    _id:"$bloodgroup",
                    count:{$sum:1}
                }
            }
        ]);
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports={deleteDonor,getAllDonors,getDonor,getDonorStats,updateDonor,createDonor};