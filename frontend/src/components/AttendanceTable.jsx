import React from 'react';
import '../stylesheets/AttendanceTable.css';

const AttendanceTable = ({ logs }) => {
  if (!logs.length) return (
    <div className="no-records">
      <i className="fas fa-clipboard-list"></i>
      <p>No attendance records found</p>
    </div>
  );

  return (
    <div className="table-container">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Duration</th>
            {logs[0].user && <th>User</th>}
          </tr>
        </thead>
        <tbody>
          {logs.map((log, i) => {
            const checkInDate = log.checkIn ? new Date(log.checkIn) : null;
            const checkOutDate = log.checkOut ? new Date(log.checkOut) : null;
            
            let duration = '-';
            if (checkInDate && checkOutDate) {
              const diffMs = checkOutDate - checkInDate;
              const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
              const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
              duration = `${diffHrs}h ${diffMins}m`;
            }

            return (
              <tr key={log._id || i}>
                <td>{checkInDate ? checkInDate.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric',
                  weekday: 'short'
                }) : '-'}</td>
                <td>{checkInDate ? checkInDate.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                }) : '-'}</td>
                <td>{checkOutDate ? checkOutDate.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                }) : '-'}</td>
                <td>{duration}</td>
                {log.user && <td>{log.user.username}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;