const cryptoJS= require("crypto-js");
const jwt= require('jsonwebtoken');
const User= require("../Models/User");
const dotenv=require("dotenv");
dotenv.config();


//register user
const registerUser=async (req,res)=>{
    // console.log("Request Headers:", req.headers);
    console.log(req.body);
    // req.body = {
    //     name: "Sujal",
    //     email: "sujal@gmail.com",
    //     password: "suzal"
    // };
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Name, email, and password are required." });
    }
    try{
     const newUser=User({
        name: req.body.name,
        email: req.body.email,
        password: cryptoJS.AES.encrypt(
            req.body.password,
            process.env.pass
        ).toString()
     })
     
        const user=await newUser.save();
        // console.log(user);
        res.status(200).json(user);
     }catch(err){
        res.status(500).json(err);
     }
}

//login user
const loginUser=async (req,res)=>{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    try {
        const user=await User.findOne({email:req.body.email});
        if(!user){
            return res.status(401).json("You have not registered");                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        }
        const hashedpassword=cryptoJS.AES.decrypt(
            user.password,
            process.env.pass
        );
        const originalPassword=hashedpassword.toString(cryptoJS.enc.Utf8);
        if(originalPassword!==req.body.password){
            return res.status(500).json("Wrong password!!");
        }
        const {password, ...info}=user._doc;
        const accessToken=jwt.sign({
            id:user._id,
            role:user.role
        },
        process.env.jwt_SEC,
        {expiresIn:"10d"}//access token should expire in 10days
    );
    res.status(200).json({...info,accessToken});
    } catch (error) {
       res.status(500).json(error); 
    }
};
 
module.exports={loginUser,registerUser};