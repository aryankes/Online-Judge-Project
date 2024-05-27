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
    const {firstName,lastName,userhandle,email,password,role}=req.body;

    //check that all the data should exist
    if(!(firstName&&lastName&&userhandle&&email&&password&&role)){
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
        role,
    });
    //generate a token for the user and send it
    const token=jwt.sign({id:user._id,userhandle,role},process.env.SECRET_KEY,{
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
exports.updateEmailPass = async (req, res) => {
  
    try {
      //get all the data from the frontend
      const {userhandle,firstName,lastName,email,password}=req.body;
  
      //check that all the data should exist
      if(!(userhandle&&firstName&&lastName&&email&&password)){
          return res.status(400).send("Please enter all the information");
      }
  
      const existingUser=await User.findOne({ userhandle });
      if(!existingUser){
          return res.status(400).send("No such user exists with this handle");
      }
      const existingUser2=await User.findOne({ email });
      if(existingUser2){
        if(existingUser.email!==email){
            return res.status(400).send("the new email already has a user registered to it");
        }   
      }
      
      //creating a hashed password
    const hashedPassword= await bcrypt.hash(password,10);
    existingUser.firstName=firstName;
    existingUser.lastName=lastName;
    existingUser.email=email;
    existingUser.password=hashedPassword;
    const updateduser = await existingUser.save();

      //generate a token for the user and send it
    //   const token=jwt.sign({id:user._id,userhandle,role},process.env.SECRET_KEY,{
    //       expiresIn: '1h',
    //   });
      //passing the token to user
    //   user.token=token;
    //   user.password=undefined;
      res.status(200).json({message: "You have succesfully updated your information !",updateduser})
  } 
  catch (error) {
      console.log(error);
  }
  };
exports.updatewhole = async (req, res) => {
    try {
      //get all the data from the frontend
      const {beforehandle,newhandle,firstName,lastName,email,password,role}=req.body;
  
      //check that all the data should exist
      if(!(beforehandle&&newhandle&&firstName&&lastName&&email&&password&&role)){
          return res.status(400).send("Please enter all the information");
      }
  
      const existingUser=await User.findOne({ userhandle:beforehandle });
    //   console.log(existingUser);

    if(!existingUser){
        return res.status(400).send("No such user exists with this handle");
    }

    let existingUser2=await User.findOne({ email });
      if(existingUser2){
        if(existingUser.email!==email){
            return res.status(400).send("the new email already has a user registered to it");
        }   
      }
      existingUser2=await User.findOne({ userhandle:newhandle });
      if(existingUser2){
        if(beforehandle!==newhandle){
            return res.status(400).send("the new handle already has a user registered to it");
        }   
      }
      //creating a hashed password
    const hashedPassword= await bcrypt.hash(password,10);
    existingUser.userhandle=newhandle;
    existingUser.firstName=firstName;
    existingUser.lastName=lastName;
    existingUser.email=email;
    existingUser.password=hashedPassword;
    existingUser.role=role;
    const updateduser = await existingUser.save();
      res.status(200).json({message: "You have succesfully updated your information !",updateduser})
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
    let user= await User.findOne({email:line});
    if(!user){
        user=await User.findOne({userhandle:line});
        if(!user){
            return res.status(404).send("User not found");
        }
    }
     
    //comparing the password
    const enteredPassword= await bcrypt.compare(password,user.password);
    if(!enteredPassword){
        return res.status(404).send("Password does not match");
    }

    //token creation
    const token=jwt.sign({id:user._id, role:user.role},process.env.SECRET_KEY,{
        expiresIn:"1h"
    });
    user.token=token;
    user.password=undefined;

    //storing token in cookies with option
    const options={
        expiresIn:new Date(Date.now()+60*60*1000),
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

