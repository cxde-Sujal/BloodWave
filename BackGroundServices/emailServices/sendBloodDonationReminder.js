const ejs=require("ejs");
const dotenv=require("dotenv");
dotenv.config();
const Donor= require("../models/Donor");
const sendMail = require("../helpers/sendMail");

const formatDate=(date)=>{
    const year=date.getFullYear();
    const month= String(date.getMonth()+1).padStart(2,'0');
    const day=String(date.getDate()).padStart(2,'0');
    return `${year}/${month}/${day}`;
}

const BloodDonationReminderMail=async ()=>{
    const donors=await Donor.find();
    if(donors.length>0){
        for(let donor of donors){
            const donorDate= new Donor(donor.date);
            const today= new Date();
            const diffTime=Math.abs(today-donorDate);
            const diffDays=Math.ceil(diffTime/(1000*60*60*24));
            if(diffDays>60){
                ejs.renderFile("templates/BloodDonationReminder.ejs",
                    {name:donor.name,date:donor.date },
                    async (err,data)=>{
                        let messageoption={
                            from:process.env.EMAIL,
                            to:donor.email,
                            subject:"Hello, Blood Wave Donor",
                            html:data
                         };
                         try {
                            await sendMail(messageoption);
                            const formatteddate=formatDate(today);
                            await Donor.findByIdAndUpdate(donor._id,
                                {
                                    $set:{date:formatteddate}
                                }
                            )

                         } catch (error) {
                            console.log(error);
                         }
                    }
                );
            }
        }
    }
}
module.exports={BloodDonationReminderMail};
