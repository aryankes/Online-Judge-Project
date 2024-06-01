const {generateFile} =require('./generateFile');
const {generateInputFile} =require('./generateInputFile');
const { executeCpp } = require('./executeCpp');
const { executeC } = require('./executeC');
const { executepy } = require('./executepy');

exports.b = async (req, res) => {
  res.send("Hello,world! b");
};
exports.run=async(req,res)=>{
    const {language="cpp",code,input}=req.body;
    if(code===undefined){
        return res.status(400).json({success:false,error:"Empty Code body"});
    }
    try{
        const filePath= await generateFile(language,code);
        const InputFilePath= await generateInputFile(input);

        if(language==="cpp"){
            const output=await executeCpp(filePath,InputFilePath);
            res.json({filePath,InputFilePath,output});
        }
        else if(language==="c"){
            const output=await executeC(filePath,InputFilePath);
            res.json({filePath,InputFilePath,output});
        }
        else if(language==="py"){
            const output=await executepy(filePath,InputFilePath);
            res.json({filePath,InputFilePath,output});
        }
    } 
    catch (error) {
        res.status(400).json({success:false, error: {message: "error compiling  code ",error:error}});
    }
}