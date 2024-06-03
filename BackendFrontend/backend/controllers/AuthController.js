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
    //storing token in cookies with option
    const options={
        expiresIn:new Date(Date.now()+60*60*1000),
        httpOnly: true,//only manipulted by server not by your client/frontend 
        signed:true,
    }

    //send the token
    res.status(200).cookie("token",{jwtToken:token,userhandle:user.userhandle},options).json({
        message:"You have succeddfully registerd!",
        success: true,
        token,
        role:user.role,
        userhandle:user.userhandle
    });
    // res.status(200).json({message: "You have succesfully registerd!",user})
    
} 
catch (error) {
    console.log(error);
}
};
exports.read=async(req,res)=>{
    try {
        const {id:userhandle}=req.params;
        if(!userhandle){
            return res.status(400).send("Please enter handle correctlly in parametres ");
        }
        const user=await User.findOne({userhandle:userhandle});
        if(!user){
            return res.status(400).send("No User exists with this handle");
        }
        res.status(200).send(user);
    } catch (error) {
        console.log("error fetching the User ",error)
    }
};
exports.readAll=async(req,res)=>{
    try {
        const Users=await User.find();
        res.status(200).send(Users);
    } catch (error) {
        res.status(400).send("error fetching the UsersList");
        console.log("error fetching the UsersList ",error)
    }
};
exports.update=async(req,res)=>{
    try {
        const userhandle=req.signedCookies.token.userhandle;
        const {id:givenHandle}=req.params;
        const {firstName,lastName,email,oldPassword,newPassword,confirmPassword}=req.body;
        if(!(firstName&&lastName&&email)){
            return res.status(400).send("Enter Complete Information");
        }
        if(givenHandle!==userhandle){
            return res.status(400).send("You Don't own this handle");
        }

        const user=await User.findOne({userhandle});
        if(!user){
            return res.status(400).send("No User exists with this handle");
        }

        const enteredPassword= await bcrypt.compare(oldPassword,user.password);
        if(!enteredPassword){
            return res.status(404).send("Old Password does not match");
        }

        const existingUser2=await User.findOne({ email });
        if(existingUser2){
            if(existingUser2.userhandle!==userhandle){
                return res.status(400).send("User already exists with the same email");
            }
        }

        user.firstName=firstName;
        user.lastName=lastName;
        user.email=email;
        if(newPassword){
            if(newPassword===confirmPassword){
                const hashedPassword= await bcrypt.hash(newPassword,10);
                user.password=hashedPassword;
            }
            else{
                return res.status(400).send("Confirmation Mismatch");
            }
        }
        await user.save();
        res.status(200).send({message:"Succesfully Updated",user});
    } catch (error) {
        console.log("error fetching the User ",error)
        return res.status(400).send("Updation Failed");

    }
    
};
exports.updateAdmin=async(req,res)=>{
    try {
        const {id:userhandle}=req.params;
        const {handle,firstName,lastName,email}=req.body;
        if(!(handle&&firstName&&lastName&&email)){
            return res.status(400).send("Enter Complete Information");
        }
        const user=await User.findOne({userhandle});
        if(!user){
            return res.status(400).send("No User exists with this handle");
        }
        const existingUser2=await User.findOne({ email });
        if(existingUser2){
            if(existingUser2.userhandle!==userhandle){
                return res.status(400).send("User already exists with the same email");
            }
        }
        const existingUser=await User.findOne({ handle });
        if(existingUser){
            if(handle!==userhandle){
                return res.status(400).send("User already exists with the same handle");
            }
        }
        user.userhandle=handle
        user.firstName=firstName;
        user.lastName=lastName;
        user.email=email;
        await user.save();
        res.status(200).send({message:`Succesfully Updated ${userhandle}`,user});
    } catch (error) {
        console.log("error updating the User ",error)
        return res.status(400).send("Updation Failed");

    }
    
};
exports.delete = async (req, res) => {
    try {
      //get all the data from the frontend
      const {handle}=req.body;
  
      //check that all the data should exist
      if(!(handle)){
          return res.status(400).send("Please enter all the information");
      }
  
      const existingUser=await User.findOneAndDelete({ userhandle:handle });
    //   console.log(existingUser);

    if(!existingUser){
        return res.status(400).send("No such user exists with this handle");
    }
      res.status(200).json({message: "You have succesfully deleted this handle !",existingUser})
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
        signed:true,
    }

    //send the token
    res.status(200).cookie("token",{jwtToken:token,userhandle:user.userhandle},options).json({
        message:"You have succeddfully logged in!",
        success: true,
        token,
        role:user.role,
        userhandle:user.userhandle
    });
    // res.status(200).send(user.role);
} 
catch (error) {
    console.log(error);
}
}
exports.logout = (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).send({ message: 'Logout successful' })
    } catch (error) {
        console.log(error);
        res.status(200).send({message:"Logout Failed"});
    }
     
};
