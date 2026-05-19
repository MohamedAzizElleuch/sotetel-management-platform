const express = require("express");
const {
  submitMessage,
  getAllMessages,
  sendReply, // ✅ Import sendReply controller
} = require("../controllers/messageController");

const requireRole = require("../middleware/requireRole");
const requireAuth = require("../middleware/authMiddleware");

const router = express.Router();

// 📩 Public route: Submit a message (contact form)
router.post("/", submitMessage);

// 🔒 Admin-only: Fetch all client messages
router.get("/", requireAuth, requireRole("admin"), getAllMessages);

// 🔒 Admin-only: Send reply email and save to latest message
router.post("/reply", requireAuth, requireRole("admin"), sendReply); // ✅ Reply handler

module.exports = router;
