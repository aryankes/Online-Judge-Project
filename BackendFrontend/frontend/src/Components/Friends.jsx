import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';  
import { API_BASE_URL } from './config';

function Friends() {
  const navigate = useNavigate();
  const userRole=localStorage.getItem('userRole');
  const [Friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFriends, setFilteredFriends] = useState([]);

  useEffect(() => {
    async function fetchFriends() {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/example/myFriends`);
        setFriends(response.data);
      } 
      catch (error) {
        alert(error.response.data);
        console.error('Error fetching Friendslist:', error);
      }
    }
    fetchFriends();
  },[]);
  const filterFriends = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm === '') {
      setFilteredFriends([]);
    } else {
      const filtered = Friends.filter(user =>
        user.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
      setFilteredFriends(filtered);
    }
  };
  
  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-full mx-auto px-4 py-8 mt-16 dark:bg-gray-800 dark:text-white">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Friends</h1>
        <div className="mb-4">
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 w-80 text-gray-800"
            placeholder="Search by User Handle or Name"
            value={searchTerm}
            onChange={(e) => filterFriends(e.target.value)}
          />
        </div>
        <table className="w-full border-collapse border border-gray-300 ">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="border border-gray-300 p-2 dark:border-gray-600">Friend Handles </th>
            </tr>
          </thead>
          <tbody>
          {searchTerm.length > 0 ? (
            filteredFriends.map((user, index) => (
              <tr key={index}>
                <td className="border p-2"><Link to={`/Profile/${user}`} className="text-blue-500 underline hover:text-blue-600">{user}</Link></td>
                
                
              </tr>
            ))
          ) : (
            Friends.map((user, index) => (
              <tr key={index}>
                <td className="border p-2"><Link to={`/Profile/${user}`} className="text-blue-500 underline hover:text-blue-600">{user}</Link></td>
              </tr>
            ))
            )}
            
          </tbody>
        </table>
      </div>
    </div>
  );
  
}

export default Friends;