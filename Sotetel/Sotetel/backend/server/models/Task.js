const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: [
        'pending',
        'pending_quote',
        'quote_sent',
        'quote_accepted',
        'quote_rejected',
        'assigned',
        'in-progress',
        'completed'
      ],
      default: 'pending'
    },
    quotePrice: Number,
    quoteComment: String,
    
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    technician: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // null at first
    scheduledDate: { type: Date }, // optional at first
    materialsUsed: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem' },
        quantity: Number
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
