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
    const {firstName,lastName,userhandle,email,password}=req.body;
    if(!(firstName&&lastName&&userhandle&&email&&password)){
        return res.status(400).send("Please enter all the information");
    }
    const existingUser=await User.findOne({ userhandle });
    if(existingUser){
        return res.status(400).send("User already exists with the same handle");
    }
    const existingUser2=await User.findOne({ email });
    if(existingUser2){
        return res.status(400).send("User already exists with the same email");
    }
    const hashedPassword= await bcrypt.hash(password,10);
    const user=await User.create({
        firstName,
        lastName,
        userhandle,
        email,
        password: hashedPassword,
    });
    const token=jwt.sign({id:user._id,userhandle},process.env.SECRET_KEY,{
        expiresIn: '1h',
    });
    user.token=token;
    user.password=undefined;
    res.status(200).json({message: "You have succesfully registerd!",user})
} 
catch (error) {
    console.log(error);
}
};

// // POST a new example
// exports.createExample = async (req, res) => {
//   const newExample = new Example(req.body);
//   try {
//     const savedExample = await newExample.save();
//     res.status(201).json(savedExample);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
