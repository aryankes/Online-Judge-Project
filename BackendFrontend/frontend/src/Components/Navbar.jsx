import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { API_BASE_URL } from './config';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/example/logout`);
      alert(`You have successfully logged out`);
      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.log("Error in logging out");
      console.log(error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        alert(`Logout failed`);
      } else if (error.request){
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  }

  return (
    <nav className="bg-gray-800 dark:bg-gray-300 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex">
            <Link to="/homepage" className="text-white hover:bg-gray-700 dark:text-gray-700 dark:hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/ProblemSet" className="text-white hover:bg-gray-700 dark:text-gray-700 dark:hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">Problem Set</Link>
            <Link to={`/Submissions/a/All`} className="text-white hover:bg-gray-700 dark:text-gray-700 dark:hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">All Submissions</Link>
            <Link to={`/Profile/${localStorage.userhandle}`} className="text-white hover:bg-gray-700 dark:text-gray-700 dark:hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">My Profile</Link>
            <Link to="/Userlist" className="text-white hover:bg-gray-700 dark:text-gray-700 dark:hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">Users</Link>
          </div>
          <div className="flex items-center">
            <Link to="/" onClick={handleLogout} className="text-white hover:bg-gray-700 dark:text-gray-700 dark:hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">Logout</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
