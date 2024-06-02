const Submission = require('../models/submissions');
const User = require('../models/User');
const Problem = require('../models/problems');
const dotenv = require('dotenv');
// const mongoose=require('mongoose');

dotenv.config();
// GET all examples
exports.create = async (req, res) => {
  try {
    const lastSubmission = await Submission.findOne().sort({ DateTime: -1 });

    let lastSID;
    if (!lastSubmission || !lastSubmission.SID) {
      lastSID = 1; // Start with 1 if there are no previous submissions
    } else {
      lastSID = parseInt(lastSubmission.SID) + 1; // Increment SID
    }

    const{ PID,language,Status}=req.body;
    if(!(lastSID&&PID&&language&&Status)){
        return res.status(400).send("Please enter all the submission information");
    }
    const userhandle=req.signedCookies.token.userhandle;
    const submission=await Submission.create({
        SID:lastSID,userhandle,PID,language,Status,
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
        const {id:PID}=req.params;
        if(!PID){
            return res.status(400).send("No parametre Attached in read by PID");
        }
        let submission= await Submission.find({PID:PID}).sort({DateTime:-1});
        res.status(200).send(submission);
    } 
    catch (error) {
        console.log(error);
    }
}
exports.readbyhandle=async(req,res)=>{
    try {
        const userhandle=req.signedCookies.token.userhandle;
        if(!userhandle){
            return res.status(400).send("No such handle ");
        }
        let submission= await Submission.find({userhandle:userhandle}).sort({DateTime:-1});

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