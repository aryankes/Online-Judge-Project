const { exec } = require("child_process");
const executeCpp = (filepath,InputFilePath,outPath,TimeLimit) => {
    let timeoutSeconds = TimeLimit;
    timeoutSeconds=Math.min(10,timeoutSeconds);
    // console.log(timeoutSeconds);

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
const executeCpp2 = (InputFilePath,outPath,TimeLimit) => {
    const timeoutSeconds = TimeLimit;

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
