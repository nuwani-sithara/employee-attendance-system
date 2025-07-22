import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttendanceTable from './AttendanceTable';
import '../stylesheets/AdminDashboard.css';

const AdminDashboard = ({ token }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/admin/attendance', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLogs(res.data);
      } catch {
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      {loading ? <div>Loading...</div> : <AttendanceTable logs={logs} />}
    </div>
  );
};

export default AdminDashboard; 