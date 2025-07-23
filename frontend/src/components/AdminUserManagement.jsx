import React, { useEffect, useState } from 'react';
import API from '../api';
import '../stylesheets/AdminUserManagement.css';

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'employee', label: 'Employee' },
];

const AdminUserManagement = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUserId, setEditUserId] = useState(null);
  const [editData, setEditData] = useState({ username: '', role: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get('/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch {
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [token]);

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setEditData({ username: user.username, role: user.role });
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setEditUserId(null);
    setEditData({ username: '', role: '' });
    setError('');
    setSuccess('');
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async (id) => {
    setError('');
    setSuccess('');
    try {
      await API.put(`/admin/users/${id}`, editData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('User updated successfully');
      setEditUserId(null);
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setError('');
    setSuccess('');
    try {
      await API.delete(`/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('User deleted successfully');
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div className="admin-user-management">
      <h2>User Management</h2>
      <p className="dashboard-subtitle">View, edit, or delete users and change their roles</p>
      {error && <div className="aum-error">{error}</div>}
      {success && <div className="aum-success">{success}</div>}
      {loading ? (
        <div className="aum-loading">Loading users...</div>
      ) : (
        <table className="aum-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {editUserId === user._id ? (
                    <input
                      type="text"
                      name="username"
                      value={editData.username}
                      onChange={handleChange}
                      className="aum-input"
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td>
                  {editUserId === user._id ? (
                    <select
                      name="role"
                      value={editData.role}
                      onChange={handleChange}
                      className="aum-input"
                    >
                      {roleOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    user.role.charAt(0).toUpperCase() + user.role.slice(1)
                  )}
                </td>
                <td>
                  {editUserId === user._id ? (
                    <>
                      <button className="aum-btn aum-save" onClick={() => handleSave(user._id)}>Save</button>
                      <button className="aum-btn aum-cancel" onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="aum-btn aum-edit" onClick={() => handleEdit(user)}>Edit</button>
                      <button className="aum-btn aum-delete" onClick={() => handleDelete(user._id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUserManagement; 