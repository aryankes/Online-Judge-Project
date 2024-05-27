const mongoose=require('mongoose');
const SubmissionSchema=new mongoose.Schema({
    SID:{
        type:String,
        default:null,
        required:true,
        unique:true,
    },
    PID:{
        type:String,
        required:true,
        default:null,
        // unique:true,
    },
    userhandle:{
        type:String,
        default:null,
        required:true,
        // unique:true,
    },
    Status:{
        type:String,
        default:null,
        required:true,
    },
    DateTime:{
        type:Date,
        default:Date.now,
        required:true,
    },
});
module.exports=mongoose.model("Submissions",SubmissionSchema);