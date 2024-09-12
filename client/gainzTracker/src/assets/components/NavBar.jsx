import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  const { logout } = props;
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    if (isNavbarOpen) {
      setIsNavbarOpen(false);
    }
  };

  return (
    <div id="navbar" className={`navbar ${isNavbarOpen ? 'open' : ''}`}>
      {/* Button to toggle the navbar */}
      <button onClick={toggleNavbar} className="toggle-button">
        ☰
      </button>
      <div className={`navbar-links ${isNavbarOpen ? 'open' : ''}`}>
        <Link to="/home" onClick={closeNavbar}>
          <button className="navbar-button">Home</button>
        </Link>
        <Link to="/log" onClick={closeNavbar}>
          <button className="navbar-button">View Past Workouts</button>
        </Link>
        <Link to="/add" onClick={closeNavbar}>
          <button className="navbar-button">New Entry</button>
        </Link>
        <Link to="/" onClick={() => { logout(); closeNavbar(); }}>
          <button className="navbar-button">Logout</button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;

