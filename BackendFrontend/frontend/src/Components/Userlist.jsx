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
  const [sortConfig, setSortConfig] = useState({ key: 'DateTime', direction: 'asc' });
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(`http://localhost:5000/api/example/readAll/?sortField=${sortConfig.key}&sortOrder=${sortConfig.direction}`);
        setUsers(response.data);
      } 
      catch (error) {
        alert(error.response.data);
        console.error('Error fetching Userslist:', error);
      }
    }
    fetchUsers();
  }, [sortConfig]);
  const handleUpdateUser=(userhandle)=>{
    navigate(`/UpdateUser/${userhandle}`);
  };
  const handleDeleteUser =async (userhandle) => {
    if (window.confirm('Do you really want to delete?')) {
      console.log('Deleting user with handle:', userhandle);
      try {
        const response = await axios.delete(`http://localhost:5000/api/example/delete/${userhandle}`);
        alert(`Success: ${response.data.message}`);
        //refreshing the list of problems
        setUsers(Users.filter(user => user.userhandle !== userhandle));
      } catch (error) {
        console.error('Error deleting problem:', error);
        alert(`Error: ${error.response.data}`); // Include server error response in alert message

      }
    }
  };
  const sortUsers=(key)=>{
    let direction = 'asc';
    if (sortConfig.key === key)  {
      if(sortConfig.direction==='asc'){
        direction = 'desc';
      }
      else{
        direction='asc';
      }
      
    }
    setSortConfig({ key, direction });
  }
  return (
    <div>
        <Navbar/>
      <h1>Users</h1>
      <table border="1">
        <thead>
          <tr>
            {/* <th>User Handle</th>
            <th>Name</th>
            <th>Registered On</th>
            <th>Total Submissions</th>
            <th>Total Accepted</th> */}
            <th>
              User Handle 
              <button onClick={() => sortUsers('userhandle')}>Sort</button>
            </th>
            <th>
              Name
              <button onClick={() => sortUsers('firstName')}>Sort</button>
            </th>
            <th>
              Registered On
              <button onClick={() => sortUsers('DateTime')}>Sort</button>
            </th>
            <th>
              Total Submissions
              <button onClick={() => sortUsers('TotalSubmissions')}>Sort</button>
            </th>
            <th>
              Total Accepted
              <button onClick={() => sortUsers('TotalAccepted')}>Sort</button>
            </th>
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
              <td><button onClick={()=>{handleDeleteUser(user.userhandle)}}>Delete</button></td>
              </>
            ):(<></>)}
            </tr>
          ))}
        </tbody>
      </table>
        
          
    </div>
  );
}

export default Userlist;