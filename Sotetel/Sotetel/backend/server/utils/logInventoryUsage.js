// backend/utils/logInventoryUsage.js

const InventoryLog = require('../models/InventoryLog');

/**
 * Logs inventory usage for a given task.
 * 
 * @param {Object} params
 * @param {String} params.userId - ID of the technician using the materials
 * @param {String} params.taskId - ID of the related task
 * @param {Array} params.materialsUsed - List of used materials (item + quantity)
 */
const logInventoryUsage = async ({ userId, taskId, materialsUsed }) => {
  try {
    if (!Array.isArray(materialsUsed) || materialsUsed.length === 0) {
      console.warn('⚠️ No materials provided to log.');
      return;
    }

    const logEntries = materialsUsed
      .filter(entry => entry.item && entry.quantity > 0)
      .map(entry => ({
        item: entry.item,
        usedBy: userId,
        task: taskId,
        quantity: entry.quantity,
      }));

    if (logEntries.length === 0) {
      console.warn('⚠️ No valid entries to insert into InventoryLog.');
      return;
    }

    await InventoryLog.insertMany(logEntries);
    console.log(`✅ Inventory usage logged for task ${taskId}`);
  } catch (error) {
    console.error('❌ Error logging inventory usage:', error.message);
  }
};

module.exports = logInventoryUsage;
