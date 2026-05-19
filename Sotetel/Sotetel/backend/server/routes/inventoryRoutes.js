const express = require('express'); 
const router = express.Router();

const {
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
  getLowStockItems,
  getItemById
} = require('../controllers/inventoryController');

const auth = require('../middleware/authMiddleware');
const requireRole = require('../middleware/requireRole');
const InventoryLog = require('../models/InventoryLog');

// 📥 Inventory Routes
router.get('/', auth, getAllItems);               // Get all items
router.post('/', auth, addItem);                  // Add item
router.get('/low-stock', auth, getLowStockItems); // ✅ Get low-stock items
router.get('/logs', auth, requireRole('admin'), async (req, res) => {
  try {
    const logs = await InventoryLog.find()
      .populate('item', 'name')
      .populate('usedBy', 'name email')
      .populate('task', 'title');
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔁 Dynamic ID routes should come LAST
router.get('/:id', auth, getItemById);            // Get single item by ID
router.put('/:id', auth, updateItem);             // Update item
router.delete('/:id', auth, deleteItem);          // Delete item

module.exports = router;
