import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttendanceTable from './AttendanceTable';
import '../stylesheets/EmployeeDashboard.css';
import { FontAwesomeIcon } from '../fontAwesome';

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
      setMessage('Check-in recorded successfully');
      setCurrentStatus('checked-in');
      fetchLogs();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to check in. Please try again.');
    }
  };

  const handleCheckOut = async () => {
    setMessage('');
    try {
      await axios.post('/attendance/checkout', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Check-out recorded successfully');
      setCurrentStatus('checked-out');
      fetchLogs();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to check out. Please try again.');
    }
  };

  return (
    <div className="employee-dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Attendance Dashboard</h2>
          <p className="dashboard-subtitle">View and manage your attendance records</p>
        </div>
        <div className={`status-badge ${currentStatus}`}>
          {currentStatus === 'checked-in' ? (
            <><FontAwesomeIcon icon="circle-check" /> Checked In</>
          ) : (
            <><FontAwesomeIcon icon="circle-xmark" /> Checked Out</>
          )}
        </div>
      </div>

      {message && (
        <div className={`action-message ${message.includes('successfully') ? 'success' : 'error'}`}>
          <FontAwesomeIcon icon={message.includes('successfully') ? "check-circle" : "exclamation-circle"} />
          <span>{message}</span>
        </div>
      )}

      <div className="action-buttons">
        <button 
          onClick={handleCheckIn} 
          disabled={currentStatus === 'checked-in'}
          className="checkin-btn"
        >
          <FontAwesomeIcon icon="fingerprint" /> Check In
        </button>
        <button 
          onClick={handleCheckOut} 
          disabled={currentStatus === 'checked-out'}
          className="checkout-btn"
        >
          <FontAwesomeIcon icon="right-from-bracket" /> Check Out
        </button>
      </div>

      <div className="attendance-section">
        <div className="section-header">
          <h3>Attendance History</h3>
          <button onClick={fetchLogs} className="refresh-btn">
            <FontAwesomeIcon icon="rotate" /> Refresh
          </button>
        </div>
        
        {loading ? (
          <div className="loading-spinner">
            <FontAwesomeIcon icon="spinner" spin /> Loading records...
          </div>
        ) : (
          <AttendanceTable logs={logs} isAdmin={false} />
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;