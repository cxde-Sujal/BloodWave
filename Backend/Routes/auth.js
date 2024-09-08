const express= require("express");
const { loginUser, registerUser } = require("../Controllers/auth");
const router= express.Router();

//register route
router.post("/login",loginUser);

//login router
router.post("/register",registerUser);

module.exports=router;