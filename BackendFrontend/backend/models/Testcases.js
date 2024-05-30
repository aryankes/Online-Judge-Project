const mongoose=require('mongoose');
const TestSchema=new mongoose.Schema({
    TID:{
        type:String,
        default:null,
        required:true,
        unique:true,
    },
    PID:{
        type:String,
        default:null,
        required:true,
        // unique:true,
    },
    Input:{
        type:String,
        required:true,
        default:null,
    },
    Solution:{
        type:String,
        default:null,
        required:true,
        // unique:true,
    },
});
module.exports=mongoose.model("TestCases",TestSchema);