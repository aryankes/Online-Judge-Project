import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
function TestcaseDescription() {
//   const navigate=useNavigate();
    const {id}=useParams();
  const [Testcase, setTestcase] = useState({
    TestcaseName:"",
    PID:"",
    Input:"",
    Solution:"",
  });
//   console.log(useParams());

  useEffect(() => {
    async function fetchDescription() {
      try {
        const response = await axios.get(`http://localhost:5000/api/tests/read/${id}`);
        setTestcase(response.data);
      } 
      catch (error) {
        console.error('Error fetching Testcases:', error);
      }
    }
    fetchDescription();
  }, []);
  
  // return (
  //   <div>
  //       <Navbar/>
  //     <h1>Testcase {`${Testcase.TestcaseName} `}</h1>
  //     <br />
  //     Input:
  //     <br />
  //     {`${Testcase.Input}`}
  //     <br />
  //     Solution:
  //     <br />
  //     {`${Testcase.Solution}`}
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center">
        <Navbar />
        <div className="bg-white dark:bg-gray-800 shadow-md rounded px-8 py-6 mb-4">
            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Testcase {`${Testcase.TestcaseName}`}</h1>
            <div className="mb-4">
                <p className="text-gray-700 dark:text-gray-300 font-bold">Input:</p>
                <p className="text-gray-700 dark:text-gray-300">{`${Testcase.Input}`}</p>
            </div>
            <div>
                <p className="text-gray-700 dark:text-gray-300 font-bold">Solution:</p>
                <p className="text-gray-700 dark:text-gray-300">{`${Testcase.Solution}`}</p>
            </div>
        </div>
    </div>
);

}

export default TestcaseDescription;