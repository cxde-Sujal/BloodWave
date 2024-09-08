const express= require("express");
const app=express();
const cors=require('cors');
const authRoute=require("./Routes/auth");
const donorRoute=require("./Routes/donor");
const prospectRoute=require("./Routes/prospect")


//Cors
app.use(cors());

//Json
app.use(express.json());

//Routes
app.use("/api/v1/auth",authRoute);

app.use("/api/v1/donors",donorRoute);

app.use("/api/v1/prospects",prospectRoute);
module.exports=app;