const ejs=require("ejs");
const dotenv=require("dotenv");
dotenv.config();
const Prospect= require("../models/Prospect");
const sendMail = require("../helpers/sendMail");

const sendDetailsProspectEmail=async ()=>{
    //status 0 means we have not send mail
    const prospects=await Prospect.find({status:0});
    if(prospects.length>0){
        for(let prospect of prospects){
            ejs.renderFile("templates/BloodDonationProspect.ejs",
                {name:prospect.name},
                async (err,data)=>{
                     let messageoption={
                        from:process.env.EMAIL,
                        to:prospect.email,
                        subject:"Blood Wave , Thank You",
                        html:data
                     };
                     try {
                        await sendMail(messageoption);
                        //basically setting status 1 means we have send the mail and no need to send it again
                        await Prospect.findByIdAndUpdate(prospect._id,{$set:{status:1}});
                     } catch (error) {
                        console.log(error);
                        
                     }
                }
            )
        }
    }
}
module.exports={sendDetailsProspectEmail};