const Submission = require('../models/submissions');
const User = require('../models/User');
const Problem = require('../models/problems');
const dotenv = require('dotenv');
// const mongoose=require('mongoose');

dotenv.config();
// GET all examples
exports.create = async (req, res) => {
  try {
    const{ SID,PID,userhandle,Status}=req.body;
    // console.log(Status);
    if(!(SID&&PID&&userhandle&&Status)){
        return res.status(400).send("Please enter all the submission information");
    }
    const existingSID=await Submission.findOne({SID});
    if(existingSID){
        return res.status(400).send("SID is not unique");
    }
    const existingPID=await Problem.findOne({PID});
    if(!existingPID){
        return res.status(400).send("No such PID exists");
    }
    const existinguserhandle=await User.findOne({userhandle});
    if(!existinguserhandle){
        return res.status(400).send("No such user with this handle exists");
    }
    //creating the submission
    const submission=await Submission.create({
        SID,PID,userhandle,Status,
    });
    res.status(200).json({message: "You have succesfully created the submission!",submission});
  } 
  catch (error) {
    console.log(error);
  }
};
exports.b = async (req, res) => {
  res.send("Hello,world! b");
};
exports.readbySID=async(req,res)=>{
    try {
        const{line} =req.body;
        if(!line){
            return res.status(400).send("Please enter the information");
        }
        let submission= await Submission.findOne({SID:line});
        if(!submission){
            return res.status(404).send("No Such submission Exists corresponding to this SID exists");
        }
        res.status(200).send(submission);
    } 
    catch(error){
        console.log(error);
    }
}
exports.readbyPID=async(req,res)=>{
    try {
        const{line} =req.body;
        if(!line){
            return res.status(400).send("Please enter the information");
        }
        let submission= await Submission.findOne({PID:line});
        if(!submission){
            return res.status(404).send("No Such submission Exists corresponding to this SID exists");
        }
        submission= await Submission.find({PID:line});

        res.status(200).send(submission);
    } 
    catch (error) {
        console.log(error);
    }
}
exports.readbyhandle=async(req,res)=>{
    try {
        const{line} =req.body;
        if(!line){
            return res.status(400).send("Please enter the information");
        }
        let submission= await Submission.findOne({userhandle:line});
        if(!submission){
            return res.status(404).send("No Such submission Exists corresponding to this handle exists");
        }
        submission= await Submission.find({userhandle:line});

        res.status(200).send(submission);
    } 
    catch (error) {
        console.log(error);
    }
}
// exports.update=async(req,res)=>{
//     try {
//         const{initialID, SID,PID,userhandle,status}=req.body;
//         if(!(initialID&&SID&&PID&&userhandle&Status)){
//             return res.status(400).send("Please enter the information");
//         }
//         let submission= await submission.findOne({SID:initialID});
//         if(!submission){
//             return res.status(404).send("No Such submission Exists");
//         }
//         submission.SID=SID;
//         submission.PID=PID;
//         submission.userhandle=userhandle;
//         submission.Status=status;
//         // submission.DateTime=Date.now;
//         const updatedsubmission = await Submission.save();
//         res.status(200).send(updatedsubmission);
//         // res.status(200).send(p1roblem);
//     } catch (error) {
//         console.log(error);
//     }
// }
// exports.delete= async(req,res)=>{
//     try {
//         const{ID}=req.body;
//         if(!ID){
//             return res.status(400).send("Please enter the information");
//         }
//         // console.log(ID);

//         let submission= await submission.findOneAndDelete({SID:ID});
//         // console.log(submission);
//         if(!submission){
//             // submission=await submission.findOneAndDelete({PID:ID});
//             // if(!submission){
//                 return res.status(404).send("No Such submission Exists");
//             // }
//         }
//         res.status(200).send({message:` ${ID} submission-Deleted->`,submission});
//     } catch (error) {
//         console.log(error);
//     }
// }