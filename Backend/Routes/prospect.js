const express= require("express");
const { createProspect, getAllProspects, getProspect, updateProspect, deleteProspect } = require("../Controllers/prospect");
const router= express.Router();

//add prospect
router.post("/",createProspect);

//get all prospects
router.get("/",getAllProspects);

//update prospect
router.put("/:id",updateProspect);

//get single prospect
router.get("/find/:id",getProspect);

//delete prospect
router.delete("/:id",deleteProspect);



module.exports=router;