import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
function ProblemDescription() {
  const navigate=useNavigate();
    const {id:PID}=useParams();
  const [problem, setproblem] = useState('');
//   console.log(useParams());

  useEffect(() => {
    async function fetchDescription() {
        
      try {
        const response = await axios.get(`http://localhost:5000/api/problems/read/${PID}`);
        setproblem(response.data);
      } 
      catch (error) {
        console.error('Error fetching problems:', error);
      }
    }

    fetchDescription();
  }, []);
  const handleTestcasesSet=(PID)=>{
    navigate(`/TestcasesSet/${PID}`);
  }
  return (
    <div>
        <Navbar/>
      <h1>Problem {`${problem.PID} ${problem.ProblemName}`}</h1>
      <br />
      {`${problem.ProblemDescription}`}
      <br />
      <button onClick={()=>{handleTestcasesSet(problem.PID)}}>View TestCases</button>
    </div>
  );
}

export default ProblemDescription;