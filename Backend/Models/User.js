const mongoose = require('mongoose');
const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        default:0
    },
    role:{
        type:String,
        default:"admin"
    }
},{
    timestamps:true
})
module.exports=mongoose.model("User",UserSchema);