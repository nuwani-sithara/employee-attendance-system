import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttendanceTable from './AttendanceTable';
import '../stylesheets/AdminDashboard.css';
import '../stylesheets/Footer.css';
import { FontAwesomeIcon } from '../fontAwesome';
import API from '../api';
import AdminUserManagement from './AdminUserManagement';

const AdminDashboard = ({ token }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('attendance');

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/admin/attendance`, {
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
            disabled={activeTab !== 'attendance'}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`admin-tab${activeTab === 'attendance' ? ' active' : ''}`}
          onClick={() => setActiveTab('attendance')}
        >
          Attendance
        </button>
        <button
          className={`admin-tab${activeTab === 'users' ? ' active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'attendance' && (
        loading ? (
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
            <AttendanceTable logs={filteredLogs} isAdmin={true} />
          </div>
        )
      )}
      {activeTab === 'users' && (
        <AdminUserManagement token={token} />
      )}
    </div>
  );
};

export default AdminDashboard;