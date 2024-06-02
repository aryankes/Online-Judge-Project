const {exec} = require("child_process");
const executepy=(filepath,InputFilePath)=>{
    // console.log(outPath);
    const timeoutSeconds = 5;
    return new Promise((resolve,reject)=>{
        exec(
            `python ${filepath} < ${InputFilePath}`,
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
    executepy,
};
