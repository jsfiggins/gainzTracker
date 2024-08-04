import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  const { logout } = props;

  return (
    <div id="navbar" className="navbar">
      <Link to="/home"><button className="navbar-button">Home</button></Link>
      <Link to="/log"><button className="navbar-button">View Past Workouts</button></Link>
      <Link to="/add"><button className="navbar-button">New Entry</button></Link>
      <Link to="/"><button className="navbar-button" onClick={logout}>Logout</button></Link>
    </div>
  );
}

export default Navbar;
