const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'pcs' }, // or 'meters', 'liters', etc.
  unitPrice: { type: Number, default: 0 }, // 💰 new field
  threshold: { type: Number, default: 5 }, // low stock alert
  lastUpdated: { type: Date, default: Date.now }
});

// ✅ Prevent OverwriteModelError when nodemon restarts or in dev
module.exports = mongoose.models.InventoryItem || mongoose.model('InventoryItem', inventoryItemSchema);
