const express = require('express');
const router = express.Router();

const {
  createTask,
  getUnassignedTasks,
  assignTask,
  getMyTasks,
  updateTaskStatus,
  getAssignedTasksProgress,
  getCompletedTasks,
  getClientTasks,
  sendQuoteToClient,
  clientRespondToQuote,
  getTasksByStatus // ✅ NEW: For filtering tasks by status
} = require('../controllers/taskController');

const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/requireRole');

// CLIENT: Create a new task
// POST /api/tasks
router.post('/', authMiddleware, requireRole('client'), createTask);

// ADMIN: View all unassigned tasks
// GET /api/tasks/unassigned
router.get('/unassigned', authMiddleware, requireRole('admin'), getUnassignedTasks);

// ADMIN: Assign task to a technician
// PUT /api/tasks/:id/assign
router.put('/:id/assign', authMiddleware, requireRole('admin'), assignTask);

// TECHNICIAN: View assigned tasks (excluding completed)
// GET /api/tasks/my
router.get('/my', authMiddleware, requireRole('technician'), getMyTasks);

// TECHNICIAN: View completed tasks
// GET /api/tasks/completed
router.get('/completed', authMiddleware, requireRole('technician'), getCompletedTasks);

// TECHNICIAN: Update task status and materials used
// PUT /api/tasks/:id/status
router.put('/:id/status', authMiddleware, requireRole('technician'), updateTaskStatus);

// ADMIN: View all assigned tasks that are in-progress or completed
// GET /api/tasks/assigned
router.get('/assigned', authMiddleware, requireRole('admin'), getAssignedTasksProgress);

// CLIENT: View tasks for the logged-in client
// GET /api/tasks/client
router.get('/client', authMiddleware, requireRole('client'), getClientTasks);

// ADMIN: Send quote to client for a quote_request task
// PUT /api/tasks/:id/send-quote
router.put('/:id/send-quote', authMiddleware, requireRole('admin'), sendQuoteToClient);

// CLIENT: Accept or reject the quote
// PUT /api/tasks/:id/respond-quote
router.put('/:id/respond-quote', authMiddleware, requireRole('client'), clientRespondToQuote);

// ✅ NEW: Filter tasks by status (e.g., ?status=pending_quote,quote_sent)
// GET /api/tasks
router.get('/', authMiddleware, getTasksByStatus);

module.exports = router;
