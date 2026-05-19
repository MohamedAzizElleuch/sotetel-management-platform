// routes/adminDashboardRoutes.js

const express = require('express');
const router = express.Router();

const adminDashboardController = require('../controllers/adminDashboardController');
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/requireRole');

// ✅ Routes with proper middleware chain
router.get(
  '/stats',
  authMiddleware,
  requireRole('admin'),
  adminDashboardController.getDashboardStats
);

router.get(
  '/pdf',
  authMiddleware,
  requireRole('admin'),
  adminDashboardController.downloadDashboardPDF
);

module.exports = router;
