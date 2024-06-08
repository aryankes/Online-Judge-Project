import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './config';

import Navbar from './Navbar';
// import { useAuth } from '../AuthContext';
function ProblemSet() {
  const navigate = useNavigate();
  const userRole=localStorage.getItem('userRole');
  // console.log(userRole);
  
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function fetchProblems() {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/problems/readall`);
        setProblems(response.data.sort((a,b) => a.PID.localeCompare(b.PID)));
      } 
      catch (error) {
        console.error('Error fetching problems:', error);
      }
    }

    fetchProblems();
  }, []);
  const handleCreateProblem=()=>{
    navigate('/CreateProblem');
  };
  const handleUpdateProblem=(PID)=>{
    navigate(`/UpdateProblem/${PID}`);
  };
  const handleDeleteProblem =async (PID) => {
    if (window.confirm('Do you really want to delete?')) {
      console.log('Deleting problem with ID:', PID);
      try {
        const response = await axios.delete(`${API_BASE_URL}/api/problems/delete/${PID}`);
        alert(`Success: ${response.data.message}`);
        //refreshing the list of problems
        setProblems(problems.filter(problem => problem.PID !== PID));
      } catch (error) {
        console.error('Error deleting problem:', error);
        alert(`Error: ${error.response.data.message}`); // Include server error response in alert message

      }
    }
  };
  return (
    <>
        <Navbar/>
  <div className="min-h-screen w-full mx-auto px-4 py-8 mt-16 dark:bg-gray-800 dark:text-white">

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Problem Set</h1>
        {userRole==='admin'?(
          <button onClick={handleCreateProblem}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded dark:bg-gray-600 dark:hover:bg-gray-700"
          >Create New</button>
        ):(<></>)}
        <br />
        <br />
        <table className="w-full border-collapse  border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
            <th className="border border-gray-300 p-2 dark:border-gray-600">PID</th>
            <th className="border border-gray-300 p-2 dark:border-gray-600">Problem Name</th>
            <th className="border border-gray-300 p-2 dark:border-gray-600">Level</th>
            {userRole==='admin'?(<>
            <th className="border border-gray-300 p-2 dark:border-gray-600">Update</th>
            <th className="border border-gray-300 p-2 dark:border-gray-600">Delete</th>
            
            </>):(<></>)}
            </tr>
          </thead>
          <tbody>
              {problems.map((problem) => (
              <tr  key={problem.PID} className="hover:bg-gray-100 dark:hover:bg-gray-600 align-middle">
                <td className="border border-gray-300 p-2 dark:border-gray-600"><Link to={`/ProblemDescription/${problem.PID}`}>{`${problem.PID}`}</Link></td>
                <td className="border border-gray-300 p-2 dark:border-gray-600"><Link to={`/ProblemDescription/${problem.PID}`}>{`${problem.ProblemName}`}</Link></td>
                <td className="border border-gray-300 p-2 dark:border-gray-600"><span className={(problem.ProblemLevel=="Easy")?("text-green-500"):(problem.ProblemLevel=="Medium")?("text-yellow-500"):("text-red-500")}>{problem.ProblemLevel}</span></td>
                {userRole==='admin'?(
                  <>
                    <td className="border border-gray-300 p-2 dark:border-gray-600">
                      <button 
                        onClick={()=>handleUpdateProblem(problem.PID)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded "
                      >Update
                      </button>
                    </td> 
                    <td className="border border-gray-300 p-2 dark:border-gray-600">
                      <button 
                        onClick={()=>handleDeleteProblem(problem.PID)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded "
                      >Delete
                      </button>
                    </td>
                  </>
                ):(<></>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProblemSet;