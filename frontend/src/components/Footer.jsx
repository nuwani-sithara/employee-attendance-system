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