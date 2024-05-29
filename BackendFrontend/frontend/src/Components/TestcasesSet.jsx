import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Navbar from './Navbar';
// import { useAuth } from '../AuthContext';
function TestcasesSet() {
  const {id:PID}=useParams();
  const navigate = useNavigate();
  const userRole=localStorage.getItem('userRole');
  // console.log(userRole);
  
  const [Testcases, setTestcases] = useState([]);

  useEffect(() => {
    async function fetchTestcases() {
      try {
        const response = await axios.get(`http://localhost:5000/api/tests/readbyPID/${PID}`);
        setTestcases(response.data);
      } 
      catch (error) {
        console.error('Error fetching Testcases:', error);
      }
    }

    fetchTestcases();
  }, []);
  const handleCreateTestcase=(PID)=>{
    navigate(`/CreateTestcase/${PID}`);
  };
  const handleUpdateTestcase=(TID)=>{
    navigate(`/UpdateTestcase/${PID}/${TID}`);
  };
  const handleDeleteTestcase =async (TID) => {
    if (window.confirm('Do you really want to delete?')) {
      console.log('Deleting Testcase with ID:', TID);
      try {
        const response = await axios.delete(`http://localhost:5000/api/tests/deletesingle/${TID}`);
        alert(`Success: ${response.data.message}`);
        //refreshing the list of problems
        setTestcases(Testcases.filter(Testcase => Testcase.TID !== TID));
      } catch (error) {
        console.error('Error deleting testcase:', error);
        alert('Error deleting testcase. Please try again.');
      }
    }
  };
  return (
    <div>
        <Navbar/>
      <h1>Testcases Set</h1>
        {userRole==='admin'?(
          <>
            <button onClick={()=>handleCreateTestcase(PID)}>Create New</button>
          </>
        ):(<></>)}
      <ul>
        {Testcases.map((Testcase) => (
          <li key={Testcase.TID}>
            <Link to={`/TestcaseDescription/${Testcase.TID}`}>{`${Testcase.TID}`}</Link>
            {userRole==='admin'?(
              <><span style={{ marginRight: '10px' }}></span>
                <button onClick={()=>handleUpdateTestcase(Testcase.TID)}>Update</button> <span style={{ marginRight: '10px' }}></span><button onClick={()=>handleDeleteTestcase(Testcase.TID)}>Delete</button>
              </>
            ):(<></>)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestcasesSet;