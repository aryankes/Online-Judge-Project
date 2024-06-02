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
  });
  const [output, setOutput] = useState("");
  useEffect(() => {
    async function fetchDescription() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/problems/read/${PID}`
        );
        setproblem(response.data);
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
      if (output.trim() !== Testcases[0].Solution.trim()) {
        allpassed = 0;
      }
      if (allpassed === 0) {
        verdict=`wrong answer on test ${cnt}`;
        setOutput(verdict);
      }
      const outPath = response.data.outPath;
      // console.log(outPath);

      for (let i = 1; i < Testcases.length; i++) {
        if(allpassed===0){
          break;
        }
        cnt++;
        const codePayload = { ...code, input: Testcases[i].Input };
        const TestPayload = {
          language: code.language,
          input: Testcases[i].Input,
          outPath: outPath,
        };
        setOutput(`Running on test ${cnt}`);
        if (code.language === "py") {
          const response = await axios.post(
            "http://localhost:5000/api/compiler/run",
            codePayload
          );
          let output = response.data.output;
          if (output.trim() !== Testcases[i].Solution.trim()) {
            allpassed = 0;
          }
        } else {
          const response = await axios.post(
            "http://localhost:5000/api/compiler/submit",
            TestPayload
          );
          let output = response.data.output;
          if (output.trim() !== Testcases[i].Solution.trim()) {
            allpassed = 0;
          }
        }
        if (allpassed === 0) {
          verdict=`wrong answer on test ${cnt}`;
          setOutput(verdict);
          break;
        }
      }
      if (allpassed === 1) {
        verdict="Accepted";
        setOutput(verdict);
      }
      // const userhandle = localStorage.getItem('userhandle');
      const submissionPayload={PID:PID,language: code.language,Status:verdict};
      await axios.post("http://localhost:5000/api/submissions/create",submissionPayload)
      navigate('/SubmissionsByHandle')
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
  return (
    <div>
      <Navbar />

      <h1>Problem {`${problem.PID} ${problem.ProblemName}`}</h1> 
      <li>
          <Link to={`/SubmissionsByPID/${PID}`}>Submissions</Link>
      </li>
      <br />
      <br />
      {`${problem.ProblemDescription}`}
      <br />
      <br />

      <form onSubmit={handleRun}>
        <label for="language">Select Your Language:</label>
        <select
          name="language"
          id="language"
          value={code.language}
          onChange={handleChange}
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
        ></textarea>
        <br />
        <label for="input">Input: </label>
        <br />
        <textarea
          rows="10"
          cols="50"
          name="input"
          placeholder="Enter your input here"
          value={code.input}
          onChange={handleChange}
        ></textarea>
        <br />
        <br />
        <button type="submit">Run</button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={handleSubmit}>Submit</button>
        <br />
        <label htmlFor="output">Output</label>
        <br />
        <textarea rows="10" cols="50" name="output" value={output}></textarea>
        {/* <p>{output}</p> */}
        <br />
      </form>
      <br />
      <br />
      <button
        onClick={() => {
          handleTestcasesSet(problem.PID);
        }}
      >
        View TestCases
      </button>
    </div>
  );
}

export default ProblemDescription;
