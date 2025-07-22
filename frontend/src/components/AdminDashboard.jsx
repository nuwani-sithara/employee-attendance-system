import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttendanceTable from './AttendanceTable';
import '../stylesheets/AdminDashboard.css';
import '../stylesheets/Footer.css';
import { FontAwesomeIcon } from '../fontAwesome';

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
  }, [token]);

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
        <div>
          <h2>Attendance Management</h2>
          <p className="dashboard-subtitle">View and manage employee attendance records</p>
        </div>
        <div className="search-box">
          <FontAwesomeIcon icon="search" />
          <input
            type="text"
            placeholder="Search employees or dates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search attendance records"
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
          <div className="stat-label">Currently Working</div>
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
          <FontAwesomeIcon icon="spinner" spin /> Loading attendance data...
        </div>
      ) : (
        <div className="attendance-section">
          <div className="section-header">
            <h3>Attendance Records</h3>
            <div className="records-count">
              Showing {filteredLogs.length} of {logs.length} records
            </div>
          </div>
          <AttendanceTable logs={filteredLogs} />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;