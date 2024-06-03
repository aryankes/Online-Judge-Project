import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';  
function Userlist() {
  const navigate = useNavigate();
  const userRole=localStorage.getItem('userRole');
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('http://localhost:5000/api/example/readAll');
        setUsers(response.data.sort((a,b) => a.DateTime.localeCompare(b.DateTime)));
      } 
      catch (error) {
        alert(error.response.data);
        console.error('Error fetching Userslist:', error);
      }
    }
    fetchUsers();
  }, []);
  const handleUpdateUser=(userhandle)=>{
    navigate(`/UpdateUser/${userhandle}`);
  };
  const handleDeleteProblem =async (PID) => {
    if (window.confirm('Do you really want to delete?')) {
      console.log('Deleting problem with ID:', PID);
      try {
        const response = await axios.delete(`http://localhost:5000/api/example/updateAdmin/${PID}`);
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
      <h1>Users</h1>
      <table border="1">
        <thead>
          <tr>
            <th>User Handle</th>
            <th>Name</th>
            <th>Registered On</th>
            <th>Total Submissions</th>
            <th>Total Accepted</th>
            {userRole==='admin'?(
              <>
              <th>Update</th>
              <th>Delete</th>
              </>
            ):(<></>)}
            
          </tr>
        </thead>
        <tbody>
          {Users.map((user,index)=>(
            <tr key={index}>
              <td><Link to={`/Profile/${user.userhandle}`}>{user.userhandle}</Link></td>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{(String(user.DateTime)).split('T')[0]}</td>
              <td>{user.TotalSubmissions}</td>
              <td>{user.TotalAccepted}</td>
              {userRole==='admin'?(
              <>
              <td><button onClick={()=>{handleUpdateUser(user.userhandle)}}>Update</button></td>
              <td><button onClick={()=>{handleDeleteProblem(user.userhandle)}}>Delete</button></td>
              </>
            ):(<></>)}
            </tr>
          ))}
        </tbody>
      </table>
        
      
            {/* {userRole==='admin'?(
              <><span style={{ marginRight: '10px' }}></span>
                <button onClick={()=>handleUpdateProblem(user.userhandle)}>Update</button> <span style={{ marginRight: '10px' }}></span><button onClick={()=>handleDeleteProblem(problem.PID)}>Delete</button>
              </>
            ):(<></>)} */}
          
    </div>
  );
}

export default Userlist;