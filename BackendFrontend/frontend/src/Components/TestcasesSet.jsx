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
        // setTestcases(response.data);
        setTestcases(response.data.sort((a,b) => a._id.localeCompare(b._id)));
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
  const handleUpdateTestcase=(_id)=>{
    navigate(`/UpdateTestcase/${PID}/${_id}`);
  };
  const handleDeleteTestcase =async (_id) => {
    if (window.confirm('Do you really want to delete?')) {
      console.log('Deleting Testcase with ID:', _id);
      try {
        const response = await axios.delete(`http://localhost:5000/api/tests/deletesingle/${_id}`);
        alert(`Success: ${response.data.message}`);
        //refreshing the list of problems
        setTestcases(Testcases.filter(Testcase => Testcase._id !== _id));
      } catch (error) {
        console.error('Error deleting testcase:', error);
        alert(`Error: ${error.response.data.message}`); // Include server error response in alert message
        
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
          <li key={Testcase._id}>
            <Link to={`/TestcaseDescription/${Testcase._id}`}>{`${Testcase._id}`}</Link>
            {userRole==='admin'?(
              <><span style={{ marginRight: '10px' }}></span>
                <button onClick={()=>handleUpdateTestcase(Testcase._id)}>Update</button> <span style={{ marginRight: '10px' }}></span><button onClick={()=>handleDeleteTestcase(Testcase._id)}>Delete</button>
              </>
            ):(<></>)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestcasesSet;