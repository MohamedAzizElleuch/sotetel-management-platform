// server/controllers/adminDashboardController.js

const Task = require('../models/Task');
const Inventory = require('../models/InventoryItem');
const Invoice = require('../models/Invoice');
const generateDashboardPDF = require('../utils/generateDashboardPDF');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: 'completed' });
    const pendingTasks = await Task.countDocuments({ status: 'pending' });
    const completionRate = totalTasks
      ? ((completedTasks / totalTasks) * 100).toFixed(2)
      : 0;

    const totalInvoices = await Invoice.countDocuments();
    const paidInvoices = await Invoice.countDocuments({ status: 'paid' });
    const unpaidInvoices = totalInvoices - paidInvoices;

    const lowStockItems = await Inventory.find({ quantity: { $lt: 5 } });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
      totalInvoices,
      paidInvoices,
      unpaidInvoices,
      lowStockItems,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching dashboard stats',
      error: err.message,
    });
  }
};

exports.downloadDashboardPDF = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({ status: 'completed' });
    const pendingTasks = await Task.countDocuments({ status: 'pending' });
    const completionRate = totalTasks
      ? ((completedTasks / totalTasks) * 100).toFixed(2)
      : 0;

    const totalInvoices = await Invoice.countDocuments();
    const paidInvoices = await Invoice.countDocuments({ status: 'paid' });
    const unpaidInvoices = totalInvoices - paidInvoices;

    const lowStockItems = await Inventory.find({ quantity: { $lt: 5 } });

    const dashboardData = {
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
      totalInvoices,
      paidInvoices,
      unpaidInvoices,
      lowStockItems,
    };

    const filePath = await generateDashboardPDF(dashboardData);

    res.download(filePath, 'dashboard-report.pdf');
  } catch (err) {
    res.status(500).json({
      message: 'Failed to generate dashboard PDF',
      error: err.message,
    });
  }
};
