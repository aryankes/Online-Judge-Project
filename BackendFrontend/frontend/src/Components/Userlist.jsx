import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';  
import { API_BASE_URL } from './config';

function Userlist() {
  const navigate = useNavigate();
  const userRole=localStorage.getItem('userRole');
  const [Users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'DateTime', direction: 'asc' });
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/example/readAll/?sortField=${sortConfig.key}&sortOrder=${sortConfig.direction}`);
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
        const response = await axios.delete(`${API_BASE_URL}/api/example/delete/${userhandle}`);
        alert(`Success: ${response.data.message}`);
        //refreshing the list of problems
        

        setUsers(Users.filter(user => user.userhandle !== userhandle));
      } catch (error) {
        console.error('Error deleting problem:', error);
        alert(`Error: ${error.response.data}`); // Include server error response in alert message

      }
    }
  };
  const handleSwitchRole =async (userhandle) => {
    if (window.confirm('Do you really want to Switch Role?')) {
      console.log('Changing Role user with handle:', userhandle);
      try {
        const response = await axios.post(`${API_BASE_URL}/api/example/createAdmin/${userhandle}`);
        alert(`Success: ${response.data.message}`);
        // setUsers(Users.filter(user => user.role==="admin"));
        window.location.reload();
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
      <Navbar />
      <div className="min-h-screen w-full mx-auto px-4 py-8 mt-16 dark:bg-gray-800 dark:text-white">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Users</h1>
        <table className="w-full border-collapse border border-gray-300 ">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="border border-gray-300 p-2 dark:border-gray-600">User Handle <button onClick={() => sortUsers('userhandle')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded dark:bg-gray-400 dark:hover:bg-gray-800">Sort</button></th>
              <th className="border border-gray-300 p-2 dark:border-gray-600">Name <button onClick={() => sortUsers('firstName')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded dark:bg-gray-400 dark:hover:bg-gray-800">Sort</button></th>
              <th className="border border-gray-300 p-2 dark:border-gray-600">Registered On <button onClick={() => sortUsers('DateTime')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded dark:bg-gray-400 dark:hover:bg-gray-800">Sort</button></th>
              <th className="border border-gray-300 p-2 dark:border-gray-600">Total Submissions <button onClick={() => sortUsers('TotalSubmissions')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded dark:bg-gray-400 dark:hover:bg-gray-800">Sort</button></th>
              <th className="border border-gray-300 p-2 dark:border-gray-600">Total Accepted <button onClick={() => sortUsers('TotalAccepted')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded dark:bg-gray-400 dark:hover:bg-gray-800">Sort</button></th>
              {userRole === 'admin' && (
                <>
                  <th className="border  border-gray-300 p-2 dark:border-gray-600">Update</th>
                  <th className="border  border-gray-300 p-2 dark:border-gray-600">Delete</th>
                  <th className="border  border-gray-300 p-2 dark:border-gray-600">Role</th>
                  <th className="border  border-gray-300 p-2 dark:border-gray-600">Switch Role</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {Users.map((user, index) => (
              <tr key={index}>
                <td className="border p-2"><Link to={`/Profile/${user.userhandle}`} className="text-blue-500 underline hover:text-blue-600">{user.userhandle}</Link></td>
                <td className="border p-2">{`${user.firstName} ${user.lastName}`}</td>
                <td className="border p-2">{String(user.DateTime).split('T')[0]}</td>
                <td className="border p-2">{user.TotalSubmissions}</td>
                <td className="border p-2">{user.TotalAccepted}</td>
                {userRole === 'admin' && (
                  <>
                    <td className="border p-2"><button onClick={() => handleUpdateUser(user.userhandle)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Update</button></td>
                    <td className="border p-2"><button onClick={() => handleDeleteUser(user.userhandle)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button></td>
                    <td className="border p-2">{user.role}</td>
                    <td className="border p-2"><button onClick={() => handleSwitchRole(user.userhandle)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">Switch</button></td>

                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
}

export default Userlist;