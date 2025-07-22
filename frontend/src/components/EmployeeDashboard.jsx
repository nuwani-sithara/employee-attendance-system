import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttendanceTable from './AttendanceTable';
import '../stylesheets/EmployeeDashboard.css';

const EmployeeDashboard = ({ token }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/attendance/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLogs(res.data);
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
      setMessage('Checked in!');
      fetchLogs();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Check-in failed');
    }
  };

  const handleCheckOut = async () => {
    setMessage('');
    try {
      await axios.post('/attendance/checkout', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Checked out!');
      fetchLogs();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Check-out failed');
    }
  };

  return (
    <div className="dashboard">
      <h2>Employee Dashboard</h2>
      <div className="actions">
        <button onClick={handleCheckIn}>Check In</button>
        <button onClick={handleCheckOut}>Check Out</button>
      </div>
      {message && <div>{message}</div>}
      {loading ? <div>Loading...</div> : <AttendanceTable logs={logs} />}
    </div>
  );
};

export default EmployeeDashboard; 