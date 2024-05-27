const Test = require('../models/Testcases');
// const bcrypt=require('bcryptjs')
// const jwt=require("jsonwebtoken");
const dotenv = require('dotenv');


// const User = require('../models/User');
dotenv.config();
// GET all examples
exports.create = async (req, res) => {
  try {
    const{ TID,PID,Input,Solution}=req.body;
    if(!(TID&&PID&&Input&&Solution)){
        return res.status(400).send("Please enter all the Test information");
    }
    
    const existingTID=await Test.findOne({TID});
    
    if(existingTID){
        return res.status(400).send("TID is not unique");
    }
    
    //creating the testcase
    const testcase=await Test.create({
        TID,PID,Input,Solution
    });
    res.status(200).json({message: "You have succesfully created the testcase!",testcase});
  } 
  catch (error) {
    console.log(error);
  }
};
exports.b = async (req, res) => {
  res.send("Hello,world! b");
};
exports.readbyTID=async(req,res)=>{
    try {
        const{line} =req.body;
        if(!line){
            return res.status(400).send("Please enter all the information");
        }
        let test= await Test.findOne({TID:line});
        if(!test){
            return res.status(404).send("No Such Test Exists");
        }
        res.status(200).send(test);
    } catch (error) {
        console.log(error);
    }
}
exports.readbyPID=async(req,res)=>{
    try {
        const{line} =req.body;
        if(!line){
            return res.status(400).send("Please enter all the information");
        }
        
        let test= await Test.findOne({PID:line});
        if(!test){
            return res.status(404).send("No Test Exists related to this PID");
        }
        test= await Test.find({PID:line});
        res.status(200).send(test);
    } 
    catch (error) {
        console.log(error);
    }
}
exports.update=async(req,res)=>{
    try {
        const{initialID,TID,PID,Input,Solution}=req.body;
        if(!(initialID&&TID&&PID&&Input&&Solution)){
            return res.status(400).send("Please enter all the information");
        }
        let test= await Test.findOne({TID:initialID});
        if(!test){
            return res.status(404).send("No Such Test Exists");
        }
        let temp=await Test.findOne({TID:TID});
        if(temp){
            if(temp.TID!==initialID){
                return res.status(404).send("A Testcase with the given updated TID already Exists");
            }
        }
        test.TID=TID;
        test.PID=PID;
        test.Input=Input;
        test.Solution=Solution;
        const updatedtest = await test.save();
        res.status(200).send(updatedtest);
        // res.status(200).send(p1roblem);
    } catch (error) {
        console.log(error);
    }
}
exports.deletesingle= async(req,res)=>{
    try {
        const{ID}=req.body;
        if(!ID){
            return res.status(400).send("Please enter all the information");
        }
        // console.log(ID);

        let test= await Test.findOneAndDelete({TID:ID});
        // console.log(test);
        if(!test){
            return res.status(404).send("No Such Test Exists");
        }
        res.status(200).send({message:` ${ID} Test-Deleted->`,test});
    } catch (error) {
        console.log(error);
    }
}
exports.deleteAllbyPID= async(req,res)=>{
    try {
        const{ID}=req.body;
        if(!ID){
            return res.status(400).send("Please enter all the information");
        }
        // console.log(ID);
        let temp=await Test.findOne({PID:ID});
        if(!temp){
            return res.status(404).send("No Test Exists for this problem");
        }
        let test= await Test.deleteMany({PID:ID});
        // console.log(test);
        // if(!test){
        //     return res.status(404).send("No Test Exists for this problem");
        // }
        res.status(200).send({message:` ${ID} Test-Deleted->`,test});
    } catch (error) {
        console.log(error);
    }
}