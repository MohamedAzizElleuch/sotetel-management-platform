// backend/models/InventoryLog.js
const mongoose = require('mongoose');

const inventoryLogSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem', required: true },
  usedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantity: { type: Number, required: true },
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  usedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('InventoryLog', inventoryLogSchema);
