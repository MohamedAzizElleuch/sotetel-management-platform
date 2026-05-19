const path = require('path');
const fs = require('fs');
const Invoice = require('../models/Invoice');
const generateInvoicePDF = require('../utils/generateInvoicePDF');
const sendInvoiceEmail = require('../utils/sendInvoiceEmail');

// ✅ GET /api/invoices — Admin: get all invoices
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('client task');
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET /api/invoices/drafts — Admin: get invoices that haven't been finalized
const getDraftInvoices = async (req, res) => {
  try {
    const drafts = await Invoice.find({ isFinal: false }).populate('client task');
    res.json(drafts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET /api/invoices/unpaid — Admin: get invoices that are finalized but unpaid
const getUnpaidInvoices = async (req, res) => {
  try {
    const unpaid = await Invoice.find({ isFinal: true, status: 'unpaid' }).populate('client task');
    res.json(unpaid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET /api/invoices/:id — Admin: get a single invoice by ID
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('client task');
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ PUT /api/invoices/:id/edit — Admin: edit a draft invoice
const editInvoice = async (req, res) => {
  try {
    const {
      clientName,
      clientEmail,
      title,
      description,
      lineItems,
      materialItems,
      laborCost,
      serviceFee,
    } = req.body;

    const invoice = await Invoice.findById(req.params.id).populate('client task');
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    if (invoice.isFinal) return res.status(400).json({ message: 'Cannot edit finalized invoice' });

    if (invoice.task) {
      if (title) invoice.task.title = title;
      if (description) invoice.task.description = description;
      await invoice.task.save();
    }

    if (Array.isArray(lineItems)) {
      invoice.lineItems = lineItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total: item.total ?? item.unitPrice * item.quantity,
      }));
    }

    if (Array.isArray(materialItems)) {
      invoice.materialItems = materialItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        unit: item.unit,
        extraFee: item.extraFee || 0,
        total: (item.quantity || 0) * (item.unitPrice || 0) + (item.extraFee || 0),
      }));
    }

    if (typeof laborCost === 'number') invoice.laborCost = laborCost;
    if (typeof serviceFee === 'number') invoice.serviceFee = serviceFee;
    if (typeof req.body.markup === 'number') invoice.markup = req.body.markup;


    invoice.amount =
      (invoice.lineItems?.reduce((sum, item) => sum + (item.total || 0), 0) || 0) +
      (invoice.materialItems?.reduce((sum, item) => sum + (item.total || 0), 0) || 0) +
      (invoice.laborCost || 0) +
      (invoice.serviceFee || 0);

    if (clientName) invoice.overriddenClientName = clientName;
    if (clientEmail) invoice.overriddenClientEmail = clientEmail;

    invoice.status = 'draft';
    await invoice.save();
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ PUT /api/invoices/:id/finalize — Admin: finalize draft
const finalizeInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('client');
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    if (invoice.isFinal) return res.status(400).json({ message: 'Invoice already finalized' });

    invoice.isFinal = true;
    invoice.status = 'unpaid';
    invoice.issuedAt = new Date();

    if (!invoice.client && req.body.clientId) {
      invoice.client = req.body.clientId;
    }

    try {
      const pdfFileName = await generateInvoicePDF(invoice._id);
      invoice.pdfFileName = pdfFileName;
    } catch (pdfErr) {
      console.error('PDF generation error:', pdfErr.message);
      invoice.pdfFileName = null;
    }

    await invoice.save();

    const recipientEmail = invoice.overriddenClientEmail || invoice.client?.email;
    const recipientName = invoice.overriddenClientName || invoice.client?.name || 'Client';

    if (recipientEmail) {
      try {
        await sendInvoiceEmail({
          to: recipientEmail,
          clientName: recipientName,
          invoiceId: invoice._id,
          pdfFileName: invoice.pdfFileName,
        });
      } catch (emailErr) {
        console.error('Email send error:', emailErr.message);
        return res.status(200).json({
          message: 'Invoice finalized but email failed to send',
          invoice,
        });
      }
    } else {
      console.warn('No client email found — email skipped.');
    }

    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ PUT /api/invoices/:id/mark-paid — Admin: mark invoice as paid
const markAsPaid = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('client');
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

    invoice.status = 'paid';
    invoice.paidAt = new Date();
    await invoice.save();

    try {
      const pdfFileName = await generateInvoicePDF(invoice._id);
      invoice.pdfFileName = pdfFileName;
    } catch (err) {
      console.warn('PDF regeneration failed:', err.message);
    }

    await invoice.save();

    await sendInvoiceEmail({
      to: invoice.overriddenClientEmail || invoice.client?.email,
      clientName: invoice.overriddenClientName || invoice.client?.name || 'Client',
      invoiceId: invoice._id,
      pdfFileName: invoice.pdfFileName,
      isPaid: true,
    });

    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET /api/invoices/my — Client: get own finalized invoices
const getMyFinalizedInvoices = async (req, res) => {
  try {
    const userId = req.user._id;
    const invoices = await Invoice.find({
      client: userId,
      isFinal: true,
    }).populate('task client');

    const enriched = invoices.map(invoice => ({
      ...invoice.toObject(),
      pdfUrl: `/api/invoices/${invoice._id}/pdf`,
    }));

    res.json(enriched);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET /api/invoices/:id/pdf — Download invoice PDF
const generateInvoicePdf = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

    let fileName = invoice.pdfFileName || `invoice_${invoiceId}.pdf`;
    const filePath = path.join(__dirname, '..', 'invoices', fileName);

    if (fs.existsSync(filePath)) {
      return res.download(filePath, fileName);
    }

    try {
      const regeneratedPath = await generateInvoicePDF(invoiceId);
      return res.download(regeneratedPath, fileName);
    } catch (regenErr) {
      console.error('PDF regeneration failed:', regenErr.message);
      return res.status(404).json({ message: 'PDF file not found and regeneration failed' });
    }

  } catch (err) {
    console.error('PDF download error:', err.message);
    res.status(500).json({ message: 'Failed to serve invoice PDF', error: err.message });
  }
};

module.exports = {
  getAllInvoices,
  getDraftInvoices,
  getUnpaidInvoices,
  getInvoiceById,
  editInvoice,
  finalizeInvoice,
  markAsPaid,
  getMyFinalizedInvoices,
  generateInvoicePdf,
};
