const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const authMiddleware = require('../middleware/authMiddleware');
const requireRole = require('../middleware/requireRole');
const Invoice = require('../models/Invoice');

// Middleware: allow either the invoice owner (client) or an admin to access
const isOwnerOrAdmin = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const invoice = await Invoice.findById(req.params.id).populate('client');
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

    const isOwner = invoice.client._id.toString() === userId.toString();
    const isAdmin = req.user.role === 'admin';

    if (isOwner || isAdmin) return next();

    return res.status(403).json({ message: 'Forbidden' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// 🔒 Apply auth middleware to all routes
router.use(authMiddleware);

//
// 👤 CLIENT ROUTES
//
router.get('/my', invoiceController.getMyFinalizedInvoices);

//
// 🛠️ ADMIN ROUTES
//
router.get('/', requireRole('admin'), invoiceController.getAllInvoices);
router.get('/drafts', requireRole('admin'), invoiceController.getDraftInvoices);
router.get('/unpaid', requireRole('admin'), invoiceController.getUnpaidInvoices); // ✅ New: list unpaid invoices

// Individual invoice by ID
router.get('/:id', requireRole('admin'), invoiceController.getInvoiceById); // ✅ New: admin fetch by ID

// Admin edit/finalize/payment actions
router.put('/:id', requireRole('admin'), invoiceController.editInvoice);
router.put('/:id/edit', requireRole('admin'), invoiceController.editInvoice); // Alias
router.put('/:id/finalize', requireRole('admin'), invoiceController.finalizeInvoice);
router.put('/:id/mark-paid', requireRole('admin'), invoiceController.markAsPaid); // ✅ New: mark as paid
router.put('/:id/pay', requireRole('admin'), invoiceController.markAsPaid); // Alias

//
// 📄 SHARED ROUTES (Admin + Client)
//
router.get('/:id/pdf', isOwnerOrAdmin, invoiceController.generateInvoicePdf); // Secure PDF access

module.exports = router;
