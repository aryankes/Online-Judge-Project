import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    cout<<"Hello World";
    //Enter your code here

    return 0;
}`,
    input:"",
  });
  const [output, setOutput] = useState('');
const[Test,setTest]=useState('');
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
  const handleChange=(e)=>{
    const{name,value}=e.target;
    setcode((prevData)=>({
      ...prevData,
      [name]:value
    }));
  };

  const handleRun= async(e)=>{
    e.preventDefault();
    try{
        const response= await axios.post('http://localhost:5000/api/compiler/run',code);
        // alert(`Successfully Submitted`);
        const data=response.data;
        // console.log(response.data);
        setOutput(data.output);
        // navigate('/homepage')
    }
    catch(error){
        console.log("error in submitting code");
        console.log(error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
            if(error.response.data.error.error.stderr){
              alert(`Compilation failed`); 
              setOutput(error.response.data.error.error.stderr);
            }
            else if(error.response.data.error.error.error==="sigterm"){
              setOutput(error.response.data.error.error.error);
            }
            else{
              alert(`Compilation failed`); 
            }
          } 
          else if (error.request) {
            console.error('Request data:', error.request);
          } 
          else {
            console.error('Error message:', error.message);
          }
    }
};
const handleSubmit= async(e)=>{
  e.preventDefault();
  try{
      const response= await axios.post(`http://localhost:5000/api/execution/submit/${PID}`,code,{timeout:100000});
      // alert(`Successfully Submitted`);
      const data=response.data;
      // console.log(response.data);
      setOutput(data.message);
      // navigate('/homepage')
  }
  catch(error){
      console.log("error in submitting code");
      console.log(error);
      if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
          // if(error.response.data.error.error.stderr){
          //   alert(`Compilation failed`); 
          //   setOutput(error.response.data.error.error.stderr);
          // }
          // else if(error.response.data.error.error.error==="sigterm"){
          //   setOutput(error.response.data.error.error.error);
          // }
          // else{
          //   alert(`Compilation failed`); 
          // }
        } 
        else if (error.request) {
          console.error('Request data:', error.request);
        } 
        else {
          console.error('Error message:', error.message);
        }
  }
};
  return (
    <div>
      <Navbar />
      <h1>Problem {`${problem.PID} ${problem.ProblemName}`}</h1>
      <br />
      <br />
      {`${problem.ProblemDescription}`}
      <br />
      <br />

      <form onSubmit={handleRun}>
        <label for="language">Select Your Language:</label>
        <select name="language" id="language" value={code.language} onChange={handleChange}>
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
      <label for="input">Input: </label><br />
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
      <textarea
          rows="10"
          cols="50"
          name="output"
          value={output}
        ></textarea>
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
