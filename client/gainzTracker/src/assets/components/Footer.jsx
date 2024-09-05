import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} GainzTracker. All rights reserved.</p>
      <small>Developed by Jaseane Figgins</small>
      {/* <ul className="footer-links">
        <li><Link to="/privacy">Privacy Policy</Link></li>
        <li><Link to="/terms">Terms of Service</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul> */}
    </footer>
  );
}
