const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const bodyParser = require('body-parser');
const Transactionmodel = require("./models/transactionmodel");
const signupmodel = require("./models/signupmodel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const passport = require('./config/passport'); // Load the passport configuration

const app = express();
const port = process.env.PORT;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/website"
)
.then(() => console.log("Successfully connected to MongoDB"))
.catch((err) => console.log("Error connecting to MongoDB:", err));

// Middleware
app.use(cors());   // use to send res through post
app.use(bodyParser.json());
app.use(passport.initialize());

// Routes
app.get('/trans',passport.authenticate('jwt', { session: false }), async (req, res) => {
  const trans = await Transactionmodel.find({user_id:req.user._id});
  const demo=await Transactionmodel.aggregate([
  {
    $match:{user_id:req.user._id}
  },
  {
    $group:{
      _id:{$month:"$date"},
      transaction:{$push:{price:"$price",desc:"$desc",date:"$date"}},
      total:{$sum:"$price"}
    }

  },
 

])

  
  res.json({ data: demo ,data1:trans});


});

app.get('/', (req, res) => {
  res.send("hello world !!");
});

app.post('/trans', passport.authenticate('jwt', { session: false }), async (req,res)=>{
    
  const {number,desc,date}=req.body;
  const trans=new Transactionmodel({
      price:number,
      user_id:req.user._id,     ///user is importing from passport->passport mei hai header authorization use nikalega woh details       
      desc:desc,
      date:date
  })
  await trans.save()
  res.json({messge:"success"})})

app.delete('/trans/:id',passport.authenticate('jwt', { session: false }), async(req,res)=>{
const result = await Transactionmodel.findByIdAndDelete(req.params.id);
if(result){
  res.json({messge:"successful"})
}
else {
  res.status(404).json({ message: "Transaction not found" });
}

})
app.patch('/trans/:id',passport.authenticate('jwt', { session: false }), async(req,res)=>{

  
  const result=await Transactionmodel.findByIdAndUpdate(req.params.id,{price:req.body.number,desc:req.body.desc,date:req.body.date})
  if(result){
    res.json({messge:"successful"})
  }
  else {
    res.status(404).json({ message: "Transaction not found" });
  }
})

app.post('/signup',async(req,res)=>{
const {firstname,lastname,email,password}=req.body
const user = await signupmodel.findOne({ email: email });
if(user){
  return res.status(400).json({ message: "User already exists" });
}
else{
  try{
// Hash the password
const saltRounds = 10; // Number of salt rounds can be adjusted based on your security needs
const hashedPassword = await bcrypt.hash(password, saltRounds);
const signup= new signupmodel({
 firstname:firstname,
 lastname:lastname,
 email:email,
 password:hashedPassword
});
await signup.save();
res.status(200).json({messge:"success"})
  }
  catch(err){
    res.status(500).json({messge:"failed"})
  }
 
}

})


app.post("/login",async(req,res)=>{
const {email,password}=req.body
const userfind = await signupmodel.findOne({ email: email });
if(!userfind){
  res.status(200).json("user doesn't exist")
  return;
}
else{
  const match = await bcrypt.compare(password, userfind.password);
  const payl= { userId: userfind._id, email: userfind.email };
  if(match){
   const token= jwt.sign(payl,process.env.SECRET_KEY);
  res.status(200).json({ message: 'Token generated', token: token });
  }
  else{
    res.json("wrong password")
  }


}

})


// Start server
app.listen(port, () => {
console.log(`Server started on port ${port}`);
});