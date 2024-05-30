const {exec} = require("child_process");
const fs =require("fs")
const path= require("path");

const outputPath=path.join(__dirname,"outputs");
// console.log(outputPath);
if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true});
}

const executeC=(filepath)=>{
    const uniqID= path.basename(filepath).split(".")[0];
    const outPath=path.join(outputPath,`${uniqID}.exe`);
    // console.log(outPath);
    // const timeoutSeconds = 5;
    return new Promise((resolve,reject)=>{
        exec(
            `gcc ${filepath} -o ${outPath}  &&cd ${outputPath} && .\\${uniqID}.exe`,
            (error,stdout,stderr)=>{
               if(error){
                // if(error.killed){
                //     reject({ error: "Process terminated due to timeout", stderr });
                // }
                // else{
                    reject({error,stderr});
                // }
                
               } 
               if(stderr){
                reject(stderr);
               }
               resolve(stdout);
            }
        );
    })
}
module.exports ={
    executeC,
};
