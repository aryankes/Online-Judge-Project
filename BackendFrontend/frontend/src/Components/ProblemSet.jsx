import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';

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
        const response = await axios.get('http://localhost:5000/api/problems/readall');
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
        const response = await axios.delete(`http://localhost:5000/api/problems/delete/${PID}`);
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
    <div>
        <Navbar/>
      <h1 className='mt-16'>Problem Set</h1>
        {userRole==='admin'?(
          <>
            <button onClick={handleCreateProblem}>Create New</button>
          </>
        ):(<></>)}
      <ul>
        {problems.map((problem) => (
          <li key={problem.PID}>
            <Link to={`/ProblemDescription/${problem.PID}`}>{`${problem.PID} ${problem.ProblemName}`}</Link>
            {userRole==='admin'?(
              <><span style={{ marginRight: '10px' }}></span>
                <button onClick={()=>handleUpdateProblem(problem.PID)}>Update</button> <span style={{ marginRight: '10px' }}></span><button onClick={()=>handleDeleteProblem(problem.PID)}>Delete</button>
              </>
            ):(<></>)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProblemSet;