import React, { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
function ProblemDescription() {
  const navigate = useNavigate();
  const { id: PID } = useParams();
  const [problem, setproblem] = useState("");
  const [code, setcode] = useState({
    language: "cpp",
    code: `#include <iostream>
using namespace std;
int main()
{
  int a,b;cin>>a>>b;cout<<a+b<<endl;
    // cout<<"Hello World";
    //Enter your code here

    return 0;
}`,
    input: "",
    TimeLimit:10,
  });
  const [output, setOutput] = useState("");
  useEffect(() => {
    async function fetchDescription() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/problems/read/${PID}`
        );
        setproblem(response.data);
        // setcode({...code,TimeLimit:problem.TimeLimit})
        setcode(prevCode => ({ ...prevCode, TimeLimit: response.data.TimeLimit }));
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    }
    fetchDescription();
  }, []);
  const handleTestcasesSet = (PID) => {
    navigate(`/TestcasesSet/${PID}`);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setcode((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRun = async (e) => {
    // console.log(code);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/compiler/run",
        code
      );
      
      // alert(`Successfully Submitted`);
      const data = response.data;
      // console.log(response.data);
      setOutput(data.output);
      // navigate('/homepage')
    } catch (error) {
      console.log("error in running code");
      console.log(error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        if (error.response.data.error.error.stderr) {
          alert(`Compilation failed`);
          setOutput(error.response.data.error.error.stderr);
        } else if (error.response.data.error.error.error === "sigterm") {
          setOutput(error.response.data.error.error.error);
        } else {
          alert(`Compilation failed`);
        }
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let verdict="";
      const response1 = await axios.get(
        `http://localhost:5000/api/tests/readbyPID/${PID}`
      );
      const Testcases = response1.data;
      let Time=0;
      if(Testcases.length===0){
        alert("No testcases added");
        return;
      }
      // console.log(Testcases[1]);
      let cnt = 1;
      setOutput(`Running on test ${cnt}`);
      const codePayload = { ...code, input: Testcases[0].Input };
      let response = await axios.post(
        "http://localhost:5000/api/compiler/run",
        codePayload
      );
      let output = response.data.output;
      let allpassed = 1;
      if(output==="sigterm"){
        Time=Math.max(Time,response.data.Time);

        allpassed=0;
      }
      else if (output.trim() !== Testcases[0].Solution.trim()) {
        allpassed = 0;
      }
      if (allpassed === 0) {
        if(output==="sigterm"){
          verdict=`Time limit exceeded on Test ${cnt}`
        }
        else{
          verdict=`wrong answer on Test ${cnt}`;
        }
        setOutput(verdict);
      }
      const outPath = response.data.outPath;
      // console.log(outPath);

      for (let i = 0; i < Testcases.length; i++) {
        if(allpassed===0){
          break;
        }
        cnt++;
        const codePayload = { ...code, input: Testcases[i].Input };
        const TestPayload = {
          language: code.language,
          input: Testcases[i].Input,
          outPath: outPath,
          TimeLimit:code.TimeLimit,
        };
        setOutput(`Running on test ${cnt}`);
        if (code.language === "py") {
          const response = await axios.post(
            "http://localhost:5000/api/compiler/run",
            codePayload
          );
          let output = response.data.output;
          Time=Math.max(Time,response.data.Time);
          if(output==="sigterm"){
            setOutput("sigterm");
          }
          if (output.trim() !== Testcases[i].Solution.trim()) {
            allpassed = 0;
          }
        } else {
          const response = await axios.post(
            "http://localhost:5000/api/compiler/submit",
            TestPayload
          );
          Time=Math.max(Time,response.data.Time);
          let output = response.data.output;
          if (output.trim() !== Testcases[i].Solution.trim()) {
            allpassed = 0;
          }
        }
        if (allpassed === 0) {
          if(output==="sigterm"){
            verdict=`Time limit exceeded on Test ${cnt}`;
          }
          else{
            verdict=`wrong answer on test ${cnt}`;
          }
          
          setOutput(verdict);
          break;
        }
      }
      if (allpassed === 1) {
        verdict="Accepted";
        setOutput(verdict);
      }
      // const userhandle = localStorage.getItem('userhandle');
      const submissionPayload={code:code.code,PID:PID,language: code.language,Status:verdict,time:parseInt(Time)};
      await axios.post("http://localhost:5000/api/submissions/create",submissionPayload)
      navigate(`/Submissions/userhandle/${localStorage.userhandle}`)
    } catch (error) {
      console.log("error in running code");
      console.log(error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        if (error.response.data.error.error.stderr) {
          alert(`Compilation failed`);
          setOutput(error.response.data.error.error.stderr);
        } else if (error.response.data.error.error.error === "sigterm") {
          setOutput(error.response.data.error.error.error);
        } else {
          alert(`Compilation failed`);
        }
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };
  // return (
  //   <div>
  //     <Navbar />

  //     <h1>Problem {`${problem.PID} ${problem.ProblemName}`}</h1> 
  //     <li>
  //         <Link to={`/Submissions/PID/${PID}`}>Submissions</Link>
  //     </li>
  //     <br />
  //     <br />
  //     {`${problem.ProblemDescription}`}
  //     <br />
  //     <br />

  //     <form onSubmit={handleRun}>
  //       <label for="language">Select Your Language:</label>
  //       <select
  //         name="language"
  //         id="language"
  //         value={code.language}
  //         onChange={handleChange}
  //       >
  //         <option value="cpp">C++</option>
  //         <option value="py">Python</option>
  //         <option value="c">C</option>
  //       </select>
  //       <br />
  //       <br />
  //       <textarea
  //         rows="10"
  //         cols="50"
  //         name="code"
  //         value={code.code}
  //         onChange={handleChange}
  //       ></textarea>
  //       <br />
  //       <label for="input">Input: </label>
  //       <br />
  //       <textarea
  //         rows="10"
  //         cols="50"
  //         name="input"
  //         placeholder="Enter your input here"
  //         value={code.input}
  //         onChange={handleChange}
  //       ></textarea>
  //       <br />
  //       <br />
  //       <button type="submit">Run</button>&nbsp;&nbsp;&nbsp;&nbsp;
  //       <button onClick={handleSubmit}>Submit</button>
  //       <br />
  //       <label htmlFor="output">Output</label>
  //       <br />
  //       <textarea rows="10" cols="50" name="output" value={output}></textarea>
  //       {/* <p>{output}</p> */}
  //       <br />
  //     </form>
  //     <br />
  //     <br />
  //     <button
  //       onClick={() => {
  //         handleTestcasesSet(problem.PID);
  //       }}
  //     >
  //       View TestCases
  //     </button>
  //   </div>
  // );
  // ProblemDescription.jsx

// ProblemDescription.jsx

return (
  <>
  <Navbar />

  <div className="w-full mx-auto px-4 py-8 mt-16 dark:bg-gray-800 dark:text-white">
    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
      {`${problem.PID} : ${problem.ProblemName}`}
    </h1>
    <br />
    <Link to={`/Submissions/PID/${PID}`} className="text-blue-500">
      Submissions
    </Link>
    <div className="flex flex-wrap mt-4">
      {/* Left half of the screen */}
      <div className="w-full md:w-1/2 p-4 mt-16 border rounded-md border-gray-300">
        <div className="text-lg text-gray-600 dark:text-gray-300">
          {problem.ProblemDescription}
        </div>
        <br />
        <div className="text-lg text-gray-600 dark:text-gray-300">
          TimeLimit: {problem.TimeLimit}s.
          {/* Memory:{problem.Memory} MB */}
        </div>
      </div>
      {/* Right half of the screen */}
      <div className="w-full md:w-1/2 pl-4">
        <form onSubmit={handleRun}>
          <label htmlFor="language" className="mr-2">Language:</label>
          <select
            name="language"
            id="language"
            value={code.language}
            onChange={handleChange}
            className="mt-1 border border-gray-300 rounded-md p-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          >
            <option value="cpp">C++</option>
            <option value="py">Python</option>
            <option value="c">C</option>
          </select>
          <br />
          <br />
          <textarea
            rows="10"
            cols="50"
            name="code"
            value={code.code}
            onChange={handleChange}
            className="block mt-1 w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          ></textarea>
          <br />
          <label htmlFor="input">Input: </label>
          <br />
          <textarea
            rows="2"
            cols="50"
            name="input"
            placeholder="Enter your input here"
            value={code.input}
            onChange={handleChange}
            className="block mt-1 w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
          ></textarea>
          <br />
          
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            Run
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            Submit
          </button>
          <br />
        </form>
        
        <br />
        <label htmlFor="output">Output</label>
        <br />
        <textarea
          rows="5"
          cols="50"
          name="output"
          value={output}
          className="block mt-1 w-full border border-gray-300 rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
        ></textarea>
        <br />
        <button
          onClick={() => {
            handleTestcasesSet(problem.PID);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded dark:bg-gray-600 dark:hover:bg-gray-700"
        >
          View TestCases
        </button>
      </div>
    </div>
  </div>
  </>
);

}

export default ProblemDescription;
