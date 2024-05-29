import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
function TestcaseDescription() {
//   const navigate=useNavigate();
    const {id:TID}=useParams();
  const [Testcase, setTestcase] = useState({
    TID:"",
    PID:"",
    Input:"",
    Solution:"",
  });
//   console.log(useParams());

  useEffect(() => {
    async function fetchDescription() {
        
      try {
        const response = await axios.get(`http://localhost:5000/api/tests/readbyTID/${TID}`);
        setTestcase(response.data);
      } 
      catch (error) {
        console.error('Error fetching Testcases:', error);
      }
    }

    fetchDescription();
  }, []);
  
  return (
    <div>
        <Navbar/>
      <h1>Testcase {`${Testcase.TID} `}</h1>
      <br />
      Input:
      <br />
      {`${Testcase.Input}`}
      <br />
      Solution:
      <br />
      {`${Testcase.Solution}`}
    </div>
  );
}

export default TestcaseDescription;