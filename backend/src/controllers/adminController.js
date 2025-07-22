const Attendance = require('../models/Attendance');
const User = require('../models/User');

exports.allLogs = async (req, res) => {
  try {
    const logs = await Attendance.find().populate('user', 'username role').sort({ checkIn: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}; 