const Problem = require('../models/problems');
const Test = require('../models/Testcases');
// const bcrypt=require('bcryptjs')
// const jwt=require("jsonwebtoken");
const dotenv = require('dotenv');


// const User = require('../models/User');
dotenv.config();
// GET all examples
exports.create = async (req, res) => {
  try {
    const{ PID,ProblemName,ProblemDescription,ProblemLevel}=req.body;
    if(!(PID&&ProblemName&&ProblemDescription&&ProblemLevel)){
        return res.status(400).send("Please enter all the Problem information");
    }
    
    const existingPID=await Problem.findOne({PID});
    
    if(existingPID){
        return res.status(400).send("PID is not unique");
    }
    
    // const existingProblemName=await Problem.findOne({ ProblemName });
    
    // if(existingProblemName){
    //     return res.status(400).send("Problem Name is not unique");
    // }

    //creatnig the problem
    const problem=await Problem.create({
        PID,ProblemName,ProblemDescription,ProblemLevel
    });
    res.status(200).json({message: "You have succesfully created the problem!",problem});
  } 
  catch (error) {
    console.log(error);
  }
};
exports.b = async (req, res) => {
  res.send("Hello,world! b");
};
exports.read=async(req,res)=>{
    try {
        const{id} =req.params;
        if(!id){
            return res.status(400).send("Please enter the information");
        }

        let problem= await Problem.findOne({PID:id});
        if(!problem){
            return res.status(404).send("No Such Problem Exists");
        }
        res.status(200).send(problem);
    } catch (error) {
        console.log(error);
    }
}
exports.readall=async(req,res)=>{
    try {
        const problem =await Problem.find({});
        if(!problem){
            return res.status(404).send("The Database is empty");
        }
        res.status(200).send(problem);
    } 
    catch (error) {
        console.log("error in reading all problems");
        console.log("error");
    }
}
exports.update=async(req,res)=>{
    try {
        const{id} =req.params;
        const{PID,ProblemName,ProblemDescription,ProblemLevel}=req.body;
        if(!(id&&PID&&ProblemName&&ProblemDescription&&ProblemLevel)){
            return res.status(400).send("Please enter the information");
        }
        let problem= await Problem.findOne({PID:id});
        if(!problem){
            // problem=await Problem.findOne({ProblemName:id});
            // if(!problem){
                return res.status(404).send("No Such Problem Exists");
            // }
        }
        let temp=await Problem.findOne({PID:PID});
        if(temp){
            if(temp.PID!==id){
                return res.status(404).send("A problem with the given updated PID already Exists");
            }
        }
        // let z=problem._id;
        // problem={
        //     PID,ProblemName,ProblemDescription,ProblemLevel
        // };//this method don't works because isme id and __v change ho jati hai
        
        problem.PID=PID;
        problem.ProblemName=ProblemName;
        problem.ProblemDescription=ProblemDescription;
        problem.ProblemLevel=ProblemLevel;
        const updatedproblem = await problem.save();
        res.status(200).json({message: "You have succesfully updated the problem!",problem});
        
        // res.status(200).send(p1roblem);
    } catch (error) {
        console.log(error);
    }
}
exports.delete= async(req,res)=>{
    try {
        const{id}=req.params;
        if(!id){
            return res.status(400).send("Please enter the information");
        }
        // console.log(id);
        let problem= await Problem.findOneAndDelete({PID:id});
        // console.log(problem);
        if(!problem){
            // problem=await Problem.findOneAndDelete({ProblemName:id});
            // if(!problem){
                return res.status(404).send("No Such Problem Exists");
            // }
        }
        res.status(200).send({message:` ${id} Problem-and-Testcases-Deleted`,problem});
    } catch (error) {
        console.log(error);
    }
}