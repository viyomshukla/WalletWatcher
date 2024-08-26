const mongoose=require("mongoose");
const signup=new mongoose.Schema({
    firstname:{type:String,required:["firstname is required"]}, 
    lastname:String,
  
    email:String,
    password:String
    

},{timestamps:true})
module.exports=mongoose.model("signup",signup);