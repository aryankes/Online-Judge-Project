const {exec} = require("child_process");
const fs =require("fs")
const path= require("path");

const outputPath=path.join(__dirname,"outputs");
// console.log(outputPath);
if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true});
}

const executepy=(filepath)=>{
    const uniqID= path.basename(filepath).split(".")[0];
    const outPath=path.join(outputPath,`${uniqID}.exe`);
    // console.log(outPath);
    // const timeoutSeconds = 5;
    return new Promise((resolve,reject)=>{
        exec(
            `python ${filepath}`,
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
    executepy,
};
