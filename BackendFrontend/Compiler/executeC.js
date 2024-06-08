const {exec} = require("child_process");
// const fs =require("fs")

// const outputPath=path.join(__dirname,"outputs");
// // console.log(outputPath);
// if(!fs.existsSync(outputPath)){
//     fs.mkdirSync(outputPath,{recursive:true});
// }

const executeC=(filepath,InputFilePath,outPath,TimeLimit)=>{
    // const outPath=path.join(outputPath,`${uniqID}.exe`);
    // console.log(outPath);
    const timeoutSeconds = TimeLimit;
    return new Promise((resolve,reject)=>{
        exec(
            // `gcc ${filepath} -o ${outPath}  &&cd ${outputPath} && .\\${uniqID}.exe <${InputFilePath}`,
            // `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out < ${inputPath}`
            `gcc ${filepath} -o ${outPath} && ${outPath} < ${InputFilePath}`,
            {timeout: timeoutSeconds*1000},
            (error,stdout,stderr)=>{
               if(error){
                if(error.killed){
                    reject({ error: "sigterm", stderr });
                }
                else{
                    reject({error,stderr});
                }
                
               } 
               if(stderr){
                reject(stderr);
               }
               resolve(stdout);
            }
        );
    })
}
const executeC2=(InputFilePath,outPath,TimeLimit)=>{
    // console.log(outPath);
    // const timeoutSeconds = TimeLimit;
    let timeoutSeconds = TimeLimit;
    timeoutSeconds=Math.min(10,timeoutSeconds);
    return new Promise((resolve,reject)=>{
        exec(
            // `gcc ${filepath} -o ${outPath}  &&cd ${outputPath} && .\\${uniqID}.exe <${InputFilePath}`,
            // `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out < ${inputPath}`
            `${outPath} < ${InputFilePath}`,

            {timeout: timeoutSeconds*1000},
            (error,stdout,stderr)=>{
               if(error){
                if(error.killed){
                    reject({ error: "sigterm", stderr });
                }
                else{
                    reject({error,stderr});
                }
                
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
    executeC,executeC2,
};
