const {generateFile} =require('./generateFile');
const { executeCpp } = require('./executeCpp');
const { executeC } = require('./executeC');
const { executepy } = require('./executepy');

exports.b = async (req, res) => {
  res.send("Hello,world! b");
};
exports.run=async(req,res)=>{
    const {language="cpp",code}=req.body;
    if(code===undefined){
        return res.status(400).json({success:false,error:"Empty Code body"});
    }
    try{
        const filePath= await generateFile(language,code);
        if(language==="cpp"){
            const output=await executeCpp(filePath);
            res.json({filePath,output});
        }
        else if(language==="c"){
            const output=await executeC(filePath);
            res.json({filePath,output});
        }
        else if(language==="py"){
            const output=await executepy(filePath);
            res.json({filePath,output});
        }
    } 
    catch (error) {
        res.status(400).json({success:false, error: {message: "cannot submit code ",error:error}});
    }
}