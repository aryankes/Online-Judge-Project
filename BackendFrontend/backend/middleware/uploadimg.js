const multer  = require('multer');
const User=require('../models/User');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:async function(req,file,cb){
        const userhandle=req.params.userhandle;
        const user=await User.findOne({userhandle});
        if(!user){
            return res.status(400).send("No such user exists with this handle");
        }
        const filename=userhandle+'.jpg';
        cb(null,filename);
    }
});

const uploadimg=multer({storage:storage});
module.exports=uploadimg;