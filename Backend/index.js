const app= require("./app");
const dotenv= require("dotenv");
const mongoose= require("mongoose");
dotenv.config();

//PORT
const PORT=process.env.PORT;
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
    console.log(`Server is running on ${PORT}`);
    dbConnection();
})