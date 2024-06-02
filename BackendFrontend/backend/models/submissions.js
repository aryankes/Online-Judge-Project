const mongoose=require('mongoose');
const SubmissionSchema=new mongoose.Schema({
    SID:{
        type:Number,
        default:null,
        required:true,
        unique:true,
    },
    DateTime:{
        type:Date,
        default:Date.now,
        required:true,
    },
    userhandle:{
        type:String,
        default:null,
        required:true,
        // unique:true,
    },
    PID:{
        type:String,
        required:true,
        default:null,
        // unique:true,
    },
    language:{
        type:String,
        default:null,
        required:true,
    },
    Status:{
        type:String,
        default:null,
        required:true,
    },
});
module.exports=mongoose.model("Submissions",SubmissionSchema);