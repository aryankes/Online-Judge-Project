const mongoose=require('mongoose');
const ProblemSchema=new mongoose.Schema({
    PID:{
        type:String,
        default:null,
        required:true,
        unique:true,
    },
    ProblemName:{
        type:String,
        required:true,
        default:null,
        unique:true,
    },
    ProblemDescription:{
        type:String,
        default:null,
        unique:true,
    },
    ProblemLevel:{
        type:String,
        default:null,
        required:true,
    },
});
module.exports=mongoose.model("problem",ProblemSchema);