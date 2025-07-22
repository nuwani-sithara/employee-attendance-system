import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Navbar.css';

const Navbar = ({ user, onLogout }) => (
  <nav className="navbar">
    <div>Attendance System</div>
    <div>
      {user ? (
        <>
          <span>{user.username} ({user.role})</span>
          <a href="#" onClick={onLogout} style={{ marginLeft: '1rem' }}>Logout</a>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  </nav>
);

export default Navbar; 