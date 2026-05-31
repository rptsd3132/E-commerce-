const express = require('express');
const router = express.Router();
const { createComplaint, getMyComplaints } = require('../controllers/complaintController');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, createComplaint);
router.get('/mine', authenticate, getMyComplaints);

module.exports = router;
