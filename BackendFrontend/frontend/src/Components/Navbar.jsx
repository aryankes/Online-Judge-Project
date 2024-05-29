import React from 'react';
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/homepage">Home</Link>
        </li>
        <li>
          <Link to="/">Register</Link>
        </li>
        <li>
          <Link to="/ProblemSet">Problem Set</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;