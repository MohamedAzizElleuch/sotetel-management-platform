const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getAllUsers } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/requireRole');

// ✅ Get the currently logged-in user's profile
router.get('/me', authMiddleware, getProfile);

// ✅ Update the currently logged-in user's profile (e.g., name or password)
router.put('/me', authMiddleware, updateProfile);

// ✅ Admin: Get all users (optionally filter by role using query param ?role=technician)
router.get('/', authMiddleware, requireRole('admin'), getAllUsers);

module.exports = router;
