const Submission = require('../models/submissions');
const User = require('../models/User');
const dotenv = require('dotenv');
// const mongoose=require('mongoose');

dotenv.config();
// GET all examples
exports.create = async (req, res) => {
  try {
    const userhandle=req.signedCookies.token.userhandle;
    const user=await User.findOne({userhandle:userhandle});
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
    user.TotalSubmissions=user.TotalSubmissions+1;
    if(Status==="Accepted"){
        const uniqSubmission=await Submission.findOne({userhandle:userhandle,PID:PID,Status:Status});
        if(!uniqSubmission){
            user.TotalAccepted++;
        }
    }
    await user.save();

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
