const mongoose=require("mongoose");
const trans=new mongoose.Schema({
    price:Number,
    desc:String,
    user_id:mongoose.Types.ObjectId,
    date: {
        type: Date,
        default: Date.now 
    }
},{timestamps:true})
module.exports=mongoose.model("transaction",trans);