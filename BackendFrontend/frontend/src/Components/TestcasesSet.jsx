import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from './config';

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
        const response = await axios.get(`${API_BASE_URL}/api/tests/readbyPID/${PID}`);
        setTestcases(response.data.sort((a,b) => a.TestcaseName.localeCompare(b.TestcaseName)));
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
  const handleDeleteTestcase =async (_id,TestcaseName) => {
    if (window.confirm(`Do you really want to delete ${TestcaseName}?`)) {
      console.log('Deleting Testcase with ID:', TestcaseName);
      try {
        const response = await axios.delete(`${API_BASE_URL}/api/tests/deletesingle/${_id}`);
        alert(`Success: ${response.data.message}`);
        //refreshing the list of problems
        setTestcases(Testcases.filter(Testcase => Testcase._id !== _id));
      } catch (error) {
        console.error('Error deleting testcase:', error);
        alert(`Error: ${error.response.data.message}`); // Include server error response in alert message
        
      }
    }
  };
//   return (
//     <div>
//         <Navbar/>
//       <h1>Testcases Set</h1>
//         {userRole==='admin'?(
//           <>
//             <button onClick={()=>handleCreateTestcase(PID)}>Create New</button>
//           </>
//         ):(<></>)}
//         <br /><br />
//         <table border="1">
//           <thead >
//             <th>TestCase</th>
//             {userRole==='admin'?(
//               <>
//               <th>Update</th>
//               <th>Delete</th>
//               </>
//             ):(<></>)}
//           </thead>
//           <tbody>
//           {Testcases.map((testcase,index)=>(
//             <tr key={index}>
//               <td><Link to={`/TestcaseDescription/${testcase.TestcaseName}`}>{testcase.TestcaseName}</Link></td>
//               {userRole==='admin'?(
//               <>
//               <td><button onClick={()=>{handleUpdateTestcase(testcase._id)}}>Update</button></td>
//               <td><button onClick={()=>{handleDeleteTestcase(testcase._id)}}>Delete</button></td>
//               </>
//             ):(<></>)}
//             </tr>
//           ))}
//           </tbody>
//         </table>
      
//     </div>
//   );

return (
  <>
  <Navbar />
  <div className="min-h-screen w-full mx-auto px-4 py-8 mt-16 dark:bg-gray-800 dark:text-white">
    
    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Testcases Set</h1>
    {userRole === 'admin' && (
      <button
        onClick={() => handleCreateTestcase(PID)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 rounded dark:bg-gray-600 dark:hover:bg-gray-700"
      >
        Create New
      </button>
    )}
    <br />
    <br />
    <table className="w-full border-collapse  border border-gray-300 dark:border-gray-600">
      <thead className="bg-gray-200 dark:bg-gray-700">
        <tr>
          <th className="border border-gray-300 p-2 dark:border-gray-600">TestCase</th>
          {userRole === 'admin' && (
            <>
              <th className="border border-gray-300 p-2 dark:border-gray-600">Update</th>
              <th className="border border-gray-300 p-2 dark:border-gray-600">Delete</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {Testcases.map((testcase, index) => (
          <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-600 align-middle">
            <td className="border border-gray-300 p-2 dark:border-gray-600">
              <Link
                to={`/TestcaseDescription/${testcase._id}`}
                className="text-blue-500 dark:text-blue-400"
              >
                {testcase.TestcaseName}
              </Link>
            </td>
            {userRole === 'admin' && (
              <>
                <td className="border border-gray-300 p-2 dark:border-gray-600">
                  <button
                    onClick={() => handleUpdateTestcase(testcase._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded "
                  >
                    Update
                  </button>
                </td>
                <td className="border border-gray-300 p-2 dark:border-gray-600">
                  <button
                    onClick={() => handleDeleteTestcase(testcase._id, testcase.TestcaseName)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded "
                  >
                    Delete
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </>
);
}

export default TestcasesSet;