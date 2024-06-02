// const {exec} = require("child_process");
// const fs =require("fs")
// const path= require("path");

// const outputPath=path.join(__dirname,"outputs");
// // console.log(outputPath);
// if(!fs.existsSync(outputPath)){
//     fs.mkdirSync(outputPath,{recursive:true});
// }

// const executeCpp=(filepath)=>{
//     const uniqID= path.basename(filepath).split(".")[0];
//     const outPath=path.join(outputPath,`${uniqID}.exe`);
//     // console.log(outPath);
//     const timeoutSeconds = 5;
//     return new Promise((resolve,reject)=>{
//         exec(
//             `g++ ${filepath} -o ${outPath}  &&cd ${outputPath} && .\\${uniqID}.exe`,
//             (error,stdout,stderr)=>{
//                if(error){
//                 // if(error.killed){
//                 //     reject({ error: "Process terminated due to timeout", stderr });
//                 // }
//                 // else{
//                     reject({error,stderr});
//                 // }
                
//                } 
//                if(stderr){
//                 reject(stderr);
//                }
//                resolve(stdout);
//             }
//         );
//     })
// }
// module.exports ={
//     executeCpp,
// };
// const fs = require("fs");
// const path = require("path");

// const outputPath = path.join(__dirname, "outputs");

// if (!fs.existsSync(outputPath)) {
//     fs.mkdirSync(outputPath, { recursive: true });
// }
const { exec } = require("child_process");
const executeCpp = (filepath,InputFilePath,outPath) => {
    const timeoutSeconds = 5;
    
    return new Promise((resolve, reject) => {
        const command=`g++ ${filepath} -o ${outPath} && ${outPath} < ${InputFilePath}`;
        // const command = `g++ ${filepath} -o ${outPath} && powershell -Command "Start-Process -FilePath ${outPath} -NoNewWindow -Wait; if ($?) { } else { Write-Output 'Process terminated due to timeout' }"`;
        exec(
            command,
            { timeout: timeoutSeconds * 1000 }, // Set timeout in milliseconds
            (error, stdout, stderr) => {
                if (error) {
                    if (error.killed) {
                        reject({ error: "sigterm", stderr });
                    } else {
                        reject({ error, stderr });
                    }
                } else if (stderr) {
                    reject(stderr);
                } else {
                    resolve(stdout);
                }
            }
        );
    });
}
const executeCpp2 = (InputFilePath,outPath) => {
    const timeoutSeconds = 5;

    return new Promise((resolve, reject) => {
        const command= `${outPath} < ${InputFilePath}`;
        // const command = `g++ ${filepath} -o ${outPath} && powershell -Command "Start-Process -FilePath ${outPath} -NoNewWindow -Wait; if ($?) { } else { Write-Output 'Process terminated due to timeout' }"`;
        exec(
            command,
            { timeout: timeoutSeconds * 1000 }, // Set timeout in milliseconds
            (error, stdout, stderr) => {
                if (error) {
                    if (error.killed) {
                        reject({ error: "sigterm", stderr });
                    } else {
                        reject({ error, stderr });
                    }
                } else if (stderr) {
                    reject(stderr);
                } else {
                    resolve(stdout);
                }
            }
        );
    });
}
module.exports = {
    executeCpp,executeCpp2,
};
