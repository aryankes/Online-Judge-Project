const {generateFile} =require('./generateFile');
const {generateInputFile} =require('./generateInputFile');
const { executeCpp ,executeCpp2} = require('./executeCpp');
const { executeC ,executeC2} = require('./executeC');
const { executepy } = require('./executepy');
const fs = require("fs");
const path = require("path");
exports.b = async (req, res) => {
  res.send("Hello,world! b");
};
exports.run=async(req,res)=>{
    // console.log("req body is");
    // console.log(req.body);

    const {language="cpp",code,input,TimeLimit}=req.body;
    const outputPath = path.join(__dirname, "outputs");
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }
    if(code===undefined){
        return res.status(400).json({success:false,error:"Empty Code body"});
    }
    const st=performance.now();
    try{
        
        const filePath= await generateFile(language,code);
        const InputFilePath= await generateInputFile(input);
        const uniqID = path.basename(filePath).split(".")[0];
        // const outPath = path.join(outputPath, `${uniqID}.exe`);
        const outPath = path.join(outputPath, `${uniqID}.out`);

        if(language==="cpp"){
            const output=await executeCpp(filePath,InputFilePath,outPath,TimeLimit);
            const en=performance.now();
            res.json({filePath,InputFilePath,output,outPath,Time:en-st});
        }
        else if(language==="c"){
            const output=await executeC(filePath,InputFilePath,outPath,TimeLimit);
            const en=performance.now();
            res.json({filePath,InputFilePath,output,outPath,Time:en-st});
        }
        else if(language==="py"){
            const output=await executepy(filePath,InputFilePath,TimeLimit);
            const en=performance.now();
            res.json({filePath,InputFilePath,output,outPath,Time:en-st});
        }
    } 
    catch (error) {
        // console.log(error);
        if(error.error=="sigterm"){
            res.status(200).json({output:"sigterm",Time:TimeLimit*1000});
        }
        else{
            res.status(400).json({success:false, error: {message: "error submitting code in compiler controller ",error:error}});
        }
    }
    

}
exports.submit=async (req,res)=>{
    const{language="cpp",input,outPath,TimeLimit}=req.body;
    const InputFilePath= await generateInputFile(input);
    const st=performance.now();

    if(!outPath){
        return res.status(400).json({success:false,error:"No output Path given while submitting"});
    }
    try {
    //     console.log("req body is");
    // console.log(req.body);
        if(language==="cpp"){
            const output=await executeCpp2(InputFilePath,outPath,TimeLimit);
            const en=performance.now();
            res.json({InputFilePath,output,Time:en-st});
        }
        else if(language==="c"){
            const output=await executeC2(InputFilePath,outPath,TimeLimit);
            const en=performance.now();
            res.json({InputFilePath,output,Time:en-st});
        }
        else if(language==="py"){
            const output=await executepy(filePath,InputFilePath,outPath,TimeLimit);
            const en=performance.now();
            res.json({filePath,InputFilePath,output,outPath,Time:en-st});
        }
    } 
    catch (error) {
        if(error.error==="sigterm"){
            res.status(200).json({output:"sigterm",Time:TimeLimit*1000});
        }
        else{
            res.status(400).json({success:false, error: {message: "error submitting code in compiler controller ",error:error}});
        }
    }
    
}
