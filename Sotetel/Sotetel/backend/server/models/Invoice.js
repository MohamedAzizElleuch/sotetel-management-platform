const mongoose = require('mongoose');

// Line item schema used in invoices
const lineItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  }
}, { _id: false });

// Material item schema
const materialItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  unit: {
    type: String,
  },
  extraFee: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
    min: 0,
  }
}, { _id: false });

const invoiceSchema = new mongoose.Schema({
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  overriddenClientName: {
    type: String,
  },
  overriddenClientEmail: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  lineItems: {
    type: [lineItemSchema],
    default: [],
  },
  materialItems: {
    type: [materialItemSchema],
    default: [],
  },
  laborCost: {
    type: Number,
    default: 0,
  },
  serviceFee: {
    type: Number,
    default: 0,
  },
  markup: {   // ✅ Added field for Majoration (markup)
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['draft', 'unpaid', 'paid'],
    default: 'draft',
  },
  isFinal: {
    type: Boolean,
    default: false,
  },
  issuedAt: {
    type: Date,
    default: Date.now,
  },
  paidAt: {
    type: Date,
  },
  pdfFileName: {
    type: String,
  }
});

// Auto-associate finalized invoices with the client
invoiceSchema.post('save', async function(doc) {
  if (doc.isFinal && doc.client) {
    const User = mongoose.model('User');
    await User.findByIdAndUpdate(doc.client, {
      $push: { invoices: doc._id }
    });
  }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
