import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttendanceTable from './AttendanceTable';
import '../stylesheets/EmployeeDashboard.css';

const EmployeeDashboard = ({ token }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/attendance/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLogs(res.data);
      
      // Determine current status
      if (res.data.length > 0) {
        const lastLog = res.data[0];
        if (lastLog.checkIn && !lastLog.checkOut) {
          setCurrentStatus('checked-in');
        } else {
          setCurrentStatus('checked-out');
        }
      } else {
        setCurrentStatus('checked-out');
      }
    } catch {
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, []);

  const handleCheckIn = async () => {
    setMessage('');
    try {
      await axios.post('/attendance/checkin', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('You have successfully checked in!');
      setCurrentStatus('checked-in');
      fetchLogs();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Check-in failed. Please try again.');
    }
  };

  const handleCheckOut = async () => {
    setMessage('');
    try {
      await axios.post('/attendance/checkout', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('You have successfully checked out!');
      setCurrentStatus('checked-out');
      fetchLogs();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Check-out failed. Please try again.');
    }
  };

  return (
    <div className="employee-dashboard">
      <div className="dashboard-header">
        <h2>My Attendance</h2>
        <div className={`status-badge ${currentStatus}`}>
          {currentStatus === 'checked-in' ? (
            <><i className="fas fa-check-circle"></i> Currently Checked In</>
          ) : (
            <><i className="fas fa-times-circle"></i> Currently Checked Out</>
          )}
        </div>
      </div>

      {message && (
        <div className={`action-message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="action-buttons">
        <button 
          onClick={handleCheckIn} 
          disabled={currentStatus === 'checked-in'}
          className="checkin-btn"
        >
          <i className="fas fa-fingerprint"></i> Check In
        </button>
        <button 
          onClick={handleCheckOut} 
          disabled={currentStatus === 'checked-out'}
          className="checkout-btn"
        >
          <i className="fas fa-sign-out-alt"></i> Check Out
        </button>
      </div>

      <div className="attendance-section">
        <h3>My Attendance History</h3>
        {loading ? (
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i> Loading attendance records...
          </div>
        ) : (
          <AttendanceTable logs={logs} />
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;