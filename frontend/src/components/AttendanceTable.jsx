import React from 'react';
import '../stylesheets/AttendanceTable.css';

const AttendanceTable = ({ logs }) => {
  if (!logs.length) return <div>No attendance records found.</div>;
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Check In</th>
          <th>Check Out</th>
          {logs[0].user && <th>User</th>}
        </tr>
      </thead>
      <tbody>
        {logs.map((log, i) => (
          <tr key={log._id || i}>
            <td>{new Date(log.checkIn).toLocaleDateString()}</td>
            <td>{log.checkIn ? new Date(log.checkIn).toLocaleTimeString() : '-'}</td>
            <td>{log.checkOut ? new Date(log.checkOut).toLocaleTimeString() : '-'}</td>
            {log.user && <td>{log.user.username}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttendanceTable; 