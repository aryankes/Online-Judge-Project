const User = require('../models/User');
const bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
// GET all examples
exports.a = async (req, res) => {
  res.send("Hello,world! a");
};
exports.b = async (req, res) => {
  res.send("Hello,world! b");
};
exports.register = async (req, res) => {
  
  try {
    //get all the data from the frontend
    const {firstName,lastName,userhandle,email,password}=req.body;

    //check that all the data should exist
    if(!(firstName&&lastName&&userhandle&&email&&password)){
        return res.status(400).send("Please enter all the information");
    }

    //add more valiidations/constraints

    //check for existing userhandle and email
    const existingUser=await User.findOne({ userhandle });
    if(existingUser){
        return res.status(400).send("User already exists with the same handle");
    }
    const existingUser2=await User.findOne({ email });
    if(existingUser2){
        return res.status(400).send("User already exists with the same email");
    }
    
    //creating a hashed password
    const hashedPassword= await bcrypt.hash(password,10);

    //save the user in DB
    const user=await User.create({
        firstName,
        lastName,
        userhandle,
        email,
        password: hashedPassword,//saving hashed password for increasing security
    });

    //generate a token for the user and send it
    const token=jwt.sign({id:user._id,userhandle},process.env.SECRET_KEY,{
        expiresIn: '1h',
    });
    //passing the token to user
    user.token=token;
    user.password=undefined;
    res.status(200).json({message: "You have succesfully registerd!",user})
} 
catch (error) {
    console.log(error);
}
};

exports.login= async(req,res)=>{
try {
    //get all the data from frontend
    const {line,password}=req.body;
    if(!(line&&password)){
        return res.status(400).send("Please enter all the information");
    }

    //add more validations

    //find the user in the db
    const user= await User.findOne({line});
    if(!user){
        // user=await User.findOne({line});
        if(!user){
            return res.status(404).send("User not found");
        }
    }
     
    //comparing the password
    const enteredPassword=bcrypt.compare(password,user.password);
    if(!enteredPassword){
        return res.status(404).send("Password does not match");
    }

    //token creation
    const token=jwt.sign({id:user._id},procees.env.SECRET_KEY,{
        expiresIn:"1h"
    });
    user.token=token;
    user.password=undefined;

    //storing token in cookies with option
    const options={
        expiresIn:new Date(Date.now()+1*24*60*60*1000),
        httpOnly: true,//only manipulted by server not by your client/frontend 
    }

    //send the token
    res.status(200).cookie("token",token,options).json({
        message:"You have succeddfully logged in!",
        success: true,
        token,
    });
} catch (error) {
    console.log(error);
}
    
}

