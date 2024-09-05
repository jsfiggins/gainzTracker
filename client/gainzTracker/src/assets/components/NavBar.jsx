import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  const { logout } = props;
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div id="navbar" className={`navbar ${isNavbarOpen ? 'open' : ''}`}>
      {/* Button to toggle the navbar */}
      <button onClick={toggleNavbar} className="toggle-button">
        ☰
      </button>
      <div className={`navbar-links ${isNavbarOpen ? 'open' : ''}`}>
        <Link to="/home">
          <button className="navbar-button">Home</button>
        </Link>
        <Link to="/log">
          <button className="navbar-button">View Past Workouts</button>
        </Link>
        <Link to="/add">
          <button className="navbar-button">New Entry</button>
        </Link>
        <Link to="/">
          <button className="navbar-button" onClick={logout}>Logout</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
