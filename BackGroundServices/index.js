const express= require("express");
const app= express();
const dotenv=require("dotenv");

//used to schedule task 
const cron= require("node-cron");
const mongoose= require("mongoose");
const { sendDetailsProspectEmail } = require("./emailServices/sendDetailProspect");
const { sendEligibiltyEmail } = require("./emailServices/sendEligibiltyEmail");
const { BloodDonationReminderMail } = require("./emailServices/sendBloodDonationReminder");
const { sendDonorDetails } = require("./emailServices/sendDonorDetails");
dotenv.config();

//server
const PORT=process.env.PORT;


//Schedule Tasks
const run= ()=>{
    cron.schedule('* * * * * *',()=>{
        sendDetailsProspectEmail();
        sendEligibiltyEmail();
        BloodDonationReminderMail();
        sendDonorDetails();
    })
}
// run();
//DB
const DB=process.env.DB;

const dbConnection= async ()=>{
    try {
       await mongoose.connect(DB).then(()=>{
            console.log("DB connected");
        }) 
    } catch (err) {
        console.log(err);
    }
}

app.listen(PORT,()=>{
    console.log(`Background services is running on ${PORT}`);  
    dbConnection(); 
});
