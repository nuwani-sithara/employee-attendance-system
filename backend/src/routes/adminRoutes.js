const express = require('express');
const router = express.Router();
const { allLogs } = require('../controllers/adminController');
const { auth, authorize } = require('../middlewares/auth');

router.get('/attendance', auth, authorize('admin'), allLogs);

module.exports = router; 