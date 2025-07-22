import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/Navbar.css';

const Navbar = ({ user, onLogout }) => (
  <nav className="navbar">
    <div className="navbar-brand">
      <span className="system-name">AttendancePro</span>
      <span className="system-tagline">Employee Management</span>
    </div>
    <div className="navbar-actions">
      {user ? (
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">{user.username}</span>
            <span className="user-role">{user.role}</span>
          </div>
          <button onClick={onLogout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      ) : (
        <Link to="/login" className="login-btn">
          <i className="fas fa-sign-in-alt"></i> Login
        </Link>
      )}
    </div>
  </nav>
);

export default Navbar;