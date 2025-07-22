import React from 'react';
import '../stylesheets/Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">AP</span>
          <span className="footer-system-name">AttendancePro</span>
          <p className="footer-tagline">Streamlined workforce management</p>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h4>System</h4>
            <ul>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/reports">Reports</a></li>
              <li><a href="/settings">Settings</a></li>
            </ul>
          </div>
          
          <div className="link-group">
            <h4>Help</h4>
            <ul>
              <li><a href="/help">Help Center</a></li>
              <li><a href="/contact">Contact Admin</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} AttendancePro. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;