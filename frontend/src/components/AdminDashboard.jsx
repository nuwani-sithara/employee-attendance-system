import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttendanceTable from './AttendanceTable';
import '../stylesheets/AdminDashboard.css';

const AdminDashboard = ({ token }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLogs, setFilteredLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/admin/attendance', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLogs(res.data);
        setFilteredLogs(res.data);
      } catch {
        setLogs([]);
        setFilteredLogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredLogs(logs);
    } else {
      const filtered = logs.filter(log => 
        log.user?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(log.checkIn).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredLogs(filtered);
    }
  }, [searchTerm, logs]);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Attendance Management</h2>
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search by username or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="stats-summary">
        <div className="stat-card">
          <div className="stat-value">{logs.length}</div>
          <div className="stat-label">Total Records</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {logs.filter(log => log.checkIn && !log.checkOut).length}
          </div>
          <div className="stat-label">Currently Checked In</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {new Set(logs.map(log => log.user?.username)).size}
          </div>
          <div className="stat-label">Active Employees</div>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i> Loading attendance data...
        </div>
      ) : (
        <>
          <div className="table-header">
            <h3>All Attendance Records</h3>
            <div className="records-count">
              Showing {filteredLogs.length} of {logs.length} records
            </div>
          </div>
          <AttendanceTable logs={filteredLogs} />
        </>
      )}
    </div>
  );
};

export default AdminDashboard;