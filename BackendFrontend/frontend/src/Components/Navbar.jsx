import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response=await axios.get('http://localhost:5000/api/example/logout');
      // console.log("logout function triggered");
      alert(`You have successfully logged out`);
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
    <nav>
      <ul>
        <li>
          <Link to="/homepage">Home</Link>
        </li>
        <li>
          <Link to="/" onClick={handleLogout}>Logout</Link>
        </li>
        <li>
          <Link to="/ProblemSet">Problem Set</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
