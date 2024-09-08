const nodemailer= require("nodemailer");
const dotenv= require("dotenv");
dotenv.config();

const createTransporter=(config)=>{
    const transporter=nodemailer.createTransport(config);
    return transporter;
}

let configuration={
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    requireTLS:true,
    auth:{
        user:process.env.EMAIL,
        password:process.env.PASSWORD
    }
}

const sendMail=async (messageoption)=>{
    const transporter=await createTransporter(configuration);
    await transporter.verify();
    await transporter.sendMail(messageoption,(err,info)=>{
        if(err){
            console.log(err);
        }
        console.log(info);
        
    });
}

module.exports=sendMail;