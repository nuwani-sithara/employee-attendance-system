import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import EmployeeDashboard from './components/EmployeeDashboard';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import './stylesheets/App.css';

// Set Axios base URL for Docker or local
axios.defaults.baseURL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '/';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user, token]);

  const handleLogin = (data) => {
    setUser(data.user);
    setToken(data.token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken('');
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={
          user ? (
            user.role === 'admin' ? <AdminDashboard token={token} /> : <EmployeeDashboard token={token} />
          ) : (
            <Navigate to="/login" />
          )
        } />
        <Route path="/login" element={
          user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
