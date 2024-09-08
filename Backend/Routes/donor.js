const express= require("express");
const { createDonor, getAllDonors, updateDonor, getDonor, deleteDonor, getDonorStats } = require("../Controllers/donor");
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");
const router= express.Router();

//add donor
router.post("/",verifyTokenAndAuthorization,createDonor);

//get all donors
router.get("/",getAllDonors);

//update donor
router.put("/:id",updateDonor);

//get one donor
router.get("/find/:id",getDonor);

//delete donor
router.delete("/:id",deleteDonor);

//get stats
router.get("/stats",getDonorStats);


module.exports=router;