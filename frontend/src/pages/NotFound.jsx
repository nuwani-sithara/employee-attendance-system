import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/NotFound.css';

const NotFound = () => (
  <div className="not-found-container">
    <div className="not-found-content">
      <div className="error-code">404</div>
      <h1 className="error-title">Page Not Found</h1>
      <p className="error-message">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="home-link">
        <i className="fas fa-arrow-left"></i> Return to Dashboard
      </Link>
    </div>
  </div>
);

export default NotFound;